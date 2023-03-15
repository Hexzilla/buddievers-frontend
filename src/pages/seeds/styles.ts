

export const styles = () => ({
    container : {
        width : "100%",
        paddingTop : "18vh",
        background : "#016B43",
        paddingLeft : "5%",
        paddingRight : "5%",
        paddingBottom : "50px"
    },
    overViewItem: {
        border : "1px solid #01472A",
        borderRadius : "20px",
        textAlign : 'center',
        paddingTop : "20px",
        paddingBottom : "20px",
        "& > p" : {
            fontSize : "16px",
            color : "#00CE4C",
            fontWeight : "900",
            margin : 0
            // lineHeight : "24px"
        },
        "& > h4" : {
            fontSize : "24px",
            fontWeight : "700",
            color : "white",
            margin : 0
            // lineHeight : "36px"
        }
    },
    btnBuy : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 40px',
        border : "none",
        width: '100%',
        height: '76px',
        color : "white",
        fontSize : "24px",
        background: 'rgba(0, 206, 76, 0.6)',
        borderRadius: '20px'
    },
    btnOffer : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 40px',
        border : "none",
        width: '100%',
        height: '76px',
        color : "white",
        fontSize : "24px",
        background: 'rgba(1, 71, 42, 0.6)',
        borderRadius: '20px'
    },
    tradeButtons : {
        display : "flex",
        
    },
    tradeButton : {
        width : 70,
        height : 44,
        background : "#00CE4C",
        borderRadius : "20px",
        color : "white",
        fontSize : "16px",
        cursor : "pointer",
        border : "none",
        marginLeft : "20px"
    },
    tableBtn : {
        width : "66px",
        height : "44px",
        color : "white",
        background : "rgba(0,206, 76, 0.6)",
        borderRadius : "20px",
        border : "none",
        cursor : "pointer"
    },
    tradeTable : {
        background : "transparent",
        color : "white",
        "& td, & th" : {
            color : "white",
            textAlign : "left"
        },
        "& tr" : {
            border : "none"
        }
    },
    tableWrapper:{
        background : "#01472A",
        paddingLeft : "5%",
        paddingRight : "5%",
        paddingTop : "50px",
        paddingBottom : "50px"
    }
});