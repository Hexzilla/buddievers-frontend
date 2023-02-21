import { useCallback, useState, useEffect } from 'react';
import { QUERY_FLOOR_ORDER } from 'subgraph/orderQueries';
import { DEFAULT_CHAIN, MARKETPLACE_SUBGRAPH_URLS } from '../../constants';
import request from 'graphql-request';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { parseOrder } from 'utils/subgraph';
import { Asset, Order } from 'hooks/marketplace/types';

export const useFloorOrder = (asset: Asset) => {
  const [result, setResult] = useState<Order | undefined>(undefined);

  const { chainId } = useActiveWeb3React();

  const fetchFloorAsset = useCallback(async () => {
    let query = QUERY_FLOOR_ORDER(asset.assetAddress);
    const response = await request(MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN], query);
    const _order = parseOrder(response.orders[0]);
    setResult(_order);
    return;
  }, [chainId, JSON.stringify(asset)]);
  useEffect(() => {
    fetchFloorAsset();
  }, [chainId, JSON.stringify(asset)])

  return result;
};
