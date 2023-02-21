import { useCallback, useEffect, useMemo, useState } from 'react';
import { calculateGasMargin, getSigner } from '../../utils';
import {
  encodeCancelOrderDataSig,
  signBytesHexString,
} from '../../utils/marketplace';
import { useMarketplaceV1Contract } from '../../hooks/useContracts/useContracts';
import { useActiveWeb3React } from '../../hooks';
import { useTransactionAdder } from '../../state/transactions/hooks';

export enum CancelOrderCallbackState {
  INVALID,
  LOADING,
  VALID,
}

type CancelOrderParameters = [string | undefined, string];

export function useCancelOrderArguments(
  orderHash?: string
): CancelOrderParameters {
  return useMemo(() => {
    return [orderHash, '0x00'];
  }, [orderHash]);
}

export function useCancelOrderSigArguments(orderHash: string) {
  const { library, account } = useActiveWeb3React();

  const [inputParams, setInputParams] = useState<
    [string, string] | undefined
  >();

  const fetchParams = useCallback(async () => {
    if (!library || !account) {
      setInputParams(undefined);
      return;
    }
    const encodedData = encodeCancelOrderDataSig({ orderHash });
    const signature = await signBytesHexString(
      getSigner(library, account),
      encodedData
    );
    setInputParams([encodedData, signature]);
  }, [library, account, orderHash]);

  useEffect(() => {
    fetchParams();
  }, [library, account, orderHash]);

  return inputParams;
}

export function useCancelOrderCallback(orderHash?: string): {
  state: CancelOrderCallbackState;
  callback: null | (() => Promise<string>);
  error: string | null;
} {
  const { account, chainId } = useActiveWeb3React();

  //console.log('YOLO', { account, chainId });
  const contract = useMarketplaceV1Contract(true);

  const inputParams = useCancelOrderArguments(orderHash);

  const addTransaction = useTransactionAdder();

  return useMemo(() => {
    if (!account || !chainId || !contract || !orderHash) {
      return {
        state: CancelOrderCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      };
    }

    return {
      state: CancelOrderCallbackState.VALID,
      callback: async function onCreateOrder(): Promise<string> {
        const args = inputParams;
        const options = {};
        const methodName = 'cancelOrder';

        const call = {
          contract: contract.address,
          parameters: inputParams,
          methodName,
        };

        console.log(call);

        const gasEstimate = await contract.estimateGas[methodName](
          ...args,
          options
        ).catch((gasError: any) => {
          console.debug(
            'Gas estimate failed, trying eth_call to extract error',
            call
          );

          return contract.callStatic[methodName](...args, options)
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
        })
          .then((response: any) => {
            const sum = `Cancel order ${orderHash}`;
            addTransaction(response, {
              summary: sum,
              cancel: {
                orderHash,
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
              console.error(`Cancel order failed`, error, methodName, args);
              throw new Error(`Cancel order failed: ${error.message}`);
            }
          });
      },
      error: null,
    };
  }, [account, chainId, inputParams, addTransaction]);
}
