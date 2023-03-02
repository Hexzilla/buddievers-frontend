import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container : {
        background: `url("./intro-background.png") no-repeat center`,
        width: "100%",
        height: "719px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "100px"
    },
    button : {
        height: "98px",
        borderRadius: "10px",
        backgroundColor: "#F5E2B2",
        padding: "30px",
        fontSize: "25px",
        fontWeight: 900,
        color: theme.palette.text.primary
    }
});
