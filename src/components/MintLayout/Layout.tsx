import { Outlet } from 'react-router-dom';
import moment from 'moment';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Account } from 'components';
import { useActiveWeb3React, useClasses } from 'hooks';
import { ReactNode, useState, useEffect, useMemo } from 'react';
import { Drawer, Footer, NavLink } from 'ui';
import { useInterval } from 'hooks/useInterval';
import { MAX_WIDTH_TO_SHOW_NAVIGATION } from '../../constants';
import { styles } from './Layout.styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export const MintLayout = () => {
  const [remainTime, setRemainTime] = useState(0);
  const { account } = useActiveWeb3React();

  const {
    mintTitleRightNetwork,
    mintTitleRightWallet,
    mintTitleLeft,
    mintTitleBold,
    headerWrapper,
    navItemDrawer,
    headerGrids,
    appBar,
    toolBar,
  } = useClasses(styles);

  const Header = ({ children }: { children: ReactNode }) => {
    return (
      <>
        <AppBar className={appBar} elevation={0}>
          <Toolbar className={toolBar} disableGutters>
            {children}
          </Toolbar>
        </AppBar>
      </>
    );
  };

  const isMobile = useMediaQuery(
    `(max-width: ${MAX_WIDTH_TO_SHOW_NAVIGATION}px)`
  );

  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

  useEffect(() => {
    const startTime = moment.utc('2023-03-19 16:00:00').local();
    const remainTime = startTime.diff(moment(), 's');
    setRemainTime(remainTime);
  }, []);

  useInterval(() => {
    setRemainTime((time) => (time > 0 ? time - 1 : 0));
  }, 1000);

  const countdown = useMemo(() => {
    let time = moment.utc(remainTime * 1000).format('DD:HH:mm:ss');
    let [day, hour, min, sec] = time.split(':');
    return `${day}d ${hour}h ${min}m ${sec}s`;
  }, [remainTime]);

  const countdownView = useMemo(
    () => (
      <>
        <span className={mintTitleBold}>LAUNCH: </span>
        {countdown}
      </>
    ),
    [countdown, mintTitleBold]
  );

  const desktopMeue = useMemo(
    () => (
      <>
        <Grid container justifyContent="left" spacing={0}>
          <Grid className={headerGrids} item md={6}>
            <div className={mintTitleLeft}>
              <span className={mintTitleBold}>Moonbuddies mission </span>
              {countdownView}
            </div>
          </Grid>
          <Grid className={headerGrids} justifyContent="right" item md={2}>
            {!!account && (
              <div className={mintTitleRightNetwork}>
                <div className={mintTitleBold}>Network: </div>
                Exosama Network
              </div>
            )}
          </Grid>
          <Grid className={headerGrids} justifyContent="right" item md={2}>
            {!!account && (
              <div className={mintTitleRightWallet}>
                <div className={mintTitleBold}>Wallet: </div>
                {account.slice(0, 4) + '...' + account.slice(-4)}
              </div>
            )}
          </Grid>
          <Grid className={headerGrids} justifyContent="right" item md={2}>
            <Account />
          </Grid>
        </Grid>
      </>
    ),
    [
      account,
      countdownView,
      headerGrids,
      mintTitleRightNetwork,
      mintTitleRightWallet,
      mintTitleBold,
      mintTitleLeft,
    ]
  );

  const mobileMenu = useMemo(
    () => (
      <>
        <Grid container justifyContent="left" spacing={0}>
          <Grid className={headerGrids} justifyContent="left" item md={10}>
            <div className={mintTitleLeft}>
              <span className={mintTitleBold}>MOONBUDDIES MISSION</span>
              <div>{countdownView}</div>
            </div>
          </Grid>
          <Grid className={headerGrids} justifyContent="right" item md={2}>
            <Drawer
              open={isDrawerOpened}
              onClose={() => setIsDrawerOpened(false)}
              onOpen={() => setIsDrawerOpened(true)}
              onClick={() => setIsDrawerOpened(false)}
              anchor="right"
            >
              <Box>
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
        {isMobile && (
          <IconButton onClick={() => setIsDrawerOpened(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </>
    ),
    [
      countdownView,
      headerGrids,
      isDrawerOpened,
      isMobile,
      mintTitleBold,
      mintTitleLeft,
      navItemDrawer,
    ]
  );

  return (
    <>
      <Header>
        <Container className={headerWrapper} maxWidth={false}>
          <Stack direction="row">{!isMobile ? desktopMeue : mobileMenu}</Stack>
        </Container>
      </Header>
      <Container maxWidth="xl" style={{ padding: '0px' }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
