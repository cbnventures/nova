import { createContext } from 'react';

import type {
  Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_HasChildren,
  Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_HasHref,
  Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_InMobilePanel,
  Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_Returns,
  Theme_DocSidebarMobile_PanelContext_SidebarMobilePanelContext,
} from '../../types/theme/DocSidebarMobile/panel-context.d.ts';

/**
 * Theme - Doc Sidebar Mobile - Panel Context - Sidebar Mobile Panel Context.
 *
 * True for sidebar items rendered inside the mobile navigation panel, so
 * categories there can behave as expand toggles instead of page links.
 *
 * @since 0.50.0
 */
export const sidebarMobilePanelContext: Theme_DocSidebarMobile_PanelContext_SidebarMobilePanelContext = createContext<boolean>(false);

/**
 * Theme - Doc Sidebar Mobile - Panel Context - Get Category Label Mode.
 *
 * Decides how a category label behaves. In the mobile panel a category with
 * children toggles open and closed, and its own page moves to an Overview
 * entry, so browsing the tree never navigates away and closes the panel.
 *
 * @param {Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_InMobilePanel} inMobilePanel - In mobile panel.
 * @param {Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_HasHref}       hasHref       - Has href.
 * @param {Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_HasChildren}   hasChildren   - Has children.
 *
 * @returns {Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_Returns}
 *
 * @since 0.50.0
 */
export function getCategoryLabelMode(inMobilePanel: Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_InMobilePanel, hasHref: Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_HasHref, hasChildren: Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_HasChildren): Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_Returns {
  if (hasHref === false) {
    return 'toggle';
  }

  if (inMobilePanel === true && hasChildren === true) {
    return 'toggle-with-overview';
  }

  return 'link';
}
