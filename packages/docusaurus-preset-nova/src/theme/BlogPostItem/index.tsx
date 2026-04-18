import Link from '@docusaurus/Link';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ContentFooter from '@theme/ContentFooter';
import MDXContent from '@theme/MDXContent';

import type {
  ThemeBlogPostItemBlogPostItemArticleClassName,
  ThemeBlogPostItemBlogPostItemAssetsAuthorImageUrls,
  ThemeBlogPostItemBlogPostItemAuthor,
  ThemeBlogPostItemBlogPostItemAuthorImageUrl,
  ThemeBlogPostItemBlogPostItemAuthorIndex,
  ThemeBlogPostItemBlogPostItemAuthorPage,
  ThemeBlogPostItemBlogPostItemAuthorPermalink,
  ThemeBlogPostItemBlogPostItemAuthors,
  ThemeBlogPostItemBlogPostItemBlogPost,
  ThemeBlogPostItemBlogPostItemBlogShareConfig,
  ThemeBlogPostItemBlogPostItemContext,
  ThemeBlogPostItemBlogPostItemCurrentLocale,
  ThemeBlogPostItemBlogPostItemDate,
  ThemeBlogPostItemBlogPostItemDateObject,
  ThemeBlogPostItemBlogPostItemFormattedDate,
  ThemeBlogPostItemBlogPostItemFormattedReadingTime,
  ThemeBlogPostItemBlogPostItemHasShareButtons,
  ThemeBlogPostItemBlogPostItemHasTruncateMarker,
  ThemeBlogPostItemBlogPostItemIsBlogPostPage,
  ThemeBlogPostItemBlogPostItemPermalink,
  ThemeBlogPostItemBlogPostItemProps,
  ThemeBlogPostItemBlogPostItemReadingTime,
  ThemeBlogPostItemBlogPostItemReadingTimeLabel,
  ThemeBlogPostItemBlogPostItemReadMore,
  ThemeBlogPostItemBlogPostItemSharePlatforms,
  ThemeBlogPostItemBlogPostItemShareUrl,
  ThemeBlogPostItemBlogPostItemTag,
  ThemeBlogPostItemBlogPostItemTags,
  ThemeBlogPostItemBlogPostItemThemeConfig,
  ThemeBlogPostItemBlogPostItemThemeConfigCast,
  ThemeBlogPostItemBlogPostItemTitle,
} from '../../types/theme/BlogPostItem/index.d.ts';

/**
 * Theme - Blog Post Item - Blog Post Item.
 *
 * Renders a blog post entry with metadata, adapting between
 * a card view on listing pages and an open-flow view
 * on individual post pages.
 *
 * @param {ThemeBlogPostItemBlogPostItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogPostItem(props: ThemeBlogPostItemBlogPostItemProps) {
  const context: ThemeBlogPostItemBlogPostItemContext = useDocusaurusContext();
  const currentLocale: ThemeBlogPostItemBlogPostItemCurrentLocale = context['i18n']['currentLocale'];
  const blogPost: ThemeBlogPostItemBlogPostItemBlogPost = useBlogPost();
  const isBlogPostPage: ThemeBlogPostItemBlogPostItemIsBlogPostPage = blogPost['isBlogPostPage'];
  const title: ThemeBlogPostItemBlogPostItemTitle = blogPost['metadata']['title'];
  const permalink: ThemeBlogPostItemBlogPostItemPermalink = blogPost['metadata']['permalink'];
  const date: ThemeBlogPostItemBlogPostItemDate = blogPost['metadata']['date'];
  const dateObject: ThemeBlogPostItemBlogPostItemDateObject = new Date(date);
  const formattedDate: ThemeBlogPostItemBlogPostItemFormattedDate = dateObject.toLocaleDateString(currentLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const readingTime: ThemeBlogPostItemBlogPostItemReadingTime = blogPost['metadata']['readingTime'];
  const readingTimeLabel: ThemeBlogPostItemBlogPostItemReadingTimeLabel = translate(
    {
      id: 'theme.blog.post.readingTime.plurals',
      message: '{readingTime} min read',
      description: 'The label showing estimated reading time for a blog post',
    },
    { readingTime: (readingTime !== undefined) ? String(Math.ceil(readingTime)) : '' },
  );
  const formattedReadingTime: ThemeBlogPostItemBlogPostItemFormattedReadingTime = (readingTime !== undefined) ? readingTimeLabel : '';
  const hasTruncateMarker: ThemeBlogPostItemBlogPostItemHasTruncateMarker = blogPost['metadata']['hasTruncateMarker'];
  const authors: ThemeBlogPostItemBlogPostItemAuthors = blogPost['metadata']['authors'];
  const authorsImageUrls: ThemeBlogPostItemBlogPostItemAssetsAuthorImageUrls = blogPost['assets']['authorsImageUrls'];
  const tags: ThemeBlogPostItemBlogPostItemTags = blogPost['metadata']['tags'];

  const articleClassName: ThemeBlogPostItemBlogPostItemArticleClassName = (isBlogPostPage === true) ? 'nova-blog-post-item nova-blog-post-item-page' : 'nova-blog-post-item';

  const themeConfig: ThemeBlogPostItemBlogPostItemThemeConfig = useThemeConfig() as ThemeBlogPostItemBlogPostItemThemeConfigCast as ThemeBlogPostItemBlogPostItemThemeConfig;
  const blogShareConfig: ThemeBlogPostItemBlogPostItemBlogShareConfig = themeConfig['blog'] as ThemeBlogPostItemBlogPostItemBlogShareConfig;
  let sharePlatforms: ThemeBlogPostItemBlogPostItemSharePlatforms = [];

  if (
    blogShareConfig !== undefined
    && blogShareConfig['share'] !== undefined
    && blogShareConfig['share']['platforms'] !== undefined
  ) {
    sharePlatforms = blogShareConfig['share']['platforms'];
  }
  const hasShareButtons: ThemeBlogPostItemBlogPostItemHasShareButtons = (
    isBlogPostPage === true
    && sharePlatforms['length'] > 0
  );
  const shareUrl: ThemeBlogPostItemBlogPostItemShareUrl = (typeof window !== 'undefined') ? window['location']['href'] : '';
  const readMoreLabel: ThemeBlogPostItemBlogPostItemReadMore = translate({
    id: 'theme.blog.post.readMore',
    message: 'Read more',
    description: 'The label for the read more link on truncated blog posts',
  });

  return (
    <article className={articleClassName}>
      <header className="nova-blog-post-item-header">
        <time dateTime={date}>
          {formattedDate}
          {(formattedReadingTime !== '') && (
            <span className="nova-blog-post-item-reading-time">
              {formattedReadingTime}
            </span>
          )}
        </time>
        {(isBlogPostPage === true) && (
          <h1>{title}</h1>
        )}
        {(isBlogPostPage === false) && (
          <h2>
            <Link to={permalink}>{title}</Link>
          </h2>
        )}
        {(
          isBlogPostPage === true
          && authors['length'] > 0
        ) && (
          <div className="nova-blog-post-item-authors">
            {
              authors.map((author: ThemeBlogPostItemBlogPostItemAuthor, authorIndex: ThemeBlogPostItemBlogPostItemAuthorIndex) => {
                const authorImageUrl: ThemeBlogPostItemBlogPostItemAuthorImageUrl = authorsImageUrls[authorIndex] ?? author['imageURL'];
                const authorPage: ThemeBlogPostItemBlogPostItemAuthorPage = author['page'] as ThemeBlogPostItemBlogPostItemAuthorPage;
                const authorPermalink: ThemeBlogPostItemBlogPostItemAuthorPermalink = (authorPage !== null && authorPage !== undefined) ? authorPage['permalink'] : undefined;

                return (
                  <div className="nova-blog-post-item-author" key={author['name'] ?? String(authorIndex)}>
                    {(authorImageUrl !== undefined) && (
                      <img
                        src={authorImageUrl}
                        alt={author['name'] ?? ''}
                        width="32"
                        height="32"
                      />
                    )}
                    {(
                      author['name'] !== undefined
                      && authorPermalink !== undefined
                    ) && (
                      <Link className="nova-blog-post-item-author-link" to={authorPermalink}>{author['name']}</Link>
                    )}
                    {(
                      author['name'] !== undefined
                      && authorPermalink === undefined
                    ) && (
                      <span>{author['name']}</span>
                    )}
                  </div>
                );
              })
            }
          </div>
        )}
      </header>
      <div className="nova-blog-post-item-content">
        <MDXContent>{props['children']}</MDXContent>
      </div>
      {(
        isBlogPostPage === true
        && (
          tags['length'] > 0
          || hasShareButtons === true
        )
      ) && (
        <footer className="nova-blog-post-item-footer">
          <ContentFooter
            tags={tags}
            sharePlatforms={sharePlatforms}
            shareUrl={shareUrl}
          />
        </footer>
      )}
      {(
        isBlogPostPage === false
        && (
          tags['length'] > 0
          || hasTruncateMarker === true
        )
      ) && (
        <footer className="nova-blog-post-item-footer">
          {(tags['length'] > 0) && (
            <div className="nova-blog-post-item-tags">
              {tags.map((tag: ThemeBlogPostItemBlogPostItemTag) => (
                <Link className="nova-tag" to={tag['permalink']} key={tag['permalink']}>
                  {tag['label']}
                </Link>
              ))}
            </div>
          )}
          {(hasTruncateMarker === true) && (
            <Link className="nova-blog-post-item-read-more" to={permalink}>
              {readMoreLabel}
            </Link>
          )}
        </footer>
      )}
    </article>
  );
}

export default BlogPostItem;
