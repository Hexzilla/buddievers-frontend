import React, { useEffect, useState } from 'react';

import { TransferDialogContext } from '../transferDialogContext/TransferDialogContext';
import { TransferData } from '../transferDialogContext/TransferDialogContext.types';

import { TransferDialogContextControllerProps } from './TransferDialogContextController.types';

export const TransferDialogContextController = ({
  children,
}: TransferDialogContextControllerProps) => {
  const [isTransferDialogOpen, setTransferDialogOpen] =
    useState<boolean>(false);
  const [transferData, setTransferData] = useState<TransferData>(null);

  useEffect(() => {
    if (!isTransferDialogOpen) {
      setTransferData(null);
    }
  }, [isTransferDialogOpen]);

  return (
    <TransferDialogContext.Provider
      value={{
        isTransferDialogOpen,
        setTransferDialogOpen,
        transferData,
        setTransferData,
      }}
    >
      {children}
    </TransferDialogContext.Provider>
  );
};
