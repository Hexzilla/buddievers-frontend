import { Button } from 'ui';
// import { MonaLisa, ShoppingCart, WalletIcon } from "icons";
import { GlitchText, NavLink } from 'ui';
import { styles } from './styles';
import { useClasses } from 'hooks';
import { IntroSection } from 'components/IntroSection/IntroSection';

const HomePage = () => {
  const {
    homeContainer,
    betaText,
    betaTitle,
    pageContent,
    exploreButton,
    icon,
    iconContainer,
    iconBlock,
  } = useClasses(styles);
  return (
    <div className={homeContainer}>
      <IntroSection/>
      
      <GlitchText variant="h1" gutterBottom fontSize={48}>
        Discover, collect, and sell NFTs
      </GlitchText>
      <GlitchText variant="h2">
        Moonsama, Moonriver's first NFT marketplace
      </GlitchText>

      {/*<div className={iconBlock}>*/}
      {/*  <div className={iconContainer}>*/}
      {/*    <WalletIcon className={icon} />*/}
      {/*    <Typography>Connect your wallet</Typography>*/}
      {/*  </div>*/}
      {/*  <div className={iconContainer}>*/}
      {/*    <MonaLisa className={icon} />*/}
      {/*    <Typography>Explore the marketplace</Typography>*/}
      {/*  </div>*/}
      {/*  <div className={iconContainer}>*/}
      {/*    <ShoppingCart className={icon} />*/}
      {/*    <Typography>Buy or sell assets</Typography>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className={pageContent}>
        <NavLink href="/collections">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={exploreButton}
          >
            Explore Collections
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
