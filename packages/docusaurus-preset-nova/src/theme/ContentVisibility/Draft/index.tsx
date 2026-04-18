import {
  DraftBannerMessage,
  DraftBannerTitle,
} from '@docusaurus/theme-common';

import type { ThemeContentVisibilityDraftProps } from '../../../types/theme/ContentVisibility/Draft/index.d.ts';

/**
 * Theme - Content Visibility - Draft.
 *
 * Renders a plain caution banner to warn that
 * the current page content is in draft status and not published.
 *
 * @param {ThemeContentVisibilityDraftProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Draft(_props: ThemeContentVisibilityDraftProps) {
  return (
    <div>
      <p><strong><DraftBannerTitle /></strong></p>
      <p><DraftBannerMessage /></p>
    </div>
  );
}

export default Draft;
