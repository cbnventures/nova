import { useEffect, useState } from 'react';

import type {
  Theme_ThemedImage_Index_ThemedImage_ColorMode,
  Theme_ThemedImage_Index_ThemedImage_ColorModeState,
  Theme_ThemedImage_Index_ThemedImage_CurrentTheme,
  Theme_ThemedImage_Index_ThemedImage_Observer,
  Theme_ThemedImage_Index_ThemedImage_Props,
  Theme_ThemedImage_Index_ThemedImage_Returns,
  Theme_ThemedImage_Index_ThemedImage_SetColorMode,
  Theme_ThemedImage_Index_ThemedImage_Src,
  Theme_ThemedImage_Index_ThemedImage_Theme,
} from '../../types/theme/ThemedImage/index.d.ts';

/**
 * Theme - Themed Image - Themed Image.
 *
 * Renders an image element that switches between light and dark
 * source variants based on the document data-theme attribute,
 * observing mutations to stay synchronized with color mode changes.
 *
 * @param {Theme_ThemedImage_Index_ThemedImage_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ThemedImage(props: Theme_ThemedImage_Index_ThemedImage_Props): Theme_ThemedImage_Index_ThemedImage_Returns {
  const colorModeState: Theme_ThemedImage_Index_ThemedImage_ColorModeState = useState('light' as Theme_ThemedImage_Index_ThemedImage_ColorMode);
  const colorMode: Theme_ThemedImage_Index_ThemedImage_ColorMode = colorModeState[0];
  const setColorMode: Theme_ThemedImage_Index_ThemedImage_SetColorMode = colorModeState[1];

  useEffect(() => {
    const currentTheme: Theme_ThemedImage_Index_ThemedImage_CurrentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme !== null) {
      setColorMode(currentTheme);
    }

    const observer: Theme_ThemedImage_Index_ThemedImage_Observer = new MutationObserver(() => {
      const theme: Theme_ThemedImage_Index_ThemedImage_Theme = document.documentElement.getAttribute('data-theme');

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

  const src: Theme_ThemedImage_Index_ThemedImage_Src = (colorMode === 'dark') ? props['sources']['dark'] : props['sources']['light'];

  return (
    <img
      className={(props['className'] !== undefined) ? `nova-themed-image ${props['className']}` : 'nova-themed-image'}
      style={props['style']}
      src={src}
      alt={props['alt']}
      width={props['width']}
      height={props['height']}
    />
  );
}

export default ThemedImage;
