import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import MoonModel from './MoonModel';
import { groupUrls, traits } from './config';
import metadata from './meta.json';
import { useActiveWeb3React } from 'hooks';

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
 const { state } = useLocation();
  const { account } = useActiveWeb3React();
  const {tokenId} = state.tokenId;

  const paths = useMemo(() => {
    const paths: string[] = ['./resources/environment/stars.glb'];
    if (tokenId > 0) {
      const meta = metadata[tokenId];
      const attributesArray = meta.attributes;
      for (let i = 0; i < attributesArray.length; i++) {
        const attribute = attributesArray[i];
        const key = attribute.traitType;
        const value = attribute.value;

        if (key === 'Top') {
          if (value === 'Cyber Hoodie White' || value === 'Cyber Hoodie Green') {
            continue;
          }
        }

        if (value !== 'None' && value !== 'False') {
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
