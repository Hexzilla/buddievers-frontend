import faker from 'faker';
import { getRandomInt } from 'dev';
import { StringAssetType } from 'utils/subgraph';

export interface Token {
  id: string | number;
  address: string;
  name: string;
  bid: number;
  stock: number;
  description: string;
  media: {
    type: string;
    src: string;
  };
  bidder: string;
  price: number;
  assetType?: StringAssetType;
}

const mediaUrl = [
  'QmcT2MkFi6tubGvp9ho6wcFhkLfa6c2WGECXcttoZjr3Y9',
  'Qmdbu7Qx82pp1jTu8Tb7dynxbewCcRNksd9rPtSZr4YhdJ',
  'QmVTXagQiAaKt8NGkPZTNkLarqtRecLWFGh2X3DnRJXeux',
  'QmXF5LQ7yizoDG8UmtUyPZJrn6vay8maMjTzLeM9vRQ1Wi',
  'QmRJ9syjrzqPuFur8MSTgHftnoCVvf5VuD9SNNKb83eAmK',
];

export const getTokenById = async (
  address: string,
  assetType?: StringAssetType,
  id?: string | number
): Promise<Token | null> => {
  return {
    id: id || faker.datatype.number(10),
    name: faker.name.title(),
    bid: faker.datatype.number(10),
    stock: faker.datatype.number(10),
    description: faker.lorem.sentence(25),
    media: {
      type: 'image',
      src: faker.helpers.randomize(mediaUrl),
    },
    bidder: faker.finance.ethereumAddress(),
    price: faker.datatype.number(10),
    assetType,
    address,
  };
};

export const getCollection = async (
  address: string,
  assetType?: StringAssetType,
  id?: string | number
): Promise<Token[]> => {
  const collection = Array.from({ length: getRandomInt(1, 10) });
  return Promise.all(
    collection.map(() => getTokenById(address, assetType, id))
  ) as Promise<Token[]>;
};

const types: ('nft' | 'collection')[] = ['nft', 'collection'];

export const checkType = async (
  address?: string
): Promise<'nft' | 'collection'> => {
  //console.log(address);
  return types[getRandomInt(0, 1)];
};
