import { createElement } from 'react';

import ComponentTypes from './component-types.js';

import type {
  ThemeNavbarItemNavbarItemComponentToRender,
  ThemeNavbarItemNavbarItemNormalizedType,
  ThemeNavbarItemNavbarItemProps,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Navbar Item.
 *
 * Routes a navbar item to the correct sub-component based on its
 * type field, normalizing missing or default types to either dropdown
 * or default depending on child items.
 *
 * @param {ThemeNavbarItemNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function NavbarItem(props: ThemeNavbarItemNavbarItemProps) {
  let normalizedType: ThemeNavbarItemNavbarItemNormalizedType = props['type'] ?? 'default';

  if (normalizedType === 'default' && 'items' in props) {
    normalizedType = 'dropdown';
  }
  const componentToRender: ThemeNavbarItemNavbarItemComponentToRender = ComponentTypes[normalizedType];

  if (componentToRender === undefined) {
    throw new Error(`No NavbarItem component found for type "${props['type']}".`);
  }

  return createElement(componentToRender, props);
}

export default NavbarItem;
