import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { calculateGasMargin, getSigner } from '../../utils';
import {
  Asset,
  AssetType,
  encodeFillOrderData,
  encodeFillOrderDataSig,
  FillOrderData,
  FillOrderSigData,
  signBytesHexString,
} from '../../utils/marketplace';
import { useMarketplaceV1Contract } from '../../hooks/useContracts/useContracts';
import { useActiveWeb3React } from '../../hooks';
import { useTransactionAdder } from '../../state/transactions/hooks';
import { AddressZero, HashZero } from '@ethersproject/constants';

export enum FillOrderCallbackState {
  INVALID,
  VALID,
}

type CreateOrderParameters = [string, string];

export function useFillOrderArguments(
  orderHash?: string,
  fillOrderData?: FillOrderCallbackData
): CreateOrderParameters {
  return useMemo(() => {
    if (!orderHash || !fillOrderData) {
      return [HashZero, '0x00'];
    }
    return [
      orderHash ?? '0x00',
      encodeFillOrderData({
        buyer: fillOrderData.buyer ?? AddressZero,
        quantity: fillOrderData?.quantity,
      }),
    ];
  }, [orderHash, fillOrderData?.buyer, fillOrderData?.quantity]);
}

export function useFillOrderSigArguments(fillOrderSigData: FillOrderSigData) {
  const { library, account } = useActiveWeb3React();

  const [inputParams, setInputParams] = useState<
    [string, string] | undefined
  >();

  const fetchParams = useCallback(async () => {
    if (!library || !account) {
      setInputParams(undefined);
      return;
    }
    const encodedData = encodeFillOrderDataSig(fillOrderSigData);
    const signature = await signBytesHexString(
      getSigner(library, account),
      encodedData
    );
    setInputParams([encodedData, signature]);
  }, [library, account, fillOrderSigData]);

  useEffect(() => {
    fetchParams();
  }, [library, account, fillOrderSigData]);

  return inputParams;
}

export interface FillOrderCallbackData {
  buyer?: string | undefined | null;
  quantity: BigNumber;
}

export function useFillOrderCallback(
  orderHash?: string,
  fillData?: FillOrderCallbackData,
  nativeOptions?: {
    userGive?: BigNumber;
    native: boolean;
  }
): {
  state: FillOrderCallbackState;
  callback: null | (() => Promise<string>);
  error: string | null;
} {
  const { account, chainId, library } = useActiveWeb3React();

  console.log('fill debug', { account, chainId, library, orderHash, fillData });
  const contract = useMarketplaceV1Contract(true);

  const inputParams = useFillOrderArguments(orderHash, fillData);
  const buyer = fillData?.buyer;
  const quantity = fillData?.quantity;

  const addTransaction = useTransactionAdder();

  /*
  const inputOptions =
    nativeOptions?.native && nativeOptions?.userGive
      ? { value: nativeOptions.userGive.toString() }
      : {};
  */

    const inputOptions =
      nativeOptions?.native && nativeOptions?.userGive
        ? { value: nativeOptions.userGive.toString() }
        : {};

  return useMemo(() => {
    if (!library || !account || !chainId || !contract || !library) {
      return {
        state: FillOrderCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      };
    }

    if (
      !orderHash ||
      !buyer ||
      !quantity ||
      !BigNumber.from(quantity).gt('0')
    ) {
      return {
        state: FillOrderCallbackState.INVALID,
        callback: null,
        error: 'Sanity check failed',
      };
    }

    const signer = getSigner(library, account)

    return {
      state: FillOrderCallbackState.VALID,
      callback: async function onFillOrder(): Promise<string> {
        const args = inputParams;
        const methodName = 'fillOrder';

        const call = {
          contract: contract.address,
          parameters: inputParams,
          methodName,
        };

        console.log('debug fill call', {call});

        const gasEstimate = await contract.estimateGas[methodName](
          ...args,
          inputOptions
        ).catch((gasError: any) => {
          console.debug(
            'Gas estimate failed for order fill, trying eth_call to extract error',
            call
          );

          return contract.callStatic[methodName](...args, inputOptions)
            .then((result: any) => {
              console.debug(
                'Unexpected successful fill order call after failed estimate gas',
                call,
                gasError,
                result
              );
              throw new Error(
                'Unexpected issue with estimating the gas for an order fill. Please try again.'
              );
            })
            .catch((callError: any) => {
              console.debug('Call threw error', call, callError);
              //let errorMessage = `The transaction cannot succeed due to error: ${callError.reason}`;
              //throw new Error(errorMessage);
              return BigNumber.from('1000000')
            });
        });

        if (!gasEstimate) {
          throw new Error(
            'Unexpected error. Please contact support: none of the calls threw an error'
          );
        }
        /*
        return contract[methodName](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
          from: account,
          ...inputOptions,
        })
        */
        return contract[methodName](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
          from: account,
          ...inputOptions,
        })
          .then((response: any) => {
            const sum = `Fill order ${orderHash}`;
            addTransaction(response, {
              summary: sum,
              fill: {
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
              console.error(`Fill order failed`, error, methodName, args);
              throw new Error(`Fill order failed: ${error.message}`);
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
    orderHash,
    buyer,
    quantity,
    inputOptions.value,
    addTransaction,
  ]);
}
