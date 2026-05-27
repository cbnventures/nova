import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import FooterCredit from '../credit.js';
import FooterCta from '../cta.js';

import type {
  Theme_Footer_Commons_Index_Commons_Copyright,
  Theme_Footer_Commons_Index_Commons_Credit,
  Theme_Footer_Commons_Index_Commons_Cta,
  Theme_Footer_Commons_Index_Commons_CtaContained,
  Theme_Footer_Commons_Index_Commons_ExternalLinkAriaLabel,
  Theme_Footer_Commons_Index_Commons_FooterClassName,
  Theme_Footer_Commons_Index_Commons_Layout,
  Theme_Footer_Commons_Index_Commons_LayoutEntries,
  Theme_Footer_Commons_Index_Commons_LayoutEntry,
  Theme_Footer_Commons_Index_Commons_Props,
  Theme_Footer_Commons_Index_Commons_Returns,
  Theme_Footer_Commons_Index_Commons_SectionLinks,
  Theme_Footer_Commons_Index_Commons_Sections,
  Theme_Footer_Commons_Index_Commons_SocialLinkLabel,
  Theme_Footer_Commons_Index_Commons_SocialLinks,
  Theme_Footer_Commons_Index_Commons_SocialLinksAriaLabel,
  Theme_Footer_Commons_Index_SectionLink,
  Theme_Footer_Commons_Index_SocialLink,
} from '../../../types/theme/Footer/Commons/index.d.ts';

/**
 * Theme - Footer - Commons.
 *
 * Community-focused footer layout with section links arranged
 * by layout entries, social media icons, copyright notice,
 * and optional Nova credit attribution.
 *
 * @param {Theme_Footer_Commons_Index_Commons_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Commons(props: Theme_Footer_Commons_Index_Commons_Props): Theme_Footer_Commons_Index_Commons_Returns {
  const sections: Theme_Footer_Commons_Index_Commons_Sections = props['sections'];
  const layout: Theme_Footer_Commons_Index_Commons_Layout = props['layout'];
  const socialLinks: Theme_Footer_Commons_Index_Commons_SocialLinks = props['socialLinks'];
  const copyright: Theme_Footer_Commons_Index_Commons_Copyright = props['copyright'];
  const credit: Theme_Footer_Commons_Index_Commons_Credit = props['credit'];
  const cta: Theme_Footer_Commons_Index_Commons_Cta = props['cta'];
  const ctaContained: Theme_Footer_Commons_Index_Commons_CtaContained = props['ctaContained'];
  const footerClassName: Theme_Footer_Commons_Index_Commons_FooterClassName = 'nova-footer-commons';
  const layoutEntries: Theme_Footer_Commons_Index_Commons_LayoutEntries = Object.entries(layout) as Theme_Footer_Commons_Index_Commons_LayoutEntries;
  const socialLinksAriaLabel: Theme_Footer_Commons_Index_Commons_SocialLinksAriaLabel = translate({
    id: 'theme.footer.socialLinksAriaLabel',
    message: 'Social media links',
    description: 'The ARIA label for the footer social media links section',
  });
  const externalLinkAriaLabel: Theme_Footer_Commons_Index_Commons_ExternalLinkAriaLabel = translate({
    id: 'theme.IconExternalLink.ariaLabel',
    message: '(opens in new tab)',
    description: 'The screen-reader label appended to external links that open in a new tab',
  });

  return (
    <>
      <FooterCta variant="commons" cta={cta} contained={ctaContained} />
      <footer className={footerClassName}>
        <div
          className={(props['className'] !== undefined) ? `nova-footer-commons-sections nova-container ${props['className']}` : 'nova-footer-commons-sections nova-container'}
          style={props['style']}
        >
          {
            layoutEntries.map((layoutEntry: Theme_Footer_Commons_Index_Commons_LayoutEntry) => {
              const sectionLinks: Theme_Footer_Commons_Index_Commons_SectionLinks = (sections[layoutEntry[1]['section']] ?? []) as Theme_Footer_Commons_Index_Commons_SectionLinks;

              return (
                <nav key={layoutEntry[0]} aria-label={layoutEntry[1]['title'] ?? layoutEntry[0]}>
                  {(layoutEntry[1]['title'] !== undefined) && (
                    <h3>
                      {layoutEntry[1]['title']}
                    </h3>
                  )}
                  <ul>
                    {
                      sectionLinks.map((sectionLink: Theme_Footer_Commons_Index_SectionLink) => (
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
          className={(props['className'] !== undefined) ? `nova-footer-commons-social nova-container ${props['className']}` : 'nova-footer-commons-social nova-container'}
          style={props['style']}
          aria-label={socialLinksAriaLabel}
        >
          {
            socialLinks.map((socialLink: Theme_Footer_Commons_Index_SocialLink) => {
              const socialLinkLabel: Theme_Footer_Commons_Index_Commons_SocialLinkLabel = `${socialLink['label']} ${externalLinkAriaLabel}`;

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
        <div className="nova-footer-commons-legal nova-container">
          <p dir="auto">
            {copyright}
          </p>
          {(credit === true) && <FooterCredit />}
        </div>
      </footer>
    </>
  );
}

export default Commons;
