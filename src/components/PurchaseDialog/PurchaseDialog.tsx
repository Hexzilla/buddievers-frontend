import { appStyles } from '../../app.styles';

import { useEffect, useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

import { usePurchaseDialog } from '../../hooks/usePurchaseDialog/usePurchaseDialog';
import { useTokenStaticData } from 'hooks/useTokenStaticData/useTokenStaticData';
import { useFetchTokenUri } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri';

import { Media } from 'components';
import { Dialog, Button } from 'ui';
import { Asset } from 'hooks/marketplace/types';
import { styles } from './PurchaseDialog.styles';
import { SuccessIcon } from 'icons';
import {
  ChainId,
  DEFAULT_CHAIN,
  FRACTION_TO_BPS,
  NATIVE_TOKEN_SYMBOL,
  PROTOCOL_FEE_BPS,
} from '../../constants';
import { useActiveWeb3React, useClasses } from 'hooks';
import {
  getQuantity,
  getUnitPrice,
  OrderType,
  StringAssetType,
} from 'utils/subgraph';
import { BigNumber } from '@ethersproject/bignumber';
import {
  ApprovalState,
  useApproveCallback,
} from 'hooks/useApproveCallback/useApproveCallback';
import { useSubmittedFillTx } from 'state/transactions/hooks';
import { ExternalLink } from 'components/ExternalLink/ExternalLink';
import { getExplorerLink, TEN_POW_18 } from 'utils';
import {
  FillOrderCallbackState,
  useFillOrderCallback,
} from 'hooks/marketplace/useFillOrderCallback';
import { useBalances } from 'hooks/useBalances/useBalances';
import { Box, Grid } from '@mui/material';
import { AddressDisplayComponent } from 'components/form/AddressDisplayComponent';
import { CoinQuantityField, UNIT } from 'components/form/CoinQuantityField';
import { Fraction } from 'utils/Fraction';
import { AddressZero } from '@ethersproject/constants';
import { Fee, useFees } from 'hooks/useFees/useFees';
import { sellNative } from './sellNative.logic';
import { sellElse } from './sellElse';
import { buyNative } from './buyNative';
import { buyElse } from './buyElse';

export const PurchaseDialog = () => {
  const [orderLoaded, setOrderLoaded] = useState<boolean>(false);
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [finalTxSubmitted, setFinalTxSubmitted] = useState<boolean>(false);
  const { isPurchaseDialogOpen, setPurchaseDialogOpen, purchaseData } =
    usePurchaseDialog();
  const [globalError, setGlobalError] = useState<unknown | undefined>(
    undefined
  );

  const [inputAmountText, setInputAmountText] = useState<string | undefined>(
    undefined
  );

  const { chainId, account } = useActiveWeb3React();

  const {
    dialogContainer,
    loadingContainer,
    successIcon,
    successContainer,
    image,
  } = useClasses(styles);

  //console.log({ orderLoaded, purchaseData });
  const handleClose = () => {
    setLoading(false);
    setPurchaseDialogOpen(false);
    setGlobalError(undefined);
    setOrderLoaded(false);
    setApprovalSubmitted(false);
    setFinalTxSubmitted(false);
    setInputAmountText(undefined);
  };

  const order = purchaseData?.order;
  const orderType = purchaseData?.orderType;

  if (!orderLoaded && account && order && orderType) {
    setOrderLoaded(true);
  }

  const Assets = useMemo(() => {
    if (orderType == OrderType.BUY) {
      if (order?.buyAsset) {
        return [order.buyAsset] as Asset[];
      }
    }
    if (orderType == OrderType.SELL) {
      if (order?.sellAsset) {
        return [order.sellAsset] as Asset[];
      }
    }
    return [] as Asset[];
  }, [order]);
  const staticData = useTokenStaticData(Assets);
  const metas = useFetchTokenUri(staticData);
  const assetMeta = metas?.[0];

  const title = 'Take offer';
  let symbol: string | undefined = purchaseData?.symbol ?? 'NFT';
  let assetAddress: string | undefined;
  let assetId: string | undefined;
  let assetType: StringAssetType | undefined;
  let action: string;
  let fee: Fee;
  let royaltyFee: BigNumber;
  let protocolFee: BigNumber;
  let availableLabel: string;
  let netto: BigNumber | undefined;

  const {
    askPerUnitNominator,
    askPerUnitDenominator,
    quantityLeft: quantity,
  } = order ?? {};

  const orderHash = order?.id;

  const decimals = purchaseData?.decimals ?? 0;
  const isAssetFungible = decimals > 0;
  const approvedPaymentCurrency = purchaseData?.approvedPaymentCurrency;

  const partialAllowed = order?.partialAllowed;
  const ppu = getUnitPrice(
    decimals,
    orderType,
    order?.askPerUnitNominator,
    order?.askPerUnitDenominator
  );

  // this is in native, always 18 decimals
  const displayppu = ppu ? Fraction.from(ppu.toString(), 18)?.toFixed(5) : '?';
  const symbolString = symbol ? ` ${symbol.toString()}` : '';

  const userAsset = order?.buyAsset;
  const getAsset = order?.sellAsset;

  const isGetAssetPayment =
    getAsset?.assetType?.valueOf() ===
      approvedPaymentCurrency?.assetType.valueOf() &&
    getAsset?.assetAddress === approvedPaymentCurrency?.assetAddress;

  const isGiveAssetPayment = !isGetAssetPayment;

  let giveAssetDecimals = 0;
  let getAssetDecimals = 0;

  if (isGetAssetPayment) {
    getAssetDecimals = 18;
    giveAssetDecimals = decimals;
  } else {
    giveAssetDecimals = 18;
    getAssetDecimals = decimals;
  }

  const total = getQuantity(
    orderType,
    quantity,
    askPerUnitNominator,
    askPerUnitDenominator
  );

  let meat;

  if (orderType === OrderType.BUY) {
    action = 'SELL';

    availableLabel = 'Total requested';

    assetAddress = userAsset?.assetAddress;
    assetId = userAsset?.assetId;
    assetType = userAsset?.assetType;

    // we sell our erc20 into a buy order
    if (isGiveAssetPayment) {
      meat = sellNative(
        ppu,
        total,
        inputAmountText,
        giveAssetDecimals,
        getAssetDecimals
      );
    } else {
      meat = sellElse(
        userAsset,
        ppu,
        total,
        inputAmountText,
        giveAssetDecimals,
        getAssetDecimals
      );
    }
  } else {
    action = 'BUY';

    availableLabel = 'Total available';

    assetAddress = getAsset?.assetAddress;
    assetId = getAsset?.assetId;
    assetType = getAsset?.assetType;

    // we buy into a sell order, which is the native token
    if (isGetAssetPayment) {
      meat = buyNative(
        ppu,
        total,
        inputAmountText,
        giveAssetDecimals,
        getAssetDecimals
      );

      // we buy into a sell order, which is an NFT
    } else {
      console.log('buyELSE', partialAllowed);
      meat = buyElse(
        ppu,
        total,
        inputAmountText,
        giveAssetDecimals,
        getAssetDecimals
      );
    }
  }

  const {
    userGive,
    userGet,
    sendAmount,
    sendAmountError,
    userGetDisplay,
    userGiveDisplay,
    feeAsset,
    showFee,
    displayTotal,
  } = meat;

  useEffect(() => {
    if (total && displayTotal) {
      if (!partialAllowed || total.eq('1')) {
        setInputAmountText(displayTotal?.toString());
      }
    }
  }, [partialAllowed, total, displayTotal]);

  const [approvalState, approveCallback] = useApproveCallback({
    assetAddress: userAsset?.assetAddress,
    assetId: userAsset?.assetId,
    assetType: userAsset?.assetType,
    amountToApprove: userGive,
  });

  const userAssetBalance = useBalances([
    {
      assetAddress: userAsset?.assetAddress,
      assetId: userAsset?.assetId,
      assetType: userAsset?.assetType,
      id: userAsset?.assetId,
    },
  ])?.[0];

  const hasEnough = userAssetBalance?.gte(userGive);

  const displayBalance = Fraction.from(
    userAssetBalance?.toString(),
    giveAssetDecimals
  )?.toFixed(giveAssetDecimals > 0 ? 5 : 0);

  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approvalState, approvalSubmitted]);

  fee = useFees([feeAsset])?.[0];
  royaltyFee =
    fee?.value?.mul(userGet).div(FRACTION_TO_BPS) ?? BigNumber.from('0');
  protocolFee = userGet.mul(PROTOCOL_FEE_BPS).div(FRACTION_TO_BPS);

  if (showFee) {
    netto = userGet.sub(protocolFee).sub(royaltyFee);
  }

  console.log('debug fill fee', {
    showFee,
    royaltyFee,
    protocolFee,
    isGiveAssetPayment,
    giveAssetDecimals,
    isGetAssetPayment,
    getAssetDecimals,
  });

  const {
    state: fillOrderState,
    callback: fillOrderCallback,
    error,
  } = useFillOrderCallback(
    orderHash,
    {
      buyer: account,
      quantity: sendAmount,
    },
    {
      native:
        userAsset?.assetAddress === AddressZero &&
        userAsset?.assetType.valueOf() === StringAssetType.NATIVE,
      userGive,
    }
  );

  const { fillSubmitted, fillTx } = useSubmittedFillTx(order?.id);

  const showApproveFlow =
    approvalState === ApprovalState.NOT_APPROVED ||
    approvalState === ApprovalState.PENDING;

  /*
  console.log('approveflow', {
    showApproveFlow,
    approvalState,
    fillOrderState,
    fillSubmitted,
    error,
  });
  */

  console.warn('debug FILL', {
    hasEnough,
    buyer: account?.toString(),
    quantity: quantity?.toString(),
    usergive: userGive?.toString(),
    userget: userGet?.toString(),
    sendAmount: sendAmount?.toString(),
    ppu: ppu?.toString(),
    askPerUnitDenominator: askPerUnitDenominator?.toString(),
    askPerUnitNominator: askPerUnitNominator?.toString(),
    isGetAssetPayment,
    isGiveAssetPayment,
    getAssetDecimals,
    giveAssetDecimals,
    showApproveFlow,
    approvalState,
    fillOrderState,
    fillSubmitted,
    error,
    amountToApprove: userGive?.toString(),
  });

  const {
    divider,
    borderStyleDashed,
    infoContainer,
    button,
    //
    row,
    //
    formBox,
    formLabel,
    formValue,
    formValueGive,
    formValueGet,
    formValueTokenDetails,
    formSubheader,
    fieldError,
    formButton,
  } = useClasses(appStyles);

  const renderBody = () => {
    if (!orderLoaded) {
      return (
        <div className={loadingContainer}>
          <CircularProgress />
          <div>
            <Typography>Loading order details</Typography>
            <Typography color="textSecondary" variant="h5">
              Should be a jiffy
            </Typography>
          </div>
        </div>
      );
    }

    if (!!globalError) {
      return (
        <div className={successContainer}>
          <Typography>Something went wrong</Typography>
          <Typography color="textSecondary" variant="h5">
            {((globalError as Error)?.message as string) ?? 'Unknown error'}
          </Typography>
          <Button
            className={formButton}
            onClick={() => {
              setGlobalError(undefined);
            }}
            color="primary"
          >
            Back
          </Button>
        </div>
      );
    }

    if (finalTxSubmitted && !fillSubmitted) {
      return (
        <>
          <div className={loadingContainer}>
            <CircularProgress />
            <div>
              <Typography>Placing your fill...</Typography>
              <Typography color="textSecondary" variant="h5">
                Check your wallet for action
              </Typography>
            </div>
          </div>
        </>
      );
    }
    if (finalTxSubmitted && fillSubmitted) {
      return (
        <div className={successContainer}>
          <SuccessIcon className={successIcon} />
          <Typography>{`Fill placed`}</Typography>
          <Typography color="primary">{orderHash}</Typography>

          {fillTx && (
            <ExternalLink
              href={getExplorerLink(
                chainId ?? ChainId.MOONRIVER,
                fillTx.hash,
                'transaction'
              )}
            >
              {fillTx.hash}
            </ExternalLink>
          )}
          <Button
            className={button}
            onClick={handleClose}
            variant="outlined"
            color="primary"
          >
            Close
          </Button>
        </div>
      );
    }

    return (
      <>
        <form>
          <Box className={formBox}>
            <div className={infoContainer}>
              <Typography className={formSubheader}>Action</Typography>
              <Typography className={formValue}>
                {action} {assetType}
              </Typography>
            </div>

            <Divider variant="fullWidth" className={divider} />

            <Typography className={formSubheader}>Token Details</Typography>

            <Grid container spacing={1} justifyContent="center">
              <Grid item md={4} xs={12}>
                <Media uri={assetMeta?.image} className={image} />
              </Grid>
              <Grid
                item
                md={8}
                xs={12}
                justifyContent="flex-end"
                display="flex"
                flexDirection="column"
              >
                <div className={row}>
                  <div className={formLabel}>Address</div>
                  <AddressDisplayComponent
                    className={`${formValue} ${formValueTokenDetails}`}
                    charsShown={5}
                  >
                    {assetAddress ?? '?'}
                  </AddressDisplayComponent>
                </div>
                <div className={row}>
                  <div className={formLabel}>ID</div>
                  <div className={`${formValue} ${formValueTokenDetails}`}>
                    {assetId}
                  </div>
                </div>
                <div className={row}>
                  <div className={formLabel}>Price per unit</div>
                  <div
                    className={`${formValue} ${formValueTokenDetails}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      flexWrap: 'nowrap',
                    }}
                  >
                    {`${displayppu} ${
                      approvedPaymentCurrency?.symbol ??
                      NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]
                    }`}
                  </div>
                </div>
                <div className={row}>
                  <div className={formLabel}>{availableLabel}</div>
                  <div
                    className={`${formValue} ${formValueTokenDetails}`}
                    style={{
                      justifyContent: 'flex-end',
                    }}
                  >
                    {displayTotal ?? '?'} {symbolString}
                  </div>
                </div>
              </Grid>
            </Grid>
            <Divider
              variant="fullWidth"
              className={`${divider} ${borderStyleDashed}`}
            />

            {orderType?.valueOf() === OrderType.BUY && (
              <>
                <div className={infoContainer}>
                  <Typography className={formLabel}>Your balance</Typography>
                  <Typography className={formValue}>
                    {displayBalance ?? '?'} {symbolString}
                  </Typography>
                </div>

                {partialAllowed && total && total.gt('1') ? (
                  <div className={infoContainer}>
                    <Typography className={formLabel}>You sell</Typography>

                    <CoinQuantityField
                      id="input-amount"
                      className={formValue}
                      value={inputAmountText}
                      setValue={setInputAmountText}
                      setMaxValue={() => {
                        console.log('maaax', total?.toString());
                        console.log(
                          Fraction.from(
                            total?.toString() ?? '0',
                            giveAssetDecimals
                          )?.toFixed(giveAssetDecimals)
                        );
                        setInputAmountText(
                          Fraction.from(
                            total?.toString() ?? '0',
                            giveAssetDecimals
                          )?.toFixed(giveAssetDecimals)
                        );
                      }}
                      withMaxButton={true}
                      // onChange={handleInputAmountChange}
                      // inputProps={{ min: 0, max: total?.toNumber() }}
                    ></CoinQuantityField>
                  </div>
                ) : (
                  <div className={infoContainer}>
                    <Typography className={formLabel}>You sell</Typography>
                    <Typography className={formValue}>
                      {displayTotal} {symbolString}
                    </Typography>
                  </div>
                )}

                {sendAmountError && (
                  <div className={fieldError}>{sendAmountError}</div>
                )}

                <div className={infoContainer}>
                  <Typography className={formLabel}>You get brutto</Typography>
                  <Typography className={formValueGet}>
                    {userGetDisplay}{' '}
                    {approvedPaymentCurrency?.symbol ??
                      NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                  </Typography>
                </div>

                {showFee && protocolFee && (
                  <div className={infoContainer}>
                    <Typography className={formLabel}>Protocol fee</Typography>
                    <Typography className={`${formValue}`}>
                      {Fraction.from(protocolFee?.toString(), 18)?.toFixed(5)}{' '}
                      {approvedPaymentCurrency?.symbol ??
                        NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                    </Typography>
                  </div>
                )}

                {showFee && royaltyFee && (
                  <div className={infoContainer}>
                    <Typography className={formLabel}>Royalty fee</Typography>
                    <Typography className={`${formValue}`}>
                      {Fraction.from(royaltyFee.toString(), 18)?.toFixed(5)}{' '}
                      {approvedPaymentCurrency?.symbol ??
                        NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                    </Typography>
                  </div>
                )}

                {showFee && netto && (
                  <div className={infoContainer}>
                    <Typography className={formLabel}>You get netto</Typography>
                    <Typography className={`${formValueGet}`}>
                      {Fraction.from(netto.toString(), 18)?.toFixed(5)}{' '}
                      {approvedPaymentCurrency?.symbol ??
                        NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                    </Typography>
                  </div>
                )}
              </>
            )}

            {orderType?.valueOf() === OrderType.SELL && (
              <>
                {partialAllowed && total && total.gt('1') ? (
                  <div className={infoContainer}>
                    <Typography className={formLabel}>You buy</Typography>
                    <CoinQuantityField
                      id="input-amount"
                      className={formValue}
                      value={inputAmountText}
                      setValue={setInputAmountText}
                      setMaxValue={() => {
                        console.log('maaax', total?.toString());
                        console.log(
                          Fraction.from(
                            total?.toString() ?? '0',
                            getAssetDecimals
                          )?.toFixed(getAssetDecimals)
                        );
                        setInputAmountText(
                          Fraction.from(
                            total?.toString() ?? '0',
                            getAssetDecimals
                          )?.toFixed(getAssetDecimals)
                        );
                      }}
                      withMaxButton={true}
                      symbolString={symbolString}
                      // onChange={handleInputAmountChange}
                      // inputProps={{ min: 0, max: total?.toNumber() }}
                    ></CoinQuantityField>
                  </div>
                ) : (
                  <div className={infoContainer}>
                    <Typography className={formLabel}>You buy</Typography>
                    <Typography className={formValue}>
                      {displayTotal} {symbolString}
                    </Typography>
                  </div>
                )}

                {sendAmountError && (
                  <div className={fieldError}>{sendAmountError}</div>
                )}

                <div className={infoContainer}>
                  <Typography className={formLabel}>Your balance</Typography>
                  <Typography className={formValue}>
                    {displayBalance ?? '?'}{' '}
                    {approvedPaymentCurrency?.symbol ??
                      NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                  </Typography>
                </div>

                <div className={infoContainer}>
                  <Typography className={formValueGive}>You give</Typography>
                  <Typography className={formValue}>
                    {userGiveDisplay}{' '}
                    {approvedPaymentCurrency?.symbol ??
                      NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                  </Typography>
                </div>
              </>
            )}
          </Box>
        </form>

        {showApproveFlow ? (
          <Button
            onClick={() => {
              approveCallback();
              setApprovalSubmitted(true);
            }}
            className={button}
            variant="contained"
            color="primary"
            disabled={approvalState === ApprovalState.PENDING || !hasEnough}
          >
            Approve
          </Button>
        ) : (
          <Button
            onClick={async () => {
              setFinalTxSubmitted(true);
              try {
                await fillOrderCallback?.();
              } catch (err) {
                setGlobalError(err);
                setFinalTxSubmitted(false);
              }
            }}
            className={button}
            variant="contained"
            color="primary"
            disabled={
              fillOrderState !== FillOrderCallbackState.VALID || !hasEnough
            }
          >
            Take offer
          </Button>
        )}

        <Button
          className={button}
          onClick={handleClose}
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
      </>
    );
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      open={isPurchaseDialogOpen}
      onClose={loading ? undefined : handleClose}
      title={loading ? 'Follow steps' : title}
    >
      <div className={dialogContainer}>{renderBody()}</div>
    </Dialog>
  );
};
