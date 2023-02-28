import { Button } from 'ui';
import { styles } from './RoadSection.styles';
import { useClasses } from 'hooks';
import { Container, Grid, Paper, Stack } from '@mui/material';

export const RoadSection = () => {
    const {
        container,
        stepContainer,
        title
    } = useClasses(styles);
    return (
        <div className={container}>
            <p className={title}>ROADMAP</p>
            <div className={stepContainer}>
                <img src="./roadstep.png" style={{width: "70%"}}/>
            </div>
        </div>
    );
};
