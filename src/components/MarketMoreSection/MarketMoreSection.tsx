import { useClasses } from "hooks";

import {styles} from "./MarketMoreSection.styles";
import { Grid } from "@mui/material";
export const MarketMoreSection = () => {
    const { btnCheckNow } = useClasses(styles);
    return (
        <div>
            <div style={{ marginTop : "50px", color : "white" }}>
                <h1 style={{ fontSize : '40px', fontWeight : "900" }}>MORE FROM THE MARKET PLACE</h1>
                <div style={{ marginTop : "30px" }}>
                    <Grid container spacing={2}>
                        <Grid item md={2} sm={6} >
                            <img src="./charactor (1).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>BUDDY</p>
                                    <p style={{ fontWeight : "900" }}>#48</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900" }}>2500</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow}>CHECK IT NOW</button>
                        </Grid>

                        <Grid item md={2} sm={6} >
                            <img src="./charactor (2).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>BUDDY</p>
                                    <p style={{ fontWeight : "900" }}>#48</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900" }}>2500</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow}>CHECK IT NOW</button>
                        </Grid>

                        <Grid item md={2} sm={6} >
                            <img src="./charactor (3).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>BUDDY</p>
                                    <p style={{ fontWeight : "900" }}>#48</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900" }}>2500</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow}>CHECK IT NOW</button>
                        </Grid>

                        <Grid item md={2} sm={6} >
                            <img src="./charactor (4).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>BUDDY</p>
                                    <p style={{ fontWeight : "900" }}>#48</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900" }}>2500</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow}>CHECK IT NOW</button>
                        </Grid>

                        <Grid item md={2} sm={6} >
                            <img src="./charactor (6).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>BUDDY</p>
                                    <p style={{ fontWeight : "900" }}>#48</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900" }}>2500</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow}>CHECK IT NOW</button>
                        </Grid>
                    </Grid>
                </div>
            </div>

            <div style={{ marginTop : "50px", color : "white" }}>
                <h1 style={{ fontSize : '40px', fontWeight : "900" }}>CHECK YOUR COLLECTION IN YOUR COFFEE PLACE</h1>
                <div style={{ marginTop : "30px" }}>
                    <Grid container spacing={2}>
                        <Grid item md={2} sm={6} >
                            <img src="./charactor (8).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>BUDDY</p>
                                    <p style={{ fontWeight : "900" }}>#48</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900" }}>2500</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow}>CHECK IT NOW</button>
                        </Grid>

                        <Grid item md={2} sm={6} >
                            <img src="./charactor (9).png" style={{ width : "100%", height : "400px", borderRadius : "20px" }} />
                            <Grid container>
                                <Grid item md={6}>
                                    <p style={{ fontWeight : "900" }}>BUDDY</p>
                                    <p style={{ fontWeight : "900" }}>#48</p>
                                    <p style={{ color : "#00CE4C" }}>BUDDIES</p>
                                </Grid>
                                <Grid item md={6} style={{ textAlign : "right" }}>
                                    <p>PRICE</p>
                                    <p style={{ fontWeight : "900" }}>2500</p>
                                    <p style={{ color : "#00CE4C" }}>SAMA</p>
                                </Grid>
                            </Grid>
                            <button className={btnCheckNow}>CHECK IT NOW</button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}