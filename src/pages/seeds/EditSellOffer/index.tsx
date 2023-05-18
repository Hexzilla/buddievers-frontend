import { useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { toastOptions, shortAddress, formatNumber } from 'utils/utils';

import { useMarketplace } from 'hooks/useMarketplace';
import { useMarketContext } from 'context/MarketContext';

import ItemRow from 'components/Marketplace/ItemRow';
import InputNumber from 'components/Marketplace/InputNumber';
import ActionButton from 'components/Marketplace/ActionButton';
import MarketDialog from 'components/Marketplace/MarketDialog';

type Props = {
  order: any;
  onClose: () => void;
};

const EditSellOffer = ({ order, onClose }: Props) => {
  const { account, seedBalance, refresh } = useMarketContext();
  const { updateSellOrder, removeOrder } = useMarketplace();
  const [quantity, setQuantity] = useState(order.quantity);
  const [unitPrice, setUnitPrice] = useState(order.price);
  const [loading, setLoading] = useState(false);

  const onChangeQuantity = (e: any) => {
    setQuantity(Number(e.target.value));
  };

  const onChangeUnitPrice = (e: any) => {
    setUnitPrice(Number(e.target.value));
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
    if (unitPrice <= 0) {
      toast.warn('Please input price!');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Creating your sell offer...');

    try {
      const result = await updateSellOrder(
        account,
        order.id,
        quantity,
        unitPrice,
        0
      );
      console.log('update-sell-offer-result', result);
      if (!result) {
        toast.update(toastId, toastOptions('Failed to update offer!'));
      } else {
        refresh();
        toast.update(
          toastId,
          toastOptions('You have been updated offer successfully!', 'success')
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

  const onRemove = async () => {
    if (!account) {
      toast.warn('Please connect your wallet!');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Remove your sell offer...');

    try {
      const result = await removeOrder(order.id);
      console.log('remove-offer', result);
      if (!result) {
        toast.update(toastId, toastOptions('Failed to remove offer!'));
      } else {
        refresh();
        toast.update(
          toastId,
          toastOptions('You have been removed offer successfully!', 'success')
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

  const gainAmount = formatNumber(quantity * unitPrice);

  const disabled = useMemo(() => {
    if (quantity <= 0 || quantity > seedBalance) {
      return true;
    }
    if (unitPrice <= 0) {
      return true;
    }
    if (order.quantity === quantity && order.price === unitPrice) {
      return true;
    }
    return false;
  }, [order, quantity, unitPrice, seedBalance]);

  return (
    <MarketDialog
      title="Edit Your Sell Offer"
      actions={
        <>
          <ActionButton onClick={onSubmit} disabled={disabled || loading}>
            Update offer
          </ActionButton>
          <ActionButton onClick={onRemove} disabled={loading}>
            Remove offer
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
        </Grid>

        <Divider light />

        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="Quantity to sell">
            <InputNumber
              value={quantity}
              onChange={onChangeQuantity}
              onButtonClick={() => setQuantity(seedBalance)}
            />
          </ItemRow>
          <ItemRow heading="Price per unit">
            <InputNumber value={unitPrice} onChange={onChangeUnitPrice} />
          </ItemRow>
        </Grid>

        <Divider light />

        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="You have">{seedBalance.toFixed(4)} $SEEDS</ItemRow>
          <ItemRow heading="You give">{formatNumber(quantity)} $SEEDS</ItemRow>
          <ItemRow heading="Royalty fee">{'0.0000'}</ItemRow>
          <ItemRow heading="You get">{gainAmount} SAMA</ItemRow>
        </Grid>
      </>
    </MarketDialog>
  );
};

export default EditSellOffer;
