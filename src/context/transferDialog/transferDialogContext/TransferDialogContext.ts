import { createContext } from 'react';

import { TransferDialogContextType } from './TransferDialogContext.types';

export const TransferDialogContext = createContext<
  TransferDialogContextType | undefined
>(undefined);
