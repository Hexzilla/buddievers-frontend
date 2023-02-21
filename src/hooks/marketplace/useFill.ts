import { request } from 'graphql-request';
import { parseFill } from '../../utils/subgraph';
import { DEFAULT_CHAIN, MARKETPLACE_SUBGRAPH_URLS } from '../../constants';
import { QUERY_FILL } from '../../subgraph/fillQueries';
import { useState, useCallback, useEffect } from 'react';
import { Fill } from './types';
import { useActiveWeb3React } from 'hooks';

export const useFill = (transactionHash: string) => {
  const [fill, setFill] = useState<Fill | undefined>();

  const {chainId} = useActiveWeb3React()

  const fetchFill = useCallback(async () => {
    const result = await request(MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN], QUERY_FILL, { transactionHash });
    console.debug('YOLO getFill', result);

    if (!result) {
      setFill(undefined);
      return;
    }

    const rawfill = result?.fill;
    const f = parseFill(rawfill);

    console.debug('YOLO getFill', { fill: f });
    setFill(f);
  }, [chainId]);

  useEffect(() => {
    fetchFill();
  }, [fill]);

  return fill;
};
