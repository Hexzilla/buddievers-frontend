import { useMemo } from 'react';
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
  background: black;
`;

type Props = {
  index: number;
};

const MoonBuilder = ({ index }: Props) => {
  const paths = useMemo(() => {
    const paths: string[] = [];
    const meta = metadata[index];
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
    console.log('paths', paths);
    return paths;
  }, [index]);

  return (
    <StyledContainer>
      <MoonModel paths={paths} />
    </StyledContainer>
  );
};

export default MoonBuilder;
