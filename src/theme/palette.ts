import { PaletteOptions } from '@mui/material/styles/createPalette';

const primary = '#2DE2E6';
const secondary = '#FF3864';
const black = '#0D0221';
const white = '#fcfbfd';
const grey = '#2E2157';
const text = '#777E90';
const lightBlack = '#241734';

const v2_primary = '#d2023e';
const v2_secondary = '#C5C5C5';
const v2_black = '#000';
const v2_darkGreen = '#016B43';
const font_green = '#01472A';
const v2_white = white;
const v2_grey = '#C5C5C5';
const V2_grey_disabled = '#505050';
const v2_text = v2_secondary;
const v2_lightBlack = '#111';
const danger = '#d63535';

export const palette: PaletteOptions = {
  error: {
    main: danger,
  },
  primary: {
    main: v2_primary,
  },
  secondary: {
    main: v2_secondary,
  },
  background: {
    default: v2_darkGreen,
    paper: 'transparent',
  },
  text: {
    primary: font_green,
    secondary: v2_text,
    disabled: V2_grey_disabled,
  },
  common: {
    white: v2_white,
  },
  grey: {
    '500': v2_secondary,
    '900': '#3E3E3E',
  },
};

export const lightPalette: PaletteOptions = {
  ...palette,
  background: {
    default: white,
  },
  text: {
    primary: black,
    secondary: text,
    disabled: grey,
  },
};
