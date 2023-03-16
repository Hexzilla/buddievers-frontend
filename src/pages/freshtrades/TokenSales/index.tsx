import styled from '@emotion/styled';
import { Grid, Typography, Checkbox } from '@mui/material';
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

  background: rgba(6, 0, 64, 0.8);
  border-radius: 10px;
`;

const LiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  gap: 20px;

  width: 260px;
  height: 337px;

  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
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

const Agreement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;

  width: 484px;
  height: 129px;

  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
`;

const AgreementFinal = styled.div`
  color: #FFFFFF;
  padding-left:13px;
`;
const AgreementDetail = styled.div`
  color: #FFFFFF;
`;

const ImageMarket = styled('img')`
  width: 150px;
  height: 150px;

  border-radius: 150px;
`;

const TotalMintLabel = styled(Typography)`
  width: 58px;
  height: 48px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align:left;
  padding-left:20px;

  color: #FFFFFF;
`;
const TotalMintNumber = styled.div`
  width: 42px;
  height: 60px;

  /* Desktop/H2 */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 60px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;
  padding-left:15px;

  /* Neutral/White */

  color: #FFFFFF;
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

  color: #FFFFFF;
`;

const GreenSpan = styled('span')`
  color: #00CE4C
`;

const StyledCheckbox = styled(Checkbox)`
  box-sizing: border-box;

  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  
  /* Main/Light Green */
  
  color: #00CE4C;
  /* Main/Light Green */
  
  border-radius: 5px;
`;

export type MintState = 'soon' | 'online';

type Props = {
  onNext: () => void;
};

export const TokenSales = ({ onNext }: Props) => {
  return (
    <Grid container direction="column" spacing={1} alignItems="center">
      <Grid item md={2}>
        <Grid container direction="row" spacing={1} alignItems="center">
          <Grid item md={5}>
            <MintContainer>
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item md={12}>
                  <ImageMarket alt="complex" src="./moonbuddies marketplace.png" />
                </Grid>
                <Grid item md={6} alignItems="center">
                  <TotalMintLabel>Total minted</TotalMintLabel>
                </Grid>
                <Grid item md={6} alignItems="center">
                  <TotalMintNumber>16</TotalMintNumber>
                </Grid>
              </Grid>
            </MintContainer>
          </Grid>
          <Grid item md={7}>
            <LiveContainer>
              <LiveStatusDiv>
                <LiveStatus>Whitelisted to mint: <span>0</span></LiveStatus>
                <LiveStatus>Whitelisted minted: <GreenSpan>5</GreenSpan></LiveStatus>
              </LiveStatusDiv>
              <LiveStatusDiv>
                <LiveStatus>Available to mint:<span>194</span></LiveStatus>
                <LiveStatus>You´ve minted:<GreenSpan>11</GreenSpan></LiveStatus>
              </LiveStatusDiv>
              <SubTitle>Start Mint.</SubTitle>
              <LiftOffButton
                title="LiftOff"
                onClick={() => onNext()}
              />
            </LiveContainer>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={2}>
        <Agreement>
          <AgreementDetail>
            <Checkbox checked={true} />
            I've read and accept the <GreenSpan>Terms & Conditions</GreenSpan>
          </AgreementDetail>
          <AgreementFinal>
            All sales are final.
          </AgreementFinal>
        </Agreement>
      </Grid>
    </Grid>
  );
};
