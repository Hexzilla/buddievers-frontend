import { useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_STAKING_ADDRESS, CONTRACT_NFT_COLLECTION } from '../constants';

const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
];

export const useCollection = () => {
  const setApprovalForAll = useCallback(async () => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_NFT_COLLECTION, abi, signer);
    const tx = await contract.setApprovalForAll(CONTRACT_STAKING_ADDRESS, true);
    console.log('setApprovalForAll', tx);
    return tx.wait();
  }, []);

  const isApprovedForAll = useCallback(async (address: string) => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_NFT_COLLECTION, abi, signer);
    const result = await contract.isApprovedForAll(address, CONTRACT_STAKING_ADDRESS);
    console.log('isApprovedForAll', result);
    return result;
  }, []);

  return {
    setApprovalForAll,
    isApprovedForAll,
  };
};
