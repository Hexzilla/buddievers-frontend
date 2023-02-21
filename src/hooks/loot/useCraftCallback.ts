import {useMemo} from 'react'
import { calculateGasMargin } from '../../utils';

import { useWorkbenchContract } from '../../hooks/useContracts/useContracts';
import { useActiveWeb3React } from '../../hooks';
import { useTransactionAdder } from '../../state/transactions/hooks';
import { BigNumber } from '@ethersproject/bignumber';

export enum CraftCallbackState {
  INVALID,
  LOADING,
  VALID,
}

export type CraftData = {
    blueprintId: string,
    amount: string;
    version?: string
}

export function useCraftCallback(
  craftData: CraftData,
): {
  state: CraftCallbackState;
  callback: null | (() => Promise<string>);
  error: string | null;
} {
  const { account, chainId, library } = useActiveWeb3React();

  //console.log('YOLO', { account, chainId, library });
  const contract = useWorkbenchContract(craftData?.version, true);

  const addTransaction = useTransactionAdder();


  const {blueprintId, amount} = craftData

  //console.warn('YOLO ORDER', { inputParams, inputOptions });

  return useMemo(() => {
    if (!library || !account || !chainId || !contract) {
      return {
        state: CraftCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      };
    }

    if (!blueprintId || blueprintId == '0' || !amount || BigNumber.from(amount).lt('1') ) {
      console.error('Craft check failed');
      return {
        state: CraftCallbackState.INVALID,
        callback: null,
        error: 'Craft check failed',
      };
    }

    return {
      state: CraftCallbackState.VALID,
      callback: async function onCraft(): Promise<string> {
        const args = [blueprintId, amount ];
        const methodName = 'craft';
        const inputOptions = {}

        const call = {
          contract: contract.address,
          parameters: args,
          methodName,
        };

        console.log(call);

        const gasEstimate = await contract.estimateGas[methodName](
          ...args,
          inputOptions
        ).catch((gasError: any) => {
          console.debug(
            'Gas estimate failed, trying eth_call to extract error',
            call
          );

          return contract.callStatic[methodName](...args, inputOptions)
            .then((result: any) => {
              console.debug(
                'Unexpected successful call after failed estimate gas',
                call,
                gasError,
                result
              );
              throw new Error(
                'Unexpected issue with estimating the gas. Please try again.'
              );
            })
            .catch((callError: any) => {
              console.debug('Call threw error', call, callError);
              let errorMessage = `The transaction cannot succeed due to error: ${callError.reason}`;
              throw new Error(errorMessage);
            });
        });

        if (!gasEstimate) {
          throw new Error(
            'Unexpected error. Please contact support: none of the calls threw an error'
          );
        }

        return contract[methodName](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
          from: account,
          ...inputOptions,
        })
          .then((response: any) => {
            const sum = `Crafted blueprint ${blueprintId}`;
            addTransaction(response, {
              summary: sum,
              craft: {
                blueprintId,
                amount
              },
            });
            return response.hash;
          })
          .catch((error: any) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.');
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Create order failed`, error, methodName, args);
              throw new Error(`Create order failed: ${error.message}`);
            }
          });
      },
      error: null,
    };
  }, [
    library,
    account,
    chainId,
    amount,
    blueprintId,
    addTransaction,
  ]);
}
