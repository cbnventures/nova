import type { IconifyIcon } from '@iconify/react/offline';

/**
 * Theme - Footer - Commons.
 *
 * @since 0.15.0
 */
export type ThemeFooterCommonsIndexSection = ThemeFooterCommonsIndexSectionLink[];

export type ThemeFooterCommonsIndexSections = Record<string, ThemeFooterCommonsIndexSection>;

export type ThemeFooterCommonsIndexLayoutSlotTitle = string | undefined;

export type ThemeFooterCommonsIndexLayoutSlotSection = string;

export type ThemeFooterCommonsIndexLayoutSlot = {
  title?: ThemeFooterCommonsIndexLayoutSlotTitle;
  section: ThemeFooterCommonsIndexLayoutSlotSection;
};

export type ThemeFooterCommonsIndexLayout = Record<string, ThemeFooterCommonsIndexLayoutSlot>;

export type ThemeFooterCommonsIndexSocialLinks = ThemeFooterCommonsIndexSocialLink[];

export type ThemeFooterCommonsIndexCopyright = string;

export type ThemeFooterCommonsIndexCredit = boolean;

export type ThemeFooterCommonsIndexCommonsPropsSections = ThemeFooterCommonsIndexSections;

export type ThemeFooterCommonsIndexCommonsPropsLayout = ThemeFooterCommonsIndexLayout;

export type ThemeFooterCommonsIndexCommonsPropsSocialLinks = ThemeFooterCommonsIndexSocialLinks;

export type ThemeFooterCommonsIndexCommonsPropsCopyright = ThemeFooterCommonsIndexCopyright;

export type ThemeFooterCommonsIndexCommonsPropsCredit = ThemeFooterCommonsIndexCredit;

export type ThemeFooterCommonsIndexCommonsProps = {
  sections: ThemeFooterCommonsIndexCommonsPropsSections;
  layout: ThemeFooterCommonsIndexCommonsPropsLayout;
  socialLinks: ThemeFooterCommonsIndexCommonsPropsSocialLinks;
  copyright: ThemeFooterCommonsIndexCommonsPropsCopyright;
  credit: ThemeFooterCommonsIndexCommonsPropsCredit;
};

export type ThemeFooterCommonsIndexCommonsReturns = React.JSX.Element;

export type ThemeFooterCommonsIndexCommonsSections = ThemeFooterCommonsIndexSections;

export type ThemeFooterCommonsIndexCommonsLayout = ThemeFooterCommonsIndexLayout;

export type ThemeFooterCommonsIndexCommonsSocialLinks = ThemeFooterCommonsIndexSocialLinks;

export type ThemeFooterCommonsIndexCommonsCopyright = ThemeFooterCommonsIndexCopyright;

export type ThemeFooterCommonsIndexCommonsCredit = ThemeFooterCommonsIndexCredit;

export type ThemeFooterCommonsIndexCommonsFooterClassName = string;

export type ThemeFooterCommonsIndexCommonsLayoutEntries = [string, ThemeFooterCommonsIndexLayoutSlot][];

export type ThemeFooterCommonsIndexCommonsSocialLinksAriaLabel = string;

export type ThemeFooterCommonsIndexCommonsLayoutEntry = [string, ThemeFooterCommonsIndexLayoutSlot];

export type ThemeFooterCommonsIndexCommonsSectionLinks = ThemeFooterCommonsIndexSectionLink[];

export type ThemeFooterCommonsIndexSectionLinkLabel = string;

export type ThemeFooterCommonsIndexSectionLinkHref = string;

export type ThemeFooterCommonsIndexSectionLink = {
  label: ThemeFooterCommonsIndexSectionLinkLabel;
  href: ThemeFooterCommonsIndexSectionLinkHref;
};

export type ThemeFooterCommonsIndexSocialLinkIcon = string | IconifyIcon;

export type ThemeFooterCommonsIndexSocialLinkHref = string;

export type ThemeFooterCommonsIndexSocialLinkLabel = string;

export type ThemeFooterCommonsIndexSocialLink = {
  icon: ThemeFooterCommonsIndexSocialLinkIcon;
  href: ThemeFooterCommonsIndexSocialLinkHref;
  label: ThemeFooterCommonsIndexSocialLinkLabel;
};
