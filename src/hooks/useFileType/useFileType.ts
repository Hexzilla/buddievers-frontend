import { useCallback, useEffect, useState } from 'react';
import { fromStream } from 'file-type/browser';
import { FileTypeResult } from 'file-type/core';
import { PINATA_GATEWAY } from './../../constants';
import { isFirefox } from '../../utils';
import { useUriToHttp } from 'hooks/useUriToHttp/useUriToHttp';

type MediaType = 'image' | 'video' | 'audio' | 'xml' | 'other' | undefined;

const mediaArray: MediaType[] = ['audio', 'image', 'video', 'xml'];

export const useFileType = (uri?: string) => {
  const [fileType, setFileType] = useState<FileTypeResult | undefined>(
    undefined
  );
  const [mediaUrl, setMediaUrl] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const url = useUriToHttp(uri);

  const getMediaType = useCallback(() => {
    if (fileType) {
      const [media, secondOne] = fileType.mime.split('/');
      if (mediaArray.includes(media as MediaType)) {
        return media;
      }

      if (mediaArray.includes(secondOne as MediaType)) {
        return secondOne;
      }
      return 'other';
    }
  }, [fileType]);

  useEffect(() => {
    const getFileType = async () => {
      setMediaUrl(url);
      setIsLoading(true);
      const res = url ? await fetch(url) : undefined;
      if (res?.body) {
        const type = await fromStream(res?.body);
        try {
          await res.body.cancel();
        } catch (e) {
          // TODO: See why firefox crashes here.
          if (
            isFirefox &&
            e instanceof TypeError &&
            e.message === "'cancel' can't be called on a locked stream."
          ) {
            console.error(
              'Firefox related error:\n' + e.name + ': ' + e.message
            );
          } else {
            throw e;
          }
        } finally {
          setIsLoading(false);
        }
        setFileType(type);
      }
    };
    getFileType();
  }, [url]);

  //console.log({ fileType, getMediaType, mediaUrl });
  return { fileType, getMediaType, mediaUrl, isLoading };
};
