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
const v2_darkGreen = '#166D43';
const font_green = '#01472A';
const v2_white = white;
const v2_grey = '#C5C5C5';
const V2_grey_disabled = '#505050';
const v2_text = v2_secondary;
const v2_lightBlack = '#111';
const danger = '#d63535';


const mint_black = '#000000';
const mint_white = '#FFFFFF';
const mint_green = '#00CE4C';
const mint_dark_green = '#01472A';
const mint_blue = '#0078BB';
const mint_dark_blue = '#060040';

const mint_primary = mint_blue;       //mint_green
const mint_secondary = mint_dark_blue;//mint_dark_green
const mint_btn_back = mint_blue;      //mint_white
const mint_btn_color = mint_white;    //mint_green

declare module '@mui/material/styles/createPalette' {
  export interface TypeBackground {
    default: string;
    darkGreen: string;
    paper: string;
    mintWhite: string;
    mintBlack: string;
    mintDarkBlue: string;
    mintPrimary: string;
    mintSecondary: string;
    mintBtnBack: string
  }

  export interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
    mintWhite: string;
    mintBlack: string;
    mintPrimary: string;
    mintSecondary: string;
    mintBtnColor: string;
  }
}

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
    default: v2_white,
    darkGreen : v2_darkGreen,
    paper: 'transparent',
    mintWhite: mint_white,
    mintBlack: mint_black,
    mintDarkBlue: mint_dark_blue,
    mintPrimary: mint_primary,
    mintSecondary: mint_secondary,
    mintBtnBack: mint_btn_back,
  },
  text: {
    primary: font_green,
    secondary: v2_text,
    disabled: V2_grey_disabled,
    mintWhite: mint_white,
    mintBlack: mint_black,
    mintPrimary: mint_primary,
    mintSecondary: mint_secondary,
    mintBtnColor: mint_btn_color,
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
