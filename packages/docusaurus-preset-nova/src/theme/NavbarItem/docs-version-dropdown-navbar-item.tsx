import Link from '@docusaurus/Link';
import {
  useActiveDocContext,
  useVersions,
} from '@docusaurus/plugin-content-docs/client';
import { useRef } from 'react';

import { useDetailsDismiss } from '../../lib/use-details-dismiss.js';

import type {
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_ActiveDocContext,
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_ActiveVersion,
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_DetailsRef,
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_FirstItem,
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_ItemClassName,
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_Items,
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_Label,
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_Path,
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_Props,
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_TargetDoc,
  Theme_NavbarItem_DocsVersionDropdownNavbarItem_Versions,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Docs Version Dropdown Navbar Item - Docs Version Dropdown Navbar Item.
 *
 * Renders a dropdown listing all documentation versions, falling back to a
 * single link when only one exists. Active version reflects the current docs
 * page context (or first configured version) and gets a `--active` modifier.
 *
 * @param {Theme_NavbarItem_DocsVersionDropdownNavbarItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocsVersionDropdownNavbarItem(props: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Props) {
  const versions: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Versions = useVersions(props['docsPluginId']);
  const activeDocContext: Theme_NavbarItem_DocsVersionDropdownNavbarItem_ActiveDocContext = useActiveDocContext(props['docsPluginId']);

  const detailsRef: Theme_NavbarItem_DocsVersionDropdownNavbarItem_DetailsRef = useRef<HTMLDetailsElement | null>(null);

  useDetailsDismiss(detailsRef);

  if (versions.length === 0) {
    return undefined;
  }

  const activeVersion: Theme_NavbarItem_DocsVersionDropdownNavbarItem_ActiveVersion = activeDocContext['activeVersion'] ?? versions[0];
  const label: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Label = (activeVersion !== undefined) ? activeVersion['label'] : versions[0]!['label'];
  const items: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Items = versions.map((version) => {
    const targetDoc: Theme_NavbarItem_DocsVersionDropdownNavbarItem_TargetDoc = activeDocContext['alternateDocVersions'][version['name']]
      ?? version['docs'].find((doc) => doc['id'] === version['mainDocId'])
      ?? version['docs'][0];
    const itemPath: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Path = (targetDoc !== undefined) ? targetDoc['path'] : version['path'];

    return {
      label: version['label'],
      to: itemPath,
      versionName: version['name'],
    };
  });

  // Render a single link when there is only one version.
  if (versions.length === 1) {
    const firstItem: Theme_NavbarItem_DocsVersionDropdownNavbarItem_FirstItem = items[0];
    const path: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Path = (firstItem !== undefined) ? firstItem['to'] : versions[0]!['path'];

    return (
      <Link to={path}>
        {label}
      </Link>
    );
  }

  return (
    <details ref={detailsRef} className="nova-version-dropdown">
      <summary className="nova-version-dropdown-summary">
        {label}
      </summary>
      <ul className="nova-version-dropdown-menu">
        {
          items.map((item) => {
            const itemClassName: Theme_NavbarItem_DocsVersionDropdownNavbarItem_ItemClassName = (activeVersion !== undefined && item['versionName'] === activeVersion['name']) ? 'nova-version-dropdown-item nova-version-dropdown-item--active' : 'nova-version-dropdown-item';

            return (
              <li key={item['label']} className={itemClassName}>
                <Link className="nova-version-dropdown-item-link" to={item['to']}>
                  {item['label']}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </details>
  );
}

export default DocsVersionDropdownNavbarItem;
