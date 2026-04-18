import Link from '@docusaurus/Link';
import { useDocsVersionCandidates } from '@docusaurus/plugin-content-docs/client';

import type {
  ThemeNavbarItemDocsVersionNavbarItemCandidates,
  ThemeNavbarItemDocsVersionNavbarItemLabel,
  ThemeNavbarItemDocsVersionNavbarItemMainDoc,
  ThemeNavbarItemDocsVersionNavbarItemPath,
  ThemeNavbarItemDocsVersionNavbarItemProps,
  ThemeNavbarItemDocsVersionNavbarItemVersion,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Docs Version Navbar Item - Docs Version Navbar Item.
 *
 * Renders a navigation link to the main document of the current
 * docs version resolved through the Docusaurus version candidates
 * hook, using static overrides when provided.
 *
 * @param {ThemeNavbarItemDocsVersionNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocsVersionNavbarItem(props: ThemeNavbarItemDocsVersionNavbarItemProps) {
  const candidates: ThemeNavbarItemDocsVersionNavbarItemCandidates = useDocsVersionCandidates(props['docsPluginId']);
  const version: ThemeNavbarItemDocsVersionNavbarItemVersion = candidates[0];
  const mainDoc: ThemeNavbarItemDocsVersionNavbarItemMainDoc = version['docs'].find(
    (doc) => doc['id'] === version['mainDocId'],
  );
  const label: ThemeNavbarItemDocsVersionNavbarItemLabel = props['label'] ?? version['label'];
  const path: ThemeNavbarItemDocsVersionNavbarItemPath = props['to'] ?? (mainDoc !== undefined ? mainDoc['path'] : version['path']);

  return (
    <Link to={path}>
      {label}
    </Link>
  );
}

export default DocsVersionNavbarItem;
