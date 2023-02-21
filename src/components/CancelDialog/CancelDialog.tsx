import { useState } from 'react';
import { CircularProgress, Typography, Divider } from '@mui/material';
import { useActiveWeb3React, useCancelDialog, useClasses } from '../../hooks';
import { SuccessIcon } from 'icons';
import { Dialog, Button } from 'ui';
import { styles } from './CancelDialog.styles';
import { ChainId } from '../../constants';
import { getExplorerLink } from 'utils';
import { useSubmittedCancelTx } from 'state/transactions/hooks';
import { ExternalLink } from 'components/ExternalLink/ExternalLink';
import {
  CancelOrderCallbackState,
  useCancelOrderCallback,
} from 'hooks/marketplace/useCancelOrderCallback';
import { AddressDisplayComponent } from 'components/form/AddressDisplayComponent';
import { appStyles } from 'app.styles';

export const CancelDialog = () => {
  const [finalTxSubmitted, setFinalTxSubmitted] = useState<boolean>(false);
  const { isCancelDialogOpen, setCancelDialogOpen, cancelData } =
    useCancelDialog();
  const [orderLoaded, setOrderLoaded] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<unknown | undefined>(
    undefined
  );

  const {
    dialogContainer,
    loadingContainer,
    button,
    divider,
    infoContainer,
    successContainer,
    successIcon,
    nakedInput,
  } = useClasses(styles);

  const { formButton } = useClasses(appStyles);

  const { chainId } = useActiveWeb3React();

  const handleClose = () => {
    setCancelDialogOpen(false);
    setGlobalError(undefined);
    setFinalTxSubmitted(false);
  };

  if (!orderLoaded && cancelData && cancelData?.orderHash) {
    setOrderLoaded(true);
  }

  const { state: cancelOrderState, callback: cancelOrderCallback } =
    useCancelOrderCallback(cancelData?.orderHash);

  const { cancelSubmitted, cancelTx } = useSubmittedCancelTx(
    cancelData?.orderHash
  );

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

    if (finalTxSubmitted && !cancelSubmitted) {
      return (
        <>
          <div className={loadingContainer}>
            <CircularProgress />
            <div>
              <Typography>Placing cancel transaction...</Typography>
              <Typography color="textSecondary" variant="h5">
                Check your wallet for potential action
              </Typography>
            </div>
          </div>
        </>
      );
    }
    if (finalTxSubmitted && cancelSubmitted) {
      return (
        <div className={successContainer}>
          <SuccessIcon className={successIcon} />
          <Typography>Cancel submited</Typography>
          <Typography color="primary">{cancelData?.orderHash}</Typography>

          {cancelTx && (
            <ExternalLink
              href={getExplorerLink(
                chainId ?? ChainId.MOONRIVER,
                cancelTx.hash,
                'transaction'
              )}
            >
              {cancelTx.hash}
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
        <div className={infoContainer}>
          <Typography>Order to cancel</Typography>
          <AddressDisplayComponent charsShown={10} dontShowLink={true}>
            {cancelData?.orderHash}
          </AddressDisplayComponent>
        </div>

        <Divider variant="fullWidth" className={divider} />

        <Button
          onClick={async () => {
            setFinalTxSubmitted(true);
            try {
              await cancelOrderCallback?.();
            } catch (err) {
              setGlobalError(err);
              setFinalTxSubmitted(false);
            }
          }}
          className={button}
          variant="contained"
          color="primary"
          disabled={cancelOrderState !== CancelOrderCallbackState.VALID}
        >
          Cancel order
        </Button>
        <Button
          className={button}
          onClick={handleClose}
          variant="outlined"
          color="primary"
        >
          Back
        </Button>
      </>
    );
  };
  return (
    <Dialog
      open={isCancelDialogOpen}
      onClose={handleClose}
      title={'Cancel order'}
    >
      <div className={dialogContainer}>{renderBody()}</div>
    </Dialog>
  );
};
