import { PageMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItems from '@theme/BlogPostItems';
import Heading from '@theme/Heading';

import type {
  ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageAuthorCount,
  ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageAuthorName,
  ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePostPluralSuffix,
  ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePostSuffix,
  ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageProps,
} from '../../../../types/theme/Blog/Pages/BlogAuthorsPostsPage/index.d.ts';

/**
 * Theme - Blog - Pages - Blog Authors Posts Page - Blog Authors Posts Page.
 *
 * Renders a page listing all blog posts by a specific author
 * with their name, post count, and post items, wrapped inside
 * the standard blog layout with sidebar navigation.
 *
 * @param {ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogAuthorsPostsPage(props: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageProps) {
  const authorName: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageAuthorName = props['author']['name'];
  const authorCount: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageAuthorCount = props['author']['count'];
  const postSuffix: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePostSuffix = translate({
    id: 'theme.blog.authorsPostsPage.postSuffix',
    message: ' post',
    description: 'The singular post suffix shown after the count on the author posts page',
  });
  const postPluralSuffix: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePostPluralSuffix = translate({
    id: 'theme.blog.authorsPostsPage.postPluralSuffix',
    message: ' posts',
    description: 'The plural post suffix shown after the count on the author posts page',
  });

  return (
    <BlogLayout sidebar={props['sidebar']}>
      <PageMetadata title={(authorName !== undefined) ? authorName : props['author']['key']} />
      <header className="nova-blog-author-posts-header">
        <Heading as="h2">
          {(authorName !== undefined) ? authorName : props['author']['key']}
        </Heading>
        <p>
          {authorCount}
          {(authorCount !== 1) ? postPluralSuffix : postSuffix}
        </p>
      </header>
      <BlogPostItems items={props['items']} />
      <BlogListPaginator metadata={props['listMetadata']} />
    </BlogLayout>
  );
}

export default BlogAuthorsPostsPage;
