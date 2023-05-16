import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  buttonMint: {
    padding: '6px 10px',
    background: '#0078BB',
    borderRadius: '10px',
    color: 'white',
    fontWeight: '900',
    width : '180px',
    "&:hover" : {
      background : '#0078BB',
    },
    "&:active" : {
      color : 'white',
      background : '#0078BB',
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
    background: 'white',
    borderRadius: '10px',
    color: theme.palette.background.darkGreen,
    fontWeight: '900',
    width : '180px',
    "&:hover" : {
      background : 'white',
    },
    "&:active" : {
      color : theme.palette.background.darkGreen,
      background : 'white',
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
