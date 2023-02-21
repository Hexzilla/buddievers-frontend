import { useContext } from 'react';
import { AccountDialogContext } from 'context/accountDialog/accountDialogContext/AccountDialogContext';

export const useAccountDialog = () => {
  const context = useContext(AccountDialogContext);

  if (context === undefined) {
    throw new Error(
      'useAccountDialog must be used within an AccountDialogContextController'
    );
  }
  return context;
};
