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
        const res = await mintContract?.updateMerkleRootPromotion('0xaaca46a450a802eba9d7cc1106a33bc3c4a5a98589a789a00ac02c08b8e36ceb')
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
