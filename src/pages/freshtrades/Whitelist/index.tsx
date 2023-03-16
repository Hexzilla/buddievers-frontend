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

  color: #ffffff;
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

  color: #ffffff;
  text-transform: uppercase;

  padding-top: 10px;
`;

const ButtonContainer = styled.div`
  padding-top: 40px;
`;

export type MintState = 'soon' | 'online';

type Props = {
  onNext: () => void;
};

export const Whitelist = ({ onNext }: Props) => {
  const state: MintState = 'soon';

  return (
    <Grid container direction="column" spacing={1} alignItems="center">
      <Grid item>
        <Logo />
      </Grid>
      <Grid item>
        <MainTitle>{state === 'soon' ? 'Sorry' : 'Mint Is Online'}</MainTitle>
      </Grid>
      <Grid item>
        <SubTitle>
          {state === 'soon'
            ? 'You are not whitelisted'
            : 'Join us on the public mint'}
        </SubTitle>
      </Grid>
      <Grid item>
        <ButtonContainer>
          <MintButton
            title="Take me to the lift off"
            onClick={() => onNext()}
          ></MintButton>
        </ButtonContainer>
      </Grid>
    </Grid>
  );
};
