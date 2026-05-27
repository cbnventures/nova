import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import { useBlogTagsPostsPageTitle } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItems from '@theme/BlogPostItems';
import Heading from '@theme/Heading';

import type {
  Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props,
  Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Title,
  Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_ViewAllTags,
} from '../../types/theme/BlogTagsPostsPage/index.d.ts';

/**
 * Theme - Blog Tags Posts Page - Blog Tags Posts Page.
 *
 * Renders a page listing all blog posts for a specific tag with
 * pagination and a link back to the full tags list, wrapped
 * inside the standard blog layout.
 *
 * @param {Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogTagsPostsPage(props: Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props) {
  const title: Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Title = useBlogTagsPostsPageTitle(props['tag']);
  const viewAllTags: Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_ViewAllTags = translate({
    id: 'theme.blog.tagsPostsPage.viewAllTags',
    message: 'View All Tags',
    description: 'The label for the link to the full blog tags list',
  });

  return (
    <BlogLayout
      sidebar={props['sidebar']}
      showHeader
      header={(
        <>
          <Heading as="h1">
            {title}
          </Heading>
          {(props['tag']['description'] !== undefined) && (
            <p
              className={(props['className'] !== undefined) ? `nova-blog-description ${props['className']}` : 'nova-blog-description'}
              style={props['style']}
            >
              {props['tag']['description']}
            </p>
          )}
          <Link className="nova-blog-tags-posts-all-link" href={props['tag']['allTagsPath']}>
            {viewAllTags}
          </Link>
        </>
      )}
    >
      <PageMetadata title={title} />
      <BlogPostItems items={props['items']} />
      <BlogListPaginator metadata={props['listMetadata']} />
    </BlogLayout>
  );
}

export default BlogTagsPostsPage;
