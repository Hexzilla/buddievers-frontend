import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  buttonMint: {
    padding: '6px 10px',
    background: theme.palette.background.mintBtnBack,
    borderRadius: '10px',
    color: theme.palette.text.mintBtnColor,
    fontWeight: '900',
    width : '180px',
    "&:hover" : {
      background : theme.palette.background.mintBtnBack,
    },
    "&:active" : {
      color : theme.palette.text.mintBtnColor,
      background : theme.palette.background.mintBtnBack,
    }
    /*
    [theme.breakpoints.down('sm')]: {
      background: 'none',
      position: 'absolute',
      right: 0,
    },
    */
  },
  buttonHome: {
    padding: '6px 10px',
    background: theme.palette.background.mintWhite,
    borderRadius: '10px',
    color: theme.palette.background.darkGreen,
    fontWeight: '900',
    width : '180px',
    "&:hover" : {
      background : theme.palette.background.mintWhite,
    },
    "&:active" : {
      color : theme.palette.background.darkGreen,
      background : theme.palette.background.mintWhite,
    }
    /*
    [theme.breakpoints.down('sm')]: {
      background: 'none',
      position: 'absolute',
      right: 0,
    },
    */
  },
});
