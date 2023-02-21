import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import { FRACTION_TO_BPS, PROTOCOL_FEE_BPS } from '../../constants';

export const buyElse = ({
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

  // buy - quantity is the amount of NFT to buy in wei
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

  // order amount in NATIVE CURRENCY
  orderAmount = ppu && quantity ? ppu.mul(quantity) : BigNumber.from('0');
  amountToApprove = orderAmount;

  brutto = orderAmount;

  askPerUnitNominator = BigNumber.from('1');
  askPerUnitDenominator = ppu ?? BigNumber.from('1');

  royaltyFee =
    feeValue?.mul(orderAmount).div(FRACTION_TO_BPS) ?? BigNumber.from('0');
  protocolFee = orderAmount.mul(PROTOCOL_FEE_BPS).div(FRACTION_TO_BPS);

  netto = orderAmount.sub(royaltyFee).sub(protocolFee);
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
