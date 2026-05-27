import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import FooterCredit from '../credit.js';
import FooterCta from '../cta.js';

import type {
  Theme_Footer_Ledger_Index_Ledger_Copyright,
  Theme_Footer_Ledger_Index_Ledger_Credit,
  Theme_Footer_Ledger_Index_Ledger_Cta,
  Theme_Footer_Ledger_Index_Ledger_CtaContained,
  Theme_Footer_Ledger_Index_Ledger_ExternalLinkAriaLabel,
  Theme_Footer_Ledger_Index_Ledger_FirstLayoutSlot,
  Theme_Footer_Ledger_Index_Ledger_FirstSectionKey,
  Theme_Footer_Ledger_Index_Ledger_FirstSectionLinks,
  Theme_Footer_Ledger_Index_Ledger_FooterClassName,
  Theme_Footer_Ledger_Index_Ledger_FooterLinksAriaLabel,
  Theme_Footer_Ledger_Index_Ledger_Layout,
  Theme_Footer_Ledger_Index_Ledger_Props,
  Theme_Footer_Ledger_Index_Ledger_Returns,
  Theme_Footer_Ledger_Index_Ledger_Sections,
  Theme_Footer_Ledger_Index_Ledger_SocialLinkLabel,
  Theme_Footer_Ledger_Index_Ledger_SocialLinks,
  Theme_Footer_Ledger_Index_Ledger_SocialLinksAriaLabel,
  Theme_Footer_Ledger_Index_SectionLink,
  Theme_Footer_Ledger_Index_SocialLink,
} from '../../../types/theme/Footer/Ledger/index.d.ts';

/**
 * Theme - Footer - Ledger.
 *
 * Minimal single-bar footer layout with copyright text, a small
 * set of links drawn from the first available section, and
 * optional inline social media icons.
 *
 * @param {Theme_Footer_Ledger_Index_Ledger_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Ledger(props: Theme_Footer_Ledger_Index_Ledger_Props): Theme_Footer_Ledger_Index_Ledger_Returns {
  const sections: Theme_Footer_Ledger_Index_Ledger_Sections = props['sections'];
  const layout: Theme_Footer_Ledger_Index_Ledger_Layout = props['layout'];
  const socialLinks: Theme_Footer_Ledger_Index_Ledger_SocialLinks = props['socialLinks'];
  const copyright: Theme_Footer_Ledger_Index_Ledger_Copyright = props['copyright'];
  const credit: Theme_Footer_Ledger_Index_Ledger_Credit = props['credit'];
  const cta: Theme_Footer_Ledger_Index_Ledger_Cta = props['cta'];
  const ctaContained: Theme_Footer_Ledger_Index_Ledger_CtaContained = props['ctaContained'];
  const footerClassName: Theme_Footer_Ledger_Index_Ledger_FooterClassName = 'nova-footer-ledger';

  const footerLinksAriaLabel: Theme_Footer_Ledger_Index_Ledger_FooterLinksAriaLabel = translate({
    id: 'theme.footer.footerLinksAriaLabel',
    message: 'Footer links',
    description: 'The ARIA label for the footer navigation links section',
  });
  const socialLinksAriaLabel: Theme_Footer_Ledger_Index_Ledger_SocialLinksAriaLabel = translate({
    id: 'theme.footer.socialLinksAriaLabel',
    message: 'Social media links',
    description: 'The ARIA label for the footer social media links section',
  });
  const externalLinkAriaLabel: Theme_Footer_Ledger_Index_Ledger_ExternalLinkAriaLabel = translate({
    id: 'theme.IconExternalLink.ariaLabel',
    message: '(opens in new tab)',
    description: 'The screen-reader label appended to external links that open in a new tab',
  });

  // Use the first layout entry to pick which section to show.
  const firstLayoutSlot: Theme_Footer_Ledger_Index_Ledger_FirstLayoutSlot = Object.values(layout)[0];
  const firstSectionKey: Theme_Footer_Ledger_Index_Ledger_FirstSectionKey = (firstLayoutSlot !== undefined) ? firstLayoutSlot['section'] : undefined;
  let firstSectionLinks: Theme_Footer_Ledger_Index_Ledger_FirstSectionLinks = [];

  if (firstSectionKey !== undefined) {
    firstSectionLinks = (sections[firstSectionKey] ?? []) as Theme_Footer_Ledger_Index_Ledger_FirstSectionLinks;
  }

  return (
    <>
      <FooterCta variant="ledger" cta={cta} contained={ctaContained} />
      <footer className={footerClassName}>
        <div
          className={(props['className'] !== undefined) ? `nova-footer-ledger-bar nova-container ${props['className']}` : 'nova-footer-ledger-bar nova-container'}
          style={props['style']}
        >
          <p dir="auto">
            {copyright}
          </p>
          <nav className="nova-footer-ledger-links" aria-label={footerLinksAriaLabel}>
            <ul>
              {
                firstSectionLinks.map((sectionLink: Theme_Footer_Ledger_Index_SectionLink) => (
                  <li key={sectionLink['label']}>
                    <Link to={sectionLink['href']}>
                      {sectionLink['label']}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </nav>
          <div className="nova-footer-ledger-social" aria-label={socialLinksAriaLabel}>
            {
              socialLinks.map((socialLink: Theme_Footer_Ledger_Index_SocialLink) => {
                const socialLinkLabel: Theme_Footer_Ledger_Index_Ledger_SocialLinkLabel = `${socialLink['label']} ${externalLinkAriaLabel}`;

                return (
                  <a
                    key={socialLink['label']}
                    href={socialLink['href']}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLinkLabel}
                  >
                    <Icon icon={socialLink['icon']} width="16" height="16" aria-hidden="true" />
                  </a>
                );
              })
            }
          </div>
          {(credit === true) && <FooterCredit />}
        </div>
      </footer>
    </>
  );
}

export default Ledger;
