import { createElement } from 'react';

import ComponentTypes from './component-types.js';

import type {
  Theme_NavbarItem_Index_NavbarItem_ComponentToRender,
  Theme_NavbarItem_Index_NavbarItem_NormalizedType,
  Theme_NavbarItem_Index_NavbarItem_Props,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Navbar Item.
 *
 * Routes a navbar item to the correct sub-component based on its
 * type field, normalizing missing or default types to either dropdown
 * or default depending on child items.
 *
 * @param {Theme_NavbarItem_Index_NavbarItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function NavbarItem(props: Theme_NavbarItem_Index_NavbarItem_Props) {
  let normalizedType: Theme_NavbarItem_Index_NavbarItem_NormalizedType = props['type'] ?? 'default';

  if (normalizedType === 'default' && 'items' in props) {
    normalizedType = 'dropdown';
  }
  const componentToRender: Theme_NavbarItem_Index_NavbarItem_ComponentToRender = ComponentTypes[normalizedType];

  if (componentToRender === undefined) {
    throw new Error(`No NavbarItem component found for type "${props['type']}".`);
  }

  return (
    <span
      className={(props['className'] !== undefined) ? `nova-navbar-item ${props['className']}` : 'nova-navbar-item'}
      style={props['style']}
    >
      {createElement(componentToRender, props)}
    </span>
  );
}

export default NavbarItem;
