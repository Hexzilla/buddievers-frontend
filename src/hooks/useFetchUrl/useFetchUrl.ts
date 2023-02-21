import { useFetchSingleUrlCallback } from 'hooks/useFetchUrlCallback/useFetchSingleUrlCallback';
import { useCallback, useState } from 'react';

export const useFetchUrl = <T>(uriOrUrl: string) => {
  const [result, setResult] = useState<T | undefined>(undefined);

  const data = useFetchSingleUrlCallback(uriOrUrl);

  useCallback(async () => {
    setResult(await data.get());
  }, [JSON.stringify(data.urls)]);

  return result;
};
