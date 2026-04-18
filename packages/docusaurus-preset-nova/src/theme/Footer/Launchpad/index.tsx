import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import FooterCredit from '../credit.js';

import type {
  ThemeFooterLaunchpadIndexLaunchpadCopyright,
  ThemeFooterLaunchpadIndexLaunchpadCredit,
  ThemeFooterLaunchpadIndexLaunchpadCta,
  ThemeFooterLaunchpadIndexLaunchpadFooterClassName,
  ThemeFooterLaunchpadIndexLaunchpadLayout,
  ThemeFooterLaunchpadIndexLaunchpadLayoutEntries,
  ThemeFooterLaunchpadIndexLaunchpadLayoutEntry,
  ThemeFooterLaunchpadIndexLaunchpadProps,
  ThemeFooterLaunchpadIndexLaunchpadReturns,
  ThemeFooterLaunchpadIndexLaunchpadSectionLinks,
  ThemeFooterLaunchpadIndexLaunchpadSections,
  ThemeFooterLaunchpadIndexLaunchpadSocialLinks,
  ThemeFooterLaunchpadIndexLaunchpadSocialLinksAriaLabel,
  ThemeFooterLaunchpadIndexSectionLink,
  ThemeFooterLaunchpadIndexSocialLink,
} from '../../../types/theme/Footer/Launchpad/index.d.ts';

/**
 * Theme - Footer - Launchpad.
 *
 * Action-oriented footer layout with a call-to-action block above
 * condensed link columns arranged by layout entries, social
 * media icons, and a legal bar with copyright.
 *
 * @param {ThemeFooterLaunchpadIndexLaunchpadProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Launchpad(props: ThemeFooterLaunchpadIndexLaunchpadProps): ThemeFooterLaunchpadIndexLaunchpadReturns {
  const sections: ThemeFooterLaunchpadIndexLaunchpadSections = props['sections'];
  const layout: ThemeFooterLaunchpadIndexLaunchpadLayout = props['layout'];
  const socialLinks: ThemeFooterLaunchpadIndexLaunchpadSocialLinks = props['socialLinks'];
  const copyright: ThemeFooterLaunchpadIndexLaunchpadCopyright = props['copyright'];
  const credit: ThemeFooterLaunchpadIndexLaunchpadCredit = props['credit'];
  const cta: ThemeFooterLaunchpadIndexLaunchpadCta = props['cta'];
  const footerClassName: ThemeFooterLaunchpadIndexLaunchpadFooterClassName = 'nova-footer-launchpad';
  const layoutEntries: ThemeFooterLaunchpadIndexLaunchpadLayoutEntries = Object.entries(layout) as ThemeFooterLaunchpadIndexLaunchpadLayoutEntries;
  const socialLinksAriaLabel: ThemeFooterLaunchpadIndexLaunchpadSocialLinksAriaLabel = translate({
    id: 'theme.footer.socialLinksAriaLabel',
    message: 'Social media links',
    description: 'The ARIA label for the footer social media links section',
  });

  return (
    <footer className={footerClassName}>
      {(cta !== undefined) && (
        <div className="nova-footer-launchpad-cta">
          <p>
            {cta}
          </p>
        </div>
      )}
      <div className="nova-footer-launchpad-columns nova-container">
        {
          layoutEntries.map((layoutEntry: ThemeFooterLaunchpadIndexLaunchpadLayoutEntry) => {
            const sectionLinks: ThemeFooterLaunchpadIndexLaunchpadSectionLinks = (sections[layoutEntry[1]['section']] ?? []) as ThemeFooterLaunchpadIndexLaunchpadSectionLinks;

            return (
              <nav key={layoutEntry[0]} aria-label={layoutEntry[1]['title'] ?? layoutEntry[0]}>
                {(layoutEntry[1]['title'] !== undefined) && (
                  <h3>
                    {layoutEntry[1]['title']}
                  </h3>
                )}
                <ul>
                  {
                    sectionLinks.map((sectionLink: ThemeFooterLaunchpadIndexSectionLink) => (
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
      <div className="nova-footer-launchpad-social nova-container" aria-label={socialLinksAriaLabel}>
        {
          socialLinks.map((socialLink: ThemeFooterLaunchpadIndexSocialLink) => (
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
      <div className="nova-footer-launchpad-legal nova-container">
        <p>
          {copyright}
        </p>
        {(credit === true) && <FooterCredit />}
      </div>
    </footer>
  );
}

export default Launchpad;
