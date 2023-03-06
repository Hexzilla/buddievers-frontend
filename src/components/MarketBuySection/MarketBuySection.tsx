import { useClasses } from 'hooks';
import { styles } from './MarketBuySection.styles';
import { Grid } from '@mui/material';
export const MarketBuySection = () => {
    const { container, overViewItem, btnBuy, btnOffer } = useClasses(styles);
    return (
        <div className={container}>
            <Grid container spacing={4}>
                <Grid item md={4} sm={12}>
                    <img src='./charactor (5).png' style={{ maxWidth : "100%", height : "100%", borderRadius : "20px" }} />
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
                                    <p>TOTAL VOLUMN</p>
                                    <h4>5M SAMA</h4>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item md={6} sm={12} style={{ textAlign : "left", marginTop : "20px" }}>
                                <p style={{ fontSize : "24px", color : "rgba(255, 255, 255, 0.5)", margin : 0 }}>BUDDIES</p>
                                <p style={{ fontSize : "40px", color : "white", fontWeight : "900", margin : 0 }}>BUDDY #192</p>
                            </Grid>
                            <Grid item md={6} sm={12} style={{ textAlign : "right", marginTop : "20px" }}>
                                <p style={{ fontSize : "24px", color : "#00CE4C", margin : 0 }}>PRICE</p>
                                <p style={{ fontSize : "40px", color : "white", fontWeight : "900", margin : 0 }}>2500 SAMA</p>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ marginTop : "20px" }}>
                        <Grid container spacing={3}>
                            <Grid item md={3} sm={6} style={{ display : "flex" }}>
                                <img src="./market (2).png" style={{ height : "50px", width : "50px" }} />
                                <div style={{ display : "block", marginLeft : "20px" }}>
                                    <p style={{ margin : 0, fontSize : "16px", color : "#00CE4C", fontWeight : "900" }}>CREATOR</p>
                                    <p style={{ color : "white", margin : 0, fontSize : "24px", fontWeight : "700" }}>MR KILT MASTER</p>
                                </div>
                            </Grid>
                            <Grid item md={3} sm={6} style={{ display : "flex" }}>
                                <img src="./market (1).png" style={{ height : "50px", width : "50px" }} />
                                <div style={{ display : "block", marginLeft : "20px" }}>
                                    <p style={{ margin : 0, fontSize : "16px", color : "#00CE4C", fontWeight : "900" }}>OWNER</p>
                                    <p style={{ color : "white", margin : 0, fontSize : "24px", fontWeight : "700" }}>ANON01927</p>
                                </div>
                            </Grid>
                            <Grid item md={3} sm={6} style={{ display : "flex" }}></Grid>
                            <Grid item md={3} sm={6} style={{ display : "flex" }}></Grid>
                        </Grid>
                    </div>
                    <div style={{ color : "white", marginTop : "20px" }}>
                        <p style={{ fontSize : "16px", fontWeight : "900" }}>DESCRIPTION</p>
                        <p style={{ fontSize : "16px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit massa in est pulvinar mattis. Sed malesuada bibendum sapien, quis ultricies mi lacinia vitae. </p>
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