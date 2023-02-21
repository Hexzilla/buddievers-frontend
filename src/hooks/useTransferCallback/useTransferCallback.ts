import { BigNumber } from '@ethersproject/bignumber';
import { TransactionResponse } from '@ethersproject/providers';
import { useActiveWeb3React } from 'hooks';
import { useCallback, useMemo } from 'react';
import {
  useERC20Contract,
  useERC1155Contract,
  useERC721Contract,
} from 'hooks/useContracts/useContracts';
import { useTransactionAdder } from 'state/transactions/hooks';
import { calculateGasMargin } from 'utils';
import { getAssetEntityId, StringAssetType } from 'utils/subgraph';
import { TransferRequest } from './useTransferCallback.types';
import { useBalances } from 'hooks/useBalances/useBalances';

export enum TransferState {
  INVALID,
  VALID,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useTransferCallback(query: TransferRequest | undefined): {
  state: TransferState;
  callback: () => Promise<void>;
} {
  const { chainId, account } = useActiveWeb3React();

  const { asset, amount, to } = query ?? {};

  const erc20 = useERC20Contract(asset?.assetAddress, true);
  const erc1155 = useERC1155Contract(asset?.assetAddress, true);
  const erc721 = useERC721Contract(asset?.assetAddress, true);

  const rawbb = useBalances([asset ?? {}]);
  const currentBalance = rawbb?.[0] ?? BigNumber.from('0');
  const assetType = asset?.assetType ?? StringAssetType.ERC20;
  const assetId = asset?.assetId ?? '0';
  const assetAddress = asset?.assetAddress;

  // check the current approval status
  const state: TransferState = useMemo(() => {
    if (
      !account ||
      !assetAddress ||
      !assetType ||
      !assetId ||
      !currentBalance ||
      !to ||
      !amount
    )
      return TransferState.INVALID;

    console.error('transferState', {
      account,
      assetType,
      assetId,
    });

    console.log({ currentBalance });
    return BigNumber.from(amount).eq('0') || currentBalance.lt(amount)
      ? TransferState.INVALID
      : TransferState.VALID;
  }, [
    account,
    chainId,
    assetType,
    assetId,
    currentBalance,
    assetAddress,
    to,
    amount,
  ]);

  const addTransaction = useTransactionAdder();

  const callback = useCallback(async (): Promise<void> => {
    if (!asset || !assetAddress || !amount) {
      return;
    }

    if (assetType.valueOf() === StringAssetType.ERC20) {
      if (!erc20) {
        return;
      }

      const estimatedGas = await erc20.estimateGas
        .transfer(to, amount)
        .catch((error: Error) => {
          console.debug('Failed to estimate gas for erc20 transfer', error);
          throw error;
        });

      return erc20
        .transfer(to, amount, { gasLimit: calculateGasMargin(estimatedGas) })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Transfer ${assetType} ${assetAddress}`,
            transfer: {
              amount,
              asset: {
                assetType,
                assetId,
                assetAddress,
                id: getAssetEntityId(assetAddress, assetId),
              },
            },
          });
        })
        .catch((error: Error) => {
          console.debug('Failed to transfer erc20 token', error);
          throw error;
        });
    } else if (assetType.valueOf() === StringAssetType.ERC721) {
      if (!erc721) {
        return;
      }
      console.log({ account, to, assetId });
      const estimatedGas = await erc721.estimateGas
        .transferFrom(account, to, assetId)
        .catch((e: Error) => {
          console.error('ERC721 transfer gas estimation failed', e);
          throw e;
        });

      return erc721
        .transferFrom(account, to, assetId, {
          gasLimit: calculateGasMargin(estimatedGas),
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Transfer ${assetType} ${assetAddress}/${assetId}`,
            transfer: {
              amount,
              asset: {
                assetType,
                assetId,
                assetAddress,
                id: getAssetEntityId(assetAddress, assetId),
              },
            },
          });
        })
        .catch((error: Error) => {
          console.debug('Failed to transfer ERC721 token', error);
          throw error;
        });
    } else if (assetType.valueOf() === StringAssetType.ERC1155) {
      if (!erc1155) {
        return;
      }
      const estimatedGas = await erc1155.estimateGas
        .safeTransferFrom(account, to, assetId, amount, [])
        .catch((e: Error) => {
          console.error('ERC1155 transfer gas estimation failed', e);
          throw e;
        });

      return erc1155
        .safeTransferFrom(account, to, assetId, amount, [], {
          gasLimit: calculateGasMargin(estimatedGas),
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Transfer ${assetType} ${assetAddress}/${assetId}`,
            transfer: {
              amount,
              asset: {
                assetType,
                assetId,
                assetAddress,
                id: getAssetEntityId(assetAddress, assetId),
              },
            },
          });
        })
        .catch((error: Error) => {
          console.debug('Failed to transfer ERC1155 token', error);
          throw error;
        });
    }
  }, [state, to, amount, assetAddress, assetType, assetId, addTransaction]);

  return { state, callback };
}
