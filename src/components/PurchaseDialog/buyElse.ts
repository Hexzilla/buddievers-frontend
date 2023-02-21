import { parseEther, parseUnits } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber';
import { Fraction } from '../../utils/Fraction';
import { Asset } from 'hooks/marketplace/types';

export const buyElse = (
  ppu?: BigNumber,
  total?: BigNumber,
  inputAmountText?: string,
  giveAssetDecimals = 0,
  getAssetDecimals = 0
) => {
  let userGive: BigNumber;
  let userGet: BigNumber;
  let inputAmount: BigNumber;
  let sendAmount: BigNumber;
  let sendAmountError: string | undefined;
  let displayTotal: string | undefined;
  let userGetDisplay: string | undefined;
  let userGiveDisplay: string | undefined;
  let feeAsset: Asset | undefined;
  let showFee = false;

  console.log('FILL-BUY-ELSE');

  // input is in wei
  try {
    inputAmount = parseUnits(inputAmountText ?? '0', getAssetDecimals);
    sendAmountError = undefined;
  } catch {
    inputAmount = BigNumber.from('0');
    sendAmountError = 'Invalid quantity value';
  }
  displayTotal = Fraction.from(total?.toString(), getAssetDecimals)?.toFixed(
    getAssetDecimals > 0 ? 5 : 0
  );

  userGet = inputAmount;
  sendAmount = userGet;
  userGive =
    ppu?.mul(sendAmount).div(parseUnits('1', getAssetDecimals)) ??
    BigNumber.from('0');

  //userGive = sendAmount
  userGetDisplay = Fraction.from(
    userGet?.toString(),
    getAssetDecimals
  )?.toFixed(getAssetDecimals > 0 ? 5 : 0);
  userGiveDisplay = Fraction.from(
    userGive?.toString(),
    giveAssetDecimals
  )?.toFixed(giveAssetDecimals > 0 ? 5 : 0);

  return {
    userGive,
    userGet,
    sendAmount,
    sendAmountError,
    userGetDisplay,
    userGiveDisplay,
    feeAsset,
    showFee,
    displayTotal,
  };
};
