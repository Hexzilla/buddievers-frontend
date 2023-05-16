import { ReactNode } from 'react';
import { StyledNav } from './NavLink.styles';

export const NavLink = ({
  href,
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <StyledNav
      to={href}
      className={className}
    >
      {children}
    </StyledNav>
  );
};
