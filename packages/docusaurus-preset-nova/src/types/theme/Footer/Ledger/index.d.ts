import type { IconifyIcon } from '@iconify/react/offline';
import type { CSSProperties } from 'react';

/**
 * Theme - Footer - Ledger.
 *
 * @since 0.15.0
 */
export type Theme_Footer_Ledger_Index_SectionLink_Label = string;

export type Theme_Footer_Ledger_Index_SectionLink_Href = string;

export type Theme_Footer_Ledger_Index_SectionLink = {
  label: Theme_Footer_Ledger_Index_SectionLink_Label;
  href: Theme_Footer_Ledger_Index_SectionLink_Href;
};

export type Theme_Footer_Ledger_Index_SocialLink_Icon = string | IconifyIcon;

export type Theme_Footer_Ledger_Index_SocialLink_Href = string;

export type Theme_Footer_Ledger_Index_SocialLink_Label = string;

export type Theme_Footer_Ledger_Index_SocialLink = {
  icon: Theme_Footer_Ledger_Index_SocialLink_Icon;
  href: Theme_Footer_Ledger_Index_SocialLink_Href;
  label: Theme_Footer_Ledger_Index_SocialLink_Label;
};

export type Theme_Footer_Ledger_Index_Section = Theme_Footer_Ledger_Index_SectionLink[];

export type Theme_Footer_Ledger_Index_Sections = Record<string, Theme_Footer_Ledger_Index_Section>;

export type Theme_Footer_Ledger_Index_LayoutSlot_Title = string | undefined;

export type Theme_Footer_Ledger_Index_LayoutSlot_Section = string;

export type Theme_Footer_Ledger_Index_LayoutSlot = {
  title?: Theme_Footer_Ledger_Index_LayoutSlot_Title;
  section: Theme_Footer_Ledger_Index_LayoutSlot_Section;
};

export type Theme_Footer_Ledger_Index_Layout = Record<string, Theme_Footer_Ledger_Index_LayoutSlot>;

export type Theme_Footer_Ledger_Index_SocialLinks = Theme_Footer_Ledger_Index_SocialLink[];

export type Theme_Footer_Ledger_Index_Copyright = string;

export type Theme_Footer_Ledger_Index_Credit = boolean;

export type Theme_Footer_Ledger_Index_CtaObject_Label = string;

export type Theme_Footer_Ledger_Index_CtaObject_Href = string;

export type Theme_Footer_Ledger_Index_CtaObject = {
  label: Theme_Footer_Ledger_Index_CtaObject_Label;
  href: Theme_Footer_Ledger_Index_CtaObject_Href;
};

export type Theme_Footer_Ledger_Index_Cta = string | Theme_Footer_Ledger_Index_CtaObject | undefined;

export type Theme_Footer_Ledger_Index_Ledger_Props_Sections = Theme_Footer_Ledger_Index_Sections;

export type Theme_Footer_Ledger_Index_Ledger_Props_Layout = Theme_Footer_Ledger_Index_Layout;

export type Theme_Footer_Ledger_Index_Ledger_Props_SocialLinks = Theme_Footer_Ledger_Index_SocialLinks;

export type Theme_Footer_Ledger_Index_Ledger_Props_Copyright = Theme_Footer_Ledger_Index_Copyright;

export type Theme_Footer_Ledger_Index_Ledger_Props_Credit = Theme_Footer_Ledger_Index_Credit;

export type Theme_Footer_Ledger_Index_Ledger_Props_Cta = Theme_Footer_Ledger_Index_Cta;

export type Theme_Footer_Ledger_Index_Ledger_Props_CtaContained = boolean;

export type Theme_Footer_Ledger_Index_Ledger_Props_ClassName = string | undefined;

export type Theme_Footer_Ledger_Index_Ledger_Props_Style = CSSProperties | undefined;

export type Theme_Footer_Ledger_Index_Ledger_Props = {
  sections: Theme_Footer_Ledger_Index_Ledger_Props_Sections;
  layout: Theme_Footer_Ledger_Index_Ledger_Props_Layout;
  socialLinks: Theme_Footer_Ledger_Index_Ledger_Props_SocialLinks;
  copyright: Theme_Footer_Ledger_Index_Ledger_Props_Copyright;
  credit: Theme_Footer_Ledger_Index_Ledger_Props_Credit;
  cta?: Theme_Footer_Ledger_Index_Ledger_Props_Cta;
  ctaContained: Theme_Footer_Ledger_Index_Ledger_Props_CtaContained;
  className?: Theme_Footer_Ledger_Index_Ledger_Props_ClassName;
  style?: Theme_Footer_Ledger_Index_Ledger_Props_Style;
};

export type Theme_Footer_Ledger_Index_Ledger_Returns = React.JSX.Element;

export type Theme_Footer_Ledger_Index_Ledger_Sections = Theme_Footer_Ledger_Index_Sections;

export type Theme_Footer_Ledger_Index_Ledger_Layout = Theme_Footer_Ledger_Index_Layout;

export type Theme_Footer_Ledger_Index_Ledger_SocialLinks = Theme_Footer_Ledger_Index_SocialLinks;

export type Theme_Footer_Ledger_Index_Ledger_Copyright = Theme_Footer_Ledger_Index_Copyright;

export type Theme_Footer_Ledger_Index_Ledger_Credit = Theme_Footer_Ledger_Index_Credit;

export type Theme_Footer_Ledger_Index_Ledger_Cta = Theme_Footer_Ledger_Index_Cta;

export type Theme_Footer_Ledger_Index_Ledger_CtaContained = boolean;

export type Theme_Footer_Ledger_Index_Ledger_FooterClassName = string;

export type Theme_Footer_Ledger_Index_Ledger_FooterLinksAriaLabel = string;

export type Theme_Footer_Ledger_Index_Ledger_SocialLinksAriaLabel = string;

export type Theme_Footer_Ledger_Index_Ledger_ExternalLinkAriaLabel = string;

export type Theme_Footer_Ledger_Index_Ledger_FirstLayoutSlot = Theme_Footer_Ledger_Index_LayoutSlot | undefined;

export type Theme_Footer_Ledger_Index_Ledger_FirstSectionKey = string | undefined;

export type Theme_Footer_Ledger_Index_Ledger_FirstSectionLinks = Theme_Footer_Ledger_Index_SectionLink[];

export type Theme_Footer_Ledger_Index_Ledger_SocialLinkLabel = string;
