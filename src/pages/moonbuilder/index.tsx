import { useMemo, useEffect, useState } from 'react';
import { useClasses } from 'hooks';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import MoonModel from './MoonModel';
import request from 'graphql-request';
import { groupUrls, traits } from './config';
import { Grid } from '@mui/material';
import { styles } from '../myNFTs/styles';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../constants';
import { QUERY_TOKEN_BY_ID } from 'subgraph/erc721Queries';
import { OwnedToken, OwnedTokenPayload } from 'components/types';
import uriToHttp from 'utils/uriToHttp';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  margin-top: 140px;
  background: #16121e;
`;

const isOnline = true;

const MoonBuilder = () => {
  const { container, stakedNFTs, stakeTitleLeft } = useClasses(styles);
  let { tokenId } = useParams();
  const [tokens, setTokens] = useState<OwnedToken[]>([]);

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, []);
  
  useEffect(() => {
    const getTokens = async () => {
      if (tokenId) {
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
          setTokens(tokens);
        }
      }
    };
    getTokens();
  }, [tokenId]);

  const paths = useMemo(() => {
    if (!isOnline) return [];
    const paths: string[] = ['/resources/environment/stars.glb'];
    if (tokens.length && tokens[0].metadata) {
      const meta = tokens[0].metadata;
      const attributesArray = meta.attributes;

      const traitPaths: Record<string, string> = {};
      let removeHair = false;
      let transcended = false;

      for (let i = 0; i < attributesArray.length; i++) {
        const attribute = attributesArray[i];
        const key = attribute.traitType;
        const value = attribute.value;

        if (key === 'Top') {
          if (value === 'Cyber Hoodie White' || value === 'Cyber Hoodie Green') {
            removeHair = true;
          }
        }
        if (key === 'Headwear' && value !== 'None') {
          removeHair = true;
        }
        if (key === 'Transcended' && value !== 'False' ){
          transcended = true;
        }

        if (value !== 'None' && value !== 'False') {
          const path = '/' + groupUrls[key] + traits[key][value];
          traitPaths[key] = path;
        }
      }

      if (removeHair) {
        delete traitPaths['Hair'];
      }

      if (transcended) {
        const trait = traitPaths['Transcended'];
        if (trait) {
          paths.push(trait);
        }
      } else {
        paths.push(...Object.values<string>(traitPaths));
      }
    }

    return paths;
  }, [tokens]);

  return (
    <>
      {isOnline ? (
        <StyledContainer>
          <MoonModel paths={paths} />
        </StyledContainer>
      ) : (
        <div className={container}>
          <div className={stakedNFTs}>
            <Grid container>
              <Grid item>
                <p className={stakeTitleLeft}>
                  Sorry, We are waiting for indexer to update
                </p>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};

export default MoonBuilder;
