import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

import Pagination from 'components/Pagination';
import { StakedTokenItem } from 'context/StakeContext';
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

const PageSize = 8;

type Props = {
  stakedTokens: StakedTokenItem[];
  loading: boolean;
};

const StakedTokenList = ({ stakedTokens, loading }: Props) => {
  const [pageNumber, setPageNumber] = useState(1);

  const tokens = useMemo(() => {
    if (stakedTokens) {
      if (stakedTokens.length <= PageSize) {
        return stakedTokens;
      }
      const startIndex = (pageNumber - 1) * PageSize;
      return [...stakedTokens].slice(startIndex, startIndex + PageSize);
    }
    return [];
  }, [stakedTokens, pageNumber]);

  return (
    <>
      <Grid container spacing={2}>
        {tokens.map((token, index) => (
          <StakedToken key={index} stakedToken={token}></StakedToken>
        ))}
        {!!loading && (
          <EmptyTokens>
            <div>Loading...</div>
          </EmptyTokens>
        )}
        {!loading && stakedTokens.length === 0 && (
          <EmptyTokens>
            <div>You have no staked tokens.</div>
            <div>Please stake your tokens.</div>
          </EmptyTokens>
        )}
      </Grid>
      <Pagination
        totalCount={stakedTokens.length}
        pageSize={PageSize}
        onChange={(pageNumber) => setPageNumber(pageNumber)}
      />
    </>
  );
};

export default StakedTokenList;
