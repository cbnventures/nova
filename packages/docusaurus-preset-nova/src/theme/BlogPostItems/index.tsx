import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme/BlogPostItem';
import { createElement } from 'react';

import type {
  ThemeBlogPostItemsBlogPostItemsProps,
  ThemeBlogPostItemsBlogPostItemsPropsItem,
  ThemeBlogPostItemsBlogPostItemsPropsItemContent,
} from '../../types/theme/BlogPostItems/index.d.ts';

/**
 * Theme - Blog Post Items - Blog Post Items.
 *
 * Maps an array of blog post content entries into individually
 * wrapped BlogPostItem components, providing each post with a
 * BlogPostProvider context for metadata access.
 *
 * @param {ThemeBlogPostItemsBlogPostItemsProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogPostItems(props: ThemeBlogPostItemsBlogPostItemsProps) {
  return (
    <>
      {
        props['items'].map((item: ThemeBlogPostItemsBlogPostItemsPropsItem) => {
          const blogPostContent: ThemeBlogPostItemsBlogPostItemsPropsItemContent = item['content'];

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
    </>
  );
}

export default BlogPostItems;
