import type { IconifyIcon } from '@iconify/react/offline';
import type { CSSProperties } from 'react';

/**
 * Theme - Footer - Embassy.
 *
 * @since 0.15.0
 */
export type ThemeFooterEmbassyIndexSection = ThemeFooterEmbassyIndexSectionLink[];

export type ThemeFooterEmbassyIndexSections = Record<string, ThemeFooterEmbassyIndexSection>;

export type ThemeFooterEmbassyIndexLayoutSlotTitle = string | undefined;

export type ThemeFooterEmbassyIndexLayoutSlotSection = string;

export type ThemeFooterEmbassyIndexLayoutSlot = {
  title?: ThemeFooterEmbassyIndexLayoutSlotTitle;
  section: ThemeFooterEmbassyIndexLayoutSlotSection;
};

export type ThemeFooterEmbassyIndexLayout = Record<string, ThemeFooterEmbassyIndexLayoutSlot>;

export type ThemeFooterEmbassyIndexSocialLinks = ThemeFooterEmbassyIndexSocialLink[];

export type ThemeFooterEmbassyIndexCopyright = string;

export type ThemeFooterEmbassyIndexCredit = boolean;

export type ThemeFooterEmbassyIndexCtaObjectLabel = string;

export type ThemeFooterEmbassyIndexCtaObjectHref = string;

export type ThemeFooterEmbassyIndexCtaObject = {
  label: ThemeFooterEmbassyIndexCtaObjectLabel;
  href: ThemeFooterEmbassyIndexCtaObjectHref;
};

export type ThemeFooterEmbassyIndexCta = string | ThemeFooterEmbassyIndexCtaObject | undefined;

export type ThemeFooterEmbassyIndexEmbassyPropsSections = ThemeFooterEmbassyIndexSections;

export type ThemeFooterEmbassyIndexEmbassyPropsLayout = ThemeFooterEmbassyIndexLayout;

export type ThemeFooterEmbassyIndexEmbassyPropsSocialLinks = ThemeFooterEmbassyIndexSocialLinks;

export type ThemeFooterEmbassyIndexEmbassyPropsCopyright = ThemeFooterEmbassyIndexCopyright;

export type ThemeFooterEmbassyIndexEmbassyPropsCredit = ThemeFooterEmbassyIndexCredit;

export type ThemeFooterEmbassyIndexEmbassyPropsCta = ThemeFooterEmbassyIndexCta;

export type ThemeFooterEmbassyIndexEmbassyPropsCtaContained = boolean;

export type ThemeFooterEmbassyIndexEmbassyPropsClassName = string | undefined;

export type ThemeFooterEmbassyIndexEmbassyPropsStyle = CSSProperties | undefined;

export type ThemeFooterEmbassyIndexEmbassyProps = {
  sections: ThemeFooterEmbassyIndexEmbassyPropsSections;
  layout: ThemeFooterEmbassyIndexEmbassyPropsLayout;
  socialLinks: ThemeFooterEmbassyIndexEmbassyPropsSocialLinks;
  copyright: ThemeFooterEmbassyIndexEmbassyPropsCopyright;
  credit: ThemeFooterEmbassyIndexEmbassyPropsCredit;
  cta?: ThemeFooterEmbassyIndexEmbassyPropsCta;
  ctaContained: ThemeFooterEmbassyIndexEmbassyPropsCtaContained;
  className?: ThemeFooterEmbassyIndexEmbassyPropsClassName;
  style?: ThemeFooterEmbassyIndexEmbassyPropsStyle;
};

export type ThemeFooterEmbassyIndexEmbassyReturns = React.JSX.Element;

export type ThemeFooterEmbassyIndexEmbassySections = ThemeFooterEmbassyIndexSections;

export type ThemeFooterEmbassyIndexEmbassyLayout = ThemeFooterEmbassyIndexLayout;

export type ThemeFooterEmbassyIndexEmbassySocialLinks = ThemeFooterEmbassyIndexSocialLinks;

export type ThemeFooterEmbassyIndexEmbassyCopyright = ThemeFooterEmbassyIndexCopyright;

export type ThemeFooterEmbassyIndexEmbassyCredit = ThemeFooterEmbassyIndexCredit;

export type ThemeFooterEmbassyIndexEmbassyCta = ThemeFooterEmbassyIndexCta;

export type ThemeFooterEmbassyIndexEmbassyCtaContained = boolean;

export type ThemeFooterEmbassyIndexEmbassyFooterClassName = string;

export type ThemeFooterEmbassyIndexEmbassyLayoutEntries = [string, ThemeFooterEmbassyIndexLayoutSlot][];

export type ThemeFooterEmbassyIndexEmbassySocialLinksAriaLabel = string;

export type ThemeFooterEmbassyIndexEmbassyExternalLinkAriaLabel = string;

export type ThemeFooterEmbassyIndexSocialLinkIcon = string | IconifyIcon;

export type ThemeFooterEmbassyIndexSocialLinkHref = string;

export type ThemeFooterEmbassyIndexSocialLinkLabel = string;

export type ThemeFooterEmbassyIndexSocialLink = {
  icon: ThemeFooterEmbassyIndexSocialLinkIcon;
  href: ThemeFooterEmbassyIndexSocialLinkHref;
  label: ThemeFooterEmbassyIndexSocialLinkLabel;
};

export type ThemeFooterEmbassyIndexEmbassySocialLinkLabel = string;

export type ThemeFooterEmbassyIndexEmbassyLayoutEntry = [string, ThemeFooterEmbassyIndexLayoutSlot];

export type ThemeFooterEmbassyIndexEmbassySectionLinks = ThemeFooterEmbassyIndexSectionLink[];

export type ThemeFooterEmbassyIndexSectionLinkLabel = string;

export type ThemeFooterEmbassyIndexSectionLinkHref = string;

export type ThemeFooterEmbassyIndexSectionLink = {
  label: ThemeFooterEmbassyIndexSectionLinkLabel;
  href: ThemeFooterEmbassyIndexSectionLinkHref;
};
