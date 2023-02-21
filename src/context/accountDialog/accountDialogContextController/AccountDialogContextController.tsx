import React, { useState } from 'react';
import { AccountDialogContext } from '../accountDialogContext/AccountDialogContext';
import { AccountDialogContextControllerProps } from './AccountDialogContextController.types';

export const AccountDialogContextController = ({
  children,
}: AccountDialogContextControllerProps) => {
  const [isAccountDialogOpen, setAccountDialogOpen] = useState<boolean>(false);

  return (
    <AccountDialogContext.Provider
      value={{ isAccountDialogOpen, setAccountDialogOpen }}
    >
      {children}
    </AccountDialogContext.Provider>
  );
};
