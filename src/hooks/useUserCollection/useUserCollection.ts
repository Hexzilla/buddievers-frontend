import { BigNumber } from '@ethersproject/bignumber';
import { request } from 'graphql-request';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback } from 'react';
import { Asset } from 'hooks/marketplace/types';
import {
  StaticTokenData,
  useTokenStaticDataCallbackArray,
} from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { QUERY_SUBSQUID_USER_ERC721 } from 'subgraph/erc721Queries';
import { QUERY_SUBSQUID_USER_ERC1155 } from 'subgraph/erc1155Queries';
import { getAssetEntityId, StringAssetType } from 'utils/subgraph';
import { useRawCollectionsFromList } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import {
  DEFAULT_CHAIN,
  TOKEN_SUBSQUID_URLS,
} from '../../constants';

export interface OwnedTokens {
  id: string;
  ownedTokens: { id: string; contract: { address: string } }[];
}

export interface TokenOwner {
  id: string;
  balance: string;
  token: { id: string; contract: { id: string } };
}

export interface UserCollection {
  [key: string]: {
    meta: TokenMeta | undefined;
    staticData: StaticTokenData;
    asset: Asset;
    balance: string;
  }[];
}

export const useUserCollection = () => {
  const { chainId } = useActiveWeb3React();
  const staticCallback = useTokenStaticDataCallbackArray();
  const rawCollections = useRawCollectionsFromList();
  console.log('YOLO fetchUserCollection');

  const fetchUserCollection = useCallback(
    async (account: string) => {
      const result: UserCollection = {};
      const fetches = rawCollections.map(async (collection) => {

        let assetsAndBalances: {assets: Asset[], balances: string[]};
        if (collection.type === 'ERC721') {
          const query = QUERY_SUBSQUID_USER_ERC721(account);
          const response = await request( TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], query);

          if (!response) {
            result[collection.display_name] = [];
            return;
          }

          const ot: OwnedTokens = response.erc721Owners?.[0];
          if (!ot) {
            result[collection.display_name] = [];
            return;
          }

          const assets = ot.ownedTokens.map((x) => {
            const aid = x.id.split("-");
            if (!x?.contract?.address) {
              return undefined as unknown as Asset
            }
            return {
              assetId: aid[1],
              id: getAssetEntityId(x.contract?.address, aid[1]),
              assetType: StringAssetType.ERC721,
              assetAddress: x.contract?.address,
            };
          }).filter(x => !!x)

          assetsAndBalances = {
            assets,
            balances: assets.map(x => '1')
          }
        } else {
          const query = QUERY_SUBSQUID_USER_ERC1155(account);
          const response = await request( TOKEN_SUBSQUID_URLS[chainId ?? DEFAULT_CHAIN], query);

          if (!response) {
            result[collection.display_name] = [];
            return;
          }

          const to: TokenOwner[] = response.erc1155TokenOwners;
          if (!to) {
            result[collection.display_name] = [];
            return;
          }

          const balances: string[] = []
          const assets = to
            .filter((x) => x.balance !== '0')
            .map((x) => {
              // const aid = BigNumber.from(x.token.id).toString();
              const aid = x.token.id.split("-");
              balances.push(x.balance)
              return {
                assetId: aid[1],
                id: getAssetEntityId(x.token.contract.id, aid[1]),
                assetType: StringAssetType.ERC1155,
                assetAddress: x.token.contract.id,
              };
            });

            assetsAndBalances = {
              assets,
              balances
            }
        }

        const staticDatas = await staticCallback(assetsAndBalances.assets);

        const datas = staticDatas.map((sd, i) => {
          return {
            meta: sd.meta,
            staticData: sd.staticData,
            asset: assetsAndBalances.assets[i],
            balance: assetsAndBalances.balances[i]
          };
        });
        result[collection.display_name] = datas;
        return;
      });

      await Promise.all(fetches);
      return result;
    },
    [chainId]
  );

  return fetchUserCollection;
};
