export const styles = () => ({
    container : {
        paddingTop : "50px",
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
        "@media (max-width : 1192px)" : {
            paddingLeft : "0px"
        }
    }
})