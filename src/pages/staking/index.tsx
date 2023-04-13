import { useMemo, useEffect, useState } from 'react';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import request from 'graphql-request';
import { Grid } from '@mui/material';
import { styles } from '../myNFTs/styles';
import { Button } from 'ui';
import { useStaking } from './useStaking';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  margin-top: 200px;
  padding-left: 30%;
`;

const BudStaking = () => {
  const { account } = useActiveWeb3React();
  const { stake, withdraw, claimRewards, userStakeInfo } = useStaking();

  useEffect(() => {
    if (account) {
      userStakeInfo(account).then((result) => {
        console.log('userStakeInfo', result);
      });
    }
  }, [account, userStakeInfo]);

  const handleStake = () => {
    console.log('handleStake');
    if (account) {
      stake([1]).then((tx) => console.log('stake-result', tx));
    }
  };

  const handleWithdraw = () => {
    console.log('handleWithdraw');
    if (account) {
      withdraw([1])
        .then((tx) => console.log('withdraw-result', tx));
    }
  };

  const handleClaimRewards = () => {
    console.log('handleClaimRewards');
    if (account) {
      claimRewards()
        .then((tx) => console.log('claimRewards-result', tx))
        .catch(err => {
          console.error('eerror~~~~~~~', err);
          if (err?.data?.message) {
            alert(err.data.message);
          }
        })
    }
  };

  return (
    <StyledContainer>
      <div>Address: {account}</div>
      <div style={{display: 'flex', flexDirection: 'column', width: '200px'}}>
        <Button onClick={handleStake}>Stake Your NFT</Button>
        <Button onClick={handleWithdraw}>Withdraw</Button>
        <Button onClick={handleClaimRewards}>Claim Rewards</Button>
      </div>
    </StyledContainer>
  );
};

export default BudStaking;
