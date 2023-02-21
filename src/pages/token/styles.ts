import { Theme } from '@mui/material';
import { fontWeight } from 'theme/typography';

export const styles = (theme: Theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(8),
    marginBottom: theme.spacing(5),
  },
  imageContainer: {
    maxWidth: '60%',
    maxHeight: '80%',
    marginBottom: '20px',
    padding: 0,
    [theme.breakpoints.down('md')]: {
      maxWidth: 'unset',
    },
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 0,
    objectFit: 'contain',
    background: '#111',
    backgroundSize: 'cover',
  },
  name: {
    marginBottom: theme.spacing(1),
    fontWeight: fontWeight.bolder,
    lineHeight: 1,
    letterSpacing: '-.02em',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  card: {
    background: 'none',
    borderRadius: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: theme.spacing(4),
  },
  avatarContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    height: theme.spacing(6),
    width: theme.spacing(6),
  },
  tabsContainer: {
    width: '100%',
  },
  tabs: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bidContainer: {
    width: `calc(100% - ${theme.spacing(6)}px)`,
    marginLeft: theme.spacing(1),
  },
  bidder: {
    width: '40%',
    marginLeft: theme.spacing(0.25),
  },
  bidText: {
    fontSize: 24,
    fontWeight: fontWeight.bold,
    marginRight: theme.spacing(1),
    marginTop: -theme.spacing(1),
  },
  bidCurrency: {
    fontSize: 24,
    fontWeight: fontWeight.bold,
    color: theme.palette.text.secondary,
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  artist: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  externals: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: theme.spacing(4),
    flexDirection: 'column',
    gap: 16,
  },
  subHeader: {
    fontSize: 22,
    color: theme.palette.common.white,
    marginBottom: '1rem',
  },
  subItemTitleCell: {
    minWidth: 170,
  },
  assetActionsBidTokenAmount: {
    color: 'white',
    fontWeight: 600,
  },
  assetActionsBidCurrency: {
    marginLeft: '0.4rem',
    color: theme.palette.grey[600],
  },
  smallText: {
    fontSize: '14px',
  },
  transferButton: {
    '&:hover': {
      backgroundColor: '#dcdcdc',
      color: 'black',
    },
  },
  newSellButton: {
    '&:hover': {
      backgroundColor: '#dcdcdc',
      color: 'black',
    },
  },
  tradeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  tradeRow: {
    display: 'flex',
    alignItems: 'center',
  },
  traitChip: {
    fontSize: '12px',
    color: '#c5c5c5',
    background: 'transparent',
    border: '2px solid #111',
    margin: '0 5px 5px 0',
  },
  rarityChip: {
    fontSize: '14px',
    color: '#c5c5c5',
    background: 'transparent',
    border: '2px solid #111',
    margin: '0 5px 5px 0',
  },
});
