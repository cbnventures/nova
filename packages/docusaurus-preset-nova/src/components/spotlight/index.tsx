import Heading from '@theme/Heading';

import type { ComponentsSpotlightProps } from '../../types/components/spotlight/index.d.ts';

/**
 * Components - Spotlight.
 *
 * Narrow single-column section that constrains freeform content to a
 * readable width with a heading for focused content blocks like code
 * snippets, diagrams, or prose passages between wider sections.
 *
 * @param {ComponentsSpotlightProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ComponentsSpotlight(props: ComponentsSpotlightProps) {
  return (
    <section className="nova-spotlight">
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

export default ComponentsSpotlight;
