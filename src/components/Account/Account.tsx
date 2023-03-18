import { Button } from 'ui';
import { HeaderBalance } from 'components/HeaderBalance/HeaderBalance';
import { UnsupportedChainIdError } from '@web3-react/core';
import { useAccountDialog, useActiveWeb3React, useClasses } from 'hooks';
// import { shortenAddress } from 'utils';
import Identicon from 'components/Identicon/Identicon';
import { Activity } from 'react-feather';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletSharp';
import { styles } from './Account.styles';

type props = {
  root: string
}

export const Account = ({root}:props) => {
  const { account, error } = useActiveWeb3React();
  const { setAccountDialogOpen } = useAccountDialog();
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const hideAddress = useMediaQuery(
    `(max-width: 492px)`
  )

  const showError = error ? true : false;
  const errMessage =
    error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error';

  const { buttonHome, buttonMint } = useClasses(styles);

  return (
      <Button
        className={`${root === 'home' ? buttonHome : buttonMint}`}
        size="medium"
        disableRipple
        onClick={() => setAccountDialogOpen(true)}
        style={{ marginTop : "-10px" }}
      > 
        {/* {account && !isSm && <HeaderBalance />} */}

        {showError ? (
          errMessage
        ) : account ? (
          hideAddress ? (
            <div style={{ fontSize: 0, margin: '0 8px' /*maxWidth:'16px',  maxHeight:'16px' */}}>
              <Identicon />
            </div>
          ) : (
            // 
            'DISCONNECT'
          )
        ) : (
          !isSm ? (
            'CONNECT WALLET'
          ): ('')
        )}
      </Button>
  );
};
