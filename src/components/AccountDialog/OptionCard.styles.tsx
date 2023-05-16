import { Theme } from '@mui/material';
import { green } from '@mui/material/colors';

export const styles = (theme: Theme) => ({
  optionButton: {
    borderRadius: '10px',
    borderWidth: '1px',
    borderColor: theme.palette.secondary.contrastText,
    background: "#F5E2B3",
    marginRight:'50px',
    marginLeft: '50px',
    marginTop: '10px',
    padding: '10px 10px',
    "&:hover": {
      background: "#F5E2B3"
    },
  },

  optionElementContainer: {
    width: '210px',
    height: '41px',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '0',
    justifyContent: 'center',
    alignitems: 'center',
    gap: '20px',
    
  },
  headertext: {
    display: 'flex',
    flexFlow: 'row nowrap',
    color: "#01472A",
    fontSize: '14px',
    inlineHeight: '21px',
    fontWeight: '700',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    height: '21px',
    textAlign: 'center',
    alignItems: 'center',
    flex: 'none',
    flexGrow: '0',
    order: '0'
  },
  subheader: {
    color: theme.palette.text.button,
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
