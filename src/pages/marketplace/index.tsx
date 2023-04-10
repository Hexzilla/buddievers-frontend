import { Grid } from "@mui/material";
import { Button } from 'ui';
import { useClasses } from 'hooks';
import { styles } from "./styles";
import { Link } from "react-router-dom";
const MarketPlacePage = () => {
    const { container, introContainer, button, cardImg, cardTitle, cardSubTitle, cardText, cardButton, bannerContainer } = useClasses(styles);
    const addWhitelist = () => {
        window.open("https://discord.gg/9HSbQQ7gpw")
    }
    return (
        <div className={container}>
            <div className={introContainer}>
                <div className={ bannerContainer }>
                    <p>MARKETPLACE</p>
                </div>
            </div>

            <Grid container spacing={2} style={{ marginTop : "50px" }}>
                <Grid item md={4} sm={12}>
                    <img src="./B-BUDS1.png" className={cardImg} /><br /><br />
                    <p className={cardTitle}>BUDDIES</p>
                    <p className={cardSubTitle}>GENERATION1</p>
                    <p className={cardText}>Genesis project with 50 NFTs allocated in Kusama Network</p><br /><br />
                    <Link to="https://singular.app/collectibles/kusama/5225293d2cbb586654-BUDDIES" target={"_blank"}><button className={cardButton}>SEE COLLECTION</button></Link>
                </Grid>

                <Grid item md={4} sm={12}>
                    <img src="./B-BUDS2.png" className={cardImg} /><br /><br />
                    <p className={cardTitle}>MOONBUDDIES</p>
                    <p className={cardSubTitle}>GENERATION2</p>
                    <p className={cardText}>3D NFT project with 500 NFTs allocated in Exosama Network</p><br /><br />
                    {/* <Link to={{ pathname : "/moonbuddies" }}><button className={cardButton}>SEE COLLECTION</button></Link> */}
                    <Link to="https://raresama.com/collections/2109/0xbaf909886c0a0cc195fd36ea24f21f93abc23c2c" target={"_blank"}><button className={cardButton}>SEE COLLECTION</button></Link>
                </Grid>

                <Grid item md={4} sm={12}>
                    <img src="./B-BUDS3.png" className={cardImg} /><br /><br />
                    <p className={cardTitle}>$SEEDS</p>
                    <p className={cardSubTitle}>BUDDIES ECONOMY</p>
                    <p className={cardText}>Buddieverse alpha resource that let you to participate in events, to buy composable items and more</p><br />
                    <Link to={{ pathname : "/seeds" }}><button className={cardButton}>SEE COLLECTION</button></Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default MarketPlacePage;