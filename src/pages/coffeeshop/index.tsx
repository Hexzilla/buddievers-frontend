import { useEffect } from 'react';
import { Grid } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useStakeContext } from './StakeContext';
import { StakeProvider } from './StakeContext/Provider';
import MyNFTs from 'pages/myNFTs';
import StakedTokenList from './StakedTokenList';
import { styles } from './styles';

const CoffeeShop = () => {
  const { account } = useActiveWeb3React();
  const { stakedTokens, rewards, stake, refresh, claimRewards } =
    useStakeContext();
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
                <p>170K SEED</p>
              </Grid> */}
              <Grid item md={3} sm={6} className={rewardMiddleItem}>
                <h3>REWARDS</h3>
                <p>{rewards} SEED</p>
              </Grid>
              <Grid item md={3} sm={6} className={rewardMiddleItem}>
                <h3>PERIOD</h3>
                <p>20d 04h 20m 15s</p>
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
        <StakedTokenList stakedTokens={stakedTokens} />
      </div>
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
