import { Button } from 'ui';
import { styles } from './IntroSection.styles';
import { useClasses } from 'hooks';
import { useMint1Contract } from 'hooks/useContracts/useContracts'
import { MINT1_ADDRESS, ChainId } from '../../constants'

export const IntroSection = () => {
    const mintContract = useMint1Contract(MINT1_ADDRESS[ChainId.MOONRIVER], true);
    
    const {
        container,
        button
    } = useClasses(styles);

    const addWhitelist = async () => {
        const res = await mintContract?.addWhitelist("0x08AB83E12a959ba6114161BbCe921c88aa6c45fE", 6)
    }

    return (
        <div className={container}>
            <Button
                className={button}
                variant="contained"
                onClick={addWhitelist}
            >
                JOIN BUDDIES ST.
            </Button>
        </div>
    );
};
