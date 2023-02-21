import { BigNumber } from '@ethersproject/bignumber';
import { Interface } from '@ethersproject/abi';
import { FRACTION_TO_BPS } from '../../constants';
import { tryMultiCallCore } from 'hooks/useMulticall2/useMulticall2';
import { useMulticall2Contract } from 'hooks/useContracts/useContracts';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback, useEffect, useState } from 'react';
import { Asset } from 'hooks/marketplace/types';
import { AddressZero } from '@ethersproject/constants';

export interface Fee {
  recipient: string;
  value: BigNumber;
  asset?: Partial<Asset>;
}

export const useFees = (assets: (Partial<Asset> | undefined)[]) => {
  const { chainId } = useActiveWeb3React();
  const multi = useMulticall2Contract();

  const [fees, setFees] = useState<Fee[]>([]);

  const rolyaltyif = new Interface([
    'function royaltyInfo(uint256 _tokenId,uint256 _salePrice) external view returns (address receiver,uint256 royaltyAmount)',
  ]);

  const fetchFees = useCallback(async () => {
    const test = BigNumber.from(FRACTION_TO_BPS);
    const inputs: any[] = assets
      .map((asset) => {
        if (!asset || !asset.assetAddress || !asset.assetId) {
          return undefined;
        }
        return [
          [rolyaltyif.getFunction('royaltyInfo')],
          asset.assetAddress,
          'royaltyInfo',
          [asset.assetId, test.toString()],
        ];
      })
      .filter((x) => !!x);

    const results = await tryMultiCallCore(multi, inputs, false);

    //console.log('FEES', { assets, inputs, results });

    if (!results) {
      setFees([]);
      return;
    }

    const fees: Fee[] =
      results?.map((res: any[], i: number) => {
        //console.log('feeeeeeeeeee', { res });
        return {
          asset: assets[i],
          recipient: res?.[0] ?? AddressZero,
          value: res?.[1]
            ? (res?.[1] as BigNumber).mul(FRACTION_TO_BPS).div(test)
            : BigNumber.from(0),
        };
      }) ?? [];

    setFees(fees);
  }, [chainId, multi, JSON.stringify(assets)]);

  useEffect(() => {
    if (chainId && multi) {
      fetchFees();
    }
  }, [chainId, multi, JSON.stringify(assets)]);

  return fees;
};
