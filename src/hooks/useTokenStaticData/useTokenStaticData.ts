import { BigNumber } from '@ethersproject/bignumber';
import { tryMultiCallCore } from 'hooks/useMulticall2/useMulticall2';
import { useMulticall2Contract } from 'hooks/useContracts/useContracts';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback, useEffect, useState } from 'react';
import { Asset } from 'hooks/marketplace/types';
import {
  getTokenStaticCalldata,
  processTokenStaticCallResults,
} from 'utils/calls';

export interface StaticTokenData {
  asset: Asset;
  name?: string;
  symbol?: string;
  decimals?: number;
  totalSupply?: BigNumber;
  tokenURI?: string;
  contractURI?: string;
}

export const useTokenStaticData = (assets: Asset[]) => {
  const { chainId } = useActiveWeb3React();
  const multi = useMulticall2Contract();

  const [datas, setDatas] = useState<StaticTokenData[] | undefined>();

  const fetchDatas = useCallback(async () => {
    let calls: any[] = [];
    assets.map((asset, i) => {
      calls = [...calls, ...getTokenStaticCalldata(asset)];
    });

    const results = await tryMultiCallCore(multi, calls, false);

    if (!results) {
      setDatas([]);
      return;
    }
    //console.log('yolo tryMultiCallCore res', results);
    const x = processTokenStaticCallResults(assets, results);

    setDatas(x);
  }, [chainId, multi, JSON.stringify(assets)]);

  useEffect(() => {
    if (chainId && multi) {
      fetchDatas();
    }
  }, [chainId, multi, JSON.stringify(assets)]);

  return datas;
};
