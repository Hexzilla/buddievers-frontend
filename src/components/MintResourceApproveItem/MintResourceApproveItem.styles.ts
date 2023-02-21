import { Theme } from '@mui/material';
import { fontWeight } from 'theme/typography';

export const styles = (theme: Theme) => ({
  approveItemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  transferButton: {
    '&:hover': {
      backgroundColor: '#dcdcdc',
      color: 'black',
    },
  },
});
