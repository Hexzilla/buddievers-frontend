import { Button } from 'ui';
import { styles } from './AboutSection.styles';
import { useClasses } from 'hooks';
import { Container, Grid, Paper } from '@mui/material';

export const AboutSection = () => {
    const {
        leftContainer,
        aboutText,
        subTitleText
    } = useClasses(styles);
    return (
        <Grid container spacing={0}>
            <Grid item xs={6}
                className={leftContainer}
            >
                <p className={aboutText}>ABOUT</p>
                <p className={subTitleText}>An NFT project building the utopia.</p>
                <p>Launched in April 2022, BUDDIES quickly evolved into one of the most successful collections on Kusama Network with just 50 NFTs.</p>
            </Grid>
            <Grid item xs={6}>
                <img
                    src={`${"./about-background.png"}`}
                    style={{width:"100%"}}
                />
            </Grid>
        </Grid>
    );
};
