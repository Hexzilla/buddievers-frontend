import { useState } from 'react';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { shortAddress } from 'utils/utils';
import { useMarketContext } from 'context/MarketContext/index';
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
  const { addSellOrder } = useMarketContext();
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
    if (quantity <= 0) {
      return;
    }
    if (unitPrice <= 0) {
      return;
    }

    await addSellOrder(quantity, unitPrice, 0);
  };

  return (
    <MarketDialog
      title="Create Sell Offer"
      actions={
        <>
          <ActionButton onClick={onSubmit}>Place offer</ActionButton>
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
          <ItemRow heading="You give">{balance}</ItemRow>
          <ItemRow heading="You get brutto">{balance}</ItemRow>
          <ItemRow heading="Royalty fee">{balance}</ItemRow>
          <ItemRow heading="You get netto">{balance}</ItemRow>
        </Grid>
      </Content>
    </MarketDialog>
  );
};

export default AddSellOffer;
