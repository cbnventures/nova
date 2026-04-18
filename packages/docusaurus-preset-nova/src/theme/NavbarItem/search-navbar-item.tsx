import { SearchInput, SearchProvider, SearchResults } from '@theme/SearchBar';

import type { ThemeNavbarItemSearchNavbarItemProps } from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Search Navbar Item - Search Navbar Item.
 *
 * Renders the Docusaurus SearchBar theme component
 * directly into the navigation bar without any wrapper
 * elements or framework-specific styling.
 *
 * @param {ThemeNavbarItemSearchNavbarItemProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchNavbarItem(_props: ThemeNavbarItemSearchNavbarItemProps) {
  return (
    <SearchProvider>
      <div className="nova-search-anchor">
        <SearchInput />
        <SearchResults />
      </div>
    </SearchProvider>
  );
}

export default SearchNavbarItem;
