import { request } from 'graphql-request';
import { useBlockNumber } from 'state/application/hooks';
import {
  DEFAULT_CHAIN,
  DEFAULT_ORDERBOOK_PAGINATION,
  MARKETPLACE_SUBGRAPH_URLS,
  SUBGRAPH_MAX_BLOCK_DELAY,
  
} from '../../constants';
import { QUERY_TOKEN_PAGE_ORDERS } from '../../subgraph/orderQueries';
import { Order } from './types';
import { parseOrder, getAssetEntityId } from '../../utils/subgraph';
import { useState, useCallback, useEffect } from 'react';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { AddressZero } from '@ethersproject/constants';

export interface TokenPageQuery {
  assetAddress: string;
  assetId: string;
  from: number; // from which element we fetch,
  num?: number; // how many elements we fetch
}

export interface TokenPageOrderResults {
  userOrders?: Order[];
  sellOrders?: Order[];
  buyOrders?: Order[];
}

export const useTokenPageOrders = ({
  assetAddress,
  assetId,
  from,
  num,
}: TokenPageQuery) => {
  const blockNumber = useBlockNumber();
  const { account, chainId } = useActiveWeb3React();

  //const account = '0x72b4c097dfff258790168c6ff5c987860a0003c5';
  num = num ?? DEFAULT_ORDERBOOK_PAGINATION;

  //console.log('useTokenPageOrders', blockNumber);

  const [result, setResult] = useState<TokenPageOrderResults>({});

  const fetchAssetOrders = useCallback(async () => {
    const assetEntityId = getAssetEntityId(assetAddress, assetId);

    //console.log(assetEntityId);

    const query = QUERY_TOKEN_PAGE_ORDERS(
      true,
      assetEntityId,
      account?.toLowerCase() ?? AddressZero,
      from,
      num as number
    );
    const response = await request(MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN], query);

    console.debug('YOLO useTokenPageOrders', response);

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

    const sellOrders: Order[] = (response.sellOrders ?? [])
      .map((x: any) => parseOrder(x))
      .filter((item: Order | undefined) => !!item);
    const buyOrders: Order[] = (response.buyOrders ?? [])
      .map((x: any) => parseOrder(x))
      .filter((item: Order | undefined) => !!item);

    const userOrdersBuy: Order[] = (response.userOrdersBuy ?? [])
      .map((x: any) => parseOrder(x))
      .filter((item: Order | undefined) => !!item);
    const userOrdersSell: Order[] = (response.userOrdersSell ?? [])
      .map((x: any) => parseOrder(x))
      .filter((item: Order | undefined) => !!item);

    const userOrders = [...userOrdersBuy, ...userOrdersSell].sort((a, b) => {
      return Number.parseInt(a.createdAt) - Number.parseInt(a.createdAt);
    });

    setResult({
      sellOrders,
      buyOrders,
      userOrders,
    });
  }, [assetAddress, assetId, blockNumber, account, chainId]);

  useEffect(() => {
    fetchAssetOrders();
  }, [fetchAssetOrders, blockNumber, account]);

  return result;
};
