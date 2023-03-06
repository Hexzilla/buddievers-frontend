import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container : {
        
        width: "100%",
        height: "719px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "100px",
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
        color: theme.palette.text.primary,
        "&:hover":{
            backgroundColor: "rgba(0,0,0,0.4)",
            boxShadow: "none",
            color: "white"
        }
    }
});
