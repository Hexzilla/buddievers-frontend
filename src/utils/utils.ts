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
