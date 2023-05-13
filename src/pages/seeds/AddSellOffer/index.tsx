import { useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { toastOptions, shortAddress, formatNumber } from 'utils/utils';

import { useMarketplace } from 'hooks/useMarketplace';
import { useMarketContext } from 'context/MarketContext';

import ItemRow from 'components/Marketplace/ItemRow';
import InputNumber from 'components/Marketplace/InputNumber';
import ActionButton from 'components/Marketplace/ActionButton';
import MarketDialog from 'components/Marketplace/MarketDialog';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px 0px;
`;

const AddSellOffer = ({ onClose }: any) => {
  const { account, seedBalance, refresh } = useMarketContext();
  const { addSellOrder } = useMarketplace();
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

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

    const toastId = toast.loading('Creating your sell offer...');

    try {
      const result = await addSellOrder(account, quantity, unitPrice, 0);
      console.log('add-sell-offer-result', result);
      if (!result) {
        toast.update(toastId, toastOptions('Failed to create sell offer!'));
      } else {
        refresh();
        toast.update(
          toastId,
          toastOptions(
            'You have been created sell offer successfully!',
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

  const gainAmount = formatNumber(quantity * unitPrice);

  const disabled = useMemo(() => {
    if (quantity <= 0 || quantity > seedBalance) {
      return true;
    }
    if (unitPrice <= 0) {
      return true;
    }
    return false;
  }, [quantity, seedBalance]);

  return (
    <MarketDialog
      title="Create Sell Offer"
      actions={
        <>
          <ActionButton onClick={onSubmit} disabled={disabled}>
            Place offer
          </ActionButton>
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
      </Content>
    </MarketDialog>
  );
};

export default AddSellOffer;
