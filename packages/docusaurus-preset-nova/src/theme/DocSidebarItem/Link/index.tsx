import Link from '@docusaurus/Link';

import { LIB_REGEX_TRAILING_SLASH } from '../../../lib/regex.js';

import type {
  Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_AriaCurrent,
  Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_IsActive,
  Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props,
} from '../../../types/theme/DocSidebarItem/Link/index.d.ts';

/**
 * Theme - Doc Sidebar Item - Link - Doc Sidebar Item Link.
 *
 * Renders a single sidebar link item as a plain list element containing
 * a Docusaurus Link component, setting aria-current when the link
 * matches the active page path.
 *
 * @param {Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarItemLink(props: Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props) {
  const isActive: Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_IsActive = props['activePath'].replace(LIB_REGEX_TRAILING_SLASH, '') === props['item']['href'].replace(LIB_REGEX_TRAILING_SLASH, '');
  const ariaCurrent: Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_AriaCurrent = (isActive === true) ? 'page' : undefined;

  return (
    <li
      className={(props['className'] !== undefined) ? `nova-sidebar-item ${props['className']}` : 'nova-sidebar-item'}
      style={props['style']}
    >
      <Link
        className="nova-sidebar-link"
        to={props['item']['href']}
        aria-current={ariaCurrent}
      >
        {props['item']['label']}
      </Link>
    </li>
  );
}

export default DocSidebarItemLink;
