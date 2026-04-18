import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import FooterCredit from '../credit.js';

import type {
  ThemeFooterCommonsIndexCommonsCopyright,
  ThemeFooterCommonsIndexCommonsCredit,
  ThemeFooterCommonsIndexCommonsFooterClassName,
  ThemeFooterCommonsIndexCommonsLayout,
  ThemeFooterCommonsIndexCommonsLayoutEntries,
  ThemeFooterCommonsIndexCommonsLayoutEntry,
  ThemeFooterCommonsIndexCommonsProps,
  ThemeFooterCommonsIndexCommonsReturns,
  ThemeFooterCommonsIndexCommonsSectionLinks,
  ThemeFooterCommonsIndexCommonsSections,
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
  const footerClassName: ThemeFooterCommonsIndexCommonsFooterClassName = 'nova-footer-commons';
  const layoutEntries: ThemeFooterCommonsIndexCommonsLayoutEntries = Object.entries(layout) as ThemeFooterCommonsIndexCommonsLayoutEntries;
  const socialLinksAriaLabel: ThemeFooterCommonsIndexCommonsSocialLinksAriaLabel = translate({
    id: 'theme.footer.socialLinksAriaLabel',
    message: 'Social media links',
    description: 'The ARIA label for the footer social media links section',
  });

  return (
    <footer className={footerClassName}>
      <div className="nova-footer-commons-sections nova-container">
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
      <div className="nova-footer-commons-social nova-container" aria-label={socialLinksAriaLabel}>
        {
          socialLinks.map((socialLink: ThemeFooterCommonsIndexSocialLink) => (
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
      <div className="nova-footer-commons-legal nova-container">
        <p>
          {copyright}
        </p>
        {(credit === true) && <FooterCredit />}
      </div>
    </footer>
  );
}

export default Commons;
