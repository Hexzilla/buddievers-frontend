import { useState, useMemo } from 'react';
import styled from '@emotion/styled';

import { useMarketContext } from 'context/MarketContext';
import OfferTable from 'components/Marketplace/OfferTable';
import EditBuyOffer from '../EditBuyOffer';
import EditSellOffer from '../EditSellOffer';
import SellToken from '../SellToken';
import BuyToken from '../BuyToken';
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
  const [offer, setOffer] = useState<any>(null);
  const [orderType, setOrderType] = useState(0);

  const datasource = useMemo(() => {
    if (orderType === 2) {
      return ownedOrders;
    }
    return orders.filter((item: any) => item.orderType === orderType);
  }, [ownedOrders, orders, orderType]);

  const editable = useMemo(() => orderType === 2, [orderType]);

  const onTakeOffer = (offer: any) => {
    setOffer(offer);
  };

  const onCloseDialog = () => {
    setOffer(null);
  };

  const editOfferDialog = () => (
    <>
      {offer?.orderType === 0 && (
        <EditBuyOffer order={offer} onClose={onCloseDialog} />
      )}
      {offer?.orderType === 1 && (
        <EditSellOffer order={offer} onClose={onCloseDialog} />
      )}
    </>
  );

  const takeOfferDialog = () => (
    <>
      {orderType === 0 && <SellToken order={offer} onClose={onCloseDialog} />}
      {orderType === 1 && <BuyToken order={offer} onClose={onCloseDialog} />}
    </>
  );

  return (
    <Container>
      <OfferTabs
        value={orderType}
        onChange={(e: any, value: number) => setOrderType(value)}
      />

      <OfferTable
        orders={datasource}
        onTakeOffer={onTakeOffer}
        editable={editable}
      />

      {!!offer && <>{editable ? editOfferDialog() : takeOfferDialog()}</>}
    </Container>
  );
};

export default ItemTable;
