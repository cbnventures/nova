import { translate } from '@docusaurus/Translate';
import Tag from '@theme/Tag';

import type {
  Theme_ContentFooter_Tags_Index_Tags_Label,
  Theme_ContentFooter_Tags_Index_Tags_Props,
  Theme_ContentFooter_Tags_Index_Tags_Tag,
} from '../../../types/theme/ContentFooter/Tags/index.d.ts';

/**
 * Theme - Content Footer - Tags.
 *
 * Renders the tags section of a content footer - a labeled row
 * of tag pills for the current page.
 *
 * @param {Theme_ContentFooter_Tags_Index_Tags_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Tags(props: Theme_ContentFooter_Tags_Index_Tags_Props) {
  if (props['tags'] === undefined || props['tags']['length'] === 0) {
    return undefined;
  }

  const tagsLabel: Theme_ContentFooter_Tags_Index_Tags_Label = translate({
    id: 'theme.contentFooter.tagsLabel',
    message: 'Tags',
    description: 'The label for the tags section in a content footer',
  });

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-content-footer-section ${props['className']}` : 'nova-content-footer-section'}
      style={props['style']}
    >
      <span className="nova-content-footer-section-label">{tagsLabel}</span>
      <div className="nova-content-footer-tags">
        {props['tags'].map((tag: Theme_ContentFooter_Tags_Index_Tags_Tag) => (
          <Tag key={tag['permalink']} permalink={tag['permalink']} label={tag['label']} description={tag['description']} />
        ))}
      </div>
    </div>
  );
}

export default Tags;
