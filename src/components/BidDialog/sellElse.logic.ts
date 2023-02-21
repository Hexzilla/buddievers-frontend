import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import { FRACTION_TO_BPS, PROTOCOL_FEE_BPS } from '../../constants';

export const sellElse = ({
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

  // sell - quantity is the amount of NFT to sell in wei
  try {
    quantity = BigNumber.from(quantityText ?? '0');
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
  brutto = ppu && quantity ? ppu.mul(quantity) : BigNumber.from('0');

  askPerUnitNominator = ppu ?? BigNumber.from('1');
  askPerUnitDenominator = BigNumber.from('1');

  royaltyFee =
    feeValue?.mul(brutto).div(FRACTION_TO_BPS) ?? BigNumber.from('0');
  protocolFee = brutto.mul(PROTOCOL_FEE_BPS).div(FRACTION_TO_BPS);

  netto = brutto.sub(royaltyFee).sub(protocolFee);
  displayQuantity = quantity?.toString();

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
