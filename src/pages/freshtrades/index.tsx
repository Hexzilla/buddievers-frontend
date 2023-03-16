import { useState } from 'react';
import { useClasses } from 'hooks';

import { Video } from 'ui';
import { styles } from './styles';
import useWindowDimensions from 'utils/windowsDimensions';

import { MintComplete } from './MintComplete';
import { TokenSales } from './TokenSales';
import { Welcome } from './Welcome';
import { Whitelist } from './Whitelist';

const FreshTradesPage = () => {
  const [stage, setStage] = useState(0);
  const { container } = useClasses(styles);
  const { height, width } = useWindowDimensions();
  const stylesBackground = {
    transform: `translate(0px, -${height * (width / height - 0.68)}px)`,
  };

  return (
    <>
      <Video id="background-video" loop autoPlay>
        <source src="./background.mp4" type="video/mp4" />
      </Video>
      <div className={container} style={stylesBackground}>
        {stage === 0 && <Welcome onNext={() => setStage(1)} />}
        {stage === 1 && <Whitelist onNext={() => setStage(2)} />}
        {stage === 2 && <TokenSales onNext={() => setStage(3)} />}
        {stage === 3 && <MintComplete />};
      </div>
    </>
  );
};

export default FreshTradesPage;
