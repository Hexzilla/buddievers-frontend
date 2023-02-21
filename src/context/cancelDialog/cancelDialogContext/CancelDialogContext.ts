import { createContext } from 'react';

import { CancelDialogContextType } from './CancelDialogContext.types';

export const CancelDialogContext = createContext<
  CancelDialogContextType | undefined
>(undefined);
