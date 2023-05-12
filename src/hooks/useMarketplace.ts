import { useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_MARKETPLACE } from '../constants';
import { useCollection } from './useCollection';
import { useSeedToken } from './useSeedToken';
import abis from './abis.json';

const contractAddress = CONTRACT_MARKETPLACE;
const abi = abis.marketplace;

export const useMarketplace = () => {
  const { setApprovalForAll, isApprovedForAll } = useCollection();
  const { approve, allowance } = useSeedToken();

  const getOrders = useCallback(async () => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    return await contract.orderArray();
  }, []);

  const addSellOrder = useCallback(
    async (
      address: string,
      quantity: number,
      price: number,
      expiration: number
    ) => {
      if (!window.ethereum) return;

      const allownced = await allowance(address, contractAddress);
      console.log('allownced', allownced);
      if (!allownced || !allownced.toNumber()) {
        const ar = await approve(contractAddress);
        if (!ar) {
          console.error('approve error');
          return null;
        }
      }

      console.log('addSellOrder', address, quantity, price, expiration);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const priceToWei = ethers.utils.parseUnits(price.toString(), 'ether');
      const tx = await contract.addSellOrder(quantity, priceToWei, expiration);
      console.log('addSellOrder', tx);
      return tx.wait();
    },
    [isApprovedForAll, setApprovalForAll]
  );

  const unstake = useCallback(async (tokenIds: number[]) => {
    if (!window.ethereum) return;

    /*
    const approved = await isApprovedForAll(address);
      console.log('approved', approved, Boolean(approved));
      if (!approved) {
        const ar = await setApprovalForAll();
        if (!ar) {
          console.error('approve error');
          return null;
        }
      }*/

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
    getOrders,
    addSellOrder,
    unstake,
    claimRewards,
    userStakeInfo,
  };
};
