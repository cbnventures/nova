import type { IconifyIcon } from '@iconify/react/offline';
import type { CSSProperties } from 'react';

/**
 * Theme - Footer - Commons.
 *
 * @since 0.15.0
 */
export type Theme_Footer_Commons_Index_Section = Theme_Footer_Commons_Index_SectionLink[];

export type Theme_Footer_Commons_Index_Sections = Record<string, Theme_Footer_Commons_Index_Section>;

export type Theme_Footer_Commons_Index_LayoutSlot_Title = string | undefined;

export type Theme_Footer_Commons_Index_LayoutSlot_Section = string;

export type Theme_Footer_Commons_Index_LayoutSlot = {
  title?: Theme_Footer_Commons_Index_LayoutSlot_Title;
  section: Theme_Footer_Commons_Index_LayoutSlot_Section;
};

export type Theme_Footer_Commons_Index_Layout = Record<string, Theme_Footer_Commons_Index_LayoutSlot>;

export type Theme_Footer_Commons_Index_SocialLinks = Theme_Footer_Commons_Index_SocialLink[];

export type Theme_Footer_Commons_Index_Copyright = string;

export type Theme_Footer_Commons_Index_Credit = boolean;

export type Theme_Footer_Commons_Index_CtaObject_Label = string;

export type Theme_Footer_Commons_Index_CtaObject_Href = string;

export type Theme_Footer_Commons_Index_CtaObject = {
  label: Theme_Footer_Commons_Index_CtaObject_Label;
  href: Theme_Footer_Commons_Index_CtaObject_Href;
};

export type Theme_Footer_Commons_Index_Cta = string | Theme_Footer_Commons_Index_CtaObject | undefined;

export type Theme_Footer_Commons_Index_Commons_Props_Sections = Theme_Footer_Commons_Index_Sections;

export type Theme_Footer_Commons_Index_Commons_Props_Layout = Theme_Footer_Commons_Index_Layout;

export type Theme_Footer_Commons_Index_Commons_Props_SocialLinks = Theme_Footer_Commons_Index_SocialLinks;

export type Theme_Footer_Commons_Index_Commons_Props_Copyright = Theme_Footer_Commons_Index_Copyright;

export type Theme_Footer_Commons_Index_Commons_Props_Credit = Theme_Footer_Commons_Index_Credit;

export type Theme_Footer_Commons_Index_Commons_Props_Cta = Theme_Footer_Commons_Index_Cta;

export type Theme_Footer_Commons_Index_Commons_Props_CtaContained = boolean;

export type Theme_Footer_Commons_Index_Commons_Props_ClassName = string | undefined;

export type Theme_Footer_Commons_Index_Commons_Props_Style = CSSProperties | undefined;

export type Theme_Footer_Commons_Index_Commons_Props = {
  sections: Theme_Footer_Commons_Index_Commons_Props_Sections;
  layout: Theme_Footer_Commons_Index_Commons_Props_Layout;
  socialLinks: Theme_Footer_Commons_Index_Commons_Props_SocialLinks;
  copyright: Theme_Footer_Commons_Index_Commons_Props_Copyright;
  credit: Theme_Footer_Commons_Index_Commons_Props_Credit;
  cta?: Theme_Footer_Commons_Index_Commons_Props_Cta;
  ctaContained: Theme_Footer_Commons_Index_Commons_Props_CtaContained;
  className?: Theme_Footer_Commons_Index_Commons_Props_ClassName;
  style?: Theme_Footer_Commons_Index_Commons_Props_Style;
};

export type Theme_Footer_Commons_Index_Commons_Returns = React.JSX.Element;

export type Theme_Footer_Commons_Index_Commons_Sections = Theme_Footer_Commons_Index_Sections;

export type Theme_Footer_Commons_Index_Commons_Layout = Theme_Footer_Commons_Index_Layout;

export type Theme_Footer_Commons_Index_Commons_SocialLinks = Theme_Footer_Commons_Index_SocialLinks;

export type Theme_Footer_Commons_Index_Commons_Copyright = Theme_Footer_Commons_Index_Copyright;

export type Theme_Footer_Commons_Index_Commons_Credit = Theme_Footer_Commons_Index_Credit;

export type Theme_Footer_Commons_Index_Commons_Cta = Theme_Footer_Commons_Index_Cta;

export type Theme_Footer_Commons_Index_Commons_CtaContained = boolean;

export type Theme_Footer_Commons_Index_Commons_FooterClassName = string;

export type Theme_Footer_Commons_Index_Commons_LayoutEntries = [string, Theme_Footer_Commons_Index_LayoutSlot][];

export type Theme_Footer_Commons_Index_Commons_SocialLinksAriaLabel = string;

export type Theme_Footer_Commons_Index_Commons_ExternalLinkAriaLabel = string;

export type Theme_Footer_Commons_Index_Commons_LayoutEntry = [string, Theme_Footer_Commons_Index_LayoutSlot];

export type Theme_Footer_Commons_Index_Commons_SectionLinks = Theme_Footer_Commons_Index_SectionLink[];

export type Theme_Footer_Commons_Index_SectionLink_Label = string;

export type Theme_Footer_Commons_Index_SectionLink_Href = string;

export type Theme_Footer_Commons_Index_SectionLink = {
  label: Theme_Footer_Commons_Index_SectionLink_Label;
  href: Theme_Footer_Commons_Index_SectionLink_Href;
};

export type Theme_Footer_Commons_Index_SocialLink_Icon = string | IconifyIcon;

export type Theme_Footer_Commons_Index_SocialLink_Href = string;

export type Theme_Footer_Commons_Index_SocialLink_Label = string;

export type Theme_Footer_Commons_Index_SocialLink = {
  icon: Theme_Footer_Commons_Index_SocialLink_Icon;
  href: Theme_Footer_Commons_Index_SocialLink_Href;
  label: Theme_Footer_Commons_Index_SocialLink_Label;
};

export type Theme_Footer_Commons_Index_Commons_SocialLinkLabel = string;
