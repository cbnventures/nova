import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import { translate } from '@docusaurus/Translate';

import type {
  ThemeDocVersionBannerDocVersionBannerBannerMessage,
  ThemeDocVersionBannerDocVersionBannerMessage,
  ThemeDocVersionBannerDocVersionBannerVersion,
  ThemeDocVersionBannerDocVersionBannerVersionIsLast,
  ThemeDocVersionBannerDocVersionBannerVersionLabel,
} from '../../types/theme/DocVersionBanner/index.d.ts';

/**
 * Theme - Doc Version Banner - Doc Version Banner.
 *
 * Renders a prominent alert banner warning visitors when they
 * are viewing documentation for a non-latest version,
 * hiding itself on the current release.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocVersionBanner() {
  const version: ThemeDocVersionBannerDocVersionBannerVersion = useDocsVersion() as ThemeDocVersionBannerDocVersionBannerVersion;
  const isLastVersion: ThemeDocVersionBannerDocVersionBannerVersionIsLast = version['isLast'];

  if (isLastVersion === true) {
    return undefined;
  }

  const versionLabel: ThemeDocVersionBannerDocVersionBannerVersionLabel = version['label'];
  const translatedMessage: ThemeDocVersionBannerDocVersionBannerMessage = translate(
    {
      id: 'theme.docs.versionBanner.message',
      message: 'This is documentation for version {versionLabel}.',
      description: 'The banner message shown when viewing non-latest docs version',
    },
    { versionLabel },
  );
  const bannerMessage: ThemeDocVersionBannerDocVersionBannerBannerMessage = translatedMessage;

  return (
    <div className="nova-version-banner" role="alert">
      <p>{bannerMessage}</p>
    </div>
  );
}

export default DocVersionBanner;
