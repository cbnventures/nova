import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { getCategoryLabelMode } from '../../../theme/DocSidebarMobile/panel-context.js';

import type {
  Tests_Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_KeepsCategoryLinksOnTheDesktopSidebar_Result,
  Tests_Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_KeepsLinksForEmptyCategoriesInTheMobilePanel_Result,
  Tests_Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_ToggleCategoriesWithoutAPage_Result,
  Tests_Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_TogglesCategoriesInTheMobilePanelAndMovesTheirPageToOverview_Result,
} from '../../../types/tests/theme/DocSidebarMobile/panel-context.test.d.ts';

/**
 * Tests - Theme - Doc Sidebar Mobile - Panel Context - Get Category Label Mode.
 *
 * @since 0.50.0
 */
describe('getCategoryLabelMode', async () => {
  it('toggles categories in the mobile panel and moves their page to overview', () => {
    const result: Tests_Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_TogglesCategoriesInTheMobilePanelAndMovesTheirPageToOverview_Result = getCategoryLabelMode(true, true, true);

    strictEqual(result, 'toggle-with-overview');

    return;
  });

  it('keeps category links on the desktop sidebar', () => {
    const result: Tests_Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_KeepsCategoryLinksOnTheDesktopSidebar_Result = getCategoryLabelMode(false, true, true);

    strictEqual(result, 'link');

    return;
  });

  it('keeps links for empty categories in the mobile panel', () => {
    const result: Tests_Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_KeepsLinksForEmptyCategoriesInTheMobilePanel_Result = getCategoryLabelMode(true, true, false);

    strictEqual(result, 'link');

    return;
  });

  it('toggle categories without a page', () => {
    const result: Tests_Theme_DocSidebarMobile_PanelContext_GetCategoryLabelMode_ToggleCategoriesWithoutAPage_Result = getCategoryLabelMode(true, false, true);

    strictEqual(result, 'toggle');

    return;
  });

  return;
});
