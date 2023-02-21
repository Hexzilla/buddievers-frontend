import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container : {
        background: `url("@/assets/images/intro-background.png")`
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
