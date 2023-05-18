import { useState, useMemo } from 'react';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { toastOptions, shortAddress, formatNumber } from 'utils/utils';

import { useMarketplace } from 'hooks/useMarketplace';
import { useMarketContext } from 'context/MarketContext';

import ItemRow from 'components/Marketplace/ItemRow';
import ActionButton from 'components/Marketplace/ActionButton';
import MarketDialog from 'components/Marketplace/MarketDialog';
import InputNumber from 'components/Marketplace/InputNumber';

const SellToken = ({ order, onClose }: any) => {
  const { account, balance, refresh } = useMarketContext();
  const { sellTokenByOrderId } = useMarketplace();
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    const toastId = toast.loading('Sell token ...');

    try {
      const result = await sellTokenByOrderId(
        account,
        order.id,
        Number(quantity)
      );
      if (!result) {
        toast.update(toastId, toastOptions('Failed to sell token!'));
      } else {
        refresh();
        toast.update(
          toastId,
          toastOptions(
            'You have been sold token order successfully!',
            'success'
          )
        );
      }
    } catch (err: any) {
      console.error(err);
      toast.update(
        toastId,
        toastOptions(err?.data?.message || 'Something went wrong!', 'error')
      );
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const gainAmount = formatNumber(quantity * Number(order.price));

  const disabled = useMemo(() => {
    if (quantity <= 0 || quantity > Number(order.quantity)) {
      return true;
    }
    if (balance <= 0) {
      return true;
    }
    return false;
  }, [order, quantity, balance]);

  return (
    <MarketDialog
      title="Take Offer - Sell $SEEDS"
      actions={
        <>
          <ActionButton disabled={disabled || loading} onClick={onSubmit}>
            Take offer
          </ActionButton>
          <ActionButton onClick={onClose} disabled={loading}>
            Close
          </ActionButton>
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
          <ItemRow heading="Your balance">{formatNumber(balance)} SAMA</ItemRow>
          <ItemRow heading="You sell">
            <InputNumber
              value={quantity}
              onChange={onChangeQuantity}
              onButtonClick={() => setQuantity(order.quantity)}
            />
          </ItemRow>
          <ItemRow heading="Protocol fee">{'0.0000 SAMA'}</ItemRow>
          <ItemRow heading="Royalty fee">{'0.0000 SAMA'}</ItemRow>
          <ItemRow heading="You get">{gainAmount} SAMA</ItemRow>
        </Grid>
      </>
    </MarketDialog>
  );
};

export default SellToken;
