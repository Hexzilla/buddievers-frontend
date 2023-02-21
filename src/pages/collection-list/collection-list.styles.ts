import { Theme } from '@mui/material';

export const collectionListStyles = (theme: Theme) => ({
  card: {
    borderRadius: 0,
  },
  mediaContainer: {
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    minHeight: 300,
    display: 'flex',
    maxHeight: 300,
    maxWidth: 330,
    alignItems: 'center',
    borderRadius: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    '& > img': {
      background: '#111',
      backgroundSize: 'cover',
      height: '100%',
      width: '100%',
    },
  },
  media: {},
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  collectionName: {
    color: theme.palette.text.primary,
  },
  collectionSymbol: {
    color: theme.palette.text.secondary,
  },
  collectionType: {
    color: theme.palette.text.primary,
  },
  collectionDescription: {
    fontSize: '12px',
  },
  placeholderContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    margin: '20 0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 12,
    textAlign: 'center',
  },
});
