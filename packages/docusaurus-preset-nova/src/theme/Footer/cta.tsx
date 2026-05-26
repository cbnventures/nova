import Link from '@docusaurus/Link';

import type {
  ThemeFooterCtaContained,
  ThemeFooterCtaCta,
  ThemeFooterCtaCtaClassName,
  ThemeFooterCtaProps,
  ThemeFooterCtaReturns,
  ThemeFooterCtaVariant,
  ThemeFooterCtaWrapperClassName,
} from '../../types/theme/Footer/cta.d.ts';

/**
 * Theme - Footer - Cta.
 *
 * Shared CTA rendered as a sibling to the footer, wrapped in a
 * `<div class="nova-footer-{variant}-cta-wrap">` (gains `nova-container` when
 * `cta.contained: true`). Renders `<aside>` or `<a>` based on `href`.
 *
 * @param {ThemeFooterCtaProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function FooterCta(props: ThemeFooterCtaProps): ThemeFooterCtaReturns {
  const variant: ThemeFooterCtaVariant = props['variant'];
  const cta: ThemeFooterCtaCta = props['cta'];
  const contained: ThemeFooterCtaContained = props['contained'];

  if (cta === undefined) {
    return undefined;
  }

  const ctaClassName: ThemeFooterCtaCtaClassName = `nova-footer-${variant}-cta`;
  const wrapperClassName: ThemeFooterCtaWrapperClassName = (contained === true) ? `nova-footer-${variant}-cta-wrap nova-container` : `nova-footer-${variant}-cta-wrap`;

  return (
    <div className={wrapperClassName}>
      {(typeof cta === 'string') ? (
        <aside className={ctaClassName}>
          <p>
            {cta}
          </p>
        </aside>
      ) : (
        <Link to={cta['href']} className={ctaClassName}>
          <p>
            {cta['label']}
          </p>
        </Link>
      )}
    </div>
  );
}

export default FooterCta;
