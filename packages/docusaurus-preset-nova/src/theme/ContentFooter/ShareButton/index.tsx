import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { useState } from 'react';

import type {
  Theme_ContentFooter_ShareButton_Index_ShareButton_Copied,
  Theme_ContentFooter_ShareButton_Index_ShareButton_CopiedState,
  Theme_ContentFooter_ShareButton_Index_ShareButton_PlatformLabel,
  Theme_ContentFooter_ShareButton_Index_ShareButton_Props,
  Theme_ContentFooter_ShareButton_Index_ShareButton_SetCopied,
  Theme_ContentFooter_ShareButton_Index_ShareButton_ShareCopiedText,
  Theme_ContentFooter_ShareButton_Index_ShareButton_ShareCopyLink,
  Theme_ContentFooter_ShareButton_Index_ShareButton_ShareHref,
  Theme_ContentFooter_ShareButton_Index_ShareButton_ShareLinkCopied,
  Theme_ContentFooter_ShareButton_Index_ShareButton_ShareOnPlatform,
} from '../../../types/theme/ContentFooter/ShareButton/index.d.ts';

/**
 * Theme - Content Footer - Share Button - Share Button.
 *
 * Renders a single social share button - opens a platform share URL in a
 * popup window for external platforms (X / Facebook / LinkedIn / Reddit), or
 * copies the canonical share URL to the clipboard for the `copy` platform.
 *
 * @param {Theme_ContentFooter_ShareButton_Index_ShareButton_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function ShareButton(props: Theme_ContentFooter_ShareButton_Index_ShareButton_Props) {
  const copiedState: Theme_ContentFooter_ShareButton_Index_ShareButton_CopiedState = useState<Theme_ContentFooter_ShareButton_Index_ShareButton_Copied>(false);
  const copied: Theme_ContentFooter_ShareButton_Index_ShareButton_Copied = copiedState[0];
  const setCopied: Theme_ContentFooter_ShareButton_Index_ShareButton_SetCopied = copiedState[1];

  if (props['platform'] === 'copy') {
    const shareLinkCopied: Theme_ContentFooter_ShareButton_Index_ShareButton_ShareLinkCopied = translate({
      id: 'theme.contentFooter.share.linkCopied',
      message: 'Link copied',
      description: 'The tooltip text shown after the share link has been copied',
    });
    const shareCopyLink: Theme_ContentFooter_ShareButton_Index_ShareButton_ShareCopyLink = translate({
      id: 'theme.contentFooter.share.copyLink',
      message: 'Copy link',
      description: 'The tooltip and ARIA label for the copy link share button',
    });
    const shareCopiedText: Theme_ContentFooter_ShareButton_Index_ShareButton_ShareCopiedText = translate({
      id: 'theme.contentFooter.share.copiedText',
      message: 'Copied!',
      description: 'The button text shown after the share link has been copied',
    });

    return (
      <button
        className={(copied === true) ? 'nova-content-footer-share-button nova-content-footer-share-copied' : 'nova-content-footer-share-button'}
        type="button"
        title={(copied === true) ? shareLinkCopied : shareCopyLink}
        aria-label={(copied === true) ? shareLinkCopied : shareCopyLink}
        onClick={() => {
          void navigator.clipboard.writeText(props['shareUrl']);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);

            return undefined;
          }, 2000);

          return undefined;
        }}
      >
        {(copied === true) && (
          <Icon icon="lucide:check" width="16" height="16" aria-hidden="true" />
        )}
        {(copied === false) && (
          <Icon icon="lucide:copy" width="16" height="16" aria-hidden="true" />
        )}
        {(copied === true) ? shareCopiedText : shareCopyLink}
      </button>
    );
  }

  let shareHref: Theme_ContentFooter_ShareButton_Index_ShareButton_ShareHref = '';

  if (props['platform'] === 'x') {
    shareHref = `https://x.com/intent/tweet?url=${encodeURIComponent(props['shareUrl'])}`;
  }

  if (props['platform'] === 'facebook') {
    shareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props['shareUrl'])}`;
  }

  if (props['platform'] === 'linkedin') {
    shareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(props['shareUrl'])}`;
  }

  if (props['platform'] === 'reddit') {
    shareHref = `https://www.reddit.com/submit?url=${encodeURIComponent(props['shareUrl'])}`;
  }

  if (shareHref === '') {
    return undefined;
  }

  const platformLabel: Theme_ContentFooter_ShareButton_Index_ShareButton_PlatformLabel = {
    x: 'X',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    reddit: 'Reddit',
  }[props['platform']] ?? props['platform'];
  const shareOnPlatform: Theme_ContentFooter_ShareButton_Index_ShareButton_ShareOnPlatform = translate(
    {
      id: 'theme.contentFooter.share.shareOnPlatform',
      message: 'Share on {platformLabel}',
      description: 'The tooltip and ARIA label for a social share button',
    },
    { platformLabel },
  );

  return (
    <button
      className={(props['className'] !== undefined) ? `nova-content-footer-share-button ${props['className']}` : 'nova-content-footer-share-button'}
      style={props['style']}
      type="button"
      title={shareOnPlatform}
      aria-label={shareOnPlatform}
      onClick={() => {
        window.open(shareHref, '_blank', 'width=600,height=400,noopener,noreferrer');

        return undefined;
      }}
    >
      {(props['platform'] === 'x') && (
        <Icon icon="ri:twitter-x-fill" width="16" height="16" aria-hidden="true" />
      )}
      {(props['platform'] === 'facebook') && (
        <Icon icon="ri:facebook-fill" width="16" height="16" aria-hidden="true" />
      )}
      {(props['platform'] === 'linkedin') && (
        <Icon icon="ri:linkedin-fill" width="16" height="16" aria-hidden="true" />
      )}
      {(props['platform'] === 'reddit') && (
        <Icon icon="ri:reddit-fill" width="16" height="16" aria-hidden="true" />
      )}
    </button>
  );
}

export default ShareButton;
