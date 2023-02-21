import { parseEther, parseUnits } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber';
import { Fraction } from '../../utils/Fraction';
import { TEN_POW_18 } from 'utils';
import { Asset } from 'hooks/marketplace/types';

export const sellNative = (
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
    sendAmount = parseUnits(inputAmountText ?? '0', giveAssetDecimals);
    sendAmountError = undefined;
  } catch {
    sendAmount = BigNumber.from('0');
    sendAmountError = 'Invalid quantity value';
  }
  displayTotal = Fraction.from(total?.toString(), 18)?.toFixed(5);

  sendAmount = ppu?.mul(sendAmount).div(TEN_POW_18) ?? BigNumber.from('0');
  userGive = sendAmount;

  userGet = sendAmount;
  userGetDisplay = Fraction.from(
    userGet?.toString(),
    getAssetDecimals
  )?.toFixed(5);
  userGiveDisplay = Fraction.from(
    userGive?.toString(),
    giveAssetDecimals
  )?.toFixed(giveAssetDecimals > 0 ? 5 : 0);

  // we give an NFT and we check the royalty of it
  feeAsset = undefined;
  showFee = false;

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
