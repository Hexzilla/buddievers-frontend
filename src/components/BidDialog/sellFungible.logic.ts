import { BigNumber } from '@ethersproject/bignumber';
import { parseEther, parseUnits } from '@ethersproject/units';
import { TEN_POW_18 } from '../../utils';
import {
  Asset,
  AssetType,
  calculateOrderHash,
  CreateOrderData,
  stringAssetTypeToAssetType,
} from 'utils/marketplace';
import { FRACTION_TO_BPS, PROTOCOL_FEE_BPS } from '../../constants';
import { Fraction } from '../../utils/Fraction';

export const sellFungible = ({
  quantityText,
  decimals,
  ppu,
  feeValue,
}: {
  quantityText?: string;
  decimals: number;
  ppu?: BigNumber;
  feeValue?: BigNumber;
}) => {
  let orderAmount: BigNumber;
  let brutto: BigNumber;
  let protocolFee: BigNumber;
  let royaltyFee: BigNumber;
  let askPerUnitNominator: BigNumber;
  let askPerUnitDenominator: BigNumber;
  let amountToApprove: BigNumber;
  let quantity: BigNumber;
  let displayQuantity: string | undefined;
  let quantityError: string | undefined;

  let netto: BigNumber;

  // sell- quantity the amount of ERC20 to sell in ether
  try {
    quantity = parseUnits(quantityText ?? '0', decimals);
    quantityError = undefined;
  } catch {
    quantity = BigNumber.from('0');
    quantityError = 'Invalid quantity value';
  }

  if (quantity.lt('0')) {
    quantity = BigNumber.from('0');
    quantityError = 'Invalid quantity value';
  }

  orderAmount = quantity;
  amountToApprove = orderAmount;
  brutto =
    ppu && quantity ? ppu.mul(quantity).div(TEN_POW_18) : BigNumber.from('0');

  askPerUnitNominator = ppu ?? BigNumber.from('1');
  askPerUnitDenominator = parseUnits('1', decimals);

  royaltyFee =
    feeValue?.mul(brutto).div(FRACTION_TO_BPS) ?? BigNumber.from('0');
  protocolFee = brutto.mul(PROTOCOL_FEE_BPS).div(FRACTION_TO_BPS);

  netto = brutto.sub(royaltyFee).sub(protocolFee);
  displayQuantity = Fraction.from(quantity?.toString(), decimals)?.toFixed(5);

  return {
    royaltyFee,
    protocolFee,
    netto,
    brutto,
    displayQuantity,
    askPerUnitDenominator,
    askPerUnitNominator,
    orderAmount,
    amountToApprove,
    quantity,
    quantityError,
  };
};
