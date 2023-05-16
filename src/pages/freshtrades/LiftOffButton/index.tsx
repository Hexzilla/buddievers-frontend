import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import MaterialButton from '@mui/material/Button';

import { theme } from 'theme/Theme';

const StyledButton = styled(MaterialButton)`
    /* Buttons V2 */

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px 40px;
    gap: 10px;

    width: 180px;
    height: 60px;

    /* Main/Beige */

    background: #0078BB;
    border-radius: 20px;

`;

const StyledTitle = styled(Typography)`
    width: 65px;
    height: 24px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    /* Main/Dark Green */
    color: white;

    text-transform: uppercase;
`;
const ImageLift = styled('img')`
    margin-top: 8px;

`;

type Props = {
    title: string;
    onClick: () => void;
};

export const LiftOffButton = ({ title, onClick }: Props) => (
    <StyledButton onClick={onClick}>
        <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item md={4}>
                <ImageLift alt="complex" src="./lift-off-vector.svg"/>
            </Grid> 
            <Grid item md={8}>
                <StyledTitle>{title}</StyledTitle>
            </Grid>
        </Grid>
    </StyledButton>
);
