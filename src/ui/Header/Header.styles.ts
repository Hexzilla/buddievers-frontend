import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
  },
  marquee: {
    fontSize: '14px',
    width: '100%',
    color: 'white',
    background: '#d2023e',
  },
  marqueeLink: {
    paddingLeft: '4px',
    paddingRight: '4px',
    color: '#3dd202',
  },
  marqueeClose: {
    position: 'absolute',
    right: '0px',
    top: '0px',
    color: 'black',
    zIndex: 100,
    height: '20px',
    backgroundColor: '#d2023e',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});
