import { useEffect, useState } from 'react';
import request from 'graphql-request';

import { RARESAMA_SUBGRAPH_URLS, ChainId, CONTRACT_ADDRESS } from '../constants';
import { QUERY_TOKEN_BY_ID } from 'subgraph/erc721Queries';
import { OwnedToken, OwnedTokenPayload } from 'components/types';
import uriToHttp from 'utils/uriToHttp';

export const useToken = (tokenId: string) => {
  const [token, setToken] = useState<OwnedToken | null>(null);

  useEffect(() => {
    const getToken = async (tokenId: string) => {
      const result: any = await request<OwnedTokenPayload>(
        RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
        QUERY_TOKEN_BY_ID(CONTRACT_ADDRESS, tokenId)
      );

      if (result?.tokens && result.tokens.length > 0) {
        const tokens = result.tokens.map((token: OwnedToken) => {
          if (token.metadata?.image) {
            const urls = uriToHttp(token.metadata.image, true);
            token.metadata.image = urls[0];
          }
          return token;
        });
        setToken(tokens[0]);
      }
    }
    tokenId && getToken(tokenId);
  }, [tokenId])

  return { token };
};
