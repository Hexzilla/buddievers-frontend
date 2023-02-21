import axios from 'axios';
import uriToHttp from 'utils/uriToHttp';

export const useFetchUrlCallback = () => {
  const cb = async <T>(uriOrUrl?: string, tryHttpToHttps = true) => {
    if (!uriOrUrl) {
      return undefined;
    }
    const urls = uriToHttp(uriOrUrl, tryHttpToHttps);
    for (let i = 0; i < urls.length; i++) {
      try {
        const response = await axios.get(urls[i], {});
        if (response.status === 200) {
          return response.data as T;
        }
      } catch (err) {
        console.debug('Fetch failed for URL: ' + urls[i], err);
      }
    }
    return undefined;
  };
  return cb;
};
