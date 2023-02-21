import { useCallback, useEffect, useState } from 'react';
import { useMulticall2Contract } from 'hooks/useContracts/useContracts';
import { Interface, Result } from 'ethers/lib/utils';
import { Contract } from '@ethersproject/contracts';

interface Multicall2Data {
  target: string;
  callData: string;
}

/*
example
useMulticall2(s?.interface.fragments as any[], [['0xDC5b69374207a18e75F7cdCf5176CA63911e690d', 'balanceOf', [account]], ['0x1369eA55a479CC2A334ACa55e250DC5161677442', 'balanceOf', [account]]])
*/

export const useMulticall2Static = (
  calls: [any[], string, string, any[]][], // list of lists: [abi fragment, target address, function name, [data]]
  options?: Object
) => {
  const multi = useMulticall2Contract(true);

  const [results, setResults] = useState<any[] | undefined>();

  const multiCall2 = useCallback(async () => {
    setResults(await multiCallCore(multi, calls, options));
  }, [multi, calls, options]);

  useEffect(() => {
    multiCall2();
  }, [multi, multiCall2, calls, options]);

  return results;
};

export const useMulticall2Raw = async (
  calldata: Multicall2Data[],
  asStatic = true
) => {
  const multi = useMulticall2Contract(true);

  console.log(calldata);
  console.log(multi);

  const [result, setResult] = useState<any | undefined>();

  const multiCall2 = useCallback(async () => {
    if (!multi) {
      console.error('Multicall contract could not be accessed');
      setResult(undefined);
      return;
    }
    try {
      //console.log(await multi.getBlockNumber());
      const res = asStatic
        ? await multi.callStatic.aggregate(calldata)
        : await multi.aggregate(calldata);
      //console.log(res);
      setResult(res);
    } catch (e) {
      console.error('Error calling multicall 2', e);
      setResult(undefined);
    }
  }, [multi, asStatic, calldata]);

  useEffect(() => {
    multiCall2();
  }, [multi, multiCall2, asStatic, calldata]);

  return result;
};

export const multiCallCore = async (
  multi: Contract | null,
  calls: [any, string, string, any[]][], // list of lists: [abi fragment, target address, function name, [data]]
  options?: Object
) => {
  if (!multi) {
    console.error('Multicall contract could not be accessed');
    return undefined;
  }
  try {
    //console.log('YOLO calls', { calls });

    const [, res] = await multi.callStatic.aggregate(
      calls.map((call, i: number) => {
        const itf = new Interface(call[0]);
        return [
          call[1].toLowerCase(),
          itf.encodeFunctionData(call[2], call[3]),
        ];
      }),
      options || {}
    );
    const retval = res.map((resfrag: any, i: number) => {
      const itf = new Interface(calls[i][0]);
      return itf.decodeFunctionResult(calls[i][2], resfrag);
    });
    console.log({ retval });
    return retval;
  } catch (e) {
    console.error('Error calling multicall 2', e);
    return undefined;
  }
};

export const tryMultiCallCore = async (
  multi: Contract | null,
  calls: [any, string, string, any[]][], // list of lists: [abi fragment, target address, function name, [data]]
  requireSuccess = false,
  options?: Object
) => {
  if (!multi) {
    console.error('Multicall contract could not be accessed');
    return undefined;
  }
  try {
    //console.log('YOLO calls', { calls });

    const retarray = await multi.callStatic.tryAggregate(
      requireSuccess,
      calls.map((call) => {
        const itf = new Interface(call[0]);
        return [
          call[1].toLowerCase(),
          itf.encodeFunctionData(call[2], call[3]),
        ];
      }),
      options || {}
    );
    const retval: any[] = retarray.map((resfrag: any, i: number) => {
      if (!resfrag[0]) {
        return undefined;
      }
      const itfinnter = new Interface(calls[i][0]);
      return itfinnter.decodeFunctionResult(calls[i][2], resfrag[1]);
    });
    return retval;
  } catch (e) {
    console.error('Error calling multicall 2', e);
    return undefined;
  }
};
