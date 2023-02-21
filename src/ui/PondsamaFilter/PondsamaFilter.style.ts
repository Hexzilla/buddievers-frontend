export const styles = () => ({
  filtersTitle: {
    fontFamily: 'Space Mono, monospace !important',
  },
  filtersDrawerContent: {
    width: '300px',
    height: '100%',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'stretch',
  },
  applyFiltersButton: {
    width: '100%',
    margin: '25px 0 0',
  },
  filterAccordion: {
    fontFamily: 'Space Mono, monospace !important',
    backgroundColor: '#111 !important',
    color: '#fff !important',
    maxHeight: '40%',

    '& svg': {
      color: '#fff',
    },
  },
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
  priceRangeWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
  },
  priceInput: {
    width: '40% !important',

    '& .MuiOutlinedInput-root': {
      width: '100% !important',
    },
  },
});
