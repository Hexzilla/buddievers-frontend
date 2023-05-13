import { useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_SEEDS_ADDRESS } from '../constants';
import abis from './abis.json';

const abi = abis.seedToken;

export const useSeedToken = () => {
  const approve = useCallback(async (spender: string) => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_SEEDS_ADDRESS, abi, signer);
    const amount = ethers.utils.parseUnits('1000000000', 'ether');
    const tx = await contract.approve(spender, amount);
    return tx.wait();
  }, []);

  const allowance = useCallback(async (owner: string, spender: string) => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_SEEDS_ADDRESS, abi, signer);
    return await contract.allowance(owner, spender);
  }, []);

  const balanceOf = useCallback(async (account: string) => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_SEEDS_ADDRESS, abi, signer);
    return await contract.balanceOf(account);
  }, []);

  return {
    approve,
    allowance,
    balanceOf,
  };
};
