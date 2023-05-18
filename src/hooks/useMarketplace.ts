import { useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_MARKETPLACE } from '../constants';
import { useSeedToken } from './useSeedToken';
import abis from './abis.json';

const contractAddress = CONTRACT_MARKETPLACE;
const abi = abis.marketplace;

export const useMarketplace = () => {
  const { approve, allowance } = useSeedToken();

  const getOrders = useCallback(async () => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    return await contract.getOrderArray();
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
      if (!allownced || !allownced.gt(ethers.BigNumber.from('0'))) {
        const ar = await approve(contractAddress);
        if (!ar) {
          console.error('approve error');
          return null;
        }
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const quantityToWei = ethers.utils.parseUnits(quantity.toString(), 'ether');
      const priceToWei = ethers.utils.parseUnits(price.toString(), 'ether');
      const tx = await contract.addSellOrder(quantityToWei, priceToWei, expiration);
      return tx.wait();
    },
    [allowance, approve]
  );

  const addBuyOrder = useCallback(
    async (
      quantity: number,
      price: number,
      expiration: number
    ) => {
      if (!window.ethereum) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const quantityToWei = ethers.utils.parseUnits(quantity.toString(), 'ether');
      const priceToWei = ethers.utils.parseUnits(price.toString(), 'ether');
      const totalPrice = ethers.utils.parseUnits((quantity * price).toString(), 'ether');
      const tx = await contract.addBuyOrder(quantityToWei, priceToWei, expiration, { value: totalPrice });
      return tx.wait();
    },
    []
  );

  const updateSellOrder = useCallback(
    async (
      address: string,
      orderId: string,
      quantity: number,
      price: number,
      expiration: number
    ) => {
      if (!window.ethereum) return;

      const allownced = await allowance(address, contractAddress);
      if (!allownced || !allownced.gt(ethers.BigNumber.from('0'))) {
        const ar = await approve(contractAddress);
        if (!ar) {
          console.error('approve error');
          return null;
        }
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const quantityToWei = ethers.utils.parseUnits(quantity.toString(), 'ether');
      const priceToWei = ethers.utils.parseUnits(price.toString(), 'ether');
      const tx = await contract.updateSellOrder(orderId, quantityToWei, priceToWei, expiration);
      return tx.wait();
    },
    [allowance, approve]
  );

  const updateBuyOrder = useCallback(
    async (
      orderId: string,
      quantity: number,
      price: number,
      expiration: number
    ) => {
      if (!window.ethereum) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const quantityToWei = ethers.utils.parseUnits(quantity.toString(), 'ether');
      const priceToWei = ethers.utils.parseUnits(price.toString(), 'ether');
      const totalPrice = ethers.utils.parseUnits((quantity * price).toString(), 'ether');
      const tx = await contract.updateBuyOrder(orderId, quantityToWei, priceToWei, expiration, { value: totalPrice });
      return tx.wait();
    },
    []
  );

  const removeOrder = useCallback(async (orderId: string) => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.removeOrder(orderId);
    return tx.wait();
  }, []);

  const buyTokenByOrderId = useCallback(async (orderId: string, quantity: number, unitPrice: number) => {
    if (!window.ethereum) return;
    console.log('buyTokenByOrderId', orderId, quantity, unitPrice);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const quantityToWei = ethers.utils.parseUnits(quantity.toString(), 'ether');
    const totalPrice = ethers.utils.parseUnits((unitPrice * quantity).toString(), 'ether');
    const tx = await contract.buyTokenByOrderId(orderId, quantityToWei, { value: totalPrice });
    console.log('buyTokenByOrderId', tx);
    return tx.wait();
  }, []);

  const sellTokenByOrderId = useCallback(async (address: string, orderId: string, quantity: number) => {
    if (!window.ethereum) return;
    console.log('sellTokenByOrderId', orderId, quantity);

    const allownced = await allowance(address, contractAddress);
    if (!allownced || !allownced.gt(ethers.BigNumber.from('0'))) {
      const ar = await approve(contractAddress);
      if (!ar) {
        console.error('approve error');
        return null;
      }
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const quantityToWei = ethers.utils.parseUnits(quantity.toString(), 'ether');
    const tx = await contract.sellTokenByOrderId(orderId, quantityToWei);
    console.log('sellTokenByOrderId', tx);
    return tx.wait();
  }, [allowance, approve]);

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
    addBuyOrder,
    updateSellOrder,
    updateBuyOrder,
    removeOrder,
    buyTokenByOrderId,
    sellTokenByOrderId,
    userStakeInfo,
  };
};
