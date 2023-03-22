import { useClasses, useActiveWeb3React } from 'hooks';
import { styles } from './styles';
import request from 'graphql-request';
import { Grid } from '@mui/material';
import { QUERY_OWNED_TOKENS } from 'subgraph/erc721Queries';
import { useState, useEffect } from 'react';
import { NavLink } from 'ui';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../../constants';
import { OwnedToken, OwnedTokenPayload } from '../types';
import uriToHttp from 'utils/uriToHttp';

const MyNFTs = () => {
  const {
    container,
    stakedNFTs,
    stakeTitleLeft,
    stakeTitleRight,
    btnUnStake,
    cardMiddle,
  } = useClasses(styles);
  const { account } = useActiveWeb3React();
  const [tokens, setTokens] = useState<OwnedToken[]>([]);

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, []);

  useEffect(() => {
    const getTokens = async () => {
      if (account) {
        const address = account;
        const result: any = await request<OwnedTokenPayload>(
          RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
          QUERY_OWNED_TOKENS(CONTRACT_ADDRESS, address)
        );
        console.log('tokens-result', result);

        setTokens([]);
        if (result?.tokens && result.tokens.length > 0) {
          const tokens = result.tokens.map((token: OwnedToken) => {
            if (token.metadata?.image) {
              const urls = uriToHttp(token.metadata.image, true);
              token.metadata.image = urls[0];
            }
            return token;
          });
          console.log('tokens', tokens);
          setTokens(tokens);
        }
      }
    };
    getTokens();
  }, [account]);

  const NFTCards = tokens.map((token) => (
    <Grid item md={3} sm={6} key={token.numericId.toString()}>
      <img
        src={token.metadata?.image}
        style={{ width: '100%', height: '400px', borderRadius: '20px' }}
        alt=""
      />
      <div className={cardMiddle}>
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
      </div>
      <NavLink href={`/builder/${token.numericId}`} className={btnUnStake}>
        View
      </NavLink>
    </Grid>
  ));

  return account ? (
    <div className={container}>
      <div className={stakedNFTs}>
        <Grid container>
          <Grid item sm={6}>
            <p className={stakeTitleLeft}>My NFTS</p>
          </Grid>
          <Grid item sm={6} style={{ textAlign: 'right' }}>
            <p className={stakeTitleRight}>TOTAL NFTS : {tokens.length} </p>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {NFTCards}
        </Grid>
      </div>
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
