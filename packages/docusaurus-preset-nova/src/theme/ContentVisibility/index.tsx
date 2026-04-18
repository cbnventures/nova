import Draft from '@theme/ContentVisibility/Draft';
import Unlisted from '@theme/ContentVisibility/Unlisted';

import type {
  ThemeContentVisibilityContentVisibilityFrontMatter,
  ThemeContentVisibilityContentVisibilityProps,
  ThemeContentVisibilityContentVisibilityUnlisted,
} from '../../types/theme/ContentVisibility/index.d.ts';

/**
 * Theme - Content Visibility - Content Visibility.
 *
 * Routes to the Draft or Unlisted banner components
 * based on the metadata and front matter visibility flags
 * provided by the Docusaurus content plugins.
 *
 * @param {ThemeContentVisibilityContentVisibilityProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ContentVisibility(props: ThemeContentVisibilityContentVisibilityProps) {
  const unlisted: ThemeContentVisibilityContentVisibilityUnlisted = props['metadata']['unlisted'];
  const frontMatter: ThemeContentVisibilityContentVisibilityFrontMatter = props['metadata']['frontMatter'];

  return (
    <>
      {(
        unlisted === true
        || frontMatter['unlisted'] === true
      ) && (
        <Unlisted />
      )}
      {(frontMatter['draft'] === true) && <Draft />}
    </>
  );
}

export default ContentVisibility;
