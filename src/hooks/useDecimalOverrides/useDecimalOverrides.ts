import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useMemo } from 'react';
import { useRawCollectionsFromList } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';

export interface OwnedTokens {
  id: string;
  ownedTokens: { id: string; contract: { id: string } }[];
}

export const useDecimalOverrides = () => {
  const { chainId } = useActiveWeb3React();

  const collections = useRawCollectionsFromList();

  return useMemo(() => {
    const map: { [key: string]: number } = {};
    collections.map((x) =>
      x.decimals !== undefined
        ? (map[x.address.toLowerCase()] = x.decimals)
        : undefined
    );
    return map;
  }, [chainId]);
};
