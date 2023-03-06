import { Button } from 'ui';
import { useClasses } from 'hooks';
import {styles} from './MarketIntroSection.styles';
export const MarketIntroSection = () => {
    const { container, button } = useClasses(styles);
    const addWhitelist = async () => {
        // const res = await mintContract?.flipPublicSaleState();
        // const res = await mintContract?.flipWhiteListSaleState();
        window.open("https://discord.gg/9HSbQQ7gpw")
    }
    return (
        <div className={container}>
            <Button
                className={button}
                variant="contained"
                onClick={addWhitelist}
            >
                MARKETPLACE
            </Button>
        </div>
    );
}