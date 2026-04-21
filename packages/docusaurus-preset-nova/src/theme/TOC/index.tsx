import { translate } from '@docusaurus/Translate';

import { filterToc, treeifyToc } from '../../lib/toc.js';

import type {
  ThemeTocItems,
  ThemeTocListItem,
  ThemeTocListItems,
  ThemeTocMaxHeadingLevel,
  ThemeTocMinHeadingLevel,
  ThemeTocProps,
  ThemeTocTocAriaLabel,
  ThemeTocTreeItems,
} from '../../types/theme/TOC/index.d.ts';

/**
 * Theme - Toc - List.
 *
 * Recursively renders a nested unordered list of
 * table-of-contents items, linking each heading by its anchor
 * identifier and nesting child items.
 *
 * @param {ThemeTocListItems} items - Items.
 *
 * @returns {JSX.Element | undefined}
 *
 * @since 0.15.0
 */
function TocList(items: ThemeTocListItems) {
  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  return (
    <ul className="nova-toc-list">
      {
        items.map((item: ThemeTocListItem) => (
          <li className="nova-toc-item" key={item['id']}>
            <a className="nova-toc-link" href={`#${item['id']}`} dangerouslySetInnerHTML={{ __html: item['value'] }} />
            {TocList(item['children'])}
          </li>
        ))
      }
    </ul>
  );
}

/**
 * Theme - Toc.
 *
 * Renders a navigation landmark containing a
 * recursive table of contents built from heading items,
 * providing in-page anchor links.
 *
 * @param {ThemeTocProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function TOC(props: ThemeTocProps) {
  const items: ThemeTocItems = props['toc'];
  const minHeadingLevel: ThemeTocMinHeadingLevel = (props['minHeadingLevel'] !== undefined) ? props['minHeadingLevel'] : 2;
  const maxHeadingLevel: ThemeTocMaxHeadingLevel = (props['maxHeadingLevel'] !== undefined) ? props['maxHeadingLevel'] : 3;
  const ariaLabel: ThemeTocTocAriaLabel = translate({
    id: 'theme.TOC.ariaLabel',
    message: 'Table of contents',
    description: 'The ARIA label for the table of contents navigation',
  });

  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  const treeItems: ThemeTocTreeItems = filterToc(treeifyToc(items), minHeadingLevel, maxHeadingLevel);

  if (treeItems['length'] === 0) {
    return undefined;
  }

  return (
    <nav className="nova-toc" aria-label={ariaLabel}>
      {TocList(treeItems)}
    </nav>
  );
}

export default TOC;
