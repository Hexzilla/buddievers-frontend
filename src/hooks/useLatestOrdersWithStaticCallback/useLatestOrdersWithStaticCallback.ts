import {
  ChainId,
  DEFAULT_CHAIN,
  MARKETPLACE_SUBGRAPH_URLS,
} from '../../constants';
import { PAMENT_CollectionAddress } from '../../constants/paymenToken';
import { request } from 'graphql-request';
import { inferOrderTYpe, OrderType, parseOrder } from 'utils/subgraph';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback } from 'react';
import { Asset, Order } from 'hooks/marketplace/types';
import {
  QUERY_LATEST_BUY_ORDERS,
  QUERY_LATEST_BUY_ORDERS_FOR_TOKEN,
  QUERY_LATEST_BUY_ORDERS_WITHOUT_TOKEN,
  QUERY_LATEST_ORDERS,
  QUERY_LATEST_SELL_ORDERS,
  QUERY_LATEST_SELL_ORDERS_FOR_TOKEN,
  QUERY_LATEST_SELL_ORDERS_WITHOUT_TOKEN,
  QUERY_LATEST_PAYMENTTOKEN_SELL_ORDERS_FOR_TOKEN,
  QUERY_LATEST_PAYMENTTOKEN_BUY_ORDERS_FOR_TOKEN,
} from 'subgraph/orderQueries';
import {
  StaticTokenData,
  useTokenStaticDataCallbackArray,
} from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { AddressZero } from '@ethersproject/constants';

// export const useLatestOrdersWithStaticCallback = () => {
//   const { chainId } = useActiveWeb3React();
//   const staticCallback = useTokenStaticDataCallbackArray();

//   const fetchLatestOrdersWithStatic = useCallback(
//     async (num: number, offset: number) => {
//       console.log('order query', offset, num);
//       const query = QUERY_LATEST_ORDERS(offset, num);
//       const response = await request(
//         MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
//         query
//       );
//       const datas = await orderProcessCore(chainId, response, staticCallback);
//       return datas;
//     },
//     [chainId]
//   );

//   return fetchLatestOrdersWithStatic;
// };

// export const useLatestBuyOrdersWithStaticCallback = () => {
//   const { chainId } = useActiveWeb3React();
//   const staticCallback = useTokenStaticDataCallbackArray();

//   const fetchLatestOrdersWithStatic = useCallback(
//     async (num: number, offset: number) => {
//       console.log('order query', offset, num);
//       const query = QUERY_LATEST_BUY_ORDERS(`${AddressZero}-0`, offset, num);
//       const response = await request(
//         MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
//         query
//       );
//       const datas = await orderProcessCore(chainId, response, staticCallback);
//       return datas;
//     },
//     [chainId]
//   );

//   return fetchLatestOrdersWithStatic;
// };

// export const useLatestSellOrdersWithStaticCallback = () => {
//   const { chainId } = useActiveWeb3React();
//   const staticCallback = useTokenStaticDataCallbackArray();

//   const fetchLatestOrdersWithStatic = useCallback(
//     async (num: number, offset: number) => {
//       console.log('order query', offset, num);
//       const query = QUERY_LATEST_SELL_ORDERS(`${AddressZero}-0`, offset, num);
//       const response = await request(
//         MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
//         query
//       );
//       const datas = await orderProcessCore(chainId, response, staticCallback);
//       return datas;
//     },
//     [chainId]
//   );

//   return fetchLatestOrdersWithStatic;
// };

export const useLatestSellOrdersForTokenTotalSupplyWithStaticCallback = () => {
  const { chainId } = useActiveWeb3React();
  const fetchLatestOrdersWithStatic = useCallback(
    async (tokenAddress: string, sortBy: string, sortDirection: string) => {
      let totalCount = 0,
        skip = 0,
        isLoop = true;
      while (isLoop) {
        const query = QUERY_LATEST_SELL_ORDERS_FOR_TOKEN(
          `${AddressZero}-0`,
          tokenAddress,
          skip,
          1000,
          sortBy,
          sortDirection
        );
        const response = await request(
          MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
          query
        );
        if (!response) {
          skip += 1000;
          continue;
        }
        const latestOrders: Order[] = (response.latestOrders ?? []).filter(
          (item: Order | undefined) => !!item
        );
        if (!response.latestOrders.length) isLoop = false;
        else {
          totalCount += latestOrders.length;
          skip += 1000;
        }
      }
      return totalCount;
    },
    [chainId]
  );

  return fetchLatestOrdersWithStatic;
};

export const useLatestSellOrdersForTokenWithStaticCallback = () => {
  const { chainId } = useActiveWeb3React();
  const staticCallback = useTokenStaticDataCallbackArray();

  const fetchLatestOrdersWithStatic = useCallback(
    async (
      tokenAddress: string,
      num: number,
      offset: number,
      sortBy: string,
      sortDirection: string
    ) => {
      let query: any;
      let foundIndex = tokenAddress
        ? PAMENT_CollectionAddress.findIndex((e) => e.address === tokenAddress)
        : -1;
      if (foundIndex === -1) {
        query = QUERY_LATEST_SELL_ORDERS_FOR_TOKEN(
          `${AddressZero}-0`,
          tokenAddress.toLowerCase(),
          offset,
          num,
          sortBy,
          sortDirection
        );
      } else {
        query = QUERY_LATEST_PAYMENTTOKEN_SELL_ORDERS_FOR_TOKEN(
          tokenAddress.toLowerCase(),
          offset,
          num,
          sortBy,
          sortDirection
        );
      }
      const response = await request(
        MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
        query
      );
      const datas = await orderProcessCore(chainId, response, staticCallback);
      return datas;
    },
    [chainId]
  );

  return fetchLatestOrdersWithStatic;
};

export const useLatestBuyOrdersForTokenTotalSupplyWithStaticCallback = () => {
  const { chainId } = useActiveWeb3React();
  const fetchLatestOrdersWithStatic = useCallback(
    async (tokenAddress: string, sortBy: string, sortDirection: string) => {
      let totalCount = 0,
        skip = 0,
        isLoop = true;
      while (isLoop) {
        const query = QUERY_LATEST_BUY_ORDERS_FOR_TOKEN(
          `${AddressZero}-0`,
          tokenAddress,
          skip,
          1000,
          sortBy,
          sortDirection
        );
        const response = await request(
          MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
          query
        );
        if (!response) {
          skip += 1000;
          continue;
        }
        const latestOrders: Order[] = (response.latestOrders ?? []).filter(
          (item: Order | undefined) => !!item
        );
        if (!response.latestOrders.length) isLoop = false;
        else {
          totalCount += latestOrders.length;
          skip += 1000;
        }
      }
      return totalCount;
    },
    [chainId]
  );

  return fetchLatestOrdersWithStatic;
};

export const useLatestBuyOrdersForTokenWithStaticCallback = () => {
  const { chainId } = useActiveWeb3React();
  const staticCallback = useTokenStaticDataCallbackArray();

  const fetchLatestOrdersWithStatic = useCallback(
    async (
      tokenAddress: string,
      num: number,
      offset: number,
      sortBy: string,
      sortDirection: string
    ) => {
      let query: any;
      let foundIndex = tokenAddress
        ? PAMENT_CollectionAddress.findIndex((e) => e.address === tokenAddress)
        : -1;
      if (foundIndex === -1) {
        query = QUERY_LATEST_BUY_ORDERS_FOR_TOKEN(
          `${AddressZero}-0`,
          tokenAddress.toLowerCase(),
          offset,
          num,
          sortBy,
          sortDirection
        );
      } else {
        query = QUERY_LATEST_PAYMENTTOKEN_BUY_ORDERS_FOR_TOKEN(
          tokenAddress.toLowerCase(),
          offset,
          num,
          sortBy,
          sortDirection
        );
      }
      const response = await request(
        MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
        query
      );
      const datas = await orderProcessCore(chainId, response, staticCallback);
      return datas;
    },
    [chainId]
  );

  return fetchLatestOrdersWithStatic;
};

// export const useLatestSellOrdersWithoutTokenWithStaticCallback = (
//   tokenAddress: string
// ) => {
//   const { chainId } = useActiveWeb3React();
//   const staticCallback = useTokenStaticDataCallbackArray();

//   const fetchLatestOrdersWithStatic = useCallback(
//     async (num: number, offset: number) => {
//       console.log('order query', offset, num);
//       const query = QUERY_LATEST_SELL_ORDERS_WITHOUT_TOKEN(
//         `${AddressZero}-0`,
//         tokenAddress,
//         offset,
//         num
//       );
//       const response = await request(
//         MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
//         query
//       );
//       const datas = await orderProcessCore(chainId, response, staticCallback);
//       return datas;
//     },
//     [chainId]
//   );

//   return fetchLatestOrdersWithStatic;
// };

// export const useLatestBuyOrdersWithoutTokenWithStaticCallback = (
//   tokenAddress: string
// ) => {
//   const { chainId } = useActiveWeb3React();
//   const staticCallback = useTokenStaticDataCallbackArray();

//   const fetchLatestOrdersWithStatic = useCallback(
//     async (num: number, offset: number) => {
//       console.log('order query', offset, num);
//       const query = QUERY_LATEST_BUY_ORDERS_WITHOUT_TOKEN(
//         `${AddressZero}-0`,
//         tokenAddress,
//         offset,
//         num
//       );
//       const response = await request(
//         MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
//         query
//       );
//       const datas = await orderProcessCore(chainId, response, staticCallback);
//       return datas;
//     },
//     [chainId]
//   );

//   return fetchLatestOrdersWithStatic;
// };

const orderProcessCore = async (
  chainId: ChainId | undefined,
  response: any,
  staticCallback: (
    assets: Asset[]
  ) => Promise<{ meta: any; staticData: StaticTokenData }[]>
) => {
  if (!response) {
    return [];
  }

  let assets: Asset[] = [];
  const latestOrders: Order[] = (response.latestOrders ?? [])
    .map((x: any) => {
      const po = parseOrder(x);
      if (po) {
        const ot =
          inferOrderTYpe(chainId, po.sellAsset, po.buyAsset) ?? OrderType.SELL;
        assets.push(ot === OrderType.BUY ? po.buyAsset : po.sellAsset);
      }
      return po;
    })
    .filter((item: Order | undefined) => !!item);

  const staticDatas = await staticCallback(assets);

  const datas = staticDatas.map((sd, i) => {
    return {
      meta: sd.meta,
      staticData: sd.staticData,
      order: latestOrders[i],
    };
  });
  return datas;
};
