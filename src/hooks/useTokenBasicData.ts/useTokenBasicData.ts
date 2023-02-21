import { BigNumber } from '@ethersproject/bignumber';
import { Interface } from '@ethersproject/abi';
import { tryMultiCallCore } from 'hooks/useMulticall2/useMulticall2';
import { useMulticall2Contract } from 'hooks/useContracts/useContracts';
import { StringAssetType } from 'utils/subgraph';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback, useEffect, useState } from 'react';
import { Asset } from 'hooks/marketplace/types';
import { AddressZero } from '@ethersproject/constants';
import { useBlockNumber } from 'state/application/hooks';

export interface BasicTokenData {
  asset: Asset;
  userBalance: BigNumber;
  totalSupply?: BigNumber;
  decimals?: number;
  owner?: string;
}

export const processResults = (
  assets: Asset[],
  results: any[],
  account: string | null | undefined
) => {
  let res: BasicTokenData[] = [];
  let offset = 0;
  assets.map((x, i) => {
    if (x.assetType.valueOf() === StringAssetType.ERC20) {
      res.push({
        asset: x,
        userBalance: results[i + offset]?.[0],
        totalSupply: results[i + offset + 1]?.[0],
        decimals: results[i + offset + 2]?.[0],
      });
      offset += 2;
      return;
    }

    if (x.assetType.valueOf() === StringAssetType.ERC721) {
      res.push({
        asset: x,
        userBalance:
          results[i + offset]?.[0] === account
            ? BigNumber.from('1')
            : BigNumber.from('0'),
        totalSupply: results[i + offset + 1]?.[0],
        owner: results[i + offset]?.[0],
      });
      offset += 1;
      return;
    }

    if (x.assetType.valueOf() === StringAssetType.ERC1155) {
      res.push({
        asset: x,
        userBalance: results[i + offset]?.[0],
        totalSupply: results[i + offset + 1]?.[0],
        decimals: results[i + offset + 2]?.[0],
      });
      offset += 2;
      return;
    }
  });
  return res;
};

export const useTokenBasicData = (assets: Asset[]) => {
  const { chainId, account } = useActiveWeb3React();
  const blockNumber = useBlockNumber()
  const multi = useMulticall2Contract();

  const [datas, setBasicDatas] = useState<BasicTokenData[] | undefined>();

  const getCalldata = (asset: Asset) => {
    if (!asset || !asset.assetAddress || !asset.assetId || !asset.assetType) {
      return [];
    }

    const sanitizedAddres = account ?? AddressZero;
    if (asset.assetType?.valueOf() === StringAssetType.ERC20) {
      return [
        [
          [
            new Interface([
              'function balanceOf(address) view returns (uint256)',
            ]).getFunction('balanceOf'),
          ],
          asset.assetAddress,
          'balanceOf',
          [sanitizedAddres],
        ],
        [
          [
            new Interface([
              'function totalSupply() view returns (uint256)',
            ]).getFunction('totalSupply'),
          ],
          asset.assetAddress,
          'totalSupply',
          [],
        ],
        [
          [
            new Interface([
              'function decimals() view returns (uint8)',
            ]).getFunction('decimals'),
          ],
          asset.assetAddress,
          'decimals',
          [],
        ],
      ];
    }

    if (asset.assetType?.valueOf() === StringAssetType.ERC721) {
      return [
        [
          [
            new Interface([
              'function ownerOf(uint256) view returns (address)',
            ]).getFunction('ownerOf'),
          ],
          asset.assetAddress,
          'ownerOf',
          [asset.assetId],
        ],
        [
          [
            new Interface([
              'function totalSupply() view returns (uint256)',
            ]).getFunction('totalSupply'),
          ],
          asset.assetAddress,
          'totalSupply',
          [],
        ],
      ];
    }

    if (asset.assetType?.valueOf() === StringAssetType.ERC1155) {
      return [
        [
          [
            new Interface([
              'function balanceOf(address,uint256) view returns (uint256)',
            ]).getFunction('balanceOf'),
          ],
          asset.assetAddress,
          'balanceOf',
          [sanitizedAddres, asset.assetId],
        ],
        [
          [
            new Interface([
              'function totalSupply(uint256 id) view returns (uint256)',
            ]).getFunction('totalSupply'),
          ],
          asset.assetAddress,
          'totalSupply',
          [asset.assetId],
        ],
        [
          [
            new Interface([
              'function decimals() view returns (uint8)',
            ]).getFunction('decimals'),
          ],
          asset.assetAddress,
          'decimals',
          [],
        ],
      ];
    }

    return [];
  };

  const fetchBasicDatas = useCallback(async () => {
    let calls: any[] = [];
    assets.map((asset, i) => {
      calls = [...calls, ...getCalldata(asset)];
    });

    const results = await tryMultiCallCore(multi, calls);

    if (!results) {
      setBasicDatas([]);
      return;
    }
    //console.log('yolo tryMultiCallCore res', results);
    const x = processResults(assets, results, account);

    setBasicDatas(x);
  }, [chainId, multi, account, JSON.stringify(assets)]);

  useEffect(() => {
    if (chainId && multi) {
      fetchBasicDatas();
    }
  }, [chainId, multi, account, JSON.stringify(assets), blockNumber]);

  return datas;
};
