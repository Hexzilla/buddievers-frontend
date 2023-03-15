import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
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
`;

const ButtonContainer = styled.div`
  padding-top: 40px;
`;

export type MintState = 'soon' | 'online';

type Props = {
  onNext: () => void;
};

export const Welcome = ({ onNext }: Props) => {
  const state: MintState = 'soon';

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      alignItems="center"
      style={{ width: '100%' }}
    >
      <Grid item md={2}>
        <Logo />
      </Grid>
      <Grid item md={2}>
        <MainTitle>
          {state === 'soon' ? 'Mint Soon' : 'Mint Is Online'}
        </MainTitle>
      </Grid>
      <Grid item md={2}>
        <SubTitle>Check Your Whitelist Status</SubTitle>
      </Grid>
      <Grid item md={2}>
        <ButtonContainer>
          <MintButton
            title="Are you registered?"
            onClick={() => onNext()}
          ></MintButton>
        </ButtonContainer>
      </Grid>
    </Grid>
  );
};
