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
        height: "61px",
        borderRadius: "20px",
        backgroundColor: "#F5E2B3",
        padding: " 20px 40px",
        fontSize: "14px",
        fontWeight: 700,
        color: theme.palette.text.primary,
        "&:hover":{
            backgroundColor: "rgba(0,0,0,0.4)",
            boxShadow: "none",
            color: "white"
        }
    }
});
