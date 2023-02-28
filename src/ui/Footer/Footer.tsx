import { Typography, Grid, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import { useClasses } from 'hooks';
import { Telegram, Twitter } from 'icons';
import React from 'react';
import { styles } from './Footer.styles';

export const Footer = () => {
  const {
    footerWrapper,
    title,
    text
  } = useClasses(styles);
  return (
    <Container maxWidth={false} className={footerWrapper}>
      <Grid container spacing={0}>
        <Grid item xs={5}>
          <p className={title}>QUICK LINKS</p>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <p className={text}>BUDDIES</p>
              <p className={text}>MOON BUDDIES</p>
              <p className={text}>About</p>
            </Grid>
            <Grid item xs={6}>
              <p className={text}>Marketplace</p>
              <p className={text}>Coffee Shop</p>
              <p className={text}>Raresama</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          <img
            src="./B-BUDS 1.png"
            style={{ width: "30%", height: "30%" }}
          />
        </Grid>
        <Grid item xs={5}
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          <p className={title}>SIGN OUR NEWSLETTER</p>
          <TextField id="outlined-basic" label="Email Address"
            variant="outlined"
            inputProps={{
              style: {
                color: "white",
                fontSize: "23px"
              }
            }} />
          <Grid container spacing={0}>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={4}>
              <p className={title}>JOIN US</p>
            </Grid>
            <Grid item xs={2} style={{ alignSelf: "center" }}>
              <img
                src="./twitter.png"
              />
            </Grid>
            <Grid item xs={2} style={{ alignSelf: "center" }}>
              <img
                src="./discord.png"
              />
            </Grid>
            <Grid item xs={2}>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
