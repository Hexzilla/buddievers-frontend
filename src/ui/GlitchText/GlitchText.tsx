import { TypographyProps } from '@mui/material';
import { ReactNode } from 'react';
import { StyledGlitch } from './GlitchText.styles';

export const GlitchText = ({
  children,
  ...props
}: {
  children: ReactNode;
} & TypographyProps) => {
  return (
    <StyledGlitch {...props}>
      <span aria-hidden="true">{children}</span>
      {children}
      <span aria-hidden="true">{children}</span>
    </StyledGlitch>
  );
};
