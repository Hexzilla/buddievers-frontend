import { gql } from 'graphql-request';


// export const QUERY_ASSETS_BY_PRICE = (
//   assetIdsJSONString: string,
//   from: number,
//   num: number,
//   orderDirection: boolean
// ) => gql`
//   query getAssesByPriceOrder {
//     ${META}
//     orders(groupBy: {
//       query: {
//         pricePerUnit: {
//           as: "minOfPricePerUnit",
//           fn: {
//             aggregate: MIN
//           }
//         }
//       },
//       sort: [
//         { alias: "minOfPricePerUnit", direction: ${
//           orderDirection ? 'ASC' : 'DESC'
//         } }
//       ],
//       having: {active: true, sellAsset_in: ${assetIdsJSONString}}
//     }, skip: ${from}, first: ${num}) {
//       groups {
//         minOfPricePerUnit
//       }
//     }
//   }
// `;
export const QUERY_ASSETS_BY_ADDRESS = (address: string, from: number, count: number) => gql`
    query MyQuery {
        tokens(
            orderBy: numericId_ASC, 
            where: {contract: {id_eq: "0xf27a6c72398eb7e25543d19fda370b7083474735"}, owner: {id_eq: "${address.toLowerCase()}"}}, offset: ${from}, limit: ${count}) 
            {
                metadata {
                    artist
                    artistUrl
                    externalUrl
                    description
                    id
                    image
                    name
                }
                numericId
                tokenUri
                id
            }
    }
  
`

export const QUERY_ASSETS_BY_IDS = (ids: (number | string)[], from: number, count: number) => gql`
query MyQuery {
    tokens(offset: ${from}, limit: ${count}, where: {contract: {id_eq: "0xf27a6c72398eb7e25543d19fda370b7083474735"},  
    numericId_in: [${ids.map((id) => typeof id === 'string' ? Number.parseInt(id) : id)}]}) {
      contract {
        artist
        artistUrl
        contractURI
        decimals
        contractURIUpdated
        externalLink
        id
        image
        metadataName
        name
        startBlock
        symbol
        totalSupply
        uniqueOwnersCount
      }
      id
      numericId
      metadata {
        id
        artist
        artistUrl
        composite
        description
        externalUrl
        image
        layers
        name
        type
      }
      tokenUri
      createdAt
      compositeTokenUri
    }
  }
  
`
