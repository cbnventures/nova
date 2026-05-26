/**
 * Theme - Logo.
 *
 * @since 0.18.0
 */
export type ThemeLogoProps = {
  siteLogo: ThemeLogoSiteLogo;
  iconFirst?: ThemeLogoIconFirst;
};

export type ThemeLogoReturns = React.JSX.Element;

export type ThemeLogoSiteLogo = {
  src: ThemeLogoSrc;
  wordmark: ThemeLogoWordmark;
  title: ThemeLogoTitle;
  alt: ThemeLogoAlt;
};

export type ThemeLogoIconFirstResolved = boolean;

export type ThemeLogoSrc = {
  light: ThemeLogoSrcLight;
  dark: ThemeLogoSrcDark;
} | undefined;

export type ThemeLogoWordmark = {
  light: ThemeLogoWordmarkLight;
  dark: ThemeLogoWordmarkDark;
} | undefined;

export type ThemeLogoSrcLight = string | undefined;

export type ThemeLogoSrcDark = string | undefined;

export type ThemeLogoWordmarkLight = string | undefined;

export type ThemeLogoWordmarkDark = string | undefined;

export type ThemeLogoTitle = string | undefined;

export type ThemeLogoAlt = string;

export type ThemeLogoIconFirst = boolean | undefined;

/**
 * Theme - Logo - Themed Image.
 *
 * @since 0.18.0
 */
export type ThemeLogoThemedImageProps = {
  src: ThemeLogoThemedImageSrc;
  srcDark: ThemeLogoThemedImageSrcDark;
  alt: ThemeLogoThemedImageAlt;
};

export type ThemeLogoThemedImageReturns = React.JSX.Element;

export type ThemeLogoThemedImageSrc = string;

export type ThemeLogoThemedImageSrcDark = string | undefined;

export type ThemeLogoThemedImageAlt = string;
