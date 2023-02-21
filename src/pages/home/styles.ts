import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  homeContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: `${theme.spacing(5)}px 0`,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  iconBlock: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    margin: `${theme.spacing(16)}px 0`,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    height: 'auto',
    width: '55%',
    fill: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
  },
  betaTitle: {
    color: theme.palette.text.disabled,

    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
    },
  },
  betaText: {
    fontSize: '0.825rem',
    color: theme.palette.text.disabled,
    margin: `${theme.spacing(2)}px ${theme.spacing(32)}px`,

    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  pageContent: {
    margin: '80px 0',

    '& a': {
      textDecoration: 'none !important',
    },
  },
  exploreButton: {
    height: '50px',
  },
});
