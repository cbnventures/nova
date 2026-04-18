import type { IconifyIcon } from '@iconify/react/offline';

import type { SharedPresetFooter } from '../../shared.d.ts';

/**
 * Theme - Footer.
 *
 * @since 0.15.0
 */
export type ThemeFooterSectionLinkLabel = string;

export type ThemeFooterSectionLinkHref = string;

export type ThemeFooterSectionLink = {
  label: ThemeFooterSectionLinkLabel;
  href: ThemeFooterSectionLinkHref;
};

export type ThemeFooterSection = ThemeFooterSectionLink[];

export type ThemeFooterSections = Record<string, ThemeFooterSection>;

export type ThemeFooterLayoutSlotTitle = string | undefined;

export type ThemeFooterLayoutSlotSection = string;

export type ThemeFooterLayoutSlot = {
  title?: ThemeFooterLayoutSlotTitle;
  section: ThemeFooterLayoutSlotSection;
};

export type ThemeFooterLayout = Record<string, ThemeFooterLayoutSlot>;

export type ThemeFooterSocialLinkIcon = string | IconifyIcon;

export type ThemeFooterSocialLinkHref = string;

export type ThemeFooterSocialLinkLabel = string;

export type ThemeFooterSocialLink = {
  icon: ThemeFooterSocialLinkIcon;
  href: ThemeFooterSocialLinkHref;
  label: ThemeFooterSocialLinkLabel;
};

export type ThemeFooterSocialLinks = ThemeFooterSocialLink[];

export type ThemeFooterCopyright = string;

export type ThemeFooterCredit = boolean;

export type ThemeFooterFooterObjectSections = ThemeFooterSections;

export type ThemeFooterFooterObjectLayout = ThemeFooterLayout;

export type ThemeFooterFooterObjectSocialLinks = ThemeFooterSocialLink[];

export type ThemeFooterFooterObjectCopyright = string;

export type ThemeFooterFooterObjectCredit = boolean;

export type ThemeFooterFooterObjectCta = string | undefined;

export type ThemeFooterFooterObject = {
  sections: ThemeFooterFooterObjectSections;
  layout: ThemeFooterFooterObjectLayout;
  socialLinks: ThemeFooterFooterObjectSocialLinks;
  copyright: ThemeFooterFooterObjectCopyright;
  credit: ThemeFooterFooterObjectCredit;
  cta?: ThemeFooterFooterObjectCta;
};

export type ThemeFooterThemeConfigCast = unknown;

export type ThemeFooterThemeConfig = Record<string, unknown>;

export type ThemeFooterFooter = ThemeFooterFooterObject | false | undefined;

export type ThemeFooterIndexGlobalData = Record<string, unknown>;

export type ThemeFooterIndexFooterVariant = SharedPresetFooter;

export type ThemeFooterIndexVariantPropsSections = ThemeFooterSections;

export type ThemeFooterIndexVariantPropsLayout = ThemeFooterLayout;

export type ThemeFooterIndexVariantPropsSocialLinks = ThemeFooterSocialLink[];

export type ThemeFooterIndexVariantPropsCopyright = string;

export type ThemeFooterIndexVariantPropsCredit = boolean;

export type ThemeFooterIndexVariantPropsCta = string | undefined;

export type ThemeFooterIndexVariantProps = {
  sections: ThemeFooterIndexVariantPropsSections;
  layout: ThemeFooterIndexVariantPropsLayout;
  socialLinks: ThemeFooterIndexVariantPropsSocialLinks;
  copyright: ThemeFooterIndexVariantPropsCopyright;
  credit: ThemeFooterIndexVariantPropsCredit;
  cta?: ThemeFooterIndexVariantPropsCta;
};
