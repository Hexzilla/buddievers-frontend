import { Button } from 'ui';
import { styles } from './IntroSection.styles';
import { useClasses } from 'hooks';

export const IntroSection = () => {
    const {
        container,
        button
    } = useClasses(styles);
    return (
        <div className={container}>
            <Button
                className={button}
                variant="contained"
            >
                JOIN BUDDIES ST.
            </Button>
        </div>
    );
};
