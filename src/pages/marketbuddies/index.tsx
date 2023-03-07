import { styles } from "./styles";
import { useClasses } from 'hooks';
import { Grid } from "@mui/material";

const MarketBuddies = () => {
    const { container, bannerContainer } = useClasses(styles);
    return (
        <div className={container}>
            <div className={ bannerContainer }></div>
            <Grid container spacing={4}>
                <Grid md={3} sm={12}>
                    
                </Grid>
            </Grid>
        </div>
    );
}

export default MarketBuddies