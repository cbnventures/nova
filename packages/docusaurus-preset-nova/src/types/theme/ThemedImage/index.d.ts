/**
 * Theme - Themed Image - Themed Image.
 *
 * @since 0.15.0
 */
export type ThemeThemedImageThemedImageSourcesLight = string;

export type ThemeThemedImageThemedImageSourcesDark = string;

export type ThemeThemedImageThemedImageSources = {
  light: ThemeThemedImageThemedImageSourcesLight;
  dark: ThemeThemedImageThemedImageSourcesDark;
};

export type ThemeThemedImageThemedImagePropsAlt = string | undefined;

export type ThemeThemedImageThemedImagePropsSources = ThemeThemedImageThemedImageSources;

export type ThemeThemedImageThemedImagePropsWidth = string | number | undefined;

export type ThemeThemedImageThemedImagePropsHeight = string | number | undefined;

export type ThemeThemedImageThemedImagePropsStyle = React.CSSProperties | undefined;

export type ThemeThemedImageThemedImageProps = {
  alt?: ThemeThemedImageThemedImagePropsAlt;
  sources: ThemeThemedImageThemedImagePropsSources;
  width?: ThemeThemedImageThemedImagePropsWidth;
  height?: ThemeThemedImageThemedImagePropsHeight;
  style?: ThemeThemedImageThemedImagePropsStyle;
  [key: string]: unknown;
};

export type ThemeThemedImageThemedImageReturns = React.JSX.Element;

export type ThemeThemedImageThemedImageColorModeState = [ThemeThemedImageThemedImageColorMode, ThemeThemedImageThemedImageSetColorMode];

export type ThemeThemedImageThemedImageColorMode = string;

export type ThemeThemedImageThemedImageSetColorMode = React.Dispatch<React.SetStateAction<ThemeThemedImageThemedImageColorMode>>;

export type ThemeThemedImageThemedImageCurrentTheme = string | null;

export type ThemeThemedImageThemedImageObserver = MutationObserver;

export type ThemeThemedImageThemedImageTheme = string | null;

export type ThemeThemedImageThemedImageSrc = string;
