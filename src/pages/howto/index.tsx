import { useClasses } from 'hooks';
import { GlitchText } from 'ui';

const styles = () => ({
  container: {
    textAlign: 'center',
  },
});

const HowToPage = () => {
  const { container } = useClasses(styles);
  return (
    <div className={container}>
      <GlitchText>How it works? Fucking awesome I guess !!!</GlitchText>
    </div>
  );
};
export default HowToPage;
