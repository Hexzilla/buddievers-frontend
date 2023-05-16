import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container : {
        
        width: "100%",
        height: "719px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "14vh",
        "@media (max-width : 400px)" : {
            marginTop : "-2vh"
        },
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
        "&:hover" : {
        background : "#00CE4C"
        },
        "&:active" : {
        color : "white",
        background : "#01472A",
        }
    }
});
