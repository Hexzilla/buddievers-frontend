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
  const { headerWrapper, logo, logoAlt, nav, navItem, buttonContainer, navItemDrawer, headerGrids, navLinkContainer1, navLinkContainer2, navItemMobile, socialImages, socialTitle } =
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
        {showRegularMenu && (
          <IconButton onClick={() => setIsDrawerOpened(true)}>
            <MenuIcon />
          </IconButton>
        )}
          <Stack direction='row' justifyContent='center' className={buttonContainer}>
            {!showRegularMenu ? (
              <>
              <Grid container spacing={2}>
                <Grid className={headerGrids} item xs={2}>
                  <Grid container spacing={0}>
                    <Grid item md={2}>
                    </Grid>
                    <Grid item md={4}>
                      <p className = {socialTitle}>JOIN US</p>
                    </Grid>
                    <Grid item md={2} style={{ alignSelf: "center" }}>
                      <a href="https://twitter.com/Buddies_St" target={'_blank'}>
                        <img
                          className={socialImages}
                          src="./twitter.png"
                        />
                      </a>
                    </Grid>
                    <Grid item md={2} style={{ alignSelf: "center" }}>
                      <a href="https://discord.gg/9HSbQQ7gpw" target={'_blank'}>
                        <img
                          className={socialImages}
                          src="./discord.png"
                        />
                      </a>
                    </Grid>
                    <Grid item md={2}>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={headerGrids} item xs={3}>
                  <Stack
                    className={navLinkContainer1}
                    direction={'row'}
                    onClick={() => setIsDrawerOpened(false)}
                  >
                    <NavLink href="/" className={navItem}>
                      HOME
                    </NavLink>
                    <NavLink href="/mint" className={navItem}>
                      BUDDIEVERSE
                    </NavLink>
                  </Stack>
                </Grid>
                  {showRegularMenu && (
                    <IconButton onClick={() => setIsDrawerOpened(true)}>
                      <MenuIcon />
                    </IconButton>
                  )}
                  <Grid className={headerGrids} item xs={1}>
                    <NavLink href="/" className={navItem}>
                      {!isXs && <div className={logo}>
                        <img src={WhiteLogoNormal} alt="" />
                      </div>}
                      {isXs && <div className={logoAlt}>
                        <img src={WhiteLogoAlt} alt="" />
                      </div>}
                    </NavLink>
                  </Grid>
                  <Grid className={headerGrids} item xs={4}>
                    <Stack
                      className={navLinkContainer2}
                      direction={'row'}
                      onClick={() => setIsDrawerOpened(false)}
                    >
                      <NavLink href="/workbench" className={navItem}>
                        MARKETPLACE
                      </NavLink>
                      <NavLink href="/freshoffers" className={navItem}>
                        COFFEE SHOP
                      </NavLink>
                    </Stack>
                  </Grid>
                  <Grid className={headerGrids} item xs={2}>
                    <Account />
                  </Grid>
                </Grid>
              </>
            ) : (
              <><Drawer
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
                <NavLink href="/" className={navItemMobile}>
                    {!isXs && <div className={logo}>
                      <img src={WhiteLogoNormal} alt="" />
                    </div>}
                    {isXs && <div className={logoAlt}>
                      <img src={WhiteLogoAlt} alt="" />
                    </div>}
                  </NavLink></>
            )}
            
          </Stack>
        </Container>
      </Header>
      <Container maxWidth="xl" style={{padding: "0px"}}>{children}</Container>
      <Footer />
    </>
  );
};
