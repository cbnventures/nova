import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { useState } from 'react';

import type {
  Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_BackgroundColor,
  Theme_AnnouncementBar_Index_AnnouncementBar_CloseAriaLabel,
  Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar,
  Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_Content,
  Theme_AnnouncementBar_Index_AnnouncementBar_DismissStorageKey,
  Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_Id,
  Theme_AnnouncementBar_Index_AnnouncementBar_InlineStyle,
  Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_IsCloseable,
  Theme_AnnouncementBar_Index_AnnouncementBar_IsDismissed,
  Theme_AnnouncementBar_Index_AnnouncementBar_IsDismissedState,
  Theme_AnnouncementBar_Index_AnnouncementBar_Props,
  Theme_AnnouncementBar_Index_AnnouncementBar_Returns,
  Theme_AnnouncementBar_Index_AnnouncementBar_SetIsDismissed,
  Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_TextColor,
  Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig,
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
function AnnouncementBar(props: Theme_AnnouncementBar_Index_AnnouncementBar_Props): Theme_AnnouncementBar_Index_AnnouncementBar_Returns {
  const themeConfig: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig = useThemeConfig() as Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig;
  const config: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar = themeConfig['announcementBar'];

  if (config === undefined) {
    return null;
  }

  const announcementId: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_Id = config['id'];
  const content: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_Content = config['content'];
  const backgroundColor: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_BackgroundColor = config['backgroundColor'];
  const textColor: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_TextColor = config['textColor'];
  const isCloseable: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_IsCloseable = config['isCloseable'] ?? true;

  const dismissStorageKey: Theme_AnnouncementBar_Index_AnnouncementBar_DismissStorageKey = `docusaurus.announcement.dismiss.${announcementId}`;
  const isDismissedState: Theme_AnnouncementBar_Index_AnnouncementBar_IsDismissedState = useState<Theme_AnnouncementBar_Index_AnnouncementBar_IsDismissed>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      return localStorage.getItem(dismissStorageKey) === 'true';
    } catch {
      return false;
    }
  });
  const isDismissed: Theme_AnnouncementBar_Index_AnnouncementBar_IsDismissed = isDismissedState[0];
  const setIsDismissed: Theme_AnnouncementBar_Index_AnnouncementBar_SetIsDismissed = isDismissedState[1];

  if (isDismissed === true || content === '') {
    return null;
  }

  const closeAriaLabel: Theme_AnnouncementBar_Index_AnnouncementBar_CloseAriaLabel = translate({
    id: 'theme.AnnouncementBar.closeButtonAriaLabel',
    message: 'Close announcement',
    description: 'The ARIA label for the button that closes the announcement bar',
  });

  const inlineStyle: Theme_AnnouncementBar_Index_AnnouncementBar_InlineStyle = {};

  if (backgroundColor !== undefined) {
    Reflect.set(inlineStyle, 'backgroundColor', backgroundColor);
  }

  if (textColor !== undefined) {
    Reflect.set(inlineStyle, 'color', textColor);
  }

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-announcement-bar ${props['className']}` : 'nova-announcement-bar'}
      style={{
        ...inlineStyle, ...props['style'],
      }}
      role="banner"
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
