import { AbiCoder, ParamType } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { keccak256 } from '@ethersproject/keccak256';
import { Signer } from '@ethersproject/abstract-signer';
import { StringAssetType } from './subgraph';
import { AddressZero } from '@ethersproject/constants';
import { isAddress } from '@ethersproject/address';
import { Order } from '../hooks/marketplace/types';

export enum AssetType {
  UNKNOWN = 0,
  NATIVE = 1,
  ERC20 = 2,
  ERC721 = 3,
  ERC1155 = 4,
}

export const Strategy = {
  SIMPLE: '0xb4c34ccd96d70009be083eaea45c708dff031622381acfcf6e3d07039aca39bb',
};

function encodeParameters(
  types: readonly (string | ParamType)[],
  values: readonly any[]
) {
  const abi = new AbiCoder();
  return abi.encode(types, values);
}

export interface Asset {
  addr: string;
  id: string;
  assetType: AssetType;
}

export interface CreateOrderData {
  seller: string;
  sellAsset: Asset;
  buyAsset: Asset;
  strategy: string;
  salt: string | BigNumber;
}

export interface CreateSimpleStrategyData {
  quantity: string | BigNumber;
  startsAt: string | BigNumber;
  expiresAt: string | BigNumber;
  askPerUnitNominator: string | BigNumber;
  askPerUnitDenominator: string | BigNumber;
  onlyTo: string;
  partialAllowed: boolean;
}

export function stringAssetTypeToAssetType(
  assetType?: StringAssetType
): AssetType {
  if (StringAssetType.NATIVE === assetType?.valueOf()) {
    return AssetType.NATIVE;
  }
  if (StringAssetType.ERC20 === assetType?.valueOf()) {
    return AssetType.ERC20;
  }
  if (StringAssetType.ERC721 === assetType?.valueOf()) {
    return AssetType.ERC721;
  }
  if (StringAssetType.ERC1155 === assetType?.valueOf()) {
    return AssetType.ERC1155;
  }
  return AssetType.UNKNOWN;
}

export function encodeCreateOrderData(strategyData: CreateSimpleStrategyData) {
  /*
      uint256 quantity,
      uint256 startsAt,
      uint256 expiresAt,
      uint128 askPerUnitNominator,
      uint128 askPerUnitDenominator,
      address onlyTo,
      bool partialAllowed
    */
  const {
    quantity,
    startsAt,
    expiresAt,
    askPerUnitNominator,
    askPerUnitDenominator,
    onlyTo,
    partialAllowed,
  } = strategyData;
  return encodeParameters(
    ['uint256', 'uint256', 'uint256', 'uint128', 'uint128', 'address', 'bool'],
    [
      quantity,
      startsAt,
      expiresAt,
      askPerUnitNominator,
      askPerUnitDenominator,
      onlyTo,
      partialAllowed,
    ]
  );
}

export function encodeCreateOrderDataSig(
  createOrderData: CreateOrderData,
  strategyData: CreateSimpleStrategyData
) {
  /*
      uint256 quantity,
      uint256 startsAt,
      uint256 expiresAt,
      uint128 askPerUnitNominator,
      uint128 askPerUnitDenominator,
      address onlyTo,
      bool partialAllowed
    */
  const {
    quantity,
    startsAt,
    expiresAt,
    askPerUnitNominator,
    askPerUnitDenominator,
    onlyTo,
    partialAllowed,
  } = strategyData;
  const inner = encodeParameters(
    ['uint256', 'uint256', 'uint256', 'uint128', 'uint128', 'address', 'bool'],
    [
      quantity,
      startsAt,
      expiresAt,
      askPerUnitNominator,
      askPerUnitDenominator,
      onlyTo,
      partialAllowed,
    ]
  );
  /*
      bytes32 strategy,
      uint256 salt,
      address seller,
      address sellAssetaddress,
      uint256 sellAssetId,
      uint256 sellAssetType,
      address buyAssetaddress,
      uint256 buyAssetId,
      uint256 buyAssetType,
      bytes memory extraData
   */

  const { seller, sellAsset, buyAsset, strategy, salt } = createOrderData;

  return encodeParameters(
    [
      'bytes32',
      'uint256',
      'address',
      'address',
      'uint256',
      'uint256',
      'address',
      'uint256',
      'uint256',
      'bytes',
    ],
    [
      strategy,
      salt,
      seller,
      sellAsset.addr,
      sellAsset.id,
      sellAsset.assetType.valueOf(),
      buyAsset.addr,
      buyAsset.id,
      buyAsset.assetType.valueOf(),
      inner,
    ]
  );
}

export interface FillOrderData {
  buyer: string;
  quantity: BigNumber;
}

export function encodeFillOrderData(fillOrderData?: FillOrderData) {
  /*
    address buyer,
    uint256 quantity,
  */
  if (!fillOrderData) {
    return '0x00';
  }
  const { buyer, quantity } = fillOrderData;

  return encodeParameters(['address', 'uint256'], [buyer, quantity]);
}

export interface FillOrderSigData {
  orderHash: string;
  buyer: string;
  quantity: string | BigNumber;
}

export function encodeFillOrderDataSig(fillOrderData: FillOrderSigData) {
  /*
    bytes32 orderHash
    address buyer,
    uint256 quantity,
  */
  const { orderHash, buyer, quantity } = fillOrderData;

  const inner = encodeParameters(['address', 'uint256'], [buyer, quantity]);

  const final = encodeParameters(['bytes32', 'bytes'], [orderHash, inner]);
  return final;
}

export function encodeCancelOrderDataSig(cancelOrderObject: {
  orderHash: string;
}) {
  const { orderHash } = cancelOrderObject;

  const inner = encodeParameters(['bytes'], ['0x00']);

  const final = encodeParameters(['bytes32', 'bytes'], [orderHash, inner]);
  return final;
}

export function bytesHexStringToMessageToSign(bytesHexString: string): Buffer {
  return Buffer.from(keccak256(bytesHexString).slice(2), 'hex');
}

export async function signBytesHexString(
  signer: Signer,
  bytesHexString: string
): Promise<string> {
  const signature = await signer.signMessage(
    bytesHexStringToMessageToSign(bytesHexString)
  );
  return signature;
}

export function calculateOrderHash(order: CreateOrderData): string {
  const { seller, sellAsset, buyAsset, strategy, salt } = order;

  const encoded = encodeParameters(
    [
      'address',
      'uint256',
      'address',
      'address',
      'uint256',
      'uint256',
      'bytes32',
    ],
    [
      sellAsset.addr,
      sellAsset.id,
      seller,
      buyAsset.addr,
      buyAsset.id,
      salt,
      strategy,
    ]
  );

  return keccak256(encoded);
}

export function sanityCheckOrder(order: Partial<CreateOrderData>) {
  if (
    !order.salt ||
    !order.seller ||
    !order.buyAsset ||
    !order.sellAsset ||
    !order.strategy
  ) {
    return false;
  }

  if (order.seller === AddressZero) {
    return false;
  }

  if (order.strategy !== Strategy.SIMPLE) {
    return false;
  }

  if (
    (order.sellAsset.addr === AddressZero &&
      order.sellAsset.assetType !== AssetType.NATIVE) ||
    (order.buyAsset.addr === AddressZero &&
      order.buyAsset.assetType !== AssetType.NATIVE)
  ) {
    return false;
  }

  return true;
}

export function sanityCheckStrategy(
  strategy: Partial<CreateSimpleStrategyData>
) {
  if (
    !strategy.askPerUnitDenominator ||
    !strategy.askPerUnitNominator ||
    !strategy.quantity ||
    !strategy.startsAt ||
    !strategy.expiresAt ||
    !strategy.onlyTo
  ) {
    return false;
  }

  if (!isAddress(strategy.onlyTo)) {
    return false;
  }

  const bnStartsAt = BigNumber.from(strategy.startsAt);
  const bnExpiresAt = BigNumber.from(strategy.expiresAt);

  const expiresZero = bnExpiresAt.eq('0');
  const startsZero = bnStartsAt.eq('0');

  if (startsZero && !expiresZero) {
    if (!expiresZero) {
      const realStartsAt = startsZero
        ? BigNumber.from(Date.now()).div('1000')
        : bnStartsAt;
      if (realStartsAt.gt(bnExpiresAt)) {
        return false;
      }
    }
  }

  if (BigNumber.from(strategy.quantity).eq('0')) {
    return false;
  }

  if (
    BigNumber.from(strategy.askPerUnitNominator).eq('0') ||
    BigNumber.from(strategy.askPerUnitDenominator).eq('0')
  ) {
    return false;
  }

  return true;
}

export const orderFilter = (order: Order, account?: string | null | undefined): boolean => {
  return order.seller !== order.onlyTo && (order.onlyTo === AddressZero || order.onlyTo === account?.toLowerCase()) && (order.expiresAt === '115792089237316195423570985008687907853269984665640564039457584007913129639935' || marketplaceDateParse(order.expiresAt) > Date.now() )
}

export const marketplaceDateParse = (marketplaceDate: string) => {
  return Number.parseInt(marketplaceDate) * 1000
}
