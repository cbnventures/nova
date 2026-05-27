import Edit from '@theme/ContentFooter/Edit';
import Share from '@theme/ContentFooter/Share';
import Tags from '@theme/ContentFooter/Tags';

import type {
  Theme_ContentFooter_Index_ContentFooter_CanDisplayEdit,
  Theme_ContentFooter_Index_ContentFooter_CanDisplayFooter,
  Theme_ContentFooter_Index_ContentFooter_CanDisplayShare,
  Theme_ContentFooter_Index_ContentFooter_CanDisplayTags,
  Theme_ContentFooter_Index_ContentFooter_Props,
} from '../../types/theme/ContentFooter/index.d.ts';

/**
 * Theme - Content Footer - Content Footer.
 *
 * Renders a shared content footer with optional tag links,
 * social share buttons, and edit metadata sections, only
 * displaying when at least one section has content.
 *
 * @param {Theme_ContentFooter_Index_ContentFooter_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ContentFooter(props: Theme_ContentFooter_Index_ContentFooter_Props) {
  const canDisplayTags: Theme_ContentFooter_Index_ContentFooter_CanDisplayTags = (props['tags'] !== undefined && props['tags']['length'] > 0);
  const canDisplayShare: Theme_ContentFooter_Index_ContentFooter_CanDisplayShare = (props['sharePlatforms'] !== undefined && props['sharePlatforms']['length'] > 0);
  const canDisplayEdit: Theme_ContentFooter_Index_ContentFooter_CanDisplayEdit = (
    props['editUrl'] !== undefined
    || props['lastUpdatedAt'] !== undefined
    || props['lastUpdatedBy'] !== undefined
  );
  const canDisplayFooter: Theme_ContentFooter_Index_ContentFooter_CanDisplayFooter = (
    canDisplayTags === true
    || canDisplayShare === true
    || canDisplayEdit === true
  );

  if (canDisplayFooter !== true) {
    return undefined;
  }

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-content-footer ${props['className']}` : 'nova-content-footer'}
      style={props['style']}
    >
      {(canDisplayTags === true) && (
        <Tags tags={props['tags']} />
      )}
      {(canDisplayShare === true) && (
        <Share sharePlatforms={props['sharePlatforms']} shareUrl={props['shareUrl']} />
      )}
      {(canDisplayEdit === true) && (
        <Edit editUrl={props['editUrl']} lastUpdatedAt={props['lastUpdatedAt']} lastUpdatedBy={props['lastUpdatedBy']} />
      )}
    </div>
  );
}

export default ContentFooter;
