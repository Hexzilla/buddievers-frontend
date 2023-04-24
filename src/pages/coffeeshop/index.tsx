import { useEffect } from 'react';
import { Grid } from '@mui/material';

import { useActiveWeb3React, useClasses } from 'hooks';
import { StakeProvider } from 'context/StakeContext/Provider';
import { useStakeContext } from 'context/StakeContext';
import MyNFTs from 'pages/myNFTs';

import StakedTokenList from './StakedTokenList';
import { styles } from './styles';
import AttributeDialog from 'components/AttributeDialog';

const CoffeeShop = () => {
  const { account } = useActiveWeb3React();
  const {
    loading,
    stakedTokens,
    rewards,
    token,
    setToken,
    stake,
    refresh,
    claimRewards,
  } = useStakeContext();
  const {
    container,
    introContainer,
    bannerTxtContainer,
    claimSection,
    claimButton,
    rewardMiddleItem,
    stakedNFTs,
    stakeTitleLeft,
    stakeTitleRight,
  } = useClasses(styles);

  const handleStakeToken = (tokenId: string) => {
    stake(tokenId);
  };

  useEffect(() => {
    account && refresh();
  }, [account, refresh]);

  return (
    <div className={container}>
      <div className={introContainer}>
        <div className={bannerTxtContainer}>
          <p>COFFEE SHOP</p>
        </div>
      </div>
      <div className={claimSection}>
        <Grid container spacing={2}>
          <Grid item md={3} sm={12}>
            <p style={{ color: 'white' }}>
              Coffee Shop is the place where you can stake / unstake your NFTs
              to earn $SEEDS
            </p>
          </Grid>
          <Grid item md={6} sm={12}>
            <Grid container spacing={4}>
              {/* <Grid item md={3} sm={6} className={rewardMiddleItem}>
                <h3>FUNDS</h3>
                <p>170K $SEEDS</p>
              </Grid> */}
              <Grid item md={3} sm={6} className={rewardMiddleItem}>
                <h3>REWARDS</h3>
                <p>{rewards} $SEEDS</p>
              </Grid>
              <Grid item md={3} sm={6} className={rewardMiddleItem}>
                <h3>STAKED</h3>
                <p>{stakedTokens.length} BUDDIES</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} sm={12}>
            <button className={claimButton} onClick={() => claimRewards()}>
              CLAIM REWARDS
            </button>
          </Grid>
        </Grid>
      </div>
      <div className={stakedNFTs}>
        <Grid container>
          <Grid sm={6}>
            <p className={stakeTitleLeft}>STAKED NFTS</p>
          </Grid>
          <Grid sm={6} style={{ textAlign: 'right' }}>
            <p className={stakeTitleRight}>
              TOTAL STAKED : {stakedTokens.length}
            </p>
          </Grid>
        </Grid>
        <StakedTokenList loading={loading} stakedTokens={stakedTokens} />
      </div>
      {!!token && (
        <AttributeDialog token={token} onClose={() => setToken(null)} />
      )}
      <div className={stakedNFTs}>
        <MyNFTs onStake={handleStakeToken} />
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
