import { styles } from './styles';
import { useClasses } from 'hooks';
import { Footer } from 'ui';
import { Grid } from '@mui/material';

const MintSoon = () => {
    const { mintSoonHeader, mintTimer, timerContainer } = useClasses(styles);
    return (
        <div>
            <div className={ mintSoonHeader }>
                <Grid container spacing={ 2 }>
                    <Grid item md={8} sm={12} className={ timerContainer }>
                        <h3 className={ mintTimer }>MOONBUDDIES MISSION LAUNCH IN:   02 <small>days</small> 16 <small>hours</small> 24 <small>minutes</small> 38 <small>seconds</small></h3>
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <p>Our MOONBUDDIES mission is almost ready, before lift off please see if you are whitelisted and make sure you are on Exosama network when mint your MOONBUDDIES. </p>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default MintSoon;