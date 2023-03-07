import { Theme } from "@mui/material"

export const styles = (theme : Theme) => ({
    container : {
        paddingLeft : '5vw',
        paddingRight : '5vw',
        background : "#016B43",
        paddingBottom : "50px"
    },
    bannerContainer: {
        background: `url("./intro-background.png") no-repeat center`,
        backgroundSize : "cover",
        width: "100%",
        height: "319px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // marginBottom: "100px",
        marginTop: "14vh",
        "@media (min-width : 2990px)" : {
            marginTop : "9vh"
        }
    }
});