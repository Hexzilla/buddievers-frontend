import { useState, Fragment } from 'react';
import { useActiveWeb3React, useClasses } from 'hooks';
import { Container } from '@mui/system';
import { TextField, Snackbar, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, GlitchText } from 'ui';
import { styles } from './styles';
import { useMint1Contract } from 'hooks/useContracts/useContracts'
import { MINT1_ADDRESS, ChainId, GAS_LIMIT, MINT_PRICE } from '../../constants'

const FreshTradesPage = () => {
  const { account, error } = useActiveWeb3React();
  const [mintAmount, setMintAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const mintContract = useMint1Contract(MINT1_ADDRESS[ChainId.MOONRIVER], true);
  const { container, button } = useClasses(styles);

  const handleInputChange = (event: any) => {
    setMintAmount(event.target.value)
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const mintNFT = async () => {
    if (mintAmount <= 0 || mintAmount > 5) {
      setOpen(true)
      return;
    }

    const res = await mintContract?.whitelistedMints(mintAmount,
      "https://drive.google.com/file/d/1A739BEoj7eU1GnuEdqoWt7AOPtypYN1u/view?usp=share_link", {
      gasLimit: GAS_LIMIT,
      from: account,
      value: MINT_PRICE
    }).then((receipt: any) => {
      console.debug('result', receipt)
    })
  }

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <>
      <div className={container}>
        <GlitchText variant="h1">Mint NFT</GlitchText>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <TextField
              id="filled-number"
              label="Mint amounts"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              size="small"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className={button}
              onClick={mintNFT}
            >
              Mint
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Please input between 1 and 5"
          action={action}
        />
      </div>
    </>
  );
};

export default FreshTradesPage;
