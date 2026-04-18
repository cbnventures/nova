import DocSidebarItemCategory from '@theme/DocSidebarItem/Category';
import DocSidebarItemHtml from '@theme/DocSidebarItem/Html';
import DocSidebarItemLink from '@theme/DocSidebarItem/Link';

import type { ThemeDocSidebarItemDocSidebarItemProps } from '../../types/theme/DocSidebarItem/index.d.ts';

/**
 * Theme - Doc Sidebar Item - Doc Sidebar Item.
 *
 * Routes a sidebar item to the correct sub-component based on the item type,
 * delegating to category, html, or link renderers with forwarded
 * active path and nesting level.
 *
 * @param {ThemeDocSidebarItemDocSidebarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarItem(props: ThemeDocSidebarItemDocSidebarItemProps) {
  switch (props['item']['type']) {
    case 'category': {
      return (
        <DocSidebarItemCategory
          item={props['item']}
          activePath={props['activePath']}
          level={props['level']}
          index={0}
        />
      );
    }

    case 'html': {
      return (
        <DocSidebarItemHtml
          item={props['item']}
          activePath={props['activePath']}
          level={props['level']}
          index={0}
        />
      );
    }

    default: {
      return (
        <DocSidebarItemLink
          item={props['item']}
          activePath={props['activePath']}
          level={props['level']}
          index={0}
        />
      );
    }
  }
}

export default DocSidebarItem;
