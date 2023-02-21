import axios from 'axios';
import { useMemo } from 'react';
import uriToHttp from 'utils/uriToHttp';

export const useFetchSingleUrlCallback = (uriOrUrl: string) => {
  return useMemo(() => {
    if (!uriOrUrl) {
      return {
        urls: [],
        get: async () => undefined,
      };
    }
    const urls = uriToHttp(uriOrUrl);
    return {
      urls,
      get: async () => {
        for (let i = 0; i < urls.length; i++) {
          try {
            const response = await axios.get(urls[i]);
            if (response.status === 200) {
              return response.data;
            }
          } catch (err) {
            console.debug('Fetch failed for URL' + urls[i], err);
          }
        }
        return undefined;
      },
    };
  }, [uriOrUrl]);
};
