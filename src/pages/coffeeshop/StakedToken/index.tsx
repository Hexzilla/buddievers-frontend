import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import request from 'graphql-request';
import styled from '@emotion/styled';

import { useActiveWeb3React } from 'hooks';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../../constants';
import { QUERY_TOKEN_BY_ID } from 'subgraph/erc721Queries';
import uriToHttp from 'utils/uriToHttp';

import { OwnedToken, OwnedTokenPayload } from 'components/types';
import { StakedTokenItem, useStakeContext } from '../StakeContext';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const StyledTokenImage = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 20px;
`;

const StyledTokenName = styled.p`
  font-weight: 900;
  font-size: 24;
  color: white;
  margin-bottom: 0;
  text-transform: uppercase;
`;

const StyledStakedAt = styled.div`
  font-weight: 400;
  font-size: 16;
  color: #00ce4c;
  margin-top: 8px;
  margin-bottom: 0;
  text-transform: uppercase;
`;

const StyledStakedTime = styled.div`
  font-weight: 400;
  font-size: 14;
  color: white;
  margin-bottom: 0;
  text-transform: uppercase;
`;

/*const StyledBuddies = styled.p`
  font-weight: 400;
  font-size: 16;
  color: #00ce4c;
  margin-top: 0;
  text-transform: uppercase;
`;*/

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 76px;
  color: white;
  font-size: 20px;
  font-weight: 400;
  border: none;
  background: rgba(0, 206, 76, 0.6);
  border-radius: 20px;
  width: 100%;
  cursor: pointer;
`;

const CardInformation = styled.div`
  padding: 20px;
  margin-top: -6px;
`;

type Props = {
  stakedToken: StakedTokenItem;
};

const StakedToken = ({ stakedToken }: Props) => {
  const navigate = useNavigate();
  const { account } = useActiveWeb3React();
  const { unstake } = useStakeContext();
  const { setTokenId } = useStakeContext();
  const [token, setToken] = useState<OwnedToken>({} as OwnedToken);

  const getTokenInfo = useCallback(async () => {
    const result: any = await request<OwnedTokenPayload>(
      RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
      QUERY_TOKEN_BY_ID(CONTRACT_ADDRESS, stakedToken.tokenId.toString())
    );

    if (result?.tokens && result.tokens.length > 0) {
      const tokens = result.tokens.map((token: OwnedToken) => {
        if (token.metadata?.image) {
          const urls = uriToHttp(token.metadata.image, true);
          token.metadata.image = urls[0];
        }
        return token;
      });
      setToken(tokens[0]);
    }
  }, [stakedToken]);

  useEffect(() => {
    account && getTokenInfo();
  }, [account, getTokenInfo]);

  const stakedTime = useMemo(() => {
    return moment(new Date(stakedToken.timestamp * 1000)).format('L hh:mm:ss');
  }, [stakedToken]);

  const handleViewToken = (tokenId: number) => {
    navigate(`/builder/${tokenId}`);
  }

  return (
    <Grid item xs={12} sm={12} md={12} lg={3} style={{ marginBottom: '40px' }}>
      <StyledTokenImage src={token.metadata?.image} alt="nft" />
      <CardInformation>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <StyledTokenName>
              Buddie #{token.numericId?.toString()}
            </StyledTokenName>
            <StyledStakedAt>Staked at</StyledStakedAt>
            <StyledStakedTime>{stakedTime}</StyledStakedTime>
            {/* <StyledBuddies>Buddies</StyledBuddies> */}
          </Grid>
          <Grid item xs={6}>
            <StyledButton
              style={{ marginTop: '25px', letterSpacing: '1px' }}
              onClick={() => setTokenId(token.numericId)}
            >
              Attributes
            </StyledButton>
          </Grid>
        </Grid>
      </CardInformation>
      <Grid container spacing={1}>
        <Grid item xs={24} sm={12} md={6}>
          <StyledButton onClick={() => handleViewToken(stakedToken.tokenId)}>
            VIEW
          </StyledButton>
        </Grid>
        <Grid item xs={24} sm={12} md={6}>
          <StyledButton onClick={() => unstake(stakedToken.tokenId.toString())}>
            UNSTAKE
          </StyledButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StakedToken;
