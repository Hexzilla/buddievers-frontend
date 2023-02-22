import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

const whiteLists = ['0x5421AB17Ae9130ba2c837ECae9B0251813bc2921', '0x2d3Bee3B347C29ff6712E1365BB08F7Af14Ae6F7']

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getMerkleTree = () => {
  const leafNodes = whiteLists.map(address => keccak256(address));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  return merkleTree;
}

export const getRootHash = () => {
  const merkleTree = getMerkleTree();
  const rootHash = merkleTree.getRoot();

  return rootHash;
}

export const getMerkleProof = (address: string) => {
  const clameAddress = keccak256(address);
  const merkleTree = getMerkleTree();
  const merkleProof = merkleTree.getProof(clameAddress);

  return merkleProof
}