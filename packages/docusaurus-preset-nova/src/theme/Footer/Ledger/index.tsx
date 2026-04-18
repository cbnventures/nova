import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import FooterCredit from '../credit.js';

import type {
  ThemeFooterLedgerIndexLedgerCopyright,
  ThemeFooterLedgerIndexLedgerCredit,
  ThemeFooterLedgerIndexLedgerFirstLayoutSlot,
  ThemeFooterLedgerIndexLedgerFirstSectionKey,
  ThemeFooterLedgerIndexLedgerFirstSectionLinks,
  ThemeFooterLedgerIndexLedgerFooterClassName,
  ThemeFooterLedgerIndexLedgerFooterLinksAriaLabel,
  ThemeFooterLedgerIndexLedgerLayout,
  ThemeFooterLedgerIndexLedgerProps,
  ThemeFooterLedgerIndexLedgerReturns,
  ThemeFooterLedgerIndexLedgerSections,
  ThemeFooterLedgerIndexLedgerSocialLinks,
  ThemeFooterLedgerIndexLedgerSocialLinksAriaLabel,
  ThemeFooterLedgerIndexSectionLink,
  ThemeFooterLedgerIndexSocialLink,
} from '../../../types/theme/Footer/Ledger/index.d.ts';

/**
 * Theme - Footer - Ledger.
 *
 * Minimal single-bar footer layout with copyright text, a small
 * set of links drawn from the first available section, and
 * optional inline social media icons.
 *
 * @param {ThemeFooterLedgerIndexLedgerProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Ledger(props: ThemeFooterLedgerIndexLedgerProps): ThemeFooterLedgerIndexLedgerReturns {
  const sections: ThemeFooterLedgerIndexLedgerSections = props['sections'];
  const layout: ThemeFooterLedgerIndexLedgerLayout = props['layout'];
  const socialLinks: ThemeFooterLedgerIndexLedgerSocialLinks = props['socialLinks'];
  const copyright: ThemeFooterLedgerIndexLedgerCopyright = props['copyright'];
  const credit: ThemeFooterLedgerIndexLedgerCredit = props['credit'];
  const footerClassName: ThemeFooterLedgerIndexLedgerFooterClassName = 'nova-footer-ledger';

  const footerLinksAriaLabel: ThemeFooterLedgerIndexLedgerFooterLinksAriaLabel = translate({
    id: 'theme.footer.footerLinksAriaLabel',
    message: 'Footer links',
    description: 'The ARIA label for the footer navigation links section',
  });
  const socialLinksAriaLabel: ThemeFooterLedgerIndexLedgerSocialLinksAriaLabel = translate({
    id: 'theme.footer.socialLinksAriaLabel',
    message: 'Social media links',
    description: 'The ARIA label for the footer social media links section',
  });

  // Use the first layout entry to pick which section to show.
  const firstLayoutSlot: ThemeFooterLedgerIndexLedgerFirstLayoutSlot = Object.values(layout)[0];
  const firstSectionKey: ThemeFooterLedgerIndexLedgerFirstSectionKey = (firstLayoutSlot !== undefined) ? firstLayoutSlot['section'] : undefined;
  let firstSectionLinks: ThemeFooterLedgerIndexLedgerFirstSectionLinks = [];

  if (firstSectionKey !== undefined) {
    firstSectionLinks = (sections[firstSectionKey] ?? []) as ThemeFooterLedgerIndexLedgerFirstSectionLinks;
  }

  return (
    <footer className={footerClassName}>
      <div className="nova-footer-ledger-bar nova-container">
        <p>
          {copyright}
        </p>
        <nav className="nova-footer-ledger-links" aria-label={footerLinksAriaLabel}>
          <ul>
            {
              firstSectionLinks.map((sectionLink: ThemeFooterLedgerIndexSectionLink) => (
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
            socialLinks.map((socialLink: ThemeFooterLedgerIndexSocialLink) => (
              <a
                key={socialLink['label']}
                href={socialLink['href']}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socialLink['label']}
              >
                <Icon icon={socialLink['icon']} width="16" height="16" aria-hidden="true" />
              </a>
            ))
          }
        </div>
        {(credit === true) && <FooterCredit />}
      </div>
    </footer>
  );
}

export default Ledger;
