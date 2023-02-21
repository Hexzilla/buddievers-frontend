import { Theme } from '@mui/material';
import { green } from '@mui/material/colors';

export const styles = (theme: Theme) => ({
  optionElementContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '0',
    borderRadius: '10px',
    borderWidth: '1px',
    borderColor: theme.palette.secondary.contrastText,
  },
  headertext: {
    display: 'flex',
    flexFlow: 'row nowrap',
    color: theme.palette.text.primary,
    fontSize: '1rem',
    fontWeight: 500,
  },
  subheader: {
    color: theme.palette.text.primary,
    marginTop: '10px',
    fontSize: '12px',
  },
  iconWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    span: {
      height: '24px',
      width: '24px',
    },
  },
  icon: {
    marginLeft: '10px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: '24px',
    width: '24px',
  },
  optionCardLeft: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    height: '100%',
  },
  circleWrapper: {
    color: green[900],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenCircle: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    '&:first-child': {
      height: '8px',
      width: '8px',
      marginRight: '8px',
      backgroundColor: green[900],
      borderRadius: '50%',
    },
  },
});
