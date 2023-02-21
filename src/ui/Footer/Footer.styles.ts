import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  footerWrapper: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    margin: `${theme.spacing(8)}px 0 ${theme.spacing(4)}px 0`,
    paddingTop: theme.spacing(8)
  },
  iconsWrapper: {
    margin: `${theme.spacing(2)}px 0`,
  },
  icon: {
    height: 'auto',
    width: '30px',
    margin: '0 16px',
    fill: theme.palette.secondary.main,
    transition: 'all 0.2s ease-in-out',

    '&:hover': {
      fill: theme.palette.primary.main,
    },
  },
  copyrightText: {
    fontSize: 12,
    marginTop: theme.spacing(4),
  },
});
