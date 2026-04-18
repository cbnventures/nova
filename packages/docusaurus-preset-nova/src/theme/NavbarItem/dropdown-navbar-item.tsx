import NavbarItem from '@theme/NavbarItem';

import type {
  ThemeNavbarItemDropdownNavbarItemItems,
  ThemeNavbarItemDropdownNavbarItemLabel,
  ThemeNavbarItemDropdownNavbarItemProps,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Dropdown Navbar Item - Dropdown Navbar Item.
 *
 * Renders a dropdown navigation menu using a native HTML details
 * element with a summary toggle, recursively rendering each child
 * item through the NavbarItem router.
 *
 * @param {ThemeNavbarItemDropdownNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DropdownNavbarItem(props: ThemeNavbarItemDropdownNavbarItemProps) {
  const label: ThemeNavbarItemDropdownNavbarItemLabel = props['label'];
  const items: ThemeNavbarItemDropdownNavbarItemItems = props['items'] ?? [];

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
