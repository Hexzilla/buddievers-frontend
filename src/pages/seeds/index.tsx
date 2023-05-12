import { MarketProvider } from 'context/MarketContext/Provider';
import TokenProfile from './TokenProfile';
import ItemTable from './ItemTable';

const Seeds = () => {
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
