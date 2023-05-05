import { Grid } from '@mui/material';

import { useClasses } from 'hooks';
import { useStakeContext } from 'context/StakeContext';

import { styles } from './styles';

const StatusBar = () => {
  const { stakedTokens, rewards, claimRewards } = useStakeContext();
  const { claimSection, claimButton, rewardMiddleItem } = useClasses(styles);

  return (
    <div className={claimSection}>
      <Grid container spacing={2}>
        <Grid item md={3} sm={12}>
          <p style={{ color: 'white' }}>
            Coffee Shop is the place where you can stake / unstake your NFTs to
            earn $SEEDS
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
  );
};

export default StatusBar;
