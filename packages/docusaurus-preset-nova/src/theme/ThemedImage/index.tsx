import { useColorModeObserver } from '../../lib/use-color-mode-observer.js';

import type {
  Theme_ThemedImage_Index_ThemedImage_ColorMode,
  Theme_ThemedImage_Index_ThemedImage_Props,
  Theme_ThemedImage_Index_ThemedImage_Returns,
  Theme_ThemedImage_Index_ThemedImage_Src,
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
 * @since 0.15.0
 */
function ThemedImage(props: Theme_ThemedImage_Index_ThemedImage_Props): Theme_ThemedImage_Index_ThemedImage_Returns {
  const colorMode: Theme_ThemedImage_Index_ThemedImage_ColorMode = useColorModeObserver();

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
