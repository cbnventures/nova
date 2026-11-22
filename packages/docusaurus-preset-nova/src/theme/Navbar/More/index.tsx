import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import NavbarItem from '@theme/NavbarItem';
import { useId, useRef } from 'react';

import { useDetailsDismiss } from '../../../lib/use-details-dismiss.js';

import type {
  Theme_Navbar_More_Index_More_ActiveItemLabel,
  Theme_Navbar_More_Index_More_ChildIsActive,
  Theme_Navbar_More_Index_More_ChildItem,
  Theme_Navbar_More_Index_More_ChildKey,
  Theme_Navbar_More_Index_More_ChildLabel,
  Theme_Navbar_More_Index_More_ChildTo,
  Theme_Navbar_More_Index_More_DetailsRef,
  Theme_Navbar_More_Index_More_GroupClassName,
  Theme_Navbar_More_Index_More_GroupIdPrefix,
  Theme_Navbar_More_Index_More_GroupLabelId,
  Theme_Navbar_More_Index_More_Item,
  Theme_Navbar_More_Index_More_ItemChildren,
  Theme_Navbar_More_Index_More_ItemIndex,
  Theme_Navbar_More_Index_More_ItemKey,
  Theme_Navbar_More_Index_More_Items,
  Theme_Navbar_More_Index_More_ItemSpread,
  Theme_Navbar_More_Index_More_ItemType,
  Theme_Navbar_More_Index_More_Label,
  Theme_Navbar_More_Index_More_Pathname,
  Theme_Navbar_More_Index_More_Props,
  Theme_Navbar_More_Index_More_Returns,
} from '../../../types/theme/Navbar/More/index.d.ts';

/**
 * Theme - Navbar - More - More.
 *
 * Trailing dropdown that holds the overflow set of inline navbar items,
 * with locale-dropdown dismissal. Dropdown items list inline as a labelled
 * group of rows, since the scrolling menu would clip a nested popover.
 *
 * @param {Theme_Navbar_More_Index_More_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.18.0
 */
function More(props: Theme_Navbar_More_Index_More_Props): Theme_Navbar_More_Index_More_Returns {
  const items: Theme_Navbar_More_Index_More_Items = props['items'];
  const activeItemLabel: Theme_Navbar_More_Index_More_ActiveItemLabel = props['activeItemLabel'];
  const pathname: Theme_Navbar_More_Index_More_Pathname = useLocation()['pathname'];
  const detailsRef: Theme_Navbar_More_Index_More_DetailsRef = useRef<HTMLDetailsElement | null>(null);
  const groupIdPrefix: Theme_Navbar_More_Index_More_GroupIdPrefix = useId();

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
          items.map((item: Theme_Navbar_More_Index_More_Item, itemIndex: Theme_Navbar_More_Index_More_ItemIndex) => {
            const itemKey: Theme_Navbar_More_Index_More_ItemKey = item['label'] ?? '';
            const itemType: Theme_Navbar_More_Index_More_ItemType = item['type'] as Theme_Navbar_More_Index_More_ItemType;
            const itemChildren: Theme_Navbar_More_Index_More_ItemChildren = item['items'] as Theme_Navbar_More_Index_More_ItemChildren;

            if (
              itemType === 'dropdown'
              || (
                itemType === undefined
                && Array.isArray(itemChildren) === true
              )
            ) {
              const groupLabelId: Theme_Navbar_More_Index_More_GroupLabelId = `${groupIdPrefix}-group-${itemIndex}`;
              const groupClassName: Theme_Navbar_More_Index_More_GroupClassName = (item['label'] === activeItemLabel) ? 'nova-navbar-more-group nova-navbar-more-group--active' : 'nova-navbar-more-group';

              return (
                <li key={itemKey} className={groupClassName}>
                  <span id={groupLabelId} className="nova-navbar-more-group-label">{item['label']}</span>
                  <ul className="nova-navbar-more-group-items" aria-labelledby={groupLabelId}>
                    {
                      (itemChildren ?? []).map((childItem: Theme_Navbar_More_Index_More_ChildItem, childIndex) => {
                        const childLabel: Theme_Navbar_More_Index_More_ChildLabel = childItem['label'] as Theme_Navbar_More_Index_More_ChildLabel;
                        const childKey: Theme_Navbar_More_Index_More_ChildKey = childLabel ?? String(childIndex);
                        const childTo: Theme_Navbar_More_Index_More_ChildTo = childItem['to'] as Theme_Navbar_More_Index_More_ChildTo;
                        const childIsActive: Theme_Navbar_More_Index_More_ChildIsActive = (typeof childTo === 'string' && pathname.startsWith(childTo) === true);

                        return (
                          <li key={childKey} className="nova-navbar-more-item">
                            <NavbarItem
                              {...childItem as Theme_Navbar_More_Index_More_ItemSpread}
                              isActiveItem={childIsActive}
                            />
                          </li>
                        );
                      })
                    }
                  </ul>
                </li>
              );
            }

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
