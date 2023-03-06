import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    leftContainer: {
        background: "#FFF",
        textAlign: "center",
        padding: "4vh",
    },
    aboutText: {
        fontSize: "75px",
        fontWeight: "900",
        fontFamily: "Poppins",
        color: "#00CE4C"
    },
    greenBox: {
        background: "#00CE4B",
        margin: "10px",
        width: "150px",
        height: "150px",
        display: "grid",
        "@media (max-width : 1192px)" : {
            width : "100%",
        }
    },
    aboutTextWrapper : {
        width : '60%',
        margin : "auto",
        "@media (max-width : 1910px)" : {
            width : '80%'
        }
    },
    whiteTextTiny: {
        fontSize: "17px",
        fontWeight: "900",
        color: "#FFFFFF",
        margin: "0px"
    },
    whiteTextSmall: {
        fontSize: "24px",
        fontWeight: "900",
        color: "#FFFFFF",
        margin: "0px"
    },
    whiteTextLarge: {
        fontSize: "40px",
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
        fontSize: "17px"
    }
});
