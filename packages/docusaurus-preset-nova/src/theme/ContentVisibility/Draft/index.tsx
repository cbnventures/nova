import { translate } from '@docusaurus/Translate';
import Admonition from '@theme/Admonition';

import type {
  ThemeContentVisibilityDraftMessage,
  ThemeContentVisibilityDraftProps,
  ThemeContentVisibilityDraftReturns,
  ThemeContentVisibilityDraftTitle,
} from '../../../types/theme/ContentVisibility/Draft/index.d.ts';

/**
 * Theme - Content Visibility - Draft.
 *
 * Renders a caution-styled admonition warning that
 * the current page content is in draft status and not published.
 *
 * @param {ThemeContentVisibilityDraftProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Draft(props: ThemeContentVisibilityDraftProps): ThemeContentVisibilityDraftReturns {
  const title: ThemeContentVisibilityDraftTitle = translate({
    id: 'theme.contentVisibility.draftBanner.title',
    message: 'Draft page',
    description: 'The draft content banner title',
  });
  const message: ThemeContentVisibilityDraftMessage = translate({
    id: 'theme.contentVisibility.draftBanner.message',
    message: 'This page is a draft. It will only be visible in development and excluded from the production build.',
    description: 'The draft content banner message',
  });

  return (
    <Admonition
      className={(props['className'] !== undefined) ? `nova-content-visibility-draft ${props['className']}` : 'nova-content-visibility-draft'}
      style={props['style']}
      type="caution"
      title={title}
    >
      {message}
    </Admonition>
  );
}

export default Draft;
