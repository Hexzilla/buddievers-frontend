import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container: {
        width: "100%",
        textAlign: "center"
    },
    title: {
        fontWeight: "900",
        fontSize: "60px",
        margin: "0px"
    },
    description: {
        fontWeight: "900",
        fontSize: "30px",
    },
    collection: {
        background:"#F5E2B2",
        fontWeight: "900",
        fontSize: "25px",
        color: "#166D43",
        "@media (max-width : 1192px)" : {
            display : "block",
        }
    },
    hypers : {
        textDecoration : "none",
        color : "#166D43"
    }
});
