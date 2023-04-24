import { useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_STAKING_ADDRESS } from '../constants';
import { useCollection } from './useCollection';

const contractAddress = CONTRACT_STAKING_ADDRESS;
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
    "name": "unstake",
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
        "components": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct BudStaking.StakedToken[]",
        "name": "_stakedTokens",
        "type": "tuple[]"
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
  {
    "inputs": [],
    "name": "startTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
];

export const useStaking = () => {
  const { setApprovalForAll, isApprovedForAll } = useCollection();

  const getStartTime = useCallback(async () => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const result = await contract.startTime();
    console.log('startTime', result?.toNumber());
    return result.toNumber();
  }, []);

  const stake = useCallback(async (address: string, tokenIds: number[]) => {
    if (!window.ethereum) return;

    const approved = await isApprovedForAll(address);
    console.log('approved', approved, Boolean(approved))
    if (!approved) {
      const ar = await setApprovalForAll();
      if (!ar) {
        console.error("approve error");
        return null;
      }
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.stake(tokenIds);
    console.log('stake', tx);
    return tx.wait();
  }, [isApprovedForAll, setApprovalForAll]);

  const unstake = useCallback(async (tokenIds: number[]) => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.unstake(tokenIds);
    console.log('unstake', tx);
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
    getStartTime,
    stake,
    unstake,
    claimRewards,
    userStakeInfo,
  };
};
