import Link from '@docusaurus/Link';
import { useBlogMetadata } from '@docusaurus/plugin-content-blog/client';
import { PageMetadata } from '@docusaurus/theme-common';
import {
  BlogAuthorNoPostsLabel,
  BlogAuthorsListViewAllLabel,
  useBlogAuthorPageTitle,
} from '@docusaurus/theme-common/internal';
import Author from '@theme/Blog/Components/Author';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItems from '@theme/BlogPostItems';

import type {
  ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageDescription,
  ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageProps,
  ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageTitle,
  ThemeBlogPagesBlogAuthorsPostsPageViewAllAuthorsLinkBlogMetadata,
} from '../../../../types/theme/Blog/Pages/BlogAuthorsPostsPage/index.d.ts';

/**
 * Theme - Blog - Pages - Blog Authors Posts Page - View All Authors Link.
 *
 * Renders a "View all authors" link to the blog's authors-list page, used
 * inside the posts-page header so visitors can navigate sideways.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function ViewAllAuthorsLink() {
  const blogMetadata: ThemeBlogPagesBlogAuthorsPostsPageViewAllAuthorsLinkBlogMetadata = useBlogMetadata();

  return (
    <Link className="nova-blog-author-posts-view-all" href={blogMetadata['authorsListPath']}>
      <BlogAuthorsListViewAllLabel />
    </Link>
  );
}

/**
 * Theme - Blog - Pages - Blog Authors Posts Page - Blog Authors Posts Page.
 *
 * Renders the `/blog/authors/<author-key>/` page listing posts by a single
 * author. Header shows the author profile (avatar, name, description, socials)
 * above the paginated post list with a "view all authors" link back.
 *
 * @param {ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function BlogAuthorsPostsPage(props: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageProps) {
  const title: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageTitle = useBlogAuthorPageTitle(props['author']);
  const description: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageDescription = props['author']['description'];

  return (
    <BlogLayout
      sidebar={props['sidebar']}
      showHeader
      header={(
        <>
          <Author as="h1" author={props['author']} />
          {(description !== undefined) && (
            <p
              className={(props['className'] !== undefined) ? `nova-blog-description ${props['className']}` : 'nova-blog-description'}
              style={props['style']}
            >
              {description}
            </p>
          )}
          <ViewAllAuthorsLink />
        </>
      )}
    >
      <PageMetadata title={title} />
      {(props['items']['length'] === 0) ? (
        <p className="nova-blog-author-posts-empty">
          <BlogAuthorNoPostsLabel />
        </p>
      ) : (
        <>
          <hr className="nova-blog-author-posts-divider" />
          <BlogPostItems items={props['items']} />
          <BlogListPaginator metadata={props['listMetadata']} />
        </>
      )}
    </BlogLayout>
  );
}

export default BlogAuthorsPostsPage;
