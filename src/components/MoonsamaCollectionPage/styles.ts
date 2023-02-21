import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  placeholderContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    margin: '20 0',
  },
  paginationContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '50px 0 0 0'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 12,
    textAlign: 'center',
  },
  collectionStats: {
    width: '700px',
    maxWidth: '100%',
    margin: '0 auto 55px auto',
    border: '2px solid #111',
    borderRight: 0,
  },
  statItem: {
    fontSize: '22px',
    padding: '16px 0',
    borderRight: '2px solid #111',

    '& span': {
      color: '#808080',
      display: 'block',
      fontSize: '12px',
      textTransform: 'lowercase',
    },
  },
  select: {
    width: '200px',
    padding: '0',
    textAlign: 'left',

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#505050 !important',
      borderRadius: 0,
    },
    '& .MuiSvgIcon-root': {
      color: '#505050',
    },
  },
  selectLabel: {
    fontFamily: 'Space Mono, monospace !important',
    color: '#c5c5c5 !important',
  },
  dropDown: {
    backgroundColor: '#111 !important',
    color: '#fff !important',
  },
});
