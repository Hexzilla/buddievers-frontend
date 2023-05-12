import { useState, useMemo } from 'react';
import { Box, Grid, Tabs, Tab } from '@mui/material';
import styled from '@emotion/styled';

import OfferTable from 'components/Marketplace/OfferTable';
import SellToken from 'components/Marketplace/SellToken';
import BuyToken from 'components/Marketplace/BuyToken';
import OfferTabs from '../OfferTabs';

const Container = styled.div`
  background: #01472a;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const StyledButton = styled.button`
  width: 70px;
  height: 44px;
  background: #00ce4c;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin-left: 20px;
`;

function createData(
  ID: string,
  Price: string,
  Endsin: string,
  Seller: string,
  offerType: number = 0
) {
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
    0
  ),
  createData(
    '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93',
    '15000',
    '5 hours 10 min 50 sec',
    '0x8812f12bf1b651b4c8231e033efc93b2cb8891fd',
    1
  ),
  createData(
    '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93',
    '35000',
    '17 hours 28 min 02 sec',
    '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93',
    1
  ),
  createData(
    '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93',
    '45000',
    '2 days 8hours 27 min 38 sec',
    '0xebdabb5c42b0404c70ebfb77a75428715a6e82',
    1
  ),
];

const ItemTable = () => {
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
    <Container>
      {/* <Grid container spacing={0}>
        <StyledButton id="btnBuy" onClick={() => setOfferType(0)}>
          BUY
        </StyledButton>
        <StyledButton id="btnSell" onClick={() => setOfferType(1)}>
          SELL
        </StyledButton>
      </Grid> */}

      <OfferTabs
        value={offerType}
        onChange={(e: any, value: number) => setOfferType(value)}
      />

      <div>
        <OfferTable offers={datasource} onTakeOffer={onTakeOffer} />
      </div>

      {!!offer && offerType == 0 && (
        <BuyToken offer={offer} onClick={() => onTakeOffer(null)} />
      )}
      {!!offer && offerType == 1 && (
        <SellToken offer={offer} onClick={() => onTakeOffer(null)} />
      )}
    </Container>
  );
};

export default ItemTable;
