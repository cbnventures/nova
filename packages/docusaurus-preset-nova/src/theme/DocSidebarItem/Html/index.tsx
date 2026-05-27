import type {
  Theme_DocSidebarItem_Html_Index_DocSidebarItemHtml_Props,
  Theme_DocSidebarItem_Html_Index_DocSidebarItemHtml_Value,
} from '../../../types/theme/DocSidebarItem/Html/index.d.ts';

/**
 * Theme - Doc Sidebar Item - HTML - Doc Sidebar Item HTML.
 *
 * Renders a sidebar item containing raw HTML using dangerouslySetInnerHTML,
 * replicating the theme-classic behavior with plain semantic
 * markup and no framework-specific styling.
 *
 * @param {Theme_DocSidebarItem_Html_Index_DocSidebarItemHtml_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarItemHtml(props: Theme_DocSidebarItem_Html_Index_DocSidebarItemHtml_Props) {
  const value: Theme_DocSidebarItem_Html_Index_DocSidebarItemHtml_Value = props['item']['value'];

  return (
    <li
      className={(props['className'] !== undefined) ? `nova-sidebar-item nova-sidebar-item-html ${props['className']}` : 'nova-sidebar-item nova-sidebar-item-html'}
      style={props['style']}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

export default DocSidebarItemHtml;
