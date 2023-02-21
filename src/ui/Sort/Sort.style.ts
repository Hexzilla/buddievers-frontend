import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  sortElement: {
    background: '#000 !important',
    color: '#fff !important',
    border: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[900],
    maxHeight: 'auto',
  },
});
