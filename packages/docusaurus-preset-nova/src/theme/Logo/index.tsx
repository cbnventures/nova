import type {
  Theme_Logo_Index_Logo_IconFirstResolved,
  Theme_Logo_Index_Logo_Props,
  Theme_Logo_Index_Logo_Props_SiteLogo,
  Theme_Logo_Index_Logo_Props_SiteLogo_Src,
  Theme_Logo_Index_Logo_Props_SiteLogo_Src_Dark,
  Theme_Logo_Index_Logo_Props_SiteLogo_Src_Light,
  Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark,
  Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Dark,
  Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Light,
  Theme_Logo_Index_Logo_Returns,
  Theme_Logo_Index_ThemedImage_Props,
  Theme_Logo_Index_ThemedImage_Props_Alt,
  Theme_Logo_Index_ThemedImage_Props_Src,
  Theme_Logo_Index_ThemedImage_Props_SrcDark,
  Theme_Logo_Index_ThemedImage_Returns,
} from '../../types/theme/Logo/index.d.ts';

/**
 * Theme - Logo - Themed Image.
 *
 * Renders an image that swaps between light and dark variants via the
 * `nova-brand-light` / `nova-brand-dark` CSS classes. When only one
 * variant is provided, renders a single image with no swap classes.
 *
 * @param {Theme_Logo_Index_ThemedImage_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function ThemedImage(props: Theme_Logo_Index_ThemedImage_Props): Theme_Logo_Index_ThemedImage_Returns {
  const src: Theme_Logo_Index_ThemedImage_Props_Src = props['src'];
  const srcDark: Theme_Logo_Index_ThemedImage_Props_SrcDark = props['srcDark'];
  const alt: Theme_Logo_Index_ThemedImage_Props_Alt = props['alt'];

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
 * @param {Theme_Logo_Index_Logo_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Logo(props: Theme_Logo_Index_Logo_Props): Theme_Logo_Index_Logo_Returns {
  const siteLogo: Theme_Logo_Index_Logo_Props_SiteLogo = props['siteLogo'];
  const iconFirst: Theme_Logo_Index_Logo_IconFirstResolved = props['iconFirst'] === true;

  const src: Theme_Logo_Index_Logo_Props_SiteLogo_Src = siteLogo['src'];
  const wordmark: Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark = siteLogo['wordmark'];

  let srcLight: Theme_Logo_Index_Logo_Props_SiteLogo_Src_Light = undefined;
  let srcDark: Theme_Logo_Index_Logo_Props_SiteLogo_Src_Dark = undefined;

  if (src !== undefined) {
    srcLight = src['light'];
    srcDark = src['dark'];
  }

  let wordmarkLight: Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Light = undefined;
  let wordmarkDark: Theme_Logo_Index_Logo_Props_SiteLogo_Wordmark_Dark = undefined;

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
