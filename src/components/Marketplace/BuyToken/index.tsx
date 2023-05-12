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
  background: #00CE4C;
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
    <Dialog open={true} onClose={() => onClose()} title="Take Offer - Buy $SEEDS">
      <DialogContent>
        <Content>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              Address
            </Grid>
            <Grid item xs={6}>
              {shortAddress(CONTRACT_MARKETPLACE)}
            </Grid>
            <Grid item xs={6}>
              ID
            </Grid>
            <Grid item xs={6}>
              {shortAddress(offer.id)}
            </Grid>
            <Grid item xs={6}>
              Price per unit
            </Grid>
            <Grid item xs={6}>
              {offer.price} SAMA
            </Grid>
            <Grid item xs={6}>
              Total available
            </Grid>
            <Grid item xs={6}>
              {offer.quantity.toFixed(2)} $SEEDS
            </Grid>
          </Grid>

          <Divider light />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              You buy
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              Your balance
            </Grid>
            <Grid item xs={6}>
              {protocalFee.toFixed(2)} $SEEDS
            </Grid>
            <Grid item xs={6}>
              You give
            </Grid>
            <Grid item xs={6}>
              {gain} SAMA
            </Grid>
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
