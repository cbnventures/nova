import { UnlistedMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import Admonition from '@theme/Admonition';

import type {
  ThemeContentVisibilityUnlistedMessage,
  ThemeContentVisibilityUnlistedProps,
  ThemeContentVisibilityUnlistedReturns,
  ThemeContentVisibilityUnlistedTitle,
} from '../../../types/theme/ContentVisibility/Unlisted/index.d.ts';

/**
 * Theme - Content Visibility - Unlisted.
 *
 * Renders a caution-styled admonition for unlisted content and uses Helmet
 * to inject a noindex meta tag; the tag is server-rendered into the prod
 * HTML at build time but is absent from dev document.head.
 *
 * @param {ThemeContentVisibilityUnlistedProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Unlisted(props: ThemeContentVisibilityUnlistedProps): ThemeContentVisibilityUnlistedReturns {
  const title: ThemeContentVisibilityUnlistedTitle = translate({
    id: 'theme.contentVisibility.unlistedBanner.title',
    message: 'Unlisted page',
    description: 'The unlisted content banner title',
  });
  const message: ThemeContentVisibilityUnlistedMessage = translate({
    id: 'theme.contentVisibility.unlistedBanner.message',
    message: 'This page is unlisted. Search engines will not index it, and only users having a direct link can access it.',
    description: 'The unlisted content banner message',
  });

  return (
    <>
      <UnlistedMetadata />
      <Admonition
        className={(props['className'] !== undefined) ? `nova-content-visibility-unlisted ${props['className']}` : 'nova-content-visibility-unlisted'}
        style={props['style']}
        type="caution"
        title={title}
      >
        {message}
      </Admonition>
    </>
  );
}

export default Unlisted;
