import { DEFAULT_ORDERBOOK_PAGINATION } from '../constants';
import { gql } from 'graphql-request';
import { META } from './common';
import { OrderType } from 'utils/subgraph';

export const ASSET_FIELDS = `
    id,
    assetId,
    assetType,
    assetAddress
`;

const CANCEL_FIELDS = `
    id
    sellerGetsBackAmount
    createdAt
`;

const FILL_FIELDS = `
    id
    buyer {
      id
    }
    buyerSendsAmountFull
    buyerSentAmount
    sellerSendsAmountFull
    sellerSentAmount
    complete
    createdAt
    order {
      id
    }
`;

const ORDER_FIELDS = `
    id
    orderType
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
    cancel {
      ${CANCEL_FIELDS}
    }
    fills {
      ${FILL_FIELDS}
    }
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

export const QUERY_ORDER = gql`
  query getOrder($orderHash: ID!) {
    ${META}
    order: order(id: $orderHash) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ORDER_AT_BLOCK = gql`
  query getOrderAtBlock($orderHash: ID!, $block: Block_height!) {
    ${META}
    order: order(id: $orderHash, block: $block) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ORDERS = gql`
  query getOrders($seller: String!) {
    ${META}
    orders(where: {seller: $seller}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ACTIVE_ORDERS = gql`
  query getActiveOrders($seller: String!) {
    ${META}
    orders(where: {seller: $seller, active: true}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ORDERS_AT_BLOCK = gql`
  query getOrdersAtBlock($seller: String!, $block: Block_height!) {
    ${META}
    orders(where: {seller: $seller}, block: $block) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ACTIVE_ORDERS_AT_BLOCK = gql`
  query getActiveOrdersAtBlock($seller: String!, $block: Block_height!) {
    ${META}
    orders(where: {seller: $seller, active: true}, block: $block) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ASSET_ORDERS = (
  isBuy: boolean,
  onlyActive: boolean,
  assetEntityId: string
) => gql`
  query getAssetOrders {
    ${META}
    orders(where: {${onlyActive ? 'active: true, ' : ''}${
  isBuy ? 'buyAsset' : 'sellAsset'
}: "${assetEntityId}"}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ASSET_ORDERS_AT_BLOCK = (
  isBuy: boolean,
  onlyActive: boolean
) => gql`
  query getAssetOrders($asset: String!, $block: Block_height!) {
    ${META}
    orders(where: {${onlyActive ? 'active: true, ' : ''}${
  isBuy ? 'buyAsset' : 'sellAsset'
}: $asset}, block: $block) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_FLOOR_ORDER = (assetAddress: string) => gql`
  query getFloorOrder {
    ${META}
    orders(where: {active: true, sellAsset_starts_with: "${assetAddress.toLowerCase()}"}, orderBy: pricePerUnit, orderDirection: asc, first: 1) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_TOKEN_PAGE_ORDERS = (
  onlyActive: boolean,
  assetId: string,
  account: string,
  from: number,
  num: number
) => gql`
  query getTokenPageOrders {
    ${META}
    buyOrders: orders(where: {${
      onlyActive ? 'active: true, ' : ''
    }buyAsset: "${assetId}"}, orderBy: pricePerUnit, orderDirection: desc, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
    sellOrders: orders(where: {${
      onlyActive ? 'active: true, ' : ''
    }sellAsset: "${assetId}"}, orderBy: pricePerUnit, orderDirection: asc, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
    userOrdersBuy: orders(where: {${
      onlyActive ? 'active: true, ' : ''
    }seller: "${account}", buyAsset: "${assetId}"}, orderBy: createdAt, orderDirection: desc) {
      ${ORDER_FIELDS}
    }
    userOrdersSell: orders(where: {${
      onlyActive ? 'active: true, ' : ''
    }seller: "${account}", sellAsset: "${assetId}"}, orderBy: createdAt, orderDirection: desc) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_USER_ACTIVE_ORDERS = (
  account: string,
  from: number,
  num: number
) => gql`
  query getUserActiveOrders {
    ${META}
    userOrders: orders(where: {active: true, seller: "${account}"}, orderBy: createdAt, orderDirection: desc, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_LATEST_ORDERS = (from: number, num: number) => gql`
  query getUserActiveOrders {
    ${META}
    latestOrders: orders(where: {active: true}, orderBy: createdAt, orderDirection: desc, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_LATEST_BUY_ORDERS = (
  sellAssetId: string,
  from: number,
  num: number
) => gql`
  query getUserActiveOrders {
    ${META}
    latestOrders: orders(where: {active: true, sellAsset: "${sellAssetId}"}, orderBy: createdAt, orderDirection: desc, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_LATEST_SELL_ORDERS = (
  buyAssetId: string,
  from: number,
  num: number
) => gql`
  query getUserActiveOrders {
    ${META}
    latestOrders: orders(where: {active: true, buyAsset: "${buyAssetId}"}, orderBy: createdAt, orderDirection: desc, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ACTIVE_ORDERS_FOR_FILTER = (
  orderType: OrderType,
  assetIdsJSONString: string,
  lowerPPURange: string,
  upperPPURange: string
) => gql`
  query getUserActiveOrders {
    ${META}
    orders(where: {active: true, pricePerUnit_lte: "${upperPPURange}", pricePerUnit_gte: "${lowerPPURange}", ${
  orderType === OrderType.BUY ? 'buyAsset_in' : 'sellAsset_in'
}: ${assetIdsJSONString}}, orderBy: createdAt, orderDirection: desc) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ORDERS_FOR_TOKEN = (
  assetAddress: string,
  orderDirection: boolean,
  from: number,
  num: number
) => gql`
  query getUserActiveOrders {
    ${META}
    orders: orders(where: {active: true, sellAsset_starts_with : "${assetAddress?.toLowerCase()}"}, orderBy: askPerUnitNominator , orderDirection: ${
  orderDirection ? 'asc' : 'desc'
}, skip: ${from}, first: ${num ?? DEFAULT_ORDERBOOK_PAGINATION}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ORDERS_FOR_TOKEN_WITH_PRICE = (
  assetAddress: string,
  orderType: OrderType,
  orderDirection: boolean,
  from: number,
  num: number,
  lowerPPURange: string,
  upperPPURange: string
) => gql`
  query getUserActiveOrders {
    ${META}
    orders: orders(where: {active: true,  ${
      orderType === OrderType.BUY
        ? 'buyAsset_starts_with'
        : 'sellAsset_starts_with'
    }: "${assetAddress?.toLowerCase()}"}, pricePerUnit_lte: "${upperPPURange}", pricePerUnit_gte: "${lowerPPURange}", orderBy: pricePerUnit, orderDirection: ${
  orderDirection ? 'asc' : 'desc'
}, skip: ${from}, first: ${num ?? DEFAULT_ORDERBOOK_PAGINATION}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_LATEST_SELL_ORDERS_FOR_TOKEN = (
  buyAssetId: string,
  sellAssetAddress: string,
  from: number,
  num: number,
  sortBy: string,
  direction: string
) => gql`
  query getUserActiveOrders {
    ${META}
    latestOrders: orders(where: {active: true, buyAsset: "${buyAssetId}", sellAsset_starts_with: "${sellAssetAddress?.toLowerCase()}"}, orderBy: ${
  { time: 'createdAt', price: 'pricePerUnit', quantity: 'quantity' }[sortBy]
}, orderDirection: ${direction}, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_LATEST_PAYMENTTOKEN_SELL_ORDERS_FOR_TOKEN = (
  sellAssetAddress: string,
  from: number,
  num: number,
  sortBy: string,
  direction: string
) => gql`
  query getUserActiveOrders {
    ${META}
    latestOrders: orders(where: {active: true, sellAsset_starts_with: "${sellAssetAddress?.toLowerCase()}"}, orderBy: ${
  { time: 'createdAt', price: 'pricePerUnit', quantity: 'quantity' }[sortBy]
}, orderDirection: ${direction}, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_LATEST_BUY_ORDERS_FOR_TOKEN = (
  sellAssetId: string,
  buyAssetAddress: string,
  from: number,
  num: number,
  sortBy: string,
  direction: string
) => gql`
  query getUserActiveOrders {
    ${META}
    latestOrders: orders(where: {active: true, sellAsset: "${sellAssetId}", buyAsset_starts_with: "${buyAssetAddress?.toLowerCase()}"}, orderBy: ${
  { time: 'createdAt', price: 'pricePerUnit', quantity: 'quantity' }[sortBy]
}, orderDirection: ${direction}, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_LATEST_PAYMENTTOKEN_BUY_ORDERS_FOR_TOKEN = (
  buyAssetAddress: string,
  from: number,
  num: number,
  sortBy: string,
  direction: string
) => gql`
  query getUserActiveOrders {
    ${META}
    latestOrders: orders(where: {active: true, buyAsset_starts_with: "${buyAssetAddress?.toLowerCase()}"}, orderBy: ${
  { time: 'createdAt', price: 'pricePerUnit', quantity: 'quantity' }[sortBy]
}, orderDirection: ${direction}, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_LATEST_SELL_ORDERS_WITHOUT_TOKEN = (
  buyAssetId: string,
  sellAssetAddress: string,
  from: number,
  num: number
) => gql`
  query getUserActiveOrders {
    ${META}
    latestOrders: orders(where: {active: true, buyAsset: "${buyAssetId}", sellAsset_not_starts_with: "${sellAssetAddress?.toLowerCase()}"}, orderBy: createdAt, orderDirection: desc, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_LATEST_BUY_ORDERS_WITHOUT_TOKEN = (
  sellAssetId: string,
  buyAssetAddress: string,
  from: number,
  num: number
) => gql`
  query getUserActiveOrders {
    ${META}
    latestOrders: orders(where: {active: true, sellAsset: "${sellAssetId}", buyAsset_not_starts_with: "${buyAssetAddress?.toLowerCase()}"}, orderBy: createdAt, orderDirection: desc, skip: ${from}, first: ${
  num ?? DEFAULT_ORDERBOOK_PAGINATION
}) {
      ${ORDER_FIELDS}
    }
  }
`;

export const QUERY_ASSETS_BY_PRICE = (
  assetIdsJSONString: string,
  from: number,
  num: number,
  orderDirection: boolean
) => gql`
  query getAssesByPriceOrder {
    ${META}
    orders(groupBy: {
      query: {
        pricePerUnit: {
          as: "minOfPricePerUnit",
          fn: {
            aggregate: MIN
          }
        }
      },
      sort: [
        { alias: "minOfPricePerUnit", direction: ${
          orderDirection ? 'ASC' : 'DESC'
        } }
      ],
      having: {active: true, sellAsset_in: ${assetIdsJSONString}}
    }, skip: ${from}, first: ${num}) {
      groups {
        minOfPricePerUnit
      }
    }
  }
`;
