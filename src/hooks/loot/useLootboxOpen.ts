import { useMemo } from 'react'
import { useActiveWeb3React } from '../../hooks';
import axios, { AxiosError } from 'axios';
import { StringAssetType } from 'utils/subgraph';
import { useFetchTokenUriCallback } from 'hooks/useFetchTokenUri.ts/useFetchTokenUriCallback';


export type OpenData = {
  lootboxId: string
  amount?: string
}

export type Reward = {
  assetAddress: string
  assetId: string
  amount: string
  assetType: StringAssetType;
  tokenURI: string;
  meta?: any;
  name?: string;
  rarity?: string;
}

export enum LootboxOpenStatus {
  MINT_DISPATCHED = 'MINT_DISPATCHED',
  MINT_BUSY = 'BUSY',
  NO_BURN_PROOF = 'NO_BURN_PROOF',
  NEEDS_USER_CONFIRMATION = 'NEEDS_USER_CONFIRMATION'
}

export type RewardData = {
  rewards: Reward[],
  status: LootboxOpenStatus
}

export function useLootboxOpen(
  data: OpenData,
): {
  openCallback: undefined | (() => Promise<[RewardData | undefined, Error | undefined]>);
  confirmCallback: undefined | (() => Promise<boolean>);
} {
  const { account, chainId } = useActiveWeb3React();

  const tokenURICB = useFetchTokenUriCallback()

  const { lootboxId } = data

  const amount = data.amount ? data.amount : '1'


  return useMemo(() => {

    console.log('DEBUG useMemo', {account, chainId, lootboxId})
    if (!account || !chainId || !lootboxId || !amount) {
      return {
        openCallback: undefined,
        confirmCallback: undefined
      };
    }

    return {
      openCallback: async function onOpen(): Promise<[RewardData | undefined, Error | undefined]> {
        try {
          const resp = await axios.request<RewardData>({
            method: 'put',
            // url: `${process.env.REACT_APP_BACKEND_API_URL}/lootbox/open`,
            url: `${'https://samabox-api.moonsama.com/api/v1'}/lootbox/open`,
            data: {
              lootboxId,
              amount: amount,
              recipient: account,
              difficulty: '745944601324485'
            }
          });
          console.log('LOOTBOX DEBUG STATE INNER', resp)

          const metas = await tokenURICB(resp.data.rewards)
          resp.data.rewards = resp.data.rewards?.map((x, i) => {
            return {
              meta: metas[i],
              ...x
            }
          })
          return [resp.data as RewardData, undefined]
        } catch (e) {
          const err = e as AxiosError;
          console.error('Error opening the box. Try again later.')
          console.log('LOOTBOX DEBUG STATE INNER', 'error', err.response?.data)
          return [undefined, new Error(err.response?.data?.message ?? 'Error')]
        }
      },
      confirmCallback: async function onCOnfirm(): Promise<boolean> {
        try {
          const resp = await axios.request<boolean>({
            method: 'put',
            // url: `${process.env.REACT_APP_BACKEND_API_URL}/lootbox/open`,
            url: `${'https://samabox-api.moonsama.com/api/v1'}/lootbox/confirm`,
            data: {
              lootboxId,
              amount: '1',
              recipient: account,
              difficulty: '745944601324485'
            }
          });
          const confirmed = resp.data;
          console.log(`Sama box confirm success: ${confirmed}`)
          return confirmed
        } catch (e) {
          console.error('Error confirming the sama box. Try again later.')
          return false;
        }
      }
    };
  }, [
    lootboxId,
    account,
    chainId,
    amount
  ]);
}
