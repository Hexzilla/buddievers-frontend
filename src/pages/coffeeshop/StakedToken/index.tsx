import React, { useCallback, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import request from 'graphql-request';
import { useActiveWeb3React, useClasses } from 'hooks';
import { styles } from '../styles';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../../constants';
import { QUERY_TOKEN_BY_ID } from 'subgraph/erc721Queries';
import uriToHttp from 'utils/uriToHttp';
import { OwnedToken, OwnedTokenPayload } from '../../moonbuilder/types';
import { useStaking } from '../../staking/useStaking';

type Props = {
  tokenId: number;
};

const StakedToken = ({ tokenId }: Props) => {
  const { account } = useActiveWeb3React();
  const { unstake } = useStaking();
  const [token, setToken] = useState<OwnedToken>({} as OwnedToken);
  const { btnUnStake, cardMiddle } = useClasses(styles);

  const getTokenInfo = useCallback(async () => {
    const result: any = await request<OwnedTokenPayload>(
      RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
      QUERY_TOKEN_BY_ID(CONTRACT_ADDRESS, tokenId.toString())
    );

    if (result?.tokens && result.tokens.length > 0) {
      const tokens = result.tokens.map((token: OwnedToken) => {
        if (token.metadata?.image) {
          const urls = uriToHttp(token.metadata.image, true);
          token.metadata.image = urls[0];
        }
        return token;
      });
      console.log('tokens', tokens)
      setToken(tokens[0]);
    }
  }, [tokenId]);

  useEffect(() => {
    account && getTokenInfo();
  }, [account, getTokenInfo]);

  const handleUnstake = (tokenId: number) => {
    console.log('handleWithdraw');
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    unstake([tokenId])
      .then((result) => {
        console.log('unstake-result', result);
        toast.success('Unstake successfully!');
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.data?.message || 'Something went wrong!');
      });
  };

  return (
    <Grid item md={3} sm={6}>
      <img
        src={token.metadata?.image}
        style={{ width: '100%', height: '400px', borderRadius: '20px' }}
        alt="nft"
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
          BUDDIE #{token.numericId?.toString()}
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
      <button className={btnUnStake} onClick={() => handleUnstake(tokenId)}>
        UNSTAKE
      </button>
    </Grid>
  );
};

export default StakedToken;
