import { useState, useEffect } from 'react';
import request from 'graphql-request';
import { useActiveWeb3React } from 'hooks';
import { QUERY_OWNED_TOKENS, QUERY_ALL_TOKENS } from 'subgraph/erc721Queries';
import uriToHttp from 'utils/uriToHttp';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../constants';
import { OwnedToken, OwnedTokenPayload } from './types';

export const getAllTokens = async (account: string) => {
  const result: any = await request<OwnedTokenPayload>(
    RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
    QUERY_ALL_TOKENS(CONTRACT_ADDRESS)
  );

  if (result?.tokens && result.tokens.length > 0) {
    const tokens = result.tokens.map((token: OwnedToken) => {
      if (token.metadata?.image) {
        const urls = uriToHttp(token.metadata.image, true);
        token.metadata.image = urls[0];
      }
      return token;
    });
    return tokens;
  }
  return [];
};

const useAllTokens = () => {
  const { account } = useActiveWeb3React();
  const [tokens, setTokens] = useState<OwnedToken[]>([]);

  useEffect(() => {
    if (account) {
      getAllTokens(account).then((tokens) => setTokens(tokens));
    }
  }, [account]);

  return tokens;
};

export default useAllTokens;
