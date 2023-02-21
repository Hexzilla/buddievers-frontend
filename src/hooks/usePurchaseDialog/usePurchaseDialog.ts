import { useContext } from 'react';
import { PurchaseDialogContext } from 'context/purchaseDialog/purchaseDialogContext/PurchaseDialogContext';

export const usePurchaseDialog = () => {
  const context = useContext(PurchaseDialogContext);

  if (context === undefined) {
    throw new Error(
      'usePurchaseDialog must be used within an PurchaseDialogContextController'
    );
  }
  return context;
};
