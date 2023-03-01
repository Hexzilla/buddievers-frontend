import { Button } from 'ui';
import { styles } from './JoinSection.styles';
import { useClasses } from 'hooks';
import { Container, Grid, Paper, Stack } from '@mui/material';

export const JoinSection = () => {
    const {
        container,
        title,
        description
    } = useClasses(styles);
    return (
        <div className={container}>
            <div>
                <p className={description}>THERE IS NO END OF THE ROAD</p>
                <p className={title}>JOIN BUDDIES ST.</p>
            </div>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <img
                        src="./seeCollections.png"
                        style={{ width: "100%", height: "100%" }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <img
                        src="./seeCollections.png"
                        style={{ width: "100%", height: "100%" }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};
