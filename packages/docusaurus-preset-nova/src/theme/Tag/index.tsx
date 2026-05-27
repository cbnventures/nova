import Link from '@docusaurus/Link';

import type { Theme_Tag_Index_Tag_Props } from '../../types/theme/Tag/index.d.ts';

/**
 * Theme - Tag.
 *
 * Renders a single tag as a plain link with an optional
 * count badge, using the tag description as the link title
 * attribute for accessible hover context.
 *
 * @param {Theme_Tag_Index_Tag_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Tag(props: Theme_Tag_Index_Tag_Props) {
  return (
    <Link
      className={(props['className'] !== undefined) ? `nova-tag ${props['className']}` : 'nova-tag'}
      {...((props['style'] !== undefined) ? { style: props['style'] } : {})}
      rel="tag"
      href={props['permalink']}
      title={props['description']}
    >
      {props['label']}
      {(props['count'] !== undefined) && (
        <span className="nova-tag-count">
          {' '}
          (
          {props['count']}
          )
        </span>
      )}
    </Link>
  );
}

export default Tag;
