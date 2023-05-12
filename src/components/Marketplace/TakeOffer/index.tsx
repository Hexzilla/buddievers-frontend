import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';

const TakeOffer = ({ onClose }: any) => {
  return (
    <Dialog open={true} onClose={() => onClose()}>
      <DialogTitle>Take Offer</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText> */}
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              Address
            </Grid>
            <Grid item xs={6}>
              0x9223...4123
            </Grid>
            <Grid item xs={6}>
              ID
            </Grid>
            <Grid item xs={6}>
              4
            </Grid>
            <Grid item xs={6}>
              Price per unit
            </Grid>
            <Grid item xs={6}>
              0.123124
            </Grid>
            <Grid item xs={6}>
              Total requested
            </Grid>
            <Grid item xs={6}>
              244.00
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              Your balance
            </Grid>
            <Grid item xs={6}>
              0x9223...4123
            </Grid>
            <Grid item xs={6}>
              You sell
            </Grid>
            <Grid item xs={6}>
              4
            </Grid>
            <Grid item xs={6}>
              You get brutto
            </Grid>
            <Grid item xs={6}>
              0.123124
            </Grid>
            <Grid item xs={6}>
              Protocol fee
            </Grid>
            <Grid item xs={6}>
              244.00
            </Grid>
            <Grid item xs={6}>
              Royalty fee
            </Grid>
            <Grid item xs={6}>
              244.00
            </Grid>
            <Grid item xs={6}>
              You get netto
            </Grid>
            <Grid item xs={6}>
              244.00
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Take offer</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TakeOffer;
