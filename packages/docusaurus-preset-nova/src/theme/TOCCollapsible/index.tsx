import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { useLayoutEffect } from 'react';

import { tocCollapsibleSetOpen, tocCollapsibleSetPayload } from '../../lib/toc-collapsible-store.js';
import { filterToc, treeifyToc } from '../../lib/toc.js';

import type {
  Theme_TocCollapsible_Index_TocCollapsibleItems,
  Theme_TocCollapsible_Index_TocCollapsibleMaxHeadingLevel,
  Theme_TocCollapsible_Index_TocCollapsibleMinHeadingLevel,
  Theme_TocCollapsible_Index_TocCollapsibleOpenAriaLabel,
  Theme_TocCollapsible_Index_TocCollapsibleProps,
  Theme_TocCollapsible_Index_TocCollapsibleTreeItems,
  Theme_TocCollapsible_Index_TocCollapsibleTriggerLabel,
} from '../../types/theme/TOCCollapsible/index.d.ts';

/**
 * Theme - Toc Collapsible - Toc Collapsible.
 *
 * Renders a mobile-only trigger button that publishes the current
 * page's table-of-contents payload into the shared store and opens
 * the persistent overlay panel, mounted separately from this trigger.
 *
 * @param {Theme_TocCollapsible_Index_TocCollapsibleProps} props - Props.
 *
 * @since 0.15.0
 */
function TOCCollapsible(props: Theme_TocCollapsible_Index_TocCollapsibleProps) {
  const items: Theme_TocCollapsible_Index_TocCollapsibleItems = props['toc'];
  const minHeadingLevel: Theme_TocCollapsible_Index_TocCollapsibleMinHeadingLevel = (props['minHeadingLevel'] !== undefined) ? props['minHeadingLevel'] : 2;
  const maxHeadingLevel: Theme_TocCollapsible_Index_TocCollapsibleMaxHeadingLevel = (props['maxHeadingLevel'] !== undefined) ? props['maxHeadingLevel'] : 3;

  const openAriaLabel: Theme_TocCollapsible_Index_TocCollapsibleOpenAriaLabel = translate({
    id: 'theme.TOCCollapsible.openAriaLabel',
    message: 'Open table of contents',
    description: 'The ARIA label for the button that opens the table of contents overlay',
  });
  const triggerLabel: Theme_TocCollapsible_Index_TocCollapsibleTriggerLabel = translate({
    id: 'theme.TOCCollapsible.toggleButtonLabel',
    message: 'Table of Contents',
    description: 'The label for the table of contents trigger button and header title',
  });

  const treeItems: Theme_TocCollapsible_Index_TocCollapsibleTreeItems = (items === undefined) ? [] : filterToc(treeifyToc(items), minHeadingLevel, maxHeadingLevel);

  // Publish this page's toc payload before paint so the persistent panel
  // host renders the active page's headings after navigation.
  useLayoutEffect(() => {
    if (treeItems['length'] === 0) {
      tocCollapsibleSetPayload(undefined);

      return undefined;
    }

    tocCollapsibleSetPayload({ treeItems });

    return undefined;
  }, [treeItems]);

  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  if (treeItems['length'] === 0) {
    return undefined;
  }

  return (
    <button
      className={(props['className'] !== undefined) ? `nova-toc-collapsible-trigger ${props['className']}` : 'nova-toc-collapsible-trigger'}
      style={props['style']}
      type="button"
      onClick={() => {
        tocCollapsibleSetOpen(true);

        return undefined;
      }}
      aria-label={openAriaLabel}
    >
      <Icon icon="lucide:list" width="14" height="14" aria-hidden="true" />
      <span className="nova-toc-collapsible-trigger-label">{triggerLabel}</span>
      <Icon icon="lucide:chevron-down" width="14" height="14" aria-hidden="true" />
    </button>
  );
}

export default TOCCollapsible;
