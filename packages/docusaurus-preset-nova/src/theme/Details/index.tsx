import { Icon } from '@iconify/react/offline';
import {
  Children,
  isValidElement,
  useEffect,
  useState,
} from 'react';

import type {
  Theme_Details_Index_Details_Children,
  Theme_Details_Index_Details_ChildrenArray,
  Theme_Details_Index_Details_ExtractedSummary,
  Theme_Details_Index_Details_FilteredChildren,
  Theme_Details_Index_Details_IsOpen,
  Theme_Details_Index_Details_OnToggle,
  Theme_Details_Index_Details_Open,
  Theme_Details_Index_Details_Props,
  Theme_Details_Index_Details_Returns,
  Theme_Details_Index_Details_SetIsOpen,
  Theme_Details_Index_Details_State,
  Theme_Details_Index_Details_Summary,
} from '../../types/theme/Details/index.d.ts';

/**
 * Theme - Details.
 *
 * Custom collapsible details component with animated open/close
 * transition, a chevron rotation indicator, and border styling
 * from Nova CSS variables.
 *
 * @param {Theme_Details_Index_Details_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Details(props: Theme_Details_Index_Details_Props): Theme_Details_Index_Details_Returns {
  const summary: Theme_Details_Index_Details_Summary = props['summary'];
  const children: Theme_Details_Index_Details_Children = props['children'];
  const open: Theme_Details_Index_Details_Open = props['open'];
  const onToggle: Theme_Details_Index_Details_OnToggle = props['onToggle'] as Theme_Details_Index_Details_OnToggle;
  const state: Theme_Details_Index_Details_State = useState<Theme_Details_Index_Details_IsOpen>((open !== undefined) ? (open === true) : false);
  const isOpen: Theme_Details_Index_Details_IsOpen = state[0];
  const setIsOpen: Theme_Details_Index_Details_SetIsOpen = state[1];

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
  let extractedSummary: Theme_Details_Index_Details_ExtractedSummary = undefined;
  let filteredChildren: Theme_Details_Index_Details_FilteredChildren = children;

  if (summary === undefined) {
    const childrenArray: Theme_Details_Index_Details_ChildrenArray = Children.toArray(children);

    extractedSummary = childrenArray.find(
      (item) => isValidElement(item) === true && item['type'] === 'summary',
    ) as Theme_Details_Index_Details_ExtractedSummary;
    filteredChildren = <>{childrenArray.filter((item) => item !== extractedSummary)}</>;
  }

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-details ${props['className']}` : 'nova-details'}
      style={props['style']}
      data-open={isOpen}
    >
      <button
        className="nova-details-summary"
        type="button"
        onClick={() => {
          setIsOpen((previous: Theme_Details_Index_Details_IsOpen) => {
            const next: Theme_Details_Index_Details_IsOpen = (previous === false);

            if (onToggle !== undefined) {
              onToggle(next);
            }

            return next;
          });

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
