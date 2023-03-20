import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import request from 'graphql-request';
import MoonModel from './MoonModel';
import { groupUrls, traits } from './config';
import metadata from './meta.json';
import { useActiveWeb3React } from 'hooks';
import { QUERY_OWNED_TOKENS } from 'subgraph/erc721Queries';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../constants';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  margin-top: 120px;
  padding-top: 100px;
  background: black;
`;

export type OwnedToken = {
  numericId: string;
};

export type OwnedTokenPayload = {
  tokens: OwnedToken[];
};

const MoonBuilder = () => {
  const { account } = useActiveWeb3React();
  const [tokenId, setTokenId] = useState(0);

  useEffect(() => {
    const getTokens = async () => {
      if (account) {
        const address = account;//'0xdfe055245ab0b67fb0b5ae3ea28cd1fee40299df'; //account;
        const result = await request<OwnedTokenPayload>(
          RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
          QUERY_OWNED_TOKENS(CONTRACT_ADDRESS, address)
        );
        console.log('tokens-result', result);
        if (result?.tokens && result.tokens.length > 0) {
          const token = result.tokens[0];
          setTokenId(Number(token.numericId));
        }
      }
    };
    getTokens();
  }, [account]);

  const paths = useMemo(() => {
    const paths: string[] = [];
    if (tokenId > 0) {
      const meta = metadata[tokenId];
      const attributesArray = meta.attributes;
      for (let i = 0; i < attributesArray.length; i++) {
        const attribute = attributesArray[i];
        const key = attribute.traitType;
        const value = attribute.value;

        if (value !== 'None' && key !== 'Transcended') {
          const fileName = traits[i].find((trait: any) =>
            trait.hasOwnProperty(value)
          )[value];

          paths.push(groupUrls[i] + fileName);
        }
      }
    }
    return paths;
  }, [tokenId]);

  return (
    <StyledContainer>
      <MoonModel paths={paths} />
    </StyledContainer>
  );
};

export default MoonBuilder;
