import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';

import type {
  ThemeDocVersionBadgeDocVersionBadgeVersion,
  ThemeDocVersionBadgeDocVersionBadgeVersionIsLast,
  ThemeDocVersionBadgeDocVersionBadgeVersionLabel,
} from '../../types/theme/DocVersionBadge/index.d.ts';

/**
 * Theme - Doc Version Badge - Doc Version Badge.
 *
 * Renders an inline badge displaying the current documentation
 * version label sourced from the active version context
 * provider, hiding itself on the current release.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocVersionBadge() {
  const version: ThemeDocVersionBadgeDocVersionBadgeVersion = useDocsVersion() as ThemeDocVersionBadgeDocVersionBadgeVersion;
  const isLastVersion: ThemeDocVersionBadgeDocVersionBadgeVersionIsLast = version['isLast'];

  if (isLastVersion === true) {
    return undefined;
  }

  const versionLabel: ThemeDocVersionBadgeDocVersionBadgeVersionLabel = version['label'];

  return (
    <span className="nova-version-badge">
      {versionLabel}
    </span>
  );
}

export default DocVersionBadge;
