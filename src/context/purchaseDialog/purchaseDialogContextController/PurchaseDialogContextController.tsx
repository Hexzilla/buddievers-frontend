import React, { useEffect, useState } from 'react';

import { PurchaseDialogContext } from '../purchaseDialogContext/PurchaseDialogContext';
import { PurchaseData } from '../purchaseDialogContext/PurchaseDialogContext.types';

import { PurchaseDialogContextControllerProps } from './PurchaseDialogContextController.types';

export const PurchaseDialogContextController = ({
  children,
}: PurchaseDialogContextControllerProps) => {
  const [isPurchaseDialogOpen, setPurchaseDialogOpen] =
    useState<boolean>(false);
  const [purchaseData, setPurchaseData] = useState<PurchaseData>(null);

  useEffect(() => {
    if (!isPurchaseDialogOpen) {
      setPurchaseData(null);
    }
  }, [isPurchaseDialogOpen]);

  return (
    <PurchaseDialogContext.Provider
      value={{
        isPurchaseDialogOpen,
        setPurchaseDialogOpen,
        purchaseData,
        setPurchaseData,
      }}
    >
      {children}
    </PurchaseDialogContext.Provider>
  );
};
