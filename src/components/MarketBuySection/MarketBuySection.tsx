import { useState, useEffect, useMemo } from 'react';
import { useClasses } from 'hooks';
import { styles } from './MarketBuySection.styles';
import { Grid } from '@mui/material';
import {
    ChainId,
    CONTRACT_ADDRESS,
    RARESAMA_SUBGRAPH_URLS,
  } from '../../constants';
import { QUERY_TOKEN_BY_ID } from 'subgraph/erc721Queries';
import { ViewToken } from './types';
import request from 'graphql-request';
import uriToHttp from 'utils/uriToHttp';

export const MarketBuySection = ({numericId, imgName, price, name} : any) => {
    const { container, overViewItem, btnBuy, btnOffer } = useClasses(styles);
    const [ tokens, setTokens ] = useState<ViewToken[]>([]);

    const getToken = async () => {
        const result: any = await request<ViewToken>(
            RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
            QUERY_TOKEN_BY_ID(CONTRACT_ADDRESS, numericId)
        );
        if (result?.tokens && result.tokens.length > 0) {
            const tokens = result.tokens.map((token: ViewToken) => {
                if (token.metadata?.image) {
                    const urls = uriToHttp(token.metadata.image, true);
                    token.metadata.image = urls[0];
                }
                return token;
            });
            setTokens(tokens);
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    const description = useMemo(
        () => 
        <p>
            { tokens[0]?.metadata?.description }
        </p>,
        [tokens]
    );

    const owner = useMemo(
        () =>
            <p style={{ color : "white", margin : 0, fontSize : "16px", fontWeight : "700" }}>{tokens[0]?.owner.id}</p>
        ,
        [tokens]
    );

    const artist = useMemo(
        () =>
            <p style={{ color : "white", margin : 0, fontSize : "16px", fontWeight : "700" }}>{tokens[0]?.metadata?.artist}</p>
        ,
        [tokens]
    );

    return (
        <div className={container}>
            <Grid container spacing={4}>
                <Grid item md={4} sm={12}>
                    <img src={`${imgName}`} style={{ maxWidth : "100%", height : "100%", borderRadius : "20px" }} />
                </Grid>
                <Grid item md={8} sm={12}>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={6}>
                                <div className={overViewItem}>
                                    <p>LAST BUY</p>
                                    <h4>999 SAMA</h4>
                                </div>
                            </Grid>
                            <Grid item md={3} sm={6}>
                                <div className={overViewItem}>
                                    <p>FLOOR PRICE</p>
                                    <h4>2500 SAMA</h4>
                                </div>
                            </Grid>
                            <Grid item md={3} sm={6}>
                                <div className={overViewItem}>
                                    <p>OWNERS</p>
                                    <h4>293</h4>
                                </div>
                            </Grid>
                            <Grid item md={3} sm={6}>
                                <div className={overViewItem}>
                                    <p>TOTAL VOLUME</p>
                                    <h4>5M SAMA</h4>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item md={6} sm={12} style={{ textAlign : "left", marginTop : "20px" }}>
                                <p style={{ fontSize : "24px", color : "rgba(255, 255, 255, 0.5)", margin : 0 }}>MOONBUDDIES</p>
                                <p style={{ fontSize : "38px", color : "white", fontWeight : "900", margin : 0 }}>{name}</p>
                            </Grid>
                            <Grid item md={6} sm={12} style={{ textAlign : "right", marginTop : "20px" }}>
                                <p style={{ fontSize : "24px", color : "#00CE4C", margin : 0 }}>PRICE</p>
                                <p style={{ fontSize : "38px", color : "white", fontWeight : "900", margin : 0 }}>{price} SAMA</p>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ marginTop : "20px" }}>
                        <Grid container spacing={3}>
                            <Grid item md={6} sm={6} style={{ display : "flex" }}>
                                <img src="./market (2).png" style={{ height : "50px", width : "50px" }} />
                                <div style={{ display : "block", marginLeft : "20px" }}>
                                    <p style={{ margin : 0, fontSize : "16px", color : "#00CE4C", fontWeight : "900" }}>CREATOR</p>
                                    { artist }
                                </div>
                            </Grid>
                            <Grid item md={6} sm={6} style={{ display : "flex" }}>
                                <img src="./market (1).png" style={{ height : "50px", width : "50px" }} />
                                <div style={{ display : "block", marginLeft : "20px" }}>
                                    <p style={{ margin : 0, fontSize : "16px", color : "#00CE4C", fontWeight : "900" }}>OWNER</p>
                                    { owner }
                                </div>
                            </Grid>
                            {/* <Grid item md={3} sm={6} style={{ display : "flex" }}></Grid>
                            <Grid item md={3} sm={6} style={{ display : "flex" }}></Grid> */}
                        </Grid>
                    </div>
                    <div style={{ color : "white", marginTop : "20px" }}>
                        <p style={{ fontSize : "16px", fontWeight : "900" }}>DESCRIPTION</p>
                        <p style={{ fontSize : "16px" }}>{ description }</p>
                    </div>
                    <div style={{ marginTop : "6vh" }}>
                        <Grid container spacing={2}>
                            <Grid item md={6} sm={12}>
                                <button className={btnBuy}>BUY NOW</button>
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <button className={btnOffer}>MAKE AN OFFER</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}