import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import { sidebarMobileSetOpen } from '../../lib/sidebar-mobile-store.js';

import type {
  Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbIndex,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbItem,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_Breadcrumbs,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_OpenAriaLabel,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_Props,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_Separator,
} from '../../types/theme/DocSidebarMobile/index.d.ts';

/**
 * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile.
 *
 * Renders a mobile-only trigger button showing the current sidebar
 * hierarchy path. Tapping it opens the shared overlay panel, which is
 * mounted separately from the persistent doc-root layout.
 *
 * @param {Theme_DocSidebarMobile_Index_DocSidebarMobile_Props} props - Props.
 *
 * @since 0.15.0
 */
function DocSidebarMobile(props: Theme_DocSidebarMobile_Index_DocSidebarMobile_Props) {
  const breadcrumbs: Theme_DocSidebarMobile_Index_DocSidebarMobile_Breadcrumbs = useSidebarBreadcrumbs();

  if (
    breadcrumbs === null
    || breadcrumbs === undefined
  ) {
    return null;
  }

  const openAriaLabel: Theme_DocSidebarMobile_Index_DocSidebarMobile_OpenAriaLabel = translate({
    id: 'theme.docs.sidebarMobile.openAriaLabel',
    message: 'Open docs navigation',
    description: 'The ARIA label for the button that opens the mobile docs sidebar',
  });

  const separator: Theme_DocSidebarMobile_Index_DocSidebarMobile_Separator = <Icon icon="lucide:chevron-right" width="12" height="12" aria-hidden="true" />;

  return (
    <button
      className={(props['className'] !== undefined) ? `nova-sidebar-mobile-trigger ${props['className']}` : 'nova-sidebar-mobile-trigger'}
      style={props['style']}
      type="button"
      onClick={() => {
        sidebarMobileSetOpen(true);

        return undefined;
      }}
      aria-label={openAriaLabel}
    >
      <Icon icon="lucide:list-tree" width="14" height="14" aria-hidden="true" />
      <span className="nova-sidebar-mobile-trigger-path">
        {breadcrumbs.map((item: Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbItem, index: Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbIndex) => (
          <span className="nova-sidebar-mobile-trigger-segment" key={index}>
            {(index > 0) && separator}
            {item['label']}
          </span>
        ))}
      </span>
      <Icon icon="lucide:chevron-down" width="14" height="14" aria-hidden="true" />
    </button>
  );
}

export default DocSidebarMobile;
