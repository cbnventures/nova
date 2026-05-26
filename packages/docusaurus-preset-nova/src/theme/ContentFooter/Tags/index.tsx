import { translate } from '@docusaurus/Translate';
import Tag from '@theme/Tag';

import type {
  ThemeContentFooterTagsLabel,
  ThemeContentFooterTagsProps,
  ThemeContentFooterTagsTag,
} from '../../../types/theme/ContentFooter/Tags/index.d.ts';

/**
 * Theme - Content Footer - Tags.
 *
 * Renders the tags section of a content footer - a labeled row
 * of tag pills for the current page.
 *
 * @param {ThemeContentFooterTagsProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Tags(props: ThemeContentFooterTagsProps) {
  if (props['tags'] === undefined || props['tags']['length'] === 0) {
    return undefined;
  }

  const tagsLabel: ThemeContentFooterTagsLabel = translate({
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
        {props['tags'].map((tag: ThemeContentFooterTagsTag) => (
          <Tag key={tag['permalink']} permalink={tag['permalink']} label={tag['label']} description={tag['description']} />
        ))}
      </div>
    </div>
  );
}

export default Tags;
