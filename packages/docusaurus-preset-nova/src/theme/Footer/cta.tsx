import Link from '@docusaurus/Link';

import type {
  Theme_Footer_Cta_Contained,
  Theme_Footer_Cta_Cta,
  Theme_Footer_Cta_CtaClassName,
  Theme_Footer_Cta_Props,
  Theme_Footer_Cta_Returns,
  Theme_Footer_Cta_Variant,
  Theme_Footer_Cta_WrapperClassName,
} from '../../types/theme/Footer/cta.d.ts';

/**
 * Theme - Footer - Cta.
 *
 * Shared CTA rendered as a sibling to the footer, wrapped in a
 * `<div class="nova-footer-{variant}-cta-wrap">` (gains `nova-container` when
 * `cta.contained: true`). Renders `<aside>` or `<a>` based on `href`.
 *
 * @param {Theme_Footer_Cta_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function FooterCta(props: Theme_Footer_Cta_Props): Theme_Footer_Cta_Returns {
  const variant: Theme_Footer_Cta_Variant = props['variant'];
  const cta: Theme_Footer_Cta_Cta = props['cta'];
  const contained: Theme_Footer_Cta_Contained = props['contained'];

  if (cta === undefined) {
    return undefined;
  }

  const ctaClassName: Theme_Footer_Cta_CtaClassName = `nova-footer-${variant}-cta`;
  const wrapperClassName: Theme_Footer_Cta_WrapperClassName = (contained === true) ? `nova-footer-${variant}-cta-wrap nova-container` : `nova-footer-${variant}-cta-wrap`;

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
