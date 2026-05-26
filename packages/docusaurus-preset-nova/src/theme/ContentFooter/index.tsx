import Edit from '@theme/ContentFooter/Edit';
import Share from '@theme/ContentFooter/Share';
import Tags from '@theme/ContentFooter/Tags';

import type {
  ThemeContentFooterContentFooterCanDisplayEdit,
  ThemeContentFooterContentFooterCanDisplayFooter,
  ThemeContentFooterContentFooterCanDisplayShare,
  ThemeContentFooterContentFooterCanDisplayTags,
  ThemeContentFooterContentFooterProps,
} from '../../types/theme/ContentFooter/index.d.ts';

/**
 * Theme - Content Footer - Content Footer.
 *
 * Renders a shared content footer with optional tag links,
 * social share buttons, and edit metadata sections, only
 * displaying when at least one section has content.
 *
 * @param {ThemeContentFooterContentFooterProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ContentFooter(props: ThemeContentFooterContentFooterProps) {
  const canDisplayTags: ThemeContentFooterContentFooterCanDisplayTags = (props['tags'] !== undefined && props['tags']['length'] > 0);
  const canDisplayShare: ThemeContentFooterContentFooterCanDisplayShare = (props['sharePlatforms'] !== undefined && props['sharePlatforms']['length'] > 0);
  const canDisplayEdit: ThemeContentFooterContentFooterCanDisplayEdit = (
    props['editUrl'] !== undefined
    || props['lastUpdatedAt'] !== undefined
    || props['lastUpdatedBy'] !== undefined
  );
  const canDisplayFooter: ThemeContentFooterContentFooterCanDisplayFooter = (
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
