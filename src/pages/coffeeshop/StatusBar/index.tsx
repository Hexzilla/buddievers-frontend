import { useMemo } from 'react';
import { Grid } from '@mui/material';
import moment from 'moment';

import { useClasses } from 'hooks';
import { useStakeContext } from 'context/StakeContext';

import { styles } from './styles';

const StatusBar = () => {
  const { startTime, stakedTokens, rewards, claimRewards } = useStakeContext();
  const { claimSection, claimButton, rewardMiddleItem } = useClasses(styles);

  const nextTime = useMemo(() => {
    if (stakedTokens?.length) {
      let sortedTokens = stakedTokens.sort((a, b) => a.timestamp - b.timestamp);
      let firstToken = sortedTokens[0];
      let stakedTime = moment(new Date(firstToken.timestamp * 1000));

      let _startTime = moment(new Date(startTime * 1000));
      let elapsed = moment().diff(_startTime, 'd');
      let rewardTime = _startTime.add(Math.floor(elapsed) + 1, 'd');

      const diff = rewardTime.diff(stakedTime, 'd');
      if (diff < 1) {
        rewardTime = rewardTime.add(1, 'd');
      }
      return rewardTime.format('L HH:mm');
    }
    return '';
  }, [startTime, stakedTokens]);

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
            <Grid item md={3} sm={6} className={rewardMiddleItem}>
              <h3>NEXT REWARD</h3>
              <p>{nextTime}</p>
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
