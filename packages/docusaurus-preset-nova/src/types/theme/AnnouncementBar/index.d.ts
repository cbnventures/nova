import type { CSSProperties, Dispatch, SetStateAction } from 'react';

/**
 * Theme - Announcement Bar - Announcement Bar.
 *
 * @since 0.15.0
 */
export type Theme_AnnouncementBar_Index_AnnouncementBar_Props_ClassName = string | undefined;

export type Theme_AnnouncementBar_Index_AnnouncementBar_Props_Style = CSSProperties | undefined;

export type Theme_AnnouncementBar_Index_AnnouncementBar_Props = {
  className?: Theme_AnnouncementBar_Index_AnnouncementBar_Props_ClassName;
  style?: Theme_AnnouncementBar_Index_AnnouncementBar_Props_Style;
};

export type Theme_AnnouncementBar_Index_AnnouncementBar_Returns = React.JSX.Element | null;

export type Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig = {
  announcementBar?: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar;
  [key: string]: unknown;
};

export type Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar = {
  id: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_Id;
  content: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_Content;
  backgroundColor?: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_BackgroundColor;
  textColor?: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_TextColor;
  isCloseable?: Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_IsCloseable;
} | undefined;

export type Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_Id = string;

export type Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_Content = string;

export type Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_BackgroundColor = string | undefined;

export type Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_TextColor = string | undefined;

export type Theme_AnnouncementBar_Index_AnnouncementBar_ThemeConfig_AnnouncementBar_IsCloseable = boolean | undefined;

export type Theme_AnnouncementBar_Index_AnnouncementBar_DismissStorageKey = string;

export type Theme_AnnouncementBar_Index_AnnouncementBar_IsDismissedState = [Theme_AnnouncementBar_Index_AnnouncementBar_IsDismissed, Theme_AnnouncementBar_Index_AnnouncementBar_SetIsDismissed];

export type Theme_AnnouncementBar_Index_AnnouncementBar_IsDismissed = boolean;

export type Theme_AnnouncementBar_Index_AnnouncementBar_SetIsDismissed = Dispatch<SetStateAction<Theme_AnnouncementBar_Index_AnnouncementBar_IsDismissed>>;

export type Theme_AnnouncementBar_Index_AnnouncementBar_CloseAriaLabel = string;

export type Theme_AnnouncementBar_Index_AnnouncementBar_InlineStyle = React.CSSProperties;
