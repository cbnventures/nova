import type { IconifyIcon } from '@iconify/react/offline';
import type { CSSProperties } from 'react';

import type { Shared_Preset_Cta, Shared_Preset_Footer } from '../../shared.d.ts';

/**
 * Theme - Footer.
 *
 * @since 0.15.0
 */
export type Theme_Footer_Index_Footer_SectionLink_Label = string;

export type Theme_Footer_Index_Footer_SectionLink_Href = string;

export type Theme_Footer_Index_Footer_SectionLink = {
  label: Theme_Footer_Index_Footer_SectionLink_Label;
  href: Theme_Footer_Index_Footer_SectionLink_Href;
};

export type Theme_Footer_Index_Footer_Section = Theme_Footer_Index_Footer_SectionLink[];

export type Theme_Footer_Index_Footer_Sections = Record<string, Theme_Footer_Index_Footer_Section>;

export type Theme_Footer_Index_Footer_LayoutSlot_Title = string | undefined;

export type Theme_Footer_Index_Footer_LayoutSlot_Section = string;

export type Theme_Footer_Index_Footer_LayoutSlot = {
  title?: Theme_Footer_Index_Footer_LayoutSlot_Title;
  section: Theme_Footer_Index_Footer_LayoutSlot_Section;
};

export type Theme_Footer_Index_Footer_Layout = Record<string, Theme_Footer_Index_Footer_LayoutSlot>;

export type Theme_Footer_Index_Footer_SocialLink_Icon = string | IconifyIcon;

export type Theme_Footer_Index_Footer_SocialLink_Href = string;

export type Theme_Footer_Index_Footer_SocialLink_Label = string;

export type Theme_Footer_Index_Footer_SocialLink = {
  icon: Theme_Footer_Index_Footer_SocialLink_Icon;
  href: Theme_Footer_Index_Footer_SocialLink_Href;
  label: Theme_Footer_Index_Footer_SocialLink_Label;
};

export type Theme_Footer_Index_Footer_SocialLinks = Theme_Footer_Index_Footer_SocialLink[];

export type Theme_Footer_Index_Footer_Copyright = string;

export type Theme_Footer_Credit = boolean;

export type Theme_Footer_Index_Footer_Object_Sections = Theme_Footer_Index_Footer_Sections;

export type Theme_Footer_Index_Footer_Object_Layout = Theme_Footer_Index_Footer_Layout;

export type Theme_Footer_Index_Footer_Object_SocialLinks = Theme_Footer_Index_Footer_SocialLink[];

export type Theme_Footer_Index_Footer_Object_Copyright = string;

export type Theme_Footer_Index_Footer_Object_Credit = boolean;

export type Theme_Footer_Cta_Object_Label = string;

export type Theme_Footer_Cta_Object_Href = string;

export type Theme_Footer_Cta_Object = {
  label: Theme_Footer_Cta_Object_Label;
  href: Theme_Footer_Cta_Object_Href;
};

export type Theme_Footer_Index_Footer_Object_Cta = string | Theme_Footer_Cta_Object | undefined;

export type Theme_Footer_Index_Footer_Object = {
  sections: Theme_Footer_Index_Footer_Object_Sections;
  layout: Theme_Footer_Index_Footer_Object_Layout;
  socialLinks: Theme_Footer_Index_Footer_Object_SocialLinks;
  copyright: Theme_Footer_Index_Footer_Object_Copyright;
  credit: Theme_Footer_Index_Footer_Object_Credit;
  cta?: Theme_Footer_Index_Footer_Object_Cta;
};

export type Theme_Footer_Index_Footer_Props_ClassName = string | undefined;

export type Theme_Footer_Index_Footer_Props_Style = CSSProperties | undefined;

export type Theme_Footer_Index_Footer_Props = {
  className?: Theme_Footer_Index_Footer_Props_ClassName;
  style?: Theme_Footer_Index_Footer_Props_Style;
  [key: string]: unknown;
};

export type Theme_Footer_Index_Footer_ThemeConfigCast = unknown;

export type Theme_Footer_Index_Footer_ThemeConfig = Record<string, unknown>;

export type Theme_Footer_Index_Footer = Theme_Footer_Index_Footer_Object | false | undefined;

export type Theme_Footer_Index_GlobalData = Record<string, unknown>;

export type Theme_Footer_Index_Footer_Variant = Shared_Preset_Footer;

export type Theme_Footer_Index_PresetCta = Shared_Preset_Cta;

export type Theme_Footer_Index_VariantProps_Sections = Theme_Footer_Index_Footer_Sections;

export type Theme_Footer_Index_VariantProps_Layout = Theme_Footer_Index_Footer_Layout;

export type Theme_Footer_Index_VariantProps_SocialLinks = Theme_Footer_Index_Footer_SocialLink[];

export type Theme_Footer_Index_VariantProps_Copyright = string;

export type Theme_Footer_Index_VariantProps_Credit = boolean;

export type Theme_Footer_Index_VariantProps_Cta = string | Theme_Footer_Cta_Object | undefined;

export type Theme_Footer_Index_VariantProps_CtaContained = boolean;

export type Theme_Footer_Index_VariantProps_ClassName = string | undefined;

export type Theme_Footer_Index_RawCopyright = string;

export type Theme_Footer_Index_LocalizedCopyright = string;

export type Theme_Footer_Index_VariantProps_Style = CSSProperties | undefined;

export type Theme_Footer_Index_VariantProps = {
  sections: Theme_Footer_Index_VariantProps_Sections;
  layout: Theme_Footer_Index_VariantProps_Layout;
  socialLinks: Theme_Footer_Index_VariantProps_SocialLinks;
  copyright: Theme_Footer_Index_VariantProps_Copyright;
  credit: Theme_Footer_Index_VariantProps_Credit;
  cta?: Theme_Footer_Index_VariantProps_Cta;
  ctaContained: Theme_Footer_Index_VariantProps_CtaContained;
  className?: Theme_Footer_Index_VariantProps_ClassName;
  style?: Theme_Footer_Index_VariantProps_Style;
};
