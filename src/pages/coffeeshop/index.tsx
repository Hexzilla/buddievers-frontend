import { useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import { BigNumber, utils } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useStaking } from '../staking/useStaking';
import { StakedTokenItem } from '../staking/types';
import MyNFTs from 'pages/myNFTs';
import StakedTokenList from './StakedTokenList';
import { styles } from './styles';

const CoffeeShop = () => {
  const { account } = useActiveWeb3React();
  const { stake, claimRewards, userStakeInfo } = useStaking();
  const [rewards, setRewards] = useState('0');
  const [stakedTokens, setStakedTokens] = useState<StakedTokenItem[]>([]);
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

  const getRewards = useCallback(async () => {
    return userStakeInfo(account!)
      .then((result) => {
        console.log('getRewards', result);
        if (result && result._availableRewards.gt(BigNumber.from(0))) {
          return Number(utils.formatEther(result._availableRewards));
        }
        return 0;
      })
      .catch((err) => {
        console.error(err);
        return 0;
      });
  }, [account, userStakeInfo]);

  const handleClaimRewards = async () => {
    console.log('handleClaimRewards');
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    const rewards = await getRewards();
    console.log('rewards', rewards);
    if (!rewards) {
      toast.error('You have no rewards!');
      return;
    }

    claimRewards()
      .then((tx) => console.log('claimRewards-result', tx))
      .catch((err) => {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
      });
  };

  const refreshStakeInfo = useCallback(async () => {
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    userStakeInfo(account)
      .then((result) => {
        console.log('userStakeInfo', result);
        if (result) {
          setStakedTokens([]);
          if (result._stakedTokens?.length) {
            const stakedTokens = result._stakedTokens.map((item: any) => {
              return {
                tokenId: item.tokenId.toNumber(),
                timestamp: item.timestamp.toNumber(),
              };
            });
            setStakedTokens(stakedTokens);
          }
          if (result._availableRewards) {
            let rewards = utils.formatEther(result._availableRewards);
            setRewards(Number(rewards).toFixed(2));
          }
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
      });
  }, [account, userStakeInfo]);

  const handleStakeToken = (tokenId: string) => {
    console.log('handleStake', tokenId);
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    stake(account, [Number(tokenId)])
      .then((result) => {
        console.log('stake-result', result);
        if (!result) {
          toast.error('Something went wrong!');
          return;
        }
        refreshStakeInfo();
        toast.success('Staked successfully!');
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
      });
  };

  useEffect(() => {
    account && refreshStakeInfo();
  }, [account, refreshStakeInfo])

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
              <Grid item md={3} sm={6} className={rewardMiddleItem}>
                <h3>FUNDS</h3>
                <p>170K SEED</p>
              </Grid>
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
                <p>4 BUDDIES</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} sm={12}>
            <button className={claimButton} onClick={handleClaimRewards}>CLAIM REWARDS</button>
          </Grid>
        </Grid>
      </div>
      <div className={stakedNFTs}>
        <Grid container>
          <Grid sm={6}>
            <p className={stakeTitleLeft}>STAKED NFTS</p>
          </Grid>
          <Grid sm={6} style={{ textAlign: 'right' }}>
            <p className={stakeTitleRight}>TOTAL STAKED : {stakedTokens.length}</p>
          </Grid>
        </Grid>
        <StakedTokenList stakedTokens={stakedTokens}/>
        {/* <Grid container spacing={2}>
          <Grid item md={3} sm={6}>
            <img
              src="./charactor (3).png"
              style={{ width: '100%', height: '400px', borderRadius: '20px' }}
              alt="nft"
            />
            <div className={cardMiddle}>
              <p
                style={{
                  fontWeight: 900,
                  fontSize: 24,
                  color: 'white',
                  marginBottom: 0,
                }}
              >
                BUDDIE #08
              </p>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                  color: '#00CE4C',
                  marginTop: 0,
                }}
              >
                BUDDIES
              </p>
            </div>
            <button className={btnUnStake}>UNSTAKE</button>
          </Grid>
          <Grid item md={3} sm={6}>
            <img
              src="./charactor (4).png"
              style={{ width: '100%', height: '400px', borderRadius: '20px' }}
              alt="nft"
            />
            <div className={cardMiddle}>
              <p
                style={{
                  fontWeight: 900,
                  fontSize: 24,
                  color: 'white',
                  marginBottom: 0,
                }}
              >
                BUDDIE #010
              </p>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                  color: '#00CE4C',
                  marginTop: 0,
                }}
              >
                BUDDIES
              </p>
            </div>
            <button className={btnUnStake}>UNSTAKE</button>
          </Grid>
          <Grid item md={3} sm={6}>
            <img
              src="./charactor (5).png"
              style={{ width: '100%', height: '400px', borderRadius: '20px' }}
              alt="nft"
            />
            <div className={cardMiddle}>
              <p
                style={{
                  fontWeight: 900,
                  fontSize: 24,
                  color: 'white',
                  marginBottom: 0,
                }}
              >
                BUDDIE #33
              </p>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                  color: '#00CE4C',
                  marginTop: 0,
                }}
              >
                BUDDIES
              </p>
            </div>
            <button className={btnUnStake}>UNSTAKE</button>
          </Grid>
          <Grid item md={3} sm={6}>
            <img
              src="./charactor (6).png"
              style={{ width: '100%', height: '400px', borderRadius: '20px' }}
              alt="nft"
            />
            <div className={cardMiddle}>
              <p
                style={{
                  fontWeight: 900,
                  fontSize: 24,
                  color: 'white',
                  marginBottom: 0,
                }}
              >
                BUDDIE #37
              </p>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                  color: '#00CE4C',
                  marginTop: 0,
                }}
              >
                BUDDIES
              </p>
            </div>
            <button className={btnUnStake}>UNSTAKE</button>
          </Grid>
        </Grid> */}
      </div>
      <div className={stakedNFTs}>
        <MyNFTs onStake={handleStakeToken} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CoffeeShop;
