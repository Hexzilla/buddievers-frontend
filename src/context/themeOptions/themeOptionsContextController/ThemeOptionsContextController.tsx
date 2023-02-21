import React, { useState } from 'react';

import { ThemeOptionsContext } from '../themeOptionsContext/ThemeOptionsContext';

import { ThemeOptionsContextControllerProps } from './ThemeOptionsContextController.types';

export const ThemeOptionsContextController = ({
  children,
}: ThemeOptionsContextControllerProps) => {
  const [isDarkTheme, setDarkTheme] = useState<boolean>(true);

  return (
    <ThemeOptionsContext.Provider value={{ isDarkTheme, setDarkTheme }}>
      {children}
    </ThemeOptionsContext.Provider>
  );
};
