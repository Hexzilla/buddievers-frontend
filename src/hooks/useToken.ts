import { useEffect, useState } from 'react';
import { QUERY_TOKEN_BY_ID } from 'subgraph/erc721Queries';
import { RARESAMA_SUBGRAPH_URLS, ChainId, CONTRACT_ADDRESS } from '../constants';
import request from 'graphql-request';
import { OwnedToken, OwnedTokenPayload } from 'components/types';

export const useToken = (tokenId: string) => {
  const [token, setToken] = useState<OwnedToken | null>(null);

  useEffect(() => {
    const getToken = async (tokenId: string) => {
      const result: any = await request<OwnedTokenPayload>(
        RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
        QUERY_TOKEN_BY_ID(CONTRACT_ADDRESS, tokenId)
      );

      if (result?.tokens && result.tokens.length > 0) {
        setToken(result.tokens[0]);
      }
    }
    tokenId && getToken(tokenId);
  }, [tokenId])

  return { token };
};
