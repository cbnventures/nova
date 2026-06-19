import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';

import type {
  Blocks_BlogPreview_Index_BlocksBlogPreview_Context,
  Blocks_BlogPreview_Index_BlocksBlogPreview_CurrentLocale,
  Blocks_BlogPreview_Index_BlocksBlogPreview_DateObject,
  Blocks_BlogPreview_Index_BlocksBlogPreview_FormattedDate,
  Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalData,
  Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalData_BlogPosts,
  Blocks_BlogPreview_Index_BlocksBlogPreview_LimitedPosts,
  Blocks_BlogPreview_Index_BlocksBlogPreview_NoPosts,
  Blocks_BlogPreview_Index_BlocksBlogPreview_Props,
  Blocks_BlogPreview_Index_BlocksBlogPreview_ReadMore,
  Blocks_BlogPreview_Index_BlocksBlogPreview_ResolvedPosts,
  Blocks_BlogPreview_Index_BlocksBlogPreview_SectionClassName,
  Blocks_BlogPreview_Index_BlocksBlogPreview_SortDirection,
  Blocks_BlogPreview_Index_BlocksBlogPreview_SortedPosts,
} from '../../types/blocks/blog-preview/index.d.ts';

/**
 * Blocks - Blog Preview - Blocks Blog Preview.
 *
 * Homepage section that displays a heading, optional description, and
 * a card grid of recent blog posts with date formatting and
 * read-more links.
 *
 * @param {Blocks_BlogPreview_Index_BlocksBlogPreview_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksBlogPreview(props: Blocks_BlogPreview_Index_BlocksBlogPreview_Props) {
  const context: Blocks_BlogPreview_Index_BlocksBlogPreview_Context = useDocusaurusContext();
  const currentLocale: Blocks_BlogPreview_Index_BlocksBlogPreview_CurrentLocale = context['i18n']['currentLocale'];

  const baseClassName: Blocks_BlogPreview_Index_BlocksBlogPreview_SectionClassName = [
    'nova-blog-preview',
    (props['description'] !== undefined) ? 'nova-blog-preview-has-description' : 'nova-blog-preview-no-description',
  ].join(' ');
  const sectionClassName: Blocks_BlogPreview_Index_BlocksBlogPreview_SectionClassName = (props['className'] !== undefined) ? `${baseClassName} ${props['className']}` : baseClassName;

  const readMore: Blocks_BlogPreview_Index_BlocksBlogPreview_ReadMore = translate({
    id: 'theme.BlogPreview.readMore',
    message: 'Read more',
    description: 'The label on the blog preview read more link',
  });

  const globalData: Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalData;
  const globalBlogPosts: Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalData_BlogPosts = (globalData['blogPosts'] ?? []);

  const resolvedPosts: Blocks_BlogPreview_Index_BlocksBlogPreview_ResolvedPosts = (props['auto'] === true) ? globalBlogPosts : (props['posts'] ?? []);

  const sortDirection: Blocks_BlogPreview_Index_BlocksBlogPreview_SortDirection = (props['sort'] === 'oldest') ? -1 : 1;
  const sortedPosts: Blocks_BlogPreview_Index_BlocksBlogPreview_SortedPosts = [...resolvedPosts].sort((a, b) => {
    return sortDirection * (new Date(b['date']).getTime() - new Date(a['date']).getTime());
  });

  const limitedPosts: Blocks_BlogPreview_Index_BlocksBlogPreview_LimitedPosts = (props['limit'] !== undefined) ? sortedPosts.slice(0, props['limit']) : sortedPosts;

  const noPosts: Blocks_BlogPreview_Index_BlocksBlogPreview_NoPosts = translate({
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
                const dateObject: Blocks_BlogPreview_Index_BlocksBlogPreview_DateObject = new Date(blogPost['date']);

                const formattedDate: Blocks_BlogPreview_Index_BlocksBlogPreview_FormattedDate = dateObject.toLocaleDateString(currentLocale, {
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
              const dateObject: Blocks_BlogPreview_Index_BlocksBlogPreview_DateObject = new Date(blogPost['date']);

              const formattedDate: Blocks_BlogPreview_Index_BlocksBlogPreview_FormattedDate = dateObject.toLocaleDateString(currentLocale, {
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
