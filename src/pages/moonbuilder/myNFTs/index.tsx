import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useClasses, useActiveWeb3React } from 'hooks';
import { NavLink } from 'ui';
import useOwnedTokens from './useOwnedTokens';
import { styles } from './styles';

const MyNFTs = () => {
  const {
    container,
    stakedNFTs,
    stakeTitleLeft,
    stakeTitleRight,
    btnUnStake,
    cardMiddle,
  } = useClasses(styles);
  const { account } = useActiveWeb3React();
  const ownedTokens = useOwnedTokens();

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, []);

  const NFTCards = ownedTokens.map((token) => (
    <Grid item md={3} sm={6} key={token.numericId.toString()}>
      <img
        src={token.metadata?.image}
        style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
        alt=""
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
          BUDDIE #{token.numericId.toString()}
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
      <NavLink href={`/builder/${token.numericId}`} className={btnUnStake}>
        View
      </NavLink>
    </Grid>
  ));

  return account ? (
    <div className={container}>
      <div className={stakedNFTs}>
        <Grid container>
          <Grid item sm={6}>
            <p className={stakeTitleLeft}>My NFTS</p>
          </Grid>
          <Grid item sm={6} style={{ textAlign: 'right' }}>
            <p className={stakeTitleRight}>
              TOTAL NFTS : {ownedTokens.length}{' '}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {NFTCards}
        </Grid>
      </div>
    </div>
  ) : (
    <div className={container}>
      <div className={stakedNFTs}>
        <Grid container>
          <Grid item>
            <p className={stakeTitleLeft}>Please Connect Your Wallet</p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MyNFTs;
