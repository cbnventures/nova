import { translate } from '@docusaurus/Translate';
import ShareButton from '@theme/ContentFooter/ShareButton';

import type {
  ThemeContentFooterShareLabel,
  ThemeContentFooterSharePlatform,
  ThemeContentFooterShareProps,
  ThemeContentFooterShareUrl,
} from '../../../types/theme/ContentFooter/Share/index.d.ts';

/**
 * Theme - Content Footer - Share.
 *
 * Renders the share-this section of a content footer - a labeled row
 * of social share buttons for the current page.
 *
 * @param {ThemeContentFooterShareProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Share(props: ThemeContentFooterShareProps) {
  if (props['sharePlatforms'] === undefined || props['sharePlatforms']['length'] === 0) {
    return undefined;
  }

  let shareUrl: ThemeContentFooterShareUrl = '';

  if (props['shareUrl'] !== undefined) {
    shareUrl = props['shareUrl'];
  } else if (typeof window !== 'undefined') {
    shareUrl = window['location']['href'];
  }

  const shareLabel: ThemeContentFooterShareLabel = translate({
    id: 'theme.contentFooter.shareLabel',
    message: 'Share this',
    description: 'The label for the share section in a content footer',
  });

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-content-footer-section ${props['className']}` : 'nova-content-footer-section'}
      style={props['style']}
    >
      <span className="nova-content-footer-section-label">{shareLabel}</span>
      <div className="nova-content-footer-share">
        {props['sharePlatforms'].map((platform: ThemeContentFooterSharePlatform) => (
          <ShareButton key={platform} platform={platform} shareUrl={shareUrl} />
        ))}
      </div>
    </div>
  );
}

export default Share;
