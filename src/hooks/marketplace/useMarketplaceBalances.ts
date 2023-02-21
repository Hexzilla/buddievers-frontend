import { BigNumber } from '@ethersproject/bignumber';
import { ChainId, WMOVR_ADDRESS, WAREHOUSE_ADDRESS } from '../../constants';
import { Balance, BalanceQuery } from './types';
import { multiCallCore } from 'hooks/useMulticall2/useMulticall2';
import {
  useERC1155Contract,
  useERC20Contract,
  useERC721Contract,
  useMulticall2Contract,
} from 'hooks/useContracts/useContracts';
import { escrowBalanceCore } from './useEscrowBalance';
import { StringAssetType } from 'utils/subgraph';
import { FunctionFragment } from 'ethers/lib/utils';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback, useEffect, useState } from 'react';

export const useMarketplaceBalances = (queries: BalanceQuery[]) => {
  const { chainId } = useActiveWeb3React();
  const multi = useMulticall2Contract();

  const [balances, setBalances] = useState<Balance[] | undefined>();

  const warehouseAddress = WAREHOUSE_ADDRESS[
    chainId ?? ChainId.MOONRIVER
  ] as string;
  const erc20 = useERC20Contract(
    WMOVR_ADDRESS[ChainId.MOONRIVER] as string,
    true
  );
  const erc1155 = useERC1155Contract(
    WMOVR_ADDRESS[ChainId.MOONRIVER] as string,
    true
  );
  const erc721 = useERC721Contract(
    WMOVR_ADDRESS[ChainId.MOONRIVER] as string,
    true
  );

  console.log({ queries });

  const getMulticallInput = (
    balance: Balance
  ): [FunctionFragment[], string, string, string[]][] => {
    if (balance.tokenType?.valueOf() === StringAssetType.ERC20) {
      return [
        [
          [erc20?.interface.getFunction('balanceOf') as FunctionFragment],
          balance.tokenAddress,
          'balanceOf',
          [balance.user],
        ],
        [
          [erc20?.interface.getFunction('allowance') as FunctionFragment],
          balance.tokenAddress,
          'allowance',
          [balance.user, warehouseAddress],
        ],
      ];
    }

    if (balance.tokenType?.valueOf() === StringAssetType.ERC721) {
      return [
        [
          [erc721?.interface.getFunction('ownerOf') as FunctionFragment],
          balance.tokenAddress,
          'ownerOf',
          [balance.tokenId],
        ],
        [
          [
            erc721?.interface.getFunction(
              'isApprovedForAll'
            ) as FunctionFragment,
          ],
          balance.tokenAddress,
          'isApprovedForAll',
          [balance.user, warehouseAddress],
        ],
      ];
    }

    if (balance.tokenType?.valueOf() === StringAssetType.ERC1155) {
      return [
        [
          [erc1155?.interface.getFunction('balanceOf') as FunctionFragment],
          balance.tokenAddress,
          'balanceOf',
          [balance.user, balance.tokenId],
        ],
        [
          [
            erc1155?.interface.getFunction(
              'isApprovedForAll'
            ) as FunctionFragment,
          ],
          balance.tokenAddress,
          'isApprovedForAll',
          [balance.user, warehouseAddress],
        ],
      ];
    }

    return [];
  };

  const fetchMarketplaceBalances = useCallback(async () => {
    let calls: [any[], string, string, string[]][] = [];

    //console.log('YOLO fetchMarketplaceBalances', { queries });

    const escrowBalances: Balance[] = await Promise.all(
      queries.map(async (query) => {
        //console.log('1', { query });
        const tokenId = query.tokenId ? query.tokenId.toString() : '0';
        const tokenType = query.tokenType ?? StringAssetType.ERC20;
        //console.log({ tokenId, tokenType });
        let escrowBalance: Balance = await escrowBalanceCore(
          query.userAddress,
          query.tokenAddress,
          tokenId
        );

        if (!escrowBalance) {
          escrowBalance = {
            user: query.userAddress.toLowerCase(),
            tokenAddress: query.tokenAddress.toLowerCase(),
            tokenId: tokenId,
            tokenType: tokenType,
            escrowAmount: BigNumber.from('0'),
          };
        } else {
          escrowBalance['tokenType'] = escrowBalance.tokenType
            ? escrowBalance.tokenType
            : tokenType;
        }

        if (escrowBalance.tokenType?.valueOf() !== StringAssetType.UNKNOWN) {
          const mi = getMulticallInput(escrowBalance);
          calls = [...calls, ...mi];
        }

        return escrowBalance;
      })
    );

    //console.log('YOLO escorBalances list', { escrowBalances });

    const results = await multiCallCore(multi, calls);

    if (!results) {
      //console.log('YOLO fetchMarketplaceBalances', 'no graphql results');
      setBalances(escrowBalances);
      return;
    }

    for (let i = 0; i < escrowBalances.length; i++) {
      if (escrowBalances[i].tokenType?.valueOf() === StringAssetType.UNKNOWN) {
        continue;
      }

      if (escrowBalances[i].tokenType?.valueOf() === StringAssetType.ERC20) {
        escrowBalances[i]['walletAmount'] = results[0];
        escrowBalances[i]['warehouseAllowanceAmount'] = results[1];
        calls = calls.slice(2);
      }

      if (escrowBalances[i].tokenType?.valueOf() === StringAssetType.ERC721) {
        escrowBalances[i]['walletAmount'] =
          (results[0] as string).toLowerCase() === escrowBalances[i].user
            ? BigNumber.from('1')
            : BigNumber.from('0');
        escrowBalances[i]['warehouseAllowanceAmount'] = results[1]
          ? escrowBalances[i].walletAmount
          : BigNumber.from('0');
        calls = calls.slice(2);
      }

      if (escrowBalances[i].tokenType?.valueOf() === StringAssetType.ERC1155) {
        escrowBalances[i]['walletAmount'] = results[0];
        escrowBalances[i]['warehouseAllowanceAmount'] = results[1]
          ? escrowBalances[i].walletAmount
          : BigNumber.from('0');
        calls = calls.slice(2);
      }
    }

    //console.log('final fetchMarketplaceBalances', { final: escrowBalances });

    setBalances(escrowBalances);
  }, [chainId, queries]);

  useEffect(() => {
    if (chainId && multi) {
      fetchMarketplaceBalances();
    }
  }, [chainId, multi]);

  return balances;
};
