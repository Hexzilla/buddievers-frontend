import { useMemo, useEffect, useState } from 'react';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import request from 'graphql-request';
import { Grid } from '@mui/material';
import { styles } from '../myNFTs/styles';
import { Button } from 'ui';
import { useStaking  } from './useStaking';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  margin-top: 200px;
  padding-left: 30%;
`;

const BudStaking = () => {
  const { account } = useActiveWeb3React();
  const { userStakeInfo } = useStaking();

  useEffect(() => {
    if (account) {
      userStakeInfo(account).then(result => {
        console.log('userStakeInfo', result);
      })
    }
  }, [account, userStakeInfo])

  const handleStake = () => {
    console.log('handleStake');
  };

  const handleTakeRewards = () => {
    console.log('handleTakeRewards');
  }

  return (
    <StyledContainer>
        <div>Address: {account}</div>
        <Button onClick={handleStake}>
          Stake Your NFT
        </Button>
        <Button onClick={handleTakeRewards}>
          Take Rewards
        </Button>
    </StyledContainer>
  );
};

export default BudStaking;
