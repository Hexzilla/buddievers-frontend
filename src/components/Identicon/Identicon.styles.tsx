import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  identiconContainer: {
    height: 'auto',
    width: '100%',
    borderRadius: '1.125rem',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
