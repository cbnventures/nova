import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import FooterCredit from '../credit.js';
import FooterCta from '../cta.js';

import type {
  ThemeFooterCommonsIndexCommonsCopyright,
  ThemeFooterCommonsIndexCommonsCredit,
  ThemeFooterCommonsIndexCommonsCta,
  ThemeFooterCommonsIndexCommonsCtaContained,
  ThemeFooterCommonsIndexCommonsExternalLinkAriaLabel,
  ThemeFooterCommonsIndexCommonsFooterClassName,
  ThemeFooterCommonsIndexCommonsLayout,
  ThemeFooterCommonsIndexCommonsLayoutEntries,
  ThemeFooterCommonsIndexCommonsLayoutEntry,
  ThemeFooterCommonsIndexCommonsProps,
  ThemeFooterCommonsIndexCommonsReturns,
  ThemeFooterCommonsIndexCommonsSectionLinks,
  ThemeFooterCommonsIndexCommonsSections,
  ThemeFooterCommonsIndexCommonsSocialLinkLabel,
  ThemeFooterCommonsIndexCommonsSocialLinks,
  ThemeFooterCommonsIndexCommonsSocialLinksAriaLabel,
  ThemeFooterCommonsIndexSectionLink,
  ThemeFooterCommonsIndexSocialLink,
} from '../../../types/theme/Footer/Commons/index.d.ts';

/**
 * Theme - Footer - Commons.
 *
 * Community-focused footer layout with section links arranged
 * by layout entries, social media icons, copyright notice,
 * and optional Nova credit attribution.
 *
 * @param {ThemeFooterCommonsIndexCommonsProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Commons(props: ThemeFooterCommonsIndexCommonsProps): ThemeFooterCommonsIndexCommonsReturns {
  const sections: ThemeFooterCommonsIndexCommonsSections = props['sections'];
  const layout: ThemeFooterCommonsIndexCommonsLayout = props['layout'];
  const socialLinks: ThemeFooterCommonsIndexCommonsSocialLinks = props['socialLinks'];
  const copyright: ThemeFooterCommonsIndexCommonsCopyright = props['copyright'];
  const credit: ThemeFooterCommonsIndexCommonsCredit = props['credit'];
  const cta: ThemeFooterCommonsIndexCommonsCta = props['cta'];
  const ctaContained: ThemeFooterCommonsIndexCommonsCtaContained = props['ctaContained'];
  const footerClassName: ThemeFooterCommonsIndexCommonsFooterClassName = 'nova-footer-commons';
  const layoutEntries: ThemeFooterCommonsIndexCommonsLayoutEntries = Object.entries(layout) as ThemeFooterCommonsIndexCommonsLayoutEntries;
  const socialLinksAriaLabel: ThemeFooterCommonsIndexCommonsSocialLinksAriaLabel = translate({
    id: 'theme.footer.socialLinksAriaLabel',
    message: 'Social media links',
    description: 'The ARIA label for the footer social media links section',
  });
  const externalLinkAriaLabel: ThemeFooterCommonsIndexCommonsExternalLinkAriaLabel = translate({
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
            layoutEntries.map((layoutEntry: ThemeFooterCommonsIndexCommonsLayoutEntry) => {
              const sectionLinks: ThemeFooterCommonsIndexCommonsSectionLinks = (sections[layoutEntry[1]['section']] ?? []) as ThemeFooterCommonsIndexCommonsSectionLinks;

              return (
                <nav key={layoutEntry[0]} aria-label={layoutEntry[1]['title'] ?? layoutEntry[0]}>
                  {(layoutEntry[1]['title'] !== undefined) && (
                    <h3>
                      {layoutEntry[1]['title']}
                    </h3>
                  )}
                  <ul>
                    {
                      sectionLinks.map((sectionLink: ThemeFooterCommonsIndexSectionLink) => (
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
            socialLinks.map((socialLink: ThemeFooterCommonsIndexSocialLink) => {
              const socialLinkLabel: ThemeFooterCommonsIndexCommonsSocialLinkLabel = `${socialLink['label']} ${externalLinkAriaLabel}`;

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
