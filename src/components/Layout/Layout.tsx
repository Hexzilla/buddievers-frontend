import MenuIcon from '@mui/icons-material/Menu';
import { Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import WhiteLogoNormal from 'assets/images/logo.png';
import WhiteLogoAlt from 'assets/images/logo.png';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Account } from 'components';
import { ConnectedNetwork } from 'components/ConnectedNetwork/ConnectedNetwork';
import { useClasses } from 'hooks';
import { useState } from 'react';
import { Drawer, Footer, Header, NavLink, ExternalLink } from 'ui';
import { MAX_WIDTH_TO_SHOW_NAVIGATION } from '../../constants';
import { styles } from './Layout.styles';
import { LayoutProps } from './Layout.types';

export const Layout = ({ children }: LayoutProps) => {
  const { headerWrapper, logo, logoAlt, nav, navItem, buttonContainer, navItemDrawer } =
    useClasses(styles);

  const showRegularMenu = useMediaQuery(
    `(max-width: ${MAX_WIDTH_TO_SHOW_NAVIGATION}px)`
  );
  const isXs = useMediaQuery(
    `(max-width: 400px)`
  );
  console.log('xs', isXs)

  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

  return (
    <>
      <Header>
        <Container className={headerWrapper} maxWidth={false}>
          <Stack direction='row' alignItems="center" justifyContent="space-between">
            <Grid item xl={2} className={nav}>
              {showRegularMenu && (
                <IconButton onClick={() => setIsDrawerOpened(true)}>
                  <MenuIcon />
                </IconButton>
              )}
              <NavLink href="/" className={navItem}>
                {!isXs && <div className={logo}>
                  <img src={WhiteLogoNormal} alt="" />
                </div>}
                {isXs && <div className={logoAlt}>
                  <img src={WhiteLogoAlt} alt="" />
                </div>}
              </NavLink>
            </Grid>
            <Stack direction='row' justifyContent='center' className={buttonContainer}>
              {!showRegularMenu ? (
                <Stack
                  direction={'row'}
                  onClick={() => setIsDrawerOpened(false)}
                >
                  {/*<NavLink href="/auctions" className={navItem}>
                    Auctions
                  </NavLink>*/}
                  <NavLink href="/" className={navItem}>
                    HOME
                  </NavLink>
                  <NavLink href="/mint" className={navItem}>
                    MINT NFT
                  </NavLink>
                  <NavLink href="/workbench" className={navItem}>
                    BUDDIEVERSE
                  </NavLink>
                  <NavLink href="/freshoffers" className={navItem}>
                    MARKETPLACE
                  </NavLink>
                </Stack>
              ) : (
                <Drawer
                  open={isDrawerOpened}
                  onClose={() => setIsDrawerOpened(false)}
                  onOpen={() => setIsDrawerOpened(true)}
                  onClick={() => setIsDrawerOpened(false)}
                >
                  <Box>
                    {/*<NavLink href="/auctions" className={navItemDrawer}>
                      Auctions
                    </NavLink>*/}
                    <NavLink href="/" className={navItemDrawer}>
                      HOME
                    </NavLink>
                    <NavLink href="/mint" className={navItemDrawer}>
                      MINT NFT
                    </NavLink>
                    <NavLink href="/workbench" className={navItemDrawer}>
                      BUDDIEVERSE
                    </NavLink>
                    <NavLink href="/freshoffers" className={navItemDrawer}>
                      MARKETPLACE
                    </NavLink>
                  </Box>
                </Drawer>
              )}
              <Account />
            </Stack>
          </Stack>
        </Container>
      </Header>
      <Container maxWidth="xl" style={{padding: "0px"}}>{children}</Container>
      <Footer />
    </>
  );
};
