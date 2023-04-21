import React, { useCallback, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import request from 'graphql-request';

import { useActiveWeb3React, useClasses } from 'hooks';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../../constants';
import { QUERY_TOKEN_BY_ID } from 'subgraph/erc721Queries';
import uriToHttp from 'utils/uriToHttp';

import { OwnedToken, OwnedTokenPayload } from '../../moonbuilder/types';
import { useStakeContext } from '../StakeContext';
import { styles } from '../styles';

type Props = {
  tokenId: string;
};

const StakedToken = ({ tokenId }: Props) => {
  const { account } = useActiveWeb3React();
  const { unstake } = useStakeContext();
  const [token, setToken] = useState<OwnedToken>({} as OwnedToken);
  const { btnUnStake, cardMiddle } = useClasses(styles);

  const getTokenInfo = useCallback(async () => {
    const result: any = await request<OwnedTokenPayload>(
      RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
      QUERY_TOKEN_BY_ID(CONTRACT_ADDRESS, tokenId.toString())
    );

    if (result?.tokens && result.tokens.length > 0) {
      const tokens = result.tokens.map((token: OwnedToken) => {
        if (token.metadata?.image) {
          const urls = uriToHttp(token.metadata.image, true);
          token.metadata.image = urls[0];
        }
        return token;
      });
      console.log('tokens', tokens)
      setToken(tokens[0]);
    }
  }, [tokenId]);

  useEffect(() => {
    account && getTokenInfo();
  }, [account, getTokenInfo]);

  return (
    <Grid item md={3} sm={6}>
      <img
        src={token.metadata?.image}
        style={{ width: '100%', height: '400px', borderRadius: '20px' }}
        alt="nft"
      />
      <div className={cardMiddle}>
        <p
          style={{
            fontWeight: 900,
            fontSize: 24,
            color: 'white',
            marginBottom: 0,
          }}
        >
          BUDDIE #{token.numericId?.toString()}
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
      </div>
      <button className={btnUnStake} onClick={() => unstake(tokenId)}>
        UNSTAKE
      </button>
    </Grid>
  );
};

export default StakedToken;
