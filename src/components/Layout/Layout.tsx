import { Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import WhiteLogoNormal from 'assets/images/logo.png';
import WhiteLogoAlt from 'assets/images/logo.png';
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery';
import { Account } from 'components';
import { useClasses } from 'hooks';
import { useState } from 'react';
import { Drawer, Footer, Header, NavLink } from 'ui';
import { MAX_WIDTH_TO_SHOW_NAVIGATION } from '../../constants';
import { styles } from './Layout.styles';

export const Layout = () => {
  const {
    headerWrapper,
    logo,
    logoAlt,
    navItem,
    buttonContainer,
    navItemDrawer,
    headerGrids,
    navLinkContainer,
    navItemMobile,
  } = useClasses(styles);

  const showRegularMenu = useMediaQuery(
    `(max-width: ${MAX_WIDTH_TO_SHOW_NAVIGATION}px)`
  );
  const isXs = useMediaQuery(`(max-width: 400px)`);
  console.log('xs', isXs);

  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

  return (
    <>
      <Header>
        <Container className={headerWrapper} maxWidth={false}>
          {showRegularMenu && (
            <IconButton onClick={() => setIsDrawerOpened(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Stack
            direction="row"
            justifyContent="center"
            className={buttonContainer}
          >
            {!showRegularMenu ? (
              <>
                <Grid container spacing={2}>
                  <Grid className={headerGrids} item md={5}>
                    <Stack
                      className={navLinkContainer}
                      direction={'row'}
                      onClick={() => setIsDrawerOpened(false)}
                    >
                      <Grid container spacing={2}>
                        <Grid item md={5}>
                          {/* <NavLink href="/marketplace" className={navItem}>
                          MARKETPLACE
                        </NavLink> */}
                          <NavLink href="/marketplace" className={navItem}>
                            MARKETPLACE
                          </NavLink>
                        </Grid>
                        <Grid item md={5}>
                          {/* <NavLink href="/coffeeshop" className={navItem}>
                          COFFEE SHOP
                          </NavLink> */}
                          <NavLink href="/coffeeshop" className={navItem}>
                            COFFEE SHOP
                          </NavLink>
                        </Grid>
                        <Grid item md={2}></Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                  {showRegularMenu && (
                    <IconButton onClick={() => setIsDrawerOpened(true)}>
                      <MenuIcon />
                    </IconButton>
                  )}
                  <Grid className={headerGrids} item md={1}>
                    <NavLink href="/" className={navItem}>
                      {!isXs && (
                        <div className={logo}>
                          <img src={WhiteLogoNormal} alt="" />
                        </div>
                      )}
                      {isXs && (
                        <div className={logoAlt}>
                          <img src={WhiteLogoAlt} alt="" />
                        </div>
                      )}
                    </NavLink>
                  </Grid>
                  <Grid className={headerGrids} item md={5}>
                    <Stack
                      className={navLinkContainer}
                      direction={'row'}
                      onClick={() => setIsDrawerOpened(false)}
                    >
                      <Grid container>
                        <Grid item md={4}>
                          <NavLink href="#" className={navItem}>
                            MINT
                          </NavLink>
                          {/* <NavLink href="/inventory" className={navItem}>
                            MY NFTs
                          </NavLink> */}
                        </Grid>
                        <Grid
                          item
                          md={4}
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <NavLink href="/faqs" className={navItem}>
                            FAQ
                          </NavLink>
                        </Grid>
                        <Grid
                          item
                          md={4}
                          style={{ display: 'flex', justifyContent: 'end' }}
                        >
                          <Account root="home" />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Drawer
                  open={isDrawerOpened}
                  onClose={() => setIsDrawerOpened(false)}
                  onOpen={() => setIsDrawerOpened(true)}
                  onClick={() => setIsDrawerOpened(false)}
                >
                  <>
                    {/*<NavLink href="/auctions" className={navItemDrawer}>
                      Auctions
                    </NavLink>*/}
                    <NavLink href="/" className={navItemDrawer}>
                      HOME
                    </NavLink>
                    <NavLink href="/marketplace" className={navItem}>
                            MARKETPLACE
                    </NavLink>
                    <NavLink href="/coffeeshop" className={navItemDrawer}>
                      COFFEE SHOP
                    </NavLink>
                    {/* <NavLink href="/inventory" className={navItemDrawer}>
                        MY NFTs
                    </NavLink> */}
                    <NavLink href="/" className={navItemDrawer}>
                      MINT
                    </NavLink>
                    <NavLink href="/faqs" className={navItemDrawer}>
                      FAQ
                    </NavLink>
                  </>
                </Drawer>
                <NavLink href="/" className={navItemMobile}>
                  {!isXs && (
                    <div className={logo}>
                      <img src={WhiteLogoNormal} alt="" />
                    </div>
                  )}
                  {isXs && (
                    <div className={logoAlt}>
                      <img src={WhiteLogoAlt} alt="" />
                    </div>
                  )}
                </NavLink>
              </>
            )}
          </Stack>
        </Container>
      </Header>
      <Container maxWidth="xl" style={{ padding: '0px' }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
