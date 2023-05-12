import { Button, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { shortAddress } from 'utils/utils';
import ItemRow from '../ItemRow';
import ActionButton from '../ActionButton';
import MarketDialog from '../MarketDialog';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px 0px;
`;

const BuyToken = ({ offer, onClose }: any) => {
  const gain = 0.123124;
  const protocalFee = 0;

  return (
    <MarketDialog
      title="Take Offer - Buy $SEEDS"
      actions={
        <>
          <ActionButton onClick={onClose}>Take offer</ActionButton>
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
          <ItemRow heading="ID">{shortAddress(offer.id)}</ItemRow>
          <ItemRow heading="Price per unit">{offer.price} SAMA</ItemRow>
          <ItemRow heading="Total available">
            {offer.quantity.toFixed(2)} $SEEDS
          </ItemRow>
        </Grid>

        <Divider light />

        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="You buy">
            <Paper
              component="form"
              sx={{
                p: '0px 4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InputBase type="number" sx={{ color: 'white' }} />
              <Button sx={{ p: '10px' }} aria-label="search">
                MAX
              </Button>
            </Paper>
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
