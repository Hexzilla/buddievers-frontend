import { createContext } from 'react';

import { PurchaseDialogContextType } from './PurchaseDialogContext.types';

export const PurchaseDialogContext = createContext<
  PurchaseDialogContextType | undefined
>(undefined);
