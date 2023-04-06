import {styles} from "./MarketMoreSection.styles";
import { useEffect, useMemo, useState } from 'react';
import { useClasses, useActiveWeb3React } from 'hooks';
import { Grid } from "@mui/material";
import useAllTokens from './useAllTokens';
import {
    ChainId,
    CONTRACT_ADDRESS,
    RARESAMA_SUBGRAPH_URLS,
  } from '../../constants';
import { QUERY_PAGE_TOKENS } from 'subgraph/erc721Queries';
import { OwnedToken, PageTokens } from './types';
import request from 'graphql-request';
import uriToHttp from 'utils/uriToHttp';
export const MarketMoreSection = ({getCheckNowEvent} : any) => {
    const { btnCheckNow } = useClasses(styles);
    const [countTokens, setCountTokens] = useState<any>(0);
    const [tokensPage, setTokensPage] = useState<OwnedToken[]>([]);
    const { account } = useActiveWeb3React();
    const getRandomTokens = async () => {
        
        const randomNumber = Math.floor(Math.random() * 450);
        const result: any = await request<PageTokens>(
            RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
            QUERY_PAGE_TOKENS(CONTRACT_ADDRESS, randomNumber, 4)
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
    }
    useEffect(() => {
            getRandomTokens();

    }, []);
    const NFTCards = useMemo(
        () =>
        tokensPage.map((token) => (
            <Grid item md={3} sm={6} key={token.numericId.toString()}>
                <img src={token.metadata?.image} style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                <Grid container>
                    <Grid item md={6}>
                        <p style={{ fontWeight : "900", color : "white" }}>Buddie</p>
                        <p style={{ fontWeight : "900", fontSize : "24px", color : "white" }}>#{token.numericId.toString()}</p>
                        <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                    </Grid>
                    <Grid item md={6} style={{ textAlign : "right" }}>
                        <p style={{ color : "white" }}>PRICE</p>
                        <p style={{ fontWeight : "900", fontSize : "24px", color : "white" }}>2500</p>
                        <p style={{ color : "#00CE4C" }}>SAMA</p>
                    </Grid>
                </Grid>
                <button className={btnCheckNow} onClick={() => getCheckNowEvent(`${token.metadata?.image}`,  `BUDDIE #${token.numericId.toString()}`, "1300")}>CHECK IT NOW</button>
            </Grid>
        )),
    [tokensPage]
    );
    return (
        <div>
            <div style={{ marginTop : "50px", color : "white" }}>
                <h1 style={{ fontSize : '40px', fontWeight : "900" }}>MORE FROM THE MARKET PLACE</h1>
                <div style={{ marginTop : "30px" }}>
                    <Grid container spacing={4}>
                        { NFTCards }

                    </Grid>
                </div>
            </div>
        </div>
    );
}