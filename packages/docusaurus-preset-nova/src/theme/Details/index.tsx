import { Icon } from '@iconify/react/offline';
import {
  Children,
  isValidElement,
  useEffect,
  useState,
} from 'react';

import type {
  ThemeDetailsChildren,
  ThemeDetailsChildrenArray,
  ThemeDetailsExtractedSummary,
  ThemeDetailsFilteredChildren,
  ThemeDetailsIsOpen,
  ThemeDetailsOpen,
  ThemeDetailsProps,
  ThemeDetailsReturns,
  ThemeDetailsSetIsOpen,
  ThemeDetailsState,
  ThemeDetailsSummary,
} from '../../types/theme/Details/index.d.ts';

/**
 * Theme - Details.
 *
 * Custom collapsible details component with animated open/close
 * transition, a chevron rotation indicator, and border styling
 * from Nova CSS variables.
 *
 * @param {ThemeDetailsProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Details(props: ThemeDetailsProps): ThemeDetailsReturns {
  const summary: ThemeDetailsSummary = props['summary'];
  const children: ThemeDetailsChildren = props['children'];
  const open: ThemeDetailsOpen = props['open'];
  const state: ThemeDetailsState = useState<ThemeDetailsIsOpen>((open !== undefined) ? (open === false) : false);
  const isOpen: ThemeDetailsIsOpen = state[0];
  const setIsOpen: ThemeDetailsSetIsOpen = state[1];

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }

    return undefined;
  }, [
    open,
    setIsOpen,
  ]);

  // If summary is not provided as a prop, extract it from children.
  let extractedSummary: ThemeDetailsExtractedSummary = undefined;
  let filteredChildren: ThemeDetailsFilteredChildren = children;

  if (summary === undefined) {
    const childrenArray: ThemeDetailsChildrenArray = Children.toArray(children);

    extractedSummary = childrenArray.find(
      (item) => isValidElement(item) === true && item['type'] === 'summary',
    ) as ThemeDetailsExtractedSummary;
    filteredChildren = <>{childrenArray.filter((item) => item !== extractedSummary)}</>;
  }

  return (
    <div className="nova-details" data-open={isOpen}>
      <button
        className="nova-details-summary"
        type="button"
        onClick={() => {
          setIsOpen((previous: ThemeDetailsIsOpen) => (previous === false));

          return undefined;
        }}
        aria-expanded={isOpen}
      >
        <Icon
          className="nova-details-arrow"
          icon="lucide:chevron-right"
          width="16"
          height="16"
          aria-hidden="true"
        />
        <span className="nova-details-label">
          {(summary !== undefined) ? summary : extractedSummary}
        </span>
      </button>
      <div className="nova-details-content">
        <div className="nova-details-content-inner">
          <div className="nova-details-content-body">
            {(summary !== undefined) ? children : filteredChildren}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
