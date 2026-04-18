import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import BlogLayout from '@theme/BlogLayout';
import Heading from '@theme/Heading';

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
    <BlogLayout sidebar={props['sidebar']}>
      <PageMetadata title={heading} />
      <header className="nova-blog-tags-posts-header">
        <Heading as="h2">
          {heading}
        </Heading>
      </header>
      <ul className="nova-blog-tags-list">
        {
          props['tags'].map((tag: ThemeBlogTagsListPageBlogTagsListPagePropsTag) => (
            <li className="nova-blog-tags-list-item" key={tag['permalink']}>
              <Link className="nova-blog-tags-list-link" to={tag['permalink']}>
                {tag['label']}
                {' '}
                (
                {tag['count']}
                )
              </Link>
            </li>
          ))
        }
      </ul>
    </BlogLayout>
  );
}

export default BlogTagsListPage;
