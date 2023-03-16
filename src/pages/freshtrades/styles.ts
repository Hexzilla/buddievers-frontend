import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  container: {
    position: 'relative',
    backgroundColor: 'black',
  },
  video: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    zIndex: 0,
  },
});
