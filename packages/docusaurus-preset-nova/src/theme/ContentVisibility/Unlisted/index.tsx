import {
  UnlistedBannerMessage,
  UnlistedBannerTitle,
  UnlistedMetadata,
} from '@docusaurus/theme-common';

import type { ThemeContentVisibilityUnlistedProps } from '../../../types/theme/ContentVisibility/Unlisted/index.d.ts';

/**
 * Theme - Content Visibility - Unlisted.
 *
 * Renders a plain caution banner for unlisted content
 * and injects noindex metadata to prevent search engine indexing.
 *
 * @param {ThemeContentVisibilityUnlistedProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Unlisted(_props: ThemeContentVisibilityUnlistedProps) {
  return (
    <>
      <UnlistedMetadata />
      <div>
        <p><strong><UnlistedBannerTitle /></strong></p>
        <p><UnlistedBannerMessage /></p>
      </div>
    </>
  );
}

export default Unlisted;
