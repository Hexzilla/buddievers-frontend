import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container : {
        background: `url("./intro-background.png")`,
        width: "1668px",
        height: "919px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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
