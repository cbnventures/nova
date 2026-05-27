/**
 * Theme - Themed Image - Themed Image.
 *
 * @since 0.15.0
 */
export type Theme_ThemedImage_Index_ThemedImage_Sources_Light = string;

export type Theme_ThemedImage_Index_ThemedImage_Sources_Dark = string;

export type Theme_ThemedImage_Index_ThemedImage_Sources = {
  light: Theme_ThemedImage_Index_ThemedImage_Sources_Light;
  dark: Theme_ThemedImage_Index_ThemedImage_Sources_Dark;
};

export type Theme_ThemedImage_Index_ThemedImage_Props_Alt = string | undefined;

export type Theme_ThemedImage_Index_ThemedImage_Props_Sources = Theme_ThemedImage_Index_ThemedImage_Sources;

export type Theme_ThemedImage_Index_ThemedImage_Props_Width = string | number | undefined;

export type Theme_ThemedImage_Index_ThemedImage_Props_Height = string | number | undefined;

export type Theme_ThemedImage_Index_ThemedImage_Props_Style = React.CSSProperties | undefined;

export type Theme_ThemedImage_Index_ThemedImage_Props_ClassName = string | undefined;

export type Theme_ThemedImage_Index_ThemedImage_Props = {
  alt?: Theme_ThemedImage_Index_ThemedImage_Props_Alt;
  sources: Theme_ThemedImage_Index_ThemedImage_Props_Sources;
  width?: Theme_ThemedImage_Index_ThemedImage_Props_Width;
  height?: Theme_ThemedImage_Index_ThemedImage_Props_Height;
  style?: Theme_ThemedImage_Index_ThemedImage_Props_Style;
  className?: Theme_ThemedImage_Index_ThemedImage_Props_ClassName;
  [key: string]: unknown;
};

export type Theme_ThemedImage_Index_ThemedImage_Returns = React.JSX.Element;

export type Theme_ThemedImage_Index_ThemedImage_ColorModeState = [Theme_ThemedImage_Index_ThemedImage_ColorMode, Theme_ThemedImage_Index_ThemedImage_SetColorMode];

export type Theme_ThemedImage_Index_ThemedImage_ColorMode = string;

export type Theme_ThemedImage_Index_ThemedImage_SetColorMode = React.Dispatch<React.SetStateAction<Theme_ThemedImage_Index_ThemedImage_ColorMode>>;

export type Theme_ThemedImage_Index_ThemedImage_CurrentTheme = string | null;

export type Theme_ThemedImage_Index_ThemedImage_Observer = MutationObserver;

export type Theme_ThemedImage_Index_ThemedImage_Theme = string | null;

export type Theme_ThemedImage_Index_ThemedImage_Src = string;
