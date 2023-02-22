import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "2vw 8vh"
    },
    title: {
        fontWeight: "900",
        fontSize: "60px",
        color: "#FFFFFF",
        margin: "0px"
    },
    description: {
        fontWeight: "900",
        fontSize: "40px",
        color: "#00CE4C"
    },
    button : {
        height: "80px",
        borderRadius: "10px",
        backgroundColor: "#F5E2B2",
        padding: "30px",
        fontSize: "25px",
        fontWeight: 900,
        color: theme.palette.text.primary,
        marginRight: "2vw",
        marginLeft: "5vw"
    }
});
