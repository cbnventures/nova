import Heading from '@theme/Heading';

import type { Blocks_Spotlight_Index_BlocksSpotlight_Props } from '../../types/blocks/spotlight/index.d.ts';

/**
 * Blocks - Spotlight.
 *
 * Narrow single-column section that constrains freeform content to a
 * readable width with a heading for focused content blocks like code
 * snippets, diagrams, or prose passages between wider sections.
 *
 * @param {Blocks_Spotlight_Index_BlocksSpotlight_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksSpotlight(props: Blocks_Spotlight_Index_BlocksSpotlight_Props) {
  return (
    <section
      className={(props['className'] !== undefined) ? `nova-spotlight ${props['className']}` : 'nova-spotlight'}
      style={props['style']}
    >
      {(props['surface'] === 'alt') ? (
        <div className="nova-surface-alt">
          <div className="nova-spotlight-inner nova-container">
            <Heading as="h2" className="nova-spotlight-heading">
              {props['heading']}
            </Heading>
            {props['children']}
          </div>
        </div>
      ) : (
        <div className="nova-spotlight-inner nova-container">
          <Heading as="h2" className="nova-spotlight-heading">
            {props['heading']}
          </Heading>
          {props['children']}
        </div>
      )}
    </section>
  );
}

export default BlocksSpotlight;
