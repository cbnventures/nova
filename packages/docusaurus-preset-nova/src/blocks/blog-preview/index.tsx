import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';

import type {
  BlocksBlogPreviewBlocksBlogPreviewContext,
  BlocksBlogPreviewBlocksBlogPreviewCurrentLocale,
  BlocksBlogPreviewBlocksBlogPreviewDateObject,
  BlocksBlogPreviewBlocksBlogPreviewFormattedDate,
  BlocksBlogPreviewBlocksBlogPreviewGlobalData,
  BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPosts,
  BlocksBlogPreviewBlocksBlogPreviewLimitedPosts,
  BlocksBlogPreviewBlocksBlogPreviewNoPosts,
  BlocksBlogPreviewBlocksBlogPreviewProps,
  BlocksBlogPreviewBlocksBlogPreviewResolvedPosts,
  BlocksBlogPreviewBlocksBlogPreviewSectionClassName,
  BlocksBlogPreviewBlocksBlogPreviewSortDirection,
  BlocksBlogPreviewBlocksBlogPreviewSortedPosts,
  BlocksBlogPreviewReadMore,
} from '../../types/blocks/blog-preview/index.d.ts';

/**
 * Blocks - Blog Preview - Blocks Blog Preview.
 *
 * Homepage section that displays a heading, optional description, and
 * a card grid of recent blog posts with date formatting and
 * read-more links.
 *
 * @param {BlocksBlogPreviewBlocksBlogPreviewProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksBlogPreview(props: BlocksBlogPreviewBlocksBlogPreviewProps) {
  const context: BlocksBlogPreviewBlocksBlogPreviewContext = useDocusaurusContext();
  const currentLocale: BlocksBlogPreviewBlocksBlogPreviewCurrentLocale = context['i18n']['currentLocale'];

  const baseClassName: BlocksBlogPreviewBlocksBlogPreviewSectionClassName = [
    'nova-blog-preview',
    (props['description'] !== undefined) ? 'nova-blog-preview-has-description' : 'nova-blog-preview-no-description',
  ].join(' ');
  const sectionClassName: BlocksBlogPreviewBlocksBlogPreviewSectionClassName = (props['className'] !== undefined) ? `${baseClassName} ${props['className']}` : baseClassName;

  const readMore: BlocksBlogPreviewReadMore = translate({
    id: 'theme.BlogPreview.readMore',
    message: 'Read more',
    description: 'The label on the blog preview read more link',
  });

  const globalData: BlocksBlogPreviewBlocksBlogPreviewGlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as BlocksBlogPreviewBlocksBlogPreviewGlobalData;
  const globalBlogPosts: BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPosts = (globalData['blogPosts'] ?? []);

  const resolvedPosts: BlocksBlogPreviewBlocksBlogPreviewResolvedPosts = (props['auto'] === true) ? globalBlogPosts : (props['posts'] ?? []);

  const sortDirection: BlocksBlogPreviewBlocksBlogPreviewSortDirection = (props['sort'] === 'oldest') ? -1 : 1;
  const sortedPosts: BlocksBlogPreviewBlocksBlogPreviewSortedPosts = [...resolvedPosts].sort((a, b) => {
    return sortDirection * (new Date(b['date']).getTime() - new Date(a['date']).getTime());
  });

  const limitedPosts: BlocksBlogPreviewBlocksBlogPreviewLimitedPosts = (props['limit'] !== undefined) ? sortedPosts.slice(0, props['limit']) : sortedPosts;

  const noPosts: BlocksBlogPreviewBlocksBlogPreviewNoPosts = translate({
    id: 'theme.BlogPreview.noPosts',
    message: 'No posts yet',
    description: 'The placeholder message shown when no blog posts are available',
  });

  return (
    <section
      className={sectionClassName}
      style={props['style']}
    >
      {(props['surface'] === 'alt') ? (
        <div className="nova-surface-alt">
          <div className="nova-blog-preview-inner nova-container">
            <Heading as="h2" className="nova-blog-preview-heading">
              {props['heading']}
            </Heading>
            {(props['description'] !== undefined) && (
              <p className="nova-blog-preview-description">
                {props['description']}
              </p>
            )}
            <div className="nova-blog-preview-grid nova-grid">
              {(limitedPosts['length'] === 0) ? (
                <p className="nova-blog-preview-no-posts nova-col-12">{noPosts}</p>
              ) : limitedPosts.map((blogPost) => {
                const dateObject: BlocksBlogPreviewBlocksBlogPreviewDateObject = new Date(blogPost['date']);

                const formattedDate: BlocksBlogPreviewBlocksBlogPreviewFormattedDate = dateObject.toLocaleDateString(currentLocale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <div className="nova-blog-preview-card nova-col-12 nova-col-md-4" key={blogPost['permalink']}>
                    <time dateTime={blogPost['date']}>
                      {formattedDate}
                    </time>
                    <Heading as="h3">
                      <Link to={blogPost['permalink']}>
                        {blogPost['title']}
                      </Link>
                    </Heading>
                    <p>
                      {blogPost['description']}
                    </p>
                    <span className="nova-blog-preview-read-more" aria-hidden="true">
                      {readMore}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="nova-blog-preview-inner nova-container">
          <Heading as="h2" className="nova-blog-preview-heading">
            {props['heading']}
          </Heading>
          {(props['description'] !== undefined) && (
            <p className="nova-blog-preview-description">
              {props['description']}
            </p>
          )}
          <div className="nova-blog-preview-grid nova-grid">
            {(limitedPosts['length'] === 0) ? (
              <p className="nova-blog-preview-no-posts nova-col-12">{noPosts}</p>
            ) : limitedPosts.map((blogPost) => {
              const dateObject: BlocksBlogPreviewBlocksBlogPreviewDateObject = new Date(blogPost['date']);

              const formattedDate: BlocksBlogPreviewBlocksBlogPreviewFormattedDate = dateObject.toLocaleDateString(currentLocale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <div className="nova-blog-preview-card nova-col-12 nova-col-md-4" key={blogPost['permalink']}>
                  <time dateTime={blogPost['date']}>
                    {formattedDate}
                  </time>
                  <Heading as="h3">
                    <Link to={blogPost['permalink']}>
                      {blogPost['title']}
                    </Link>
                  </Heading>
                  <p>
                    {blogPost['description']}
                  </p>
                  <span className="nova-blog-preview-read-more" aria-hidden="true">
                    {readMore}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default BlocksBlogPreview;
