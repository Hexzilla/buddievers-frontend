import { useFileType } from 'hooks';
import { VideoHTMLAttributes, ImgHTMLAttributes } from 'react';
import { Image, Placeholder, Video } from 'ui';

import LogoWhite from '../../assets/images/logo_white.svg';

type MediaProps = {
  uri?: string;
};

export const Media = ({
  uri,
  ...props
}: MediaProps & ImgHTMLAttributes<any> & VideoHTMLAttributes<any>) => {
  const { getMediaType, mediaUrl, isLoading } = useFileType(uri);
  const mediaType = getMediaType();

  //console.log('MEDIA', {mediaUrl, isLoading, mediaType})

  if (!mediaUrl) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  if (mediaType === 'image' && mediaUrl) {
    return <Image src={mediaUrl} {...props} />;
  }

  if (mediaType === 'xml' && mediaUrl) {
    return <Image src={mediaUrl} {...props} />;
  }

  if ((mediaType === 'video' || mediaType === 'audio') && mediaUrl) {
    return <Video src={mediaUrl} {...props} />;
  }
  return null;
};
