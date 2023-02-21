import { Theme } from '@mui/material';
import { fontWeight } from 'theme/typography';

export const styles = (theme: Theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '60%',
    maxHeight: '80%',
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      maxWidth: 'unset',
      padding: theme.spacing(1),
    },
  },
  image: {
    width: '70%',
    height: 'auto',
    borderRadius: theme.spacing(2),
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
    borderRadius: theme.spacing(3),
    padding: theme.spacing(3),
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
    marginTop: theme.spacing(4),
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
    marginBottom: theme.spacing(5),
  },
  externals: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: theme.spacing(4),
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: theme.spacing(4),
    flexDirection: 'column',
    gap: 8,
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
  transferButton: {
    borderColor: '#079AA2',
    '&:hover': {
      backgroundColor: '#079AA2',
    },
  },
  newSellButton: {
    '&:hover': {
      backgroundColor: theme.palette.text.secondary,
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
  copyAddressButton: {
    marginTop: 0,
  },
});
