import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import MoonModel from './MoonModel';
import { groupUrls, traits } from './config';
import metadata from './meta.json';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  margin-top: 120px;
  padding-top: 100px;
  background: #16121e;
`;

const MoonBuilder = () => {
  const { tokenId } = useParams();

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, []);

  const paths = useMemo(() => {
    const paths: string[] = ['/resources/environment/stars.glb'];
    if (tokenId && Number(tokenId) > 0) {
      const index = Number(tokenId);
      const meta = metadata[index];
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

          paths.push('/' + groupUrls[i] + fileName);
        }
      }
    }
    console.log('paths', paths)
    return paths;
  }, [tokenId]);

  return (
    <StyledContainer>
      <MoonModel paths={paths} />
    </StyledContainer>
  );
};

export default MoonBuilder;
