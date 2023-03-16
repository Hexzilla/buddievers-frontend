import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import MaterialButton from '@mui/material/Button';

const Container = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
`;

const LeftPanel = styled.div`
  display: flex;
  justify-content: right;
  padding-right: 60px;

  @media (max-width: 1020px) {
    justify-content: center;
    padding: 40px;
  }
`;

const ComplexImage = styled('img')`
  width: 400px;
  border-radius: 10px;

  @media (max-width: 1020px) {
    width: 100%;
  }
`;

const MoonBuddiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  margin: 20px 0;

  background: rgba(0, 206, 76, 0.2);
  border-radius: 10px;

  @media (max-width: 1020px) {
    padding: 32px;
  }
`;

const RightPanel = styled(Grid)`
  width: 470px;

  @media (max-width: 1020px) {
    width: 100%;
    padding: 36px;
  }
`;

const MintingComplete = styled(Typography)`
  font-weight: 900;
  font-size: 40px;
  line-height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  margin: 20px 0;
`;

const MintStateContainer = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const MintingDetail = styled(Typography)`
  font-weight: 900;
  font-size: 24px;
  line-height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MintingSubDetail = styled(Typography)`
  line-height: 24px;
  text-align: center;
`;

const MoonBuddle = styled(Typography)`
  font-size: 24px;
  line-height: 36px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #00ce4c;
`;

const MoonBuddleDetail = styled(Typography)`
  width: 390px;
  height: 60px;

  font-weight: 900;
  font-size: 40px;
  line-height: 60px;

  display: flex;
  align-items: center;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const MintButton = styled(MaterialButton)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 235px;
  height: 64px;

  background: rgba(0, 206, 76, 0.6);
  border-radius: 20px;
`;

const MintButtonText = styled(Typography)`
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
  text-transform: uppercase;
`;

const GreenSpan = styled('span')`
  color: #00ce4c;
`;

export const MintComplete = () => {
  return (
    <Container>
      <Grid container direction="row" alignItems="center">
        <Grid item md={6} xs={12}>
          <LeftPanel>
            <ComplexImage alt="complex" src="./B-BUDS 5.png" />
          </LeftPanel>
        </Grid>
        <Grid item md={6} xs={12}>
          <RightPanel container direction="column">
            <MoonBuddiesContainer>
              <MoonBuddle>MoonBuddies</MoonBuddle>
              <MoonBuddleDetail>MoonBuddie #192</MoonBuddleDetail>
            </MoonBuddiesContainer>
            <MintingComplete>
              MINING<GreenSpan>&nbsp;COMPLETE</GreenSpan>
            </MintingComplete>
            <MintStateContainer>
              <MintingDetail>
                CONGRATS, YOU'VE MINTED{' '}
                <span style={{ color: '#00CE4C' }}> &nbsp;12&nbsp; </span>
                /&nbsp;500
              </MintingDetail>
              <MintingSubDetail>
                <div>Welcome to the beginning of an incredible adventure</div>
                <div>
                  through the BUDDIEVERSE. Click below for the next steps.
                </div>
              </MintingSubDetail>
            </MintStateContainer>
            <ButtonContainer>
              <Grid
                container
                direction="row"
                spacing={2}
                sx={{ justifyContent: 'center' }}
              >
                <Grid xs={6}>
                  <MintButton>
                    <MintButtonText>Mint Another</MintButtonText>
                  </MintButton>
                </Grid>
                <Grid xs={6}>
                  <MintButton>
                    <MintButtonText>Go To BuddieVerse</MintButtonText>
                  </MintButton>
                </Grid>
              </Grid>
            </ButtonContainer>
          </RightPanel>
        </Grid>
      </Grid>
    </Container>
  );
};
