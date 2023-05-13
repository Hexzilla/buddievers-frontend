import { createContext, useContext } from 'react';
import { OwnedToken } from 'components/types';

export type Order = {
  id: string;
  owner: string;
  price: any;
  quantity: any;
  orderType: number;
  createdAt: number;
  expiration: number;
};

export interface MarketContext {
  loading: boolean;
  account?: string | null;
  balance: number;
  seedBalance: number;
  orders: Order[];
  ownedOrders: Order[];
  refresh: () => Promise<void>;
}

export const marketContext = createContext<MarketContext | null>(null);

export const useMarketContext = () => useContext(marketContext)!;

export default marketContext.Provider;
