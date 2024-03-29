import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { theme } from 'theme/Theme';

export const StyledNav = styled(NavLink)`
  color: ${theme.palette.text.secondary};
  font-size: 13px;
  transition: color 0.2s;
  font-weight: 900;
  text-transform: uppercase;
  &:hover {
    color: ${theme.palette.text.button};
  }
`;
