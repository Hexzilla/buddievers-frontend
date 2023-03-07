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
    },
    cardImg : {
        width : '100%'
    },
    cardMiddle : {
        width : '100%',
        background : "linear-gradient(0deg, #01472A, #01472A), linear-gradient(0deg, #01472A, #01472A), #01472A",
        paddingTop : "20px",
        paddingBottom : "20px",
        paddingLeft : "50px",
        marginTop : "-6px",
    },
    cardBottom : {
        width : '100%',
        background : "rgba(0, 0, 0, 0.5)",
        paddingTop : "20px",
        paddingBottom : "20px",
        paddingLeft : "50px",
    },
    btnBuy : {
        padding: '10px 20px',
        width: '70px',
        height: '44px',
        background: '#166D43',
        border : "none",
        color : 'white',
        cursor : "pointer"
    }
});