import type {
  ThemeLogoIconFirstResolved,
  ThemeLogoProps,
  ThemeLogoReturns,
  ThemeLogoSiteLogo,
  ThemeLogoSrc,
  ThemeLogoSrcDark,
  ThemeLogoSrcLight,
  ThemeLogoThemedImageAlt,
  ThemeLogoThemedImageProps,
  ThemeLogoThemedImageReturns,
  ThemeLogoThemedImageSrc,
  ThemeLogoThemedImageSrcDark,
  ThemeLogoWordmark,
  ThemeLogoWordmarkDark,
  ThemeLogoWordmarkLight,
} from '../../types/theme/Logo/index.d.ts';

/**
 * Theme - Logo - Themed Image.
 *
 * Renders an image that swaps between light and dark variants via the
 * `nova-brand-light` / `nova-brand-dark` CSS classes. When only one
 * variant is provided, renders a single image with no swap classes.
 *
 * @param {ThemeLogoThemedImageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function ThemedImage(props: ThemeLogoThemedImageProps): ThemeLogoThemedImageReturns {
  const src: ThemeLogoThemedImageSrc = props['src'];
  const srcDark: ThemeLogoThemedImageSrcDark = props['srcDark'];
  const alt: ThemeLogoThemedImageAlt = props['alt'];

  if (srcDark !== undefined) {
    return (
      <>
        <img className="nova-brand-light" src={src} alt={alt} />
        <img className="nova-brand-dark" src={srcDark} alt={alt} />
      </>
    );
  }

  return <img src={src} alt={alt} />;
}

/**
 * Theme - Logo.
 *
 * Renders the site brand inside an existing wrapper. Picks among wordmark,
 * square src, or text title based on which fields the consumer provided.
 * Defaults to wordmark-first; pass `iconFirst` to flip the priority.
 *
 * @param {ThemeLogoProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Logo(props: ThemeLogoProps): ThemeLogoReturns {
  const siteLogo: ThemeLogoSiteLogo = props['siteLogo'];
  const iconFirst: ThemeLogoIconFirstResolved = props['iconFirst'] === true;

  const src: ThemeLogoSrc = siteLogo['src'];
  const wordmark: ThemeLogoWordmark = siteLogo['wordmark'];

  let srcLight: ThemeLogoSrcLight = undefined;
  let srcDark: ThemeLogoSrcDark = undefined;

  if (src !== undefined) {
    srcLight = src['light'];
    srcDark = src['dark'];
  }

  let wordmarkLight: ThemeLogoWordmarkLight = undefined;
  let wordmarkDark: ThemeLogoWordmarkDark = undefined;

  if (wordmark !== undefined) {
    wordmarkLight = wordmark['light'];
    wordmarkDark = wordmark['dark'];
  }

  if (iconFirst === true) {
    if (srcLight !== undefined) {
      return (
        <ThemedImage
          src={srcLight}
          srcDark={srcDark}
          alt={siteLogo['alt']}
        />
      );
    }

    if (wordmarkLight !== undefined) {
      return (
        <ThemedImage
          src={wordmarkLight}
          srcDark={wordmarkDark}
          alt={siteLogo['alt']}
        />
      );
    }

    if (siteLogo['title'] !== undefined) {
      return <span>{siteLogo['title']}</span>;
    }

    return <></>;
  }

  if (wordmarkLight !== undefined) {
    return (
      <ThemedImage
        src={wordmarkLight}
        srcDark={wordmarkDark}
        alt={siteLogo['alt']}
      />
    );
  }

  if (srcLight !== undefined) {
    return (
      <>
        <ThemedImage
          src={srcLight}
          srcDark={srcDark}
          alt={siteLogo['alt']}
        />
        {(siteLogo['title'] !== undefined) && (
          <span>{siteLogo['title']}</span>
        )}
      </>
    );
  }

  if (siteLogo['title'] !== undefined) {
    return <span>{siteLogo['title']}</span>;
  }

  return <></>;
}

export default Logo;
