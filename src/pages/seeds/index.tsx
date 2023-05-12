import { useEffect } from 'react';

import { MarketProvider } from 'context/MarketContext/Provider';
import { useMarketContext } from 'context/MarketContext';
import TokenProfile from './TokenProfile';
import ItemTable from './ItemTable';

const Seeds = () => {
  const { refresh } = useMarketContext();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <>
      <TokenProfile />
      <ItemTable />
    </>
  );
};

const SeedsWrapper = () => (
  <MarketProvider>
    <Seeds />
  </MarketProvider>
);

export default SeedsWrapper;
