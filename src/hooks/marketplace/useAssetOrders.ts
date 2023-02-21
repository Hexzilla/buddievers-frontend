import { request } from 'graphql-request';
import { useBlockNumber } from 'state/application/hooks';
import { DEFAULT_CHAIN, MARKETPLACE_SUBGRAPH_URLS, SUBGRAPH_MAX_BLOCK_DELAY } from '../../constants';
import { QUERY_ASSET_ORDERS } from '../../subgraph/orderQueries';
import { Order } from './types';
import { getAssetEntityId, parseOrder } from '../../utils/subgraph';
import { useState, useCallback, useEffect } from 'react';
import { useActiveWeb3React } from 'hooks';

export const useAssetOrders = (
  assetAddress: string,
  assetId: string,
  isBuy = false,
  onlyActive = false
) => {

  const {chainId} = useActiveWeb3React()
  const blockNumber = useBlockNumber();

  const [orders, setOrders] = useState<Order[] | undefined>();

  const fetchAssetOrders = useCallback(async () => {
    const assetEntityId = getAssetEntityId(assetAddress, assetId);
    const result = await request(
      MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
      QUERY_ASSET_ORDERS(isBuy, onlyActive, assetEntityId)
    );

    console.debug('YOLO getAssetOrders', result);

    if (
      result?._meta?.block.number + SUBGRAPH_MAX_BLOCK_DELAY <
      (blockNumber ?? 0)
    ) {
      console.warn('Info fetched from subgraph might be stale');
    }

    const orders = result?.orders;

    console.debug('YOLO getAssetOrders', { orders });

    if (!orders) {
      setOrders([]);
      return;
    }
    const res = orders.map((x: any) => parseOrder(x));
    setOrders(res);
  }, [assetAddress, assetId, blockNumber]);

  useEffect(() => {
    fetchAssetOrders();
  }, [fetchAssetOrders, blockNumber]);

  return orders;
};

export const useAssetOrdersCallback = (
  assetAddress: string,
  assetId: string,
  isBuy = false,
  onlyActive = false
) => {
  const {chainId} = useActiveWeb3React()
  const fetchAssetOrders = useCallback(async () => {
    const assetEntityId = getAssetEntityId(assetAddress, assetId);

    const result = await request(
      MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
      QUERY_ASSET_ORDERS(isBuy, onlyActive, assetEntityId)
    );
    const orders = result?.orders;

    if (!orders) {
      return [];
    }
    const res = orders.map((x: any) => parseOrder(x));
    return res;
  }, [chainId, assetAddress, assetId, onlyActive, isBuy]);

  return fetchAssetOrders;
};
