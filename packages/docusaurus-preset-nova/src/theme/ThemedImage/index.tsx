import { useEffect, useState } from 'react';

import type {
  ThemeThemedImageThemedImageColorMode,
  ThemeThemedImageThemedImageColorModeState,
  ThemeThemedImageThemedImageCurrentTheme,
  ThemeThemedImageThemedImageObserver,
  ThemeThemedImageThemedImageProps,
  ThemeThemedImageThemedImageReturns,
  ThemeThemedImageThemedImageSetColorMode,
  ThemeThemedImageThemedImageSrc,
  ThemeThemedImageThemedImageTheme,
} from '../../types/theme/ThemedImage/index.d.ts';

/**
 * Theme - Themed Image - Themed Image.
 *
 * Renders an image element that switches between light and dark
 * source variants based on the document data-theme attribute,
 * observing mutations to stay synchronized with color mode changes.
 *
 * @param {ThemeThemedImageThemedImageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ThemedImage(props: ThemeThemedImageThemedImageProps): ThemeThemedImageThemedImageReturns {
  const colorModeState: ThemeThemedImageThemedImageColorModeState = useState('light' as ThemeThemedImageThemedImageColorMode);
  const colorMode: ThemeThemedImageThemedImageColorMode = colorModeState[0];
  const setColorMode: ThemeThemedImageThemedImageSetColorMode = colorModeState[1];

  useEffect(() => {
    const currentTheme: ThemeThemedImageThemedImageCurrentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme !== null) {
      setColorMode(currentTheme);
    }

    const observer: ThemeThemedImageThemedImageObserver = new MutationObserver(() => {
      const theme: ThemeThemedImageThemedImageTheme = document.documentElement.getAttribute('data-theme');

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

  const src: ThemeThemedImageThemedImageSrc = (colorMode === 'dark') ? props['sources']['dark'] : props['sources']['light'];

  return (
    <img
      src={src}
      alt={props['alt']}
      width={props['width']}
      height={props['height']}
      style={props['style']}
    />
  );
}

export default ThemedImage;
