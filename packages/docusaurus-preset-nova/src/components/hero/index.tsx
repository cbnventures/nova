import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import type { ComponentsHeroProps } from '../../types/components/hero/index.d.ts';

/**
 * Components - Hero.
 *
 * Full-width hero section with a large display heading, tagline text, and primary/secondary
 * call-to-action buttons over a configurable background variant.
 *
 * @param {ComponentsHeroProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ComponentsHero(props: ComponentsHeroProps) {
  return (
    <header className="nova-hero">
      {(props['surface'] === 'alt') ? (
        <div className="nova-surface-alt">
          <div className="nova-hero-inner nova-container">
            {(props['eyebrow'] !== undefined) && (
              <p className="nova-hero-eyebrow">
                {props['eyebrow']}
              </p>
            )}
            <Heading as="h1" className="nova-hero-heading">
              {props['heading']}
            </Heading>
            <p className="nova-hero-tagline">
              {props['tagline']}
            </p>
            <div className="nova-hero-actions">
              <Link className="nova-cta-primary" to={props['ctaLink']}>
                {props['ctaLabel']}
              </Link>
              {(
                props['secondaryCtaLabel'] !== undefined
                && props['secondaryCtaLink'] !== undefined
              ) && (
                <Link className="nova-cta-secondary" to={props['secondaryCtaLink']}>
                  {props['secondaryCtaLabel']}
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="nova-hero-inner nova-container">
          {(props['eyebrow'] !== undefined) && (
            <p className="nova-hero-eyebrow">
              {props['eyebrow']}
            </p>
          )}
          <Heading as="h1" className="nova-hero-heading">
            {props['heading']}
          </Heading>
          <p className="nova-hero-tagline">
            {props['tagline']}
          </p>
          <div className="nova-hero-actions">
            <Link className="nova-cta-primary" to={props['ctaLink']}>
              {props['ctaLabel']}
            </Link>
            {(
              props['secondaryCtaLabel'] !== undefined
              && props['secondaryCtaLink'] !== undefined
            ) && (
              <Link className="nova-cta-secondary" to={props['secondaryCtaLink']}>
                {props['secondaryCtaLabel']}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default ComponentsHero;
