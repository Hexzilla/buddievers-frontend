import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { useClasses } from 'hooks';
import { StakedTokenItem } from '../StakeContext';
import StakedToken from '../StakedToken';
import { styles } from './styles';

const EmptyTokens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  min-height: 280px;
`;

const PagenationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}`;

const PageSize = 8;

type Props = {
  stakedTokens: StakedTokenItem[];
  loading: boolean;
};

const StakedTokenList = ({ stakedTokens, loading }: Props) => {
  const { paginationStyle } = useClasses(styles);
  const [pageNumber, setPageNumber] = useState(1);

  const pageChangeHandler = async (event: any, pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const pageCount = useMemo(() => {
    return 1 + Math.floor((stakedTokens.length - 1) / PageSize);
  }, [stakedTokens])

  const tokens = useMemo(() => {
    console.log('stakedTokens.length', pageNumber, stakedTokens.length)
    if (stakedTokens) {
      if (stakedTokens.length <= PageSize) {
        return stakedTokens;
      }
      const startIndex = (pageNumber - 1) * PageSize;
      return [...stakedTokens].slice(startIndex, startIndex + PageSize);
    }
    return [];
  }, [stakedTokens, pageNumber])

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
      <PagenationContainer>
        <Pagination
          count={pageCount}
          onChange={pageChangeHandler}
          size="large"
          shape="circular"
          showFirstButton
          showLastButton
          className={paginationStyle}
        />
      </PagenationContainer>
    </>
  );
};

export default StakedTokenList;
