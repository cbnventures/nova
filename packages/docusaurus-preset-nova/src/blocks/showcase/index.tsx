import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useId, useState } from 'react';

import type {
  Blocks_Showcase_Index_BlocksShowcase_Active,
  Blocks_Showcase_Index_BlocksShowcase_BaseId,
  Blocks_Showcase_Index_BlocksShowcase_Current,
  Blocks_Showcase_Index_BlocksShowcase_Props,
  Blocks_Showcase_Index_BlocksShowcase_Returns,
  Blocks_Showcase_Index_BlocksShowcase_SetActive,
  Blocks_Showcase_Index_BlocksShowcase_State,
} from '../../types/blocks/showcase/index.d.ts';

/**
 * Blocks - Showcase - Blocks Showcase.
 *
 * Shows one product view at a time (heading, description, link, and content
 * such as a framed screenshot) with a tab pill to switch views when there is
 * more than one, instead of one stacked section per screenshot.
 *
 * @param {Blocks_Showcase_Index_BlocksShowcase_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.43.0
 */
function BlocksShowcase(props: Blocks_Showcase_Index_BlocksShowcase_Props): Blocks_Showcase_Index_BlocksShowcase_Returns {
  const baseId: Blocks_Showcase_Index_BlocksShowcase_BaseId = useId();
  const state: Blocks_Showcase_Index_BlocksShowcase_State = useState<Blocks_Showcase_Index_BlocksShowcase_Active>(0);
  const active: Blocks_Showcase_Index_BlocksShowcase_Active = state[0];
  const setActive: Blocks_Showcase_Index_BlocksShowcase_SetActive = state[1];
  const current: Blocks_Showcase_Index_BlocksShowcase_Current = props['items'][active] ?? props['items'][0];

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-showcase ${props['className']}` : 'nova-showcase'}
      style={props['style']}
    >
      {(props['items'].length > 1) && (
        <div className="nova-showcase-tabs" role="tablist" aria-label={props['tabsLabel']}>
          {props['items'].map((item, index) => (
            <button
              key={item['label']}
              id={`${baseId}-tab-${String(index)}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={`${baseId}-panel`}
              className={(index === active) ? 'nova-showcase-tab nova-showcase-tab-active' : 'nova-showcase-tab'}
              onClick={() => {
                setActive(index);

                return;
              }}
            >
              {item['label']}
            </button>
          ))}
        </div>
      )}
      {(current !== undefined) && (
        <div
          id={`${baseId}-panel`}
          className="nova-showcase-panel"
          role={(props['items'].length > 1) ? 'tabpanel' : undefined}
          aria-labelledby={(props['items'].length > 1) ? `${baseId}-tab-${String(active)}` : undefined}
        >
          <Heading as="h3" className="nova-showcase-heading">{current['heading']}</Heading>
          {(current['description'] !== undefined) && (
            <p className="nova-section-description nova-showcase-description">{current['description']}</p>
          )}
          {(current['link'] !== undefined) && (
            <p className="nova-showcase-link">
              <Link to={current['link']['to']}>{current['link']['label']}</Link>
            </p>
          )}
          {current['content']}
        </div>
      )}
    </div>
  );
}

export default BlocksShowcase;
