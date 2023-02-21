import { useCallback, useEffect, useMemo, useState } from 'react';
import { calculateGasMargin, getSigner } from '../../utils';
import {
  AssetType,
  calculateOrderHash,
  CreateOrderData,
  CreateSimpleStrategyData,
  encodeCreateOrderData,
  encodeCreateOrderDataSig,
  sanityCheckOrder,
  sanityCheckStrategy,
  signBytesHexString,
} from '../../utils/marketplace';
import { useMarketplaceV1Contract } from '../../hooks/useContracts/useContracts';
import { useActiveWeb3React } from '../../hooks';
import { useTransactionAdder } from '../../state/transactions/hooks';
import { AddressZero } from '@ethersproject/constants';
import { StringAssetType } from 'utils/subgraph';

export enum CreateOrderCallbackState {
  INVALID,
  LOADING,
  VALID,
}

type CreateOrderParameters = [CreateOrderData, string];

export function useCreateOrderArguments(
  createOrderData: CreateOrderData,
  strategyData: CreateSimpleStrategyData
): CreateOrderParameters {
  return useMemo(() => {
    return [createOrderData, encodeCreateOrderData(strategyData)];
  }, [JSON.stringify(createOrderData), JSON.stringify(strategyData)]);
}

export function useCreateOrderSigArguments(
  createOrderData: CreateOrderData,
  strategyData: CreateSimpleStrategyData
) {
  const { library, account } = useActiveWeb3React();

  const [inputParams, setInputParams] = useState<
    [string, string] | undefined
  >();

  const fetchParams = useCallback(async () => {
    if (!library || !account) {
      setInputParams(undefined);
      return;
    }
    const encodedData = encodeCreateOrderDataSig(createOrderData, strategyData);
    const signature = await signBytesHexString(
      getSigner(library, account),
      encodedData
    );
    setInputParams([encodedData, signature]);
  }, [library, account, createOrderData, strategyData]);

  useEffect(() => {
    fetchParams();
  }, [library, account, createOrderData, strategyData]);

  return inputParams;
}

export function useCreateOrderCallback(
  createOrderData: CreateOrderData,
  strategyData: CreateSimpleStrategyData
): {
  state: CreateOrderCallbackState;
  callback: null | (() => Promise<string>);
  error: string | null;
} {
  const { account, chainId, library } = useActiveWeb3React();

  //console.log('YOLO', { account, chainId, library });
  const contract = useMarketplaceV1Contract(true);

  const inputParams = useCreateOrderArguments(createOrderData, strategyData);
  const inputOptions =
    createOrderData.sellAsset.addr === AddressZero &&
    createOrderData.sellAsset.assetType === AssetType.NATIVE
      ? { value: strategyData.quantity.toString() }
      : {};

  const addTransaction = useTransactionAdder();

  //console.warn('YOLO ORDER', { inputParams, inputOptions });

  return useMemo(() => {
    if (!library || !account || !chainId || !contract || !inputParams) {
      return {
        state: CreateOrderCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      };
    }

    if (!sanityCheckOrder(createOrderData)) {
      console.error('Order sanity check failed');
      return {
        state: CreateOrderCallbackState.INVALID,
        callback: null,
        error: 'Order sanity check failed',
      };
    }

    if (!sanityCheckStrategy(strategyData)) {
      console.error('Strategy sanity check failed');
      return {
        state: CreateOrderCallbackState.INVALID,
        callback: null,
        error: 'Strategy sanity check failed',
      };
    }

    return {
      state: CreateOrderCallbackState.VALID,
      callback: async function onCreateOrder(): Promise<string> {
        const args = inputParams;
        const methodName = 'createOrder';

        const call = {
          contract: contract.address,
          parameters: inputParams,
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
            const orderHash = calculateOrderHash(createOrderData);
            const sum = `Create order ${calculateOrderHash(createOrderData)}`;
            addTransaction(response, {
              summary: sum,
              order: {
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
    inputParams,
    inputOptions.value,
    addTransaction,
  ]);
}
