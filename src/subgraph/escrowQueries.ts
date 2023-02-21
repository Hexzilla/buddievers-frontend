import { gql } from 'graphql-request';
import { META } from './common';

const ESCROW_BALANCE_FIELDS = `
  id
  token {
    id
    assetId
    assetAddress
    assetType
  }
  quantity
  user {
    id
  }
`;

export const QUERY_ESCROW_BALANCE_AT_BLOCK = gql`
  query getEscrowBalance($id: ID!, $block: Block_height!) {
    ${META}
    escrowBalance(id: $id, block: $block) {
    	${ESCROW_BALANCE_FIELDS}
    }
  }
`;

export const QUERY_ESCROW_BALANCE = gql`
  query getEscrowBalance($id: ID!) {
    ${META}
    escrowBalance(id: $id) {
    	${ESCROW_BALANCE_FIELDS}
    }
  }
`;

export const QUERY_ESCROW_BALANCES_OF_USER = gql`
  query getEscrowBalancesOfUser($user: String!) {
    ${META}
    escrowBalances(where: {user: $user}) {
    	${ESCROW_BALANCE_FIELDS}
    }
  }
`;

export const QUERY_NONZERO_ESCROW_BALANCES_OF_USER = gql`
  query getNonZeroEscrowBalancesOfUser($user: String!) {
    ${META}
    escrowBalances(where: {user: $user, quantity_gt: 0}) {
    	${ESCROW_BALANCE_FIELDS}
    }
  }
`;

export const QUERY_ESCROW_BALANCES_OF_USER_AT_BLOCK = gql`
  query getEscrowBalancesOfUserAtBlock($user: String!, $block: Block_height!) {
    ${META}
    escrowBalances(where: {user: $user}, block: $block) {
    	${ESCROW_BALANCE_FIELDS}
    }
  }
`;

export const QUERY_NONZERO_ESCROW_BALANCES_OF_USER_AT_BLOCK = gql`
  query getNonZeroEscrowBalancesOfUserAtBlock($user: String!, $block: Block_height!) {
    ${META}
    escrowBalances(where: {user: $user, block: $block, quantity_gt: 0}) {
    	${ESCROW_BALANCE_FIELDS}
    }
  }
`;
