import { useState, useMemo } from 'react';
import { useClasses } from 'hooks';
import { styles } from './styles';
import { Box, Grid, Tabs, Tab } from '@mui/material';
import OfferTable from 'components/Marketplace/OfferTable';
import SellToken from 'components/Marketplace/SellToken';
import BuyToken from 'components/Marketplace/BuyToken';

function createData(ID: string, Price: string, Endsin: string, Seller: string, offerType: number = 0) {
  return {
    id: ID,
    ID,
    price: Price,
    Price,
    expiration: Endsin,
    quantity: 140,
    Endsin,
    owner: Seller,
    Seller,
    offerType,
  };
}

const test_offers = [
  createData(
    '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93',
    '25000',
    '4 hours 2 min 10 sec',
    '0x8f02063402eefae824b3a71c06da48fc51a4e8',
    0,
  ),
  createData(
    '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93',
    '15000',
    '5 hours 10 min 50 sec',
    '0x8812f12bf1b651b4c8231e033efc93b2cb8891fd',
    1,
  ),
  createData(
    '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93',
    '35000',
    '17 hours 28 min 02 sec',
    '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93',
    1,
  ),
  createData(
    '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93',
    '45000',
    '2 days 8hours 27 min 38 sec',
    '0xebdabb5c42b0404c70ebfb77a75428715a6e82',
    1,
  ),
];

const Seeds = () => {
  const {
    container,
    overViewItem,
    btnBuy,
    btnOffer,
    tradeButtons,
    tradeButton,
    tableBtn,
    tradeTable,
    tableWrapper,
  } = useClasses(styles);

  const [offers, setOffers] = useState(test_offers);
  const [offer, setOffer] = useState(null);
  const [offerType, setOfferType] = useState(0);

  const datasource = useMemo(() => {
    return offers.filter((item: any) => item.offerType === offerType);
  }, [offers, offerType]);

  const onTakeOffer = (offer: any) => {
    setOffer(offer);
  };

  return (
    <div>
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
                &nbsp;&nbsp;&nbsp; 100 000$SEEDS
              </p>
            </div>
            <div style={{ marginTop: '6vh' }}>
              <Grid container spacing={2}>
                <Grid item md={4} sm={12}>
                  <button className={btnBuy}>BUY $SEEDS</button>
                </Grid>
                <Grid item md={4} sm={12}>
                  <button className={btnBuy}>SELL $SEEDS</button>
                </Grid>
                <Grid item md={4} sm={12}>
                  <button className={btnBuy}>TRANSFER</button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={tableWrapper}>
        <div>
          <div className={tradeButtons}>
            <button
              id="btnBuy"
              className={tradeButton}
              onClick={() => setOfferType(0)}
            >
              BUY
            </button>
            <button
              id="btnSell"
              className={tradeButton}
              onClick={() => setOfferType(1)}
            >
              SELL
            </button>
          </div>
        </div>
        <Tabs
          value={offerType}
          onChange={(e, value) => setOfferType(value)}
          centered
        >
          <Tab label="BUY OFFERS" />
          <Tab label="SELL OFFERS" />
          <Tab label="YOUR  OFFERS" />
        </Tabs>

        <div>
          <OfferTable offers={datasource} onTakeOffer={onTakeOffer} />
        </div>

        {!!offer && offerType == 0 && (
          <BuyToken offer={offer} onClick={() => onTakeOffer(null)} />
        )}
        {!!offer && offerType == 1 && (
          <SellToken offer={offer} onClick={() => onTakeOffer(null)} />
        )}
      </div>
    </div>
  );
};

export default Seeds;
