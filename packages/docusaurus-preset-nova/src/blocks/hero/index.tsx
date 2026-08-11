import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import type {
  Blocks_Hero_Index_BlocksHero_InnerContent,
  Blocks_Hero_Index_BlocksHero_Props,
} from '../../types/blocks/hero/index.d.ts';

/**
 * Blocks - Hero.
 *
 * Full-width hero section with a large display heading, tagline text, and primary/secondary
 * call-to-action buttons over a configurable background variant.
 *
 * @param {Blocks_Hero_Index_BlocksHero_Props} props - Props.
 *
 * @since 0.15.0
 */
function BlocksHero(props: Blocks_Hero_Index_BlocksHero_Props) {
  const innerContent: Blocks_Hero_Index_BlocksHero_InnerContent = (
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
  );

  return (
    <header
      className={(props['className'] !== undefined) ? `nova-hero ${props['className']}` : 'nova-hero'}
      style={props['style']}
    >
      {(props['surface'] === 'alt')
        ? <div className="nova-surface-alt">{innerContent}</div>
        : innerContent}
    </header>
  );
}

export default BlocksHero;
