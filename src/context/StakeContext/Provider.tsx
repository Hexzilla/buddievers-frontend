import { ReactElement, useCallback, useEffect, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import {
  Id as ToastId,
  ToastContainer,
  UpdateOptions,
  toast,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useActiveWeb3React } from 'hooks';
import { useStaking } from 'hooks/useStaking';
import { OwnedToken } from 'components/types';

import StakeContextProvider, { StakedTokenItem } from '.';

interface Props {
  children: ReactElement;
}

const updateToast = (id: ToastId, message: string, type: string = 'error') => {
  const options = {
    render: message,
    type,
    isLoading: false,
    autoClose: 2000,
  } as UpdateOptions;
  toast.update(id, options);
};

const handleException = (err: any, toastId: ToastId) => {
  console.error(err);
  const message = err?.data?.message || 'Something went wrong!';
  updateToast(toastId, message);
};

export const StakeProvider = ({ children }: Props) => {
  const { account } = useActiveWeb3React();
  const { stake, unstake, claimRewards, userStakeInfo, getStartTime } =
    useStaking();

  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [rewards, setRewards] = useState('0');
  const [stakedTokens, setStakedTokens] = useState<StakedTokenItem[]>([]);
  const [token, setToken] = useState<OwnedToken | null>(null);

  useEffect(() => {
    getStartTime()
      .then((startTime) => {
        setStartTime(startTime);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [getStartTime]);

  const _refresh = useCallback(async () => {
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    setLoading(true);

    try {
      const result = await userStakeInfo(account);
      if (result) {
        setStakedTokens([]);
        if (result._stakedTokens?.length) {
          const stakedTokens = result._stakedTokens.map((item: any) => {
            return {
              tokenId: item.tokenId.toNumber(),
              timestamp: item.timestamp.toNumber(),
            };
          });

          setStakedTokens(stakedTokens);

          /*console.log('stakedTokens',stakedTokens)
          const items = [];
          for (let i = 0; i < 20; i++) {
            items.push({
              tokenId: 180 + i,
              timestamp: 1682055190,
            });
          }
          setStakedTokens(items);*/
        }
        if (result._availableRewards) {
          let rewards = utils.formatEther(result._availableRewards);
          let value = Number(rewards);
          setRewards(value > 0 ? value.toFixed(2) : value.toString());
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  }, [account, userStakeInfo]);

  const _stake = useCallback(
    async (tokenId: string) => {
      if (!account) {
        toast.warn('Please connect your wallet!');
        return;
      }

      const toastId = toast.loading('Staking...');

      try {
        const result = await stake(account, [Number(tokenId)]);
        console.log('stake-result', result);
        if (!result) {
          updateToast(toastId, 'Staking failed!');
          return;
        }

        _refresh();
        updateToast(toastId, 'Staked successfully!', 'success');
      } catch (err: any) {
        handleException(err, toastId);
      }
    },
    [account, stake, _refresh]
  );

  const _unstake = useCallback(
    async (tokenId: string) => {
      if (!account) {
        toast.warn('Please connect your wallet!');
        return;
      }

      const toastId = toast.loading('Unstaking...');
      try {
        const result = await unstake([Number(tokenId)]);
        console.log('unstake-result', result);
        if (!result) {
          updateToast(toastId, 'Unstaking failed!');
          return;
        }

        _refresh();
        updateToast(toastId, 'Unstaked successfully!', 'success');
      } catch (err: any) {
        handleException(err, toastId);
      }
    },
    [account, unstake, _refresh]
  );

  const _getRewards = useCallback(async () => {
    try {
      const result = await userStakeInfo(account!);
      console.log('getRewards', result);
      if (result && result._availableRewards.gt(BigNumber.from(0))) {
        return Number(utils.formatEther(result._availableRewards));
      }
    } catch (err: any) {
      console.error(err);
    }
    return 0;
  }, [account, userStakeInfo]);

  const _claimRewards = useCallback(async () => {
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    const toastId = toast.loading('Claim rewards...');
    try {
      const rewards = await _getRewards();
      console.log('rewards', rewards);
      if (!rewards) {
        updateToast(toastId, 'You have no rewards!', 'warning');
        return;
      }

      const result = await claimRewards();
      if (!result) {
        updateToast(toastId, 'Claim reward failed', 'warning');
        return;
      }

      _refresh();
      updateToast(toastId, 'You have got rewards successfully!', 'success');
    } catch (err: any) {
      handleException(err, toastId);
    }
  }, [account, _getRewards, _refresh, claimRewards]);

  return (
    <StakeContextProvider
      value={{
        loading,
        account,
        startTime,
        rewards,
        token,
        setToken,
        stakedTokens,
        stake: _stake,
        unstake: _unstake,
        refresh: _refresh,
        getRewards: _getRewards,
        claimRewards: _claimRewards,
      }}
    >
      {children}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
    </StakeContextProvider>
  );
};
