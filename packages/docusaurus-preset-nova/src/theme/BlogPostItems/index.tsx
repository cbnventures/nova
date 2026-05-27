import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme/BlogPostItem';
import { createElement } from 'react';

import type {
  Theme_BlogPostItems_Index_BlogPostItems_Props,
  Theme_BlogPostItems_Index_BlogPostItems_PropsItem,
  Theme_BlogPostItems_Index_BlogPostItems_PropsItem_Content,
} from '../../types/theme/BlogPostItems/index.d.ts';

/**
 * Theme - Blog Post Items - Blog Post Items.
 *
 * Maps an array of blog post content entries into individually
 * wrapped BlogPostItem components, providing each post with a
 * BlogPostProvider context for metadata access.
 *
 * @param {Theme_BlogPostItems_Index_BlogPostItems_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogPostItems(props: Theme_BlogPostItems_Index_BlogPostItems_Props) {
  return (
    <div
      className={(props['className'] !== undefined) ? `nova-blog-post-items ${props['className']}` : 'nova-blog-post-items'}
      style={props['style']}
    >
      {
        props['items'].map((item: Theme_BlogPostItems_Index_BlogPostItems_PropsItem) => {
          const blogPostContent: Theme_BlogPostItems_Index_BlogPostItems_PropsItem_Content = item['content'];

          return (
            <BlogPostProvider
              key={blogPostContent['metadata']['permalink']}
              content={blogPostContent}
            >
              <BlogPostItem>
                {createElement(blogPostContent)}
              </BlogPostItem>
            </BlogPostProvider>
          );
        })
      }
    </div>
  );
}

export default BlogPostItems;
