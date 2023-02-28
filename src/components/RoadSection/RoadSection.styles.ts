import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container: {
        width: "100%",
        textAlign: "center",
        background: "#FFFFFF"
    },
    stepContainer : {
        textAlign: "center",
        backgroundSize: "cover",
        backgroundRepeat: "round",
        backgroundImage: `url("./roadBackground.png")`
    },
    title: {
        fontWeight: "900",
        fontSize: "75px",
        color: "#00CE4C"
    }
});
