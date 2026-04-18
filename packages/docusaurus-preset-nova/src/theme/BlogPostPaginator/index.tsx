import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { usePluginData } from '@docusaurus/useGlobalData';
import { Icon } from '@iconify/react/offline';

import type {
  ThemeBlogPostPaginatorBlogPostPaginatorBlogPosts,
  ThemeBlogPostPaginatorBlogPostPaginatorContinueReadingAriaLabel,
  ThemeBlogPostPaginatorBlogPostPaginatorContinueReadingLabel,
  ThemeBlogPostPaginatorBlogPostPaginatorGlobalData,
  ThemeBlogPostPaginatorBlogPostPaginatorGoBackAriaLabel,
  ThemeBlogPostPaginatorBlogPostPaginatorGoBackLabel,
  ThemeBlogPostPaginatorBlogPostPaginatorHeading,
  ThemeBlogPostPaginatorBlogPostPaginatorNavAriaLabel,
  ThemeBlogPostPaginatorBlogPostPaginatorNextDescription,
  ThemeBlogPostPaginatorBlogPostPaginatorNextPermalink,
  ThemeBlogPostPaginatorBlogPostPaginatorNextPost,
  ThemeBlogPostPaginatorBlogPostPaginatorPreviousDescription,
  ThemeBlogPostPaginatorBlogPostPaginatorPreviousPermalink,
  ThemeBlogPostPaginatorBlogPostPaginatorPreviousPost,
  ThemeBlogPostPaginatorBlogPostPaginatorProps,
} from '../../types/theme/BlogPostPaginator/index.d.ts';

/**
 * Theme - Blog Post Paginator - Blog Post Paginator.
 *
 * Renders a "Keep reading" section at the bottom of a blog post
 * page with previous and next navigation links, each showing
 * the target post title and an optional description excerpt.
 *
 * @param {ThemeBlogPostPaginatorBlogPostPaginatorProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogPostPaginator(props: ThemeBlogPostPaginatorBlogPostPaginatorProps) {
  const globalData: ThemeBlogPostPaginatorBlogPostPaginatorGlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as ThemeBlogPostPaginatorBlogPostPaginatorGlobalData;
  const blogPosts: ThemeBlogPostPaginatorBlogPostPaginatorBlogPosts = (globalData['blogPosts'] ?? []);

  if (props['prevItem'] === undefined && props['nextItem'] === undefined) {
    return null;
  }
  const navAriaLabel: ThemeBlogPostPaginatorBlogPostPaginatorNavAriaLabel = translate({
    id: 'theme.blog.post.paginator.navAriaLabel',
    message: 'Blog post page navigation',
    description: 'The ARIA label for the blog post paginator navigation',
  });
  const heading: ThemeBlogPostPaginatorBlogPostPaginatorHeading = translate({
    id: 'theme.blog.post.paginator.heading',
    message: 'Keep reading',
    description: 'The heading shown above the blog post paginator links',
  });
  const goBackLabel: ThemeBlogPostPaginatorBlogPostPaginatorGoBackLabel = translate({
    id: 'theme.blog.post.paginator.goBackLabel',
    message: 'Go back',
    description: 'The label for the previous post link in the blog post paginator',
  });
  const continueReadingLabel: ThemeBlogPostPaginatorBlogPostPaginatorContinueReadingLabel = translate({
    id: 'theme.blog.post.paginator.continueReadingLabel',
    message: 'Continue reading',
    description: 'The label for the next post link in the blog post paginator',
  });

  return (
    <nav className="nova-blog-post-paginator" aria-label={navAriaLabel}>
      <div className="nova-blog-post-paginator-heading">{heading}</div>
      <div className="nova-blog-post-paginator-links">
        {(props['prevItem'] !== undefined) && (() => {
          const goBackAriaLabel: ThemeBlogPostPaginatorBlogPostPaginatorGoBackAriaLabel = translate(
            {
              id: 'theme.blog.post.paginator.goBackAriaLabel',
              message: 'Go back: {title}',
              description: 'The ARIA label for the previous post link in the blog post paginator',
            },
            { title: props['prevItem']['title'] },
          );
          const previousPermalink: ThemeBlogPostPaginatorBlogPostPaginatorPreviousPermalink = props['prevItem']['permalink'];
          const previousPost: ThemeBlogPostPaginatorBlogPostPaginatorPreviousPost = blogPosts.find((post) => post['permalink'] === previousPermalink);
          const previousDescription: ThemeBlogPostPaginatorBlogPostPaginatorPreviousDescription = (previousPost !== undefined) ? previousPost['description'] : undefined;

          return (
            <Link
              className="nova-blog-post-paginator-link"
              to={props['prevItem']['permalink']}
              rel="prev"
              aria-label={goBackAriaLabel}
            >
              <span className="nova-blog-post-paginator-label">{goBackLabel}</span>
              <span className="nova-blog-post-paginator-title">
                <Icon icon="lucide:arrow-left" width="16" height="16" aria-hidden="true" />
                {props['prevItem']['title']}
              </span>
              {(previousDescription !== undefined) && (
                <span className="nova-blog-post-paginator-excerpt">{previousDescription}</span>
              )}
            </Link>
          );
        })()}
        {(props['nextItem'] !== undefined) && (() => {
          const continueReadingAriaLabel: ThemeBlogPostPaginatorBlogPostPaginatorContinueReadingAriaLabel = translate(
            {
              id: 'theme.blog.post.paginator.continueReadingAriaLabel',
              message: 'Continue reading: {title}',
              description: 'The ARIA label for the next post link in the blog post paginator',
            },
            { title: props['nextItem']['title'] },
          );
          const nextPermalink: ThemeBlogPostPaginatorBlogPostPaginatorNextPermalink = props['nextItem']['permalink'];
          const nextPost: ThemeBlogPostPaginatorBlogPostPaginatorNextPost = blogPosts.find((post) => post['permalink'] === nextPermalink);
          const nextDescription: ThemeBlogPostPaginatorBlogPostPaginatorNextDescription = (nextPost !== undefined) ? nextPost['description'] : undefined;

          return (
            <Link
              className="nova-blog-post-paginator-link"
              to={props['nextItem']['permalink']}
              rel="next"
              data-next="true"
              aria-label={continueReadingAriaLabel}
            >
              <span className="nova-blog-post-paginator-label">{continueReadingLabel}</span>
              <span className="nova-blog-post-paginator-title">
                {props['nextItem']['title']}
                <Icon icon="lucide:arrow-right" width="16" height="16" aria-hidden="true" />
              </span>
              {(nextDescription !== undefined) && (
                <span className="nova-blog-post-paginator-excerpt">{nextDescription}</span>
              )}
            </Link>
          );
        })()}
      </div>
    </nav>
  );
}

export default BlogPostPaginator;
