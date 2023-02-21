import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  StyledEngineProvider,
  createTheme,
  ThemeOptions,
} from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { useThemeOptions } from 'hooks';
import { typography } from './typography';
import { lightPalette, palette } from './palette';
import { PaletteOptions } from '@mui/material/styles/createPalette';

const defaultTheme = createTheme();

const getDefaultOptions = (colors: PaletteOptions): ThemeOptions => ({
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1440,
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: { 
          "&.Mui-selected": { backgroundColor: "rgb(210, 2, 62) !important" },
          "&.Mui-selected:hover": { backgroundColor: "rgb(210, 2, 62)" },
          "backgroundColor": "#000",
          "&:hover": {
            background: "#602",
          },
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          width: '0.5em',
          cursor: 'pointer',
        },
        '*::-webkit-scrollbar-track': {
          '*WebkitBoxShadow': 'inset 0 0 6px rgba(0, 0, 0, 0)',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(210, 2, 62, 1)',
          outline: '0',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 36,
          [defaultTheme.breakpoints.down('lg')]: {
            fontSize: 24,
          },
        },
        h2: {
          fontSize: 24,
          [defaultTheme.breakpoints.down('lg')]: {
            fontSize: 14,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          height: defaultTheme.spacing(5),
          fontSize: defaultTheme.typography.fontSize,
        },
        outlinedPrimary: {
          color: colors.text?.primary || 'white',
          borderColor: colors.text?.disabled || 'white',
          '&:hover': {
            backgroundColor: '#111',
            color: 'white',
            borderColor: 'inherit',
          },
        },
        contained: {
          '&.Mui-disabled': {
            backgroundColor: `${defaultTheme.palette.grey[900]}  !important`,
            color: defaultTheme.palette.grey[800] + ' !important',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        regular: {
          [defaultTheme.breakpoints.up('sm')]: {
            minHeight: defaultTheme.spacing(10),
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          height: defaultTheme.spacing(5),
          width: '380px',
          maxWidth: '100%',
          [defaultTheme.breakpoints.down('sm')]: {
            width: '100%',
          },
        },
        notchedOutline: {
          borderColor: colors.text?.disabled || 'white',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.background?.default,
          borderRadius: defaultTheme.spacing(2),
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000',
          padding: '20px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: 'white',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#111',
          border: '0 !important',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #000',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: '0 !important',
        },
        head: {
          lineHeight: 1,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '& a': {
            textDecoration: 'none',
          },
          '& a:hover': {
            textDecoration: 'underline',
            color: '#d2023e',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          maxWidth: '100%',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        positionStart: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px 0 0 8px',
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          justifyContent: 'center',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          margin: '0 auto',
        },
      },
    },
  },
});

const themeOptions: ThemeOptions = {
  palette,
  ...getDefaultOptions(palette),
};

export const theme = createTheme(themeOptions);

const lightTheme = createTheme({
  palette: lightPalette,
  ...getDefaultOptions(lightPalette),
});

const Theme = ({ children }: { children: ReactNode }) => {
  const { isDarkTheme } = useThemeOptions();
  const handleTheme = () => (isDarkTheme ? theme : lightTheme);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={handleTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Theme;
