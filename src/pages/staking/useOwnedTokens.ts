import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../../constants';

const contractAddress = CONTRACT_ADDRESS;
const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const useOwnedTokenBalance = (address: string | null | undefined) => {
  const [balance, setBalance] = useState<number | null>(null);

  const getBalance = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const balance = await contract.balanceOf(address);

      console.log('OwnedTokenBalance', balance?.toNumber());
      setBalance(balance?.toNumber());
    } catch (err) {
      console.error(err);
    }
  }, [address]);

  useEffect(() => {
    address && getBalance();
  }, [address, getBalance]);

  return balance;
};
