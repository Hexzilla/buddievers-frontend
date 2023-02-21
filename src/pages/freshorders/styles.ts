import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  pageContainer: {
    marginBottom: theme.spacing(5),
  },
  placeholderContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    margin: '20 0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 12,
    textAlign: 'center',
  },
  tabsContainer: {
    marginTop: theme.spacing(4),
    width: '100%',
  },
  tabs: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
  filterControls: {},
  accordionHeader: {
    fontFamily: 'Space Mono, monospace !important',
  },
  accordionContent: {
    maxHeight: '250px',
    overflowY: 'auto',
  },
  filterChip: {
    border: '1px solid #c5c5c5 !important',
    color: '#c5c5c5 !important',
    margin: '0 8px 8px 0',
    fontSize: '12px !important',

    '&.selected': {
      background: '#710021 !important',
      borderColor: '#710021 !important',
    },
  },
});
