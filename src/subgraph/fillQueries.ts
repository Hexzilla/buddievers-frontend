import { DEFAULT_ORDERBOOK_PAGINATION } from '../constants';
import { gql } from 'graphql-request';
import { META } from './common';
import { ASSET_FIELDS } from './orderQueries';

const ORDER_FIELDS = `
    id
    seller {
      id
    }
    sellAsset {
      ${ASSET_FIELDS}
    }
    buyAsset {
      ${ASSET_FIELDS}
    }
    strategyType {
      id
    }
    salt
    createdAt
    active
    quantity
    quantityLeft
    startsAt
    expiresAt
    askPerUnitNominator
    askPerUnitDenominator
    onlyTo
    partialAllowed
    pricePerUnit
`;

const FILL_FIELDS = `
    id,
    buyer {
        id
    },
    buyerSendsAmountFull,
    buyerSentAmount,
    sellerSendsAmountFull,
    sellerSentAmount,
    complete,
    createdAt,
    order {
        ${ORDER_FIELDS}
    }
 `;

export const QUERY_FILL = gql`
  query getFill($transactionHash: ID!) {
    ${META}
    fill(id: $transactionHash) {
        ${FILL_FIELDS}
    }
  }
`;

export const QUERY_FILL_AT_BLOCK = gql`
  query getFillAtBlock($transactionHash: ID!, $blockHeight: Block_height!) {
    ${META}
    fill(id: $transactionHash, block: $blockHeight) {
        ${FILL_FIELDS}
    }
  }
`;

export const QUERY_FILLS = gql`
  query getFills($buyer: String!) {
    ${META}
    fills(where: {buyer: $buyer}) {
        ${FILL_FIELDS}
    }
  }
`;

export const QUERY_FILLS_AT_BLOCK = gql`
  query getFills($buyer: String!, $blockHeight: Block_height!) {
    ${META}
    fills(where: {buyer: $buyer}, block: $blockHeight) {
        ${FILL_FIELDS}
    }
  }
`;

export const QUERY_LATEST_FILLS = (from: number, num: number, sortBy: string, sortDirection: string) => gql`
  query getLatestFills {
    ${META}
    latestFills: fills(orderBy: ${{'time': 'createdAt', 'price': 'createdAt'}[sortBy]}, orderDirection: ${sortDirection}, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${FILL_FIELDS}
    }
  }
`;
