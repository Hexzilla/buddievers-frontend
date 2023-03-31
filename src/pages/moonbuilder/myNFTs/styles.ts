


export const styles = () => ({
    container : {
        paddingTop : "50px",
        paddingLeft : '5vw',
        paddingRight : '5vw',
        background : "#016B43",
        paddingBottom : "50px",
        marginTop : "100px",
        minHeight: '800px',
    },
    stakedNFTs : {
        marginTop : "0px",
    },
    stakeTitleLeft  :{
        fontSize : "40px",
        fontWeight : "900",
        color : "white",
        marginTop : 0
    },
    stakeTitleRight : {
        fontSize : "24px",
        fontWeight : "900",
        color : "#00CE4C"
    },
    btnUnStake : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 40px',
        height: '50px',
        color : "white",
        fontSize : "20px",
        fontWeight : "400",
        border : "none",
        background: 'rgba(0, 206, 76, 0.6)',
        borderRadius: '20px',
        width : "100%",
        cursor : "pointer",
        textDecoration: 'none',
    },
    cardMiddle : {
        width : '100%',
        paddingTop : "0px",
        paddingBottom : "0px",
        paddingLeft : "50px",
        marginTop : "-6px",
    },
    attributeCard : {
        padding : "10px",
        textAlign : "center",
        boxShadow : "1px 1px 1px 1px rgba(0,0,0,0.1)",
        border : "1px solid rgba(0,0,0,0.5)",
        borderRadius : "20px",
        "& > p" : {
            color : "black",
        },
        "& > h4" : {
            color : "green",
        }
    },
})