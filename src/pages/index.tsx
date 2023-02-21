import { Routes, Route } from 'react-router-dom';
import CollectionPage from './collection';
import HomePage from './home';
import TokenPage from './token';
import MyOrdersPage from './yourorders';
import FreshOrdersPage from './freshorders';
import FreshTradesPage from './freshtrades';
import { PurchaseDialog, BidDialog } from 'components';
import { CancelDialog } from 'components/CancelDialog/CancelDialog';
import { TransferDialog } from 'components/TransferDiaog/TransferDialog';
import { CollectionListPage } from './collection-list';
import MintPage from './mint';
import MyNFTsPage from './mynfts';
import { SubcollectionListPage } from './subcollection-list';
import AuctionListPage from './auctions';

export const Routing = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/collections" element={<CollectionListPage />} />
    <Route
      path="/collection/:type/:address/:subcollectionId"
      element={
        <>
          <PurchaseDialog />
          <CollectionPage />
        </>
      }
    />
    <Route
      path="/token/:type/:address/:id"
      element={
        <>
          <CancelDialog />
          <PurchaseDialog />
          <BidDialog />
          <TransferDialog /> <TokenPage />
        </>
      }
    />
    <Route path="/workbench" element={<MintPage />} />
    <Route
      path="/freshoffers"
      element={
        <>
          <PurchaseDialog /> <FreshOrdersPage />
        </>
      }
    />
    <Route path="/freshtrades" element={<FreshTradesPage />} />
    <Route
      path="/myoffers"
      element={
        <>
          <CancelDialog /> <PurchaseDialog /> <MyOrdersPage />
        </>
      }
    />
    <Route path="/mynfts" element={<MyNFTsPage />} />
    <Route
      path="/subcollections/:address"
      element={<SubcollectionListPage />}
    />
    <Route path="/auctions" element={<AuctionListPage />} />
  </Routes>
);
