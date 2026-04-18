import Link from '@docusaurus/Link';

import type { ThemeTagProps } from '../../types/theme/Tag/index.d.ts';

/**
 * Theme - Tag.
 *
 * Renders a single tag as a plain link with an optional
 * count badge, using the tag description as the link title
 * attribute for accessible hover context.
 *
 * @param {ThemeTagProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Tag(props: ThemeTagProps) {
  return (
    <Link className="nova-tag" rel="tag" href={props['permalink']} title={props['description']}>
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
