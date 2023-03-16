import MenuIcon from '@mui/icons-material/Menu';
import { Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Account } from 'components';
import { useClasses } from 'hooks';
import { useState } from 'react';
import { Drawer, Footer, Header, NavLink } from 'ui';
import { MAX_WIDTH_TO_SHOW_NAVIGATION } from '../../constants';
import { styles } from './Layout.styles';
import { LayoutProps } from './Layout.types';

export const MintLayout = ({ children }: LayoutProps) => {
  const [stage, setStage] = useState(1);
  const [currentTime, setCurrentTime] = useState("");
  const [connectStatus, setConnectStatus] = useState(1);
  const [liftOffStatus, setLiftOffStatus] = useState(1);

  const { mintTitleRightNetwork, mintTitleRightWallet, mintTitleLeft, mintTitleBold, headerWrapper, logo, logoAlt, nav, navItem, buttonContainer, navItemDrawer, headerGrids, navLinkContainer1, navLinkContainer2, navItemMobile, socialImages, socialTitle } =
    useClasses(styles);

  const showRegularMenu = useMediaQuery(
    `(max-width: ${MAX_WIDTH_TO_SHOW_NAVIGATION}px)`
  );
  const isXs = useMediaQuery(
    `(max-width: 400px)`
  );
  console.log('xs', isXs)

  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

  setInterval(() => {
    let ts = Date.now();
    let today = new Date(ts);
    setCurrentTime(today.getDate() + 'd ' + today.getHours() + 'h ' + today.getMinutes() + 'm ' + today.getSeconds() + 's');
  }, 1000);

  return (
    <>
      <Header>
        <Container className={headerWrapper} maxWidth={false}>
          {showRegularMenu && (
            <IconButton onClick={() => setIsDrawerOpened(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Stack direction='row'>
            {!showRegularMenu ? (
              <>
                <Grid container justifyContent='left' spacing={0}>
                  <Grid className={headerGrids} item md={6}>
                    {liftOffStatus === 1 &&
                      <div className={mintTitleLeft}>
                        <span className={mintTitleBold}>MOONBUDDIES MISSION LAUNCH: </span>
                        {currentTime}
                      </div>
                    }
                  </Grid>
                  <Grid className={headerGrids} justifyContent='right' item md={2}>
                    {connectStatus === 1 &&
                      <div className={mintTitleRightNetwork}>
                        <div className={mintTitleBold}>Network: </div>
                        Exosama Network
                      </div>
                    }
                  </Grid>
                  <Grid className={headerGrids} justifyContent='right' item md={2}>
                    {connectStatus === 1 &&
                      <div className={mintTitleRightWallet}>
                        <div className={mintTitleBold}>Wallet: </div>
                        0xed...0s9d
                      </div>
                    }
                  </Grid>
                  <Grid className={headerGrids} justifyContent='right' item md={2}>
                    <Account />
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid container justifyContent='left' spacing={0}>
                  <Grid className={headerGrids} justifyContent='left' item md={10}>
                    <div className={mintTitleLeft}>
                      <span className={mintTitleBold}>MOONBUDDIES MISSION LAUNCH: </span>
                      {currentTime}
                    </div>
                  </Grid>
                  <Grid className={headerGrids} justifyContent='right' item md={2}>
                    <Drawer
                      open={isDrawerOpened}
                      onClose={() => setIsDrawerOpened(false)}
                      onOpen={() => setIsDrawerOpened(true)}
                      onClick={() => setIsDrawerOpened(false)}
                      anchor="right"
                    >
                      <Box sx={{ display: 'flex' }}>
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
                  </Grid>
                </Grid>
              </>
            )}

          </Stack>
        </Container>
      </Header>

      <Container maxWidth="xl" style={{ padding: "0px" }}>{children}</Container>
      <Footer />
    </>
  );
};
