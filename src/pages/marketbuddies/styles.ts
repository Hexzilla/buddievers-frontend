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
    },
    paginationStyle : {
        marginTop : "30px",
        "& > ul > li > button" : {
            background : "rgba(0, 206, 76, 0.6)",
            color : "white",
            borderRadius : "20px",
            width : "61px",
            height : "44px",
        },
        "& > ul > li > button.Mui-selected" : {
            backgroundColor : "#00CE4C",
        }
    },
    paginationContainer : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "center"
    },
    searchWrapper : {
        marginTop : "20px"
    },
    searchTitle : {
        color : "#00CE4C",
        fontWeight : "900"
    },
    searchFields : {
        display : "flex",
        alignItems : "center",
        "& > span" : {
            color : "#00CE4C",
            fontWeight : "900",
            marginRight : "20px"
        }
    },
    searchById : {
        background : "rgba(0,0,0,0.6)",
        height : '64px',
        color : "white",
        border : "none",
        borderRadius : "20px",
        paddingLeft : "20px",
        "&::placeholder" : {
            color : "rgba(255,255,255,0.7)"
        },
        "&:focus-visible" : {
            outline : "none"
        }
    },
    sortSelect : {
        height : "64px",
        color : "white",
        paddingLeft : '20px',
        paddingRight : '20px',
        border : "1px solid rgba(0,0,0,0.4)",
        borderRadius : "20px",
        background : "transparent",
        "& > option" : {
            color : "black"
        },
        "&:focus-visible" : {
            outline : "none"
        }
    },
    btnCheckNow : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 40px',
        height: '76px',
        color : "white",
        fontSize : "20px",
        fontWeight : "400",
        border : "none",
        background: 'rgba(0, 206, 76, 0.6)',
        borderRadius: '20px',
        width : "100%",
        cursor : "pointer"
    }
});