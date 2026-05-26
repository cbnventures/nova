import { translate } from '@docusaurus/Translate';

import type {
  ThemeIconExternalLinkAriaLabel,
  ThemeIconExternalLinkProps,
} from '../../types/theme/IconExternalLink/index.d.ts';

/**
 * Theme - Icon External Link - Icon External Link.
 *
 * Renders a screen-reader-only label announcing "opens in new tab"
 * after the link text, for use inside external anchors that target
 * a new tab. Visual appearance is unchanged.
 *
 * @param {ThemeIconExternalLinkProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function IconExternalLink(props: ThemeIconExternalLinkProps) {
  const ariaLabel: ThemeIconExternalLinkAriaLabel = translate({
    id: 'theme.IconExternalLink.ariaLabel',
    message: '(opens in new tab)',
    description: 'The screen-reader label appended to external links that open in a new tab',
  });

  return (
    <span
      className={(props['className'] !== undefined) ? `nova-sr-only ${props['className']}` : 'nova-sr-only'}
      style={props['style']}
    >
      {ariaLabel}
    </span>
  );
}

export default IconExternalLink;
