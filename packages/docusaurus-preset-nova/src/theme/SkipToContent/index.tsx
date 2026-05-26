import { SkipToContentLink } from '@docusaurus/theme-common';

import type { ThemeSkipToContentSkipToContentProps } from '../../types/theme/SkipToContent/index.d.ts';

/**
 * Theme - Skip To Content - Skip To Content.
 *
 * Renders the Docusaurus skip-to-content accessibility link with
 * a Nova-prefixed class on the anchor so the styles can target
 * a stable class instead of a locale-translated aria-label.
 *
 * @param {ThemeSkipToContentSkipToContentProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SkipToContent(props: ThemeSkipToContentSkipToContentProps) {
  return (
    <SkipToContentLink
      className={(props['className'] !== undefined) ? `nova-skip-to-content ${props['className']}` : 'nova-skip-to-content'}
      style={props['style']}
    />
  );
}

export default SkipToContent;
