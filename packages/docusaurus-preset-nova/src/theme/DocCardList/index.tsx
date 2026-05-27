import {
  filterDocCardListItems,
  useCurrentSidebarSiblings,
} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';

import type {
  Theme_DocCardList_Index_DocCardList_FilteredItems,
  Theme_DocCardList_Index_DocCardList_Index,
  Theme_DocCardList_Index_DocCardList_Item,
  Theme_DocCardList_Index_DocCardList_Props,
  Theme_DocCardList_Index_DocCardListForCurrentSidebar_SidebarItems,
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
  const items: Theme_DocCardList_Index_DocCardListForCurrentSidebar_SidebarItems = useCurrentSidebarSiblings();

  return <DocCardList items={items} />;
}

/**
 * Theme - Doc Card List - Doc Card List.
 *
 * Renders a list of DocCard components for each sidebar item,
 * filtering out unlisted items, or falling back to the current
 * sidebar siblings when no items are provided.
 *
 * @param {Theme_DocCardList_Index_DocCardList_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocCardList(props: Theme_DocCardList_Index_DocCardList_Props) {
  if (props['items'] === undefined) {
    return <DocCardListForCurrentSidebar />;
  }

  const filteredItems: Theme_DocCardList_Index_DocCardList_FilteredItems = filterDocCardListItems(props['items']);

  return (
    <section
      className={(props['className'] !== undefined) ? `nova-grid ${props['className']}` : 'nova-grid'}
      style={props['style']}
    >
      {
        filteredItems.map((item: Theme_DocCardList_Index_DocCardList_Item, index: Theme_DocCardList_Index_DocCardList_Index) => (
          <article className="nova-col-12 nova-col-md-6 nova-col-lg-4" key={index}>
            <DocCard item={item} />
          </article>
        ))
      }
    </section>
  );
}

export default DocCardList;
