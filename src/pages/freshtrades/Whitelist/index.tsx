import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';

import { MintButton } from '../MintButton';
import { Logo } from '../Logo';

const MainTitle = styled(Typography)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 60px;

  display: flex;
  align-items: center;
  text-align: center;

  color: white;
  text-transform: uppercase;

  padding-top: 30px;
  @media (max-width: 1020px) {
    padding-top: 100px;
  }
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

  padding-top: 10px;
  @media (max-width: 1020px) {
    padding-top: 20px;
  }
`;

const ButtonContainer = styled.div`
  padding-top: 40px;
  @media (max-width: 1020px) {
    padding-top: 165px;
  }
`;

export enum WhiteState {
  Registered,
  NotRegistered,
}

type Props = {
  state: WhiteState;
  onNext: () => void;
};

export const Whitelist = ({ state, onNext }: Props) => {
  return (
    <Grid container direction="column" spacing={1} alignItems="center">
      <Grid item>
        <Logo />
      </Grid>
      <Grid item>
        <MainTitle>
          {state === WhiteState.Registered ? 'Congratulations' : 'Sorry'}
        </MainTitle>
      </Grid>
      <Grid item>
        <SubTitle>
          {state === WhiteState.Registered
            ? 'You are whitelisted '
            : 'You are not whitelisted'}
        </SubTitle>
      </Grid>
      <Grid item>
        <ButtonContainer>
          <MintButton
            title="Take me to the lift off"
            onClick={() => {
              if (state === WhiteState.Registered) {
                onNext();
              }
            }}
          ></MintButton>
        </ButtonContainer>
      </Grid>
    </Grid>
  );
};
