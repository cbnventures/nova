import type {
  Lib_ShareTargets_BuildShareHref_EncodedUrl,
  Lib_ShareTargets_BuildShareHref_Platform,
  Lib_ShareTargets_BuildShareHref_Returns,
  Lib_ShareTargets_BuildShareHref_ShareUrl,
} from '../types/lib/share-targets.d.ts';

/**
 * Lib - Share Targets - Build Share Href.
 *
 * Builds the share URL that X, Facebook, LinkedIn, or Reddit opens for a page.
 * Returns undefined for any other platform, so callers can skip the button.
 *
 * @param {Lib_ShareTargets_BuildShareHref_Platform} platform - Platform.
 * @param {Lib_ShareTargets_BuildShareHref_ShareUrl} shareUrl - Share url.
 *
 * @returns {Lib_ShareTargets_BuildShareHref_Returns}
 *
 * @since 0.49.0
 */
export function buildShareHref(platform: Lib_ShareTargets_BuildShareHref_Platform, shareUrl: Lib_ShareTargets_BuildShareHref_ShareUrl): Lib_ShareTargets_BuildShareHref_Returns {
  const encodedUrl: Lib_ShareTargets_BuildShareHref_EncodedUrl = encodeURIComponent(shareUrl);

  switch (platform) {
    case 'x': {
      return `https://x.com/intent/tweet?url=${encodedUrl}`;
    }

    case 'facebook': {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }

    case 'linkedin': {
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    }

    case 'reddit': {
      return `https://www.reddit.com/submit?url=${encodedUrl}`;
    }

    default: {
      return undefined;
    }
  }
}
