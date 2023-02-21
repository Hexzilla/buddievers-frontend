import { useMemo } from 'react';
import uriToHttp from 'utils/uriToHttp';

export const useUriToHttp = (uriOrUrl?: string) => {
  return useMemo(() => {
    if (!uriOrUrl) {
      return undefined;
    }
    return uriToHttp(uriOrUrl, false)?.[0];
  }, [uriOrUrl]);
};
