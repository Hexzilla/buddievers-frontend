import styled from '@emotion/styled';
import { Grid, Typography, Checkbox } from '@mui/material';

import { theme } from 'theme/Theme';

import { LiftOffButton } from '../LiftOffButton';

const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;

  width: 190px;
  height: 337px;

  background: ${theme.palette.background.mintDarkBlue} 80%;
  border-radius: 10px;

  @media (max-width: 760px) {
    padding: 20px;
    width: 90%;
    margin: 10px 20px;
  }
`;

const LiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  gap: 20px;

  width: 260px;
  height: 337px;

  background:  ${theme.palette.background.mintBlack} 80%;
  border-radius: 10px;

  @media (max-width: 760px) {
    padding: 20px;
    width: 100%;
    align-items: center;
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
  margin-top: 80px;

  color:  ${theme.palette.text.mintWhite};
  text-transform: uppercase;
`;

const AgreementContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;

  width: 484px;

  background:  ${theme.palette.background.mintBlack}80;
  border-radius: 10px;

  @media (max-width: 760px) {
    padding: 20px;
    width: 100%;
  }
`;

const AgreementFinal = styled.div`
  color:  ${theme.palette.text.mintWhite};
  padding-left: 13px;
`;

const AcceptTerms = styled.div`
  display: flex;
  align-items: center;
  color:  ${theme.palette.text.mintWhite};
`;

const ImageMarket = styled('img')`
  width: 150px;
  height: 150px;

  border-radius: 150px;
`;

const TotalMintLabel = styled(Typography)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: left;
  padding-left: 20px;

  color: ${theme.palette.text.mintWhite};
`;
const TotalMintNumber = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 60px;

  display: flex;
  align-items: center;
  text-align: center;
  padding-left: 15px;

  color:  ${theme.palette.text.mintWhite};
`;

const LiveStatusDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;

  width: 180px;
  height: 48px;
`;

const LiveStatus = styled(Typography)`
  width: 171px;
  height: 24px;

  /* Desktop/Body */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  /* Neutral/White */

  color: ${theme.palette.background.mintWhite};
`;

const GreenSpan = styled('span')`
  color: ${theme.palette.background.mintPrimary};
`;

// const StyledCheckbox = styled(Checkbox)`
//   box-sizing: border-box;

//   left: 0%;
//   right: 0%;
//   top: 0%;
//   bottom: 0%;

//   /* Main/Light Green */

//   color: #00ce4c;
//   /* Main/Light Green */

//   border-radius: 5px;
// `;

export type MintState = 'soon' | 'online';

type Props = {
  onNext: () => void;
};

export const TokenSales = ({ onNext }: Props) => {
  return (
    <Grid container direction="column" spacing={1} alignItems="center">
      <Grid item md={12}>
        <Grid container direction="row" spacing={1} alignItems="center">
          <Grid item md={5} xs={12}>
            <MintContainer>
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item md={12}>
                  <ImageMarket
                    alt="complex"
                    src="./B-BUDS2.png"
                  />
                </Grid>
                <Grid item md={12} alignItems="center">
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item md={6}>
                      <TotalMintLabel>Total minted</TotalMintLabel>
                    </Grid>
                    <Grid item md={6}>
                      <TotalMintNumber>16</TotalMintNumber>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MintContainer>
          </Grid>
          <Grid item md={7} xs={12}>
            <LiveContainer>
              {/* <LiveStatusDiv>
                <LiveStatus>
                  Whitelisted to mint: <span>0</span>
                </LiveStatus>
                <LiveStatus>
                  Whitelisted minted: <GreenSpan>5</GreenSpan>
                </LiveStatus>
              </LiveStatusDiv> */}
              <LiveStatusDiv>
                <LiveStatus>
                  Available to mint: <span>194</span>
                </LiveStatus>
                <LiveStatus>
                  You've minted:<GreenSpan>11</GreenSpan>
                </LiveStatus>
              </LiveStatusDiv>
              <SubTitle>Start Mint.</SubTitle>
              <LiftOffButton title="Lift Off" onClick={() => onNext()} />
            </LiveContainer>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <AgreementContainer>
          <AcceptTerms>
            <Checkbox checked={true} />
            <div>I've read and accept the <GreenSpan>Terms & Conditions</GreenSpan></div>
          </AcceptTerms>
          <AgreementFinal>All sales are final.</AgreementFinal>
        </AgreementContainer>
      </Grid>
    </Grid>
  );
};
