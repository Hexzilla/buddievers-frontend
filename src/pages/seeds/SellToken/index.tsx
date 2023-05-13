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

const SellToken = ({ order, onClose }: any) => {
  const { account, refresh } = useMarketContext();
  const { buyTokenByOrderId } = useMarketplace();
  const [quantity, setQuantity] = useState(0);

  const balance = 4050; //TODO
  const gain = 0.123124;
  const protocalFee = 0;
  const royaltyFee = 0;

  const onChangeQuantity = (e: any) => {
    setQuantity(Number(e.target.value));
  };

  const onSubmit = async () => {
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
      } else {
        refresh();
        toast.update(toastId, {
          render: 'You have been bought token order successfully!',
          type: 'success',
        });
      }
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
      title="Take Offer - Sell $SEEDS"
      actions={
        <>
          <ActionButton onClick={onSubmit}>Take offer</ActionButton>
          <ActionButton onClick={onClose}>Close</ActionButton>
        </>
      }
      onClose={onClose}
    >
      <>
        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="Address">
            {shortAddress(CONTRACT_MARKETPLACE)}
          </ItemRow>
          <ItemRow heading="ID">{shortAddress(order.id)}</ItemRow>
          <ItemRow heading="Price per unit">{order.price} SAMA</ItemRow>
          <ItemRow heading="Total requested">{order.quantity} $SEEDS</ItemRow>
        </Grid>

        <Divider light />

        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="Your balance">{balance.toFixed(2)}</ItemRow>
          <ItemRow heading="You sell">
            <InputNumber
              sx={{ color: 'white' }}
              value={quantity}
              onChange={onChangeQuantity}
            />
          </ItemRow>
          <ItemRow heading="Protocol fee">{protocalFee.toFixed(2)}</ItemRow>
          <ItemRow heading="Royalty fee">{royaltyFee.toFixed(2)}</ItemRow>
          <ItemRow heading="You get">{gain} SAMA</ItemRow>
        </Grid>
      </>
    </MarketDialog>
  );
};

export default SellToken;
