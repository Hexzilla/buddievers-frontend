import { BigNumber } from '@ethersproject/bignumber';
import { createAction } from '@reduxjs/toolkit';
import { Asset } from 'hooks/marketplace/types';
import { StringAssetType } from 'utils/subgraph';
import { ChainId } from '../../constants';

export interface SerializableTransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  status?: number;
}

export const addTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  from: string;
  order?: {
    orderHash: string;
  };
  fill?: {
    orderHash: string;
  };
  cancel?: {
    orderHash: string;
  };
  approval?: {
    tokenAddress: string;
    spender: string;
    tokenType: StringAssetType;
  };
  transfer?: {
    asset: Asset;
    amount: BigNumber;
  };
  craft?: {
    blueprintId: string;
    amount: string;
  },
  burn?: {
    assetAddress: string;
    assetId: string;
  }
  summary?: string;
}>('transactions/addTransaction');
export const clearAllTransactions = createAction<{ chainId: ChainId }>(
  'transactions/clearAllTransactions'
);
export const finalizeTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  receipt: SerializableTransactionReceipt;
}>('transactions/finalizeTransaction');
export const checkedTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  blockNumber: number;
}>('transactions/checkedTransaction');
