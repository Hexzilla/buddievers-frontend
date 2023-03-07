import { Grid } from "@mui/material";
import { Button } from 'ui';
import { useClasses } from 'hooks';
import { styles } from "./styles";
import { Link } from "react-router-dom";
const MarketPlacePage = () => {
    const { container, introContainer, button, cardImg, cardTitle, cardSubTitle, cardText, cardButton } = useClasses(styles);
    const addWhitelist = () => {
        window.open("https://discord.gg/9HSbQQ7gpw")
    }
    return (
        <div className={container}>
            <div className={introContainer}>
                <Button
                    className={button}
                    variant="contained"
                    onClick={addWhitelist}
                >
                    MARKETPLACE
                </Button>
            </div>

            <Grid container spacing={4} style={{ marginTop : "50px" }}>
                <Grid item md={4} sm={12}>
                    <img src="./B-BUDS1.png" className={cardImg} />
                    <p className={cardTitle}>BUDDIES</p>
                    <p className={cardSubTitle}>Description</p>
                    <p className={cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit massa in est pulvinar mattis. Sed malesuada bibendum sapien, quis ultricies mi lacinia vitae. </p>
                    <Link to={{ pathname : "/https://singular.app/collectibles/kusama/5225293d2cbb586654-BUDDIES" }} target={"_blank"}><button className={cardButton}>SEE COLLECTION</button></Link>
                </Grid>

                <Grid item md={4} sm={12}>
                    <img src="./B-BUDS2.png" className={cardImg} />
                    <p className={cardTitle}>MOONBUDDIES</p>
                    <p className={cardSubTitle}>Description</p>
                    <p className={cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit massa in est pulvinar mattis. Sed malesuada bibendum sapien, quis ultricies mi lacinia vitae. </p>
                    <Link to={{ pathname : "/moonbuddies" }}><button className={cardButton}>SEE COLLECTION</button></Link>
                </Grid>

                <Grid item md={4} sm={12}>
                    <img src="./B-BUDS3.png" className={cardImg} />
                    <p className={cardTitle}>$SEEDS</p>
                    <p className={cardSubTitle}>Description</p>
                    <p className={cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit massa in est pulvinar mattis. Sed malesuada bibendum sapien, quis ultricies mi lacinia vitae. </p>
                    <Link to={{  }}><button className={cardButton}>SEE COLLECTION</button></Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default MarketPlacePage;