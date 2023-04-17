import { useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../../constants';
import { useCollection } from './useCollection';

const contractAddress = CONTRACT_ADDRESS;
const abi = [
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "userStakeInfo",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "_stakedTokenIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "_availableRewards",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
];

export const useStaking = () => {
  const { setApprovalForAll, isApprovedForAll } = useCollection();

  const stake = useCallback(async (address: string, tokenIds: number[]) => {
    if (!window.ethereum) return;

    const approved = await isApprovedForAll(address);
    console.log('approved', approved, Boolean(approved))
    if (!approved) {
      await setApprovalForAll();
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.stake(tokenIds);
    console.log('stake', tx);
    return tx.wait();
  }, [isApprovedForAll, setApprovalForAll]);

  const withdraw = useCallback(async (tokenIds: number[]) => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.withdraw(tokenIds);
    console.log('withdraw', tx);
    return tx.wait();
  }, []);

  const claimRewards = useCallback(async () => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.claimRewards();
    console.log('claimRewards', tx);
    return tx.wait();
  }, []);

  const userStakeInfo = useCallback(async (address: string) => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    return await contract.userStakeInfo(address);
  }, []);

  return {
    stake,
    withdraw,
    claimRewards,
    userStakeInfo,
  };
};
