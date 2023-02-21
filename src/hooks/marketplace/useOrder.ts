import { request } from 'graphql-request';
import { useBlockNumber } from 'state/application/hooks';
import { DEFAULT_CHAIN, MARKETPLACE_SUBGRAPH_URLS, SUBGRAPH_MAX_BLOCK_DELAY } from '../../constants';
import { QUERY_ORDER } from '../../subgraph/orderQueries';
import { Order } from './types';
import { parseOrder } from '../../utils/subgraph';
import { useState, useCallback, useEffect } from 'react';
import { useActiveWeb3React } from 'hooks';

const fetchOrderFromSubgraph = async (
  orderHash: string,
  blockNumber: number | undefined,
  chainId?: number
) => {
  const result = await request(MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN], QUERY_ORDER, { orderHash });

  console.debug('YOLO getOrder', result);

  if (
    result?._meta?.block.number + SUBGRAPH_MAX_BLOCK_DELAY <
    (blockNumber ?? 0)
  ) {
    console.warn('Info fetched from subgraph might be stale');
  }

  const raworder = result?.order;

  const porder = parseOrder(raworder);

  console.debug('YOLO getOrder ', { porder });

  if (!porder) {
    return undefined;
  }

  return porder;
};

export const useOrder = (orderHash: string) => {
  const blockNumber = useBlockNumber();

  const [order, setOrder] = useState<Order | undefined>();

  const fetchOrder = useCallback(async () => {
    const order = await fetchOrderFromSubgraph(orderHash, blockNumber);
    setOrder(order);
  }, [orderHash, blockNumber]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder, orderHash, blockNumber]);

  return order;
};

// THIS IS WRONG IT SHOULD BE 1 CALL NOT 1 CALL PER ORDER !! JUST FOR DEV
export const useOrders = (ordersHashes: string[]) => {
  const blockNumber = useBlockNumber();
  const {chainId} = useActiveWeb3React()

  const [orders, setOrders] = useState<Order[] | undefined>([]);

  const fetchOrders = useCallback(async () => {
    const orders = await Promise.all(
      ordersHashes.map(async (orderHash) => {
        const order = await fetchOrderFromSubgraph(orderHash, blockNumber, chainId);
        return order;
      })
    );

    const filteredOrders = orders.filter(Boolean) as Order[];

    setOrders(filteredOrders);
  }, [ordersHashes, blockNumber, chainId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, ordersHashes, blockNumber, chainId]);

  return orders;
};
