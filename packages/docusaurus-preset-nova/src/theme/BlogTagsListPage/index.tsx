import { PageMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import BlogLayout from '@theme/BlogLayout';
import Heading from '@theme/Heading';
import Tag from '@theme/Tag';

import type {
  Theme_BlogTagsListPage_Index_BlogTagsListPage_Heading,
  Theme_BlogTagsListPage_Index_BlogTagsListPage_Props,
  Theme_BlogTagsListPage_Index_BlogTagsListPage_PropsTag,
} from '../../types/theme/BlogTagsListPage/index.d.ts';

/**
 * Theme - Blog Tags List Page - Blog Tags List Page.
 *
 * Renders a page listing all blog tags as linked items with post
 * counts, wrapped inside the standard blog layout with sidebar
 * support and a heading title.
 *
 * @param {Theme_BlogTagsListPage_Index_BlogTagsListPage_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogTagsListPage(props: Theme_BlogTagsListPage_Index_BlogTagsListPage_Props) {
  const heading: Theme_BlogTagsListPage_Index_BlogTagsListPage_Heading = translate({
    id: 'theme.blog.tagsListPage.heading',
    message: 'Tags',
    description: 'The heading of the blog tags list page',
  });

  return (
    <BlogLayout
      sidebar={props['sidebar']}
      showHeader
      header={<Heading as="h1">{heading}</Heading>}
    >
      <PageMetadata title={heading} />
      <ul
        className={(props['className'] !== undefined) ? `nova-blog-tags-list ${props['className']}` : 'nova-blog-tags-list'}
        style={props['style']}
      >
        {
          props['tags'].map((tag: Theme_BlogTagsListPage_Index_BlogTagsListPage_PropsTag) => (
            <li className="nova-blog-tags-list-item" key={tag['permalink']}>
              <Tag
                permalink={tag['permalink']}
                label={tag['label']}
                count={tag['count']}
              />
            </li>
          ))
        }
      </ul>
    </BlogLayout>
  );
}

export default BlogTagsListPage;
