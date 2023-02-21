import { createContext } from 'react';
import { AccountDialogContextType } from './AcountDialogContext.types';

export const AccountDialogContext = createContext<
  AccountDialogContextType | undefined
>(undefined);
