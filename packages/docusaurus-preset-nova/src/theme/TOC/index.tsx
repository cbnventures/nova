import { translate } from '@docusaurus/Translate';

import { filterToc, treeifyToc } from '../../lib/toc.js';

import type {
  Theme_Toc_Index_Items,
  Theme_Toc_Index_ListItem,
  Theme_Toc_Index_ListItems,
  Theme_Toc_Index_MaxHeadingLevel,
  Theme_Toc_Index_MinHeadingLevel,
  Theme_Toc_Index_Props,
  Theme_Toc_Index_TocAriaLabel,
  Theme_Toc_Index_TreeItems,
} from '../../types/theme/TOC/index.d.ts';

/**
 * Theme - Toc - List.
 *
 * Recursively renders a nested unordered list of
 * table-of-contents items, linking each heading by its anchor
 * identifier and nesting child items.
 *
 * @param {Theme_Toc_Index_ListItems} items - Items.
 *
 * @returns {JSX.Element | undefined}
 *
 * @since 0.15.0
 */
function TocList(items: Theme_Toc_Index_ListItems) {
  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  return (
    <ul className="nova-toc-list">
      {
        items.map((item: Theme_Toc_Index_ListItem) => (
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
 * @param {Theme_Toc_Index_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function TOC(props: Theme_Toc_Index_Props) {
  const items: Theme_Toc_Index_Items = props['toc'];
  const minHeadingLevel: Theme_Toc_Index_MinHeadingLevel = (props['minHeadingLevel'] !== undefined) ? props['minHeadingLevel'] : 2;
  const maxHeadingLevel: Theme_Toc_Index_MaxHeadingLevel = (props['maxHeadingLevel'] !== undefined) ? props['maxHeadingLevel'] : 3;
  const ariaLabel: Theme_Toc_Index_TocAriaLabel = translate({
    id: 'theme.TOC.ariaLabel',
    message: 'Table of contents',
    description: 'The ARIA label for the table of contents navigation',
  });

  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  const treeItems: Theme_Toc_Index_TreeItems = filterToc(treeifyToc(items), minHeadingLevel, maxHeadingLevel);

  if (treeItems['length'] === 0) {
    return undefined;
  }

  return (
    <nav
      className={(props['className'] !== undefined) ? `nova-toc ${props['className']}` : 'nova-toc'}
      style={props['style']}
      aria-label={ariaLabel}
    >
      {TocList(treeItems)}
    </nav>
  );
}

export default TOC;
