import { gql } from 'graphql-request';

export const QUERY_SUBSQUID_USER_ERC721 = (account: string) => gql`
  query getUserActiveOrders {
    erc721Owners(limit: 1000, where: {id_eq: "${account.toLowerCase()}"}) {
      id,
      ownedTokens {
        id,
        contract {
          address
        }
      }
    }
  }
`;

export const QUERY_SUBSQUID_ERC721_ACTIVE_ID = (
  address: string,
  from: number,
  count: number
) => gql`
  query getUserActiveOrders {
    erc721Tokens(
      where: {
        contract: { id_startsWith: "${address.toLowerCase()}" }
        owner: { id_not_eq: "0x0000000000000000000000000000000000000000" }
      }
      orderBy: numericId_ASC
      offset: ${from}
      limit: ${count}
    ){
      numericId
      tokenUri
    }
  }
`;

export const QUERY_SUBSQUID_ERC721_OWNED_ID = (
  address: string,
  from: number,
  count: number,
  owner: string
) => gql`
  query getUserActiveOrders {
    erc721Tokens(
      where: {
        contract: { id_startsWith: "${address.toLowerCase()}" }
        owner: { id_eq: "${owner.toLowerCase()}" }
      }
      orderBy: numericId_ASC
      offset: ${from}
      limit: ${count}
    ){
      numericId
      tokenUri
    }
  }
`;

export const QUERY_SUBSQUID_ERC721_NOTOWNED_ID = (
  address: string,
  from: number,
  count: number,
  owner: string
) => gql`
  query getUserActiveOrders {
    erc721Tokens(
      where: {
        contract: { id_startsWith: "${address.toLowerCase()}" }
        owner: { id_not_eq: "${owner.toLowerCase()}" }
      }
      orderBy: numericId_ASC
      offset: ${from}
      limit: ${count}
    ){
      numericId
      tokenUri
    }
  }
`;

export const QUERY_SUBSQUID_ERC721_ID_IN = (
  address: string,
  ids: (number | string)[]
) => gql`
  query getTokensIdInArray {
    erc721Tokens(
      limit: 1000,
      orderBy: numericId_ASC,
      where: { 
        contract: { id_startsWith: "${address.toLowerCase()}" }
        numericId_in: [${ids.map((id) =>
  typeof id === 'string' ? Number.parseInt(id) : id
)}]
      }
    ){
      numericId
      tokenUri
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

export const QUERY_SUBSQUID_ERC721_CONTRACT_DATA = (address: string) => gql`
query getUserActiveOrders {
  erc721Contracts(limit: 1000, where: {id_startsWith: "${address.toLowerCase()}"}) {
    name
    symbol
    totalSupply
    decimals
    contractURI
    address
  }
}
`;

