import { useWeb3React } from '@web3-react/core';
import { SUPPORTED_CONTRACTS } from '../../constants';
import { Multicall, ContractCallContext } from 'ethereum-multicall';
import { useMemo } from 'react';
import { getContractAbi } from 'abi';

export const useMultiCall = () => {
  const { library } = useWeb3React();
  return useMemo(() => new Multicall({ ethersProvider: library }), [library]);
};

export const useMultiCallSingleContract = (
  contractName: SUPPORTED_CONTRACTS,
  contractAddress: string
) => {
  const multi = useMultiCall();

  const call = async (calls: ContractCallContext['calls']) => {
    const abi = getContractAbi(contractName);
    const preparedCalls: ContractCallContext[] = [
      { abi, calls, contractAddress, reference: contractName },
    ];
    const { results } = await multi.call(preparedCalls);
    return results[contractName].callsReturnContext;
  };

  return call;
};
