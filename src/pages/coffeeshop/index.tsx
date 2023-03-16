import { useClasses } from "hooks";
import { styles } from './styles';
import { Grid } from "@mui/material";

const CoffeeShop = () => {
    const { container, introContainer, bannerTxtContainer, claimSection, claimButton, rewardMiddleItem, stakedNFTs, stakeTitleLeft, stakeTitleRight, btnUnStake, cardMiddle } = useClasses(styles);
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
                        <p className={ stakeTitleRight }>TOTAL OWNED : 6</p>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={3} sm={6} >
                        <img src="./charactor (1).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                        <div className={ cardMiddle }>
                            <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #08</p>
                            <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                        </div>
                        <button className={btnUnStake}>STAKE</button>
                    </Grid>
                    <Grid item md={3} sm={6} >
                        <img src="./charactor (2).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                        <div className={ cardMiddle }>
                            <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #010</p>
                            <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                        </div>
                        <button className={btnUnStake}>STAKE</button>
                    </Grid>
                    <Grid item md={3} sm={6} >
                        <img src="./charactor (7).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                        <div className={ cardMiddle }>
                            <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #33</p>
                            <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                        </div>
                        <button className={btnUnStake}>STAKE</button>
                    </Grid>
                    <Grid item md={3} sm={6} >
                        <img src="./charactor (8).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                        <div className={ cardMiddle }>
                            <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #37</p>
                            <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                        </div>
                        <button className={btnUnStake}>STAKE</button>
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop : "100px" }}>
                        <Grid item md={3} sm={6} >
                            <img src="./charactor (9).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <div className={ cardMiddle }>
                                <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #36</p>
                                <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                            </div>
                            <button className={btnUnStake}>STAKE</button>
                        </Grid>
                        <Grid item md={3} sm={6} >
                            <img src="./charactor (10).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <div className={ cardMiddle }>
                                <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #43</p>
                                <p style={{ fontWeight: 400, fontSize: 16, color: "#00CE4C", marginTop : 0 }}>BUDDIES</p>
                            </div>
                            <button className={btnUnStake}>STAKE</button>
                        </Grid>
                        <Grid item md={3} sm={6} ></Grid>
                        <Grid item md={3} sm={6} ></Grid>
                    </Grid>
                    
                </Grid>
            </div>
        </div>
    );
}

export default CoffeeShop;