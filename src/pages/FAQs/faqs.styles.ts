import { Theme } from '@mui/material';

export const FAQStyles = (theme : Theme) => ({
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
        color: theme.palette.text.button,
        "&:hover":{
            backgroundColor: "rgba(0,0,0,0.4)",
            boxShadow: "none",
            color: "white"
        }
    },
    FAQWrap : {
        
    },
    mainTitle : {
        color : "white",
        fontSize : "2.4vw",
        fontWeight : "900"
    },
    bannerTxtContainer : {
        width : "100%", 
        height : "100%", 
        background : "rgba(0,0,0,0.5)", 
        textAlign : "center",
        display : "flex",
        alignItems: "center",
        justifyContent: "center",
        "& > p" : {
            fontSize : "4.5vw",
            fontWeight : "900",
            color : 'white'
        }
    }
})