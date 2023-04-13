import { useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../../constants';

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
  const stake = useCallback(async (tokenIds: number[]) => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.stake(tokenIds);
      console.log('stake', tx);
      return tx;      
    } catch (err) {
      console.error(err);
    }
  }, []);

  const withdraw = useCallback(async (tokenIds: number[]) => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.withdraw(tokenIds);
      console.log('withdraw', tx);
      return tx;
    } catch (err) {
      console.error(err);
    }
  }, []);

  const claimRewards = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.claimRewards();
      console.log('claimRewards', tx);
      return tx;
    } catch (err) {
      console.error(err);
    }
  }, []);

  const userStakeInfo = useCallback(async (address: string) => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const result = await contract.userStakeInfo(address);
      console.log('userStakeInfo', result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }, []);

  return {
    stake,
    withdraw,
    claimRewards,
    userStakeInfo,
  };
};
