import { useDispatch } from 'react-redux';
import { Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { injected, talisman, walletconnect } from 'connectors';
import { SUPPORTED_WALLETS } from '../../connectors';
import { useAccountDialog, useClasses } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dialog } from 'ui';
import { styles as AccountStyles } from './AccountDialog.styles';
import { isMobile } from 'react-device-detect';
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg';
import MetamaskIcon from '../../assets/images/metamask.png';
import Identicon from '../Identicon/Identicon';
import { Transaction } from './Transaction';
import { clearAllTransactions } from 'state/transactions/actions';
import { AppDispatch } from 'state';
import { useSortedRecentTransactions } from 'state/transactions/hooks';
import { shortenAddress, truncateAddress, truncateHexString } from 'utils';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import OptionCard from './OptionCard';
import usePrevious from 'hooks/usePrevious/usePrevious';
import CircularProgress from '@mui/material/CircularProgress';
import { ExternalLink } from 'components/ExternalLink/ExternalLink';
import useAddNetworkToMetamaskCb from 'hooks/useAddNetworkToMetamask/useAddNetworkToMetamask';
import { ChainId, DEFAULT_CHAIN, NATIVE_TOKEN_SYMBOL, NETWORK_ICONS } from '../../constants';
import { useSettingsConnectorKey } from 'state/settings/hooks';
import { useNativeBalance } from 'hooks/useBalances/useBalances';
import { Fraction } from 'utils/Fraction';

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export const AccountDialog = () => {
  const theme = useTheme()
  const styles = useClasses(AccountStyles);
  const dispatch = useDispatch<AppDispatch>();

  const [pendingWallet, setPendingWallet] = useState<
    AbstractConnector | undefined
  >();
  const [pendingError, setPendingError] = useState<boolean>();
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const sortedRecentTransactions = useSortedRecentTransactions();
  const { addNetwork } = useAddNetworkToMetamaskCb();

  const isSm = useMediaQuery(
    //`(max-width: 400px)`
    theme.breakpoints.down('sm')
  )
  // console.log({isSm})

  const pendingTransactions = sortedRecentTransactions
    .filter((tx) => !tx.receipt)
    .map((tx) => tx.hash);
  const confirmedTransactions = sortedRecentTransactions
    .filter((tx) => tx.receipt)
    .map((tx) => tx.hash);

  const { isAccountDialogOpen, setAccountDialogOpen } = useAccountDialog();
  // error reporting not working (e.g. on unsupported chain id)
  const {
    chainId,
    account,
    connector,
    active,
    error,
    activate,
    deactivate,
    library,
  } = useWeb3React();
  const previousAccount = usePrevious(account);

  // used to persist which connector that should be used for auto-connect
  const { setConnectorKey } = useSettingsConnectorKey();

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && isAccountDialogOpen) {
      setAccountDialogOpen(!isAccountDialogOpen);
    }
  }, [account, previousAccount, isAccountDialogOpen, setAccountDialogOpen]);

  // always reset to account view
  useEffect(() => {
    if (isAccountDialogOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [isAccountDialogOpen]);

  // close modal when a connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);
  useEffect(() => {
    if (
      isAccountDialogOpen &&
      ((active && !activePrevious) ||
        (connector && connector !== connectorPrevious && !error))
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [
    setWalletView,
    active,
    error,
    connector,
    isAccountDialogOpen,
    activePrevious,
    connectorPrevious,
  ]);

  const connectorName = useMemo(() => {
    const provider = library?.provider;
    if (!provider) return 'unknown wallet';

    const isTalisman = !!provider.isTalisman;
    const isMetaMask = !!provider.isMetaMask;
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter((k) => {
        if (isTalisman) return k === 'TALISMAN';
        return (
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === 'METAMASK'))
        );
      })
      .map((k) => SUPPORTED_WALLETS[k].name)[0];

    return name;
  }, [connector, library?.provider]);

  const bal = useNativeBalance();
  let formattedBalance = (Fraction.from(bal ?? '0', 18) as Fraction).toFixed(2)

  const getStatusIcon = useCallback(() => {
    if (connector === injected || connector === talisman) {
      return (
        <div className={styles.iconWrapper}>
          <Identicon />
        </div>
      );
    } else if (connector === walletconnect) {
      return (
        <div className={styles.iconWrapper}>
          <img src={WalletConnectIcon} alt={'wallet connect logo'} />
        </div>
      );
    }
    return null;
  }, [connector, styles.iconWrapper]);

  function renderTransactions(transactions: string[]) {
    return (
      <div className={styles.flexCoumnNoWrap}>
        {transactions.map((hash, i) => {
          return <Transaction key={i} hash={hash} />;
        })}
      </div>
    );
  }

  const showConnectedAccountDetails = useCallback(
    () => (
      <Stack direction="column" spacing={theme.spacing(1)}>
        <div className={styles.walletName}>Connected with {connectorName}</div>
        <Stack direction="row" justifyContent={'center'} alignItems={'center'} alignContent='center' textAlign={'center'} className={styles.fontSize12}>
          {getStatusIcon()}
          <div> {isSm ? truncateHexString(account, 10) : account}</div>
        </Stack>
        <Stack sx={{paddingTop: theme.spacing(0)}} direction="row" justifyContent={'center'} className={styles.fontSize12}>
          <div>Balance</div>
          <div style={{paddingLeft: theme.spacing(2)}}>{`${formattedBalance} ${NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}`}</div>
        </Stack>
        <Button
          variant="outlined"
          color="primary"
          className={styles.row}
          onClick={() => setWalletView(WALLET_VIEWS.OPTIONS)}
          style={{marginTop: theme.spacing(5)}}
        >
          Change
        </Button>
      </Stack>
    ),
    [account, connectorName, getStatusIcon, styles, isSm, formattedBalance]
  );

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }));
  }, [dispatch, chainId]);

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = '';
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });
    setPendingWallet(connector); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (
      connector instanceof WalletConnectConnector &&
      connector.walletConnectProvider?.wc?.uri
    ) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true);
        }
      });
  };

  function getOptions() {
    const isMetamask = window.ethereum && !!window.ethereum.isMetaMask;
    const isTalisman = window.ethereum && !!window.ethereum.isTalisman;
    const isNovaWallet = !!(window.ethereum as any)?.isNovaWallet;

    const options = Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];
      // check for mobile options
      // console.log('Option: ', {
      //   isMobile,
      //   key,
      //   option,
      //   isMetamask,
      //   ww3: !!window.web3,
      //   we: !!window.ethereum,
      // });
      if (isMobile) {
        //disable portis on mobile for now
        //if (option.connector === portis) {
        //  return null
        //}

        if (key == 'METAMASK' && isMetamask && !isNovaWallet && !isTalisman) {
          return (
            <OptionCard
              id={`connect-${key}`}
              onClick={() => {
                option.connector === connector
                  ? setWalletView(WALLET_VIEWS.ACCOUNT)
                  : !option.href && tryActivation(option.connector);
              }}
              key={key}
              active={option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null} //use option.descriptio to bring back multi-line
              icon={option.icon}
            />
          );
        }
        if (key == 'NOVA' && isNovaWallet) {
          return (
            <OptionCard
              id={`connect-${key}`}
              onClick={() => {
                option.connector === connector
                  ? setWalletView(WALLET_VIEWS.ACCOUNT)
                  : !option.href && tryActivation(option.connector);
              }}
              key={key}
              active={option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null} //use option.descriptio to bring back multi-line
              icon={option.icon}
            />
          );
        }

        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <OptionCard
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={'Install Metamask'}
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && (!isMetamask || isTalisman)) {
          return null;
        }
        // likewise for generic
        else if (option.name === 'Injected' && (isMetamask || isTalisman)) {
          return null;
        }
      }

      // if Talisman isn't installed
      if (option.connector === talisman && !window.talismanEth) {
        return (
          <OptionCard
            id={`connect-${key}`}
            key={key}
            color={option.color}
            header={'Install Talisman'}
            subheader={null}
            link={'https://talisman.xyz'}
            icon={option.icon}
          />
        );
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <OptionCard
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
              setConnectorKey(key);
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={option.icon}
          />
        )
      );
    });

    return <div className={styles.walletOptions}>{options}</div>;
  }

  /*
  const showConnectionOptions = useCallback(
    () => (
      <>
        <Button
          variant="outlined"
          color="primary"
          className={styles.button}
          onClick={() => activate(injected)}
        >
          MetaMask
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={styles.button}
          onClick={() => activate(walletconnect)}
        >
          Wallet Connect
        </Button>
        {error && (
          <div className={styles.row}>
            <Typography variant="body2" color="error">{error.message}</Typography>
          </div>
        )}
        <Typography variant="body2" className={styles.row}>
          New to Ethereum?{' '}
          <ExternalLink href="https://ethereum.org/wallets">
            Learn more about wallets
          </ExternalLink>
        </Typography>
      </>
    ),
    [activate, styles]
  );
  */

  function getModalContent() {
    if (error) {
      return (
        <div className={styles.dialogContainer}>
          {error instanceof UnsupportedChainIdError && (
            <>
              <div>Wrong Network</div>
              <h5>Please connect to the appropriate Ethereum network.</h5>
              <Button
                //className={formButton}
                onClick={() => {
                  addNetwork(ChainId.MOONRIVER);
                }}
                startIcon={<img height={'16px'} src={NETWORK_ICONS[ChainId.MOONRIVER]} alt='' />}
                color="primary"
              >
                Switch to Moonriver
              </Button>
              <Button
                //className={formButton}
                onClick={() => {
                  addNetwork(ChainId.MOONBEAM);
                }}
                startIcon={<img height={'16px'} src={NETWORK_ICONS[ChainId.MOONBEAM]} alt='' />}
                color="primary"
              >
                Switch to Moonbeam
              </Button>
            </>
          )}

          {!(error instanceof UnsupportedChainIdError) && (
            <>
              <div>Something went wrong!</div>
              <h5>Error connecting. Try refreshing the page.</h5>
            </>
          )}
        </div>
      );
    }

    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <>
          <div className={styles.dialogContainer}>
            {showConnectedAccountDetails()}
          </div>
          {account &&
            (!!pendingTransactions.length || !!confirmedTransactions.length) ? (
            <div className={styles.lowerSection}>
              <div className={styles.autoRow}>
                <Typography>Recent transactions</Typography>
                <Button
                  className={styles.linkStyledButton}
                  onClick={clearAllTransactionsCallback}
                >
                  (clear all)
                </Button>
              </div>
              {renderTransactions(pendingTransactions)}
              {renderTransactions(confirmedTransactions)}
            </div>
          ) : (
            <div className={styles.lowerSection}>
              <Typography>Your transactions will appear here...</Typography>
            </div>
          )}
        </>
      );
    }
    return (
      <div className={styles.dialogContainer}>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <Button
            className={styles.titleSlot}
            variant="outlined"
            color="primary"
            onClick={() => {
              setPendingError(false);
              setWalletView(WALLET_VIEWS.ACCOUNT);
            }}
          >
            Back
          </Button>
        ) : (
          <span className={styles.titleSlot}>Connect to a wallet</span>
        )}
        {walletView === WALLET_VIEWS.PENDING ? (
          <>
            <CircularProgress />
            {error ? (
              <Typography className={styles.walletPendingText}>
                Error connecting
              </Typography>
            ) : (
              <Typography className={styles.walletPendingText}>
                Initializing...
              </Typography>
            )}
          </>
        ) : (
          getOptions()
        )}
        {walletView !== WALLET_VIEWS.PENDING && (
          <Typography variant="body2" className={styles.row}>
            New to Ethereum? &nbsp;
            <ExternalLink href="https://ethereum.org/wallets">
              Learn more about wallets
            </ExternalLink>
          </Typography>
        )}
      </div>
    );
  }

  return (
    <Dialog
      open={isAccountDialogOpen}
      onClose={() => setAccountDialogOpen(false)}
      title="Account"
    >
      {getModalContent()}
    </Dialog>
  );
};

/**
 * <div className={styles.dialogContainer}>
        {account ? showConnectedAccountDetails() : getOptions()}
      </div>
      {account && (!!pendingTransactions.length || !!confirmedTransactions.length) ? (
        <div className={styles.lowerSection}>
          <div className={styles.autoRow}>
            <Typography>Recent transactions</Typography>
            <Button className={styles.linkStyledButton} onClick={clearAllTransactionsCallback}>(clear all)</Button>
          </div>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </div>
      ) : (
        <div className={styles.lowerSection}>
          <Typography>Your transactions will appear here...</Typography>
        </div>
      )}
 * 
 */
