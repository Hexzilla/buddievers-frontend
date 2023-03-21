import { useClasses, useActiveWeb3React } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';
import request from 'graphql-request';
import { Grid } from '@mui/material';
import { QUERY_OWNED_TOKENS } from 'subgraph/erc721Queries';
import { useState, useEffect } from 'react';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../constants';

export type OwnedToken = {
  numericId: string;
};

export type OwnedTokenPayload = {
  tokens: OwnedToken[];
};

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
  const [tokenIds, setTokenId] = useState<Number[]>([]);
  const navigate = useNavigate();
  const toDetail = (tokenId: any) => {
    navigate('/builder', {
      state: {
        tokenId: tokenId,
      },
    });
  };

  useEffect(() => {
    const getTokens = async () => {
      if (account) {
        const address = account;
        const result: any = await request<OwnedTokenPayload>(
          RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
          QUERY_OWNED_TOKENS(CONTRACT_ADDRESS, address)
        );
        setTokenId([]);
        console.log('tokens-result', result);
        if (result?.tokens && result.tokens.length > 0) {
          result.tokens.map((token: any) => {
            setTokenId((prevArray) => [...prevArray, Number(token.numericId)]);
          });
        }
      }
    };
    getTokens();
  }, [account]);

  const NFTCards = tokenIds.map((tokenId) => (
    <Grid item md={3} sm={6} key={tokenId.toString()}>
      <img
        src="./charactor (3).png"
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
          BUDDIE #{tokenId.toString()}
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
      <button onClick={() => toDetail({ tokenId })} className={btnUnStake}>
        View
      </button>
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
            <p className={stakeTitleRight}>TOTAL NFTS : {tokenIds.length} </p>
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
          <Grid item >
            <p className={stakeTitleLeft}>Please Connect Your Wallet</p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MyNFTs;
