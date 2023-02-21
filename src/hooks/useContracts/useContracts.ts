import { Contract } from '@ethersproject/contracts';
import {
  BURN_SEMAPHORE_ADDRESSES,
  ChainId,
  MARKETPLACE_V1_ADDRESS,
  MULTICALL_NETWORKS,
  RECOGNIZED_COLLECTIONS_ADDRESS,
  WAREHOUSE_ADDRESS,
  WORKBENCHV2_ADDRESSES,
  WORKBENCH_ADDRESSES,
} from '../../constants';
import { useMemo } from 'react';
import { getContract } from 'utils';
import {
  MARKETPLACE_V1_ABI,
  RECOGNIZED_COLLECTIONS_ABI,
  WAREHOUSE_ABI,
} from '../../abi/marketplace';
import { MULTICALL2_ABI } from 'abi/multicall';
import { ERC1155_ABI, ERC20_ABI, ERC721_ABI } from 'abi/token';
import { useActiveWeb3React } from 'hooks';
import { BURN_SEMAPHORE_ABI, WORKBENCHV2_ABI, WORKBENCH_ABI } from 'abi/loot';
import { MINT1_ABI, MINT2_ABI } from 'abi/mint';

export const useContract = (
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null => {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
};

export function useMarketplaceV1Contract(
  withSignerIfPossible = true
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId
      ? MARKETPLACE_V1_ADDRESS[(chainId as ChainId) ?? ChainId.MOONRIVER]
      : undefined,
    MARKETPLACE_V1_ABI,
    withSignerIfPossible
  );
}

export function useRecognizedCollectionsContract(
  withSignerIfPossible = true
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId
      ? RECOGNIZED_COLLECTIONS_ADDRESS[
          (chainId as ChainId) ?? ChainId.MOONRIVER
        ]
      : undefined,
    RECOGNIZED_COLLECTIONS_ABI,
    withSignerIfPossible
  );
}

export function useWarehouseContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId
      ? WAREHOUSE_ADDRESS[(chainId as ChainId) ?? ChainId.MOONRIVER]
      : undefined,
    WAREHOUSE_ABI,
    false
  );
}

// this is a v2 version of the Multicall contract used in Uniswap/Makerdao
export function useMulticall2Contract(
  withSignerIfPossible = true
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId ? MULTICALL_NETWORKS[chainId ?? ChainId.MOONRIVER] : undefined,
    MULTICALL2_ABI,
    withSignerIfPossible
  );
}

export function useERC20Contract(
  address: string | undefined,
  withSignerIfPossible = true
): Contract | null {
  return useContract(address, ERC20_ABI, withSignerIfPossible);
}

export function useERC721Contract(
  address: string | undefined,
  withSignerIfPossible = true
): Contract | null {
  return useContract(address, ERC721_ABI, withSignerIfPossible);
}

export function useERC1155Contract(
  address: string | undefined,
  withSignerIfPossible = true
): Contract | null {
  return useContract(address, ERC1155_ABI, withSignerIfPossible);
}

export function useWorkbenchContract(
  version: string | undefined = 'V1',
  withSignerIfPossible = true
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    version === 'V1' ? (chainId ? WORKBENCH_ADDRESSES[chainId ?? ChainId.MOONRIVER] : undefined) : (chainId ? WORKBENCHV2_ADDRESSES[chainId ?? ChainId.MOONRIVER] : undefined),
    version === 'V1' ? WORKBENCH_ABI : WORKBENCHV2_ABI,
    withSignerIfPossible
  );
}

export function useBurnSemaphoreContract(
  withSignerIfPossible = true
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId ? BURN_SEMAPHORE_ADDRESSES[chainId ?? ChainId.MOONRIVER] : undefined,
    BURN_SEMAPHORE_ABI,
    withSignerIfPossible
  );
}

export function useMint1Contract(
  address: string | undefined,
  withSignerIfPossible = true
): Contract | null {
  return useContract(address, MINT1_ABI, withSignerIfPossible);
}
export function useMint2Contract(
  address: string | undefined,
  withSignerIfPossible = true
): Contract | null {
  return useContract(address, MINT2_ABI, withSignerIfPossible);
}