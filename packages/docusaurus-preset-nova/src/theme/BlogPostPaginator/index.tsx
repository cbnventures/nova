import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { usePluginData } from '@docusaurus/useGlobalData';
import { Icon } from '@iconify/react/offline';

import type {
  Theme_BlogPostPaginator_Index_BlogPostPaginator_GlobalData_BlogPosts,
  Theme_BlogPostPaginator_Index_BlogPostPaginator_GlobalData,
  Theme_BlogPostPaginator_Index_BlogPostPaginator_Heading,
  Theme_BlogPostPaginator_Index_BlogPostPaginator_NavAriaLabel,
  Theme_BlogPostPaginator_Index_BlogPostPaginator_Props,
  Theme_BlogPostPaginator_Index_NextLink_AriaLabel,
  Theme_BlogPostPaginator_Index_NextLink_Description,
  Theme_BlogPostPaginator_Index_NextLink_Label,
  Theme_BlogPostPaginator_Index_NextLink_Permalink,
  Theme_BlogPostPaginator_Index_NextLink_Post,
  Theme_BlogPostPaginator_Index_NextLink_Props,
  Theme_BlogPostPaginator_Index_PrevLink_AriaLabel,
  Theme_BlogPostPaginator_Index_PrevLink_Description,
  Theme_BlogPostPaginator_Index_PrevLink_Label,
  Theme_BlogPostPaginator_Index_PrevLink_Permalink,
  Theme_BlogPostPaginator_Index_PrevLink_Post,
  Theme_BlogPostPaginator_Index_PrevLink_Props,
} from '../../types/theme/BlogPostPaginator/index.d.ts';

/**
 * Theme - Blog Post Paginator - Prev Link.
 *
 * Renders the "Go back" link to the previous post with title,
 * left-arrow icon, and an optional description excerpt sourced
 * from the global plugin data.
 *
 * @param {Theme_BlogPostPaginator_Index_PrevLink_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function PrevLink(props: Theme_BlogPostPaginator_Index_PrevLink_Props) {
  const label: Theme_BlogPostPaginator_Index_PrevLink_Label = translate({
    id: 'theme.blog.post.paginator.goBackLabel',
    message: 'Go back',
    description: 'The label for the previous post link in the blog post paginator',
  });
  const ariaLabel: Theme_BlogPostPaginator_Index_PrevLink_AriaLabel = translate(
    {
      id: 'theme.blog.post.paginator.goBackAriaLabel',
      message: 'Go back: {title}',
      description: 'The ARIA label for the previous post link in the blog post paginator',
    },
    { title: props['prevItem']['title'] },
  );
  const permalink: Theme_BlogPostPaginator_Index_PrevLink_Permalink = props['prevItem']['permalink'];
  const post: Theme_BlogPostPaginator_Index_PrevLink_Post = props['blogPosts'].find((blogPost) => blogPost['permalink'] === permalink);
  const description: Theme_BlogPostPaginator_Index_PrevLink_Description = (post !== undefined) ? post['description'] : undefined;

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
 * @param {Theme_BlogPostPaginator_Index_NextLink_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function NextLink(props: Theme_BlogPostPaginator_Index_NextLink_Props) {
  const label: Theme_BlogPostPaginator_Index_NextLink_Label = translate({
    id: 'theme.blog.post.paginator.continueReadingLabel',
    message: 'Continue reading',
    description: 'The label for the next post link in the blog post paginator',
  });
  const ariaLabel: Theme_BlogPostPaginator_Index_NextLink_AriaLabel = translate(
    {
      id: 'theme.blog.post.paginator.continueReadingAriaLabel',
      message: 'Continue reading: {title}',
      description: 'The ARIA label for the next post link in the blog post paginator',
    },
    { title: props['nextItem']['title'] },
  );
  const permalink: Theme_BlogPostPaginator_Index_NextLink_Permalink = props['nextItem']['permalink'];
  const post: Theme_BlogPostPaginator_Index_NextLink_Post = props['blogPosts'].find((blogPost) => blogPost['permalink'] === permalink);
  const description: Theme_BlogPostPaginator_Index_NextLink_Description = (post !== undefined) ? post['description'] : undefined;

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
 * @param {Theme_BlogPostPaginator_Index_BlogPostPaginator_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogPostPaginator(props: Theme_BlogPostPaginator_Index_BlogPostPaginator_Props) {
  const globalData: Theme_BlogPostPaginator_Index_BlogPostPaginator_GlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as Theme_BlogPostPaginator_Index_BlogPostPaginator_GlobalData;
  const blogPosts: Theme_BlogPostPaginator_Index_BlogPostPaginator_GlobalData_BlogPosts = (globalData['blogPosts'] ?? []);

  if (props['prevItem'] === undefined && props['nextItem'] === undefined) {
    return null;
  }

  const navAriaLabel: Theme_BlogPostPaginator_Index_BlogPostPaginator_NavAriaLabel = translate({
    id: 'theme.blog.post.paginator.navAriaLabel',
    message: 'Blog post page navigation',
    description: 'The ARIA label for the blog post paginator navigation',
  });
  const heading: Theme_BlogPostPaginator_Index_BlogPostPaginator_Heading = translate({
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
