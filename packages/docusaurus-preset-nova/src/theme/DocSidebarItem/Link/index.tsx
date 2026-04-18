import Link from '@docusaurus/Link';

import { LIB_REGEX_TRAILING_SLASH } from '../../../lib/regex.js';

import type {
  ThemeDocSidebarItemLinkDocSidebarItemLinkAriaCurrent,
  ThemeDocSidebarItemLinkDocSidebarItemLinkIsActive,
  ThemeDocSidebarItemLinkDocSidebarItemLinkProps,
} from '../../../types/theme/DocSidebarItem/Link/index.d.ts';

/**
 * Theme - Doc Sidebar Item - Link - Doc Sidebar Item Link.
 *
 * Renders a single sidebar link item as a plain list element containing
 * a Docusaurus Link component, setting aria-current when the link
 * matches the active page path.
 *
 * @param {ThemeDocSidebarItemLinkDocSidebarItemLinkProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarItemLink(props: ThemeDocSidebarItemLinkDocSidebarItemLinkProps) {
  const isActive: ThemeDocSidebarItemLinkDocSidebarItemLinkIsActive = props['activePath'].replace(LIB_REGEX_TRAILING_SLASH, '') === props['item']['href'].replace(LIB_REGEX_TRAILING_SLASH, '');
  const ariaCurrent: ThemeDocSidebarItemLinkDocSidebarItemLinkAriaCurrent = (isActive === true) ? 'page' : undefined;

  return (
    <li className="nova-sidebar-item">
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
