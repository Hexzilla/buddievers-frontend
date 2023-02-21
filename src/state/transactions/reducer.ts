import { BigNumber } from '@ethersproject/bignumber';
import { createReducer } from '@reduxjs/toolkit';
import { Asset } from 'hooks/marketplace/types';
import { StringAssetType } from 'utils/subgraph';
import {
  addTransaction,
  checkedTransaction,
  clearAllTransactions,
  finalizeTransaction,
  SerializableTransactionReceipt,
} from './actions';

const now = () => new Date().getTime();

export interface TransactionDetails {
  hash: string;
  approval?: {
    tokenAddress: string;
    spender: string;
    tokenType: StringAssetType;
  };
  order?: {
    orderHash: string;
  };
  fill?: {
    orderHash: string;
  };
  cancel?: {
    orderHash: string;
  };
  transfer?: {
    asset: Asset;
    amount: BigNumber;
  };
  burn?: {
    assetAddress: string;
    assetId: string;
  }
  summary?: string;
  receipt?: SerializableTransactionReceipt;
  lastCheckedBlockNumber?: number;
  addedTime: number;
  confirmedTime?: number;
  from: string;
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
}

export const initialState: TransactionState = {};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      addTransaction,
      (
        transactions,
        {
          payload: {
            chainId,
            from,
            hash,
            approval,
            summary,
            order,
            fill,
            cancel,
            transfer,
            burn
          },
        }
      ) => {
        console.log('new TX added', {
          chainId,
          from,
          hash,
          approval,
          summary,
          order,
          fill,
          cancel,
          transfer,
          burn
        });
        if (transactions[chainId]?.[hash]) {
          throw Error('Attempted to add existing transaction.');
        }
        const txs = transactions[chainId] ?? {};
        txs[hash] = {
          hash,
          approval,
          summary,
          from,
          order,
          fill,
          cancel,
          transfer,
          burn,
          addedTime: now(),
        };
        transactions[chainId] = txs;
      }
    )
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
      if (!transactions[chainId]) return;
      transactions[chainId] = {};
    })
    .addCase(
      checkedTransaction,
      (transactions, { payload: { chainId, hash, blockNumber } }) => {
        const tx = transactions[chainId]?.[hash];
        if (!tx) {
          return;
        }
        if (!tx.lastCheckedBlockNumber) {
          tx.lastCheckedBlockNumber = blockNumber;
        } else {
          tx.lastCheckedBlockNumber = Math.max(
            blockNumber,
            tx.lastCheckedBlockNumber
          );
        }
      }
    )
    .addCase(
      finalizeTransaction,
      (transactions, { payload: { hash, chainId, receipt } }) => {
        const tx = transactions[chainId]?.[hash];
        if (!tx) {
          return;
        }
        tx.receipt = receipt;
        tx.confirmedTime = now();
      }
    )
);
