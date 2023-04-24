import { createContext, useContext } from 'react';

export type StakedTokenItem = {
  tokenId: number;
  timestamp: number;
};

export interface StakeContext {
  loading: boolean;
  account?: string | null;
  tokenId: string | null;
  setTokenId: (tokenId: string | null) => void;
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
