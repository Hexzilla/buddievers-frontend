import { Typography, Button } from '@mui/material';
import {
  ApprovalState,
  useApproveCallback,
} from 'hooks/useApproveCallback/useApproveCallback';
import { BigNumber } from '@ethersproject/bignumber';
import { AllowanceQuery } from 'hooks/useApproveCallback/useApproveCallback.types';
import {styles} from './MintResourceApproveItem.styles'
import { useActiveWeb3React, useClasses } from 'hooks';
import { WORKBENCH_ADDRESSES, ChainId } from '../../constants';
import { Fraction } from 'utils/Fraction';

export const MintResourceApproveItem = ({assetAddress, assetId, assetType, amount, assetName, decimals, operator}: AllowanceQuery & { amount?: string | BigNumber, assetName?: string, decimals: number }) => {
  const {chainId} = useActiveWeb3React()
  
  const [approvalState, approveCallback] = useApproveCallback({
    assetAddress,
    assetId,
    assetType,
    amountToApprove: amount,
    operator
  });

  const showApproveFlow =
    approvalState === ApprovalState.NOT_APPROVED

  const pending =
    approvalState === ApprovalState.PENDING

  const {
    approveItemContainer,
    transferButton
  } = useClasses(styles);

  console.log(approvalState, )

  const formattedAmount = Fraction.from(
        amount?.toString() ?? '0',
        decimals
      )?.toSignificant(5) ?? '0'

  return (
    <div className={approveItemContainer}>
      <Typography color="textSecondary" variant="subtitle1">
        {`${formattedAmount} ${assetName}`}
      </Typography>
      {showApproveFlow ? (
      <Button
        onClick={() => {
          approveCallback();
        }}
        variant="contained"
        color="primary"
        className={transferButton}
        disabled={!showApproveFlow}
      >
        Approve
      </Button>) :
        pending ? ('Pending') : ('Approved')
      }
    </div>
  );

}