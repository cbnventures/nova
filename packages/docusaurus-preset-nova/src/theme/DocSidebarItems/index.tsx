import { useVisibleSidebarItems } from '@docusaurus/plugin-content-docs/client';
import DocSidebarItem from '@theme/DocSidebarItem';

import type {
  Theme_DocSidebarItems_Index_DocSidebarItems_Index,
  Theme_DocSidebarItems_Index_DocSidebarItems_Item,
  Theme_DocSidebarItems_Index_DocSidebarItems_Props,
  Theme_DocSidebarItems_Index_DocSidebarItems_VisibleItems,
} from '../../types/theme/DocSidebarItems/index.d.ts';

/**
 * Theme - Doc Sidebar Items - Doc Sidebar Items.
 *
 * Filters sidebar items by visibility and maps each visible item to a
 * DocSidebarItem component, forwarding the active path and
 * nesting level without any expanded-state context.
 *
 * @param {Theme_DocSidebarItems_Index_DocSidebarItems_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarItems(props: Theme_DocSidebarItems_Index_DocSidebarItems_Props) {
  const visibleItems: Theme_DocSidebarItems_Index_DocSidebarItems_VisibleItems = useVisibleSidebarItems(props['items'], props['activePath']);

  return (
    <>
      {
        visibleItems.map((item: Theme_DocSidebarItems_Index_DocSidebarItems_Item, index: Theme_DocSidebarItems_Index_DocSidebarItems_Index) => (
          <DocSidebarItem
            key={index}
            item={item}
            activePath={props['activePath']}
            level={props['level']}
            index={index}
            className={(props['className'] !== undefined) ? `${props['className']}` : undefined}
            style={props['style']}
          />
        ))
      }
    </>
  );
}

export default DocSidebarItems;
