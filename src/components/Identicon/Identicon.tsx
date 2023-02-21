import { useEffect, useRef } from 'react';
import { styles as style } from './Identicon.styles';
import { useActiveWeb3React, useClasses } from '../../hooks';
import Jazzicon from 'jazzicon';
import { useMediaQuery } from 'beautiful-react-hooks';

export default function Identicon() {
  const styles = useClasses(style);
  const { account } = useActiveWeb3React();
  const ref = useRef<HTMLDivElement>();
  const hideAddress = useMediaQuery(`(max-width: 500px)`);

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(
        Jazzicon(hideAddress ? 16 : 16, parseInt(account.slice(2, 10), 16))
      );
    }
  }, [account]);

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <div className={styles.identiconContainer} ref={ref as any} />;
}
