import { ethers } from 'ethers';
import { UpdateOptions } from 'react-toastify';

export const toastOptions = (message: string, type: string = 'error') => {
  return {
    render: message,
    type,
    isLoading: false,
    autoClose: 2000,
  } as UpdateOptions;
};

export const shortAddress = (address: string) => {
  if (!address || address.length < 10) {
    return address;
  }
  return (
    address.substring(0, 6) +
    '...' +
    address.substring(address.length - 4, address.length)
  );
};

export const formatNumber = (value: number, digits: number = 4) => {
  // return value === 0 || value >= 1 ? value.toFixed(digits) : '' + value;
  return value.toFixed(digits);
};

export const getBalance = async (account: string) => {
  if (!window.ethereum) return;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return await provider.getBalance(account);
}
