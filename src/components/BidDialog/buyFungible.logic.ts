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

export const buyFungible = ({
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

  // buy quantity is the amount of native to buy in ether
  try {
    quantity = quantityText
      ? parseUnits(quantityText, decimals)
      : BigNumber.from('0');
    quantityError = undefined;
  } catch {
    quantity = BigNumber.from('0');
    quantityError = 'Invalid quantity value';
  }

  if (quantity.lt('0')) {
    quantity = BigNumber.from('0');
    quantityError = 'Invalid quantity value';
  }

  orderAmount =
    ppu && quantity ? ppu.mul(quantity).div(TEN_POW_18) : BigNumber.from('0');

  amountToApprove = orderAmount;

  brutto = orderAmount;

  askPerUnitNominator = parseUnits('1', decimals);
  askPerUnitDenominator = ppu ?? BigNumber.from('1');

  royaltyFee =
    feeValue?.mul(orderAmount).div(FRACTION_TO_BPS) ?? BigNumber.from('0');
  protocolFee = orderAmount.mul(PROTOCOL_FEE_BPS).div(FRACTION_TO_BPS);

  netto = orderAmount.sub(royaltyFee).sub(protocolFee);

  displayQuantity = Fraction.from(quantity?.toString(), decimals)?.toFixed(5);
  //displayQuantity = quantity?.toString()
  //orderAmount = orderAmount.mul(TEN_POW_18)

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
