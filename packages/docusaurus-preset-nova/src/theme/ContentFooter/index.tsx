import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import EditThisPage from '@theme/EditThisPage';
import LastUpdated from '@theme/LastUpdated';
import Tag from '@theme/Tag';
import { useState } from 'react';

import type {
  ThemeContentFooterContentFooterCanDisplayEdit,
  ThemeContentFooterContentFooterCanDisplayFooter,
  ThemeContentFooterContentFooterCanDisplayShare,
  ThemeContentFooterContentFooterCanDisplayTags,
  ThemeContentFooterContentFooterCopied,
  ThemeContentFooterContentFooterCopiedState,
  ThemeContentFooterContentFooterEditLabel,
  ThemeContentFooterContentFooterLastUpdatedSpread,
  ThemeContentFooterContentFooterPlatformLabel,
  ThemeContentFooterContentFooterProps,
  ThemeContentFooterContentFooterSetCopied,
  ThemeContentFooterContentFooterShareCopiedText,
  ThemeContentFooterContentFooterShareCopyLink,
  ThemeContentFooterContentFooterShareHref,
  ThemeContentFooterContentFooterShareLabel,
  ThemeContentFooterContentFooterShareLinkCopied,
  ThemeContentFooterContentFooterShareOnPlatform,
  ThemeContentFooterContentFooterSharePlatform,
  ThemeContentFooterContentFooterShareUrl,
  ThemeContentFooterContentFooterTag,
  ThemeContentFooterContentFooterTagsLabel,
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
  let shareUrl: ThemeContentFooterContentFooterShareUrl = '';

  if (props['shareUrl'] !== undefined) {
    shareUrl = props['shareUrl'];
  } else if (typeof window !== 'undefined') {
    shareUrl = window['location']['href'];
  }
  const copiedState: ThemeContentFooterContentFooterCopiedState = useState<ThemeContentFooterContentFooterCopied>(false);
  const copied: ThemeContentFooterContentFooterCopied = copiedState[0];
  const setCopied: ThemeContentFooterContentFooterSetCopied = copiedState[1];
  const tagsLabel: ThemeContentFooterContentFooterTagsLabel = translate({
    id: 'theme.contentFooter.tagsLabel',
    message: 'Tags',
    description: 'The label for the tags section in a content footer',
  });
  const shareLabel: ThemeContentFooterContentFooterShareLabel = translate({
    id: 'theme.contentFooter.shareLabel',
    message: 'Share this',
    description: 'The label for the share section in a content footer',
  });
  const editLabel: ThemeContentFooterContentFooterEditLabel = translate({
    id: 'theme.contentFooter.editLabel',
    message: 'Contribute',
    description: 'The label for the contribute section in a content footer',
  });
  const shareLinkCopied: ThemeContentFooterContentFooterShareLinkCopied = translate({
    id: 'theme.contentFooter.share.linkCopied',
    message: 'Link copied',
    description: 'The tooltip text shown after the share link has been copied',
  });
  const shareCopyLink: ThemeContentFooterContentFooterShareCopyLink = translate({
    id: 'theme.contentFooter.share.copyLink',
    message: 'Copy link',
    description: 'The tooltip and ARIA label for the copy link share button',
  });
  const shareCopiedText: ThemeContentFooterContentFooterShareCopiedText = translate({
    id: 'theme.contentFooter.share.copiedText',
    message: 'Copied!',
    description: 'The button text shown after the share link has been copied',
  });

  if (canDisplayFooter !== true) {
    return undefined;
  }

  const lastUpdatedSpread: ThemeContentFooterContentFooterLastUpdatedSpread = {};

  if (props['lastUpdatedAt'] !== undefined) {
    Reflect.set(lastUpdatedSpread, 'lastUpdatedAt', props['lastUpdatedAt']);
  }

  if (props['lastUpdatedBy'] !== undefined) {
    Reflect.set(lastUpdatedSpread, 'lastUpdatedBy', props['lastUpdatedBy']);
  }

  return (
    <div className="nova-content-footer">
      {(canDisplayTags === true) && (
        <div className="nova-content-footer-section">
          <span className="nova-content-footer-section-label">{tagsLabel}</span>
          <div className="nova-content-footer-tags">
            {props['tags']!.map((tag: ThemeContentFooterContentFooterTag) => (
              <Tag key={tag['permalink']} permalink={tag['permalink']} label={tag['label']} description={tag['description']} />
            ))}
          </div>
        </div>
      )}
      {(canDisplayShare === true) && (
        <div className="nova-content-footer-section">
          <span className="nova-content-footer-section-label">{shareLabel}</span>
          <div className="nova-content-footer-share">
            {props['sharePlatforms']!.map((platform: ThemeContentFooterContentFooterSharePlatform) => {
              let shareHref: ThemeContentFooterContentFooterShareHref = '';

              if (platform === 'x') {
                shareHref = `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
              }

              if (platform === 'facebook') {
                shareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
              }

              if (platform === 'linkedin') {
                shareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
              }

              if (platform === 'reddit') {
                shareHref = `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}`;
              }

              if (platform === 'copy') {
                return (
                  <button
                    className={(copied === true) ? 'nova-content-footer-share-button nova-content-footer-share-copied' : 'nova-content-footer-share-button'}
                    key={platform}
                    type="button"
                    title={(copied === true) ? shareLinkCopied : shareCopyLink}
                    aria-label={(copied === true) ? shareLinkCopied : shareCopyLink}
                    onClick={() => {
                      void navigator.clipboard.writeText(shareUrl);
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

              if (shareHref === '') {
                return undefined;
              }

              const platformLabel: ThemeContentFooterContentFooterPlatformLabel = {
                x: 'X',
                facebook: 'Facebook',
                linkedin: 'LinkedIn',
                reddit: 'Reddit',
              }[platform] ?? platform;
              const shareOnPlatform: ThemeContentFooterContentFooterShareOnPlatform = translate(
                {
                  id: 'theme.contentFooter.share.shareOnPlatform',
                  message: 'Share on {platformLabel}',
                  description: 'The tooltip and ARIA label for a social share button',
                },
                { platformLabel },
              );

              return (
                <button
                  className="nova-content-footer-share-button"
                  key={platform}
                  type="button"
                  title={shareOnPlatform}
                  aria-label={shareOnPlatform}
                  onClick={() => {
                    window.open(shareHref, '_blank', 'width=600,height=400,noopener,noreferrer');

                    return undefined;
                  }}
                >
                  {(platform === 'x') && (
                    <Icon icon="ri:twitter-x-fill" width="16" height="16" aria-hidden="true" />
                  )}
                  {(platform === 'facebook') && (
                    <Icon icon="ri:facebook-fill" width="16" height="16" aria-hidden="true" />
                  )}
                  {(platform === 'linkedin') && (
                    <Icon icon="ri:linkedin-fill" width="16" height="16" aria-hidden="true" />
                  )}
                  {(platform === 'reddit') && (
                    <Icon icon="ri:reddit-fill" width="16" height="16" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {(canDisplayEdit === true) && (
        <div className="nova-content-footer-section">
          <span className="nova-content-footer-section-label">{editLabel}</span>
          <div className="nova-content-footer-edit">
            {(
              props['lastUpdatedAt'] !== undefined
              || props['lastUpdatedBy'] !== undefined
            ) && (
              <LastUpdated {...lastUpdatedSpread} />
            )}
            {(props['editUrl'] !== undefined) && (
              <EditThisPage editUrl={props['editUrl']} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentFooter;
