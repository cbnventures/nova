import type {
  ScriptsAnnouncementBarInitAnnouncementBarInitDismissDataAttribute,
  ScriptsAnnouncementBarInitAnnouncementBarInitDismissStorageKey,
  ScriptsAnnouncementBarInitAnnouncementBarInitLines,
  ScriptsAnnouncementBarInitAnnouncementBarInitOptions,
  ScriptsAnnouncementBarInitAnnouncementBarInitReturns,
} from '../types/scripts/announcement-bar-init.d.ts';

/**
 * Scripts - Announcement Bar Init - Announcement Bar Init.
 *
 * Generates an inline JavaScript string that checks local storage for a
 * previously dismissed announcement bar state and sets the corresponding
 * data attribute on the document element at page load.
 *
 * @param {ScriptsAnnouncementBarInitAnnouncementBarInitOptions} options - Options.
 *
 * @returns {ScriptsAnnouncementBarInitAnnouncementBarInitReturns}
 *
 * @since 0.15.0
 */
export function announcementBarInit(options: ScriptsAnnouncementBarInitAnnouncementBarInitOptions): ScriptsAnnouncementBarInitAnnouncementBarInitReturns {
  const dismissStorageKey: ScriptsAnnouncementBarInitAnnouncementBarInitDismissStorageKey = `docusaurus.announcement.dismiss${options['siteStorage']['namespace']}`;
  const dismissDataAttribute: ScriptsAnnouncementBarInitAnnouncementBarInitDismissDataAttribute = 'data-announcement-bar-initially-dismissed';

  const lines: ScriptsAnnouncementBarInitAnnouncementBarInitLines = [
    '(function() {',
    '  function isDismissed() {',
    '    try {',
    `      return localStorage.getItem('${dismissStorageKey}') === 'true';`,
    '    } catch (err) {}',
    '    return false;',
    '  }',
    `  document.documentElement.setAttribute('${dismissDataAttribute}', isDismissed());`,
    '})();',
  ];

  return lines.join('\n');
}
