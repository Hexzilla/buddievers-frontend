import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  placeholder: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '40%',
    height: 'auto',
    animation: '$rotation 1s infinite linear',
  },
  '@keyframes rotation': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
});
