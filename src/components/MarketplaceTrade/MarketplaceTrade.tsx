import { useClasses } from 'hooks';
import { styles } from './MarketplaceTrade.styles';
 
export const MarketplaceTrade = () => {
    const { tradeButtons, tradeButton } = useClasses(styles);
    return (
        <div style={{ marginTop : "50px" }}>
            <div className={ tradeButtons }>
                <button id="btnBuy" className={ tradeButton }>BUY</button>
                <button id="btnSell" className={ tradeButton }>SELL</button> 
            </div>
            
        </div>
    );
}