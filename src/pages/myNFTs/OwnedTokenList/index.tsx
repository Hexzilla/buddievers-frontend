import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

import Pagination from 'components/Pagination';
import { OwnedToken } from 'components/types';
import OwnedTokenCard from '../OwnedToken';

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
  ownedTokens: OwnedToken[];
  loading: boolean;
};

const OwnedTokenList = ({ ownedTokens, loading }: Props) => {
  const [pageNumber, setPageNumber] = useState(1);

  const tokens = useMemo(() => {
    if (ownedTokens) {
      if (ownedTokens.length <= PageSize) {
        return ownedTokens;
      }
      const startIndex = (pageNumber - 1) * PageSize;
      return [...ownedTokens].slice(startIndex, startIndex + PageSize);
    }
    return [];
  }, [ownedTokens, pageNumber]);

  return (
    <>
      <Grid container spacing={2}>
        {tokens.map((token: OwnedToken, index) => (
          <OwnedTokenCard key={index} token={token} />
        ))}
        {!!loading && (
          <EmptyTokens>
            <div>Loading...</div>
          </EmptyTokens>
        )}
        {!loading && ownedTokens.length === 0 && (
          <EmptyTokens>
            <div>You have no NFTs.</div>
          </EmptyTokens>
        )}
      </Grid>
      <Pagination
        totalCount={ownedTokens.length}
        pageSize={PageSize}
        onChange={(pageNumber) => setPageNumber(pageNumber)}
      />
    </>
  );
};

export default OwnedTokenList;
