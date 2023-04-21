import React from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useActiveWeb3React, useClasses } from 'hooks';
import { styles } from './styles';
import { useStaking } from '../staking/useStaking';

type Props = {
  tokenId: number;
};

const StakedToken = ({ tokenId }: Props) => {
  const { account } = useActiveWeb3React();
  const { unstake } = useStaking();
  const { btnUnStake, cardMiddle } = useClasses(styles);

  const handleUnstake = (tokenId: number) => {
    console.log('handleWithdraw');
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    unstake([tokenId])
      .then((result) => {
        console.log('unstake-result', result);
        toast.success('Unstake successfully!');
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
      });
  };

  return (
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
      <button className={btnUnStake} onClick={() => handleUnstake(tokenId)}>
        UNSTAKE
      </button>
    </Grid>
  );
};

export default StakedToken;
