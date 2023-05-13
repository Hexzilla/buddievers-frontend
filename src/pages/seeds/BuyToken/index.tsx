import { useState } from 'react';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { shortAddress } from 'utils/utils';
import { useMarketContext } from 'context/MarketContext';
import ItemRow from 'components/Marketplace/ItemRow';
import ActionButton from 'components/Marketplace/ActionButton';
import MarketDialog from 'components/Marketplace/MarketDialog';
import InputNumber from 'components/Marketplace/InputNumber';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px 0px;
`;

const BuyToken = ({ order, onClose }: any) => {
  const { buyTokenByOrderId } = useMarketContext();
  const [quantity, setQuantity] = useState(0);

  const gain = 0.123124;
  const protocalFee = 0;

  const onChangeQuantity = (e: any) => {
    setQuantity(Number(e.target.value));
  };

  const handleBuyToken = async () => {
    if (quantity <= 0) {
      return;
    }
    if (quantity > Number(order.quantity)) {
      return;
    }

    await buyTokenByOrderId(order.id, quantity, Number(order.price));
  };

  return (
    <MarketDialog
      title="Take Offer - Buy $SEEDS"
      actions={
        <>
          <ActionButton onClick={handleBuyToken}>Take offer</ActionButton>
          <ActionButton onClick={onClose}>Close</ActionButton>
        </>
      }
      onClose={onClose}
    >
      <Content>
        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="Address">
            {shortAddress(CONTRACT_MARKETPLACE)}
          </ItemRow>
          <ItemRow heading="ID">{shortAddress(order.id)}</ItemRow>
          <ItemRow heading="Price per unit">{order.price} SAMA</ItemRow>
          <ItemRow heading="Total available">{order.quantity} $SEEDS</ItemRow>
        </Grid>

        <Divider light />

        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="You buy">
            <InputNumber
              sx={{ color: 'white' }}
              value={quantity}
              onChange={onChangeQuantity}
            />
          </ItemRow>
          <ItemRow heading="Your balance">
            {protocalFee.toFixed(2)} $SEEDS
          </ItemRow>
          <ItemRow heading="You give">{gain} SAMA</ItemRow>
        </Grid>
      </Content>
    </MarketDialog>
  );
};

export default BuyToken;
