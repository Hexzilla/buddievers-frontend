import { useMemo } from 'react';

export const useCurrencyLogo = (address?: string) => {
  return useMemo(() => {
    if (!address) {
      return undefined;
    }
    return `https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/${address}.png`;
  }, [address]);
};
