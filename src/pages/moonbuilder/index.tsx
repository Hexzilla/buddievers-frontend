import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import MoonModel from './MoonModel';
import { useClasses } from 'hooks';
import { groupUrls, traits } from './config';
import metadata from './meta.json';
import { Grid } from '@mui/material';
import { styles } from './myNFTs/styles';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  margin-top: 120px;
  padding-top: 100px;
  background: black;
`;

const isOnline = true;

const MoonBuilder = () => {
  const { container, stakedNFTs, stakeTitleLeft } = useClasses(styles);
  const { tokenId } = useParams();

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, []);

  const paths = useMemo(() => {
    if (!isOnline) return [];

    const paths: string[] = ['/resources/environment/stars.glb'];
    if (tokenId && Number(tokenId) >= 0) {
      const index = Number(tokenId);
      const meta = metadata[index];
      const attributesArray = meta.attributes;

      const traitPaths: Record<string, string> = {};
      let removeHairTrait = false;

      for (let i = 0; i < attributesArray.length; i++) {
        const attribute = attributesArray[i];
        const key = attribute.traitType;
        const value = attribute.value;

        if (key === 'Top') {
          if (value === 'Cyber Hoodie White' || value === 'Cyber Hoodie Green') {
            removeHairTrait = true;
          }
        }
        if (key === 'Headwear' && value !== 'None') {
          removeHairTrait = true;
        }

        if (value !== 'None' && value !== 'False') {
          const fileName = traits[i].find((trait: any) =>
            trait.hasOwnProperty(value)
          )[value];

          const path = '/' + groupUrls[i] + fileName;
          traitPaths[key] = path;
        }
      }

      if (removeHairTrait) {
        delete traitPaths['Hair'];
      }

      paths.push(...Object.values<string>(traitPaths));
    }
    return paths;
  }, [tokenId]);

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
