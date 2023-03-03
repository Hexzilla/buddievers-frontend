import { Button } from 'ui';
import { styles } from './JoinSection.styles';
import { useClasses } from 'hooks';
import { Container, Grid, Paper, Stack } from '@mui/material';

export const JoinSection = () => {
    const {
        container,
        title,
        hypers,
        description,
        collection
    } = useClasses(styles);
    return (
        <div className={container}>
            <div>
                <p className={description}>THERE IS NO END OF THE ROAD</p>
                <p className={title}>JOIN BUDDIES ST.</p>
            </div>
            <Grid container spacing={0} className={collection}>
                <Grid item md={6} sm={12}>
                    {/* <img
                        src="./seeCollections.png"
                        style={{ width: "100%", height: "100%" }}
                    /> */}
                    <a className={hypers} href="https://singular.app/collectibles/kusama/5225293d2cbb586654-BUDDIES"><p >BUDDIES</p></a>

                </Grid>
                <Grid item md={6} sm={12}>
                    {/* <img
                        src="./seeCollections.png"
                        style={{ width: "100%", height: "100%" }}
                    /> */}
                    <a className={hypers} href="#"><p >MOONBUDDIES</p></a>

                </Grid>
            </Grid>
        </div>
    );
};
