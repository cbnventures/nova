import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import { useBlogTagsPostsPageTitle } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItems from '@theme/BlogPostItems';
import Heading from '@theme/Heading';

import type {
  ThemeBlogTagsPostsPageBlogTagsPostsPageProps,
  ThemeBlogTagsPostsPageBlogTagsPostsPageTitle,
  ThemeBlogTagsPostsPageBlogTagsPostsPageViewAllTags,
} from '../../types/theme/BlogTagsPostsPage/index.d.ts';

/**
 * Theme - Blog Tags Posts Page - Blog Tags Posts Page.
 *
 * Renders a page listing all blog posts for a specific tag with
 * pagination and a link back to the full tags list, wrapped
 * inside the standard blog layout.
 *
 * @param {ThemeBlogTagsPostsPageBlogTagsPostsPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogTagsPostsPage(props: ThemeBlogTagsPostsPageBlogTagsPostsPageProps) {
  const title: ThemeBlogTagsPostsPageBlogTagsPostsPageTitle = useBlogTagsPostsPageTitle(props['tag']);
  const viewAllTags: ThemeBlogTagsPostsPageBlogTagsPostsPageViewAllTags = translate({
    id: 'theme.blog.tagsPostsPage.viewAllTags',
    message: 'View All Tags',
    description: 'The label for the link to the full blog tags list',
  });

  return (
    <BlogLayout sidebar={props['sidebar']}>
      <PageMetadata title={title} />
      <header className="nova-blog-tags-posts-header">
        <Heading as="h2">
          {title}
        </Heading>
        {(props['tag']['description'] !== undefined) && (
          <p className="nova-blog-tags-posts-description">{props['tag']['description']}</p>
        )}
        <Link className="nova-blog-tags-posts-all-link" href={props['tag']['allTagsPath']}>
          {viewAllTags}
        </Link>
      </header>
      <BlogPostItems items={props['items']} />
      <BlogListPaginator metadata={props['listMetadata']} />
    </BlogLayout>
  );
}

export default BlogTagsPostsPage;
