import { request } from 'graphql-request';
import { useBlockNumber } from 'state/application/hooks';
import { DEFAULT_CHAIN, MARKETPLACE_SUBGRAPH_URLS, SUBGRAPH_MAX_BLOCK_DELAY } from '../../constants';
import { QUERY_LAST_TRADED_PRICE } from '../../subgraph/lastTradedPrice';
import { LastTradedPrice } from './types';
import { getAssetEntityId, parseLastTradedPrice } from '../../utils/subgraph';
import { useState, useCallback, useEffect } from 'react';
import { useActiveWeb3React } from 'hooks';

export interface LastTradedPriceQuery {
  assetAddress: string;
  assetId: string;
}

export const useLastTradedPrice = ({
  assetAddress,
  assetId,
}: LastTradedPriceQuery) => {
  const blockNumber = useBlockNumber();
  const {chainId} = useActiveWeb3React()

  const [result, setResult] = useState<LastTradedPrice | undefined>(undefined);

  const fetchAssetOrders = useCallback(async () => {
    const assetEntityId = getAssetEntityId(assetAddress, assetId);

    //console.log({assetEntityId});

    const query = QUERY_LAST_TRADED_PRICE(assetEntityId);
    const response = await request(MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN], query);

    //console.error('YOLO useLastTradedPrice', response);

    if (!response) {
      setResult(undefined);
      return;
    }

    if (
      (response?._meta?.block.number ?? 0) + SUBGRAPH_MAX_BLOCK_DELAY <
      (blockNumber ?? 0)
    ) {
      console.warn('Info fetched from subgraph might be stale');
    }

    const lastTradedPrice = parseLastTradedPrice(
      response.lastTradedPrice ?? undefined
    );
    console.error('YOLO useLastTradedPrice', lastTradedPrice);

    setResult(lastTradedPrice);
  }, [assetAddress, assetId, blockNumber, chainId]);

  useEffect(() => {
    fetchAssetOrders();
  }, [fetchAssetOrders, blockNumber, chainId]);

  return result;
};

export const useLastTradedPriceOnce = ({
  assetAddress,
  assetId,
}: LastTradedPriceQuery) => {
  const [result, setResult] = useState<LastTradedPrice | undefined>(undefined);
  const {chainId} = useActiveWeb3React()

  const fetchAssetOrders = useCallback(async () => {
    const assetEntityId = getAssetEntityId(assetAddress, assetId);

    //console.log({assetEntityId});

    const query = QUERY_LAST_TRADED_PRICE(assetEntityId);
    const response = await request(MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN], query);

    //console.error('YOLO useLastTradedPrice', response);

    if (!response) {
      setResult(undefined);
      return;
    }

    const lastTradedPrice = parseLastTradedPrice(
      response.lastTradedPrice ?? undefined
    );
    console.error('YOLO useLastTradedPrice', lastTradedPrice);

    setResult(lastTradedPrice);
  }, [assetAddress, assetId, chainId]);

  useEffect(() => {
    fetchAssetOrders();
  }, [fetchAssetOrders, chainId]);

  return result;
};
