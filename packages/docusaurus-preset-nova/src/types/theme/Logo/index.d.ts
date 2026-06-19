/**
 * Theme - Logo.
 *
 * @since 0.18.0
 */
export type Theme_Logo_Index_Logo_Props_SiteLogo_Src_Value_Light = string | undefined;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Src_Value_Dark = string | undefined;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Src_Value = {
  light: Theme_Logo_Index_Logo_Props_SiteLogo_Src_Value_Light;
  dark: Theme_Logo_Index_Logo_Props_SiteLogo_Src_Value_Dark;
};

export type Theme_Logo_Index_Logo_Props_SiteLogo_Src = Theme_Logo_Index_Logo_Props_SiteLogo_Src_Value | undefined;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Value_Light = string | undefined;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Value_Dark = string | undefined;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Value = {
  light: Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Value_Light;
  dark: Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Value_Dark;
};

export type Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark = Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Value | undefined;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Title = string | undefined;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Alt = string;

export type Theme_Logo_Index_Logo_Props_SiteLogo = {
  src: Theme_Logo_Index_Logo_Props_SiteLogo_Src;
  wordmark: Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark;
  title: Theme_Logo_Index_Logo_Props_SiteLogo_Title;
  alt: Theme_Logo_Index_Logo_Props_SiteLogo_Alt;
};

export type Theme_Logo_Index_Logo_Props_IconFirst = boolean | undefined;

export type Theme_Logo_Index_Logo_Props = {
  siteLogo: Theme_Logo_Index_Logo_Props_SiteLogo;
  iconFirst?: Theme_Logo_Index_Logo_Props_IconFirst;
};

export type Theme_Logo_Index_Logo_Returns = React.JSX.Element;

export type Theme_Logo_Index_Logo_IconFirstResolved = boolean;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Src_Light = string | undefined;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Src_Dark = string | undefined;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Light = string | undefined;

export type Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Dark = string | undefined;

/**
 * Theme - Logo - Themed Image.
 *
 * @since 0.18.0
 */
export type Theme_Logo_Index_ThemedImage_Props_Src = string;

export type Theme_Logo_Index_ThemedImage_Props_SrcDark = string | undefined;

export type Theme_Logo_Index_ThemedImage_Props_Alt = string;

export type Theme_Logo_Index_ThemedImage_Props = {
  src: Theme_Logo_Index_ThemedImage_Props_Src;
  srcDark: Theme_Logo_Index_ThemedImage_Props_SrcDark;
  alt: Theme_Logo_Index_ThemedImage_Props_Alt;
};

export type Theme_Logo_Index_ThemedImage_Returns = React.JSX.Element;
