import {useMemo} from 'react'
import { calculateGasMargin } from '../../utils';

import { useBurnSemaphoreContract } from '../../hooks/useContracts/useContracts';
import { useActiveWeb3React } from '../../hooks';
import { useTransactionAdder } from '../../state/transactions/hooks';

export enum BurnCallbackState {
  INVALID,
  LOADING,
  VALID,
}

export type BurnData = {
    assetAddress: string,
    assetId: string;
}

export function useBurnSemaphore(
  burnData: BurnData,
): {
  state: BurnCallbackState;
  callback: null | (() => Promise<string>);
  error: string | null;
} {
  const { account, chainId, library } = useActiveWeb3React();

  const contract = useBurnSemaphoreContract(true);

  const addTransaction = useTransactionAdder();


  const {assetAddress, assetId} = burnData

  return useMemo(() => {
    if (!library || !account || !chainId || !contract) {
      return {
        state: BurnCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      };
    }

    if (!assetAddress || !assetId || !account ) {
      console.error('Burn params are incorrect');
      return {
        state: BurnCallbackState.INVALID,
        callback: null,
        error: 'Burn params check failed',
      };
    }

    return {
      state: BurnCallbackState.VALID,
      callback: async function onBurn(): Promise<string> {
        const args = [assetAddress, assetId];
        const methodName = 'burn';
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
            const sum = `Burned token ${assetAddress}-${assetId}`;
            addTransaction(response, {
              summary: sum,
              burn: {
                assetAddress,
                assetId
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
    assetAddress,
    assetId,
    contract,
    addTransaction,
  ]);
}
