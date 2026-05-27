import { SearchInput, SearchProvider, SearchResults } from '@theme/SearchBar';

import type { Theme_NavbarItem_SearchNavbarItem_Props } from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Search Navbar Item - Search Navbar Item.
 *
 * Renders the Docusaurus SearchBar theme component
 * directly into the navigation bar without any wrapper
 * elements or framework-specific styling.
 *
 * @param {Theme_NavbarItem_SearchNavbarItem_Props} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchNavbarItem(_props: Theme_NavbarItem_SearchNavbarItem_Props) {
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
