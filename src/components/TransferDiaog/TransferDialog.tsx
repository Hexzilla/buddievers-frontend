import { BigNumber } from '@ethersproject/bignumber';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { AssetLink } from 'components/AssetLink/AssetLink';
import { ExternalLink } from 'components/ExternalLink/ExternalLink';
import { AddressDisplayComponent } from 'components/form/AddressDisplayComponent';
import { NumberFieldWithMaxButton } from 'components/form/NumberFieldWithMaxButton';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { StringAssetType } from 'utils/subgraph';
import { parseUnits } from '@ethersproject/units';
import { useBalances } from 'hooks/useBalances/useBalances';
import {
  TransferState,
  useTransferCallback,
} from 'hooks/useTransferCallback/useTransferCallback';
import { SuccessIcon } from 'icons/Success/success';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSubmittedTransferTx } from 'state/transactions/hooks';
import { Button, Dialog } from 'ui';
import { getExplorerLink } from 'utils';
import * as yup from 'yup';
import { appStyles } from '../../app.styles';
import { ChainId } from '../../constants';
import { useTransferDialog } from '../../hooks/useTransferDialog/useTransferDialog';
import { styles } from './TransferDialog.styles';
import { Box, FormControl, OutlinedInput } from '@mui/material';
import { Fraction } from 'utils/Fraction';
import { useClasses } from '../../hooks';

const makeTransferFormDataSchema = (): yup.ObjectSchema<TransferFormData> =>
  yup
    .object({
      recipient: yup
        .string()
        .length(42, 'An address have 42 characters.')
        .isAddress('Expected a valid Ethereum address.')
        .required(),
    })
    .required();

// type TransferFormData = yup.TypeOf<
//   ReturnType<typeof makeTransferFormDataSchema>
// >;
type TransferFormData = {
  recipient: string;
};

export const TransferDialog = () => {
  const [finalTxSubmitted, setFinalTxSubmitted] = useState<boolean>(false);
  const { isTransferDialogOpen, setTransferDialogOpen, transferData } =
    useTransferDialog();
  const [orderLoaded, setOrderLoaded] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<unknown | undefined>(
    undefined
  );

  const [quantityText, setQuantityText] = useState<string | undefined>(
    undefined
  );

  let amountError: string | undefined;

  const {
    divider,
    infoContainer,
    button,
    formBox,
    formLabel,
    formValue,
    fieldError,
    formButton,
  } = useClasses(appStyles);

  const { dialogContainer, loadingContainer, successContainer, successIcon } =
    useClasses(styles);

  const { chainId } = useActiveWeb3React();

  const handleClose = () => {
    setTransferDialogOpen(false);
    setGlobalError(undefined);
    setFinalTxSubmitted(false);
  };

  if (
    !orderLoaded &&
    transferData &&
    transferData.asset &&
    transferData.asset.assetAddress &&
    transferData.asset.assetType
  ) {
    setOrderLoaded(true);
  }

  const makeformDataSchema = () => {};
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
    getValues,
  } = useForm<TransferFormData>({
    mode: 'onTouched',
    shouldUnregister: true,
    resolver: yupResolver(makeTransferFormDataSchema()),
  });

  const userBalance = useBalances([transferData?.asset])?.[0];

  const decimals = transferData?.decimals ?? 0;

  let quantity: BigNumber;
  let youhave: string | undefined;
  try {
    quantity = quantityText
      ? parseUnits(quantityText, decimals)
      : BigNumber.from('0');
    amountError = undefined;
  } catch {
    quantity = BigNumber.from('0');
    amountError = 'Invalid quantity value';
  }

  youhave = userBalance
    ? Fraction.from(userBalance.toString(), decimals)?.toFixed(decimals)
    : '0';
  amountError = undefined;

  const { state: transferState, callback: transferCallback } =
    // TODO: useTransferCallback shouldn't repeat the same validation already performed by the form.
    useTransferCallback({
      amount: quantity,
      to: getValues('recipient') ?? '',
      asset: transferData?.asset,
    });

  const { transferSubmitted, transferTx } = useSubmittedTransferTx(
    transferData?.asset,
    quantity
  );

  console.warn('transferdialog', {
    finalTxSubmitted,
    transferSubmitted,
    transferTx,
    transferState,
    quantity: quantity.toString(),
    quantityText,
    amountError,
    to: getValues('recipient') ?? '',
  });

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

    if (finalTxSubmitted && !transferSubmitted) {
      return (
        <>
          <div className={loadingContainer}>
            <CircularProgress />
            <div>
              <Typography>Placing transfer transaction...</Typography>
              <Typography color="textSecondary" variant="h5">
                Check your wallet for potential action
              </Typography>
            </div>
          </div>
        </>
      );
    }
    if (finalTxSubmitted && transferSubmitted) {
      return (
        <div className={successContainer}>
          <SuccessIcon className={successIcon} />
          <Typography>Transfer submitted</Typography>
          <Typography color="primary">
            {transferData?.asset.assetAddress}
          </Typography>
          <Typography color="primary">{transferData?.asset.assetId}</Typography>
          <Typography color="primary">
            {transferData?.asset.assetType}
          </Typography>

          {transferTx && (
            <ExternalLink
              href={getExplorerLink(
                chainId ?? ChainId.MOONRIVER,
                transferTx.hash,
                'transaction'
              )}
            >
              {transferTx.hash}
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
              <Typography className={formLabel}>Type</Typography>
              <Typography className={formValue}>
                {transferData?.asset?.assetType ?? '?'}
              </Typography>
            </div>

            <div className={infoContainer}>
              <Typography className={formLabel}>Address</Typography>
              <AddressDisplayComponent className={formValue} charsShown={10}>
                {transferData?.asset?.assetAddress ?? '?'}
              </AddressDisplayComponent>
            </div>

            {transferData?.asset?.assetType?.valueOf() !==
              StringAssetType.ERC20 && (
              <div className={infoContainer}>
                <Typography className={formLabel}>ID</Typography>
                <AssetLink href="#" asset={transferData?.asset}>
                  <Typography className={formValue}>
                    {transferData?.asset?.assetId ?? '?'}
                  </Typography>
                </AssetLink>
              </div>
            )}

            <Divider variant="fullWidth" className={divider} />

            <div className={infoContainer}>
              <Typography className={formLabel}>You have</Typography>
              <Typography className={formValue}>
                {youhave?.toString() ?? '0'}
              </Typography>
            </div>

            <div className={infoContainer}>
              <Typography className={formLabel}>You send</Typography>

              <NumberFieldWithMaxButton
                id="send-amount"
                type="number"
                label="Amount"
                setMaxValue={() => {
                  setQuantityText(
                    Fraction.from(
                      userBalance?.toString() ?? '0',
                      decimals
                    )?.toFixed(decimals)
                  );
                }}
                className={formValue}
                value={quantityText}
                setValue={setQuantityText}
              />
            </div>
            {amountError && <div className={fieldError}>{amountError}</div>}

            <div className={infoContainer}>
              <Typography className={formLabel}>Recipient</Typography>
              <FormControl className={formValue} variant="outlined">
                <Controller
                  control={control}
                  name="recipient"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <OutlinedInput
                      id="recipient"
                      type="text"
                      // onChange={(event: any) => setTo(event.target.value)}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={'0x0...'}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className={fieldError}>{errors.recipient?.message}</div>
          </Box>

          <Button
            onClick={async () => {
              setFinalTxSubmitted(true);
              try {
                await transferCallback?.();
              } catch (err) {
                setGlobalError(err);
                setFinalTxSubmitted(false);
              }
            }}
            className={formButton}
            variant="contained"
            color="primary"
            disabled={transferState !== TransferState.VALID}
          >
            Transfer
          </Button>
          <Button
            className={formButton}
            onClick={handleClose}
            color="secondary"
          >
            Cancel
          </Button>
        </form>
      </>
    );
  };
  return (
    <Dialog
      open={isTransferDialogOpen}
      onClose={handleClose}
      title={'Transfer asset'}
    >
      <div className={dialogContainer}>{renderBody()}</div>
    </Dialog>
  );
};
