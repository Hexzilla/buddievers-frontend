import styled from '@emotion/styled';
import { useState } from 'react';

import { Video } from 'ui';

import { MintComplete } from './MintComplete';
import { TokenSales } from './TokenSales';
import { Welcome } from './Welcome';
import { Whitelist, WhiteState } from './Whitelist';

const Container = styled.div`
  position: relative;
  background-color: black;
`;

const VideoContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 0;
  @media (max-width: 1020px) {
    display: none;
  }
`;

const MintContainer = styled.div`
  height: 1200px;

  padding-top: 300px;
  padding-bottom: 200px;
  position: inherit;
  z-index: 1;

  @media (max-width: 1020px) {
    height: 100%;
    min-height: 100vh;
    padding-top: 130px;
    padding-bottom: 40px;
  }
`;

const FreshTradesPage = () => {
  const [stage, setStage] = useState(0);

  return (
    <Container>
      <VideoContainer>
        <Video id="background-video" loop autoPlay>
          <source src="./background.mp4" type="video/mp4" />
        </Video>
      </VideoContainer>
      <MintContainer>
        {stage === 0 && <Welcome onNext={(state) => setStage(state)} />}
        {stage === 1 && (
          <Whitelist
            state={WhiteState.NotRegistered}
            onNext={() => setStage(2)}
          />
        )}
        {stage === 2 && <TokenSales onNext={() => setStage(3)} />}
        {stage === 3 && <MintComplete />};
      </MintContainer>
    </Container>
  );
};

export default FreshTradesPage;
