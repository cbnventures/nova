import Draft from '@theme/ContentVisibility/Draft';
import Unlisted from '@theme/ContentVisibility/Unlisted';

import type {
  Theme_ContentVisibility_Index_ContentVisibility_FrontMatter,
  Theme_ContentVisibility_Index_ContentVisibility_Props,
  Theme_ContentVisibility_Index_ContentVisibility_Unlisted,
} from '../../types/theme/ContentVisibility/index.d.ts';

/**
 * Theme - Content Visibility - Content Visibility.
 *
 * Routes to the Draft or Unlisted banner components
 * based on the metadata and front matter visibility flags
 * provided by the Docusaurus content plugins.
 *
 * @param {Theme_ContentVisibility_Index_ContentVisibility_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ContentVisibility(props: Theme_ContentVisibility_Index_ContentVisibility_Props) {
  const unlisted: Theme_ContentVisibility_Index_ContentVisibility_Unlisted = props['metadata']['unlisted'];
  const frontMatter: Theme_ContentVisibility_Index_ContentVisibility_FrontMatter = props['metadata']['frontMatter'];

  return (
    <>
      {(
        unlisted === true
        || frontMatter['unlisted'] === true
      ) && (
        <Unlisted
          className={(props['className'] !== undefined) ? `nova-content-visibility ${props['className']}` : 'nova-content-visibility'}
          style={props['style']}
        />
      )}
      {(frontMatter['draft'] === true) && (
        <Draft
          className={(props['className'] !== undefined) ? `nova-content-visibility ${props['className']}` : 'nova-content-visibility'}
          style={props['style']}
        />
      )}
    </>
  );
}

export default ContentVisibility;
