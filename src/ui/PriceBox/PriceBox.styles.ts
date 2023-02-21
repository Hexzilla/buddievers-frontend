import styled from '@emotion/styled';
import { theme } from 'theme/Theme';

export const StyledPriceBox = styled('div')<{
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium';
  margin: boolean;
  color?: string;
}>`
  color: ${(p) =>
    p.color ? p.color : p.variant === 'primary' ? '#b90e0e' : '#156b00'};
  padding: 0;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  font-size: ${(p) => (p.size === 'medium' ? theme.spacing(2) : '16px')};
  margin-right: ${(p) => (p.margin ? theme.spacing(1) : 0)};
  margin-top: 6px;
  margin-bottom: 4px;
  display: block;
  align-items: center;
  height: auto;
`;
