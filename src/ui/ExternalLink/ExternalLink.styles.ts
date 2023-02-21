import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  link: {
    color: `${theme.palette.text.secondary}`,
    fontSize: `13px`,
    transition: `color 0.2s`,
    fontWeight: 600,
    '&:hover': {
      color: `${theme.palette.text.primary}`
    }
  }
})