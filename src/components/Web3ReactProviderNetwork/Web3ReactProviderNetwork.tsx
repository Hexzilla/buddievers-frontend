//import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from '@web3-react/core';

import { createWeb3ReactRoot } from '@web3-react/core';
import { NetworkContextName } from '../../constants';

const Web3ReactProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const Web3ReactProviderNetworkSSR = ({
  children,
  getLibrary,
}: {
  children: any;
  getLibrary: any;
}) => {
  // alternative for the SSR web3 root problem
  // leave it here just in case
  /*
  let Web3ReactProviderNetwork;

  try {
    Web3ReactProviderNetwork = createWeb3ReactRoot(NetworkContextName);
  } catch {
    console.log('FUUCK');
    return <>{children}</>;
  }
  */
  return (
    <Web3ReactProviderNetwork getLibrary={getLibrary}>
      {children}
    </Web3ReactProviderNetwork>
  );
};

export default Web3ReactProviderNetworkSSR;
