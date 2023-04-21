import { useEffect, useMemo, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@mui/material';
import { BigNumber, utils } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import { useActiveWeb3React, useClasses } from 'hooks';
import { styles } from './styles';
import { NavLink, Button } from 'ui';
import MyNFTs from 'pages/myNFTs';
import { StakedTokenItem } from '../staking/types';
import { useStaking } from '../staking/useStaking';
import StakedToken from './StakedToken';

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
