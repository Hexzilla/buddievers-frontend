import { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import moment from 'moment';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useStakeContext } from './StakeContext';
import { StakeProvider } from './StakeContext/Provider';
import MyNFTs from 'pages/myNFTs';
import StakedTokenList from './StakedTokenList';
import { styles } from './styles';
import { useInterval } from 'hooks/useInterval';

const CoffeeShop = () => {
  const { account } = useActiveWeb3React();
  const { startTime, stakedTokens, rewards, stake, refresh, claimRewards } =
    useStakeContext();
  const [elaspedTime, setElaspedTime] = useState(0);
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

  useEffect(() => {
    if (startTime) {
      const seconds = moment().diff(new Date(startTime * 1000), 'seconds');
      setElaspedTime(seconds);
    }
  }, [startTime])

  useInterval(() => {
    if (elaspedTime > 0) {
      setElaspedTime(value => value + 1);
    }
  }, 1000);

  const period = useMemo(() => {
    const day = Math.floor(elaspedTime / (3600 * 24));
    const time = moment.utc(elaspedTime * 1000).format("HH\\h mm\\m ss\\s");
    if (day > 0) {
      return `${day}d ${time}`;
    }
    return time;
  }, [elaspedTime]);

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
                <p>{period}</p>
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
