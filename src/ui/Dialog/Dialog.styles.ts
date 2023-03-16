import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  dialogContainer: {
    backdropFilter: 'blur(5px)',
  },
  dialogContent: {
    background: '#01472A',
    color: "#FFFFFF",
    width: '450px',
    padding: '20px',
  },
  paperStyles: {
    background: '#111',
    borderRadius: 0,
  },
  dialogTitle: {
    background: '#01472A',
    color: "#FFFFFF",
    fontSize: '16px',
    fontWeight: '500',
    fontSytle: 'normal',
    fontFamily: 'Poppins',
    inlineHeight: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentWrapper: {
    background: '#0a0a0a',
  },
  closeButton: {
    color: '#FFFFFF',
    fontSize: 32,
    width: '10px',
    height: '10px',
  },
});
