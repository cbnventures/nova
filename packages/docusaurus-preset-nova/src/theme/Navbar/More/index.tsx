import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import NavbarItem from '@theme/NavbarItem';
import { useRef } from 'react';

import { useDetailsDismiss } from '../../../lib/use-details-dismiss.js';

import type {
  ThemeNavbarMoreActiveItemLabel,
  ThemeNavbarMoreDetailsRef,
  ThemeNavbarMoreItem,
  ThemeNavbarMoreItemKey,
  ThemeNavbarMoreItems,
  ThemeNavbarMoreItemSpread,
  ThemeNavbarMoreMoreLabel,
  ThemeNavbarMoreProps,
  ThemeNavbarMoreReturns,
} from '../../../types/theme/Navbar/More/index.d.ts';

/**
 * Theme - Navbar - More.
 *
 * Trailing dropdown that holds the overflow set of inline navbar items.
 * Mirrors locale-dropdown chrome for outside-click + open-state parity.
 *
 * @param {ThemeNavbarMoreProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function More(props: ThemeNavbarMoreProps): ThemeNavbarMoreReturns {
  const items: ThemeNavbarMoreItems = props['items'];
  const activeItemLabel: ThemeNavbarMoreActiveItemLabel = props['activeItemLabel'];
  const detailsRef: ThemeNavbarMoreDetailsRef = useRef<HTMLDetailsElement | null>(null);

  const moreLabel: ThemeNavbarMoreMoreLabel = translate({
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
          items.map((item: ThemeNavbarMoreItem) => {
            const itemKey: ThemeNavbarMoreItemKey = item['label'] ?? '';

            return (
              <li key={itemKey} className="nova-navbar-more-item">
                <NavbarItem
                  {...item as ThemeNavbarMoreItemSpread}
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
