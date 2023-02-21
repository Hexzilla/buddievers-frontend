import { createContext } from 'react';

import { ThemeOptionsContextType } from './ThemeOptionsContext.types';

export const ThemeOptionsContext = createContext<
  ThemeOptionsContextType | undefined
>(undefined);
