import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { useEffect } from 'react';

export const useInactiveListener = (suppress = false) => {
  const { active, activate, error } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.debug("Handling 'connect' event");
        activate(injected);
      };

      const handleChainChanged = () => {
        activate(injected).catch((err) =>
          console.debug('Failed to activate after chain changed', err)
        );
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          activate(injected).catch((err) =>
            console.debug('Failed to activate after account changed', err)
          );
        }
      };

      const handleNetworkChanged = (networkId: string | number) => {
        console.debug(
          "Handling 'networkChanged' event with payload",
          networkId
        );
        activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
};
