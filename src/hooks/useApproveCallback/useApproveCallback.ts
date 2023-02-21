import { MaxUint256 } from '@ethersproject/constants';
import { BigNumber } from '@ethersproject/bignumber';
import { TransactionResponse } from '@ethersproject/providers';
import { useActiveWeb3React } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useERC20Contract,
  useERC1155Contract,
  useERC721Contract,
  useMulticall2Contract,
} from 'hooks/useContracts/useContracts';
import {
  useHasPendingApproval,
  useTransactionAdder,
} from 'state/transactions/hooks';
import { calculateGasMargin } from 'utils';
import { StringAssetType } from 'utils/subgraph';
import { WAREHOUSE_ADDRESS, ChainId } from '../../constants';
import { AllowanceQuery } from './useApproveCallback.types';
import { useBlockNumber } from 'state/application/hooks';
import { getTokenAllowanceCalls, processTokenAllowanceCalls } from 'utils/allowances';
import { tryMultiCallCore } from 'hooks/useMulticall2/useMulticall2';

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

export function useAllowance(
  query: AllowanceQuery,
  spender?: string
): BigNumber | undefined {
  const { account, chainId } = useActiveWeb3React();
  const blockumber = useBlockNumber();
  const [allowance, setAllowance] = useState<BigNumber | undefined>();

  const { assetAddress, assetType, assetId } = query;

  const erc20 = useERC20Contract(assetAddress, true);
  const erc1155 = useERC1155Contract(assetAddress, true);
  const erc721 = useERC721Contract(assetAddress, true);

  const type = assetType ?? StringAssetType.ERC20;

  const allowanceCheck = useCallback(async () => {
    console.log('useAllowance', { spender, account, type });
    if (!spender) {
      setAllowance(undefined);
      return;
    }

    if (StringAssetType.NATIVE.valueOf() === type.valueOf()) {
      setAllowance(MaxUint256);
      return;
    } else if (StringAssetType.ERC20.valueOf() === type.valueOf()) {
      if (!erc20) {
        console.error('ERC20) contract null');
        setAllowance(undefined);
        return;
      }
      const a = await erc20.allowance(account, spender);
      console.error('ERC20 allowance', a?.toString());
      setAllowance(a);
    } else if (StringAssetType.ERC721.valueOf() === type.valueOf()) {
      if (!erc721) {
        setAllowance(undefined);
        return;
      }
      const approved: boolean = await erc721.isApprovedForAll(account, spender);
      setAllowance(approved ? MaxUint256 : BigNumber.from('0'));
    } else if (StringAssetType.ERC1155.valueOf() === type.valueOf()) {
      if (!erc1155) {
        setAllowance(undefined);
        return;
      }
      const approved: boolean = await erc1155.isApprovedForAll(
        account,
        spender
      );
      setAllowance(approved ? MaxUint256 : BigNumber.from('0'));
    } else {
      setAllowance(undefined);
    }
  }, [chainId, blockumber, account, assetAddress, spender, type]);

  useEffect(() => {
    if (assetAddress && account && spender && type) {
      allowanceCheck();
    }
  }, [chainId, blockumber, account, assetAddress, spender, type]);

  return allowance;
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  query: AllowanceQuery & { amountToApprove?: string | BigNumber },
): [ApprovalState, () => Promise<void>] {
  const { chainId, account } = useActiveWeb3React();

  const { assetId, assetAddress, amountToApprove } = query;

  const erc20 = useERC20Contract(assetAddress, true);
  const erc1155 = useERC1155Contract(assetAddress, true);
  const erc721 = useERC721Contract(assetAddress, true);

  const operator =
    query.operator ??
    (WAREHOUSE_ADDRESS[chainId ?? ChainId.MOONRIVER] as string);
  const toApprove = BigNumber.from(amountToApprove ?? MaxUint256);
  const currentAllowance = useAllowance(query, operator);
  const assetType = query.assetType ?? StringAssetType.ERC20;

  const pendingApproval = useHasPendingApproval(
    assetAddress,
    operator,
    assetType,
    assetId
  );

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    console.error({
      operator,
      currentAllowance: currentAllowance?.toString(),
      toApprove: toApprove?.toString(),
    });
    if (!assetAddress || !account || !operator || !currentAllowance)
      return ApprovalState.UNKNOWN;

    console.error('approvalState', {
      pendingApproval,
      assetAddress,
      account,
      operator,
      currentAllowance: currentAllowance.toString(),
      toApprove: toApprove?.toString(),
    });
    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(toApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [toApprove, currentAllowance, pendingApproval, operator]);

  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (assetType.valueOf() === StringAssetType.NATIVE) {
      return;
    }

    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }

    if (!account) {
      console.error('no user');
      return;
    }

    if (!assetAddress) {
      console.error('no token');
      return;
    }

    if (!operator) {
      console.error('no spender');
      return;
    }

    if (assetType.valueOf() === StringAssetType.ERC20) {
      if (!erc20) {
        return;
      }

      if (!toApprove) {
        console.error('missing amount to approve');
        return;
      }
      let useExact = false;
      const estimatedGas = await erc20.estimateGas
        .approve(operator, MaxUint256)
        .catch(() => {
          // general fallback for tokens who restrict approval amounts
          useExact = true;
          return erc20.estimateGas.approve(operator, toApprove);
        });

      return erc20
        .approve(operator, useExact ? toApprove : MaxUint256, {
          gasLimit: calculateGasMargin(estimatedGas),
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Approve ${assetType} ${assetAddress}`,
            approval: {
              tokenAddress: assetAddress,
              tokenType: assetType,
              spender: operator
            },
          });
        })
        .catch((error: Error) => {
          console.debug('Failed to approve token', error);
          throw error;
        });
    } else if (assetType.valueOf() === StringAssetType.ERC721) {
      if (!erc721) {
        return;
      }
      const estimatedGas = await erc721.estimateGas
        .setApprovalForAll(operator, true)
        .catch((e: Error) => {
          console.error('ERC721 approval failed', e);
          throw e;
        });

      return erc721
        .setApprovalForAll(operator, true, {
          gasLimit: calculateGasMargin(estimatedGas),
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Approve ${assetType} ${assetAddress}`,
            approval: {
              tokenAddress: assetAddress,
              tokenType: assetType,
              spender: operator,
              //tokenId: tokenId
            },
          });
        })
        .catch((error: Error) => {
          console.debug('Failed to approve token', error);
          throw error;
        });
    } else if (assetType.valueOf() === StringAssetType.ERC1155) {
      if (!erc1155) {
        return;
      }
      console.log({ assetType, assetAddress, assetId, account });
      const estimatedGas = await erc1155.estimateGas
        .setApprovalForAll(operator, true)
        .catch((e: Error) => {
          console.error('ERC1155 approval failed', e);
          throw e;
        });

      return erc1155
        .setApprovalForAll(operator, true, {
          gasLimit: calculateGasMargin(estimatedGas),
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Approve ${assetType} ${assetAddress}`,
            approval: {
              tokenAddress: assetAddress,
              tokenType: assetType,
              spender: operator,
            },
          });
        })
        .catch((error: Error) => {
          console.debug('Failed to approve token', error);
          throw error;
        });
    }
  }, [
    approvalState,
    assetType,
    assetId,
    assetAddress,
    toApprove,
    operator,
    addTransaction,
  ]);

  return [approvalState, approve];
}


export function useAllowances(
  queries: AllowanceQuery[],
  owner?: string
): (BigNumber | undefined)[] | undefined {
  const { account, chainId } = useActiveWeb3React();
  const blockumber = useBlockNumber();
  const [allowances, setAllowances] = useState<(BigNumber | undefined)[] | undefined>();

  const multi = useMulticall2Contract();

  let calls = getTokenAllowanceCalls(queries, owner)

  const allowanceCheck = useCallback(async () => {
    if (!owner || !calls || calls.length === 0) {
      setAllowances([]);
      return;
    }

    const results = await tryMultiCallCore(multi, calls, false);

    if (!results) {
      setAllowances([]);
      return;
    }
    //console.log('yolo tryMultiCallCore res', results);
    //console.log('results', results)
    const x = processTokenAllowanceCalls(queries, results);

    //console.log('processed', x)

    setAllowances(x.map(x => x?.allowance));
  }, [chainId, blockumber, owner]);

  useEffect(() => {
    if (owner) {
      allowanceCheck();
    }
  }, [chainId, blockumber, owner]);

  return allowances;
}
