import { BigNumber } from '@ethersproject/bignumber';
import { tryMultiCallCore } from 'hooks/useMulticall2/useMulticall2';
import { useMulticall2Contract } from 'hooks/useContracts/useContracts';
import {
  getAssetEntityId,
  OrderType,
  parseOrder,
  StringAssetType,
} from 'utils/subgraph';
import {
  getTokenStaticCalldata,
  processTokenStaticCallResults,
} from 'utils/calls';
import { useFetchTokenUriCallback } from 'hooks/useFetchTokenUri.ts/useFetchTokenUriCallback';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback } from 'react';
import { Asset, Order } from 'hooks/marketplace/types';
import { Filters } from 'ui/Filters/Filters';
import { parseEther } from '@ethersproject/units';
import {
  QUERY_ACTIVE_ORDERS_FOR_FILTER,
  QUERY_ORDERS_FOR_TOKEN,
  QUERY_ORDERS_FOR_TOKEN_WITH_PRICE,
} from 'subgraph/orderQueries';
import {
  QUERY_SUBSQUID_ERC721_ACTIVE_ID,
  QUERY_SUBSQUID_ERC721_CONTRACT_DATA,
  QUERY_SUBSQUID_ERC721_ID_IN,
} from 'subgraph/erc721Queries';
import {
  QUERY_SUBSQUID_ERC1155_ACTIVE_ID,
  QUERY_SUBSQUID_ERC1155_CONTRACT_DATA,
  QUERY_SUBSQUID_ERC1155_ID_IN,
} from 'subgraph/erc1155Queries';
import request from 'graphql-request';
import {
  DEFAULT_CHAIN,
  MARKETPLACE_SUBGRAPH_URLS,
  TOKEN_SUBSQUID_URLS,
} from '../../constants';
import { TEN_POW_18 } from 'utils';
import { useRawcollection } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { SortOption } from 'ui/Sort/Sort';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';

export interface StaticTokenData {
  asset: Asset;
  name?: string;
  symbol?: string;
  decimals?: number;
  totalSupply?: BigNumber;
  tokenURI?: string;
  contractURI?: string;
  metadata?: TokenMeta | undefined;
}

export type TokenStaticCallbackInput = {
  assetAddress?: string;
  assetType?: StringAssetType;
};

export type TokenStaticFetchInput = {
  num: number;
  offset: BigNumber;
};

export type AssetWithUri = Asset & { tokenURI: string };

export type TokenSubgraphQueryResult = {
  uri: string;
  numericId: string;
  id: string;
};

// export const useTokenStaticDataCallbackArray = () => {
//   const { chainId } = useActiveWeb3React();
//   const rawCollections = useRawCollectionsFromList();
//   const fetchTokenStaticData = useCallback(
//     async (assets: Asset[]) => {
//       if (!assets.length) {
//         return [];
//       }

//       console.log('useTokenStaticDataCallbackArray', assets);

//       let assetType = assets[0].assetType;
//       let assetAddress = assets[0].assetAddress;

//       let subsquid = '';
//       rawCollections.map(async (collection) => {
//         if (collection.address.toLowerCase() === assetAddress.toLowerCase())
//           subsquid = collection.subsquid;
//       });

//       let tokens: any[] = [];
//       let staticData: StaticTokenData[] = [];
//       if (assetType === 'ERC721') {
//         const query = QUERY_SUBSQUID_ERC721_ID_IN(
//           assetAddress,
//           assets.map((a) => a.assetId)
//         );
//         const ress = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], query);
//         tokens = ress.erc721Tokens;
//         const CONTRACT_QUERY =
//           QUERY_SUBSQUID_ERC721_CONTRACT_DATA(assetAddress);
//         const contractData = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], CONTRACT_QUERY);
//         if (tokens.length) {
//           staticData = assets.map((ca) => {
//             let token = tokens.find((t: any) => t.numericId === ca.assetId);
//             return {
//               asset: ca,
//               decimals: contractData.erc721Contracts[0].decimals,
//               contractURI: contractData.erc721Contracts[0].contractURI,
//               name: contractData.erc721Contracts[0].name,
//               symbol: contractData.erc721Contracts[0].symbol,
//               totalSupply: contractData.erc721Contracts[0].totalSupply,
//               tokenURI: token.uri,
//               metadata: token.meta,
//             };
//           });
//         }
//       } else {
//         const query = QUERY_SUBSQUID_ERC1155_ID_IN(
//           assetAddress,
//           assets.map((a) => a.assetId)
//         );
//         const ress = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], query);
//         tokens = ress.erc1155Tokens;
//         const CONTRACT_QUERY =
//           QUERY_SUBSQUID_ERC1155_CONTRACT_DATA(assetAddress);
//         const contractData = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], CONTRACT_QUERY);
//         if (tokens.length) {
//           staticData = assets.map((ca) => {
//             let token = tokens.find((t: any) => t.numericId === ca.assetId);
//             return {
//               asset: ca,
//               decimals: contractData.erc1155Contracts[0].decimals,
//               contractURI: contractData.erc1155Contracts[0].contractURI,
//               name: contractData.erc1155Contracts[0].name,
//               symbol: contractData.erc1155Contracts[0].symbol,
//               totalSupply: token.totalSupply,
//               tokenURI: token.uri,
//               metadata: token.meta,
//             };
//           });
//         }
//       }
//       return staticData.map((x, i) => {
//         return {
//           meta: x.metadata,
//           staticData: x,
//         };
//       });
//     },
//     [chainId]
//   );

//   return fetchTokenStaticData;
// };

export const useTokenStaticDataCallbackArray = () => {
  const { chainId } = useActiveWeb3React();
  const multi = useMulticall2Contract();

  const fetchUri = useFetchTokenUriCallback();

  const fetchTokenStaticData = useCallback(
    async (assets: Asset[]) => {
      if (!assets) {
        return [];
      }

      let calls: any[] = [];
      assets.map((asset, i) => {
        calls = [...calls, ...getTokenStaticCalldata(asset)];
      });

      const results = await tryMultiCallCore(multi, calls);

      if (!results) {
        return [];
      }

      //console.log('yolo tryMultiCallCore res', results);
      const staticData = processTokenStaticCallResults(assets, results);

      const metas = await fetchUri(staticData);

      return metas.map((x, i) => {
        return {
          meta: x,
          staticData: staticData[i],
        };
      });
    },
    [chainId]
  );

  return fetchTokenStaticData;
};

const chooseTokenAssets = (
  assetType: StringAssetType,
  assetAddress: string,
  offset: BigNumber,
  num: number,
  idsAndUris: { tokenURI: string; assetId: string }[],
  direction: boolean
) => {
  let offsetNum = BigNumber.from(offset).toNumber();
  let chosenAssets: AssetWithUri[];

  // in this case offsetnum should be substracted one
  if (idsAndUris?.length > 0) {
    //console.log('xxxx')
    if (offsetNum >= idsAndUris.length) {
      return [];
    }
    const to =
      offsetNum + num >= idsAndUris.length
        ? idsAndUris.length
        : offsetNum + num;
    let chosenIds = [];

    if (direction) chosenIds = idsAndUris.slice(offsetNum, to);
    else chosenIds = [...idsAndUris].reverse().slice(offsetNum, to);

    chosenAssets = chosenIds.map((x) => {
      return {
        assetId: x.assetId,
        assetType,
        assetAddress,
        id: getAssetEntityId(assetAddress, x.assetId),
        tokenURI: x.tokenURI,
      };
    });
  } else {
    return [];
  }

  return chosenAssets;
};

const chooseTokenAssetsAll = (
  assetType: StringAssetType,
  assetAddress: string,
  idsAndUris: { tokenURI: string; assetId: string }[],
  direction: boolean
) => {
  let chosenAssets: AssetWithUri[];
  if (idsAndUris?.length > 0) {
    let chosenIds = [];

    if (direction) chosenIds = idsAndUris;
    else chosenIds = [...idsAndUris].reverse();

    chosenAssets = chosenIds.map((x) => {
      return {
        assetId: x.assetId,
        assetType,
        assetAddress,
        id: getAssetEntityId(assetAddress, x.assetId),
        tokenURI: x.tokenURI,
      };
    });
  } else {
    return [];
  }

  return chosenAssets;
};

export const useERC721TokenStaticDataCallbackArrayWithFilter = (
  { assetAddress, assetType }: TokenStaticCallbackInput,
  subcollectionId: string,
  filter: Filters | undefined,
  sortBy: SortOption
) => {
  console.log('useERC721TokenStaticDataCallbackArrayWithFilter', {
    assetAddress,
    assetType,
    filter,
    subcollectionId,
  });
  const { chainId } = useActiveWeb3React();

  const priceRange = filter?.priceRange;
  const selectedOrderType = filter?.selectedOrderType;
  const fetchTokenStaticData = useCallback(
    async (
      num: number,
      offset: BigNumber,
      setTake: (take: number) => void,
      searchId: number
    ) => {
      if (!assetAddress || !assetType) {
        console.log({ assetAddress, assetType });
        return [];
      }

      let idsAndUris: { tokenURI: string; assetId: string }[] = [];

      const CONTRACT_QUERY = QUERY_SUBSQUID_ERC721_CONTRACT_DATA(assetAddress);
      const contractData = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], CONTRACT_QUERY);
      let totalSupply = parseInt(contractData.erc721Contracts[0].totalSupply);
      let res = [],
        query: any,
        res1;
      if (totalSupply <= 1000) {
        query = QUERY_SUBSQUID_ERC721_ACTIVE_ID(assetAddress, 0, totalSupply);
        res1 = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], query);
        res = res1.erc721Tokens;
      } else {
        let from = 0;
        while (from < totalSupply) {
          query = QUERY_SUBSQUID_ERC721_ACTIVE_ID(assetAddress, from, 1000);
          let res1 = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], query);
          for (let i = 0; i < res1.erc721Tokens.length; i++)
            res.push(res1.erc721Tokens[i]);
          from += 1000;
        }
      }
      for (let i = 0; i < res.length; i++) {
        if (!searchId || searchId == parseInt(res[i].numericId)) {
          idsAndUris.push({ tokenURI: res[i].uri, assetId: res[i].numericId });
        }
      }

      const fetchStatics = async (assets: Asset[], orders?: Order[]) => {
        console.log('assets', { assets, orders });
        if (orders && orders.length !== assets.length) {
          throw new Error('Orders/assets length mismatch');
        }

        if (!assets.length) {
          return [];
        }

        const query = QUERY_SUBSQUID_ERC721_ID_IN(
          assetAddress,
          assets.map((a) => a.assetId)
        );

        const ress = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], query);
        let tokens = ress.erc721Tokens;
        let staticData: StaticTokenData[] = [];
        if (tokens.length) {
          staticData = assets.map((ca) => {
            let token = tokens.find((t: any) => t.numericId === ca.assetId);
            return {
              asset: ca,
              decimals: contractData.erc721Contracts[0].decimals,
              contractURI: contractData.erc721Contracts[0].contractURI,
              name: contractData.erc721Contracts[0].name,
              symbol: contractData.erc721Contracts[0].symbol,
              totalSupply: contractData.erc721Contracts[0].totalSupply,
              tokenURI: token.tokenUri,
              metadata: token.metadata,
            };
          });
        }
        return staticData.map((x, i) => {
          return {
            meta: x.metadata,
            staticData: x,
            order: orders?.[i],
          };
        });
      };
      let ordersFetch: any[] = [];
      let flag = 0;
      if (
        !(
          !priceRange ||
          priceRange.length === 0 ||
          priceRange.length !== 2 ||
          !selectedOrderType
        ) &&
        (sortBy === SortOption.TOKEN_ID_ASC ||
          sortBy === SortOption.TOKEN_ID_DESC)
      ) {
        flag = 1;
        let chosenAssets = chooseTokenAssetsAll(
          assetType,
          assetAddress,
          idsAndUris,
          sortBy === SortOption.TOKEN_ID_ASC
        );
        const rangeInWei = priceRange.map((x) =>
          parseEther(x.toString()).mul(TEN_POW_18)
        );

        let indexer = 0;
        while (1) {
          let tempChosenAssets = chosenAssets.slice(indexer, indexer + 1000);
          if (!tempChosenAssets || tempChosenAssets.length === 0) {
            break;
          }
          indexer += 1000;

          const sgAssets = tempChosenAssets.map((x) => {
            return x.id;
          });

          let query = QUERY_ACTIVE_ORDERS_FOR_FILTER(
            selectedOrderType,
            JSON.stringify(sgAssets),
            rangeInWei[0].toString(),
            rangeInWei[1].toString()
          );

          const result = await request(
            MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
            query
          );
          // console.log('YOLO getOrders', result);
          const orders = result?.orders;

          if (orders && orders.length > 0) {
            ordersFetch = ordersFetch.concat(orders);
          }
        }
      } else if (
        !(
          !priceRange ||
          priceRange.length === 0 ||
          priceRange.length !== 2 ||
          !selectedOrderType
        ) &&
        (sortBy === SortOption.PRICE_ASC || sortBy === SortOption.PRICE_DESC)
      ) {
        let index = 0;
        flag = 2;
        const rangeInWei = priceRange.map((x) =>
          parseEther(x.toString()).mul(TEN_POW_18)
        );
        while (1) {
          let query = QUERY_ORDERS_FOR_TOKEN_WITH_PRICE(
            assetAddress,
            selectedOrderType,
            sortBy === SortOption.PRICE_ASC,
            index,
            1000,
            rangeInWei[0].toString(),
            rangeInWei[1].toString()
          );
          const result = await request(
            MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
            query
          );

          if (!result || !result?.orders.length) {
            break;
          }
          index += 1000;
          let orders: any[] = result?.orders;
          if (orders && orders.length > 0) {
            ordersFetch = ordersFetch.concat(orders);
          }
        }
      } else if (
        sortBy === SortOption.PRICE_ASC ||
        sortBy === SortOption.PRICE_DESC
      ) {
        let index = 0;
        flag = 2;
        while (1) {
          let query = QUERY_ORDERS_FOR_TOKEN(
            assetAddress,
            sortBy === SortOption.PRICE_ASC,
            index,
            1000
          );

          const result = await request(
            MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
            query
          );

          if (!result || !result?.orders.length) {
            break;
          }
          index += 1000;
          let orders: any[] = result?.orders;
          if (orders && orders.length > 0) {
            ordersFetch = ordersFetch.concat(orders);
          }
        }
      }

      const theAssetNumber: { assetId: string; indexer: number }[] = [];
      let orders = ordersFetch.map((x, i) => {
        const o = parseOrder(x) as Order;
        const a =
          selectedOrderType === OrderType.BUY
            ? (o?.buyAsset as Asset)
            : (o?.sellAsset as Asset);
        theAssetNumber.push({ assetId: a?.assetId, indexer: i });
        return o;
      });

      if (flag == 1 && sortBy === SortOption.TOKEN_ID_ASC) {
        theAssetNumber.sort((a, b) => {
          return parseInt(a.assetId) - parseInt(b.assetId);
        });
      } else if (flag == 1 && sortBy === SortOption.TOKEN_ID_DESC) {
        theAssetNumber.sort((a, b) => {
          return parseInt(b.assetId) - parseInt(a.assetId);
        });
      }

      let tempIdsAndUris: { tokenURI: string; assetId: string }[] = [];
      let tempOrders: Order[] = [];
      if (theAssetNumber.length || flag !== 0) {
        theAssetNumber.map((number) => {
          let tempIdsAndUri = idsAndUris.find((idsAndUri) => {
            return idsAndUri.assetId == number.assetId;
          });
          if (tempIdsAndUri) {
            tempIdsAndUris.push(tempIdsAndUri);
            tempOrders.push(orders[number.indexer]);
          }
        });
        if (sortBy === SortOption.TOKEN_ID_DESC && flag !==1) {
          tempOrders = tempOrders.reverse();
        }
        orders = tempOrders;
        idsAndUris = tempIdsAndUris;
        let offsetNum = BigNumber.from(offset).toNumber();
        const to =
          offsetNum + num >= idsAndUris.length
            ? idsAndUris.length
            : offsetNum + num;
        let newOrders = orders.slice(offsetNum, to);
        const chosenAssets = chooseTokenAssets(
          assetType,
          assetAddress,
          offset,
          num,
          idsAndUris,
          true
        );
        const statics = await fetchStatics(chosenAssets, newOrders);
        let totalLength = num === 1 ? num : idsAndUris.length;
        return { data: statics, length: totalLength };
      } else {
        const chosenAssets = chooseTokenAssets(
          assetType,
          assetAddress,
          offset,
          num,
          idsAndUris,
          sortBy === SortOption.TOKEN_ID_ASC || sortBy === SortOption.PRICE_ASC
        );
        const statics = await fetchStatics(chosenAssets);
        let totalLength = num === 1 ? num : idsAndUris.length;
        return { data: statics, length: totalLength };
      }
    },
    [
      chainId,
      assetType,
      assetAddress,
      JSON.stringify(priceRange),
      JSON.stringify(selectedOrderType),
      sortBy,
      filter,
    ]
  );

  return fetchTokenStaticData;
};

export const useERC1155TokenStaticDataCallbackArrayWithFilter = (
  { assetAddress, assetType }: TokenStaticCallbackInput,
  subcollectionId: string,
  filter: Filters | undefined,
  sortBy: SortOption
) => {
  console.log('useERC1155TokenStaticDataCallbackArrayWithFilter', {
    assetAddress,
    assetType,
    filter,
    subcollectionId,
  });
  const { chainId } = useActiveWeb3React();

  let ids: number[] = [];
  let coll = useRawcollection(assetAddress ?? '');
  if (!!subcollectionId && subcollectionId !== '0') {
    ids =
      coll?.subcollections?.find((c: any) => c.id === subcollectionId)
        ?.tokens ?? [];
  }
  const priceRange = filter?.priceRange;
  const selectedOrderType = filter?.selectedOrderType;
  const fetchTokenStaticData = useCallback(
    async (
      num: number,
      offset: BigNumber,
      setTake: (take: number) => void,
      searchId: number
    ) => {
      if (!assetAddress || !assetType) {
        console.log({ assetAddress, assetType });
        return [];
      }

      let idsAndUris: { tokenURI: string; assetId: string }[] = [];

      const CONTRACT_QUERY = QUERY_SUBSQUID_ERC1155_CONTRACT_DATA(assetAddress);
      const contractData = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], CONTRACT_QUERY);
      let totalSupply = parseInt(contractData.erc1155Contracts[0].totalSupply);
      let res = [],
        query: any,
        res1;
      if (totalSupply <= 1000) {
        query = QUERY_SUBSQUID_ERC1155_ACTIVE_ID(assetAddress, 0, totalSupply);
        res1 = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], query);
        res = res1.erc1155Tokens;
      } else {
        let from = 0;
        while (from < totalSupply) {
          query = QUERY_SUBSQUID_ERC1155_ACTIVE_ID(assetAddress, from, 1000);
          let res1 = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], query);
          for (let i = 0; i < res1.erc1155Tokens.length; i++)
            res.push(res1.erc1155Tokens[i]);
          from += 1000;
        }
      }
      for (let i = 0; i < res.length; i++) {
        if (
          (!ids.length && !searchId) ||
          (!ids.length && searchId && searchId == parseInt(res[i].numericId)) ||
          (ids.length &&
            !searchId &&
            ids.includes(parseInt(res[i].numericId))) ||
          (ids.length &&
            searchId &&
            searchId == parseInt(res[i].numericId) &&
            ids.includes(parseInt(res[i].numericId)))
        ) {
          idsAndUris.push({ tokenURI: res[i].uri, assetId: res[i].numericId });
        }
      }

      const fetchStatics = async (assets: Asset[], orders?: Order[]) => {
        console.log('assets', { assets, orders });
        if (orders && orders.length !== assets.length) {
          throw new Error('Orders/assets length mismatch');
        }

        if (!assets.length) {
          return []
        }

        const query = QUERY_SUBSQUID_ERC1155_ID_IN(
          assetAddress,
          assets.map((a) => a.assetId)
        );

        const ress = await request(TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], query);
        let tokens = ress.erc1155Tokens;
        let staticData: StaticTokenData[] = [];
        if (tokens.length) {
          staticData = assets.map((ca) => {
            let token = tokens.find((t: any) => t.numericId === ca.assetId);
            return {
              asset: ca,
              decimals: contractData.erc1155Contracts[0].decimals,
              contractURI: contractData.erc1155Contracts[0].contractURI,
              name: contractData.erc1155Contracts[0].name,
              symbol: contractData.erc1155Contracts[0].symbol,
              totalSupply: token.totalSupply,
              tokenURI: token.tokenUri,
              metadata: token.metadata,
            };
          });
        }
        return staticData.map((x, i) => {
          return {
            meta: x.metadata,
            staticData: x,
            order: orders?.[i],
          };
        });
      };
      let ordersFetch: any[] = [];
      let flag = 0;
      if (
        !(
          !priceRange ||
          priceRange.length === 0 ||
          priceRange.length !== 2 ||
          !selectedOrderType
        ) &&
        (sortBy === SortOption.TOKEN_ID_ASC ||
          sortBy === SortOption.TOKEN_ID_DESC)
      ) {
        flag = 1;
        let chosenAssets = chooseTokenAssetsAll(
          assetType,
          assetAddress,
          idsAndUris,
          sortBy === SortOption.TOKEN_ID_ASC
        );
        const rangeInWei = priceRange.map((x) =>
          parseEther(x.toString()).mul(TEN_POW_18)
        );

        let indexer = 0;
        while (1) {
          let tempChosenAssets = chosenAssets.slice(indexer, indexer + 1000);
          if (!tempChosenAssets || tempChosenAssets.length === 0) {
            break;
          }
          indexer += 1000;

          const sgAssets = tempChosenAssets.map((x) => {
            return x.id;
          });

          let query = QUERY_ACTIVE_ORDERS_FOR_FILTER(
            selectedOrderType,
            JSON.stringify(sgAssets),
            rangeInWei[0].toString(),
            rangeInWei[1].toString()
          );

          const result = await request(
            MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
            query
          );
          const orders = result?.orders;

          if (orders && orders.length > 0) {
            ordersFetch = ordersFetch.concat(orders);
          }
        }
      } else if (
        !(
          !priceRange ||
          priceRange.length === 0 ||
          priceRange.length !== 2 ||
          !selectedOrderType
        ) &&
        (sortBy === SortOption.PRICE_ASC || sortBy === SortOption.PRICE_DESC)
      ) {
        let index = 0;
        flag = 2;
        const rangeInWei = priceRange.map((x) =>
          parseEther(x.toString()).mul(TEN_POW_18)
        );
        while (1) {
          let query = QUERY_ORDERS_FOR_TOKEN_WITH_PRICE(
            assetAddress,
            selectedOrderType,
            sortBy === SortOption.PRICE_ASC,
            index,
            1000,
            rangeInWei[0].toString(),
            rangeInWei[1].toString()
          );
          const result = await request(
            MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
            query
          );

          if (!result || !result?.orders.length) {
            break;
          }
          index += 1000;
          let orders: any[] = result?.orders;
          if (orders && orders.length > 0) {
            ordersFetch = ordersFetch.concat(orders);
          }
        }
      } else if (
        sortBy === SortOption.PRICE_ASC ||
        sortBy === SortOption.PRICE_DESC
      ) {
        let index = 0;
        flag = 2;
        while (1) {
          let query = QUERY_ORDERS_FOR_TOKEN(
            assetAddress,
            sortBy === SortOption.PRICE_ASC,
            index,
            1000
          );

          const result = await request(
            MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
            query
          );

          if (!result || !result?.orders.length) {
            break;
          }
          index += 1000;
          let orders: any[] = result?.orders;
          if (orders && orders.length > 0) {
            ordersFetch = ordersFetch.concat(orders);
          }
        }
      }

      const theAssetNumber: { assetId: string; indexer: number }[] = [];
      let orders = ordersFetch.map((x, i) => {
        const o = parseOrder(x) as Order;
        const a =
          selectedOrderType === OrderType.BUY
            ? (o?.buyAsset as Asset)
            : (o?.sellAsset as Asset);
        theAssetNumber.push({ assetId: a?.assetId, indexer: i });
        return o;
      });

      if (flag == 1 && sortBy === SortOption.TOKEN_ID_ASC) {
        theAssetNumber.sort((a, b) => {
          return parseInt(a.assetId) - parseInt(b.assetId);
        });
      } else if (flag == 1 && sortBy === SortOption.TOKEN_ID_DESC) {
        theAssetNumber.sort((a, b) => {
          return parseInt(b.assetId) - parseInt(a.assetId);
        });
      }

      let tempIdsAndUris: { tokenURI: string; assetId: string }[] = [];
      let tempOrders: Order[] = [];
      if (flag !== 0) {
        theAssetNumber.map((number) => {
          let tempIdsAndUri = idsAndUris.find((idsAndUri) => {
            return idsAndUri.assetId == number.assetId;
          });
          if (tempIdsAndUri) {
            tempIdsAndUris.push(tempIdsAndUri);
            tempOrders.push(orders[number.indexer]);
          }
        });
        if (sortBy === SortOption.TOKEN_ID_DESC && flag !==1) {
          tempOrders = tempOrders.reverse();
        }
        orders = tempOrders;
        idsAndUris = tempIdsAndUris;
        let offsetNum = BigNumber.from(offset).toNumber();
        const to =
          offsetNum + num >= idsAndUris.length
            ? idsAndUris.length
            : offsetNum + num;
        let newOrders = orders.slice(offsetNum, to);
        const chosenAssets = chooseTokenAssets(
          assetType,
          assetAddress,
          offset,
          num,
          idsAndUris,
          true
        );
        const statics = await fetchStatics(chosenAssets, newOrders);
        let totalLength = num === 1 ? num : idsAndUris.length;
        return { data: statics, length: totalLength };
      } else {
        const chosenAssets = chooseTokenAssets(
          assetType,
          assetAddress,
          offset,
          num,
          idsAndUris,
          sortBy === SortOption.TOKEN_ID_ASC || sortBy === SortOption.PRICE_ASC
        );
        const statics = await fetchStatics(chosenAssets);
        let totalLength = num === 1 ? num : idsAndUris.length;
        return { data: statics, length: totalLength };
      }
    },
    [
      chainId,
      assetType,
      assetAddress,
      JSON.stringify(ids),
      JSON.stringify(priceRange),
      JSON.stringify(selectedOrderType),
      sortBy,
      filter,
    ]
  );

  return fetchTokenStaticData;
};
