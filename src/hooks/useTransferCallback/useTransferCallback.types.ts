import { BigNumber } from '@ethersproject/bignumber';
import { Asset } from 'hooks/marketplace/types';

export interface TransferRequest {
  to: string;
  asset?: Partial<Asset>;
  amount: BigNumber;
}
