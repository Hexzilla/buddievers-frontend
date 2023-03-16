import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import MaterialButton from '@mui/material/Button';

const ComplexImage = styled('img')`
    width: 400px;
    height: 500px;

    border-radius: 10px;
`;

const MoonBuddiesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 40px;

    width: 470px;
    height: 176px;

    background: rgba(0, 206, 76, 0.2);
    border-radius: 10px;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 470px;
    height: 176px;

    margin: 30px;
`;

const MintingComplete = styled(Typography)`
    width: 470px;
    height: 60px;

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
const MintingDetail = styled(Typography)`
    width: 439px;
    height: 36px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    /* Neutral/White */

    color: #FFFFFF;
`;
const MintingSubDetail = styled(Typography)`
    width: 456px;
    height: 48px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;

    /* Neutral/White */

    color: #FFFFFF;
`;
const MoonBuddle = styled(Typography)`
    width: 173px;
    height: 36px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    /* Main/Light Green */

    color: #00CE4C;

`;
const MoonBuddleDetail = styled(Typography)`
    width: 390px;
    height: 60px;

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

        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height */

        display: flex;
        align-items: center;
        text-align: center;

        /* Neutral/White */

        color: #FFFFFF;
        text-transform: uppercase;
`;

const ButtonContainer = styled.div`
    width: 500px;
`;

const GreenSpan = styled('span')`
  color: #00CE4C
`;

export const MintComplete = () => {
  return (
    <Grid container direction="row" spacing={1} alignItems="center">
        <Grid item md={4}>
            <ComplexImage alt="complex" src="./B-BUDS 5.png" />
        </Grid>
        <Grid item md={6}>
            <Grid container direction="column" spacing={1}>
                <Grid item md={6}>
                    <MoonBuddiesContainer>
                        <MoonBuddle>MoonBuddies</MoonBuddle>
                        <MoonBuddleDetail>MoonBuddie#192</MoonBuddleDetail>
                    </MoonBuddiesContainer>
                </Grid>
                <DetailContainer>
                    <Grid item md={6}>
                        <MintingComplete>
                            MINING
                                <GreenSpan> &nbsp;COMPLETE</GreenSpan>  
                        </MintingComplete>
                    </Grid>
                    <Grid item md={6}>
                        <MintingDetail>
                            CONGRATS, YOU'VE MINTED{' '}
                                <span style={{ color: '#00CE4C' }}> &nbsp;12&nbsp; </span>
                                /&nbsp;500
                        </MintingDetail>
                        <MintingSubDetail>
                            Welcome to the beginning of an incredible adventure <br />
                            through the BUDDIEVERSE. Click below for the next steps.
                        </MintingSubDetail>
                    </Grid>
                </DetailContainer>
                <ButtonContainer>
                    <Grid item container direction={'row'}>
                        <Grid item xs={6}>
                            <MintButton>
                                <MintButtonText>Mint Another</MintButtonText>
                            </MintButton>
                        </Grid>
                        <Grid item xs={6}>
                            <MintButton>
                                <MintButtonText >Go To BuddieVerse</MintButtonText>
                            </MintButton>
                        </Grid>
                    </Grid>
                </ButtonContainer>
            </Grid>
        </Grid>
    </Grid>
  );
};
