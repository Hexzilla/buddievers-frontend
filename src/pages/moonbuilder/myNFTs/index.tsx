import { useEffect, useMemo, useState } from 'react';
import { Grid, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { useClasses, useActiveWeb3React } from 'hooks';
import { NavLink, Button } from 'ui';
import useOwnedTokens from './useOwnedTokens';
import { styles } from './styles';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../../constants';
import { QUERY_TOKEN_BY_ID } from 'subgraph/erc721Queries';
import { OwnedToken, OwnedTokenPayload } from '../types';
import request from 'graphql-request';
const MyNFTs = () => {
  const {
    container,
    stakedNFTs,
    stakeTitleLeft,
    stakeTitleRight,
    btnUnStake,
    cardMiddle,
    attributeCard
  } = useClasses(styles);
  const [open, setOpen] = useState(false);
  const [attributes, setAttributes] = useState<Array<any>>([]);

  const handleClickOpen = (tokenId : String) => {
      setOpen(true);
      getTokens(tokenId)
  };
  const handleClose = () => {
      setOpen(false);
  };
  const getTokens = async (tokenId : any) => {
    if (tokenId) {
      const result: any = await request<OwnedTokenPayload>(
        RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
        QUERY_TOKEN_BY_ID(CONTRACT_ADDRESS, tokenId)
      );

      if (result?.tokens && result.tokens.length > 0) {
        result.tokens.map((token: OwnedToken) => {
          setAttributes(token.metadata?.attributes ? token.metadata?.attributes : [])
        });
      }
    }
  };
  const { account } = useActiveWeb3React();
  const ownedTokens = useOwnedTokens();

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, []);

  const NFTCards = useMemo(
    () =>
      ownedTokens.map((token) => (
        <Grid item md={3} sm={6} key={token.numericId.toString()}>
          <img
            src={token.metadata?.image}
            style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
            alt=""
          />
          <div className={cardMiddle}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <p
                  style={{
                    fontWeight: 900,
                    fontSize: 24,
                    color: 'white',
                    marginBottom: 0,
                  }}
                >
                  BUDDIE #{token.numericId.toString()}
                </p>
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: 16,
                    color: '#00CE4C',
                    marginTop: 0,
                  }}
                >
                  BUDDIES
                </p>
              </Grid>
              <Grid item sm={6}>
                <button style={{ marginTop : "25px", letterSpacing : "1px" }} className={btnUnStake} onClick={() => handleClickOpen(token.numericId.toString())}>
                  Attributes
                </button>
              </Grid>
            </Grid>
          </div>
          <NavLink href={`/builder/${token.numericId}`} className={btnUnStake}>
            View
          </NavLink>
        </Grid>
      )),
    [ownedTokens, btnUnStake, cardMiddle]
  );

  return account ? (
    <div className={container}>
      <div className={stakedNFTs}>
        <Grid container>
          <Grid item sm={6}>
            <p className={stakeTitleLeft}>My NFTS</p>
          </Grid>
          <Grid item sm={6} style={{ textAlign: 'right' }}>
            <p className={stakeTitleRight}>
              TOTAL NFTS : {ownedTokens.length}{' '}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {NFTCards}
        </Grid>
      </div>

      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          maxWidth='lg'
      >
          <DialogTitle id="dialog-title">
          {"Attributes"}
          </DialogTitle>
          <DialogContent>
              <Grid container spacing={2}>
                {
                  attributes.map((attribute : any) => (
                    <Grid item lg={4} sm={6}>
                      <div className={attributeCard}>
                        <p>{ attribute.traitType }</p>
                        <h4>{ attribute.value }</h4>
                      </div>
                    </Grid>
                  ))
                }
                
              </Grid>
          </DialogContent>
          <DialogActions>
              <Button disableRipple onClick={handleClose} autoFocus>
                  Close
              </Button>
          </DialogActions>
      </Dialog>
    </div>
  ) : (
    <div className={container}>
      <div className={stakedNFTs}>
        <Grid container>
          <Grid item>
            <p className={stakeTitleLeft}>Please Connect Your Wallet</p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MyNFTs;
