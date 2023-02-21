import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    leftContainer: {
        background: "#FFF",
        textAlign: "center",
        padding: "4vh",
    },
    aboutText: {
        fontSize: "96px",
        fontWeight: "900",
        color: "#00CE4C"
    },
    greenBox: {
        background: "#00CE4B",
        margin: "10px",
        width: "200px",
        height: "200px",
        display: "grid"
    },
    whiteTextTiny: {
        fontSize: "20px",
        fontWeight: "900",
        color: "#FFFFFF",
        margin: "0px"
    },
    whiteTextSmall: {
        fontSize: "40px",
        fontWeight: "900",
        color: "#FFFFFF",
        margin: "0px"
    },
    whiteTextLarge: {
        fontSize: "64px",
        fontWeight: "900",
        color: "#FFFFFF",
        margin: "0px"
    },
    subTitleText: {
        fontWeight: "900",
        fontSize: "40px"
    },
    mainText: {
        fontWeight: "700",
        fontSize: "24px"
    }
});
