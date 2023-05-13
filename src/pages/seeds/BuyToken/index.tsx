import { useState } from 'react';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { toastOptions, shortAddress } from 'utils/utils';

import { useMarketplace } from 'hooks/useMarketplace';
import { useMarketContext } from 'context/MarketContext';

import ItemRow from 'components/Marketplace/ItemRow';
import ActionButton from 'components/Marketplace/ActionButton';
import MarketDialog from 'components/Marketplace/MarketDialog';
import InputNumber from 'components/Marketplace/InputNumber';

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
        toast.update(toastId, toastOptions('Failed to buy token!'));
      } else {
        refresh();
        toast.update(
          toastId,
          toastOptions(
            'You have been bought token order successfully!',
            'success'
          )
        );
      }
    } catch (err: any) {
      console.error(err);
      toast.update(toastId, {
        render: err?.data?.message || 'Something went wrong!',
        type: 'error',
        isLoading: false,
      });
    }
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
      <>
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
      </>
    </MarketDialog>
  );
};

export default BuyToken;
