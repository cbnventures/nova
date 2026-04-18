import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import GooglePlayIcon from '@nova-assets/components/app-market-download/google-play.svg';

import type {
  ComponentsAppMarketDownloadAppStoreAriaLabel,
  ComponentsAppMarketDownloadAppStoreSubtitle,
  ComponentsAppMarketDownloadAppStoreTitle,
  ComponentsAppMarketDownloadComponentsAppMarketDownloadProps,
  ComponentsAppMarketDownloadGooglePlayAriaLabel,
  ComponentsAppMarketDownloadGooglePlaySubtitle,
  ComponentsAppMarketDownloadGooglePlayTitle,
} from '../../types/components/app-market-download/index.d.ts';

/**
 * Components - App Market Download - Components App Market Download.
 *
 * App store download section that renders styled badge buttons for
 * Apple App Store and Google Play Store with Iconify brand icons,
 * two-line text labels, and responsive layout.
 *
 * @param {ComponentsAppMarketDownloadComponentsAppMarketDownloadProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ComponentsAppMarketDownload(props: ComponentsAppMarketDownloadComponentsAppMarketDownloadProps) {
  if (props['appStoreUrl'] === undefined && props['googlePlayUrl'] === undefined) {
    return undefined;
  }

  const appStoreAriaLabel: ComponentsAppMarketDownloadAppStoreAriaLabel = translate({
    id: 'theme.AppMarketDownload.appStoreAriaLabel',
    message: 'Download on the App Store',
    description: 'The ARIA label for the App Store download button',
  });
  const appStoreSubtitle: ComponentsAppMarketDownloadAppStoreSubtitle = translate({
    id: 'theme.AppMarketDownload.appStoreSubtitle',
    message: 'Download on the',
    description: 'The subtitle text above the App Store name',
  });
  const appStoreTitle: ComponentsAppMarketDownloadAppStoreTitle = translate({
    id: 'theme.AppMarketDownload.appStoreTitle',
    message: 'App Store',
    description: 'The App Store name shown on the download button',
  });
  const googlePlayAriaLabel: ComponentsAppMarketDownloadGooglePlayAriaLabel = translate({
    id: 'theme.AppMarketDownload.googlePlayAriaLabel',
    message: 'Get it on Google Play',
    description: 'The ARIA label for the Google Play download button',
  });
  const googlePlaySubtitle: ComponentsAppMarketDownloadGooglePlaySubtitle = translate({
    id: 'theme.AppMarketDownload.googlePlaySubtitle',
    message: 'GET IT ON',
    description: 'The subtitle text above the Google Play name',
  });
  const googlePlayTitle: ComponentsAppMarketDownloadGooglePlayTitle = translate({
    id: 'theme.AppMarketDownload.googlePlayTitle',
    message: 'Google Play',
    description: 'The Google Play name shown on the download button',
  });

  return (
    <section className="nova-app-market-download">
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

export default ComponentsAppMarketDownload;
