import { Button, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { shortAddress } from 'utils/utils';
import ItemRow from '../ItemRow';
import MarketDialog from '../MarketDialog';
import ActionButton from '../ActionButton';

const SellToken = ({ offer, onClose }: any) => {
  const balance = 4050; //TODO
  const gain = 0.123124;
  const protocalFee = 0;
  const royaltyFee = 0;

  return (
    <MarketDialog
      title="Take Offer - Sell $SEEDS"
      actions={
        <>
          <ActionButton onClick={onClose}>Take offer</ActionButton>
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
          <ItemRow heading="ID">{shortAddress(offer.id)}</ItemRow>
          <ItemRow heading="Price per unit">{offer.price} SAMA</ItemRow>
          <ItemRow heading="Total requested">
            {offer.quantity.toFixed(2)}
          </ItemRow>
        </Grid>

        <Divider light />

        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="Your balance">{balance.toFixed(2)}</ItemRow>
          <ItemRow heading="You sell">
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
          <ItemRow heading="Protocol fee">{protocalFee.toFixed(2)}</ItemRow>
          <ItemRow heading="Royalty fee">{royaltyFee.toFixed(2)}</ItemRow>
          <ItemRow heading="You get">{gain} SAMA</ItemRow>
        </Grid>
      </>
    </MarketDialog>
  );
};

export default SellToken;
