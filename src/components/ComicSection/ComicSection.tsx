import { Button } from 'ui';
import { styles } from './ComicSection.styles';
import { useClasses } from 'hooks';
import { Container, Grid, Paper, Stack } from '@mui/material';

export const ComicSection = () => {
    const {
        container,
        title,
        description,
        button
    } = useClasses(styles);
    return (
        <div className={container}>
            <div>
                <p className={title}>BUDDIES COMIC</p>
                <p className={description}>Incredible stories every month!</p>
            </div>
            <img
                src="./budscomics.png"
            />
            <Button
                className={button}
                variant="contained"
            >
                READ IT
            </Button>
        </div>
    );
};
