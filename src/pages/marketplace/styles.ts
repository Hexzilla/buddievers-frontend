import { Theme } from "@mui/material";

export const styles = (theme : Theme) => ({
    container : {
        paddingLeft : '5vw',
        paddingRight : '5vw',
        background : "#016B43",
        paddingBottom : "50px"
    },
    introContainer : {
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
    button : {
        height: "98px",
        borderRadius: "10px",
        backgroundColor: "#F5E2B2",
        padding: "30px",
        fontSize: "25px",
        fontWeight: 900,
        color: theme.palette.text.primary,
        "&:hover":{
            backgroundColor: "rgba(0,0,0,0.4)",
            boxShadow: "none",
            color: "white"
        }
    },
    cardImg : {
        width : "100%"
    },
    cardTitle : {
        fontSize : "40px",
        fontWeight : "900",
        color : "white",
        marginBottom : 0
    },
    cardSubTitle : {
        fontSize : "16px",
        color : "white",
        fontWeight : "900",
        marginTop : 0
    },
    cardText : {
        fontSize : "16px",
        fontWeight : "400",
        color : "white"
    },
    cardButton : {
        width: "100%",
        height: "76px",
        background: "rgba(0, 206, 76, 0.6)",
        borderRadius: '20px',
        fontSize : "20px",
        color : "white",
        border : "none",
        cursor : "pointer",
    }

});