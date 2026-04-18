import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import FooterCredit from '../credit.js';

import type {
  ThemeFooterEmbassyIndexEmbassyCopyright,
  ThemeFooterEmbassyIndexEmbassyCredit,
  ThemeFooterEmbassyIndexEmbassyFooterClassName,
  ThemeFooterEmbassyIndexEmbassyLayout,
  ThemeFooterEmbassyIndexEmbassyLayoutEntries,
  ThemeFooterEmbassyIndexEmbassyLayoutEntry,
  ThemeFooterEmbassyIndexEmbassyProps,
  ThemeFooterEmbassyIndexEmbassyReturns,
  ThemeFooterEmbassyIndexEmbassySectionLinks,
  ThemeFooterEmbassyIndexEmbassySections,
  ThemeFooterEmbassyIndexEmbassySocialLinks,
  ThemeFooterEmbassyIndexEmbassySocialLinksAriaLabel,
  ThemeFooterEmbassyIndexSectionLink,
  ThemeFooterEmbassyIndexSocialLink,
} from '../../../types/theme/Footer/Embassy/index.d.ts';

/**
 * Theme - Footer - Embassy.
 *
 * Formal directory-style footer layout with a logo and tagline
 * header, multi-column link sections arranged by layout entries,
 * and a legal bar with copyright and optional credit.
 *
 * @param {ThemeFooterEmbassyIndexEmbassyProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Embassy(props: ThemeFooterEmbassyIndexEmbassyProps): ThemeFooterEmbassyIndexEmbassyReturns {
  const sections: ThemeFooterEmbassyIndexEmbassySections = props['sections'];
  const layout: ThemeFooterEmbassyIndexEmbassyLayout = props['layout'];
  const socialLinks: ThemeFooterEmbassyIndexEmbassySocialLinks = props['socialLinks'];
  const copyright: ThemeFooterEmbassyIndexEmbassyCopyright = props['copyright'];
  const credit: ThemeFooterEmbassyIndexEmbassyCredit = props['credit'];
  const footerClassName: ThemeFooterEmbassyIndexEmbassyFooterClassName = 'nova-footer-embassy';
  const layoutEntries: ThemeFooterEmbassyIndexEmbassyLayoutEntries = Object.entries(layout) as ThemeFooterEmbassyIndexEmbassyLayoutEntries;
  const socialLinksAriaLabel: ThemeFooterEmbassyIndexEmbassySocialLinksAriaLabel = translate({
    id: 'theme.footer.socialLinksAriaLabel',
    message: 'Social media links',
    description: 'The ARIA label for the footer social media links section',
  });

  return (
    <footer className={footerClassName}>
      <div className="nova-footer-embassy-header nova-container">
        <div className="nova-footer-embassy-social" aria-label={socialLinksAriaLabel}>
          {
            socialLinks.map((socialLink: ThemeFooterEmbassyIndexSocialLink) => (
              <a
                key={socialLink['label']}
                href={socialLink['href']}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socialLink['label']}
              >
                <Icon icon={socialLink['icon']} width="20" height="20" aria-hidden="true" />
              </a>
            ))
          }
        </div>
      </div>
      <div className="nova-footer-embassy-directory nova-container">
        {
          layoutEntries.map((layoutEntry: ThemeFooterEmbassyIndexEmbassyLayoutEntry) => {
            const sectionLinks: ThemeFooterEmbassyIndexEmbassySectionLinks = (sections[layoutEntry[1]['section']] ?? []) as ThemeFooterEmbassyIndexEmbassySectionLinks;

            return (
              <nav key={layoutEntry[0]} aria-label={layoutEntry[1]['title'] ?? layoutEntry[0]}>
                {(layoutEntry[1]['title'] !== undefined) && (
                  <h3>
                    {layoutEntry[1]['title']}
                  </h3>
                )}
                <ul>
                  {
                    sectionLinks.map((sectionLink: ThemeFooterEmbassyIndexSectionLink) => (
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
      <div className="nova-footer-embassy-legal nova-container">
        <p>
          {copyright}
        </p>
        {(credit === true) && <FooterCredit />}
      </div>
    </footer>
  );
}

export default Embassy;
