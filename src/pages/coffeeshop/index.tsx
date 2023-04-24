import { useEffect } from 'react';

import { useActiveWeb3React, useClasses } from 'hooks';
import { StakeProvider } from 'context/StakeContext/Provider';
import { useStakeContext } from 'context/StakeContext';
import MyNFTs from 'pages/myNFTs';

import AttributeDialog from 'components/AttributeDialog';
import EmptyWallet from 'components/EmptyWallet';
import TokenSection from 'components/TokenSection';

import StatusBar from './StatusBar';
import StakedTokenList from './StakedTokenList';
import { styles } from './styles';

const CoffeeShop = () => {
  const { account } = useActiveWeb3React();
  const { loading, stakedTokens, token, setToken, refresh } = useStakeContext();
  const { container, introContainer, bannerTxtContainer, stakedNFTs } =
    useClasses(styles);

  useEffect(() => {
    account && refresh();
  }, [account, refresh]);

  if (!account) {
    return (
      <div className={container}>
        <EmptyWallet />
      </div>
    );
  }

  return (
    <div className={container}>
      <div className={introContainer}>
        <div className={bannerTxtContainer}>
          <p>COFFEE SHOP</p>
        </div>
      </div>
      <StatusBar />
      <TokenSection
        title="STAKED NFTS"
        subTitle={`TOTAL STAKED : ${stakedTokens.length}`}
      >
        <StakedTokenList loading={loading} stakedTokens={stakedTokens} />
      </TokenSection>
      {!!token && (
        <AttributeDialog token={token} onClose={() => setToken(null)} />
      )}
      <div className={stakedNFTs}>
        <MyNFTs />
      </div>
    </div>
  );
};

const CoffeeShopWrapper = () => {
  return (
    <StakeProvider>
      <CoffeeShop />
    </StakeProvider>
  );
};

export default CoffeeShopWrapper;
