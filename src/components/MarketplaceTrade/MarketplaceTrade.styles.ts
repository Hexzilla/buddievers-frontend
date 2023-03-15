

export const styles = () => ({
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
    }
})