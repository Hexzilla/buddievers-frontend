import { BigNumber } from '@ethersproject/bignumber';
import { request } from 'graphql-request';
import { DEFAULT_CHAIN, MARKETPLACE_SUBGRAPH_URLS, SUBGRAPH_MAX_BLOCK_DELAY } from '../../constants';
import { QUERY_ESCROW_BALANCE } from '../../subgraph/escrowQueries';
import { Balance } from './types';
import { useBlockNumber } from '../../state/application/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { stringToStringAssetType } from '../../utils/subgraph';

export const useEscrowBalance = (
  tokenAddress: string,
  tokenId?: number | string
) => {
  const { account, chainId } = useActiveWeb3React();
  const blockNumber = useBlockNumber();

  const [balance, setBalance] = useState<Balance | undefined>();

  const fetchEscrowBalance = useCallback(async () => {
    if (account) {
      const bal = await escrowBalanceCore(
        account,
        tokenAddress,
        tokenId,
        blockNumber
      );
      setBalance(bal);
    }
  }, [account, tokenAddress, tokenId, blockNumber]);

  useEffect(() => {
    fetchEscrowBalance();
  }, [fetchEscrowBalance, account, blockNumber]);

  return balance;
};

export const escrowBalanceCore = async (
  userAddress: string,
  tokenAddress: string,
  tokenId?: number | string,
  blockNumber?: number,
  chainId?: number
) => {
  const tId = tokenId ? tokenId.toString() : '0';
  const id = `${tokenAddress.toLowerCase()}-${tId.toString()}-${userAddress.toLowerCase()}`;
  console.log({ blockNumber, tId, id });

  const result = await request(MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN], QUERY_ESCROW_BALANCE, { id });

  const eb = result?.escrowBalance;

  const actualBlockNumber = result?._meta.block.number;
  if (
    actualBlockNumber &&
    actualBlockNumber + SUBGRAPH_MAX_BLOCK_DELAY < (blockNumber ?? 0)
  ) {
    console.warn('Info fetched from subgraph might be stale');
  }
  if (!eb) {
    return {
      user: userAddress,
      tokenAddress: tokenAddress,
      tokenId: tId,
      blockNumber: actualBlockNumber as number,
    };
  }
  return {
    user: eb?.user?.id,
    tokenAddress: eb?.asset?.assetAddress,
    tokenId: eb?.asset?.assetId,
    tokenType: stringToStringAssetType(eb?.asset.assetType),
    blockNumber: actualBlockNumber as number,
    escrowAmount: BigNumber.from(eb?.quantity as string),
  };
};
