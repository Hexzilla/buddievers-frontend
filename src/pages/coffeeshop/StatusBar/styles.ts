


export const styles = () => ({
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
    claimSection : {
        marginTop : "50px",
        marginBottom : "50px"
    },
    claimButton : {
        color : "white",
        padding: '20px 40px',
        background: 'rgba(0, 0, 0, 0.25)',
        border : "none",
        borderRadius : "20px",
        fontSize : "24px",
        width : "100%",
        cursor: "pointer"
    },
    rewardMiddleItem: {
        color : "white",
        "& > h3" : {
            fontSize : "24px",
            fontWeight : "900",
            marginTop : 0,
            marginBottom : 0
        },
    },
    btnUnStake : {
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
    },
    cardMiddle : {
        width : '100%',
        paddingTop : "20px",
        paddingBottom : "20px",
        paddingLeft : "50px",
        marginTop : "-6px",
    },
    stakedNFTs : {
        marginTop : "60px",
    }
})