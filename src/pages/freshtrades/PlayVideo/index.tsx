import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';

const PlayVideoButton = styled.div`
    /* Buttons V2 */
    @media(max-width: 1020px) {
        padding-top: 150px;
    }
`;

const StyledTitle = styled(Typography)`
    width: 166px;
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
    text-transform : uppercase;
    /* Neutral/White */

    color: white;
    
`;
const ImageLift = styled('img')`
    margin-top: 8px;
    width:83.33px;
    height:83.33px;
`;

type Props = {
    title: string;
    onNext: () => void;
};

export const PlayVideo = ({ title, onNext }: Props) => (
    <PlayVideoButton onClick={onNext}>
        <Grid container direction="column" spacing={1} alignItems="center">
            <Grid item md={4}>
                <ImageLift alt="complex" src="./lift-off-vector.svg"/>
            </Grid> 
            <Grid item md={8}>
                <StyledTitle>{title}</StyledTitle>
            </Grid>
        </Grid>
    </PlayVideoButton>
);