import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { useClasses, useActiveWeb3React } from 'hooks';
import { NavLink, Button } from 'ui';
import useOwnedTokens from './useOwnedTokens';
import { styles } from './styles';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../constants';
import {
  QUERY_TOKEN_BY_ID,
  QUERY_OWNED_PAGE_TOKENS,
} from 'subgraph/erc721Queries';
import {
  OwnedToken,
  OwnedTokenPayload,
  PageTokens,
} from '../../components/types';
import request from 'graphql-request';
import Pagination from '@mui/material/Pagination';
import uriToHttp from 'utils/uriToHttp';
import { useStakeContext } from 'context/StakeContext';

type Props = {
  onStake?: (tokenId: string) => void;
};

const MyNFTs = ({ onStake }: Props) => {
  const {
    container,
    stakedNFTs,
    stakeTitleLeft,
    stakeTitleRight,
    btnUnStake,
    cardMiddle,
    attributeCard,
    paginationStyle,
    paginationContainer,
  } = useClasses(styles);

  const [open, setOpen] = useState(false);
  const [attributes, setAttributes] = useState<Array<any>>([]);
  const [countTokens, setCountTokens] = useState<any>(0);
  const [tokensPage, setTokensPage] = useState<OwnedToken[]>([]);
  const { account } = useActiveWeb3React();
  const { stakedTokens } = useStakeContext();

  const handleClickOpen = (tokenId: String) => {
    setOpen(true);
    getTokens(tokenId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPageTokens = async (pageNumber: number, address: string) => {
    const result: any = await request<PageTokens>(
      RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
      QUERY_OWNED_PAGE_TOKENS(
        CONTRACT_ADDRESS,
        address,
        (pageNumber - 1) * 20,
        20
      )
    );
    if (result?.tokens && result.tokens.length > 0) {
      const tokens = result.tokens.map((token: OwnedToken) => {
        if (token.metadata?.image) {
          const urls = uriToHttp(token.metadata.image, true);
          token.metadata.image = urls[0];
        }
        return token;
      });
      setTokensPage(tokens);
    }
  };
  
  const pageChangeHandler = async (event: any, pageNumber: number) => {
    if (account) {
      getPageTokens(pageNumber, account);
    }
  };

  const getTokens = async (tokenId: any) => {
    if (tokenId) {
      const result: any = await request<OwnedTokenPayload>(
        RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
        QUERY_TOKEN_BY_ID(CONTRACT_ADDRESS, tokenId)
      );

      if (result?.tokens && result.tokens.length > 0) {
        result.tokens.map((token: OwnedToken) => {
          setAttributes(
            token.metadata?.attributes ? token.metadata?.attributes : []
          );
        });
      }
    }
  };
  const ownedTokens = useOwnedTokens();

  useEffect(() => {
    if (account) {
      getPageTokens(1, account);
    }
  }, [account, stakedTokens, getPageTokens]);

  useEffect(() => {
    setCountTokens(
      ownedTokens.length % 20 == 0
        ? ownedTokens.length / 20
        : ownedTokens.length / 20 + 1
    );
  });

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, []);

  const NFTCards = useMemo(
    () =>
      tokensPage.map((token) => (
        <Grid item lg={3} md={6} sm={12} xs={24} key={token.numericId.toString()}>
          <img
            src={token.metadata?.image}
            style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
            alt=""
          />
          <div className={cardMiddle}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
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
              <Grid item xs={5}>
                <button
                  style={{ marginTop: '25px', letterSpacing: '1px' }}
                  className={btnUnStake}
                  onClick={() => handleClickOpen(token.numericId.toString())}
                >
                  Attributes
                </button>
              </Grid>
            </Grid>
          </div>
          {onStake ? (
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <NavLink
                  href={`/builder/${token.numericId}`}
                  className={btnUnStake}
                >
                  View
                </NavLink>
              </Grid>
              <Grid item xs={6}>
                <div onClick={() => onStake(token.numericId)} className={btnUnStake}>
                  Stake
                </div>
              </Grid>
            </Grid>
          ) : (
            <NavLink
              href={`/builder/${token.numericId}`}
              className={btnUnStake}
            >
              View
            </NavLink>
          )}
        </Grid>
      )),
    [tokensPage, btnUnStake, cardMiddle, handleClickOpen, onStake]
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
      <div className={paginationContainer}>
        <Pagination
          count={countTokens}
          onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)}
          size="large"
          shape="circular"
          showFirstButton
          showLastButton
          className={paginationStyle}
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="dialog-title">{'Attributes'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {attributes.map((attribute: any) => (
              <Grid item xs={12} lg={4}>
                <div className={attributeCard}>
                  <p>{attribute.traitType}</p>
                  <h4>{attribute.value}</h4>
                </div>
              </Grid>
            ))}
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
