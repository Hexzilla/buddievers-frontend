import { styles } from './styles';
import { useClasses } from 'hooks';
import { IntroSection } from 'components/IntroSection/IntroSection';
import { AboutSection } from 'components/AboutSection/AboutSection';
import { CharactorSection } from 'components/CharactorSection/CharactorSection';
import { UtilitySection } from 'components/UtilitySection/UtilitySection';
import { ComicSection } from 'components/ComicSection/ComicSection';
import { RoadSection } from 'components/RoadSection/RoadSection';

const HomePage = () => {
  const {
    homeContainer,
    introContainer,
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
      </div>
    </div>
  );
};

export default HomePage;
