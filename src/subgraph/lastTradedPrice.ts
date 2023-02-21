import { gql } from 'graphql-request';
import { META } from './common';

const LAST_TRADED_PRICE_FIELDS = `
  id
  user {
    id
  }
  amount
  unitPrice
  orderType
`;

export const QUERY_LAST_TRADED_PRICE = (assetEntityId: string) => gql`
  query getLTP {
    ${META}
    lastTradedPrice: lastTradedPrice(id: "${assetEntityId ?? ''}") {
      id
      user {
        id
      }
      amount
      unitPrice
      orderType
      askPerUnitNominator
      askPerUnitDenominator
    }
  }
`;
