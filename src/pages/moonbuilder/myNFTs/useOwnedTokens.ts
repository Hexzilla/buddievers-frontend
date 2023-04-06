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
  const address = account;//account;
  // const address = "0xDFE055245aB0b67fB0B5AE3EA28CD1fee40299df";
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
    if (account) {
      getOwnedTokens(account).then((tokens) => setTokens(tokens));
    } else {
      setTokens([]);
    }
  }, [account]);

  return tokens;
};

export default useOwnedTokens;
