import { Button, DialogActions, DialogContent, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { Dialog } from 'ui';
import { shortAddress } from 'utils/utils';
import ItemRow from '../ItemRow';
import ActionButton from '../ActionButton';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SellToken = ({ offer, onClose }: any) => {
  const gain = 0.123124;
  const protocalFee = 0;

  return (
    <Dialog
      open={true}
      onClose={() => onClose()}
      title="Take Offer - Buy $SEEDS"
    >
      <DialogContent>
        <Content>
          <Grid container spacing={4}>
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

          <Grid container spacing={4}>
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
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <ActionButton onClick={onClose}>Take offer</ActionButton>
        <ActionButton onClick={onClose}>Close</ActionButton>
      </DialogActions>
    </Dialog>
  );
};

export default SellToken;
