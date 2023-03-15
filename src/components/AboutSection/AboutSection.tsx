import { Button } from 'ui';
import { styles } from './AboutSection.styles';
import { useClasses } from 'hooks';
import { Container, Grid, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export const AboutSection = () => {
    const {
        leftContainer,
        aboutText,
        subTitleText,
        mainText,
        whiteTextSmall,
        whiteTextLarge,
        whiteTextTiny,
        greenBox,
        aboutTextWrapper
    } = useClasses(styles);
    
    return (
        <Grid container spacing={0}>
            <Grid item md={6} sm={12}
                className={leftContainer}
            >
                <div className={aboutTextWrapper}>
                    <p className={aboutText}>ABOUT</p>
                    <p className={subTitleText}>An NFT project building the utopia.</p>
                    <p className={mainText}>Launched in April 2022, BUDDIES quickly evolved into one of the most successful collections on Kusama Network with just 50 NFTs.</p>
                    <p className={mainText}>BUDDIES have built a solid economic backing by collecting assets and through Alpha Trading, thereby proving that it is one of the most successful NFT collections in the Polkadot ecosystem. BUDDIES have 6 core value propositions: Art, Value, Utility, Profitability, Education & Fun.</p>
                    <p className={mainText}>Now, we are working toward our multi-chain future as we will debut our second generation NFT collection on Exosama network. Moonbuddies is the final generation of the BUDDIES NFT collection, but just the beginning for our community goals.</p>
                </div>
                <Stack direction="row" style={{justifyContent: "center", width : "100%"}}>
                    <Item className={greenBox}>
                        <p className={whiteTextLarge}>50</p>
                        <p className={whiteTextSmall}>NFTs</p>
                    </Item>
                    <Item className={greenBox}>
                        <p className={whiteTextLarge}>36</p>
                        <p className={whiteTextTiny}>UNIQUE HOLDERS</p>
                    </Item>
                    <Item className={greenBox}>
                        <p className={whiteTextLarge}>+970</p>
                        <p className={whiteTextTiny}>$KSM VOLUME</p>
                    </Item>
                </Stack>
            </Grid>
            <Grid item md={6} sm={12}>
                <img
                    src={`${"./about-background.png"}`}
                    style={{width:"100%", height:"100%"}}
                />
            </Grid>
        </Grid>
    );
};
