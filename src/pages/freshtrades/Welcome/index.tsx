import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';

import { useMintOnline } from 'hooks/useMintOnline';

import { MintButton } from '../MintButton';
import { Logo } from '../Logo';

const MainTitle = styled(Typography)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-size: 80px;
  line-height: 80px;

  display: flex;
  align-items: center;
  text-align: center;

  color: white;
  text-transform: uppercase;

  padding-top: 30px;
`;

const SubTitle = styled(Typography)`
  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;

  line-height: 36px;
  align-items: center;
  text-align: center;

  color: white;
  text-transform: uppercase;
  @media (max-width: 1020px) {
    padding: 20px 50px;
  }
`;

const ButtonContainer = styled.div`
  padding-top: 40px;
  @media (max-width: 1020px) {
    padding-top: 80px;
  }
`;

enum MintState {
  Soon,
  Online,
}

type Props = {
  onNext: (state: number) => void;
};

export const Welcome = ({ onNext }: Props) => {
  const remainTime = useMintOnline();

  const mintState = useMemo(() => {
    return remainTime > 0 ? MintState.Soon : MintState.Online;
  }, [remainTime]);

  const isOnline = useMemo(() => mintState === MintState.Online, [mintState]);

  return (
    <Grid container direction="column" spacing={1} alignItems="center">
      <Grid item>
        <Logo />
      </Grid>
      <Grid item>
        <MainTitle>{isOnline ? 'Mint Is Online' : 'Mint Soon'}</MainTitle>
      </Grid>
      <Grid item>
        <SubTitle>Check Your Whitelist Status</SubTitle>
      </Grid>
      <Grid item>
        <ButtonContainer>
          <MintButton
            title="Are you registered?"
            onClick={() => onNext(isOnline ? 2 : 1)}
          ></MintButton>
        </ButtonContainer>
      </Grid>
    </Grid>
  );
};
