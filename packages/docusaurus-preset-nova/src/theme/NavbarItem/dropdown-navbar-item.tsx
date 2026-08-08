import { useLocation } from '@docusaurus/router';
import { Icon } from '@iconify/react/offline';
import NavbarItem from '@theme/NavbarItem';
import { useRef } from 'react';

import { useDetailsDismiss } from '../../lib/use-details-dismiss.js';

import type {
  Theme_NavbarItem_DropdownNavbarItem_ChildIsActive,
  Theme_NavbarItem_DropdownNavbarItem_ChildTo,
  Theme_NavbarItem_DropdownNavbarItem_DetailsClassName,
  Theme_NavbarItem_DropdownNavbarItem_DetailsRef,
  Theme_NavbarItem_DropdownNavbarItem_IsActive,
  Theme_NavbarItem_DropdownNavbarItem_Items,
  Theme_NavbarItem_DropdownNavbarItem_Label,
  Theme_NavbarItem_DropdownNavbarItem_Pathname,
  Theme_NavbarItem_DropdownNavbarItem_Props,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Dropdown Navbar Item - Dropdown Navbar Item.
 *
 * Renders a dropdown navigation menu using a native HTML details element
 * with a summary toggle, recursively rendering each child item through
 * the NavbarItem router and highlighting active children via path match.
 *
 * @param {Theme_NavbarItem_DropdownNavbarItem_Props} props - Props.
 *
 * @since 0.15.0
 */
function DropdownNavbarItem(props: Theme_NavbarItem_DropdownNavbarItem_Props) {
  const label: Theme_NavbarItem_DropdownNavbarItem_Label = props['label'];
  const items: Theme_NavbarItem_DropdownNavbarItem_Items = props['items'] ?? [];
  const isActive: Theme_NavbarItem_DropdownNavbarItem_IsActive = props['isActiveItem'] === true;
  const pathname: Theme_NavbarItem_DropdownNavbarItem_Pathname = useLocation()['pathname'];
  const detailsClassName: Theme_NavbarItem_DropdownNavbarItem_DetailsClassName = (isActive === true) ? 'nova-dropdown nova-dropdown--active' : 'nova-dropdown';

  const detailsRef: Theme_NavbarItem_DropdownNavbarItem_DetailsRef = useRef<HTMLDetailsElement | null>(null);

  useDetailsDismiss(detailsRef);

  return (
    <details ref={detailsRef} className={detailsClassName}>
      <summary className="nova-dropdown-summary">
        {label}
        <Icon icon="lucide:chevron-down" width="14" height="14" aria-hidden="true" />
      </summary>
      <ul className="nova-dropdown-menu">
        {
          items.map((childItem, index) => {
            const childTo: Theme_NavbarItem_DropdownNavbarItem_ChildTo = childItem['to'] as Theme_NavbarItem_DropdownNavbarItem_ChildTo;
            const childIsActive: Theme_NavbarItem_DropdownNavbarItem_ChildIsActive = (typeof childTo === 'string' && pathname.startsWith(childTo) === true);

            return (
              <li key={childItem['label'] ?? index} className="nova-dropdown-item">
                <NavbarItem
                  {...childItem}
                  isActiveItem={childIsActive}
                />
              </li>
            );
          })
        }
      </ul>
    </details>
  );
}

export default DropdownNavbarItem;
