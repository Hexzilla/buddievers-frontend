import { NavLink } from 'ui';
import WhiteLogoPrimary from 'assets/images/logo.png';
import WhiteLogoSecondary from 'assets/images/logo-2.png';

export const Logo = () => (
  <NavLink href="/">
    <img src={WhiteLogoSecondary} style={{borderRadius: '50%'}} width="100" height="100" alt="" />
  </NavLink>
);
