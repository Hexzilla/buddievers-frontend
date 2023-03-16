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
  }
});
