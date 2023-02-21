import { useContext } from 'react';
import { TransferDialogContext } from '../../context/transferDialog/transferDialogContext/TransferDialogContext';

export const useTransferDialog = () => {
  const context = useContext(TransferDialogContext);

  if (context === undefined) {
    throw new Error(
      'useTransferDialog must be used within an TransferDialogContextController'
    );
  }
  return context;
};
