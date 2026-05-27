import Link from '@docusaurus/Link';
import { useDocsVersionCandidates } from '@docusaurus/plugin-content-docs/client';

import type {
  Theme_NavbarItem_DocsVersionNavbarItem_Candidates,
  Theme_NavbarItem_DocsVersionNavbarItem_Label,
  Theme_NavbarItem_DocsVersionNavbarItem_MainDoc,
  Theme_NavbarItem_DocsVersionNavbarItem_Path,
  Theme_NavbarItem_DocsVersionNavbarItem_Props,
  Theme_NavbarItem_DocsVersionNavbarItem_Version,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Docs Version Navbar Item - Docs Version Navbar Item.
 *
 * Renders a navigation link to the main document of the current
 * docs version resolved through the Docusaurus version candidates
 * hook, using static overrides when provided.
 *
 * @param {Theme_NavbarItem_DocsVersionNavbarItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocsVersionNavbarItem(props: Theme_NavbarItem_DocsVersionNavbarItem_Props) {
  const candidates: Theme_NavbarItem_DocsVersionNavbarItem_Candidates = useDocsVersionCandidates(props['docsPluginId']);
  const version: Theme_NavbarItem_DocsVersionNavbarItem_Version = candidates[0];
  const mainDoc: Theme_NavbarItem_DocsVersionNavbarItem_MainDoc = version['docs'].find(
    (doc) => doc['id'] === version['mainDocId'],
  );
  const label: Theme_NavbarItem_DocsVersionNavbarItem_Label = props['label'] ?? version['label'];
  const path: Theme_NavbarItem_DocsVersionNavbarItem_Path = props['to'] ?? (mainDoc !== undefined ? mainDoc['path'] : version['path']);

  return (
    <Link to={path}>
      {label}
    </Link>
  );
}

export default DocsVersionNavbarItem;
