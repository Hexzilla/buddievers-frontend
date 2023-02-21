import { Theme } from '@mui/material';

export const appStyles = (theme: Theme) => ({
  divider: {
    background: theme.palette.text.secondary,
    opacity: 0.5,
    marginTop: theme.spacing(2),
  },
  borderStyleDashed: {
    border: '1px dashed',
    backgroundColor: 'transparent',
    borderColor: theme.palette.grey[900],
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    alignItems: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  spaceOnLeft: {
    marginLeft: 80,
  },

  // Column
  col: {
    '[class*=formValue]': {
      minHeight: 30,
      color: 'fucsia',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  verticalDashedLine: {
    borderLeft: '1px dashed',
    borderColor: theme.palette.grey[900],
    marginLeft: '20px !important',
    paddingRight: '20px !important',
  },

  // Form
  formBox: {
    border: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[900],
    padding: 30,
  },
  formSubheader: {
    fontSize: 22,
    color: theme.palette.common.white,
    marginBottom: '1rem',
  },
  formButton: {
    marginTop: theme.spacing(2),
    margin: '0 auto',
    display: 'block',
    minWidth: 240,
  },
  formLabel: {
    color: theme.palette.grey[500],
  },
  formValue: {
    color: theme.palette.text.primary,
  },
  formValueTokenDetails: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
  },
  formValueGive: {
    color: theme.palette.error.main,
  },
  formValueGet: {
    color: theme.palette.primary.main,
  },
  formMaxButton: {
    color: '#FFFFFF',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0 8px 8px 0',
  },
  maxButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0 8px 8px 0',
  },
  fieldError: {
    color: theme.palette.error.main,
  },
  '.MuiOutlinedInput': {
    '.MuiOutlinedInput-root': {
      borderRadius: '8px 0 0 8px',
    },
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
  },
});
