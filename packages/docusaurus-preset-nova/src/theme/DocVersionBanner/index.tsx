import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import { translate } from '@docusaurus/Translate';

import type {
  Theme_DocVersionBanner_Index_DocVersionBanner_BannerMessage,
  Theme_DocVersionBanner_Index_DocVersionBanner_Message,
  Theme_DocVersionBanner_Index_DocVersionBanner_Props,
  Theme_DocVersionBanner_Index_DocVersionBanner_Version,
  Theme_DocVersionBanner_Index_DocVersionBanner_Version_IsLast,
  Theme_DocVersionBanner_Index_DocVersionBanner_Version_Label,
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
function DocVersionBanner(props: Theme_DocVersionBanner_Index_DocVersionBanner_Props) {
  const version: Theme_DocVersionBanner_Index_DocVersionBanner_Version = useDocsVersion() as Theme_DocVersionBanner_Index_DocVersionBanner_Version;
  const isLastVersion: Theme_DocVersionBanner_Index_DocVersionBanner_Version_IsLast = version['isLast'];

  if (isLastVersion === true) {
    return undefined;
  }

  const versionLabel: Theme_DocVersionBanner_Index_DocVersionBanner_Version_Label = version['label'];
  const translatedMessage: Theme_DocVersionBanner_Index_DocVersionBanner_Message = translate(
    {
      id: 'theme.docs.versionBanner.message',
      message: 'This is documentation for version {versionLabel}.',
      description: 'The banner message shown when viewing non-latest docs version',
    },
    { versionLabel },
  );
  const bannerMessage: Theme_DocVersionBanner_Index_DocVersionBanner_BannerMessage = translatedMessage;

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-version-banner ${props['className']}` : 'nova-version-banner'}
      style={props['style']}
      role="alert"
    >
      <p>{bannerMessage}</p>
    </div>
  );
}

export default DocVersionBanner;
