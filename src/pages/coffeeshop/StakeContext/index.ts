import { createContext, useContext } from 'react';
import { OwnedToken } from 'components/types';

export type StakedTokenItem = {
  tokenId: number;
  timestamp: number;
};

export interface StakeContext {
  loading: boolean;
  account?: string | null;
  token: OwnedToken | null;
  setToken: (token: OwnedToken | null) => void;
  startTime: number;
  rewards: string;
  stakedTokens: StakedTokenItem[];
  refresh: () => Promise<void>;
  stake: (tokenId: string) => Promise<void>;
  unstake: (tokenId: string) => Promise<void>;
  getRewards: () => Promise<number>;
  claimRewards: () => Promise<void>;
}

export const stakeContext = createContext<StakeContext | null>(null);

export const useStakeContext = () => useContext(stakeContext)!;

export default stakeContext.Provider;
