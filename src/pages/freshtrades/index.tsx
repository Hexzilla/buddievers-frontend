import { useState, useEffect } from 'react';
import { useClasses } from 'hooks';
import { ImageAspectRatioTwoTone } from '@mui/icons-material';
import {
  Backdrop,
  CircularProgress,
  TextField,
  Snackbar,
  IconButton,
  Paper,
  Grid,
  ButtonBase,
  Typography,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, Button, GlitchText } from 'ui';
import { MonaLisa } from 'icons';
import { styles } from './styles';
import WhiteLogoNormal from 'assets/images/logo.png';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '10px',
  width: '400px',
  height: '500px',
});

const FreshTradesPage = () => {
  const [beforeMint, setBeforeMint] = useState(true);
  const [whiteListed, setWhiteListed] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [buddieVerse, setBuddieVerse] = useState(false);
  const [moonBuddie, setMoonBuddie] = useState(false);
  const { container, logo, navItem, mainTitle, subText, subButton, subQuiz, centerGrid, videoTitle, contentPaper, boardTitlePaper, boardTitle, boardBody, boardSubTitle, boardSubBody, boardButton, buttonText } = useClasses(styles);

  if (moonBuddie)
    return (
      <>
        <Paper
          className={contentPaper}
        >
          <Grid container spacing={10} style={{marginTop:'-20px'}}>
            <Grid item>
              <Img alt="complex" src="./B-BUDS 5.png" />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs className={boardTitlePaper}>
                  <Typography className={boardTitle}>
                    MOONBUDDIES
                  </Typography>
                  <Typography className={boardBody}>
                    MOONBUDDIES#192
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={boardBody}>
                    MINING <span style={{ color: "#00CE4C" }}> &nbsp;COMPLETE</span>
                  </Typography>
                  <Typography className={boardSubTitle}>CONGRATS, YOU 'VE MINTED <span style={{ color: '#00CE4C' }}> &nbsp;12&nbsp; </span>/&nbsp;150</Typography>
                  <Typography className={boardSubBody}>
                    welcome to the beginning of an incredible adventure <br />
                    through the BUDDLEVERSE. CLick below for the next steps
                  </Typography>
                </Grid>
                <Grid item container style={{justifyContent:"left"}}>
                  <div style={{marginRight:"10px"}}>
                    <Button className={boardButton}>
                      <span className={buttonText}>MINT ANOTHER</span></Button>
                  </div>
                  <div style={{marginRight:"10px"}}>
                    <Button className={boardButton}>
                      <span className={buttonText}>GO TO BUDDIEVERSE</span></Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </>
    )
  if (buddieVerse)
    return (
      <>
        <div className={container}>
          <Grid item md={2} style={{ alignSelf: "center", textAlign: "center" }}>
            <div onClick={() => { setMoonBuddie(true) }} >
              <img src={WhiteLogoNormal} alt="" />
            </div>
          </Grid>
          <Typography className={videoTitle} >
            LIFT OFF
          </Typography>
        </div>
      </>
    )

  return (
    <>
      <div className={container}>
        <Grid item md={2}>
          <NavLink href="/" className={navItem}>
            <div className={logo}>
              <img src={WhiteLogoNormal} alt="" />
            </div>
          </NavLink>
        </Grid>
        {
          !beforeMint ? (
            registered ? (
              !whiteListed ? (

                <Typography className={mainTitle} >SORRY</Typography>
              ) : (
                <Typography className={mainTitle} >CONGRATULATIONS</Typography>
              )
            ) : (
              <Typography className={mainTitle} >MINT SOON</Typography>
            )
          ) : (
            registered ? (
              !whiteListed ? (

                <Typography className={mainTitle} >SORRY</Typography>
              ) : (
                <Typography className={mainTitle} >CONGRATULATIONS</Typography>
              )
            ) : (
              <Typography className={mainTitle} >MINT IS ONLINE</Typography>
            )
          )

        }
        {
          !registered ? (
            <Typography className={subText} >
              CHECK YOUR WHITELISTSTATUS
            </Typography>
          ) : (
            !whiteListed ? (
              <Typography className={subText} >
                YOU ARE NOT WHITELISTED
              </Typography>
            ) : (
              <Typography className={subText} >
                YOU ARE WHITELISTED
              </Typography>
            )
          )
        }
        <br />
        <Grid className={centerGrid} >
          {
            !registered ? (
              <Button className={subButton}
                onClick={() => setRegistered(true)}
              >
                <span className={subQuiz}>
                  ARE YOU REGISTERED?
                </span>
              </Button>
            ) : (
              !whiteListed ? (
                <Button className={subButton}
                  onClick={() => setBuddieVerse(true)}
                >
                  <span className={subQuiz}>
                    TAKE ME BUDISVERSE
                  </span>
                </Button>

              ) : (
                <Button className={subButton}
                  onClick={() => setBuddieVerse(true)}
                >
                  <span className={subQuiz}>
                    TAKE ME TO LEFT OFF
                  </span>
                </Button>

              )

            )
          }
        </Grid>
      </div>
    </>
  );
};

export default FreshTradesPage;
