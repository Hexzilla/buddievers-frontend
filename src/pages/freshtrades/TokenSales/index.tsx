import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { MintButton } from '../MintButton';
import { Logo } from '../Logo';

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
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;

  //styleName: Desktop/Body;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
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
          <Grid item md={6}>
            <MintContainer>
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item md={12}>
                  <ImageMarket alt="complex" src="./moonbuddies marketplace.png" />
                </Grid>
                <Grid item md={6} alignItems="left">
                  <TotalMintLabel>Total minted</TotalMintLabel>
                </Grid>
                <Grid item md={6} alignItems="right">
                  <TotalMintNumber>16</TotalMintNumber>
                </Grid>
              </Grid>
            </MintContainer>
          </Grid>
          <Grid item md={6}>
            <LiveContainer>
              <LiveStatusDiv>
                <LiveStatus>Whitelisted to mint: 0</LiveStatus>
                <LiveStatus>Whitelisted minted: 5</LiveStatus>
              </LiveStatusDiv>
            </LiveContainer>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={2}>
        <Agreement>I've read and accept the Terms & Conditions</Agreement>
      </Grid>
    </Grid>
  );
};
