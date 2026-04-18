import { PageMetadata } from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItems from '@theme/BlogPostItems';

import type {
  ThemeBlogListPageBlogListPageProps,
  ThemeBlogListPageBlogListPageTitle,
} from '../../types/theme/BlogListPage/index.d.ts';

/**
 * Theme - Blog List Page - Blog List Page.
 *
 * Renders the paginated blog listing page with post items
 * and a pagination navigator, wrapped inside the standard
 * blog layout with sidebar support.
 *
 * @param {ThemeBlogListPageBlogListPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogListPage(props: ThemeBlogListPageBlogListPageProps) {
  const title: ThemeBlogListPageBlogListPageTitle = props['metadata']['blogTitle'];

  return (
    <BlogLayout sidebar={props['sidebar']}>
      <PageMetadata title={title} />
      <BlogPostItems items={props['items']} />
      <BlogListPaginator metadata={props['metadata']} />
    </BlogLayout>
  );
}

export default BlogListPage;
