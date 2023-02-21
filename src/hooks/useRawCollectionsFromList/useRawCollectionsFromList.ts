import { useActiveWeb3React } from 'hooks';
import { useMemo } from 'react';

import collectionsList from '../../assets/data/collections';

import * as yup from 'yup';
import { StringAssetType } from 'utils/subgraph';

const enum Indexing {
  Sequential = 'sequential',
  None = 'none',
}

export type RawSubcollection = {
  id: string;
  uri: string;
  tokens: number[];
};

export type AuctionParams = {
  ids: string[];
  deadline: string;
};

export type RawCollection = {
  chainId: number;
  address: string;
  display_name: string;
  symbol: string;
  type: StringAssetType;
  indexing: Indexing;
  contractURI: string;
  tags: string[];
  min_items: number;
  decimals?: number;
  maxId?: number;
  minId: number;
  idSearchOn: boolean;
  subcollections?: RawSubcollection[];
  auction?: AuctionParams;
  plot?: boolean;
  plotMap?: string;
  floorDisplay?: boolean;
  ordersDisabled?: boolean;
  transferDisabled?: boolean;
  transferDisabledFor?: string[];
  ordersDisabledFor?: string[];
  hasVersion2?: boolean;
  showAttributes?: boolean;
};

export type RawCollectionList = {
  name: string;
  collections: RawCollection[];
};

const collectionListSchema = yup.object<RawCollectionList>({
  name: yup.string().required(),
  collections: yup
    .array()
    .of(
      yup
        .object<RawCollection>({
          min_items: yup.number().required(),
          chainId: yup.number().required(),
          floorDisplay: yup.boolean().notRequired().default(false),
          address: yup
            .string()
            .isAddress('Expected a valid Ethereum address.')
            .required(),
          display_name: yup.string().required(),
          symbol: yup.string().required(),
          type: yup
            .mixed<StringAssetType>()
            .oneOf([
              StringAssetType.ERC20,
              StringAssetType.ERC1155,
              StringAssetType.ERC721,
            ])
            .required(),
          indexing: yup
            .mixed<Indexing>()
            .oneOf([Indexing.Sequential, Indexing.None])
            .required(),
          contractURI: yup.string().required(),
          tags: yup.array().of(yup.string().required()).required(),
          decimals: yup.number().optional(),
          minId: yup.number().required(),
          maxId: yup.number().optional(),
          subcollections: yup.array(),
          idSearchOn: yup.boolean().required(),
          ordersDisabled: yup.boolean().optional().default(false),
          transferDisabled: yup.boolean().optional().default(false),
          ordersDisabledFor: yup
            .array()
            .of(yup.string().required())
            .optional()
            .default(undefined),
          transferDisabledFor: yup
            .array()
            .of(yup.string().required())
            .optional()
            .default(undefined),
          plot: yup.boolean().optional(),
          hasVersion2: yup.boolean().optional().default(false),
          showAttributes: yup.boolean().optional().default(false),
          auction: yup
            .object<AuctionParams>({
              deadline: yup.string(),
              ids: yup.array().of(yup.string().required()).required(),
            })
            .optional(),
        })
        .required()
    )
    .required(),
});

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useRawCollectionsFromList(): RawCollection[] {
  const { chainId } = useActiveWeb3React();
  const list = useMemo(() => {
    if (!chainId) {
      return [];
    }
    const rawList = collectionListSchema.cast(collectionsList);
    return rawList?.collections.filter((x) => x.chainId === chainId) ?? [];
  }, [chainId]);

  return list;
}

export function useRawcollection(address: string) {
  const { chainId } = useActiveWeb3React();
  const collections = useRawCollectionsFromList();
  const collection = useMemo(() => {
    const collection = collections.find(
      (collection) =>
        collection.address.toLowerCase() === address?.toLowerCase()
    );
    return collection;
  }, [chainId, address]);

  return collection;
}

export function useAuction(address: string, tokenId: string) {
  const x = useRawcollection(address.toLowerCase());

  if (!x?.auction) {
    return undefined;
  }

  const found = (x.auction.ids ?? []).find((id) => id === tokenId);

  return found ? x.auction : undefined;
}
