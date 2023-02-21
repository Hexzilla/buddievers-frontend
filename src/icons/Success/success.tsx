import { SvgIconProps, useTheme } from '@mui/material';

export const SuccessIcon = (props: SvgIconProps) => {
  const theme = useTheme();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...props}>
      <circle cx={25} cy={25} r={25} fill={theme.palette.primary.main} />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        d="M38 15L22 33l-10-8"
      />
    </svg>
  );
};
