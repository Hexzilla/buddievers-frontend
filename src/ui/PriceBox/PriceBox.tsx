import { ReactNode } from 'react';
import { StyledPriceBox } from './PriceBox.styles';

export const PriceBox = ({
  children,
  variant = 'primary',
  size = 'medium',
  margin = true,
  color,
  ...props
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  margin?: boolean;
  color?: string;
}) => {
  return (
    <StyledPriceBox
      variant={variant}
      size={size}
      margin={margin}
      color={color}
      {...props}
    >
      {children}
    </StyledPriceBox>
  );
};
