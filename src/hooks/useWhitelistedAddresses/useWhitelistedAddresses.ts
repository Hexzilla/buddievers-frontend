import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useMemo } from 'react';
import { useRawCollectionsFromList } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';

export interface OwnedTokens {
  id: string;
  ownedTokens: { id: string; contract: { id: string } }[];
}

export const useWhitelistedAddresses = () => {
  const { chainId } = useActiveWeb3React();

  const collections = useRawCollectionsFromList();

  return useMemo(() => {
    return collections.map((x) => x.address.toLowerCase());
  }, [chainId]);
};
