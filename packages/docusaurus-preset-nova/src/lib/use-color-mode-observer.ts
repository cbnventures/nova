import { useEffect, useState } from 'react';

import type {
  Lib_UseColorModeObserver_Returns,
  Lib_UseColorModeObserver_UseColorModeObserver_ColorMode,
  Lib_UseColorModeObserver_UseColorModeObserver_ColorModeState,
  Lib_UseColorModeObserver_UseColorModeObserver_CurrentTheme,
  Lib_UseColorModeObserver_UseColorModeObserver_Observer,
  Lib_UseColorModeObserver_UseColorModeObserver_SetColorMode,
  Lib_UseColorModeObserver_UseColorModeObserver_Theme,
} from '../types/lib/use-color-mode-observer.d.ts';

/**
 * Lib - Use Color Mode Observer - Use Color Mode Observer.
 *
 * Observes the document data-theme attribute via MutationObserver
 * and returns the current color mode string, staying synchronized
 * with color mode changes across the application.
 *
 * @returns {Lib_UseColorModeObserver_Returns}
 *
 * @since 0.23.0
 */
export function useColorModeObserver(): Lib_UseColorModeObserver_Returns {
  const colorModeState: Lib_UseColorModeObserver_UseColorModeObserver_ColorModeState = useState<Lib_UseColorModeObserver_UseColorModeObserver_ColorMode>('light');
  const colorMode: Lib_UseColorModeObserver_UseColorModeObserver_ColorMode = colorModeState[0];
  const setColorMode: Lib_UseColorModeObserver_UseColorModeObserver_SetColorMode = colorModeState[1];

  useEffect(() => {
    const currentTheme: Lib_UseColorModeObserver_UseColorModeObserver_CurrentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme !== null) {
      setColorMode(currentTheme);
    }

    const observer: Lib_UseColorModeObserver_UseColorModeObserver_Observer = new MutationObserver(() => {
      const theme: Lib_UseColorModeObserver_UseColorModeObserver_Theme = document.documentElement.getAttribute('data-theme');

      if (theme !== null) {
        setColorMode(theme);
      }

      return undefined;
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();

      return undefined;
    };
  }, []);

  return colorMode;
}
