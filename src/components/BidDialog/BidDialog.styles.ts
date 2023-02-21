import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  dialogContainer: {
    display: 'flex',
    padding: theme.spacing(4),
    flexDirection: 'column',
    // minWidth: 500,
  },
  nakedInput: {
    border: 0,
    background: 'transparent',
    padding: 0,
    margin: 0,
    fontFamily: theme.typography.fontFamily,
    color: 'white',
    textAlign: 'right',
    outline: 'none',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  successIcon: {
    width: '30%',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  flexStart: {
    alignSelf: 'flex-start',
  },
  columGap : {
    flex: '1 0 15px'
  },
  mr15: {
    paddingRight: '15px'
  },
  placeButtonTopSpace: {
    marginTop: '20px'
  },
  imageContainer: {
    width: '40%',
    textAlign: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 0,
    justifyContent: 'center',
  },
  detailContainer: {
    width: '50%',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 0,
    background: '#111',
    backgroundSize: 'cover',
  },
});
