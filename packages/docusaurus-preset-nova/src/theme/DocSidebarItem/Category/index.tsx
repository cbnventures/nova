import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import { useEffect, useState } from 'react';

import { LIB_REGEX_TRAILING_SLASH } from '../../../lib/regex.js';

import type {
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ActiveDescendant,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_AriaCurrent,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_AutoCollapseCategories,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_CategoryKey,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_CollapseCategoryAriaLabel,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ActivePath,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Item,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ItemHref,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ItemItems,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Items,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Result,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_DocsConfig,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ExpandCategoryAriaLabel,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ActivePath,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Item,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemHref,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemItems,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemLabel,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Items,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Result,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_DetailsElement,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_GrandparentElement,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_IsOpen,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_ParentElement,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_SiblingDetails,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_ToggleEvent,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Href,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_InitialOpenValue,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_IsActive,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_IsOpenValue,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Label,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_NextLevel,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_OpenState,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SetIsOpenValue,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SidebarConfig,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_StateMap,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_StoredState,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SummaryAriaLabel,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SummaryClickEvent,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SummaryClickTarget,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ThemeConfig,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ThemeConfigCast,
} from '../../../types/theme/DocSidebarItem/Category/index.d.ts';

/**
 * Theme - Doc Sidebar Item - Category - State Map.
 *
 * Module-level map that persists category open/closed state
 * across React remounts during client-side navigation,
 * resetting only on full page reload.
 *
 * @since 0.15.0
 */
const categoryStateMap: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_StateMap = new Map();

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category.
 *
 * Renders a collapsible sidebar category using a native HTML details element
 * with a summary toggle, linking the label when a category href
 * exists and recursively nesting child items.
 *
 * @param {Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarItemCategory(props: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props) {
  const themeConfig: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ThemeConfig = useThemeConfig() as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ThemeConfigCast as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ThemeConfig;
  const docsConfig: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_DocsConfig = themeConfig['docs'] as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_DocsConfig;
  const sidebarConfig: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SidebarConfig = docsConfig['sidebar'];
  const autoCollapseCategoriesValue: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_AutoCollapseCategories = (sidebarConfig['autoCollapseCategories'] ?? false);

  const href: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Href = props['item']['href'];
  const label: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Label = props['item']['label'];
  const nextLevel: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_NextLevel = props['level'] + 1;

  /**
   * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Contains Active Path.
   *
   * Recursively checks whether the active path matches any descendant
   * item href within the given sidebar items, returning true when the
   * category should auto-expand for the current page.
   *
   * @param {Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Items}      items      - Items.
   * @param {Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ActivePath} activePath - Active path.
   *
   * @returns {boolean}
   *
   * @since 0.15.0
   */
  function containsActivePath(items: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Items, activePath: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ActivePath): Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Result {
    for (const item of items) {
      const sidebarItem: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Item = item as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Item;
      const itemHref: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ItemHref = sidebarItem['href'] as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ItemHref;

      if (
        itemHref !== undefined
        && itemHref.replace(LIB_REGEX_TRAILING_SLASH, '') === activePath.replace(LIB_REGEX_TRAILING_SLASH, '')
      ) {
        return true;
      }

      const itemItems: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ItemItems = sidebarItem['items'] as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ItemItems;

      if (itemItems !== undefined && containsActivePath(itemItems, activePath) === true) {
        return true;
      }
    }

    return false;
  }

  /**
   * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Find Active Descendant.
   *
   * Recursively searches descendant sidebar items for the one whose
   * href matches the active path, returning its label and href
   * for rendering as a peek when the category is collapsed.
   *
   * @param {Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Items}      items      - Items.
   * @param {Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ActivePath} activePath - Active path.
   *
   * @returns {Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Result}
   *
   * @since 0.15.0
   */
  function findActiveDescendant(items: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Items, activePath: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ActivePath): Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Result {
    for (const item of items) {
      const sidebarItem: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Item = item as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Item;
      const itemHref: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemHref = sidebarItem['href'] as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemHref;

      if (
        itemHref !== undefined
        && itemHref.replace(LIB_REGEX_TRAILING_SLASH, '') === activePath.replace(LIB_REGEX_TRAILING_SLASH, '')
      ) {
        const itemLabel: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemLabel = sidebarItem['label'] as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemLabel;

        return {
          label: itemLabel,
          href: itemHref,
        };
      }

      const itemItems: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemItems = sidebarItem['items'] as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemItems;

      if (itemItems !== undefined) {
        const found: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Result = findActiveDescendant(itemItems, activePath);

        if (found !== undefined) {
          return found;
        }
      }
    }

    return undefined;
  }

  const categoryAriaCurrent: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_AriaCurrent = (href !== undefined && href.replace(LIB_REGEX_TRAILING_SLASH, '') === props['activePath'].replace(LIB_REGEX_TRAILING_SLASH, '')) ? 'page' : undefined;
  const categoryKey: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_CategoryKey = `${label}-${props['level']}`;
  const isActive: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_IsActive = (
    (
      href !== undefined
      && href.replace(LIB_REGEX_TRAILING_SLASH, '') === props['activePath'].replace(LIB_REGEX_TRAILING_SLASH, '')
    )
    || containsActivePath(props['item']['items'], props['activePath'])
  );
  const activeDescendant: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ActiveDescendant = (isActive === true) ? findActiveDescendant(props['item']['items'], props['activePath']) : undefined;

  const storedState: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_StoredState = categoryStateMap.get(categoryKey);
  let initialOpenValue: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_InitialOpenValue = false;

  if (storedState !== undefined) {
    initialOpenValue = storedState;
  }

  if (isActive === true) {
    initialOpenValue = true;
  }

  const openState: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_OpenState = useState<Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_IsOpenValue>(initialOpenValue);
  const isOpenValue: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_IsOpenValue = openState[0];
  const setIsOpenValue: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SetIsOpenValue = openState[1];

  // Reopen this category when the active path moves into it.
  useEffect(() => {
    if (isActive === true) {
      setIsOpenValue(true);
    }

    return undefined;
  }, [isActive]);

  const collapseCategoryAriaLabel: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_CollapseCategoryAriaLabel = translate(
    {
      id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
      message: 'Collapse sidebar category \'{label}\'',
      description: 'The ARIA label of the toggle on a collapsible doc sidebar category when it is currently expanded',
    },
    { label },
  );
  const expandCategoryAriaLabel: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ExpandCategoryAriaLabel = translate(
    {
      id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
      message: 'Expand sidebar category \'{label}\'',
      description: 'The ARIA label of the toggle on a collapsible doc sidebar category when it is currently collapsed',
    },
    { label },
  );
  const summaryAriaLabel: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SummaryAriaLabel = (isOpenValue === true) ? collapseCategoryAriaLabel : expandCategoryAriaLabel;

  /**
   * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Handle Toggle.
   *
   * Collapses all sibling details elements when the current category opens
   * and auto-collapse categories is enabled, producing accordion behavior.
   *
   * @param {Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_ToggleEvent} toggleEvent - Toggle event.
   *
   * @since 0.15.0
   */
  function handleToggle(toggleEvent: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_ToggleEvent) {
    const detailsElement: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_DetailsElement = toggleEvent.currentTarget;
    const isOpen: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_IsOpen = detailsElement.open;

    setIsOpenValue(isOpen);

    categoryStateMap.set(categoryKey, isOpen);

    if (autoCollapseCategoriesValue === false) {
      return undefined;
    }

    if (isOpen === false) {
      return undefined;
    }

    const parentElement: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_ParentElement = detailsElement.parentElement;

    if (parentElement === null) {
      return undefined;
    }

    const grandparentElement: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_GrandparentElement = parentElement.parentElement;

    if (grandparentElement === null) {
      return undefined;
    }

    const siblingDetails: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_SiblingDetails = grandparentElement.querySelectorAll(':scope > li > details[open]') as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_SiblingDetails;

    siblingDetails.forEach((siblingDetail: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_DetailsElement) => {
      if (siblingDetail !== detailsElement) {
        siblingDetail.removeAttribute('open');
      }

      return undefined;
    });

    return undefined;
  }

  return (
    <li
      className={(props['className'] !== undefined) ? `nova-sidebar-item nova-sidebar-category ${props['className']}` : 'nova-sidebar-item nova-sidebar-category'}
      style={props['style']}
    >
      <details
        className="nova-sidebar-category-details"
        open={(isOpenValue === true) ? true : undefined}
        onToggle={handleToggle}
      >
        <summary
          className="nova-sidebar-category-summary"
          aria-label={summaryAriaLabel}
          onClick={(summaryClickEvent: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SummaryClickEvent) => {
            const clickTarget: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SummaryClickTarget = summaryClickEvent.target as Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SummaryClickTarget;

            if (clickTarget.closest('a') !== null) {
              summaryClickEvent.preventDefault();
            }

            return undefined;
          }}
        >
          {(href !== undefined) ? (
            <Link className="nova-sidebar-link" to={href} aria-current={categoryAriaCurrent}>
              {label}
            </Link>
          ) : (
            label
          )}
        </summary>
        <ul className="nova-sidebar-list">
          <DocSidebarItems
            items={props['item']['items']}
            activePath={props['activePath']}
            level={nextLevel}
          />
        </ul>
      </details>
      {(activeDescendant !== undefined) && (
        <Link
          className="nova-sidebar-link nova-sidebar-active-peek"
          to={activeDescendant['href']}
          aria-current="page"
        >
          {activeDescendant['label']}
        </Link>
      )}
    </li>
  );
}

export default DocSidebarItemCategory;
