import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
import type { CSSProperties } from 'react';

import type { Lib_UseOverlayPanel_Returns } from '../../lib/use-overlay-panel.d.ts';

/**
 * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile.
 *
 * @since 0.15.0
 */
export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_Sidebar = BlogSidebar | undefined;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_ClassName = string | undefined;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_Style = CSSProperties | undefined;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props = {
  sidebar?: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_Sidebar;
  className?: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_ClassName;
  style?: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Pathname = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsOpenState = [boolean, Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsOpen];

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsOpen = boolean;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsOpen = React.Dispatch<React.SetStateAction<boolean>>;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_OverlayPanel = Lib_UseOverlayPanel_Returns;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsClosing = Lib_UseOverlayPanel_Returns['isClosing'];

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsClosing = Lib_UseOverlayPanel_Returns['setIsClosing'];

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideFunction = Lib_UseOverlayPanel_Returns['handleClickOutside'];

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_PanelRef = Lib_UseOverlayPanel_Returns['panelRef'];

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_TriggerLabel = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_OpenAriaLabel = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HeaderTitle = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_PanelAriaLabel = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_CloseAriaLabel = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_OverlayClassName = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_AnimationEvent = React.AnimationEvent<HTMLDivElement>;
