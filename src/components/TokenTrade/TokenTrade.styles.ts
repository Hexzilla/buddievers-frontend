import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
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
    display: 'flex',
    fontSize: 16,
    justifyContent: 'space-between',
  },
  stockContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  lastPriceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bidContainer: {
    display: 'flex',
  },
  tokenName: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: 14,
  },
  smallText: {
    fontSize: '12px',
    marginTop: theme.spacing(0.5),
  },
  mr: {
    fontSize: '12px',
    lineHeight: 2,
    marginRight: theme.spacing(1),
  },
});
