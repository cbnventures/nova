/**
 * Theme - Content Visibility - Content Visibility.
 *
 * @since 0.15.0
 */
export type ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatterDraft = boolean | undefined;

export type ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatterUnlisted = boolean | undefined;

export type ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatter = {
  draft?: ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatterDraft;
  unlisted?: ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatterUnlisted;
};

export type ThemeContentVisibilityContentVisibilityPropsMetadataUnlisted = boolean;

export type ThemeContentVisibilityContentVisibilityPropsMetadata = {
  unlisted: ThemeContentVisibilityContentVisibilityPropsMetadataUnlisted;
  frontMatter: ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatter;
};

export type ThemeContentVisibilityContentVisibilityProps = {
  metadata: ThemeContentVisibilityContentVisibilityPropsMetadata;
};

export type ThemeContentVisibilityContentVisibilityUnlisted = boolean;

export type ThemeContentVisibilityContentVisibilityFrontMatter = ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatter;
