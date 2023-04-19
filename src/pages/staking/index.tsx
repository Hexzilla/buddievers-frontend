import { useEffect, useState, useCallback } from 'react';
import { BigNumber, utils } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import styled from '@emotion/styled';
import { useActiveWeb3React } from 'hooks';
import { Button, Input } from 'ui';
import { useStaking } from './useStaking';
import 'react-toastify/dist/ReactToastify.css';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  margin-top: 200px;
  padding-left: 30%;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-top: 40px;
  align-items: flex-start;
`;

type StakedToken = {
  tokenId: number;
  timestamp: number;
};

const BudStaking = () => {
  const { account } = useActiveWeb3React();
  const { stake, withdraw, claimRewards, userStakeInfo } = useStaking();
  const [tokenId, setTokenId] = useState('1');
  const [rewards, setRewards] = useState('0');
  const [stakedTokens, setStakedTokens] = useState<StakedToken[]>([]);

  const getRewards = useCallback(async () => {
    return userStakeInfo(account!)
      .then((result) => {
        console.log('getRewards', result);
        if (result && result._availableRewards.gt(BigNumber.from(0))) {
          return Number(utils.formatEther(result._availableRewards));
        }
        return 0;
      })
      .catch((err) => {
        console.error(err);
        return 0;
      });
  }, [account, userStakeInfo]);

  const handleStake = () => {
    console.log('handleStake', account);
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    stake(account, [Number(tokenId)])
      .then((result) => {
        console.log('stake-result', result);
        if (!result) {
          toast.error('Something went wrong!');
          return;
        }
        toast.success('Staked successfully!');
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
      });
  };

  const handleWithdraw = () => {
    console.log('handleWithdraw');
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    withdraw([Number(tokenId)])
      .then((result) => {
        console.log('withdraw-result', result);
        toast.success('Unstake successfully!');
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
      });
  };

  const handleClaimRewards = async () => {
    console.log('handleClaimRewards');
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    const rewards = await getRewards();
    console.log('rewards', rewards);
    if (!rewards) {
      toast.error('You have no rewards!');
      return;
    }

    claimRewards()
      .then((tx) => console.log('claimRewards-result', tx))
      .catch((err) => {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
      });
  };

  const handleRefresh = async () => {
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    userStakeInfo(account)
      .then((result) => {
        console.log('userStakeInfo', result);
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
            setRewards(utils.formatEther(result._availableRewards));
          }
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
      });
  };

  useEffect(() => {
    handleRefresh();
  }, [])

  return (
    <StyledContainer>
      <div>Address: {account}</div>
      <ActionButtons>
        <div style={{ display: 'flex' }}>
          <Button onClick={handleStake}>Stake Your NFT</Button>
          <Input
            value={tokenId}
            style={{ width: '100px', marginLeft: '40px' }}
            onChange={(e) => setTokenId(e.target.value)}
          ></Input>
        </div>
        <Button onClick={handleWithdraw}>Unstake</Button>
        <Button onClick={handleClaimRewards}>Claim Rewards</Button>
        <Button onClick={handleRefresh}>Refresh</Button>

        <div style={{ marginTop: '40px' }}>
          <div>
            Staked Tokens:
            {stakedTokens.map((token, index) => (
              <div key={index} style={{marginLeft: '20px'}}>
                Token ID: {token.tokenId} {',  '}
                Timestamp: {moment(new Date(token.timestamp * 1000)).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            ))}
          </div>
          <div>Rewards: {rewards ? Number(rewards).toFixed(2) : ''}</div>
        </div>
      </ActionButtons>
      <ToastContainer />
    </StyledContainer>
  );
};

export default BudStaking;
