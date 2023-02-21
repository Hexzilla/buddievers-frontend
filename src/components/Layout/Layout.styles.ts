import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  logo: {
    width: 140,
    height: 'auto',
    '& > img': {
      maxWidth: '100%',
      marginBottom: '-5px',
    },
    [theme.breakpoints.down('sm')]: {
      //marginLeft: '20px',
    },
  },
  logoAlt: {
    height: '35px',
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
    margin: '0 15px',
    textDecoration: 'none !important',
    flexShrink: 0
    
  },
  navItemDrawer: {
    display: 'block',
    margin: '20px',
    textDecoration: 'none !important',
    '> a': {
      textDecoration: 'none !important',
    },
  },
  inputContainer: {
    width: theme.spacing(32),
  },
  buttonContainer: {
    marginLeft: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
  },
  iconButton: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: '10px',
      top: '8px',
    },
  },
});
