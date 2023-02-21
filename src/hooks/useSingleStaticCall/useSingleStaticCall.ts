import { Contract } from '@ethersproject/contracts';
import { useCallback, useEffect, useState } from 'react';

export function useSingleStaticCall<T>(
  contract: Contract,
  functionName: string,
  callData: any[]
) {
  const [result, setResult] = useState<T | undefined>();

  const callFunction = useCallback(async () => {
    try {
      const res = await contract.callStatic[functionName](...callData);
      setResult(res);
    } catch (e) {
      console.error(
        `Error in static call contract ${
          contract.address
        } function ${functionName} params ${JSON.stringify(callData)}`,
        e
      );
      setResult(undefined);
    }
  }, [contract, functionName, callData]);

  useEffect(() => {
    callFunction();
  }, [contract, functionName, callData]);

  return result;
}
