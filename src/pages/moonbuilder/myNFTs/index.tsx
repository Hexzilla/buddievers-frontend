import { useClasses, useActiveWeb3React } from "hooks";
import { styles } from './styles';
import request from 'graphql-request';
import { Grid } from "@mui/material";
import { QUERY_OWNED_TOKENS } from 'subgraph/erc721Queries';
import { useState, useEffect } from "react";
import {
    ChainId,
    CONTRACT_ADDRESS,
    RARESAMA_SUBGRAPH_URLS,
} from '../../../constants';

export type OwnedToken = {
    numericId: string;
};
  
  export type OwnedTokenPayload = {
    tokens: OwnedToken[];
};

const MyNFTs = () => {
    const { container, stakedNFTs, stakeTitleLeft, stakeTitleRight, btnUnStake, cardMiddle } = useClasses(styles);
    const { account } = useActiveWeb3React();
    const [tokenIds, setTokenId] = useState<Number[]>([]);
    useEffect(() => {
        const getTokens = async () => {
            if(account){
                const address = account; //'0xdfe055245ab0b67fb0b5ae3ea28cd1fee40299df'; //account;
                const result: any = await request<OwnedTokenPayload>(
                    RARESAMA_SUBGRAPH_URLS[ChainId.EXOSAMA],
                    QUERY_OWNED_TOKENS(CONTRACT_ADDRESS, address)
                );
                setTokenId([]);
                console.log("hello")
                console.log('tokens-result', result);
                if (result?.tokens && result.tokens.length > 0) {
                    result.tokens.map((token:any) => {
                        setTokenId(prevArray  => [...prevArray, Number(token.numericId)]);
                    })
                }
            }
            
        };
        getTokens();
    }, [account]);

    const NFTCards = tokenIds.map((tokenId) => 
        <Grid item md={3} sm={6} key={tokenId.toString()} >
            <img src="./charactor (3).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} alt=""/>
            <div className={ cardMiddle }>
                <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #{tokenId.toString()}</p>
                <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
            </div>
            <button className={btnUnStake}>View</button>
        </Grid>
    );
    return (
        <div className={ container }>
            <div className={ stakedNFTs }>
                <Grid container>
                    <Grid item sm={6}>
                        <p className={ stakeTitleLeft }>My NFTS</p>
                    </Grid>
                    <Grid item sm={6} style={{ textAlign : "right" }}>
                        <p className={ stakeTitleRight }>TOTAL NFTS : { tokenIds.length } </p>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    { NFTCards }
                </Grid>
            </div>
        </div>
    );
}

export default MyNFTs;