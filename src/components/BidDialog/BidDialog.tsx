import { BigNumber } from '@ethersproject/bignumber';
import { parseEther, parseUnits } from '@ethersproject/units';
import {
  Box,
  Collapse,
  FormControl,
  Grid,
  Stack,
  IconButton,
  OutlinedInput,
  Switch,
  TextField,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExternalLink } from 'components/ExternalLink/ExternalLink';
import { AddressDisplayComponent } from 'components/form/AddressDisplayComponent';
import { CoinQuantityField, UNIT } from 'components/form/CoinQuantityField';
import 'date-fns';
import { Media } from 'components';
import { useActiveWeb3React, useBidDialog, useClasses } from 'hooks';
import {
  ApprovalState,
  useApproveCallback,
} from 'hooks/useApproveCallback/useApproveCallback';
import { OrderType, StringAssetType } from 'utils/subgraph';
import { AddressZero } from '@ethersproject/constants';
import {
  ChainId,
  STRATEGY_SIMPLE,
  NATIVE_TOKEN_SYMBOL,
  DEFAULT_CHAIN,
} from '../../constants';
import { useBalances } from 'hooks/useBalances/useBalances';
import { useFees } from 'hooks/useFees/useFees';
import {
  CreateOrderCallbackState,
  useCreateOrderCallback,
} from 'hooks/marketplace/useCreateOrderCallback';
import {
  Asset,
  AssetType,
  calculateOrderHash,
  CreateOrderData,
  stringAssetTypeToAssetType,
} from 'utils/marketplace';
import { getExplorerLink, getRandomInt, isAddress } from '../../utils';
import { SuccessIcon } from 'icons';
import { useEffect, useMemo, useState } from 'react';
import { useSubmittedOrderTx } from 'state/transactions/hooks';
import { Button, Dialog } from 'ui';
import { appStyles } from '../../app.styles';
import { styles } from './BidDialog.styles';
import { Fraction } from 'utils/Fraction';
import { buyFungible } from './buyFungible.logic';
import { buyElse } from './buyElse.logic';
import { sellFungible } from './sellFungible.logic';
import { sellElse } from './sellElse.logic';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// type TransferFormData = yup.TypeOf<
//   ReturnType<typeof makeTransferFormDataSchema>
// >;
type BidFormData = {
  quantity?: string;
  pricePerUnit?: string;
};

export const BidDialog = () => {
  const [finalTxSubmitted, setFinalTxSubmitted] = useState<boolean>(false);
  const { isBidDialogOpen, setBidDialogOpen, bidData } = useBidDialog();
  const [orderLoaded, setOrderLoaded] = useState<boolean>(false);
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);
  const [onlyTo, setOnlyTo] = useState<{ address: string; error?: string }>({
    address: AddressZero,
  });
  const [startsAt, setStartsAt] = useState<BigNumber>(BigNumber.from('0'));
  const [expiresAt, setExpiresAt] = useState<{
    date: BigNumber;
    error?: string;
  }>({ date: BigNumber.from('0') });

  const [globalError, setGlobalError] = useState<unknown | undefined>(
    undefined
  );

  const [quantityText, setQuantityText] = useState<string | undefined>(
    undefined
  );
  const [partialAllowed, setPartialAllowed] = useState<boolean>(true);
  const [ppuText, setPPUText] = useState<string | undefined>(undefined);

  const {
    divider,
    infoContainer,
    button,
    row,
    col,
    verticalDashedLine,
    formBox,
    formLabel,
    formValue,
    formValueTokenDetails,
    formValueGive,
    formValueGet,
    spaceOnLeft,
    flexEnd,
    columGap,
    placeButtonTopSpace,
    mr15,
    fieldError,
    formButton,
    expand,
    expandOpen,
  } = useClasses(appStyles);

  const [UIAdvancedSectionExpanded, setExpanded] = useState(false);
  const UIHandleExpandClick = () => {
    setExpanded(!UIAdvancedSectionExpanded);
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined | null>(
    undefined
  );

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const v = BigNumber.from(date.valueOf()).div('1000');
      if (!v.eq(expiresAt.date)) {
        setExpiresAt({ date: v });
      }
    }
  };

  const {
    dialogContainer,
    loadingContainer,
    successContainer,
    successIcon,
    inputContainer,
    imageContainer, detailContainer, image,
  } = useClasses(styles);

  const { chainId, account } = useActiveWeb3React();

  const handleClose = () => {
    setBidDialogOpen(false);
    setOrderLoaded(false);
    setGlobalError(undefined);
    setFinalTxSubmitted(false);
    setExpiresAt({ date: BigNumber.from('0') });
    setPartialAllowed(true);
    setOnlyTo({ address: AddressZero });
    setFinalTxSubmitted(false);
    setFinalTxSubmitted(false);
    setQuantityText(undefined);
    setPPUText(undefined);
  };

  if (!orderLoaded && bidData?.asset && bidData?.orderType) {
    setOrderLoaded(true);
  }


  let title: string;
  let symbol: string | undefined = bidData?.symbol ?? 'NFT';
  let sellAssetType: StringAssetType | undefined;
  let action: string;
  let ppu: BigNumber;
  let ppuError: string | undefined;
  let displaySellBalance: string | undefined;
  let sellDecimals: number;

  let sellAssetContract: Asset;
  let buyAssetContract: Asset;

  const assetImage = bidData?.media;

  const assetAddress = bidData?.asset?.assetAddress;
  const assetId = bidData?.asset?.assetId;
  const assetType = bidData?.asset?.assetType;

  const fee = useFees([bidData?.asset])?.[0];
  const symbolString = symbol ? ` ${symbol.toString()}` : '';

  const orderType = bidData?.orderType;

  const decimals = bidData?.decimals ?? 0;

  const approvedPaymentCurrency = bidData?.approvedPaymentCurrency;

  const isAssetFungible = decimals > 0;
  const isAssetErc721 =
    assetType?.valueOf() === StringAssetType.ERC721.valueOf();

  useEffect(() => {
    if (isAssetErc721) {
      setQuantityText('1');
    }
  }, [isAssetErc721]);

  const handleOnlyToChange = (address: string) => {
    if (!address || address === '') {
      setOnlyTo({ address: AddressZero });
      return;
    }
    if (isAddress(address)) {
      setOnlyTo({ address });
    } else {
      setOnlyTo({ address: AddressZero, error: 'Invalid address' });
    }
  };

  // buy- PPU is always in ether!
  try {
    ppu = ppuText ? parseEther(ppuText) : BigNumber.from('0');
    ppuError = undefined;
  } catch {
    ppu = BigNumber.from('0');
    ppuError = 'Invalid price value';
  }

  if (ppu.lt('0')) {
    ppu = BigNumber.from('0');
    ppuError = 'Invalid price value';
  }

  let meat;
  if (orderType === OrderType.BUY) {
    title = 'Create buy offer';
    action = 'buy';

    sellAssetContract = {
      addr: approvedPaymentCurrency?.assetAddress ?? AddressZero,
      id: approvedPaymentCurrency?.assetId ?? '0',
      assetType:
        stringAssetTypeToAssetType(approvedPaymentCurrency?.assetType) ??
        AssetType.NATIVE,
    };

    sellAssetType =
      approvedPaymentCurrency?.assetType ?? StringAssetType.NATIVE;
    sellDecimals = 18;

    buyAssetContract = {
      addr: assetAddress ?? AddressZero,
      id: assetId ?? '0',
      assetType: stringAssetTypeToAssetType(assetType),
    };

    // buy- quantity input field is Ether
    if (isAssetFungible) {
      console.log('BID-BUY-FUNGIBLE');
      meat = buyFungible({
        decimals,
        ppu,
        quantityText,
        feeValue: fee?.value,
      });
    } else {
      console.log('BID-BUY-NON-FUNGIBLE');
      meat = buyElse({
        decimals,
        ppu,
        quantityText,
        feeValue: fee?.value,
      });
    }
  } else {
    title = 'Create sell offer';
    action = 'sell';

    sellAssetContract = {
      addr: assetAddress ?? AddressZero,
      id: assetId ?? '0',
      assetType: stringAssetTypeToAssetType(assetType),
    };

    sellAssetType = assetType;
    sellDecimals = decimals;

    buyAssetContract = {
      addr: approvedPaymentCurrency?.assetAddress ?? AddressZero,
      id: approvedPaymentCurrency?.assetId ?? '0',
      assetType:
        stringAssetTypeToAssetType(approvedPaymentCurrency?.assetType) ??
        AssetType.NATIVE,
    };

    // sell- quantity input field is Ether
    if (isAssetFungible) {
      console.log('BID-SELL-FUNGIBLE');
      meat = sellFungible({
        decimals,
        ppu,
        quantityText,
        feeValue: fee?.value,
      });
    } else {
      console.log('BID-SELL-NON_FUNGIBLE');
      meat = sellElse({
        decimals,
        ppu,
        quantityText,
        feeValue: fee?.value,
      });
    }
  }

  let {
    quantityError,
    orderAmount,
    amountToApprove,
    netto,
    brutto,
    askPerUnitNominator,
    askPerUnitDenominator,
    royaltyFee,
    protocolFee,
    displayQuantity,
  } = meat;

  const sellBalance = useBalances([
    {
      assetAddress: sellAssetContract.addr,
      assetId: sellAssetContract.id,
      assetType: sellAssetType,
      id: '1',
    },
  ])?.[0];

  displaySellBalance = Fraction.from(sellBalance ?? '0', sellDecimals)?.toFixed(
    sellDecimals > 0 ? 5 : 0
  );

  const hasEnough = sellBalance?.gte(amountToApprove);

  const [approvalState, approveCallback] = useApproveCallback({
    assetAddress: sellAssetContract.addr,
    assetId: sellAssetContract.id,
    assetType: sellAssetType,
    amountToApprove: amountToApprove,
  });

  // this is needed so that we do no create a new order hash with each render
  const salt = useMemo(() => {
    return getRandomInt();
  }, [isBidDialogOpen]);

  //console.log("SALT", salt)

  const orderData: CreateOrderData = {
    buyAsset: buyAssetContract,
    sellAsset: sellAssetContract,
    seller: account ?? AddressZero,
    salt: salt.toString(),
    strategy: STRATEGY_SIMPLE,
  };

  const orderHash = calculateOrderHash(orderData);
  //console.log({ expiresAt, partialAllowed });

  /* */
  console.warn('ORDER', {
    askPerUnitDenominator: askPerUnitDenominator.toString(),
    askPerUnitNominator: askPerUnitNominator.toString(),
    expiresAt: expiresAt.date.toString(),
    startsAt: startsAt.toString(),
    quantity: orderAmount?.toString(),
    onlyTo,
    partialAllowed,
    amountToApprove: amountToApprove?.toString(),
    hasEnough,
    globalError,
  });

  const {
    state: createOrderState,
    callback: createOrderCallback,
    error,
  } = useCreateOrderCallback(orderData, {
    askPerUnitDenominator,
    askPerUnitNominator,
    expiresAt: expiresAt.date,
    startsAt: startsAt,
    quantity: orderAmount,
    onlyTo: onlyTo.address,
    partialAllowed,
  });

  const { orderSubmitted, orderTx } = useSubmittedOrderTx(orderHash);

  /*
  console.warn('CREATE ORDER STATE', {
    orderSubmitted,
    orderTx,
    orderHash,
    finalTxSubmitted,
    createOrderState,
  });
  */

  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approvalState, approvalSubmitted]);

  const showApproveFlow =
    approvalState === ApprovalState.NOT_APPROVED ||
    approvalState === ApprovalState.PENDING;
  console.log('APPROVE FLOW', { showApproveFlow, approvalState, hasEnough });

  const renderBody = () => {
    if (!orderLoaded) {
      return (
        <div className={loadingContainer}>
          <CircularProgress />
          <div>
            <Typography>Loading asset details</Typography>
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

    if (finalTxSubmitted && !orderSubmitted) {
      return (
        <>
          <div className={loadingContainer}>
            <CircularProgress />
            <div>
              <Typography>Placing your offer...</Typography>
              <Typography color="textSecondary" variant="h5">
                Check your wallet for action
              </Typography>
            </div>
          </div>
        </>
      );
    }
    if (finalTxSubmitted && orderSubmitted) {
      return (
        <div className={successContainer}>
          <SuccessIcon className={successIcon} />
          <Typography>{`Order placed`}</Typography>
          <Typography color="primary">{orderHash}</Typography>

          {orderTx && (
            <ExternalLink
              href={getExplorerLink(
                chainId ?? ChainId.MOONRIVER,
                orderTx.hash,
                'transaction'
              )}
            >
              {orderTx.hash}
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
      <Stack spacing={2}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item md={12} xs={12}>
            <Box className={formBox}>
              <Typography className="form-subheader">Token Details</Typography>
              <Grid container spacing={1} justifyContent="center">
                <Grid item md={3} xs={12}>
                  <Media uri={assetImage} className={image} />
                </Grid>
                <Grid item md={9} xs={12} justifyContent="flex-end" display="flex" flexDirection="column">
                  <div className={row}>
                    <div className={formLabel}>Address</div>
                    <AddressDisplayComponent
                      className={`${formValue} ${formValueTokenDetails}`}
                      charsShown={5}
                    >
                      {bidData?.asset?.assetAddress ?? '?'}
                    </AddressDisplayComponent>
                  </div>
                  <div className={row}>
                    <div className={formLabel}>ID</div>
                    <div className={`${formValue} ${formValueTokenDetails}`}>
                      {assetId}
                    </div>
                  </div>
                  <div className={row}>
                    <div className={formLabel}>Type</div>
                    <div className={`${formValue} ${formValueTokenDetails}`}>
                      {assetType}
                    </div>
                  </div>                
                </Grid>
              </Grid>
              <Divider variant="fullWidth" className={divider} />

              <div className={inputContainer}>
                <Typography className={formLabel}>
                  Quantity to {action}
                </Typography>
                {!isAssetErc721 && (
                  <CoinQuantityField
                    id="quantity-amount"
                    className={formValue}
                    value={quantityText}
                    setValue={setQuantityText}
                    assetType={assetType}
                  ></CoinQuantityField>
                )}
                {isAssetErc721 && (
                  <Typography className={formValue}>
                    1 {symbolString}
                  </Typography>
                )}
              </div>
              {quantityError && (
                <div className={fieldError}>{quantityError}</div>
              )}

              <div className={inputContainer}>
                <Typography className={formLabel}>Price per unit</Typography>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  style={{ width: 'auto' }}
                  className={`${formValue}`}
                >
                  <Grid item>
                    <Typography className={formLabel}>
                      {approvedPaymentCurrency?.symbol ?? NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="ppa-amount"
                      variant="outlined"
                      className={formValue}
                      value={ppuText}
                      onChange={(event) => setPPUText(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </div>
              {ppuError && <div className={fieldError}>{ppuError}</div>}

              <div className={infoContainer}>
                <Typography className={formLabel}>
                  Partial fills allowed
                </Typography>
                <Switch
                  checked={partialAllowed}
                  // onChange={(event) =>
                  //   setPartialAllowed(event.target.checked)
                  // }
                  name="partialAllowed"
                  onChange={(event) => setPartialAllowed(event.target.checked)}
                />
              </div>
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <Box className={formBox}>
              <Grid
                container
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography className="form-subheader">Advanced</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    className={UIAdvancedSectionExpanded ? expandOpen : expand}
                    onClick={UIHandleExpandClick}
                    aria-expanded={UIAdvancedSectionExpanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Grid>
              </Grid>

              <Collapse
                in={UIAdvancedSectionExpanded}
                timeout="auto"
                unmountOnExit
              >
                <div className={infoContainer}>
                  <Typography className={formLabel}>Expiration</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <FormControl
                      className={`${formValue} ${spaceOnLeft}`}
                      variant="outlined"
                    >
                      <DatePicker
                        disablePast
                        inputFormat="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </FormControl>
                  </LocalizationProvider>
                </div>
                <div className={infoContainer}>
                  <Typography className={mr15}>Exclusive to</Typography>
                  <FormControl className={formValue} variant="outlined">
                    {/* <Controller */}
                    {/* control={control} */}
                    {/* render={({ field: { onChange, onBlur, value, ref } }) => ( */}
                    <OutlinedInput
                      id="exlusive-to-address"
                      type="text"
                      // onChange={onChange}
                      onChange={(event) =>
                        handleOnlyToChange(event.target.value)
                      }
                      // onBlur={onBlur}
                      // value={value}
                      placeholder={'0x0...'}
                    />
                    {/* )} */}
                    {/* /> */}
                  </FormControl>
                </div>
                {!!onlyTo.error && (
                  <div className={fieldError}>{onlyTo.error}</div>
                )}
              </Collapse>
            </Box>
          </Grid>

          {/* <Grid item className={verticalDashedLine}></Grid> */}
          <Grid item md={6} xs={12}>
            <Box className={formBox}>
              {orderType?.valueOf() === OrderType.SELL && (
                <>
                  <div className={infoContainer}>
                    <Typography className={`${formLabel} ${mr15}`}>You have</Typography>
                    <div className={`${flexEnd}`}>
                      <Typography className={`${formValue}`}>
                        {displaySellBalance ?? '?'} {symbolString}
                      </Typography>
                    </div>

                  </div>

                  <div className={infoContainer}>
                    <Typography className={`${formLabel} ${mr15}`}>You give</Typography>
                    <Typography className={`${formValueGive}`}>
                      {displayQuantity} {symbolString}
                    </Typography>
                  </div>
                  <div className={infoContainer}>
                    <Typography className={`${formLabel} ${mr15}`}>
                      You get brutto
                    </Typography>
                    <Typography className={`${formValueGet}`}>
                      {Fraction.from(brutto.toString(), 18)?.toFixed(5)}{' '}
                      {approvedPaymentCurrency?.symbol ?? NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                    </Typography>
                  </div>

                  {protocolFee && (
                    <div className={infoContainer}>
                      <Typography className={`${formLabel} ${mr15}`}>
                        Protocol fee
                      </Typography>
                      <Typography className={`${formValue}`}>
                        {Fraction.from(protocolFee?.toString(), 18)?.toFixed(5)}{' '}
                        {approvedPaymentCurrency?.symbol ?? NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                      </Typography>
                    </div>
                  )}

                  {royaltyFee && (
                    <div className={infoContainer}>
                      <Typography className={`${formLabel} ${mr15}`}>Royalty fee</Typography>
                      <Typography className={`${formValue}`}>
                        {Fraction.from(royaltyFee.toString(), 18)?.toFixed(5)}{' '}
                        {approvedPaymentCurrency?.symbol ?? NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                      </Typography>
                    </div>
                  )}

                  <div className={infoContainer}>
                    <Typography className={`${formLabel} ${mr15}`}>You get netto</Typography>
                    <Typography className={`${formValueGet}`}>
                      {Fraction.from(netto.toString(), 18)?.toFixed(5)}{' '}
                      {approvedPaymentCurrency?.symbol ?? NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                    </Typography>
                  </div>
                </>
              )}

              {orderType?.valueOf() === OrderType.BUY && (
                <>
                  <div className={infoContainer}>
                    <Typography className={`${formLabel} ${mr15}`}>You have</Typography>
                    <Typography className={`${formValue}`}>
                      {Fraction.from(sellBalance?.toString(), 18)?.toFixed(5) ??
                        '?'}{' '}
                      {approvedPaymentCurrency?.symbol ?? NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                    </Typography>
                  </div>

                  <div className={infoContainer}>
                    <Typography className={`${formLabel} ${mr15}`}>You get</Typography>
                    <Typography className={`${formValueGet}`}>
                      {displayQuantity} {symbolString}
                    </Typography>
                  </div>
                  <div className={infoContainer}>
                    <Typography className={`${formLabel} ${mr15}`}>
                      You give brutto
                    </Typography>
                    <Typography className={`${formValue}`}>
                      {Fraction.from(orderAmount.toString(), 18)?.toFixed(5)}{' '}
                      {approvedPaymentCurrency?.symbol ?? NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                    </Typography>
                  </div>

                  {protocolFee && (
                    <div className={infoContainer}>
                      <Typography className={`${formLabel} ${mr15}`}>
                        Protocol fee
                      </Typography>
                      <Typography className={`${formValue}`}>
                        {Fraction.from(protocolFee?.toString(), 18)?.toFixed(5)}{' '}
                        {approvedPaymentCurrency?.symbol ?? NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                      </Typography>
                    </div>
                  )}

                  {royaltyFee && (
                    <div className={infoContainer}>
                      <Typography className={`${formLabel} ${mr15}`}>Royalty fee</Typography>
                      <Typography className={`${formValue}`}>
                        {Fraction.from(royaltyFee.toString(), 18)?.toFixed(5)}{' '}
                        {approvedPaymentCurrency?.symbol ?? NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                      </Typography>
                    </div>
                  )}

                  <div className={infoContainer}>
                    <Typography className={`${formLabel} ${mr15}`}>
                      You give netto
                    </Typography>
                    <Typography className={`${formValueGive}`}>
                      {Fraction.from(netto.toString(), 18)?.toFixed(5)}{' '}
                      {approvedPaymentCurrency?.symbol ?? NATIVE_TOKEN_SYMBOL[chainId ?? DEFAULT_CHAIN]}
                    </Typography>
                  </div>
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        {showApproveFlow ? (
          <Button
            onClick={() => {
              approveCallback();
              setApprovalSubmitted(true);
            }}
            className={`${button} ${placeButtonTopSpace}`}
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
                await createOrderCallback?.();
              } catch (err) {
                setGlobalError(err);
                setFinalTxSubmitted(false);
              }
            }}
            className={`${formButton} ${placeButtonTopSpace}`}
            variant="contained"
            color="primary"
            disabled={
              createOrderState !== CreateOrderCallbackState.VALID ||
              !hasEnough ||
              !!onlyTo.error
            }
          >
            Place offer
          </Button>
        )}
        <Button className={formButton} onClick={handleClose} color="primary">
          Cancel
        </Button>
      </Stack>
    );
  };
  return (
    <Dialog
      open={isBidDialogOpen}
      onClose={handleClose}
      title={title}
      maxWidth="lg"
    >
      <div className={dialogContainer}>{renderBody()}</div>
    </Dialog>
  );
};
