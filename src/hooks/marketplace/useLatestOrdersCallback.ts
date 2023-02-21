import {
  DEFAULT_CHAIN,
  DEFAULT_ORDERBOOK_PAGINATION,
  MARKETPLACE_SUBGRAPH_URLS,
} from '../../constants';
import { request } from 'graphql-request';
import { parseOrder } from 'utils/subgraph';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback } from 'react';
import { Order } from 'hooks/marketplace/types';
import { QUERY_LATEST_ORDERS } from 'subgraph/orderQueries';

export const useLatestOrdersCallback = () => {
  const {chainId} = useActiveWeb3React()
  const fetchLatestOrders = useCallback(
    async (from = 0, num = DEFAULT_ORDERBOOK_PAGINATION): Promise<Order[]> => {
      const query = QUERY_LATEST_ORDERS(from, num as number);
      const response = await request(MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN], query);

      console.debug('YOLO useLatestOrders', response);

      if (!response) {
        return [];
      }

      const latestOrders: Order[] = (response.latestOrders ?? [])
        .map((x: any) => parseOrder(x))
        .filter((item: Order | undefined) => !!item);

      return latestOrders;
    },
    [chainId]
  );

  return fetchLatestOrders;
};
