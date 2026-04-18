import Link from '@docusaurus/Link';
import {
  useActiveDocContext,
  useDocsVersionCandidates,
} from '@docusaurus/plugin-content-docs/client';

import type {
  ThemeNavbarItemDocsVersionDropdownNavbarItemActiveDocContext,
  ThemeNavbarItemDocsVersionDropdownNavbarItemCandidates,
  ThemeNavbarItemDocsVersionDropdownNavbarItemFirstItem,
  ThemeNavbarItemDocsVersionDropdownNavbarItemItems,
  ThemeNavbarItemDocsVersionDropdownNavbarItemLabel,
  ThemeNavbarItemDocsVersionDropdownNavbarItemPath,
  ThemeNavbarItemDocsVersionDropdownNavbarItemProps,
  ThemeNavbarItemDocsVersionDropdownNavbarItemTargetDoc,
  ThemeNavbarItemDocsVersionDropdownNavbarItemVersion,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Docs Version Dropdown Navbar Item - Docs Version Dropdown Navbar Item.
 *
 * Renders a dropdown menu listing all available documentation versions
 * resolved through the Docusaurus version candidates hook, falling back
 * to a single link when only one version exists.
 *
 * @param {ThemeNavbarItemDocsVersionDropdownNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocsVersionDropdownNavbarItem(props: ThemeNavbarItemDocsVersionDropdownNavbarItemProps) {
  const candidates: ThemeNavbarItemDocsVersionDropdownNavbarItemCandidates = useDocsVersionCandidates(props['docsPluginId']);
  const activeDocContext: ThemeNavbarItemDocsVersionDropdownNavbarItemActiveDocContext = useActiveDocContext(props['docsPluginId']);
  const version: ThemeNavbarItemDocsVersionDropdownNavbarItemVersion = candidates[0];
  const label: ThemeNavbarItemDocsVersionDropdownNavbarItemLabel = version['label'];
  const items: ThemeNavbarItemDocsVersionDropdownNavbarItemItems = candidates.map((candidate) => {
    const targetDoc: ThemeNavbarItemDocsVersionDropdownNavbarItemTargetDoc = activeDocContext['alternateDocVersions'][candidate['name']]
      ?? candidate['docs'].find((doc) => doc['id'] === candidate['mainDocId'])
      ?? candidate['docs'][0];
    const itemPath: ThemeNavbarItemDocsVersionDropdownNavbarItemPath = (targetDoc !== undefined) ? targetDoc['path'] : candidate['path'];

    return {
      label: candidate['label'],
      to: itemPath,
    };
  });

  // Render a single link when there is only one version.
  if (items.length <= 1) {
    const firstItem: ThemeNavbarItemDocsVersionDropdownNavbarItemFirstItem = items[0];
    const path: ThemeNavbarItemDocsVersionDropdownNavbarItemPath = (firstItem !== undefined) ? firstItem['to'] : version['path'];

    return (
      <Link to={path}>
        {label}
      </Link>
    );
  }

  return (
    <details>
      <summary>
        {label}
      </summary>
      <ul>
        {
          items.map((item) => (
            <li key={item['label']}>
              <Link to={item['to']}>
                {item['label']}
              </Link>
            </li>
          ))
        }
      </ul>
    </details>
  );
}

export default DocsVersionDropdownNavbarItem;
