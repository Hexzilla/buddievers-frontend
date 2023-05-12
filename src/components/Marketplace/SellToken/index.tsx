import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
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
  const balance = 4050; //TODO
  const gain = 0.123124;
  const protocalFee = 0;
  const royaltyFee = 0;

  return (
    <Dialog
      open={true}
      onClose={() => onClose()}
      title="Take Offer - Sell $SEEDS"
    >
      <DialogContent>
        <Content>
          <Grid container spacing={2}>
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

          <Grid container spacing={2}>
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
