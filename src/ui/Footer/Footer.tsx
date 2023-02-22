import { Typography, Grid } from '@mui/material';
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
          <div>
            <p className={text}>BUDDIES</p>
            <p className={text}>MOON BUDDIES</p>
            <p className={text}>About</p>
          </div>
          <div>
            <p className={text}>Marketplace</p>
            <p className={text}>Coffee Shop</p>
            <p className={text}>Raresama</p>
          </div>
        </Grid>
        <Grid item xs={2}>
          <img
            src="./B-BUDS 1.png"
          />
        </Grid>
        <Grid item xs={5}>
          <p className={title}>SIGN OUR NEWSLETTER</p>
        </Grid>
      </Grid>
    </Container>
  );
};
