import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import MaterialButton from '@mui/material/Button';

const Container = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: white;
`;

const LeftPanel = styled.div`
  display: flex;
  justify-content: right;
  padding-right: 60px;

  @media (max-width: 1020px) {
    justify-content: center;
    padding: 0 40px 0 40px;
    margin-top: -25px;
  }
`;

const ComplexImage = styled('img')`
  width:400px;
  border-radius: 10px;

  @media (max-width: 1020px) {
    width: 100%;
  }
`;

const RightPanel = styled(Grid)`
   width: 470px;

   @media (max-width: 1020px) {
     width: 100%;
     padding: 40px;
   }
`;

const MoonBuddiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  margin-bottom: 49px;

  width: 100%;
  background: #0078BB20;
  border-radius: 10px;
`;

const MoonBuddle = styled(Typography)`
  font-size: 24px;
  line-height: 36px;

  display: flex;
  align-items: center;
  text-align: center;
  color: #0078BB;
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
  color: white;

  @media (max-width: 1020px) {
    width: 230px;
    height: 120px;
    overflow-wrap: anywhere;
    text-align: justify;
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
  text-transform: uppercase;

  margin-bottom: 35px;

  @media (max-width: 1020px){
    line-height: 40px;
    flex-flow: wrap;
  }
`;

const GreenSpan = styled('span')`
  color: #0078BB;
`;

const CongrateDesktop = styled(Typography)`
  font-weight: 900;
  font-size: 24px;
  line-height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;

  margin-bottom: 7px;

  @media (max-width: 1020px) {
    display: none;
  }
`;

const CongrateMobile = styled(Typography)`
  font-weight: 900;
  font-size: 24px;
  line-height: 36px;

  display: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 1020px) {
    display: flex;
  }
`;

const MintingSubDetail = styled(Typography)`
  line-height: 24px;
  text-align: left;
  margin-bottom: 24px;
  padding: 8px;
`;

const MintButtonContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  @media (max-width: 1020px) {
    flex-wrap: wrap;
  }
`;

const MintButton = styled(MaterialButton)`

  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 10px;

  background: #0078BB60;
  border-radius: 20px;

  @media (max-width: 1020px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const MintButtonText = styled(Typography)`
  line-height: 24px;
  align-items: center;
  text-align: center;
  color: white;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 40px;
  margin-right: 40px;
  white-space: nowrap;
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
                        <MoonBuddle>MOONBUDDIES</MoonBuddle>
                        <MoonBuddleDetail>MOONBUDDIE #192</MoonBuddleDetail>
                    </MoonBuddiesContainer>
                    <MintingComplete>
                      MINING<GreenSpan>&nbsp;COMPLETE</GreenSpan>
                    </MintingComplete>
                    <CongrateDesktop>
                      CONGRATS, YOU'VE MINTED{' '}
                      <span style={{ color: '#0078BB' }}> &nbsp;12&nbsp; </span>
                      /&nbsp;500
                    </CongrateDesktop>
                    <CongrateMobile>Congratulations.</CongrateMobile>
                    <MintingSubDetail>
                      Welcome to the beginning of an incredible adventure through the
                      BUDDIEVERSE. Click below for the next steps.
                    </MintingSubDetail>
                    <MintButtonContainer
                      container
                      direction="row"
                    >
                        <MintButton>
                          <MintButtonText>Mint Another</MintButtonText>
                        </MintButton>
                      
                        <MintButton>
                          <MintButtonText>Go To BuddieVerse</MintButtonText>
                        </MintButton>

                    </MintButtonContainer>
                </RightPanel>
            </Grid>
        </Grid>
    </Container>
  ); 
};
