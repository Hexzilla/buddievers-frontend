import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    borderRadius: 0,
  },
  imageContainer: {
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 0,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 0,
    background: '#111',
    backgroundSize: 'cover',
  },
  nameContainer: {
    // marginTop: 20,
    display: 'flex',
    fontSize: 16,
    justifyContent: 'space-between',
  },
  stockContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    // marginTop: 12,
  },
  lastPriceContainer: {
    display: 'flex',
    justifyContent: 'normal',
    marginTop: 12,
  },
  bidContainer: {
    display: 'flex',
    marginTop: 12,
  },
  tokenName: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: 14,
  },
  mr: {
    marginRight: theme.spacing(1),
  },
  traitChip: {
    fontSize: '12px',
    color: '#c5c5c5',
    background: 'transparent',
    border: '2px solid #111',
    margin: '0 5px 5px 0',
  },
});
