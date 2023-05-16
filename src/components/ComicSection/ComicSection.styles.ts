import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "2vw 8vh",
        backgroundColor : "#016B43"
    },
    title: {
        color : "white",
        fontWeight: "900",
        fontSize: "60px",
        margin: "0px",
        marginTop : "50px"
    },
    description: {
        fontWeight: "900",
        fontSize: "40px",
        color: "#00CE4C",
        margin : 0
    },
    button : {
        height: "80px",
        borderRadius: "10px",
        backgroundColor: "#F5E2B2",
        fontSize: "25px",
        fontWeight: 900,
        color: theme.palette.text.button,
        "&:hover" : {
        background : "#00CE4C"
        },
        "&:active" : {
        color : "white",
        background : "#01472A",
        }
    },
    comicImage : {
        "@media (max-width : 1192px)" : {
            display : "none",
        }
    },
    comicCarousel : {
        "& .react-multi-carousel-dot-list .react-multi-carousel-dot button" : {
            border : "none",
            background : "rgba(0, 255, 0, 0.3)"
        },
        "& .react-multi-carousel-dot-list .react-multi-carousel-dot--active button" : {
            background : "rgba(0, 255, 0, 1)"
        }
    }
});
