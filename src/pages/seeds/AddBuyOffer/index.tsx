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
import InputNumber from 'components/Marketplace/InputNumber';
import ActionButton from 'components/Marketplace/ActionButton';
import MarketDialog from 'components/Marketplace/MarketDialog';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px 0px;
`;

const AddBuyOffer = ({ onClose }: any) => {
  const { account, refresh } = useMarketContext();
  const { addBuyOrder } = useMarketplace();
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  const offer: any = {};
  const balance = 4050; //TODO
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
        toast.update(toastId, {
          render: 'Failed to create buy offer!',
          type: 'error',
          isLoading: false,
        });
        return;
      }

      refresh();

      toast.update(toastId, {
        render: 'You have been created buy order successfully!',
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
  };

  return (
    <MarketDialog
      title="BUY $SEEDS"
      actions={
        <>
          <ActionButton onClick={onSubmit}>Place offer</ActionButton>
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
              sx={{ color: 'white' }}
              value={quantity}
              onChange={onChangeQuantity}
            />
          </ItemRow>
          <ItemRow heading="Price per unit">
            <InputNumber
              sx={{ color: 'white' }}
              value={unitPrice}
              onChange={onChangeUnitPrice}
            />
          </ItemRow>
        </Grid>

        <Divider light />

        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="You have">{balance}</ItemRow>
          <ItemRow heading="You get">{balance}</ItemRow>
          <ItemRow heading="You give brutto">{balance}</ItemRow>
          <ItemRow heading="Protocal fee">{balance}</ItemRow>
          <ItemRow heading="Royalty fee">{balance}</ItemRow>
          <ItemRow heading="You give netto">{balance}</ItemRow>
        </Grid>
      </>
    </MarketDialog>
  );
};

export default AddBuyOffer;
