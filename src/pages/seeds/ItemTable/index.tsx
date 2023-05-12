import { useState, useCallback, useMemo } from 'react';
import { Box, Grid, Tabs, Tab } from '@mui/material';
import styled from '@emotion/styled';

import { useMarketContext } from 'context/MarketContext';
import OfferTable from 'components/Marketplace/OfferTable';
import SellToken from 'components/Marketplace/SellToken';
import BuyToken from 'components/Marketplace/BuyToken';
import OfferTabs from '../OfferTabs';

const Container = styled.div`
  background: #01472a;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 50px;
  padding-bottom: 400px;
`;

const ItemTable = () => {
  const { orders, ownedOrders } = useMarketContext();
  const [offer, setOffer] = useState(null);
  const [orderType, setOrderType] = useState(0);

  const datasource = useMemo(() => {
    if (orderType === 2) {
      return ownedOrders;
    }
    return orders.filter((item: any) => item.orderType === orderType);
  }, [ownedOrders, orders, orderType]);

  const onTakeOffer = (offer: any) => {
    setOffer(offer);
  };

  return (
    <Container>
      <OfferTabs
        value={orderType}
        onChange={(e: any, value: number) => setOrderType(value)}
      />

      <OfferTable orders={datasource} onTakeOffer={onTakeOffer} />

      {!!offer && orderType == 0 && (
        <BuyToken offer={offer} onClose={() => onTakeOffer(null)} />
      )}
      {!!offer && orderType == 1 && (
        <SellToken offer={offer} onClose={() => onTakeOffer(null)} />
      )}
    </Container>
  );
};

export default ItemTable;
