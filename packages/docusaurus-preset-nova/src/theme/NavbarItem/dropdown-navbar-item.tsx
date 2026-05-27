import NavbarItem from '@theme/NavbarItem';

import type {
  Theme_NavbarItem_DropdownNavbarItem_Items,
  Theme_NavbarItem_DropdownNavbarItem_Label,
  Theme_NavbarItem_DropdownNavbarItem_Props,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Dropdown Navbar Item - Dropdown Navbar Item.
 *
 * Renders a dropdown navigation menu using a native HTML details
 * element with a summary toggle, recursively rendering each child
 * item through the NavbarItem router.
 *
 * @param {Theme_NavbarItem_DropdownNavbarItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DropdownNavbarItem(props: Theme_NavbarItem_DropdownNavbarItem_Props) {
  const label: Theme_NavbarItem_DropdownNavbarItem_Label = props['label'];
  const items: Theme_NavbarItem_DropdownNavbarItem_Items = props['items'] ?? [];

  return (
    <details>
      <summary>
        {label}
      </summary>
      <ul>
        {
          items.map((childItem, index) => (
            <li key={childItem['label'] ?? index}>
              <NavbarItem
                {...childItem}
              />
            </li>
          ))
        }
      </ul>
    </details>
  );
}

export default DropdownNavbarItem;
