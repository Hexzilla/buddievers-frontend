import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { StakedTokenItem } from '../../staking/types';
import StakedToken from '../StakedToken';

const EmptyTokens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  min-height: 280px;
`;

type Props = {
  stakedTokens: StakedTokenItem[];
};

const StakedTokenList = ({ stakedTokens }: Props) => {
  return (
    <Grid container spacing={2}>
      {stakedTokens.map((token, index) => (
        <StakedToken key={index} tokenId={token.tokenId}></StakedToken>
      ))}
      {stakedTokens.length === 0 && (
        <EmptyTokens>
          <div>You have no staked tokens.</div>
          <div>Please stake your tokens.</div>
        </EmptyTokens>
      )}
    </Grid>
  );
};

export default StakedTokenList;
