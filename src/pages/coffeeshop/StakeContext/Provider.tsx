import { ReactElement, useCallback, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useActiveWeb3React } from 'hooks';

import StakeContextProvider, { StakedTokenItem } from '.';
import { useStaking } from './useStaking';

interface Props {
  children: ReactElement;
}

export const StakeProvider = ({ children }: Props) => {
  const { account } = useActiveWeb3React();
  const { stake, unstake, claimRewards, userStakeInfo } = useStaking();

  const [rewards, setRewards] = useState('0');
  const [stakedTokens, setStakedTokens] = useState<StakedTokenItem[]>([]);

  const _refresh = useCallback(async () => {
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

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
        }
        if (result._availableRewards) {
          let rewards = utils.formatEther(result._availableRewards);
          setRewards(Number(rewards).toFixed(2));
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Something went wrong!');
    }
  }, [account, userStakeInfo]);

  const _stake = useCallback(
    async (tokenId: string) => {
      if (!account) {
        toast.warn('Please connect your wallet');
        return;
      }

      try {
        const result = await stake(account, [Number(tokenId)]);
        console.log('stake-result', result);
        if (!result) {
          toast.error('Something went wrong!');
          return;
        }

        _refresh();
        toast.success('Staked successfully!');
      } catch (err: any) {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
      }
    },
    [account, stake, _refresh]
  );

  const _unstake = useCallback(
    async (tokenId: string) => {
      if (!account) {
        toast.warn('Please connect your wallet');
        return;
      }

      try {
        const result = await unstake([Number(tokenId)]);
        console.log('unstake-result', result);
        if (!result) {
          toast.error('Something went wrong!');
          return;
        }

        _refresh();
        toast.success('Unstake successfully!');
      } catch (err: any) {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
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

    try {
      const rewards = await _getRewards();
      console.log('rewards', rewards);
      if (!rewards) {
        toast.warning('You have no rewards!');
        return;
      }

      const result = await claimRewards();
      if (!result) {
        toast.error('Something went wrong!');
        return;
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Something went wrong!');
    }
  }, [account, _getRewards, claimRewards]);

  return (
    <StakeContextProvider
      value={{
        account,
        rewards,
        stakedTokens,
        stake: _stake,
        unstake: _unstake,
        refresh: _refresh,
        getRewards: _getRewards,
        claimRewards: _claimRewards,
      }}
    >
      {children}
      <ToastContainer />
    </StakeContextProvider>
  );
};
