export const fontWeight = {
  regular: 400,
  semiBold: 400,
  bold: 700,
  bolder: 700,
};

export const typography = {
  fontFamily: 'Space Mono, monospace',
  fontWeightRegular: fontWeight['regular'],
  fontWeightBold: fontWeight['bold'],
  fontWeightBolder: fontWeight['bolder'],
  h1: {
    fontSize: 64,
    fontWeight: fontWeight.bolder,
    lineHeight: 1,
    letterSpacing: '-.02em',
  },
  h2: {
    fontSize: 48,
    fontWeight: fontWeight.regular,
  },
  h3: {
    fontSize: 40,
    fontWeight: fontWeight.regular,
  },
  h4: {
    fontSize: 28,
    fontWeight: fontWeight.bold,
  },
  h5: {
    fontSize: 22,
    fontWeight: fontWeight.regular,
  },
  h6: {
    fontSize: 18,
    fontWeight: fontWeight.regular,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: fontWeight.regular,
  },
  subtitle2: {
    fontSize: 8,
    fontWeight: fontWeight.regular,
  },
};
