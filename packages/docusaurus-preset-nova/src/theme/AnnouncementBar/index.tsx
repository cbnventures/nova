import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { useState } from 'react';

import type {
  ThemeAnnouncementBarBackgroundColor,
  ThemeAnnouncementBarCloseAriaLabel,
  ThemeAnnouncementBarConfig,
  ThemeAnnouncementBarContent,
  ThemeAnnouncementBarDismissStorageKey,
  ThemeAnnouncementBarId,
  ThemeAnnouncementBarInlineStyle,
  ThemeAnnouncementBarIsCloseable,
  ThemeAnnouncementBarIsDismissed,
  ThemeAnnouncementBarIsDismissedState,
  ThemeAnnouncementBarReturns,
  ThemeAnnouncementBarSetIsDismissed,
  ThemeAnnouncementBarTextColor,
  ThemeAnnouncementBarThemeConfig,
} from '../../types/theme/AnnouncementBar/index.d.ts';

/**
 * Theme - Announcement Bar - Announcement Bar.
 *
 * Renders a dismissible announcement banner above the navbar
 * with content from the theme configuration, persisting the
 * dismissed state in local storage.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function AnnouncementBar(): ThemeAnnouncementBarReturns {
  const themeConfig: ThemeAnnouncementBarThemeConfig = useThemeConfig() as ThemeAnnouncementBarThemeConfig;
  const config: ThemeAnnouncementBarConfig = themeConfig['announcementBar'];

  if (config === undefined) {
    return null;
  }

  const announcementId: ThemeAnnouncementBarId = config['id'];
  const content: ThemeAnnouncementBarContent = config['content'];
  const backgroundColor: ThemeAnnouncementBarBackgroundColor = config['backgroundColor'];
  const textColor: ThemeAnnouncementBarTextColor = config['textColor'];
  const isCloseable: ThemeAnnouncementBarIsCloseable = config['isCloseable'] ?? true;

  const dismissStorageKey: ThemeAnnouncementBarDismissStorageKey = `docusaurus.announcement.dismiss.${announcementId}`;
  const isDismissedState: ThemeAnnouncementBarIsDismissedState = useState<ThemeAnnouncementBarIsDismissed>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      return localStorage.getItem(dismissStorageKey) === 'true';
    } catch {
      return false;
    }
  });
  const isDismissed: ThemeAnnouncementBarIsDismissed = isDismissedState[0];
  const setIsDismissed: ThemeAnnouncementBarSetIsDismissed = isDismissedState[1];

  if (isDismissed === true || content === '') {
    return null;
  }

  const closeAriaLabel: ThemeAnnouncementBarCloseAriaLabel = translate({
    id: 'theme.AnnouncementBar.closeButtonAriaLabel',
    message: 'Close announcement',
    description: 'The ARIA label for the button that closes the announcement bar',
  });

  const inlineStyle: ThemeAnnouncementBarInlineStyle = {};

  if (backgroundColor !== undefined) {
    Reflect.set(inlineStyle, 'backgroundColor', backgroundColor);
  }

  if (textColor !== undefined) {
    Reflect.set(inlineStyle, 'color', textColor);
  }

  return (
    <div
      className="nova-announcement-bar"
      role="banner"
      style={inlineStyle}
    >
      <div
        className="nova-announcement-bar-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {(isCloseable === true) && (
        <button
          className="nova-announcement-bar-close"
          type="button"
          onClick={() => {
            setIsDismissed(true);

            try {
              localStorage.setItem(dismissStorageKey, 'true');
            } catch {
              // Storage unavailable.
            }

            return undefined;
          }}
          aria-label={closeAriaLabel}
        >
          <Icon icon="lucide:x" width="16" height="16" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default AnnouncementBar;
