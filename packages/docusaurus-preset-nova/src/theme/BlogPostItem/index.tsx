import Link from '@docusaurus/Link';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ContentFooter from '@theme/ContentFooter';
import MDXContent from '@theme/MDXContent';

import type {
  Theme_BlogPostItem_Index_BlogPostItem_ArticleClassName,
  Theme_BlogPostItem_Index_BlogPostItem_AssetsAuthorImageUrls,
  Theme_BlogPostItem_Index_BlogPostItem_Author,
  Theme_BlogPostItem_Index_BlogPostItem_AuthorImageUrl,
  Theme_BlogPostItem_Index_BlogPostItem_AuthorIndex,
  Theme_BlogPostItem_Index_BlogPostItem_AuthorPage,
  Theme_BlogPostItem_Index_BlogPostItem_AuthorPermalink,
  Theme_BlogPostItem_Index_BlogPostItem_Authors,
  Theme_BlogPostItem_Index_BlogPostItem_BlogPost,
  Theme_BlogPostItem_Index_BlogPostItem_Context,
  Theme_BlogPostItem_Index_BlogPostItem_CurrentLocale,
  Theme_BlogPostItem_Index_BlogPostItem_Date,
  Theme_BlogPostItem_Index_BlogPostItem_DateObject,
  Theme_BlogPostItem_Index_BlogPostItem_FormattedDate,
  Theme_BlogPostItem_Index_BlogPostItem_FormattedReadingTime,
  Theme_BlogPostItem_Index_BlogPostItem_HasShareButtons,
  Theme_BlogPostItem_Index_BlogPostItem_HasTruncateMarker,
  Theme_BlogPostItem_Index_BlogPostItem_IsBlogPostPage,
  Theme_BlogPostItem_Index_BlogPostItem_Permalink,
  Theme_BlogPostItem_Index_BlogPostItem_Props,
  Theme_BlogPostItem_Index_BlogPostItem_ReadingTime,
  Theme_BlogPostItem_Index_BlogPostItem_ReadingTimeLabel,
  Theme_BlogPostItem_Index_BlogPostItem_ReadMore,
  Theme_BlogPostItem_Index_BlogPostItem_ReadMoreAriaLabel,
  Theme_BlogPostItem_Index_BlogPostItem_ShareUrl,
  Theme_BlogPostItem_Index_BlogPostItem_Tag,
  Theme_BlogPostItem_Index_BlogPostItem_Tags,
  Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig,
  Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog,
  Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog_Share_Platforms,
  Theme_BlogPostItem_Index_BlogPostItem_ThemeConfigCast,
  Theme_BlogPostItem_Index_BlogPostItem_Title,
} from '../../types/theme/BlogPostItem/index.d.ts';

/**
 * Theme - Blog Post Item - Blog Post Item.
 *
 * Renders a blog post entry with metadata, adapting between
 * a card view on listing pages and an open-flow view
 * on individual post pages.
 *
 * @param {Theme_BlogPostItem_Index_BlogPostItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogPostItem(props: Theme_BlogPostItem_Index_BlogPostItem_Props) {
  const context: Theme_BlogPostItem_Index_BlogPostItem_Context = useDocusaurusContext();
  const currentLocale: Theme_BlogPostItem_Index_BlogPostItem_CurrentLocale = context['i18n']['currentLocale'];
  const blogPost: Theme_BlogPostItem_Index_BlogPostItem_BlogPost = useBlogPost();
  const isBlogPostPage: Theme_BlogPostItem_Index_BlogPostItem_IsBlogPostPage = blogPost['isBlogPostPage'];
  const title: Theme_BlogPostItem_Index_BlogPostItem_Title = blogPost['metadata']['title'];
  const permalink: Theme_BlogPostItem_Index_BlogPostItem_Permalink = blogPost['metadata']['permalink'];
  const date: Theme_BlogPostItem_Index_BlogPostItem_Date = blogPost['metadata']['date'];
  const dateObject: Theme_BlogPostItem_Index_BlogPostItem_DateObject = new Date(date);
  const formattedDate: Theme_BlogPostItem_Index_BlogPostItem_FormattedDate = dateObject.toLocaleDateString(currentLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const readingTime: Theme_BlogPostItem_Index_BlogPostItem_ReadingTime = blogPost['metadata']['readingTime'];
  const readingTimeLabel: Theme_BlogPostItem_Index_BlogPostItem_ReadingTimeLabel = translate(
    {
      id: 'theme.blog.post.readingTime.plurals',
      message: '{readingTime} min read',
      description: 'The label showing estimated reading time for a blog post',
    },
    { readingTime: (readingTime !== undefined) ? String(Math.ceil(readingTime)) : '' },
  );
  const formattedReadingTime: Theme_BlogPostItem_Index_BlogPostItem_FormattedReadingTime = (readingTime !== undefined) ? readingTimeLabel : '';
  const hasTruncateMarker: Theme_BlogPostItem_Index_BlogPostItem_HasTruncateMarker = blogPost['metadata']['hasTruncateMarker'];
  const authors: Theme_BlogPostItem_Index_BlogPostItem_Authors = blogPost['metadata']['authors'];
  const authorsImageUrls: Theme_BlogPostItem_Index_BlogPostItem_AssetsAuthorImageUrls = blogPost['assets']['authorsImageUrls'];
  const tags: Theme_BlogPostItem_Index_BlogPostItem_Tags = blogPost['metadata']['tags'];

  const articleClassName: Theme_BlogPostItem_Index_BlogPostItem_ArticleClassName = (isBlogPostPage === true) ? 'nova-blog-post-item nova-blog-post-item-page' : 'nova-blog-post-item';

  const themeConfig: Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig = useThemeConfig() as Theme_BlogPostItem_Index_BlogPostItem_ThemeConfigCast as Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig;
  const blogShareConfig: Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog = themeConfig['blog'] as Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog;
  let sharePlatforms: Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog_Share_Platforms = [];

  if (
    blogShareConfig !== undefined
    && blogShareConfig['share'] !== undefined
    && blogShareConfig['share']['platforms'] !== undefined
  ) {
    sharePlatforms = blogShareConfig['share']['platforms'];
  }
  const hasShareButtons: Theme_BlogPostItem_Index_BlogPostItem_HasShareButtons = (
    isBlogPostPage === true
    && sharePlatforms['length'] > 0
  );
  const shareUrl: Theme_BlogPostItem_Index_BlogPostItem_ShareUrl = (typeof window !== 'undefined') ? window['location']['href'] : '';
  const readMoreLabel: Theme_BlogPostItem_Index_BlogPostItem_ReadMore = translate({
    id: 'theme.blog.post.readMore',
    message: 'Read more',
    description: 'The label for the read more link on truncated blog posts',
  });
  const readMoreAriaLabel: Theme_BlogPostItem_Index_BlogPostItem_ReadMoreAriaLabel = translate(
    {
      id: 'theme.blog.post.readMoreLabel',
      message: 'Read more about {title}',
      description: 'The ARIA label for the read more link on truncated blog posts, naming the destination post',
    },
    { title },
  );

  return (
    <article
      className={(props['className'] !== undefined) ? `${articleClassName} ${props['className']}` : articleClassName}
      style={props['style']}
    >
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
              authors.map((author: Theme_BlogPostItem_Index_BlogPostItem_Author, authorIndex: Theme_BlogPostItem_Index_BlogPostItem_AuthorIndex) => {
                const authorImageUrl: Theme_BlogPostItem_Index_BlogPostItem_AuthorImageUrl = authorsImageUrls[authorIndex] ?? author['imageURL'];
                const authorPage: Theme_BlogPostItem_Index_BlogPostItem_AuthorPage = author['page'] as Theme_BlogPostItem_Index_BlogPostItem_AuthorPage;
                const authorPermalink: Theme_BlogPostItem_Index_BlogPostItem_AuthorPermalink = (authorPage !== null && authorPage !== undefined) ? authorPage['permalink'] : undefined;

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
              {tags.map((tag: Theme_BlogPostItem_Index_BlogPostItem_Tag) => (
                <Link className="nova-tag" to={tag['permalink']} key={tag['permalink']}>
                  {tag['label']}
                </Link>
              ))}
            </div>
          )}
          {(hasTruncateMarker === true) && (
            <Link className="nova-blog-post-item-read-more" to={permalink} aria-label={readMoreAriaLabel}>
              {readMoreLabel}
            </Link>
          )}
        </footer>
      )}
    </article>
  );
}

export default BlogPostItem;
