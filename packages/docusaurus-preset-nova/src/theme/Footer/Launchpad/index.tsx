import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import FooterCredit from '../credit.js';
import FooterCta from '../cta.js';

import type {
  Theme_Footer_Launchpad_Index_Launchpad_Copyright,
  Theme_Footer_Launchpad_Index_Launchpad_Credit,
  Theme_Footer_Launchpad_Index_Launchpad_Cta,
  Theme_Footer_Launchpad_Index_Launchpad_CtaContained,
  Theme_Footer_Launchpad_Index_Launchpad_ExternalLinkAriaLabel,
  Theme_Footer_Launchpad_Index_Launchpad_FooterClassName,
  Theme_Footer_Launchpad_Index_Launchpad_Layout,
  Theme_Footer_Launchpad_Index_Launchpad_LayoutEntries,
  Theme_Footer_Launchpad_Index_Launchpad_LayoutEntry,
  Theme_Footer_Launchpad_Index_Launchpad_Props,
  Theme_Footer_Launchpad_Index_Launchpad_Returns,
  Theme_Footer_Launchpad_Index_Launchpad_SectionLinks,
  Theme_Footer_Launchpad_Index_Launchpad_Sections,
  Theme_Footer_Launchpad_Index_Launchpad_SocialLinkLabel,
  Theme_Footer_Launchpad_Index_Launchpad_SocialLinks,
  Theme_Footer_Launchpad_Index_Launchpad_SocialLinksAriaLabel,
  Theme_Footer_Launchpad_Index_SectionLink,
  Theme_Footer_Launchpad_Index_SocialLink,
} from '../../../types/theme/Footer/Launchpad/index.d.ts';

/**
 * Theme - Footer - Launchpad.
 *
 * Action-oriented footer layout with a call-to-action block above
 * condensed link columns arranged by layout entries, social
 * media icons, and a legal bar with copyright.
 *
 * @param {Theme_Footer_Launchpad_Index_Launchpad_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Launchpad(props: Theme_Footer_Launchpad_Index_Launchpad_Props): Theme_Footer_Launchpad_Index_Launchpad_Returns {
  const sections: Theme_Footer_Launchpad_Index_Launchpad_Sections = props['sections'];
  const layout: Theme_Footer_Launchpad_Index_Launchpad_Layout = props['layout'];
  const socialLinks: Theme_Footer_Launchpad_Index_Launchpad_SocialLinks = props['socialLinks'];
  const copyright: Theme_Footer_Launchpad_Index_Launchpad_Copyright = props['copyright'];
  const credit: Theme_Footer_Launchpad_Index_Launchpad_Credit = props['credit'];
  const cta: Theme_Footer_Launchpad_Index_Launchpad_Cta = props['cta'];
  const ctaContained: Theme_Footer_Launchpad_Index_Launchpad_CtaContained = props['ctaContained'];
  const footerClassName: Theme_Footer_Launchpad_Index_Launchpad_FooterClassName = 'nova-footer-launchpad';
  const layoutEntries: Theme_Footer_Launchpad_Index_Launchpad_LayoutEntries = Object.entries(layout) as Theme_Footer_Launchpad_Index_Launchpad_LayoutEntries;
  const socialLinksAriaLabel: Theme_Footer_Launchpad_Index_Launchpad_SocialLinksAriaLabel = translate({
    id: 'theme.footer.socialLinksAriaLabel',
    message: 'Social media links',
    description: 'The ARIA label for the footer social media links section',
  });
  const externalLinkAriaLabel: Theme_Footer_Launchpad_Index_Launchpad_ExternalLinkAriaLabel = translate({
    id: 'theme.IconExternalLink.ariaLabel',
    message: '(opens in new tab)',
    description: 'The screen-reader label appended to external links that open in a new tab',
  });

  return (
    <>
      <FooterCta variant="launchpad" cta={cta} contained={ctaContained} />
      <footer className={footerClassName}>
        <div
          className={(props['className'] !== undefined) ? `nova-footer-launchpad-columns nova-container ${props['className']}` : 'nova-footer-launchpad-columns nova-container'}
          style={props['style']}
        >
          {
            layoutEntries.map((layoutEntry: Theme_Footer_Launchpad_Index_Launchpad_LayoutEntry) => {
              const sectionLinks: Theme_Footer_Launchpad_Index_Launchpad_SectionLinks = (sections[layoutEntry[1]['section']] ?? []) as Theme_Footer_Launchpad_Index_Launchpad_SectionLinks;

              return (
                <nav key={layoutEntry[0]} aria-label={layoutEntry[1]['title'] ?? layoutEntry[0]}>
                  {(layoutEntry[1]['title'] !== undefined) && (
                    <h3>
                      {layoutEntry[1]['title']}
                    </h3>
                  )}
                  <ul>
                    {
                      sectionLinks.map((sectionLink: Theme_Footer_Launchpad_Index_SectionLink) => (
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
          className={(props['className'] !== undefined) ? `nova-footer-launchpad-social nova-container ${props['className']}` : 'nova-footer-launchpad-social nova-container'}
          style={props['style']}
          aria-label={socialLinksAriaLabel}
        >
          {
            socialLinks.map((socialLink: Theme_Footer_Launchpad_Index_SocialLink) => {
              const socialLinkLabel: Theme_Footer_Launchpad_Index_Launchpad_SocialLinkLabel = `${socialLink['label']} ${externalLinkAriaLabel}`;

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
        <div className="nova-footer-launchpad-legal nova-container">
          <p dir="auto">
            {copyright}
          </p>
          {(credit === true) && <FooterCredit />}
        </div>
      </footer>
    </>
  );
}

export default Launchpad;
