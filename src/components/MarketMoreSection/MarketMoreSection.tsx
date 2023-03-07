import { useClasses } from "hooks";

import {styles} from "./MarketMoreSection.styles";
import { Grid } from "@mui/material";
export const MarketMoreSection = ({getCheckNowEvent} : any) => {
    const { btnCheckNow } = useClasses(styles);
    return (
        <div>
            <div style={{ marginTop : "50px", color : "white" }}>
                <h1 style={{ fontSize : '40px', fontWeight : "900" }}>MORE FROM THE MARKET PLACE</h1>
                <div style={{ marginTop : "30px" }}>
                    <Grid container spacing={4}>
                        <Grid item md={3} sm={6} >
                            <img src="./charactor (5).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>Buddie</p>
                                    <p style={{ fontWeight : "900", fontSize : "24px" }}>#48</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900", fontSize : "24px" }}>2500</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow} onClick={() => getCheckNowEvent("charactor (1).png","BUDDIE #48", "2500")}>CHECK IT NOW</button>
                        </Grid>

                        <Grid item md={3} sm={6} >
                            <img src="./charactor (6).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>Buddie</p>
                                    <p style={{ fontWeight : "900", fontSize : "24px" }}>#192</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900", fontSize : "24px" }}>1999</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow} onClick={() => getCheckNowEvent("charactor (2).png","BUDDIE #192", "1999")}>CHECK IT NOW</button>
                        </Grid>

                        <Grid item md={3} sm={6} >
                            <img src="./charactor (7).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>Buddie</p>
                                    <p style={{ fontWeight : "900", fontSize : "24px" }}>#230</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900", fontSize : "24px" }}>500</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow} onClick={() => getCheckNowEvent("charactor (3).png","BUDDIE #230", "500")}>CHECK IT NOW</button>
                        </Grid>

                        <Grid item md={3} sm={6} >
                            <img src="./charactor (8).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>Buddie</p>
                                    <p style={{ fontWeight : "900", fontSize : "24px" }}>#247</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900", fontSize : "24px" }}>4000</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow} onClick={() => getCheckNowEvent("charactor (4).png","BUDDIE #247", "4000")}>CHECK IT NOW</button>
                        </Grid>

                    </Grid>
                </div>
            </div>

            <div style={{ marginTop : "50px", color : "white" }}>
                <h1 style={{ fontSize : '40px', fontWeight : "900" }}>CHECK YOUR COLLECTION IN YOUR COFFEE PLACE</h1>
                <div style={{ marginTop : "30px" }}>
                    <Grid container spacing={2}>
                        <Grid item md={3} sm={6} >
                            <img src="./charactor (9).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={8}>
                                    {/* <p style={{ fontWeight : "900" }}>Buddie</p> */}
                                    <p style={{ fontWeight : "900", fontSize : "24px" }}>BUDDIE #70</p>
                                    <p style={{ color : "white" }}>MOONBUDDIES</p>
                                </Grid>
                                <Grid item md={4} style={{ textAlign : "right" }}>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow}>STAKE IT</button>
                        </Grid>

                        <Grid item md={3} sm={6} >
                            <img src="./charactor (10).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={8}>
                                    {/* <p style={{ fontWeight : "900" }}>Buddie</p> */}
                                    <p style={{ fontWeight : "900", fontSize : "24px" }}>BUDDIE #70</p>
                                    <p style={{ color : "white" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={4} style={{ textAlign : "right" }}>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow}>STAKE IT</button>
                        </Grid>
                        <Grid item md={3} sm={6} ></Grid>
                        <Grid item md={3} sm={6} ></Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}