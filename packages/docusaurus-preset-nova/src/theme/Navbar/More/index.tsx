import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import NavbarItem from '@theme/NavbarItem';
import { useRef } from 'react';

import { useDetailsDismiss } from '../../../lib/use-details-dismiss.js';

import type {
  Theme_Navbar_More_Index_More_ActiveItemLabel,
  Theme_Navbar_More_Index_More_DetailsRef,
  Theme_Navbar_More_Index_More_Item,
  Theme_Navbar_More_Index_More_ItemKey,
  Theme_Navbar_More_Index_More_Items,
  Theme_Navbar_More_Index_More_ItemSpread,
  Theme_Navbar_More_Index_More_Label,
  Theme_Navbar_More_Index_More_Props,
  Theme_Navbar_More_Index_More_Returns,
} from '../../../types/theme/Navbar/More/index.d.ts';

/**
 * Theme - Navbar - More.
 *
 * Trailing dropdown that holds the overflow set of inline navbar items.
 * Mirrors locale-dropdown chrome for outside-click + open-state parity.
 *
 * @param {Theme_Navbar_More_Index_More_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function More(props: Theme_Navbar_More_Index_More_Props): Theme_Navbar_More_Index_More_Returns {
  const items: Theme_Navbar_More_Index_More_Items = props['items'];
  const activeItemLabel: Theme_Navbar_More_Index_More_ActiveItemLabel = props['activeItemLabel'];
  const detailsRef: Theme_Navbar_More_Index_More_DetailsRef = useRef<HTMLDetailsElement | null>(null);

  const moreLabel: Theme_Navbar_More_Index_More_Label = translate({
    id: 'theme.navbar.moreLabel',
    message: 'More',
    description: 'The screen-reader label for the navbar overflow More dropdown trigger',
  });

  useDetailsDismiss(detailsRef);

  return (
    <details
      ref={detailsRef}
      className={(props['className'] !== undefined) ? `nova-navbar-more ${props['className']}` : 'nova-navbar-more'}
      style={props['style']}
    >
      <summary className="nova-navbar-more-summary">
        <Icon icon="lucide:chevron-down" width="14" height="14" aria-hidden="true" />
        <span className="nova-sr-only">{moreLabel}</span>
      </summary>
      <ul className="nova-navbar-more-menu">
        {
          items.map((item: Theme_Navbar_More_Index_More_Item) => {
            const itemKey: Theme_Navbar_More_Index_More_ItemKey = item['label'] ?? '';

            return (
              <li key={itemKey} className="nova-navbar-more-item">
                <NavbarItem
                  {...item as Theme_Navbar_More_Index_More_ItemSpread}
                  isActiveItem={item['label'] === activeItemLabel}
                />
              </li>
            );
          })
        }
      </ul>
    </details>
  );
}

export default More;
