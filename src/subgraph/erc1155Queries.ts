import { gql } from 'graphql-request';

export const QUERY_SUBSQUID_USER_ERC1155 = (account: string) => gql`
  query getUserTokens {
    erc1155TokenOwners(limit: 1000, where: {owner: {id_eq: "${account.toLowerCase()}"}}) {
      id,
      balance
      token {
        id
        contract {
          id
        }
      }
    }
  }
`;

export const QUERY_SUBSQUID_ERC1155_ACTIVE_ID = (
  address: string,
  from: number,
  count: number
) => gql`
  query getUserActiveOrders {
    erc1155Tokens(orderBy: numericId_ASC, where: {contract: {id_startsWith: "${address.toLowerCase()}"}}, limit: ${count}, offset:  ${from}) {
      numericId
      tokenUri
      totalSupply
    }
  }
`;

export const QUERY_SUBSQUID_ERC1155_OWNED_ID = (
  address: string,
  from: number,
  count: number,
  owner: string
) => gql`
  query getUserActiveOrders {
    erc1155Tokens(
      where: {
        contract: { id_startsWith: "${address.toLowerCase()}" }
      }
      orderBy: numericId_ASC
      offset: ${from}
      limit: ${count}
    ) {
      numericId
      tokenUri
      totalSupply
    }
  }
`;

export const QUERY_SUBSQUID_ERC1155_NOTOWNED_ID = (
  address: string,
  from: number,
  count: number,
  owner: string
) => gql`
  query getUserActiveOrders {
    erc1155Tokens(
      where: {
        contract: { id_startsWith: "${address.toLowerCase()}" }
      }
      orderBy: numericId_ASC
      offset: ${from}
      limit: ${count}
    ) {
      numericId
      tokenUri
      totalSupply
    }
  }
`;

export const QUERY_SUBSQUID_ERC1155_ID_IN = (
  address: string,
  ids: (number | string)[]
) => gql`
  query getTokensIdInArray {
    erc1155Tokens(
      limit: 1000,
      orderBy: numericId_ASC,
      where: { 
        contract: { id_startsWith: "${address.toLowerCase()}" }
        numericId_in: [${ids.map((id) =>
          typeof id === 'string' ? Number.parseInt(id) : id
        )}]
      }
    ) {
      numericId
      tokenUri
      totalSupply
      metadata {
        attributes {
          displayType
          traitType
          value
        }
        description
        id
        image
        name
        type
      }
    }
  }
`;

export const QUERY_SUBSQUID_ERC1155_CONTRACT_DATA = (address: string) => gql`
query getUserActiveOrders {
  erc1155Contracts(limit: 1000, where: {id_startsWith: "${address.toLowerCase()}"}) {
    name
    symbol
    totalSupply
    decimals
    contractURI
    address
  }
}
`;
