import { useState } from 'react';
import { useClasses } from 'hooks';
import { Paper, Grid, Typography, styled } from '@mui/material';
import { NavLink, Button, Video } from 'ui';
import { styles } from './styles';
import useWindowDimensions from 'utils/windowsDimensions';
import { Welcome } from './Welcome';
import { Whitelist } from './Whitelist';
import { TokenSales } from './TokenSales';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '10px',
  height: '500px',
  width: '400px',
});

const FreshTradesPage = () => {
  const [stage, setStage] = useState(0);
  const [beforeMint, setBeforeMint] = useState(false);
  const [whiteListed, setWhiteListed] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [buddieVerse, setBuddieVerse] = useState(false);
  const [moonBuddie, setMoonBuddie] = useState(false);
  const {
    container,
    logo,
    navItem,
    mainTitle,
    subText,
    subButton,
    subQuiz,
    centerGrid,
    videoTitle,
    contentPaper,
    boardTitlePaper,
    boardTitle,
    boardBody,
    boardSubTitle,
    boardSubBody,
    boardButton,
    buttonText,
  } = useClasses(styles);
  const { height, width } = useWindowDimensions();

  console.log('he');

  const stylesBackground = {
    transform: `translate(0px, -${height * (width / height - 0.6)}px)`,
  };

  if (moonBuddie)
    return (
      <>
        <Video id="background-video" loop autoPlay>
          <source src="./background.mp4" type="video/mp4" />
        </Video>
        <Paper className={contentPaper} style={stylesBackground}>
          <Grid container spacing={10} style={{ marginTop: '-20px' }}>
            <Grid item>
              <Img alt="complex" src="./B-BUDS 5.png" />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs className={boardTitlePaper}>
                  <Typography className={boardTitle}>MOONBUDDIES</Typography>
                  <Typography className={boardBody}>MOONBUDDIES#192</Typography>
                </Grid>
                <Grid item>
                  <Typography className={boardBody}>
                    MINING{' '}
                    <span style={{ color: '#00CE4C' }}> &nbsp;COMPLETE</span>
                  </Typography>
                  <Typography className={boardSubTitle}>
                    CONGRATS, YOU'VE MINTED{' '}
                    <span style={{ color: '#00CE4C' }}> &nbsp;12&nbsp; </span>
                    /&nbsp;500
                  </Typography>
                  <Typography className={boardSubBody}>
                    Welcome to the beginning of an incredible adventure <br />
                    through the BUDDIEVERSE. Click below for the next steps.
                  </Typography>
                </Grid>
                <Grid item container direction={'row'}>
                  <Grid item xs={4} style={{ marginRight: '80px' }}>
                    <Button className={boardButton}>
                      <span className={buttonText}>MINT ANOTHER</span>
                    </Button>
                  </Grid>
                  <Grid item xs={4} style={{ marginRight: '10px' }}>
                    <Button className={boardButton}>
                      <span className={buttonText}>GO TO BUDDIEVERSE</span>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  if (buddieVerse)
    return (
      <>
        <Video id="background-video1" loop autoPlay>
          <source src="./background.mp4" type="video/mp4" />
        </Video>
        <div className={container} style={stylesBackground}>
          <Grid
            item
            md={2}
            style={{ alignSelf: 'center', textAlign: 'center' }}
          >
            <div
              onClick={() => {
                setMoonBuddie(true);
              }}
            >
              <img width={100} height={100} src="./arrow-lift-off.png" alt="" />
            </div>
          </Grid>
          <Typography className={videoTitle}>LIFT OFF</Typography>
        </div>
      </>
    );

  return (
    <>
      <Video id="background-video" loop autoPlay>
        <source src="./background.mp4" type="video/mp4" />
      </Video>
      <div className={container} style={stylesBackground}>
        {stage === 0 && <Welcome onNext={() => setStage(1)} />}
        {stage === 1 && <Whitelist onNext={() => setStage(2)} />}
        {/* <TokenSales onNext={() => setStage(3)} /> */}



        {/* <Grid item md={2}>
          <NavLink href="/" className={navItem}>
            <div className={logo}>
              <img src={WhiteLogoNormal} alt="" />
            </div>
          </NavLink>
        </Grid>
        {!beforeMint ? (
          registered ? (
            !whiteListed ? (
              <Typography className={mainTitle}>NO WHITELIST</Typography>
            ) : (
              <Typography className={mainTitle}>CONGRATULATIONS</Typography>
            )
          ) : (
            <Typography className={mainTitle}>MINT SOON</Typography>
          )
        ) : registered ? (
          !whiteListed ? (
            <Typography className={ }>NO WHITELIST</Typography>
          ) : (
            <Typography className={mainTitle}>CONGRATULATIONS</Typography>
          )
        ) : (
          <Typography className={mainTitle}>MINT IS ONLINE</Typography>
        )}
        {!registered ? (
          <Typography className={subText}>
            Check Your Whitelist Status
          </Typography>
        ) : !whiteListed ? (
          <Typography className={subText}>
            Join us on the Public Mint
          </Typography>
        ) : (
          <Typography className={subText}>You Are Whitelisted</Typography>
        )}
        <br />
        <Grid className={centerGrid}>
          {!registered ? (
            <Button className={subButton} onClick={() => setRegistered(true)}>
              <span className={subQuiz}>ARE YOU REGISTERED?</span>
            </Button>
          ) : !whiteListed ? (
            <Button className={subButton} onClick={() => setBuddieVerse(true)}>
              <span className={subQuiz}>TAKE ME TO THE LIFT OFF</span>
            </Button>
          ) : (
            <Button className={subButton} onClick={() => setBuddieVerse(true)}>
              <span className={subQuiz}>TAKE ME TO THE LIFT OFF</span>
            </Button>
          )}
        </Grid> */}
      </div>
    </>
  );
};

export default FreshTradesPage;
