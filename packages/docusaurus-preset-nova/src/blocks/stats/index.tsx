import Heading from '@theme/Heading';

import type { BlocksStatsProps } from '../../types/blocks/stats/index.d.ts';

/**
 * Blocks - Stats.
 *
 * Numeric highlight grid that displays key metrics as large values
 * with descriptive labels in a responsive two-to-four column layout
 * with optional heading and description above the grid.
 *
 * @param {BlocksStatsProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksStats(props: BlocksStatsProps) {
  return (
    <section
      className={(props['className'] !== undefined) ? `nova-stats ${props['className']}` : 'nova-stats'}
      style={props['style']}
    >
      {(props['surface'] === 'alt') ? (
        <div className="nova-surface-alt">
          <div className="nova-stats-inner nova-container">
            {(props['heading'] !== undefined) && (
              <Heading as="h2" className="nova-stats-heading">
                {props['heading']}
              </Heading>
            )}
            {(props['description'] !== undefined) && (
              <p className="nova-stats-description">
                {props['description']}
              </p>
            )}
            <div className="nova-stats-grid nova-grid">
              {
                props['items'].map((statsItem) => (
                  <div className="nova-stat nova-col-6 nova-col-sm-3" key={statsItem['value']}>
                    <p
                      className={[
                        'nova-stat-value',
                        ...(statsItem['color'] === 'primary') ? ['nova-stat-primary'] : [],
                        ...(statsItem['color'] === 'accent') ? ['nova-stat-accent'] : [],
                      ].join(' ')}
                    >
                      {statsItem['value']}
                    </p>
                    <p className="nova-stat-label">
                      {statsItem['label']}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="nova-stats-inner nova-container">
          {(props['heading'] !== undefined) && (
            <Heading as="h2" className="nova-stats-heading">
              {props['heading']}
            </Heading>
          )}
          {(props['description'] !== undefined) && (
            <p className="nova-stats-description">
              {props['description']}
            </p>
          )}
          <div className="nova-stats-grid nova-grid">
            {
              props['items'].map((statsItem) => (
                <div className="nova-stat nova-col-6 nova-col-sm-3" key={statsItem['value']}>
                  <p
                    className={[
                      'nova-stat-value',
                      ...(statsItem['color'] === 'primary') ? ['nova-stat-primary'] : [],
                      ...(statsItem['color'] === 'accent') ? ['nova-stat-accent'] : [],
                    ].join(' ')}
                  >
                    {statsItem['value']}
                  </p>
                  <p className="nova-stat-label">
                    {statsItem['label']}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </section>
  );
}

export default BlocksStats;
