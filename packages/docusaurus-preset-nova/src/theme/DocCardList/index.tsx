import {
  filterDocCardListItems,
  useCurrentSidebarSiblings,
} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';

import type {
  ThemeDocCardListDocCardListFilteredItems,
  ThemeDocCardListDocCardListForCurrentSidebarSidebarItems,
  ThemeDocCardListDocCardListIndex,
  ThemeDocCardListDocCardListItem,
  ThemeDocCardListDocCardListProps,
} from '../../types/theme/DocCardList/index.d.ts';

/**
 * Theme - Doc Card List - Doc Card List For Current Sidebar.
 *
 * Renders a doc card list for the current sidebar category
 * by automatically retrieving sibling items from the
 * sidebar context.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function DocCardListForCurrentSidebar() {
  const items: ThemeDocCardListDocCardListForCurrentSidebarSidebarItems = useCurrentSidebarSiblings();

  return <DocCardList items={items} />;
}

/**
 * Theme - Doc Card List - Doc Card List.
 *
 * Renders a list of DocCard components for each sidebar item,
 * filtering out unlisted items, or falling back to the current
 * sidebar siblings when no items are provided.
 *
 * @param {ThemeDocCardListDocCardListProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocCardList(props: ThemeDocCardListDocCardListProps) {
  if (props['items'] === undefined) {
    return <DocCardListForCurrentSidebar />;
  }

  const filteredItems: ThemeDocCardListDocCardListFilteredItems = filterDocCardListItems(props['items']);

  return (
    <section className="nova-grid">
      {
        filteredItems.map((item: ThemeDocCardListDocCardListItem, index: ThemeDocCardListDocCardListIndex) => (
          <article className="nova-col-12 nova-col-md-6 nova-col-lg-4" key={index}>
            <DocCard item={item} />
          </article>
        ))
      }
    </section>
  );
}

export default DocCardList;
