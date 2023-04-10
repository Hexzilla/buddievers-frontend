import { Routes, Route } from 'react-router-dom';
import HomePage from './home';
import FAQs from './FAQs';
import FreshTradesPage from './freshtrades';
import { Layout, MintLayout } from 'components';
import MarketplacePage from './marketplace';
import MarketBuddies from './marketbuddies';
import MarketplaceDetail from './marketplacedetail';
// import MintSoon from './mintSoon';
import Seeds from './seeds';
import CoffeeShop from './coffeeshop';
import Inventory from './myNFTs';
import MoonBuilder from './moonbuilder';
import Work from './work';

export const Routing = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/faqs" element={<FAQs />} />
      {/* <Route path="/mint" element={<MintSoon />} /> */}
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/moonbuddies" element={<MarketBuddies />} />
      <Route path="/buddieDetail" element={<MarketplaceDetail />} />
      <Route path="/seeds" element={<Seeds />} />
      <Route path="/coffeeshop" element={<CoffeeShop />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/builder/:tokenId" element={<MoonBuilder />} />
      <Route path="/work" element={<Work />} />
    </Route>
    <Route element={<MintLayout />}>
      <Route path="/mint" element={<FreshTradesPage />} />
    </Route>
  </Routes>
);
