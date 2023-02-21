import { useContext } from 'react';
import { CancelDialogContext } from 'context/cancelDialog/cancelDialogContext/CancelDialogContext';

export const useCancelDialog = () => {
  const context = useContext(CancelDialogContext);

  if (context === undefined) {
    throw new Error(
      'useCancelDialog must be used within an CancelDialogContextController'
    );
  }
  return context;
};
