import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container: {
        width: "100%",
        margin : "auto",
        textAlign: "center",
        background: "#01472A",
        paddingBottom : "50px",
        "@media (max-width : 1192px)" : {
            width : "100%"
        }
    },
    stepContainer : {
        width : "100%",
        margin : "auto",
    },
    title: {
        fontWeight: "900",
        fontSize: "2.5vw",
        color: "#00CE4C",
        "@media (max-width : 1192px)" : {
            fontSize : "60px",
        }
    },
    roadNumbers:{
        padding : "20px 40px 20px 40px",
        backgroundColor : "#016B43",
        color : "white",
        borderRadius : "20px",
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-evenly",
        "& > h1" : {
            fontSize : "3.5vw",
            fontWeight : "900",
            margin : "0px",
        },
        "& > p" : {
            fontSize : "1.3vw",
            display: 'flex',
            justifyContent: "center",
            flexDirection: "column",
            margin : "0px",
            fontWeight : "900"
        },
        "@media (max-width : 980px)" : {
            width : "80%",
            margin : "auto",
            "& > h1" : {
                fontSize : "7vw",
            },
            "& > p" : {
                fontSize : "4vw"
            }
        }
    },
    roadExp : {
        color : "white",
        textAlign : "left",
        fontSize : "1vw",
        lineHeight : "23x",
        fontWeight : "500",
        "@media (max-width : 980px)" : {
            "& > li" : {
                fontSize : "4vw"
            }
        }
    },
    roadEnd : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px 40px',
        color : "white",
        background: '#00CE4C',
        borderRadius: '20px',
        "& > h1" : {
            fontSize : "1.8vw",
            fontWeight : "900",
            margin : "0px",
        },
        "& > p" : {
            fontSize : "0.8vw",
        },
        "@media (max-width : 980px)" : {
            padding: '10px 30px',
            "& > h1" : {
                fontSize : "4vw"
            },
            "& > p" : {
                fontSize : "3vw"
            }
        }
    },
    carouselItems : {
        "@media (max-width : 980px)" : {
            display : "block"
        }
    },
    roadImg : {
        width : "100%",
        borderRadius : "10px"
    }
});
