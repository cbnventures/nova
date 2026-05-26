import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import GooglePlayIcon from '@nova-assets/blocks/app-market-download/google-play.svg';

import type {
  BlocksAppMarketDownloadAppStoreAriaLabel,
  BlocksAppMarketDownloadAppStoreSubtitle,
  BlocksAppMarketDownloadAppStoreTitle,
  BlocksAppMarketDownloadBlocksAppMarketDownloadProps,
  BlocksAppMarketDownloadGooglePlayAriaLabel,
  BlocksAppMarketDownloadGooglePlaySubtitle,
  BlocksAppMarketDownloadGooglePlayTitle,
} from '../../types/blocks/app-market-download/index.d.ts';

/**
 * Blocks - App Market Download - Blocks App Market Download.
 *
 * App store download section that renders styled badge buttons for
 * Apple App Store and Google Play Store with Iconify brand icons,
 * two-line text labels, and responsive layout.
 *
 * @param {BlocksAppMarketDownloadBlocksAppMarketDownloadProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksAppMarketDownload(props: BlocksAppMarketDownloadBlocksAppMarketDownloadProps) {
  if (props['appStoreUrl'] === undefined && props['googlePlayUrl'] === undefined) {
    return undefined;
  }

  const appStoreAriaLabel: BlocksAppMarketDownloadAppStoreAriaLabel = translate({
    id: 'theme.AppMarketDownload.appStoreAriaLabel',
    message: 'Download on the App Store',
    description: 'The ARIA label for the App Store download button',
  });
  const appStoreSubtitle: BlocksAppMarketDownloadAppStoreSubtitle = translate({
    id: 'theme.AppMarketDownload.appStoreSubtitle',
    message: 'Download on the',
    description: 'The subtitle text above the App Store name',
  });
  const appStoreTitle: BlocksAppMarketDownloadAppStoreTitle = translate({
    id: 'theme.AppMarketDownload.appStoreTitle',
    message: 'App Store',
    description: 'The App Store name shown on the download button',
  });
  const googlePlayAriaLabel: BlocksAppMarketDownloadGooglePlayAriaLabel = translate({
    id: 'theme.AppMarketDownload.googlePlayAriaLabel',
    message: 'Get it on Google Play',
    description: 'The ARIA label for the Google Play download button',
  });
  const googlePlaySubtitle: BlocksAppMarketDownloadGooglePlaySubtitle = translate({
    id: 'theme.AppMarketDownload.googlePlaySubtitle',
    message: 'GET IT ON',
    description: 'The subtitle text above the Google Play name',
  });
  const googlePlayTitle: BlocksAppMarketDownloadGooglePlayTitle = translate({
    id: 'theme.AppMarketDownload.googlePlayTitle',
    message: 'Google Play',
    description: 'The Google Play name shown on the download button',
  });

  return (
    <section
      className={(props['className'] !== undefined) ? `nova-app-market-download ${props['className']}` : 'nova-app-market-download'}
      style={props['style']}
    >
      {(props['surface'] === 'alt') ? (
        <div className="nova-surface-alt">
          <div className="nova-app-market-download-inner nova-container">
            {(props['label'] !== undefined) && (
              <p className="nova-app-market-download-label">
                {props['label']}
              </p>
            )}
            <div className="nova-app-market-download-buttons">
              {(props['appStoreUrl'] !== undefined) && (
                <a
                  className="nova-app-market-download-button"
                  href={props['appStoreUrl']}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={appStoreAriaLabel}
                >
                  <Icon icon="ri:apple-fill" width="24" height="24" aria-hidden="true" />
                  <span className="nova-app-market-download-button-text">
                    <span className="nova-app-market-download-button-subtitle">
                      {appStoreSubtitle}
                    </span>
                    <span className="nova-app-market-download-button-title">
                      {appStoreTitle}
                    </span>
                  </span>
                </a>
              )}
              {(props['googlePlayUrl'] !== undefined) && (
                <a
                  className="nova-app-market-download-button"
                  href={props['googlePlayUrl']}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={googlePlayAriaLabel}
                >
                  <GooglePlayIcon width="20" height="22" aria-hidden="true" />
                  <span className="nova-app-market-download-button-text">
                    <span className="nova-app-market-download-button-subtitle">
                      {googlePlaySubtitle}
                    </span>
                    <span className="nova-app-market-download-button-title">
                      {googlePlayTitle}
                    </span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="nova-app-market-download-inner nova-container">
          {(props['label'] !== undefined) && (
            <p className="nova-app-market-download-label">
              {props['label']}
            </p>
          )}
          <div className="nova-app-market-download-buttons">
            {(props['appStoreUrl'] !== undefined) && (
              <a
                className="nova-app-market-download-button"
                href={props['appStoreUrl']}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={appStoreAriaLabel}
              >
                <Icon icon="ri:apple-fill" width="24" height="24" aria-hidden="true" />
                <span className="nova-app-market-download-button-text">
                  <span className="nova-app-market-download-button-subtitle">
                    {appStoreSubtitle}
                  </span>
                  <span className="nova-app-market-download-button-title">
                    {appStoreTitle}
                  </span>
                </span>
              </a>
            )}
            {(props['googlePlayUrl'] !== undefined) && (
              <a
                className="nova-app-market-download-button"
                href={props['googlePlayUrl']}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={googlePlayAriaLabel}
              >
                <GooglePlayIcon width="20" height="22" aria-hidden="true" />
                <span className="nova-app-market-download-button-text">
                  <span className="nova-app-market-download-button-subtitle">
                    {googlePlaySubtitle}
                  </span>
                  <span className="nova-app-market-download-button-title">
                    {googlePlayTitle}
                  </span>
                </span>
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default BlocksAppMarketDownload;
