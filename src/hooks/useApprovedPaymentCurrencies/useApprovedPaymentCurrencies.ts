import { AddressZero } from '@ethersproject/constants';
import { NATIVE_TOKEN_SYMBOL, DEFAULT_CHAIN } from '../../constants';
import { useActiveWeb3React } from '../../hooks';
import { Asset } from '../../hooks/marketplace/types';
import { useCallback, useMemo } from 'react';
import {
  getAssetEntityId,
  StringAssetType,
  stringToStringAssetType,
} from 'utils/subgraph';
import { approvedCurrency } from '../../assets/data/currencies';

export interface OwnedTokens {
  id: string;
  ownedTokens: { id: string; contract: { id: string } }[];
}

export type ApprovedPaymentCurrency = Asset & { symbol: string };

export const useApprovedPaymentCurrency = (asset: {
  assetAddress: string;
  assetId?: string;
}): Asset & { symbol: string } => {
  const {chainId} = useActiveWeb3React()
  return useMemo(() => {
    let customCurrency = undefined;
    try {
      customCurrency =
        approvedCurrency[asset.assetAddress][
          Math.max(Number.parseInt(asset?.assetId ?? '1') - 1, 0)
        ];
    } catch {}
    if (!customCurrency) {
      return {
        assetAddress: AddressZero,
        assetId: '0',
        assetType: StringAssetType.NATIVE,
        id: `${AddressZero}-0`,
        symbol: NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN],
      };
    }
    return {
      ...customCurrency,
      id: getAssetEntityId(customCurrency.assetAddress, customCurrency.assetId),
      assetType: stringToStringAssetType(customCurrency.assetType),
    };
  }, [chainId, asset.assetAddress, asset.assetId]);
};

export const useApprovedPaymentCurrencyCallback = () => {
  const {chainId} = useActiveWeb3React()
  const cb = useCallback(
    (asset: { assetAddress: string; assetId?: string }) => {
      let customCurrency = undefined;
      try {
        customCurrency =
          approvedCurrency[asset.assetAddress][
            Math.max(Number.parseInt(asset?.assetId ?? '1') - 1, 0)
          ];
      } catch {}
      if (!customCurrency) {
        return {
          assetAddress: AddressZero,
          assetId: '0',
          assetType: StringAssetType.NATIVE,
          id: `${AddressZero}-0`,
          symbol: NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN],
        };
      }
      return {
        ...customCurrency,
        id: getAssetEntityId(
          customCurrency.assetAddress,
          customCurrency.assetId
        ),
        assetType: stringToStringAssetType(customCurrency.assetType),
      };
    },
    [chainId]
  );

  return cb;
};
