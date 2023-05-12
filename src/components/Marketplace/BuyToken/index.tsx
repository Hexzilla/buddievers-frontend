import { Button, DialogActions, DialogContent, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';

import { CONTRACT_MARKETPLACE } from '../../../constants';
import { Dialog } from 'ui';
import { shortAddress } from 'utils/utils';
import ItemRow from '../ItemRow';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;

  width: 100%;
  height: 52px;

  font-size: 18px;
  color: white;
  background: #00ce4c;
  border-radius: 20px;

  cursor: pointer;
  text-transform: uppercase;
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
          <Grid container spacing={2}>
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

          <Grid container spacing={2}>
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
        <StyledButton onClick={onClose}>Take offer</StyledButton>
        <StyledButton onClick={onClose}>Close</StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default SellToken;
