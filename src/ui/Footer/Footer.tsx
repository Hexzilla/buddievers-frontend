import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import { useClasses } from 'hooks';
import { styles } from './Footer.styles';

export const Footer = () => {
  const { footerWrapper, title, text, hypers, footerButton } =
    useClasses(styles);

  return (
    <Container maxWidth={false} className={footerWrapper}>
      <Grid container spacing={0}>
        <Grid item lg={5} sm={12}>
          {/* <iframe src="https://buddies.substack.com/embed" width="480" height="320" style={{ border:"1px solid #EEE", background:"white"}} scrolling="no"></iframe> */}
          <p className={title}>QUICK LINKS</p>
          <Grid container spacing={0}>
            <Grid item md={6}>
              <a
                className={hypers}
                href="https://singular.app/collectibles/kusama/5225293d2cbb586654-BUDDIES"
              >
                <p className={text}>BUDDIES</p>
              </a>
              <a className={hypers} href="#">
                <p className={text}>MOON BUDDIES</p>
              </a>
              <a className={hypers} href="/faqs">
                <p className={text}>FAQ</p>
              </a>
            </Grid>
            <Grid item md={6}>
              <p className={text}>Marketplace</p>
              <p className={text}>Coffee Shop</p>
              <p className={text}>Raresama</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          lg={2}
          sm={12}
          style={{ alignSelf: 'center', textAlign: 'center' }}
        >
          <img src="/logo.png" style={{ width: '40%', height: '30%' }} alt=""/>
        </Grid>
        <Grid
          item
          lg={5}
          sm={12}
          style={{ alignSelf: 'center', textAlign: 'center' }}
        >
          <p className={title}>Keep up to date on the latest news</p>
          <div style={{ display: 'flex', width: '80%', margin: 'auto' }}>
            <button
              className={footerButton}
              onClick={() => window.open('https://buddies.substack.com/')}
            >
              Sign up for our newsletter
            </button>
          </div>
          <Grid container spacing={0} style={{ marginTop: '30px' }}>
            <Grid item md={3}>
              <p className={title}>JOIN US</p>
            </Grid>
            <Grid item md={2} style={{ alignSelf: 'center' }}>
              <a href="https://twitter.com/Buddies_St">
                <img src="/twitter.png" alt=""/>
              </a>
            </Grid>
            <Grid item md={2} style={{ alignSelf: 'center' }}>
              <a href="https://discord.gg/9HSbQQ7gpw">
                <img src="/discord.png" alt=""/>
              </a>
            </Grid>
            <Grid item md={2} style={{ alignSelf: 'center' }}>
              <a href="https://t.me/MoonBUDDIES">
                <img src="/telegram.png" alt=""/>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
