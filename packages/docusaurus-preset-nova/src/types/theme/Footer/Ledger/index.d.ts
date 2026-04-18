import type { IconifyIcon } from '@iconify/react/offline';

/**
 * Theme - Footer - Ledger.
 *
 * @since 0.15.0
 */
export type ThemeFooterLedgerIndexSection = ThemeFooterLedgerIndexSectionLink[];

export type ThemeFooterLedgerIndexSections = Record<string, ThemeFooterLedgerIndexSection>;

export type ThemeFooterLedgerIndexLayoutSlotTitle = string | undefined;

export type ThemeFooterLedgerIndexLayoutSlotSection = string;

export type ThemeFooterLedgerIndexLayoutSlot = {
  title?: ThemeFooterLedgerIndexLayoutSlotTitle;
  section: ThemeFooterLedgerIndexLayoutSlotSection;
};

export type ThemeFooterLedgerIndexLayout = Record<string, ThemeFooterLedgerIndexLayoutSlot>;

export type ThemeFooterLedgerIndexSocialLinks = ThemeFooterLedgerIndexSocialLink[];

export type ThemeFooterLedgerIndexCopyright = string;

export type ThemeFooterLedgerIndexCredit = boolean;

export type ThemeFooterLedgerIndexLedgerPropsSections = ThemeFooterLedgerIndexSections;

export type ThemeFooterLedgerIndexLedgerPropsLayout = ThemeFooterLedgerIndexLayout;

export type ThemeFooterLedgerIndexLedgerPropsSocialLinks = ThemeFooterLedgerIndexSocialLinks;

export type ThemeFooterLedgerIndexLedgerPropsCopyright = ThemeFooterLedgerIndexCopyright;

export type ThemeFooterLedgerIndexLedgerPropsCredit = ThemeFooterLedgerIndexCredit;

export type ThemeFooterLedgerIndexLedgerProps = {
  sections: ThemeFooterLedgerIndexLedgerPropsSections;
  layout: ThemeFooterLedgerIndexLedgerPropsLayout;
  socialLinks: ThemeFooterLedgerIndexLedgerPropsSocialLinks;
  copyright: ThemeFooterLedgerIndexLedgerPropsCopyright;
  credit: ThemeFooterLedgerIndexLedgerPropsCredit;
};

export type ThemeFooterLedgerIndexLedgerReturns = React.JSX.Element;

export type ThemeFooterLedgerIndexLedgerSections = ThemeFooterLedgerIndexSections;

export type ThemeFooterLedgerIndexLedgerLayout = ThemeFooterLedgerIndexLayout;

export type ThemeFooterLedgerIndexLedgerSocialLinks = ThemeFooterLedgerIndexSocialLinks;

export type ThemeFooterLedgerIndexLedgerCopyright = ThemeFooterLedgerIndexCopyright;

export type ThemeFooterLedgerIndexLedgerCredit = ThemeFooterLedgerIndexCredit;

export type ThemeFooterLedgerIndexLedgerFooterClassName = string;

export type ThemeFooterLedgerIndexLedgerFooterLinksAriaLabel = string;

export type ThemeFooterLedgerIndexLedgerSocialLinksAriaLabel = string;

export type ThemeFooterLedgerIndexLedgerFirstLayoutSlot = ThemeFooterLedgerIndexLayoutSlot | undefined;

export type ThemeFooterLedgerIndexLedgerFirstSectionKey = string | undefined;

export type ThemeFooterLedgerIndexLedgerFirstSectionLinks = ThemeFooterLedgerIndexSectionLink[];

export type ThemeFooterLedgerIndexSectionLinkLabel = string;

export type ThemeFooterLedgerIndexSectionLinkHref = string;

export type ThemeFooterLedgerIndexSectionLink = {
  label: ThemeFooterLedgerIndexSectionLinkLabel;
  href: ThemeFooterLedgerIndexSectionLinkHref;
};

export type ThemeFooterLedgerIndexSocialLinkIcon = string | IconifyIcon;

export type ThemeFooterLedgerIndexSocialLinkHref = string;

export type ThemeFooterLedgerIndexSocialLinkLabel = string;

export type ThemeFooterLedgerIndexSocialLink = {
  icon: ThemeFooterLedgerIndexSocialLinkIcon;
  href: ThemeFooterLedgerIndexSocialLinkHref;
  label: ThemeFooterLedgerIndexSocialLinkLabel;
};
