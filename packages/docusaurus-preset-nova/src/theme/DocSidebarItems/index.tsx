import { useVisibleSidebarItems } from '@docusaurus/plugin-content-docs/client';
import DocSidebarItem from '@theme/DocSidebarItem';

import type {
  ThemeDocSidebarItemsDocSidebarItemsIndex,
  ThemeDocSidebarItemsDocSidebarItemsItem,
  ThemeDocSidebarItemsDocSidebarItemsProps,
  ThemeDocSidebarItemsDocSidebarItemsVisibleItems,
} from '../../types/theme/DocSidebarItems/index.d.ts';

/**
 * Theme - Doc Sidebar Items - Doc Sidebar Items.
 *
 * Filters sidebar items by visibility and maps each visible item to a
 * DocSidebarItem component, forwarding the active path and
 * nesting level without any expanded-state context.
 *
 * @param {ThemeDocSidebarItemsDocSidebarItemsProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarItems(props: ThemeDocSidebarItemsDocSidebarItemsProps) {
  const visibleItems: ThemeDocSidebarItemsDocSidebarItemsVisibleItems = useVisibleSidebarItems(props['items'], props['activePath']);

  return (
    <>
      {
        visibleItems.map((item: ThemeDocSidebarItemsDocSidebarItemsItem, index: ThemeDocSidebarItemsDocSidebarItemsIndex) => (
          <DocSidebarItem
            key={index}
            item={item}
            activePath={props['activePath']}
            level={props['level']}
            index={index}
          />
        ))
      }
    </>
  );
}

export default DocSidebarItems;
