import type {
  Scripts_AnnouncementBarInit_AnnouncementBarInit_DismissDataAttribute,
  Scripts_AnnouncementBarInit_AnnouncementBarInit_DismissStorageKey,
  Scripts_AnnouncementBarInit_AnnouncementBarInit_Lines,
  Scripts_AnnouncementBarInit_AnnouncementBarInit_Options,
  Scripts_AnnouncementBarInit_AnnouncementBarInit_Returns,
} from '../types/scripts/announcement-bar-init.d.ts';

/**
 * Scripts - Announcement Bar Init - Announcement Bar Init.
 *
 * Generates an inline JavaScript string that checks local storage for a
 * previously dismissed announcement bar state and sets the corresponding
 * data attribute on the document element at page load.
 *
 * @param {Scripts_AnnouncementBarInit_AnnouncementBarInit_Options} options - Options.
 *
 * @returns {Scripts_AnnouncementBarInit_AnnouncementBarInit_Returns}
 *
 * @since 0.15.0
 */
export function announcementBarInit(options: Scripts_AnnouncementBarInit_AnnouncementBarInit_Options): Scripts_AnnouncementBarInit_AnnouncementBarInit_Returns {
  const dismissStorageKey: Scripts_AnnouncementBarInit_AnnouncementBarInit_DismissStorageKey = `docusaurus.announcement.dismiss${options['siteStorage']['namespace']}`;
  const dismissDataAttribute: Scripts_AnnouncementBarInit_AnnouncementBarInit_DismissDataAttribute = 'data-announcement-bar-initially-dismissed';

  const lines: Scripts_AnnouncementBarInit_AnnouncementBarInit_Lines = [
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
