import { useClasses } from 'hooks';
import React, { ImgHTMLAttributes, useState } from 'react';
import { Loader } from 'ui';
import { styles } from './Image.styles';

export const Image = (props: ImgHTMLAttributes<any>) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { image, imageNotShow } = useClasses(styles);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && <Loader />}
      <img
        onLoad={handleLoad}
        onError={handleLoad}
        alt=""
        {...props}
        className={`${image} ${props.className || ''} ${
          !loaded ? imageNotShow : ''
        }`}
      />
    </>
  );
};
