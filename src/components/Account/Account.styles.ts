import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  button: {
    padding: '6px 10px',
    background: '#F5E2B2',
    borderRadius: '10px',
    color: '#01472A',
    fontWeight: '900',
    width : '180px',
    "&:hover" : {
      background : "#00CE4C"
    },
    "&:active" : {
      color : "white",
      background : "#01472A",
    }
    /*
    [theme.breakpoints.down('sm')]: {
      background: 'none',
      position: 'absolute',
      right: 0,
    },
    */
  },
});
