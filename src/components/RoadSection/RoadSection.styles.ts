import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container: {
        width: "80%",
        margin : "auto",
        textAlign: "center",
        background: "#FFFFFF",
        "@media (max-width : 1192px)" : {
            width : "100%"
        }
    },
    stepContainer : {
        textAlign: "center",
        backgroundSize: "cover",
        backgroundRepeat: "round",
        // backgroundImage: `url("./roadBackground.png")`
    },
    title: {
        fontWeight: "900",
        fontSize: "75px",
        color: "#00CE4C",
        "@media (max-width : 1192px)" : {
            fontSize : "60px",
        }
    }
});
