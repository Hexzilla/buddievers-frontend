import { useWeb3React } from '@web3-react/core';

import { AbstractConnector } from '@web3-react/abstract-connector';
import { injected, SUPPORTED_WALLETS } from 'connectors';
import { useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSettingsConnectorKey } from 'state/settings/hooks';

const useAutoConnectConnector = () => {
  // get last used connector, persisted in local storage
  const { connectorKey } = useSettingsConnectorKey();

  const connector = useMemo(() => {
    let connector = connectorKey && SUPPORTED_WALLETS[connectorKey]?.connector;
    if (!connector) connector = injected;
    return connector;
  }, [connectorKey]);

  return connector as AbstractConnector & {
    isAuthorized?: () => Promise<boolean>;
  };
};

export function useEagerConnect() {
  const connector = useAutoConnectConnector();
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    connector.isAuthorized?.().then((isAuthorized) => {
      if (isAuthorized) {
        activate(connector, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      }
    });
  }, [activate, connector]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}
