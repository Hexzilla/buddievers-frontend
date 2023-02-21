import { request } from 'graphql-request';
import { useBlockNumber } from 'state/application/hooks';
import { DEFAULT_CHAIN, MARKETPLACE_SUBGRAPH_URLS, SUBGRAPH_MAX_BLOCK_DELAY } from '../../constants';
import { QUERY_FILLS } from '../../subgraph/fillQueries';
import { Fill } from './types';
import { parseFill } from '../../utils/subgraph';
import { useState, useCallback, useEffect } from 'react';
import { useActiveWeb3React } from 'hooks';

export const useFills = () => {
  const { account, chainId } = useActiveWeb3React();
  const blockNumber = useBlockNumber();

  const [fills, setFills] = useState<Fill[] | undefined>();

  const fetchFills = useCallback(async () => {
    if (!account) {
      return;
    }

    const result = await request(MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN], QUERY_FILLS, {
      buyer: account.toLowerCase(),
    });

    console.debug('YOLO getFills', result);

    if (
      result?._meta?.block.number + SUBGRAPH_MAX_BLOCK_DELAY <
      (blockNumber ?? 0)
    ) {
      console.warn('Info fetched from subgraph might be stale');
    }

    const rawFills = result?.fills;
    if (!rawFills) {
      setFills([]);
      return;
    }
    const res = rawFills.map((x: any) => parseFill(x));
    setFills(res);
  }, [account, blockNumber, chainId]);

  useEffect(() => {
    fetchFills();
  }, [account, blockNumber, chainId]);

  return fills;
};
