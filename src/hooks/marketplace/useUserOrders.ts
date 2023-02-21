import { request } from 'graphql-request';
import { useBlockNumber } from 'state/application/hooks';
import {
  DEFAULT_CHAIN,
  DEFAULT_ORDERBOOK_PAGINATION,
  MARKETPLACE_SUBGRAPH_URLS,
  SUBGRAPH_MAX_BLOCK_DELAY,
  
} from '../../constants';
import { QUERY_USER_ACTIVE_ORDERS } from '../../subgraph/orderQueries';
import { Order } from './types';
import { parseOrder } from '../../utils/subgraph';
import { useState, useCallback, useEffect } from 'react';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { AddressZero } from '@ethersproject/constants';

export interface UserOrdersQuery {
  from: number; // from which element we fetch,
  num?: number; // how many elements we fetch
}

export interface UserOrdersResults {
  userOrders?: Order[];
}

export const useUserOrders = ({
  from = 0,
  num = DEFAULT_ORDERBOOK_PAGINATION,
}: UserOrdersQuery) => {
  const blockNumber = useBlockNumber();
  const { account, chainId } = useActiveWeb3React();

  console.log('useUserOrders', blockNumber);

  const [result, setResult] = useState<UserOrdersResults>({});

  const fetchAssetOrders = useCallback(async () => {
    const query = QUERY_USER_ACTIVE_ORDERS(
      account?.toLowerCase() ?? AddressZero,
      from,
      num as number
    );
    const response = await request(MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN], query);

    console.debug('YOLO useUserOrders', response);

    if (!response) {
      setResult({});
      return;
    }

    if (
      (response?._meta?.block.number ?? 0) + SUBGRAPH_MAX_BLOCK_DELAY <
      (blockNumber ?? 0)
    ) {
      console.warn('Info fetched from subgraph might be stale');
    }

    const userOrders: Order[] = (response.userOrders ?? [])
      .map((x: any) => parseOrder(x))
      .filter((item: Order | undefined) => !!item);

    setResult({
      userOrders,
    });
  }, [blockNumber, account, chainId]);

  useEffect(() => {
    fetchAssetOrders();
  }, [blockNumber, account, chainId]);

  return result;
};
