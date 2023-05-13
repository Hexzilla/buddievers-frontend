import { useClasses } from 'hooks';
import { Grid } from '@mui/material';

import { useMarketContext } from 'context/MarketContext';
import { formatNumber } from 'utils/utils';
import MarketToolbar from '../Toolbar';
import { styles } from './styles';

const TokenProfile = () => {
  const { seedBalance } = useMarketContext();
  const { container, overViewItem } = useClasses(styles);

  return (
    <div className={container}>
      <Grid container spacing={4}>
        <Grid item md={4} sm={12}>
          <img
            src={`./B-BUDS3.png`}
            style={{ maxWidth: '100%', height: '100%', borderRadius: '20px' }}
          />
        </Grid>
        <Grid item md={8} sm={12}>
          <div>
            <Grid container spacing={2}>
              <Grid item md={3} sm={6}>
                <div className={overViewItem}>
                  <p>VOLUME</p>
                  <h4>200K SAMA</h4>
                </div>
              </Grid>
              <Grid item md={3} sm={6}>
                <div className={overViewItem}>
                  <p>FLOOR PRICE</p>
                  <h4>2500 SAMA</h4>
                </div>
              </Grid>
              <Grid item md={3} sm={6}>
                <div className={overViewItem}>
                  <p>OWNERS</p>
                  <h4>293</h4>
                </div>
              </Grid>
              <Grid item md={3} sm={6}>
                <div className={overViewItem}>
                  <p>MARKET CAP</p>
                  <h4>2M SAMA</h4>
                </div>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={2}>
              <Grid
                item
                md={4}
                sm={12}
                style={{ textAlign: 'left', marginTop: '20px' }}
              >
                <p
                  style={{
                    fontSize: '24px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    margin: 0,
                  }}
                >
                  BUDDIEVERSE
                </p>
                <p
                  style={{
                    fontSize: '38px',
                    color: 'white',
                    fontWeight: '900',
                    margin: 0,
                  }}
                >
                  $SEEDS
                </p>
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                style={{ textAlign: 'right', marginTop: '20px' }}
              >
                <p style={{ fontSize: '24px', color: '#00CE4C', margin: 0 }}>
                  PRICE
                </p>
                <p
                  style={{
                    fontSize: '38px',
                    color: 'white',
                    fontWeight: '900',
                    margin: 0,
                  }}
                >
                  1 SAMA
                </p>
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                style={{ textAlign: 'right', marginTop: '20px' }}
              >
                <p style={{ fontSize: '24px', color: '#00CE4C', margin: 0 }}>
                  PRICE
                </p>
                <p
                  style={{
                    fontSize: '38px',
                    color: 'white',
                    fontWeight: '900',
                    margin: 0,
                  }}
                >
                  0.024 USDT
                </p>
              </Grid>
            </Grid>
          </div>
          <div style={{ color: 'white', marginTop: '20px' }}>
            <p style={{ fontSize: '24px' }}>
              <span style={{ color: '#00CE4C' }}>YOUR BALANCE</span>
              &nbsp;&nbsp;&nbsp; {formatNumber(seedBalance)} $SEEDS
            </p>
          </div>
          <MarketToolbar />
        </Grid>
      </Grid>
    </div>
  );
};

export default TokenProfile;
