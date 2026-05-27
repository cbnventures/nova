import { translate } from '@docusaurus/Translate';
import ShareButton from '@theme/ContentFooter/ShareButton';

import type {
  Theme_ContentFooter_Share_Index_Share_Label,
  Theme_ContentFooter_Share_Index_Share_Platform,
  Theme_ContentFooter_Share_Index_Share_Props,
  Theme_ContentFooter_Share_Index_Share_Url,
} from '../../../types/theme/ContentFooter/Share/index.d.ts';

/**
 * Theme - Content Footer - Share.
 *
 * Renders the share-this section of a content footer - a labeled row
 * of social share buttons for the current page.
 *
 * @param {Theme_ContentFooter_Share_Index_Share_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Share(props: Theme_ContentFooter_Share_Index_Share_Props) {
  if (props['sharePlatforms'] === undefined || props['sharePlatforms']['length'] === 0) {
    return undefined;
  }

  let shareUrl: Theme_ContentFooter_Share_Index_Share_Url = '';

  if (props['shareUrl'] !== undefined) {
    shareUrl = props['shareUrl'];
  } else if (typeof window !== 'undefined') {
    shareUrl = window['location']['href'];
  }

  const shareLabel: Theme_ContentFooter_Share_Index_Share_Label = translate({
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
        {props['sharePlatforms'].map((platform: Theme_ContentFooter_Share_Index_Share_Platform) => (
          <ShareButton key={platform} platform={platform} shareUrl={shareUrl} />
        ))}
      </div>
    </div>
  );
}

export default Share;
