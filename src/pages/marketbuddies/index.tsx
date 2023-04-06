import { styles } from "./styles";
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
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
// import { TextField } from "@mui/material";
import uriToHttp from 'utils/uriToHttp';

const MarketBuddies = () => {
    const { container, bannerContainer, cardImg, cardMiddle, cardBottom, btnBuy, bannerTxtContainer, paginationStyle, paginationContainer,searchWrapper, searchTitle, searchFields, searchById, sortSelect, btnCheckNow } = useClasses(styles);
    const [countTokens, setCountTokens] = useState<any>(0);
    const [tokensPage, setTokensPage] = useState<OwnedToken[]>([]);
    const { account } = useActiveWeb3React();
    const getPageTokens = async (pageNumber : number) => {
        const result: any = await request<PageTokens>(
            RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
            QUERY_PAGE_TOKENS(CONTRACT_ADDRESS, (pageNumber-1) * 20, 20)
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
            getPageTokens(pageNumber);
    }
    const ownedTokens = useAllTokens();
  
    useEffect(() => {
        getPageTokens(1);
    }, []);

    useEffect(() => {
        setCountTokens( ownedTokens.length % 20 == 0 ? ownedTokens.length / 20 : ownedTokens.length / 20 + 1 );
    });
    const navigate = useNavigate();
    const toDetail = (numericId : any, imgName: any, Price: any, Name: any) => {
        navigate('/buddieDetail', {
            state : {
                numericId : numericId,
                imgName : imgName,
                Price : Price,
                Name : Name
            }
        });
    }
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
                <button className={btnCheckNow} onClick={() => toDetail(token.numericId ,`${token.metadata?.image}`, "1300", `BUDDIE #${token.numericId.toString()}`)}>CHECK IT NOW</button>
            </Grid>
        )),
    [tokensPage, ownedTokens, cardMiddle]
    );
    return (
        <div className={container}>
            <div className={ bannerContainer }>
                <div className={ bannerTxtContainer }>
                    <p>MOONBUDDIES</p>
                </div>
            </div>
            <div className={ searchWrapper }>
                <Grid container spacing={4}>
                    <Grid item md={6} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={6}>
                                <p className={searchTitle}>FLOOR PRICE</p>
                                <p style={{ color : "white" }}>BUDDIE #10</p>
                                <p style={{ color : "white" }}>2500 SAMA</p>
                            </Grid>
                            <Grid item md={3} sm={6}>
                                <p className={searchTitle}>LAST BUY</p>
                                <p style={{ color : "white" }}>BUDDIE #28</p>
                                <p style={{ color : "white" }}>4000 SAMA</p>
                            </Grid>
                            <Grid item md={3} sm={6}>
                                <p className={searchTitle}>VOLUME</p>
                                <p style={{ color : "white" }}>5M SAMA</p>
                            </Grid>
                            <Grid item md={3} sm={6}>
                                <p className={searchTitle}>OWNERS</p>
                                <p style={{ color : "white" }}>320</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Grid container style={{ marginTop : "20px" }}>
                            <Grid item md={2} sm={12}></Grid>
                            <Grid item md={5} sm={12}>
                                <div className={searchFields}>
                                    <span>ID:</span>
                                    <input type="text" id="outlined-basic" placeholder="SEARCH" className={ searchById } />
                                </div>
                            </Grid>
                            <Grid item md={5} sm={12}>
                                <div className={searchFields}>
                                    <span>SORT BY:</span>
                                    <select className={ sortSelect }>
                                        <option>PRICE LOWEST</option>
                                        <option>PRICE HIGHEST</option>
                                    </select>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={4} style={{ marginTop : 80 }}>
                { NFTCards }
            </Grid>
            <div className={ paginationContainer }>
                <Pagination count={countTokens} onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)} size="large" shape="circular" showFirstButton showLastButton className={ paginationStyle } />
            </div>
        </div>
    );
}

export default MarketBuddies