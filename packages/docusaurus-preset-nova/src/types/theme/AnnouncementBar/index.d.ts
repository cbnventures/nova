import type { Dispatch, SetStateAction } from 'react';

/**
 * Theme - Announcement Bar - Announcement Bar.
 *
 * @since 0.15.0
 */
export type ThemeAnnouncementBarReturns = React.JSX.Element | null;

export type ThemeAnnouncementBarThemeConfig = {
  announcementBar?: ThemeAnnouncementBarConfig;
  [key: string]: unknown;
};

export type ThemeAnnouncementBarConfig = {
  id: ThemeAnnouncementBarId;
  content: ThemeAnnouncementBarContent;
  backgroundColor?: ThemeAnnouncementBarBackgroundColor;
  textColor?: ThemeAnnouncementBarTextColor;
  isCloseable?: ThemeAnnouncementBarIsCloseable;
} | undefined;

export type ThemeAnnouncementBarId = string;

export type ThemeAnnouncementBarContent = string;

export type ThemeAnnouncementBarBackgroundColor = string | undefined;

export type ThemeAnnouncementBarTextColor = string | undefined;

export type ThemeAnnouncementBarIsCloseable = boolean | undefined;

export type ThemeAnnouncementBarDismissStorageKey = string;

export type ThemeAnnouncementBarIsDismissedState = [ThemeAnnouncementBarIsDismissed, ThemeAnnouncementBarSetIsDismissed];

export type ThemeAnnouncementBarIsDismissed = boolean;

export type ThemeAnnouncementBarSetIsDismissed = Dispatch<SetStateAction<ThemeAnnouncementBarIsDismissed>>;

export type ThemeAnnouncementBarCloseAriaLabel = string;

export type ThemeAnnouncementBarInlineStyle = React.CSSProperties;
