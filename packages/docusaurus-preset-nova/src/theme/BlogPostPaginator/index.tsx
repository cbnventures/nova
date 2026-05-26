import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { usePluginData } from '@docusaurus/useGlobalData';
import { Icon } from '@iconify/react/offline';

import type {
  ThemeBlogPostPaginatorBlogPostPaginatorBlogPosts,
  ThemeBlogPostPaginatorBlogPostPaginatorGlobalData,
  ThemeBlogPostPaginatorBlogPostPaginatorHeading,
  ThemeBlogPostPaginatorBlogPostPaginatorNavAriaLabel,
  ThemeBlogPostPaginatorBlogPostPaginatorProps,
  ThemeBlogPostPaginatorNextLinkAriaLabel,
  ThemeBlogPostPaginatorNextLinkDescription,
  ThemeBlogPostPaginatorNextLinkLabel,
  ThemeBlogPostPaginatorNextLinkPermalink,
  ThemeBlogPostPaginatorNextLinkPost,
  ThemeBlogPostPaginatorNextLinkProps,
  ThemeBlogPostPaginatorPrevLinkAriaLabel,
  ThemeBlogPostPaginatorPrevLinkDescription,
  ThemeBlogPostPaginatorPrevLinkLabel,
  ThemeBlogPostPaginatorPrevLinkPermalink,
  ThemeBlogPostPaginatorPrevLinkPost,
  ThemeBlogPostPaginatorPrevLinkProps,
} from '../../types/theme/BlogPostPaginator/index.d.ts';

/**
 * Theme - Blog Post Paginator - Prev Link.
 *
 * Renders the "Go back" link to the previous post with title,
 * left-arrow icon, and an optional description excerpt sourced
 * from the global plugin data.
 *
 * @param {ThemeBlogPostPaginatorPrevLinkProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function PrevLink(props: ThemeBlogPostPaginatorPrevLinkProps) {
  const label: ThemeBlogPostPaginatorPrevLinkLabel = translate({
    id: 'theme.blog.post.paginator.goBackLabel',
    message: 'Go back',
    description: 'The label for the previous post link in the blog post paginator',
  });
  const ariaLabel: ThemeBlogPostPaginatorPrevLinkAriaLabel = translate(
    {
      id: 'theme.blog.post.paginator.goBackAriaLabel',
      message: 'Go back: {title}',
      description: 'The ARIA label for the previous post link in the blog post paginator',
    },
    { title: props['prevItem']['title'] },
  );
  const permalink: ThemeBlogPostPaginatorPrevLinkPermalink = props['prevItem']['permalink'];
  const post: ThemeBlogPostPaginatorPrevLinkPost = props['blogPosts'].find((blogPost) => blogPost['permalink'] === permalink);
  const description: ThemeBlogPostPaginatorPrevLinkDescription = (post !== undefined) ? post['description'] : undefined;

  return (
    <Link
      className={(props['className'] !== undefined) ? `nova-blog-post-paginator-link ${props['className']}` : 'nova-blog-post-paginator-link'}
      {...((props['style'] !== undefined) ? { style: props['style'] } : {})}
      to={permalink}
      rel="prev"
      aria-label={ariaLabel}
    >
      <span className="nova-blog-post-paginator-label">{label}</span>
      <span className="nova-blog-post-paginator-title">
        <Icon icon="lucide:arrow-left" width="16" height="16" aria-hidden="true" />
        {props['prevItem']['title']}
      </span>
      {(description !== undefined) && (
        <span className="nova-blog-post-paginator-excerpt">{description}</span>
      )}
    </Link>
  );
}

/**
 * Theme - Blog Post Paginator - Next Link.
 *
 * Renders the "Continue reading" link to the next post with title,
 * right-arrow icon, and an optional description excerpt sourced
 * from the global plugin data.
 *
 * @param {ThemeBlogPostPaginatorNextLinkProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function NextLink(props: ThemeBlogPostPaginatorNextLinkProps) {
  const label: ThemeBlogPostPaginatorNextLinkLabel = translate({
    id: 'theme.blog.post.paginator.continueReadingLabel',
    message: 'Continue reading',
    description: 'The label for the next post link in the blog post paginator',
  });
  const ariaLabel: ThemeBlogPostPaginatorNextLinkAriaLabel = translate(
    {
      id: 'theme.blog.post.paginator.continueReadingAriaLabel',
      message: 'Continue reading: {title}',
      description: 'The ARIA label for the next post link in the blog post paginator',
    },
    { title: props['nextItem']['title'] },
  );
  const permalink: ThemeBlogPostPaginatorNextLinkPermalink = props['nextItem']['permalink'];
  const post: ThemeBlogPostPaginatorNextLinkPost = props['blogPosts'].find((blogPost) => blogPost['permalink'] === permalink);
  const description: ThemeBlogPostPaginatorNextLinkDescription = (post !== undefined) ? post['description'] : undefined;

  return (
    <Link
      className={(props['className'] !== undefined) ? `nova-blog-post-paginator-link ${props['className']}` : 'nova-blog-post-paginator-link'}
      {...((props['style'] !== undefined) ? { style: props['style'] } : {})}
      to={permalink}
      rel="next"
      data-next="true"
      aria-label={ariaLabel}
    >
      <span className="nova-blog-post-paginator-label">{label}</span>
      <span className="nova-blog-post-paginator-title">
        {props['nextItem']['title']}
        <Icon icon="lucide:arrow-right" width="16" height="16" aria-hidden="true" />
      </span>
      {(description !== undefined) && (
        <span className="nova-blog-post-paginator-excerpt">{description}</span>
      )}
    </Link>
  );
}

/**
 * Theme - Blog Post Paginator - Blog Post Paginator.
 *
 * Renders a "Keep reading" section at the bottom of a blog post
 * page with previous and next navigation links delegated to the
 * `PrevLink` and `NextLink` sub-components.
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

  return (
    <nav
      className={(props['className'] !== undefined) ? `nova-blog-post-paginator ${props['className']}` : 'nova-blog-post-paginator'}
      style={props['style']}
      aria-label={navAriaLabel}
    >
      <div className="nova-blog-post-paginator-heading">{heading}</div>
      <div className="nova-blog-post-paginator-links">
        {(props['prevItem'] !== undefined) && (
          <PrevLink prevItem={props['prevItem']} blogPosts={blogPosts} />
        )}
        {(props['nextItem'] !== undefined) && (
          <NextLink nextItem={props['nextItem']} blogPosts={blogPosts} />
        )}
      </div>
    </nav>
  );
}

export default BlogPostPaginator;
