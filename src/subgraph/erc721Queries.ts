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

export const QUERY_OWNED_TOKENS = (contract: string, account: string) => gql`
query MyQuery {
  tokens(orderBy: numericId_ASC, where: {contract: {id_eq: "${contract.toLowerCase()}"}, owner: {id_eq: "${account.toLowerCase()}"}}) {
    metadata {
      attributes {
        displayType
        traitType
        value
      }
      composite
      description
      externalUrl
      id
      layers
      image
      name
      type
      artist
      artistUrl
    }
    numericId
  }
}
`;

export const QUERY_OWNED_PAGE_TOKENS = (contract : string, address : string, offset : number, limit : number) => gql`
query MyQuery {
  tokens(orderBy: numericId_ASC, limit : ${limit}, offset : ${offset},  where: {contract: {id_eq: "${contract.toLowerCase()}"}, owner: {id_eq: "${address.toLowerCase()}"}}) {
    metadata {
      attributes {
        displayType
        traitType
        value
      }
      composite
      description
      externalUrl
      id
      layers
      image
      name
      type
      artist
      artistUrl
    }
    numericId
  }
}
`;

export const QUERY_PAGE_TOKENS = (contract : string, offset : number, limit : number) => gql`
query MyQuery {
  tokens(orderBy: numericId_ASC, limit : ${limit}, offset : ${offset},  where: {contract: {id_eq: "${contract.toLowerCase()}"}}) {
    metadata {
      attributes {
        displayType
        traitType
        value
      }
      composite
      description
      externalUrl
      id
      layers
      image
      name
      type
      artist
      artistUrl
    }
    numericId
  }
}
`;


export const QUERY_ALL_TOKENS = (contract : string) => gql`
query MyQuery {
  tokens(orderBy: numericId_ASC, where: {contract: {id_eq: "${contract.toLowerCase()}"}}) {
    metadata {
      attributes {
        displayType
        traitType
        value
      }
      composite
      description
      externalUrl
      id
      layers
      image
      name
      type
      artist
      artistUrl
    }
    numericId
  }
}
`;

export const QUERY_TOKEN_BY_ID = (contract: string, id: string) => gql`
query MyQuery {
  tokens(orderBy: numericId_ASC, where: {contract: {id_eq: "${contract.toLowerCase()}"}, numericId_eq: "${id.toLowerCase()}"}) {
    metadata {
      attributes {
        displayType
        traitType
        value
      }
      composite
      description
      externalUrl
      id
      layers
      image
      name
      type
      artist
      artistUrl
    }
    numericId
    owner {
      id
    }
  }
}
`;