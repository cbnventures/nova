import { PageMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import BlogLayout from '@theme/BlogLayout';
import Heading from '@theme/Heading';
import Tag from '@theme/Tag';

import type {
  ThemeBlogTagsListPageBlogTagsListPageHeading,
  ThemeBlogTagsListPageBlogTagsListPageProps,
  ThemeBlogTagsListPageBlogTagsListPagePropsTag,
} from '../../types/theme/BlogTagsListPage/index.d.ts';

/**
 * Theme - Blog Tags List Page - Blog Tags List Page.
 *
 * Renders a page listing all blog tags as linked items with post
 * counts, wrapped inside the standard blog layout with sidebar
 * support and a heading title.
 *
 * @param {ThemeBlogTagsListPageBlogTagsListPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogTagsListPage(props: ThemeBlogTagsListPageBlogTagsListPageProps) {
  const heading: ThemeBlogTagsListPageBlogTagsListPageHeading = translate({
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
          props['tags'].map((tag: ThemeBlogTagsListPageBlogTagsListPagePropsTag) => (
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
