import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import BlogLayout from '@theme/BlogLayout';
import Heading from '@theme/Heading';

import type {
  ThemeBlogPagesBlogAuthorsListPageAuthorImageUrl,
  ThemeBlogPagesBlogAuthorsListPageAuthorPage,
  ThemeBlogPagesBlogAuthorsListPageAuthorPermalink,
  ThemeBlogPagesBlogAuthorsListPageAuthorTitle,
  ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPageAuthor,
  ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPageHeading,
  ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPageProps,
} from '../../../../types/theme/Blog/Pages/BlogAuthorsListPage/index.d.ts';

/**
 * Theme - Blog - Pages - Blog Authors List Page - Blog Authors List Page.
 *
 * Renders a grid of author cards with avatars and
 * titles, wrapped in the standard blog layout
 * shell with sidebar navigation.
 *
 * @param {ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogAuthorsListPage(props: ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPageProps) {
  const heading: ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPageHeading = translate({
    id: 'theme.blog.authorsList.pageTitle',
    message: 'Authors',
    description: 'The heading of the blog authors list page',
  });

  return (
    <BlogLayout sidebar={props['sidebar']}>
      <PageMetadata title={heading} />
      <header className="nova-blog-tags-posts-header">
        <Heading as="h2">{heading}</Heading>
      </header>
      <div className="nova-blog-authors-grid">
        {props['authors'].map((author: ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPageAuthor) => {
          const authorImageUrl: ThemeBlogPagesBlogAuthorsListPageAuthorImageUrl = author['imageURL'] as ThemeBlogPagesBlogAuthorsListPageAuthorImageUrl;
          const authorTitle: ThemeBlogPagesBlogAuthorsListPageAuthorTitle = author['title'] as ThemeBlogPagesBlogAuthorsListPageAuthorTitle;
          const authorPage: ThemeBlogPagesBlogAuthorsListPageAuthorPage = author['page'] as ThemeBlogPagesBlogAuthorsListPageAuthorPage;
          const authorPermalink: ThemeBlogPagesBlogAuthorsListPageAuthorPermalink = (authorPage !== null && authorPage !== undefined) ? authorPage['permalink'] : undefined;

          if (authorPermalink !== undefined) {
            return (
              <Link className="nova-blog-author-card" to={authorPermalink} key={author['key']}>
                {(authorImageUrl !== undefined) && (
                  <img src={authorImageUrl} alt={author['name'] ?? ''} width="48" height="48" />
                )}
                <div className="nova-blog-author-card-info">
                  <strong>{(author['name'] !== undefined) ? author['name'] : author['key']}</strong>
                  {(authorTitle !== undefined) && (
                    <span className="nova-blog-author-card-title">{authorTitle}</span>
                  )}
                </div>
              </Link>
            );
          }

          return (
            <div className="nova-blog-author-card" key={author['key']}>
              {(authorImageUrl !== undefined) && (
                <img src={authorImageUrl} alt={author['name'] ?? ''} width="48" height="48" />
              )}
              <div className="nova-blog-author-card-info">
                <strong>{(author['name'] !== undefined) ? author['name'] : author['key']}</strong>
                {(authorTitle !== undefined) && (
                  <span className="nova-blog-author-card-title">{authorTitle}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </BlogLayout>
  );
}

export default BlogAuthorsListPage;
