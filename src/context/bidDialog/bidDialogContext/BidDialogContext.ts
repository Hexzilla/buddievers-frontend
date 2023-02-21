import { createContext } from 'react';

import { BidDialogContextType } from './BidDialogContext.types';

export const BidDialogContext = createContext<BidDialogContextType | undefined>(
  undefined
);
