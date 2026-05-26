import type { IconifyIcon } from '@iconify/react/offline';
import type { CSSProperties } from 'react';

/**
 * Theme - Footer - Launchpad.
 *
 * @since 0.15.0
 */
export type ThemeFooterLaunchpadIndexSection = ThemeFooterLaunchpadIndexSectionLink[];

export type ThemeFooterLaunchpadIndexSections = Record<string, ThemeFooterLaunchpadIndexSection>;

export type ThemeFooterLaunchpadIndexLayoutSlotTitle = string | undefined;

export type ThemeFooterLaunchpadIndexLayoutSlotSection = string;

export type ThemeFooterLaunchpadIndexLayoutSlot = {
  title?: ThemeFooterLaunchpadIndexLayoutSlotTitle;
  section: ThemeFooterLaunchpadIndexLayoutSlotSection;
};

export type ThemeFooterLaunchpadIndexLayout = Record<string, ThemeFooterLaunchpadIndexLayoutSlot>;

export type ThemeFooterLaunchpadIndexSocialLinks = ThemeFooterLaunchpadIndexSocialLink[];

export type ThemeFooterLaunchpadIndexCopyright = string;

export type ThemeFooterLaunchpadIndexCredit = boolean;

export type ThemeFooterLaunchpadIndexCtaObjectLabel = string;

export type ThemeFooterLaunchpadIndexCtaObjectHref = string;

export type ThemeFooterLaunchpadIndexCtaObject = {
  label: ThemeFooterLaunchpadIndexCtaObjectLabel;
  href: ThemeFooterLaunchpadIndexCtaObjectHref;
};

export type ThemeFooterLaunchpadIndexCta = string | ThemeFooterLaunchpadIndexCtaObject | undefined;

export type ThemeFooterLaunchpadIndexLaunchpadPropsSections = ThemeFooterLaunchpadIndexSections;

export type ThemeFooterLaunchpadIndexLaunchpadPropsLayout = ThemeFooterLaunchpadIndexLayout;

export type ThemeFooterLaunchpadIndexLaunchpadPropsSocialLinks = ThemeFooterLaunchpadIndexSocialLinks;

export type ThemeFooterLaunchpadIndexLaunchpadPropsCopyright = ThemeFooterLaunchpadIndexCopyright;

export type ThemeFooterLaunchpadIndexLaunchpadPropsCredit = ThemeFooterLaunchpadIndexCredit;

export type ThemeFooterLaunchpadIndexLaunchpadPropsCta = ThemeFooterLaunchpadIndexCta;

export type ThemeFooterLaunchpadIndexLaunchpadPropsCtaContained = boolean;

export type ThemeFooterLaunchpadIndexLaunchpadPropsClassName = string | undefined;

export type ThemeFooterLaunchpadIndexLaunchpadPropsStyle = CSSProperties | undefined;

export type ThemeFooterLaunchpadIndexLaunchpadProps = {
  sections: ThemeFooterLaunchpadIndexLaunchpadPropsSections;
  layout: ThemeFooterLaunchpadIndexLaunchpadPropsLayout;
  socialLinks: ThemeFooterLaunchpadIndexLaunchpadPropsSocialLinks;
  copyright: ThemeFooterLaunchpadIndexLaunchpadPropsCopyright;
  credit: ThemeFooterLaunchpadIndexLaunchpadPropsCredit;
  cta?: ThemeFooterLaunchpadIndexLaunchpadPropsCta;
  ctaContained: ThemeFooterLaunchpadIndexLaunchpadPropsCtaContained;
  className?: ThemeFooterLaunchpadIndexLaunchpadPropsClassName;
  style?: ThemeFooterLaunchpadIndexLaunchpadPropsStyle;
};

export type ThemeFooterLaunchpadIndexLaunchpadReturns = React.JSX.Element;

export type ThemeFooterLaunchpadIndexLaunchpadSections = ThemeFooterLaunchpadIndexSections;

export type ThemeFooterLaunchpadIndexLaunchpadLayout = ThemeFooterLaunchpadIndexLayout;

export type ThemeFooterLaunchpadIndexLaunchpadSocialLinks = ThemeFooterLaunchpadIndexSocialLinks;

export type ThemeFooterLaunchpadIndexLaunchpadCopyright = ThemeFooterLaunchpadIndexCopyright;

export type ThemeFooterLaunchpadIndexLaunchpadCredit = ThemeFooterLaunchpadIndexCredit;

export type ThemeFooterLaunchpadIndexLaunchpadCta = ThemeFooterLaunchpadIndexCta;

export type ThemeFooterLaunchpadIndexLaunchpadCtaContained = boolean;

export type ThemeFooterLaunchpadIndexLaunchpadFooterClassName = string;

export type ThemeFooterLaunchpadIndexLaunchpadLayoutEntries = [string, ThemeFooterLaunchpadIndexLayoutSlot][];

export type ThemeFooterLaunchpadIndexLaunchpadSocialLinksAriaLabel = string;

export type ThemeFooterLaunchpadIndexLaunchpadExternalLinkAriaLabel = string;

export type ThemeFooterLaunchpadIndexLaunchpadLayoutEntry = [string, ThemeFooterLaunchpadIndexLayoutSlot];

export type ThemeFooterLaunchpadIndexLaunchpadSectionLinks = ThemeFooterLaunchpadIndexSectionLink[];

export type ThemeFooterLaunchpadIndexSectionLinkLabel = string;

export type ThemeFooterLaunchpadIndexSectionLinkHref = string;

export type ThemeFooterLaunchpadIndexSectionLink = {
  label: ThemeFooterLaunchpadIndexSectionLinkLabel;
  href: ThemeFooterLaunchpadIndexSectionLinkHref;
};

export type ThemeFooterLaunchpadIndexSocialLinkIcon = string | IconifyIcon;

export type ThemeFooterLaunchpadIndexSocialLinkHref = string;

export type ThemeFooterLaunchpadIndexSocialLinkLabel = string;

export type ThemeFooterLaunchpadIndexSocialLink = {
  icon: ThemeFooterLaunchpadIndexSocialLinkIcon;
  href: ThemeFooterLaunchpadIndexSocialLinkHref;
  label: ThemeFooterLaunchpadIndexSocialLinkLabel;
};

export type ThemeFooterLaunchpadIndexLaunchpadSocialLinkLabel = string;
