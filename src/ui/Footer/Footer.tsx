import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useClasses } from 'hooks';
import { Telegram, Twitter } from 'icons';
import React from 'react';
import { styles } from './Footer.styles';

export const Footer = () => {
  const { footerWrapper, iconsWrapper, copyrightText, icon } =
    useClasses(styles);
  return (
    <Container maxWidth={false} className={footerWrapper}>
        <Typography variant="h6">Join the community</Typography>
        <div className={iconsWrapper}>
          <a href="https://twitter.com/moonsamaNFT" target="_blank">
            <Twitter className={icon} />
          </a>
          <a href="https://t.me/moonsamaNFT" target="_blank">
            <Telegram className={icon} />
          </a>
          {/*<a href="#" target="_blank"><Discord className={icon} /></a>*/}
        </div>

        <Typography
          align="center"
          className={copyrightText}
          gutterBottom
          variant="inherit"
        >
          &copy; 2021 Moonsama
        </Typography>
    </Container>
  );
};
