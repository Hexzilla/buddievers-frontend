import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
    appBar: {
      backgroundColor: '#060040',
       height: '65px',
    },
    toolBar: {
      minHeight: '65px',
    },
   headerWrapper: {
    paddingTop: "1vw",
    paddingBottom: "1vw",
   },
   headerGrids : {
    display : "flex",
    flexDirection : "column",
    paddintBottom : "5px",
    alignSelf: "flex-end",
   },
   navLinkContainer1 : {
    justifyContent : "initial",
    paddingTop: "20px",
    paddingBottom: "20px",
    borderBottom : "1px solid white",
    borderTop : "1px solid white",
   },
   navLinkContainer2 : {
    justifyContent : "end",
    paddingTop: "20px",
    paddingBottom: "20px",
    borderBottom : "1px solid white",
    borderTop : "1px solid white",
   },
   socialImages : {
    width : "30px"
   },
  logo: {
    // width: 140,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    '& > img': {
      maxWidth: '100%',
      marginBottom: '-5px',
    },
    [theme.breakpoints.down('sm')]: {
      //marginLeft: '20px',
    },
    "@media (max-width : 1910px)" : {
      // width : 80,
    }
  },
  socialTitle : {
    color : "#00CE4C",
    fontWeight : "bold",
    "@media (max-width : 1910px)" : {
      fontWeight : "initial",
    }
  },
  logoAlt: {
    height: '60px',
    width: 'auto',
    '& > img': {
      height: '100%',
      //marginBottom: '-5px',
    },
    [theme.breakpoints.down('sm')]: {
     // marginLeft: '20px',
    },
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navItem: {
    margin: '0 8%',
    textDecoration: 'none !important',
    flexShrink: 0,
    fontSize: "20px",
    color: "#FFF",
  },
  navItemMobile : {
    marginTop : "-20px"
  },
  navItemDrawer: {
    display: 'block',
    margin: '20px',
    textDecoration: 'none !important',
    '> a': {
      textDecoration: 'none !important',
    },
    fontSize: "20px",
    color: "#FFF"
  },
  inputContainer: {
    width: theme.spacing(32),
  },
  buttonContainer: {
    marginLeft: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
  iconButton: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: '10px',
      top: '8px',
    },
  },
  mintTitleLeft: {
    fontSize: "18px",
    color: "#FFF",
    lineHeight: "20px",
    margin: "10px",
  },
  mintTitleBold: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  mintTitleRightNetwork: {
    fontSize: "16px",
    color: "#FFF",
    alignSelf: "self-end",
  },
  mintTitleRightWallet: {
    fontSize: "16px",
    color: "#FFF",
    alignSelf: "center",
  },
});
