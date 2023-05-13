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

const AddBuyOffer = ({ onClose }: any) => {
  const { account, balance, seedBalance, refresh } = useMarketContext();
  const { addBuyOrder } = useMarketplace();
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  const offer: any = {};
  const gain = 0.123124;
  const protocalFee = 0;
  const royaltyFee = 0;

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

    const toastId = toast.loading('Creating your buy offer...');

    try {
      const result = await addBuyOrder(quantity, unitPrice, 0);
      console.log('add-buy-offer-result', result);
      if (!result) {
        toast.update(toastId, toastOptions('Failed to create buy offer!'));
      } else {
        refresh();
        toast.update(
          toastId,
          toastOptions(
            'You have been created buy offer successfully!',
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

  const gainAmount = quantity * unitPrice;

  const disabled = useMemo(() => {
    if (quantity <= 0 || unitPrice <= 0) {
      return true;
    }
    const totalPrice = quantity * unitPrice;
    if (totalPrice >= balance) {
      return true;
    }
    return false;
  }, [quantity, seedBalance]);

  return (
    <MarketDialog
      title="BUY $SEEDS"
      actions={
        <>
          <ActionButton onClick={onSubmit} disabled={disabled}>Place offer</ActionButton>
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
        </Grid>

        <Divider light />

        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="Quantity to buy">
            <InputNumber
              value={quantity}
              onChange={onChangeQuantity}
              onButtonClick={() => console.log('max')}
            />
          </ItemRow>
          <ItemRow heading="Price per unit">
            <InputNumber
              value={unitPrice}
              onChange={onChangeUnitPrice}
            />
          </ItemRow>
        </Grid>

        <Divider light />

        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="You have">{balance.toFixed(4)} SAMA</ItemRow>
          <ItemRow heading="You get">{formatNumber(quantity)} $SEEDS</ItemRow>
          <ItemRow heading="Protocal fee">{'0.0000'}</ItemRow>
          <ItemRow heading="Royalty fee">{'0.0000'}</ItemRow>
          <ItemRow heading="You give">{formatNumber(seedBalance)} SAMA</ItemRow>
        </Grid>
      </>
    </MarketDialog>
  );
};

export default AddBuyOffer;
