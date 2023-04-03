import { useState, useEffect } from 'react';
import request from 'graphql-request';
import { useActiveWeb3React } from 'hooks';
import { QUERY_OWNED_TOKENS } from 'subgraph/erc721Queries';
import uriToHttp from 'utils/uriToHttp';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../../constants';
import { OwnedToken, OwnedTokenPayload } from '../types';

export const getOwnedTokens = async (account: string) => {
  const address = '0xdfe055245ab0b67fb0b5ae3ea28cd1fee40299df';//account;
  const result: any = await request<OwnedTokenPayload>(
    RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
    QUERY_OWNED_TOKENS(CONTRACT_ADDRESS, address)
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

const useOwnedTokens = () => {
  const { account } = useActiveWeb3React();
  const [tokens, setTokens] = useState<OwnedToken[]>([]);

  useEffect(() => {
    if (true) {
      getOwnedTokens('1').then((tokens) => setTokens(tokens));
    }
  }, [account]);

  return tokens;
};

export default useOwnedTokens;
