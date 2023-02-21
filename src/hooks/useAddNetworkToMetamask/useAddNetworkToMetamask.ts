import { useCallback, useState } from 'react';
import { ChainId } from '../../constants';
import { SUPPORTED_METAMASK_NETWORKS } from '../../constants/networks';
import { useWeb3React } from '@web3-react/core';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';

export default function useAddNetworkToMetamaskCb(): {
  addNetwork: (chainId: ChainId) => void;
  success: boolean | undefined;
} {
  const { connector } = useWeb3React<Web3Provider>();

  const [success, setSuccess] = useState<boolean | undefined>();

  const addNetwork = useCallback(
    async (chainId: ChainId) => {
      const provider = (await connector?.getProvider()) as ExternalProvider;
      console.log('NETWORK called', { chainId, provider, connector });

      if (provider && provider.request) {
        if (!chainId) {
          setSuccess(false);
          return;
        }
        const network = SUPPORTED_METAMASK_NETWORKS[chainId];
        if (!network) {
          setSuccess(false);
          return;
        }
        console.log('NETWORK', network, chainId, provider);
        try {
          console.debug('NETWORK check');
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: network.chainId }],
          });
          console.debug('NETWORK exists');
          setSuccess(true);
        } catch (switchError) {
          console.debug('NETWORK does not exist', switchError);
          //if ((switchError as any)?.code === 4902) {
          try {
            console.debug('NETWORK add chain', switchError);
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [network],
            });
            console.debug('NETWORK add chain done', switchError);
            setSuccess(true);
          } catch (addError) {
            setSuccess(false);
          }
          //}
        }
      } else {
        setSuccess(false);
      }
    },
    [connector]
  );

  return { addNetwork, success };
}
