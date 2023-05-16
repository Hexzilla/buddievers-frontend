import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  dialogContainer: {
    justfyItems: 'center',
    algnItems: 'center',
    display: 'flex',
    padding: '0 32px 32px 32px',
    flexDirection: 'column',
  },
  button: {
    marginTop: '8px',
  },
  titleSlot: {
    display: 'block',
    marginLeft: '40px',
    marginBottom: '10px',
    color: "#FFFFFF",
    fontSize: '26px',
    fontWeight: '900',
    fontSytle: 'normal',
    fontFamily: 'Poppins',
    inlineHeight: '36px',
  },
  row: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '14px',
    fontWeight: '500',
    fontSytle: 'normal',
    fontFamily: 'Poppins',
    inlineHeight: '24px',
    align: 'center',
  },
  otherCard : {
    borderRadius: '10px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    background: "#F5E2B3",
    color: "#01472A",
    fontSize: '14px',
    fontWeight: '700',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    textAlign: 'center',
    width: '220px',
    margin: '35px',
    "&:hover": {
      color: 'white',
    },
    "row:hover" : {
      backgorund : '#FFFFFF'
    }
  },
  fontSize12: {
    fontSize: '12px'
  },
  lowerSection: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '1.5rem',
    flexGrow: 1,
    overflow: 'auto',
    background: '#1d1d1d',
    fontSize: '11px',

    '& > p': {
      fontSize: '12px',
    },
  },
  walletName: {
    width: 'initial',
    fontSize: '0.825rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  iconWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 8px 0px 0',
    '& > img': {},
    span: {
      height: '16px',
      width: '16px',
    },
  },
  flexCoumnNoWrap: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  linkStyledButton: {
    border: 'none',
    textDecoration: 'none',
    background: 'none',
    cursor: 'pointer',
    color: theme.palette.text.button,
    fontWeight: 500,
    ':hover': {
      textDecoration: 'underline',
    },
    ':focus': {
      outline: 'none',
      textDecoration: 'underline',
    },
    ':active': {
      textDecoration: 'none',
    },
  },
  autoRow: {
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  walletOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  walletOption: {
    background: '#fff',
  },
  walletPendingText: {
    textAlign: 'center',
    marginTop: '8px',
    fontSize: '12px',
  },
});
