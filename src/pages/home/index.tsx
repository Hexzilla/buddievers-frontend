import { Button } from 'ui';
// import { MonaLisa, ShoppingCart, WalletIcon } from "icons";
import { GlitchText, NavLink } from 'ui';
import { styles } from './styles';
import { useClasses } from 'hooks';
import { IntroSection } from 'components/IntroSection/IntroSection';
import { AboutSection } from 'components/AboutSection/AboutSection';
import { CharactorSection } from 'components/CharactorSection/CharactorSection';
import { UtilitySection } from 'components/UtilitySection/UtilitySection';
import { ComicSection } from 'components/ComicSection/ComicSection';
import { RoadSection } from 'components/RoadSection/RoadSection';
import { JoinSection } from 'components/JoinSection/JoinSection';

const HomePage = () => {
  const {
    homeContainer,
    introContainer,
    betaText,
    betaTitle,
    pageContent,
    exploreButton,
    icon,
    iconContainer,
    iconBlock,
  } = useClasses(styles);
  return (
    <div>
      <div className={introContainer}>
        <IntroSection/>
      </div>
      <div className={homeContainer}>
        <AboutSection/>
        <CharactorSection/>
        <UtilitySection/>
        <ComicSection/>
        <RoadSection/>
        <JoinSection/>
      </div>
    </div>
  );
};

export default HomePage;
