import { Theme } from '@mui/material';
import { fontWeight } from 'theme/typography';

export const styles = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    padding: theme.spacing(0.1),
    borderRadius: 0
  },
  lootboxResultContainer: {
    width: '70%',
    display: 'flex',
    alignItems: 'stretch',
    margin: 'auto',
  },
  lootCardContainer: {
    flex: '1 1',
    height: '100%',
    transition: 'opacity 0.2s ease-in, transform 0.2s ease-in',
    opacity: '0',
    transform: 'scale(0.9)',
    padding: '1rem',
    boxSizing: 'border-box',
  },
  commonLoot: {
    backgroundColor: "#222222EE",
    boxShadow: '#AAAAAA 0 0 1rem',
  },

  uncommonLoot: {
    backgroundColor: "#1b331bEE",
    boxShadow: '#55FF55 0 0 1rem',
  },

  rareLoot: {
    backgroundColor: "#0b3652EE",
    boxShadow: '#22AAFF 0 0 1rem',
  },

  epicLoot: {
    backgroundColor: "#23182eEE",
    boxShadow: '#AA55FF 0 0 1rem 0.125rem',
  },

  legendaryLoot: {
    backgroundColor: "#2e1906EE",
    boxShadow: '#FFAA55 0 0 1rem 0.25rem',
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
  dialogContainer: {
    display: 'flex',
    padding: theme.spacing(4),
    flexDirection: 'column',
    minWidth: 500,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 0,
    background: '#111',
    backgroundSize: 'cover',
  },
  detailContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  detailContainerNoMT: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    flexDirection: 'column',
    gap: 16,
  },
  name: {
    marginTop: theme.spacing(5),
    fontWeight: fontWeight.bolder,
    lineHeight: 1,
    letterSpacing: '-.02em',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  newSellButton: {
    '&:hover': {
      backgroundColor: '#dcdcdc',
      color: 'black',
    },
  },
  transferButton: {
    '&:hover': {
      backgroundColor: '#dcdcdc',
      color: 'black',
    },
  },
  boldText: {
    fontWeight: fontWeight.bolder
  },
  lootboxOpenButton: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  amountTextInput: {
    color: '#dcdcdc',
    '& label.Mui-focused': {
      color: '#dcdcdc',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#dcdcdc',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#dcdcdc',
      },
      '&:hover fieldset': {
        borderColor: '#dcdcdc',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#dcdcdc',
      },
    },
  }
});
