import { createContext, useContext } from 'react';

export type StakedTokenItem = {
  tokenId: number;
  timestamp: number;
};

export interface StakeContext {
  account?: string | null;
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
