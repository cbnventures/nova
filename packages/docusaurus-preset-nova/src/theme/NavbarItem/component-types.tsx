import DefaultNavbarItem from './default-navbar-item.js';
import DocNavbarItem from './doc-navbar-item.js';
import DocSidebarNavbarItem from './doc-sidebar-navbar-item.js';
import DocsVersionDropdownNavbarItem from './docs-version-dropdown-navbar-item.js';
import DocsVersionNavbarItem from './docs-version-navbar-item.js';
import DropdownNavbarItem from './dropdown-navbar-item.js';
import HtmlNavbarItem from './html-navbar-item.js';
import LocaleDropdownNavbarItem from './locale-dropdown-navbar-item.js';
import SearchNavbarItem from './search-navbar-item.js';

import type { ThemeNavbarItemComponentTypesMap } from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Component Types - Component Types.
 *
 * Maps navbar item type strings to their corresponding
 * React component implementations, serving as the central
 * registry for all supported variants.
 *
 * @since 0.15.0
 */
const componentTypes: ThemeNavbarItemComponentTypesMap = {
  default: DefaultNavbarItem,
  doc: DocNavbarItem,
  docSidebar: DocSidebarNavbarItem,
  docsVersion: DocsVersionNavbarItem,
  docsVersionDropdown: DocsVersionDropdownNavbarItem,
  dropdown: DropdownNavbarItem,
  html: HtmlNavbarItem,
  localeDropdown: LocaleDropdownNavbarItem,
  search: SearchNavbarItem,
};

export default componentTypes;
