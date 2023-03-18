import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  footerWrapper: {
    background: "#000",
    color: "#FFFFFF",
    paddingLeft: '10vw',
    paddingRight: '10vw',
    paddingTop: "1vw",
    paddingBottom: "1vw",
    position: "relative",
    "@media (max-width : 980px)" : {
      // paddingLeft: '2.5vw',
      // paddingRight: '2.5vw',
    }
   },
  title:{
    fontWeight: "900",
    fontSize: "22px"
  },
  text: {
    fontWeight: "900",
    fontSize: "15px",
    color: "rgba(255, 255, 255, 0.8)",
    '&:hover': {
      color: '#00CE4C',
    },
    '&:active': {
      color: '#01472A',
    },
  },
  hypers : {
    textDecoration : "none",
    color : "white"
  },
  footerInput : {
    width : "100%",
    height : "60px",
    background : "white",
    borderRadius : "10px",
    paddingLeft : "20px",
    border : "none",
    fontSize : "20px",
    "&::placeholder" : {
      fontStyle : "italic",
      color : "grey",
      fontSize : "20px"
    }
  },
  footerButton : {
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width : "100%",
    color : "white",
    background : "rgb(0, 206, 76)",
    borderRadius : "20px",
    height : "70px",
    border : "none",
    fontSize : "20px",
    fontWeight : "700",
    cursor : "pointer",
    "&:hover" : {
      background : "rgba(0, 71, 42, 0.6)",
    },
    "&:active" : {
        color : "white",
        background : "#01472A",
    }
  }
});
