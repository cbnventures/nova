import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import FooterCredit from '../credit.js';
import FooterCta from '../cta.js';

import type {
  Theme_Footer_Embassy_Index_Embassy_Copyright,
  Theme_Footer_Embassy_Index_Embassy_Credit,
  Theme_Footer_Embassy_Index_Embassy_Cta,
  Theme_Footer_Embassy_Index_Embassy_CtaContained,
  Theme_Footer_Embassy_Index_Embassy_ExternalLinkAriaLabel,
  Theme_Footer_Embassy_Index_Embassy_FooterClassName,
  Theme_Footer_Embassy_Index_Embassy_Layout,
  Theme_Footer_Embassy_Index_Embassy_LayoutEntries,
  Theme_Footer_Embassy_Index_Embassy_LayoutEntry,
  Theme_Footer_Embassy_Index_Embassy_Props,
  Theme_Footer_Embassy_Index_Embassy_Returns,
  Theme_Footer_Embassy_Index_Embassy_SectionLinks,
  Theme_Footer_Embassy_Index_Embassy_Sections,
  Theme_Footer_Embassy_Index_Embassy_SocialLinkLabel,
  Theme_Footer_Embassy_Index_Embassy_SocialLinks,
  Theme_Footer_Embassy_Index_Embassy_SocialLinksAriaLabel,
  Theme_Footer_Embassy_Index_SectionLink,
  Theme_Footer_Embassy_Index_SocialLink,
} from '../../../types/theme/Footer/Embassy/index.d.ts';

/**
 * Theme - Footer - Embassy.
 *
 * Formal directory-style footer layout with a logo and tagline
 * header, multi-column link sections arranged by layout entries,
 * and a legal bar with copyright and optional credit.
 *
 * @param {Theme_Footer_Embassy_Index_Embassy_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Embassy(props: Theme_Footer_Embassy_Index_Embassy_Props): Theme_Footer_Embassy_Index_Embassy_Returns {
  const sections: Theme_Footer_Embassy_Index_Embassy_Sections = props['sections'];
  const layout: Theme_Footer_Embassy_Index_Embassy_Layout = props['layout'];
  const socialLinks: Theme_Footer_Embassy_Index_Embassy_SocialLinks = props['socialLinks'];
  const copyright: Theme_Footer_Embassy_Index_Embassy_Copyright = props['copyright'];
  const credit: Theme_Footer_Embassy_Index_Embassy_Credit = props['credit'];
  const cta: Theme_Footer_Embassy_Index_Embassy_Cta = props['cta'];
  const ctaContained: Theme_Footer_Embassy_Index_Embassy_CtaContained = props['ctaContained'];
  const footerClassName: Theme_Footer_Embassy_Index_Embassy_FooterClassName = 'nova-footer-embassy';
  const layoutEntries: Theme_Footer_Embassy_Index_Embassy_LayoutEntries = Object.entries(layout) as Theme_Footer_Embassy_Index_Embassy_LayoutEntries;
  const socialLinksAriaLabel: Theme_Footer_Embassy_Index_Embassy_SocialLinksAriaLabel = translate({
    id: 'theme.footer.socialLinksAriaLabel',
    message: 'Social media links',
    description: 'The ARIA label for the footer social media links section',
  });
  const externalLinkAriaLabel: Theme_Footer_Embassy_Index_Embassy_ExternalLinkAriaLabel = translate({
    id: 'theme.IconExternalLink.ariaLabel',
    message: '(opens in new tab)',
    description: 'The screen-reader label appended to external links that open in a new tab',
  });

  return (
    <>
      <FooterCta variant="embassy" cta={cta} contained={ctaContained} />
      <footer className={footerClassName}>
        <div
          className={(props['className'] !== undefined) ? `nova-footer-embassy-header nova-container ${props['className']}` : 'nova-footer-embassy-header nova-container'}
          style={props['style']}
        >
          <div className="nova-footer-embassy-social" aria-label={socialLinksAriaLabel}>
            {
              socialLinks.map((socialLink: Theme_Footer_Embassy_Index_SocialLink) => {
                const socialLinkLabel: Theme_Footer_Embassy_Index_Embassy_SocialLinkLabel = `${socialLink['label']} ${externalLinkAriaLabel}`;

                return (
                  <a
                    key={socialLink['label']}
                    href={socialLink['href']}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLinkLabel}
                  >
                    <Icon icon={socialLink['icon']} width="20" height="20" aria-hidden="true" />
                  </a>
                );
              })
            }
          </div>
        </div>
        <div className="nova-footer-embassy-directory nova-container">
          {
            layoutEntries.map((layoutEntry: Theme_Footer_Embassy_Index_Embassy_LayoutEntry) => {
              const sectionLinks: Theme_Footer_Embassy_Index_Embassy_SectionLinks = (sections[layoutEntry[1]['section']] ?? []) as Theme_Footer_Embassy_Index_Embassy_SectionLinks;

              return (
                <nav key={layoutEntry[0]} aria-label={layoutEntry[1]['title'] ?? layoutEntry[0]}>
                  {(layoutEntry[1]['title'] !== undefined) && (
                    <h3>
                      {layoutEntry[1]['title']}
                    </h3>
                  )}
                  <ul>
                    {
                      sectionLinks.map((sectionLink: Theme_Footer_Embassy_Index_SectionLink) => (
                        <li key={sectionLink['label']}>
                          <Link to={sectionLink['href']}>
                            {sectionLink['label']}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </nav>
              );
            })
          }
        </div>
        <div
          className={(props['className'] !== undefined) ? `nova-footer-embassy-legal nova-container ${props['className']}` : 'nova-footer-embassy-legal nova-container'}
          style={props['style']}
        >
          <p dir="auto">
            {copyright}
          </p>
          {(credit === true) && <FooterCredit />}
        </div>
      </footer>
    </>
  );
}

export default Embassy;
