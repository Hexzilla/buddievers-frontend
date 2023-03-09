import { useState, Fragment, useEffect } from 'react';
import { useActiveWeb3React, useClasses } from 'hooks';
import {
  Backdrop,
  CircularProgress,
  TextField,
  Snackbar,
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, GlitchText } from 'ui';
import { styles } from './styles';
import { useMint1Contract } from 'hooks/useContracts/useContracts';
import { MINT1_ADDRESS, ChainId, GAS_LIMIT, MINT_PRICE } from '../../constants';

const FreshTradesPage = () => {
  const { account } = useActiveWeb3React();
  const [mintAmount, setMintAmount] = useState(0);
  const [prepaidNFTs, setPrepaidNFTs] = useState(0);
  const [whitelistNFTs, setWhitelistNFTs] = useState(0);
  const [paidNFTS, setPaidNFTs] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [minting, setMinting] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [updated, setUpdated] = useState(false);
  const TOTAL = 500;
  const [open, setOpen] = useState(false);
  const mintContract = useMint1Contract(MINT1_ADDRESS[ChainId.MOONRIVER], true);
  const imageURI =
    'https://ipfs.io/ipfs/QmRF6pCcocSXnzA5SR6EdWJCqRr17gPN2CR35XfgzQEDa7?filename=02.png';
  const { container, button } = useClasses(styles);

  useEffect(() => {
    const init = async () => {
      const res1 = await mintContract?.getPrepaidMints(account);
      setPrepaidNFTs(parseInt(res1.toString()));

      const res2 = await mintContract?.getWhitelistedMints(account);
      setWhitelistNFTs(parseInt(res2.toString()));

      const res3 = await mintContract?.getPublicMints(account);
      setPaidNFTs(parseInt(res3.toString()));

      const res = await mintContract?.totalSupply();
      setTotalSupply(parseInt(res.toString()));
    };
    init();
  }, [account, updated, mintContract]);

  const handleInputChange = (event: any) => {
    setMintAmount(event.target.value);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const publicMint = async () => {
    if (!account) {
      setErrMessage('Please connect your wallet!');
      setOpen(true);
      return;
    }
    if (mintAmount <= 0 || mintAmount > 5) {
      setErrMessage('Please input between 1 and 5');
      setOpen(true);
      return;
    }

    setMinting(true);
    setErrMessage('');
    await mintContract
      ?.freeMint(mintAmount, imageURI, {
        gasLimit: GAS_LIMIT,
        from: account,
        value: MINT_PRICE * mintAmount,
      })
      .catch((err: any) => {
        console.error(err);
        setErrMessage('Please check your fund or network status!');
        setOpen(true);
      })
      .then((tx: any) => {
        console.debug('tx', tx);
        return tx.wait(3);
      })
      .then(() => {
        setUpdated(!updated);
        setErrMessage('You have successfully minted token!');
        setOpen(true);
      })
      .finally(() => setMinting(false));
  };

  const whitelistMint = async () => {
    if (mintAmount <= 0 || mintAmount > 5) {
      setErrMessage('Please input between 1 and 5');
      setOpen(true);
      return;
    }

    setMinting(true);
    setErrMessage('');
    await mintContract
      ?.whitelistedMints(mintAmount, imageURI)
      .catch((err: any) => {
        console.error(err);
        setErrMessage('Your whitelist sale finished!');
        setOpen(true);
      })
      .then((tx: any) => {
        console.debug('tx', tx);
        return tx.wait(3);
      })
      .then(() => {
        setUpdated(!updated);
        setErrMessage('You have successfully minted token!');
        setOpen(true);
      })
      .finally(() => setMinting(false));
  };

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
        {prepaidNFTs != 0 && (
          <>
            <Typography variant="subtitle1" component="div">
              Prepaid Mints: {prepaidNFTs - whitelistNFTs}
            </Typography>
            <br />
          </>
        )}

        <Typography variant="subtitle1" component="div">
          Owned NFTs: {whitelistNFTs + paidNFTS}
        </Typography>
        <br />

        <Typography variant="subtitle1" component="div">
          Remain mintable NFT Counts: {TOTAL - totalSupply}
        </Typography>
        <br />

        {prepaidNFTs != 0 && (
          <>
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
                <Button className={button} onClick={whitelistMint}>
                  Get My Prepaid Mints
                </Button>
              </Grid>
            </Grid>
            <br />
          </>
        )}
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
            <Button className={button} onClick={publicMint}>
              Mints
            </Button>
          </Grid>
        </Grid>
        <br />

        <Backdrop sx={{ color: '#000', zIndex: 1000 }} open={minting}>
          <CircularProgress color="primary" />
        </Backdrop>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={errMessage}
          action={action}
        />
      </div>
    </>
  );
};

export default FreshTradesPage;
