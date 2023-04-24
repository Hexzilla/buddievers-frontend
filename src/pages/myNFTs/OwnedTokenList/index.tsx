import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

import Pagination from 'components/Pagination';
import TokenCard from 'components/TokenCard';
import { OwnedToken } from 'components/types';
import { useStakeContext } from 'context/StakeContext';

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
  const { unstake } = useStakeContext();

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
          <TokenCard
            key={index}
            token={token}
            info={
              <>
                <p
                  style={{
                    fontWeight: 900,
                    fontSize: 24,
                    color: 'white',
                    marginBottom: 0,
                  }}
                >
                  BUDDIE #{token.numericId.toString()}
                </p>
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: 16,
                    color: '#00CE4C',
                    marginTop: 0,
                  }}
                >
                  BUDDIES
                </p>
              </>
            }
            buttonTitle="Unstake"
            onClick={() => unstake(token.numericId)}
          />
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
