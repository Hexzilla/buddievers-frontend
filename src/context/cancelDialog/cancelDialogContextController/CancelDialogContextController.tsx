import React, { useEffect, useState } from 'react';

import { CancelDialogContext } from '../cancelDialogContext/CancelDialogContext';
import { CancelData } from '../cancelDialogContext/CancelDialogContext.types';

import { CancelDialogContextControllerProps } from './CancelDialogContextController.types';

export const CancelDialogContextController = ({
  children,
}: CancelDialogContextControllerProps) => {
  const [isCancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [cancelData, setCancelData] = useState<CancelData>(null);

  useEffect(() => {
    if (!isCancelDialogOpen) {
      setCancelData(null);
    }
  }, [isCancelDialogOpen]);

  return (
    <CancelDialogContext.Provider
      value={{
        isCancelDialogOpen,
        setCancelDialogOpen,
        cancelData,
        setCancelData,
      }}
    >
      {children}
    </CancelDialogContext.Provider>
  );
};
