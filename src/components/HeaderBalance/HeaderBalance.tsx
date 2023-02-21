import { useActiveWeb3React, useClasses } from 'hooks';
import { styles } from './HeaderBalance.styles';
import { useNativeBalance } from '../../hooks/useBalances/useBalances';
import { Fraction } from '../../utils/Fraction';
import { DEFAULT_CHAIN, NATIVE_TOKEN_SYMBOL } from '../../constants';

export const HeaderBalance = () => {
  const { balanceContainer, balance } = useClasses(styles);
  const {chainId} = useActiveWeb3React()

  const bal = useNativeBalance();
  let formattedBalance = Fraction.from(bal, 18);

  return (
    <>
      <div className={balanceContainer}>
        <div className={balance}>{formattedBalance?.toFixed(0)}</div>
        {formattedBalance && <p>{NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}</p>}
      </div>
    </>
  );
};
