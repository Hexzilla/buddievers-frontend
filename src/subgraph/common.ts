import { gql } from 'graphql-request';

export const META = `
_meta {
  block {
    hash,
    number
  }
}
`;

export const QUERY_MARKETPLACE_STATE = () => gql`
  query getMarketplaceStat {
    marketplaceStat(id: "1") {
      activeBuyOrderNum
      activeSellOrderNum
      buyOrderFillNum
      sellOrderFillNum
    }
  }
`;

export const QUERY_COLLECTION_STATE = (collectionId: string) => gql`
  query getCollectionState {
    collectionStat(id: "${collectionId}") {
      activeBuyOrderNum
      activeSellOrderNum
      totalVolume
      tradeCount
    }
  }
`;