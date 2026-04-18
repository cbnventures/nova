import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import DocSidebarItems from '@theme/DocSidebarItems';

import { LIB_REGEX_TRAILING_SLASH } from '../../../lib/regex.js';

import type {
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryActiveDescendant,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryAriaCurrent,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryAutoCollapseCategories,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryCategoryKey,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathActivePath,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItem,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItemHref,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItemItems,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItems,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathResult,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryDetailsElement,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryDocsConfig,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantActivePath,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItem,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemHref,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemItems,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemLabel,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItems,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantResult,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryGrandparentElement,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryHref,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryIsActive,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryIsOpen,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryIsOpenValue,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryLabel,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryNextLevel,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryParentElement,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryProps,
  ThemeDocSidebarItemCategoryDocSidebarItemCategorySiblingDetails,
  ThemeDocSidebarItemCategoryDocSidebarItemCategorySidebarConfig,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryStateMap,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryStoredState,
  ThemeDocSidebarItemCategoryDocSidebarItemCategorySummaryClickEvent,
  ThemeDocSidebarItemCategoryDocSidebarItemCategorySummaryClickTarget,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryThemeConfig,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryThemeConfigCast,
  ThemeDocSidebarItemCategoryDocSidebarItemCategoryToggleEvent,
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
const categoryStateMap: ThemeDocSidebarItemCategoryDocSidebarItemCategoryStateMap = new Map();

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category.
 *
 * Renders a collapsible sidebar category using a native HTML details element
 * with a summary toggle, linking the label when a category href
 * exists and recursively nesting child items.
 *
 * @param {ThemeDocSidebarItemCategoryDocSidebarItemCategoryProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarItemCategory(props: ThemeDocSidebarItemCategoryDocSidebarItemCategoryProps) {
  const themeConfig: ThemeDocSidebarItemCategoryDocSidebarItemCategoryThemeConfig = useThemeConfig() as ThemeDocSidebarItemCategoryDocSidebarItemCategoryThemeConfigCast as ThemeDocSidebarItemCategoryDocSidebarItemCategoryThemeConfig;
  const docsConfig: ThemeDocSidebarItemCategoryDocSidebarItemCategoryDocsConfig = themeConfig['docs'] as ThemeDocSidebarItemCategoryDocSidebarItemCategoryDocsConfig;
  const sidebarConfig: ThemeDocSidebarItemCategoryDocSidebarItemCategorySidebarConfig = docsConfig['sidebar'];
  const autoCollapseCategoriesValue: ThemeDocSidebarItemCategoryDocSidebarItemCategoryAutoCollapseCategories = (sidebarConfig['autoCollapseCategories'] ?? false);

  const href: ThemeDocSidebarItemCategoryDocSidebarItemCategoryHref = props['item']['href'];
  const label: ThemeDocSidebarItemCategoryDocSidebarItemCategoryLabel = props['item']['label'];
  const nextLevel: ThemeDocSidebarItemCategoryDocSidebarItemCategoryNextLevel = props['level'] + 1;

  /**
   * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Contains Active Path.
   *
   * Recursively checks whether the active path matches any descendant
   * item href within the given sidebar items, returning true when the
   * category should auto-expand for the current page.
   *
   * @param {ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItems}      items      - Items.
   * @param {ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathActivePath} activePath - Active path.
   *
   * @returns {boolean}
   *
   * @since 0.15.0
   */
  function containsActivePath(items: ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItems, activePath: ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathActivePath): ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathResult {
    for (const item of items) {
      const sidebarItem: ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItem = item as ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItem;
      const itemHref: ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItemHref = sidebarItem['href'] as ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItemHref;

      if (
        itemHref !== undefined
        && itemHref.replace(LIB_REGEX_TRAILING_SLASH, '') === activePath.replace(LIB_REGEX_TRAILING_SLASH, '')
      ) {
        return true;
      }

      const itemItems: ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItemItems = sidebarItem['items'] as ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItemItems;

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
   * @param {ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItems}      items      - Items.
   * @param {ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantActivePath} activePath - Active path.
   *
   * @returns {ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantResult}
   *
   * @since 0.15.0
   */
  function findActiveDescendant(items: ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItems, activePath: ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantActivePath): ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantResult {
    for (const item of items) {
      const sidebarItem: ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItem = item as ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItem;
      const itemHref: ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemHref = sidebarItem['href'] as ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemHref;

      if (
        itemHref !== undefined
        && itemHref.replace(LIB_REGEX_TRAILING_SLASH, '') === activePath.replace(LIB_REGEX_TRAILING_SLASH, '')
      ) {
        const itemLabel: ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemLabel = sidebarItem['label'] as ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemLabel;

        return {
          label: itemLabel,
          href: itemHref,
        };
      }

      const itemItems: ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemItems = sidebarItem['items'] as ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemItems;

      if (itemItems !== undefined) {
        const found: ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantResult = findActiveDescendant(itemItems, activePath);

        if (found !== undefined) {
          return found;
        }
      }
    }

    return undefined;
  }

  const categoryAriaCurrent: ThemeDocSidebarItemCategoryDocSidebarItemCategoryAriaCurrent = (href !== undefined && href.replace(LIB_REGEX_TRAILING_SLASH, '') === props['activePath'].replace(LIB_REGEX_TRAILING_SLASH, '')) ? 'page' : undefined;
  const categoryKey: ThemeDocSidebarItemCategoryDocSidebarItemCategoryCategoryKey = `${label}-${props['level']}`;
  const isActive: ThemeDocSidebarItemCategoryDocSidebarItemCategoryIsActive = (
    (
      href !== undefined
      && href.replace(LIB_REGEX_TRAILING_SLASH, '') === props['activePath'].replace(LIB_REGEX_TRAILING_SLASH, '')
    )
    || containsActivePath(props['item']['items'], props['activePath'])
  );
  const activeDescendant: ThemeDocSidebarItemCategoryDocSidebarItemCategoryActiveDescendant = (isActive === true) ? findActiveDescendant(props['item']['items'], props['activePath']) : undefined;

  const storedState: ThemeDocSidebarItemCategoryDocSidebarItemCategoryStoredState = categoryStateMap.get(categoryKey);
  let isOpenValue: ThemeDocSidebarItemCategoryDocSidebarItemCategoryIsOpenValue = false;

  if (storedState !== undefined) {
    isOpenValue = storedState;
  }

  if (isActive === true) {
    isOpenValue = true;
  }

  /**
   * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Handle Toggle.
   *
   * Collapses all sibling details elements when the current category opens
   * and auto-collapse categories is enabled, producing accordion behavior.
   *
   * @param {ThemeDocSidebarItemCategoryDocSidebarItemCategoryToggleEvent} toggleEvent - Toggle event.
   *
   * @since 0.15.0
   */
  function handleToggle(toggleEvent: ThemeDocSidebarItemCategoryDocSidebarItemCategoryToggleEvent) {
    const detailsElement: ThemeDocSidebarItemCategoryDocSidebarItemCategoryDetailsElement = toggleEvent.currentTarget;
    const isOpen: ThemeDocSidebarItemCategoryDocSidebarItemCategoryIsOpen = detailsElement.open;

    categoryStateMap.set(categoryKey, isOpen);

    if (autoCollapseCategoriesValue === false) {
      return undefined;
    }

    if (isOpen === false) {
      return undefined;
    }

    const parentElement: ThemeDocSidebarItemCategoryDocSidebarItemCategoryParentElement = detailsElement.parentElement;

    if (parentElement === null) {
      return undefined;
    }

    const grandparentElement: ThemeDocSidebarItemCategoryDocSidebarItemCategoryGrandparentElement = parentElement.parentElement;

    if (grandparentElement === null) {
      return undefined;
    }

    const siblingDetails: ThemeDocSidebarItemCategoryDocSidebarItemCategorySiblingDetails = grandparentElement.querySelectorAll(':scope > li > details[open]') as ThemeDocSidebarItemCategoryDocSidebarItemCategorySiblingDetails;

    siblingDetails.forEach((siblingDetail: ThemeDocSidebarItemCategoryDocSidebarItemCategoryDetailsElement) => {
      if (siblingDetail !== detailsElement) {
        siblingDetail.removeAttribute('open');
      }

      return undefined;
    });

    return undefined;
  }

  return (
    <li className="nova-sidebar-item nova-sidebar-category">
      <details
        className="nova-sidebar-category-details"
        open={(isOpenValue === true) ? true : undefined}
        onToggle={handleToggle}
      >
        <summary
          className="nova-sidebar-category-summary"
          onClick={(summaryClickEvent: ThemeDocSidebarItemCategoryDocSidebarItemCategorySummaryClickEvent) => {
            const clickTarget: ThemeDocSidebarItemCategoryDocSidebarItemCategorySummaryClickTarget = summaryClickEvent.target as ThemeDocSidebarItemCategoryDocSidebarItemCategorySummaryClickTarget;

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
