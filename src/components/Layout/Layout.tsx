import MenuIcon from '@mui/icons-material/Menu';
import { Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import WhiteLogoNormal from 'assets/images/moonsama-normal-white.svg';
import WhiteLogoAlt from 'assets/images/moonsama-alt-white.svg';
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
  const { logo, logoAlt, nav, navItem, buttonContainer, navItemDrawer } =
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
        <Container style={{ padding: '0 15px' }} maxWidth={false}>
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
            <Stack direction='row' justifyContent='flex-end' className={buttonContainer}>
              {!showRegularMenu ? (
                <Stack
                  direction={'row'}
                  onClick={() => setIsDrawerOpened(false)}
                >
                  {/*<NavLink href="/auctions" className={navItem}>
                    Auctions
                  </NavLink>*/}
                  <NavLink href="/collections" className={navItem}>
                    Collections
                  </NavLink>
                  <NavLink href="/workbench" className={navItem}>
                    Workbench
                  </NavLink>
                  <NavLink href="/freshoffers" className={navItem}>
                    Latest offers
                  </NavLink>
                  <NavLink href="/freshtrades" className={navItem}>
                    Latest trades
                  </NavLink>
                  <NavLink href="/myoffers" className={navItem}>
                    My offers
                  </NavLink>
                  <NavLink href="/mynfts" className={navItem}>
                    My NFTs
                  </NavLink>
                  <ExternalLink href="https://wiki.moonsama.com" className={navItem}>
                    Docs↗
                  </ExternalLink>
                  <ExternalLink href="https://minecraft-metaverse.moonsama.com" className={navItem}>
                    Bridge↗
                  </ExternalLink>

                  {/*<NavLink href="/explore" className={navItem}>
                  Explore
                </NavLink>*/}
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
                    <NavLink href="/collections" className={navItemDrawer}>
                      Collections
                    </NavLink>
                    <NavLink href="/workbench" className={navItemDrawer}>
                      Workbench
                    </NavLink>
                    <NavLink href="/freshoffers" className={navItemDrawer}>
                      Latest offers
                    </NavLink>
                    <NavLink href="/freshtrades" className={navItemDrawer}>
                      Latest trades
                    </NavLink>
                    <NavLink href="/myoffers" className={navItemDrawer}>
                      My offers
                    </NavLink>
                    <NavLink href="/mynfts" className={navItemDrawer}>
                      My NFTs
                    </NavLink>
                    <ExternalLink href="https://wiki.moonsama.com" className={navItemDrawer}>
                      Docs↗
                    </ExternalLink>
                    <ExternalLink href="https://minecraft-metaverse.moonsama.com" className={navItemDrawer}>
                      Bridge↗
                    </ExternalLink>
                  </Box>
                </Drawer>
              )}
              <ConnectedNetwork />
              <Account />
            </Stack>
          </Stack>
        </Container>
      </Header>
      <Container maxWidth="xl">{children}</Container>
      <Footer />
    </>
  );
};
