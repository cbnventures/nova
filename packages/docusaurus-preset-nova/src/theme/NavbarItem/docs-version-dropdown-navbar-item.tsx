import Link from '@docusaurus/Link';
import {
  useActiveDocContext,
  useVersions,
} from '@docusaurus/plugin-content-docs/client';
import { useRef } from 'react';

import { useDetailsDismiss } from '../../lib/use-details-dismiss.js';

import type {
  ThemeNavbarItemDocsVersionDropdownNavbarItemActiveDocContext,
  ThemeNavbarItemDocsVersionDropdownNavbarItemActiveVersion,
  ThemeNavbarItemDocsVersionDropdownNavbarItemDetailsRef,
  ThemeNavbarItemDocsVersionDropdownNavbarItemFirstItem,
  ThemeNavbarItemDocsVersionDropdownNavbarItemItemClassName,
  ThemeNavbarItemDocsVersionDropdownNavbarItemItems,
  ThemeNavbarItemDocsVersionDropdownNavbarItemLabel,
  ThemeNavbarItemDocsVersionDropdownNavbarItemPath,
  ThemeNavbarItemDocsVersionDropdownNavbarItemProps,
  ThemeNavbarItemDocsVersionDropdownNavbarItemTargetDoc,
  ThemeNavbarItemDocsVersionDropdownNavbarItemVersions,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Docs Version Dropdown Navbar Item - Docs Version Dropdown Navbar Item.
 *
 * Renders a dropdown listing all documentation versions, falling back to a
 * single link when only one exists. Active version reflects the current docs
 * page context (or first configured version) and gets a `--active` modifier.
 *
 * @param {ThemeNavbarItemDocsVersionDropdownNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocsVersionDropdownNavbarItem(props: ThemeNavbarItemDocsVersionDropdownNavbarItemProps) {
  const versions: ThemeNavbarItemDocsVersionDropdownNavbarItemVersions = useVersions(props['docsPluginId']);
  const activeDocContext: ThemeNavbarItemDocsVersionDropdownNavbarItemActiveDocContext = useActiveDocContext(props['docsPluginId']);

  const detailsRef: ThemeNavbarItemDocsVersionDropdownNavbarItemDetailsRef = useRef<HTMLDetailsElement | null>(null);

  useDetailsDismiss(detailsRef);

  if (versions.length === 0) {
    return undefined;
  }

  const activeVersion: ThemeNavbarItemDocsVersionDropdownNavbarItemActiveVersion = activeDocContext['activeVersion'] ?? versions[0];
  const label: ThemeNavbarItemDocsVersionDropdownNavbarItemLabel = (activeVersion !== undefined) ? activeVersion['label'] : versions[0]!['label'];
  const items: ThemeNavbarItemDocsVersionDropdownNavbarItemItems = versions.map((version) => {
    const targetDoc: ThemeNavbarItemDocsVersionDropdownNavbarItemTargetDoc = activeDocContext['alternateDocVersions'][version['name']]
      ?? version['docs'].find((doc) => doc['id'] === version['mainDocId'])
      ?? version['docs'][0];
    const itemPath: ThemeNavbarItemDocsVersionDropdownNavbarItemPath = (targetDoc !== undefined) ? targetDoc['path'] : version['path'];

    return {
      label: version['label'],
      to: itemPath,
      versionName: version['name'],
    };
  });

  // Render a single link when there is only one version.
  if (versions.length === 1) {
    const firstItem: ThemeNavbarItemDocsVersionDropdownNavbarItemFirstItem = items[0];
    const path: ThemeNavbarItemDocsVersionDropdownNavbarItemPath = (firstItem !== undefined) ? firstItem['to'] : versions[0]!['path'];

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
            const itemClassName: ThemeNavbarItemDocsVersionDropdownNavbarItemItemClassName = (activeVersion !== undefined && item['versionName'] === activeVersion['name']) ? 'nova-version-dropdown-item nova-version-dropdown-item--active' : 'nova-version-dropdown-item';

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
