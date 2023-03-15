import { NavLink } from 'ui';
import WhiteLogoNormal from 'assets/images/logo.png';

export const Logo = () => (
  <NavLink href="/">
    <img src={WhiteLogoNormal} width="100" height="100" alt="" />
  </NavLink>
);
