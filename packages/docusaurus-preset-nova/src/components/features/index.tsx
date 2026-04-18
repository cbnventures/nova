import { Icon } from '@iconify/react/offline';
import Heading from '@theme/Heading';

import type { ComponentsFeaturesProps } from '../../types/components/features/index.d.ts';

/**
 * Components - Features.
 *
 * Responsive feature grid section that renders icon cards in a
 * one-to-three column layout with stagger reveal animation and
 * shadow depth from Nova CSS variables.
 *
 * @param {ComponentsFeaturesProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ComponentsFeatures(props: ComponentsFeaturesProps) {
  return (
    <section className="nova-features">
      {(props['surface'] === 'alt') ? (
        <div className="nova-surface-alt">
          <div className="nova-features-inner nova-container">
            {(props['heading'] !== undefined) && (
              <Heading as="h2" className="nova-features-heading">
                {props['heading']}
              </Heading>
            )}
            <div className="nova-features-grid nova-grid">
              {
                props['items'].map((featureItem) => (
                  <div className="nova-feature-card nova-col-12 nova-col-md-4" key={featureItem['title']}>
                    {(featureItem['icon'] !== undefined) && (
                      <div className="nova-feature-card-icon">
                        <Icon icon={featureItem['icon']} width="28" height="28" aria-hidden="true" />
                      </div>
                    )}
                    <Heading as="h3" className="nova-feature-card-title">
                      {featureItem['title']}
                    </Heading>
                    <p className="nova-feature-card-description">
                      {featureItem['description']}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="nova-features-inner nova-container">
          {(props['heading'] !== undefined) && (
            <Heading as="h2" className="nova-features-heading">
              {props['heading']}
            </Heading>
          )}
          <div className="nova-features-grid nova-grid">
            {
              props['items'].map((featureItem) => (
                <div className="nova-feature-card nova-col-12 nova-col-md-4" key={featureItem['title']}>
                  {(featureItem['icon'] !== undefined) && (
                    <div className="nova-feature-card-icon">
                      <Icon icon={featureItem['icon']} width="28" height="28" aria-hidden="true" />
                    </div>
                  )}
                  <Heading as="h3" className="nova-feature-card-title">
                    {featureItem['title']}
                  </Heading>
                  <p className="nova-feature-card-description">
                    {featureItem['description']}
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

export default ComponentsFeatures;
