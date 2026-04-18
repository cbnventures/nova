import type {
  ThemeDocSidebarItemHtmlDocSidebarItemHtmlProps,
  ThemeDocSidebarItemHtmlDocSidebarItemHtmlValue,
} from '../../../types/theme/DocSidebarItem/Html/index.d.ts';

/**
 * Theme - Doc Sidebar Item - HTML - Doc Sidebar Item HTML.
 *
 * Renders a sidebar item containing raw HTML using dangerouslySetInnerHTML,
 * replicating the theme-classic behavior with plain semantic
 * markup and no framework-specific styling.
 *
 * @param {ThemeDocSidebarItemHtmlDocSidebarItemHtmlProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarItemHtml(props: ThemeDocSidebarItemHtmlDocSidebarItemHtmlProps) {
  const value: ThemeDocSidebarItemHtmlDocSidebarItemHtmlValue = props['item']['value'];

  return (
    <li
      className="nova-sidebar-item nova-sidebar-item-html"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

export default DocSidebarItemHtml;
