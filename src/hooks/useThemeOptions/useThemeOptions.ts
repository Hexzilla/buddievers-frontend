import { useContext } from 'react';

import { ThemeOptionsContext } from 'context/themeOptions/themeOptionsContext/ThemeOptionsContext';

export const useThemeOptions = () => {
  const context = useContext(ThemeOptionsContext);

  if (context === undefined) {
    throw new Error(
      'useThemeOptions must be used within an ThemeOptionsContextController'
    );
  }

  return context;
};
