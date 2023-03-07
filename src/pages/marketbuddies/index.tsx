import { styles } from "./styles";
import { useClasses } from 'hooks';
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MarketBuddies = () => {
    const { container, bannerContainer, cardImg, cardMiddle, cardBottom, btnBuy } = useClasses(styles);
    const navigate = useNavigate();
    const toDetail = (imgName: any, Price: any, Name: any) => {
        navigate('/buddieDetail', {
            state : {
                imgName : imgName,
                Price : Price,
                Name : Name
            }
        });
    }
    return (
        <div className={container}>
            <div className={ bannerContainer }></div>
            <Grid container spacing={4} style={{ marginTop : 80 }}>
                <Grid item md={3} sm={12}>
                    <img src="./charactor (1).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #70</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                1300 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (1).png", "1300", "BUDDIE #70")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item md={3} sm={12}>
                    <img src="./charactor (2).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #192</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                1000 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (2).png", "1000", "BUDDIE #192")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item md={3} sm={12}>
                    <img src="./charactor (3).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #230</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                2700 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (3).png", "2700", "BUDDIE #230")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item md={3} sm={12}>
                    <img src="./charactor (4).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #247</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                900 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (4).png", "900", "BUDDIE #247")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={4} style={{ marginTop : 50 }}>
                <Grid item md={3} sm={12}>
                    <img src="./charactor (1).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #70</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                1300 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (1).png", "1300", "BUDDIE #70")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item md={3} sm={12}>
                    <img src="./charactor (2).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #192</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                1000 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (2).png", "1000", "BUDDIE #192")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item md={3} sm={12}>
                    <img src="./charactor (3).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #230</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                2700 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (3).png", "2700", "BUDDIE #230")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item md={3} sm={12}>
                    <img src="./charactor (4).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #247</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                900 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (4).png", "900", "BUDDIE #247")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={4} style={{ marginTop : 50 }}>
                <Grid item md={3} sm={12}>
                    <img src="./charactor (1).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #70</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                1300 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (1).png", "1300", "BUDDIE #70")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item md={3} sm={12}>
                    <img src="./charactor (2).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #192</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                1000 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (2).png", "1000", "BUDDIE #192")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item md={3} sm={12}>
                    <img src="./charactor (3).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #230</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                2700 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (3).png", "2700", "BUDDIE #230")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item md={3} sm={12}>
                    <img src="./charactor (4).png" className={cardImg} />
                    <div className={ cardMiddle }>
                        <p style={{ fontWeight: 900, fontSize: 24, color: "white", marginBottom : 0 }}>BUDDIE #247</p>
                        <p style={{ fontWeight: 400, fontSize: 16, color: "white", marginTop : 0 }}>BUDDIEVERSE</p>
                    </div>
                    <div className={cardBottom}>
                        <Grid container>
                            <Grid style={{ color: "white", textAlign : "initial" }} item md={6}>
                                LAST SALE: < br/>
                                900 SAMA
                            </Grid>
                            <Grid style={{ color: "white", textAlign : "center" }} item md={6}>
                                <button className={btnBuy} onClick={() => toDetail("charactor (4).png", "900", "BUDDIE #247")}>BUY</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>

           
        </div>
    );
}

export default MarketBuddies