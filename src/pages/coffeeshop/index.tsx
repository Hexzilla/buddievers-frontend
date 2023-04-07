import { useEffect, useMemo, useState } from 'react';
import { useActiveWeb3React, useClasses } from "hooks";
import { styles } from './styles';
import { Grid } from "@mui/material";
import { NavLink, Button } from 'ui';
import useOwnedTokens from './useOwnedTokens';
import {
  ChainId,
  CONTRACT_ADDRESS,
  RARESAMA_SUBGRAPH_URLS,
} from '../../constants';
import { QUERY_TOKEN_BY_ID, QUERY_OWNED_PAGE_TOKENS } from 'subgraph/erc721Queries';
import { OwnedToken, OwnedTokenPayload, PageTokens } from './types';
import request from 'graphql-request';
import Pagination from '@mui/material/Pagination';
import { useWeb3React } from '@web3-react/core';
import uriToHttp from 'utils/uriToHttp';



const CoffeeShop = () => {
    const { container, introContainer, bannerTxtContainer, claimSection, claimButton, rewardMiddleItem, stakedNFTs, stakeTitleLeft, stakeTitleRight, btnUnStake, cardMiddle, paginationContainer, paginationStyle } = useClasses(styles);
    const [countTokens, setCountTokens] = useState<any>(0);
    const [tokensPage, setTokensPage] = useState<OwnedToken[]>([]);
    const { account } = useActiveWeb3React();
    const getPageTokens = async (pageNumber : number, address : string) => {
        const result: any = await request<PageTokens>(
            RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
            QUERY_OWNED_PAGE_TOKENS(CONTRACT_ADDRESS, address, (pageNumber-1) * 20, 20)
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
    const pageChangeHandler = async (event : any, pageNumber : number) => {
        if(account){
            getPageTokens(pageNumber, account);
        }
    
    }
    const ownedTokens = useOwnedTokens();

    useEffect(() => {
        if(account){
            getPageTokens(1, account);
        }
    
    }, []);

    useEffect(() => {
        if(account){
            setCountTokens( ownedTokens.length % 20 == 0 ? ownedTokens.length / 20 : ownedTokens.length / 20 + 1 );
        }
    });

    const NFTCards = useMemo(
        () =>
        tokensPage.map((token) => (
            <Grid item md={3} sm={6} >
                <img src={token.metadata?.image} style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                <div className={ cardMiddle }>
                    <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #{token.numericId.toString()}</p>
                    <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                </div>
                <button className={btnUnStake}>STAKE</button>
            </Grid>
        )),
    [tokensPage, ownedTokens, btnUnStake, cardMiddle]
    );
    return (
        <div className={ container }>
            <div className={introContainer}>
                <div className={ bannerTxtContainer }>
                    <p>COFFEE SHOP</p>
                </div>
            </div>
            <div className={ claimSection }>
                <Grid container spacing={2}>
                    <Grid item md={3} sm={12}>
                        <p style={{ color : "white" }}>Coffee Shop is the place where you can stake / unstake your NFTs to earn $SEEDS</p>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Grid container spacing={4}>
                            <Grid item md={3} sm={6} className={ rewardMiddleItem }>
                                <h3>FUNDS</h3>
                                <p>170K SEED</p>
                            </Grid>
                            <Grid item md={3} sm={6} className={ rewardMiddleItem }>
                                <h3>REWARDS</h3>
                                <p>20000 SEED</p>
                            </Grid>
                            <Grid item md={3} sm={6} className={ rewardMiddleItem }>
                                <h3>PERIOD</h3>
                                <p>20d 04h 20m 15s</p>
                            </Grid>
                            <Grid item md={3} sm={6} className={ rewardMiddleItem }>
                                <h3>STAKED</h3>
                                <p>4 BUDDIES</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} sm={12}>
                        <button className={ claimButton }>CLAIM REWARDS</button>
                    </Grid>
                </Grid>
            </div>
            <div className={ stakedNFTs }>
                <Grid container>
                    <Grid sm={6}>
                        <p className={ stakeTitleLeft }>STAKED NFTS</p>
                    </Grid>
                    <Grid sm={6} style={{ textAlign : "right" }}>
                        <p className={ stakeTitleRight }>TOTAL STAKED : 4</p>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={3} sm={6} >
                        <img src="./charactor (3).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                        <div className={ cardMiddle }>
                            <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #08</p>
                            <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                        </div>
                        <button className={btnUnStake}>UNSTAKE</button>
                    </Grid>
                    <Grid item md={3} sm={6} >
                        <img src="./charactor (4).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                        <div className={ cardMiddle }>
                            <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #010</p>
                            <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                        </div>
                        <button className={btnUnStake}>UNSTAKE</button>
                    </Grid>
                    <Grid item md={3} sm={6} >
                        <img src="./charactor (5).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                        <div className={ cardMiddle }>
                            <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #33</p>
                            <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                        </div>
                        <button className={btnUnStake}>UNSTAKE</button>
                    </Grid>
                    <Grid item md={3} sm={6} >
                        <img src="./charactor (6).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                        <div className={ cardMiddle }>
                            <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #37</p>
                            <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                        </div>
                        <button className={btnUnStake}>UNSTAKE</button>
                    </Grid>
                </Grid>
            </div>
            <div className={ stakedNFTs }>
                <Grid container>
                    <Grid sm={6}>
                        <p className={ stakeTitleLeft }>MY NFTS</p>
                    </Grid>
                    <Grid sm={6} style={{ textAlign : "right" }}>
                        <p className={ stakeTitleRight }>TOTAL OWNED : {ownedTokens.length}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {NFTCards}
                    
                </Grid>
                <div className={ paginationContainer }>
                    <Pagination count={countTokens} onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)} size="large" shape="circular" showFirstButton showLastButton className={ paginationStyle } />
                </div>
            </div>
        </div>
    );
}

export default CoffeeShop;