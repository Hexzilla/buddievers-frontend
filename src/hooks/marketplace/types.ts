import { BigNumber } from '@ethersproject/bignumber';
import { OrderType, StringAssetType, StringOrderType } from 'utils/subgraph';

export interface BaseAsset {
  assetId: string;
  assetType: StringAssetType;
  assetAddress: string;
}
export interface Asset {
  // {asset address}-{asset id}
  id: string;
  assetId: string;
  assetType: StringAssetType;
  assetAddress: string;
}

export interface Fill {
  // tx hash
  id: string;
  buyer: string;
  buyerSendsAmountFull: BigNumber;
  buyerSentAmount: BigNumber;
  sellerSendsAmountFull: BigNumber;
  sellerSentAmount: BigNumber;
  complete: boolean;
  createdAt: string;
  orderHash: string;
}

export interface FillWithOrder {
  // tx hash
  id: string;
  buyer: string;
  buyerSendsAmountFull: BigNumber;
  buyerSentAmount: BigNumber;
  sellerSendsAmountFull: BigNumber;
  sellerSentAmount: BigNumber;
  complete: boolean;
  createdAt: string;
  orderHash: string;
  order: {
    id: string;
    seller: string;
    sellAsset: Asset;
    buyAsset: Asset;
    strategyType: string;
    salt: string;
    createdAt: string;
    quantity: BigNumber;
    quantityLeft: BigNumber;
    startsAt: string;
    expiresAt: string;
    askPerUnitNominator: BigNumber;
    askPerUnitDenominator: BigNumber;
    onlyTo: string;
    partialAllowed: boolean;
    pricePerUnit: BigNumber;
    orderType: StringAssetType;
  };
}

export interface Cancel {
  // tx hash
  id: string;
  sellerGetsBackAmount: string;
  createdAt: string;
}

export interface Order {
  // orderHash
  id: string;
  seller: string;
  sellAsset: Asset;
  buyAsset: Asset;
  strategyType: string;
  salt: string;
  createdAt: string;
  cancel?: Cancel;
  fills: Fill[];
  quantity: BigNumber;
  quantityLeft: BigNumber;
  startsAt: string;
  expiresAt: string;
  askPerUnitNominator: BigNumber;
  askPerUnitDenominator: BigNumber;
  onlyTo: string;
  partialAllowed: boolean;
  pricePerUnit: BigNumber;
  orderType: string;
}

export interface Balance {
  user: string;
  tokenAddress: string;
  tokenId: string;
  blockNumber?: number;
  walletAmount?: BigNumber;
  escrowAmount?: BigNumber;
  warehouseAllowanceAmount?: BigNumber;
  tokenType?: StringAssetType;
}

export interface BalanceQuery {
  userAddress: string;
  tokenAddress: string;
  tokenType?: StringAssetType; // defaults ERC20
  tokenId?: number | string; // defaults to 0 - erc20 token
}

export interface LastTradedPrice {
  amount: BigNumber;
  id: string;
  orderType: StringOrderType;
  unitPrice: BigNumber;
  user: string;
  askPerUnitDenominator: BigNumber;
  askPerUnitNominator: BigNumber;
}
