import { parseEther, parseUnits } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber';
import { Fraction } from '../../utils/Fraction';
import { TEN_POW_18 } from 'utils';
import { Asset } from 'hooks/marketplace/types';

export const sellElse = (
  userAsset?: Asset,
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

  try {
    inputAmount = parseUnits(inputAmountText ?? '0', giveAssetDecimals);
    sendAmountError = undefined;
  } catch {
    inputAmount = BigNumber.from('0');
    sendAmountError = 'Invalid quantity value';
  }
  displayTotal = Fraction.from(total?.toString(), giveAssetDecimals)?.toFixed(
    giveAssetDecimals > 0 ? 5 : 0
  );

  userGive = inputAmount;
  sendAmount =
    ppu?.mul(inputAmount).div(parseUnits('1', giveAssetDecimals)) ??
    BigNumber.from('0');
  //usergive = sendAmount
  userGet = sendAmount;
  userGetDisplay = Fraction.from(
    userGet?.toString(),
    getAssetDecimals
  )?.toFixed(getAssetDecimals > 0 ? 5 : 0);
  userGiveDisplay = Fraction.from(
    userGive?.toString(),
    giveAssetDecimals
  )?.toFixed(giveAssetDecimals > 0 ? 5 : 0);

  // we give an asset that might have royalty
  feeAsset = userAsset;
  showFee = true;

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
