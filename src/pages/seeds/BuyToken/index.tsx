import { useState } from 'react';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { shortAddress } from 'utils/utils';

import { useMarketplace } from 'hooks/useMarketplace';
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
  const { account, refresh } = useMarketContext();
  const { buyTokenByOrderId } = useMarketplace();
  const [quantity, setQuantity] = useState(0);

  const gain = 0.123124;
  const protocalFee = 0;

  const onChangeQuantity = (e: any) => {
    setQuantity(Number(e.target.value));
  };

  const handleBuyToken = async () => {
    if (!account) {
      toast.warn('Please connect your wallet!');
      return;
    }
    if (quantity <= 0) {
      toast.warn('Please input quantity!');
      return;
    }
    if (quantity > Number(order.quantity)) {
      toast.warn('Too much quantity!');
      return;
    }

    const toastId = toast.loading('Buy token ...');

    try {
      const result = await buyTokenByOrderId(
        order.id,
        quantity,
        Number(order.price)
      );
      if (!result) {
        toast.update(toastId, {
          render: 'Failed to buy token!',
          type: 'error',
          isLoading: false,
        });
        return;
      }

      refresh();

      toast.update(toastId, {
        render: 'You have been bought token order successfully!',
        type: 'success',
      });
    } catch (err: any) {
      console.error(err);
      toast.update(toastId, {
        render: err?.data?.message || 'Something went wrong!',
        type: 'error',
        isLoading: false,
      });
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
