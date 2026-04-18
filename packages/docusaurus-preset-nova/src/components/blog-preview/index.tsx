import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';

import type {
  ComponentsBlogPreviewComponentsBlogPreviewContext,
  ComponentsBlogPreviewComponentsBlogPreviewCurrentLocale,
  ComponentsBlogPreviewComponentsBlogPreviewDateObject,
  ComponentsBlogPreviewComponentsBlogPreviewFormattedDate,
  ComponentsBlogPreviewComponentsBlogPreviewGlobalData,
  ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPosts,
  ComponentsBlogPreviewComponentsBlogPreviewLimitedPosts,
  ComponentsBlogPreviewComponentsBlogPreviewNoPosts,
  ComponentsBlogPreviewComponentsBlogPreviewProps,
  ComponentsBlogPreviewComponentsBlogPreviewResolvedPosts,
  ComponentsBlogPreviewComponentsBlogPreviewSectionClassName,
  ComponentsBlogPreviewComponentsBlogPreviewSortDirection,
  ComponentsBlogPreviewComponentsBlogPreviewSortedPosts,
  ComponentsBlogPreviewReadMore,
} from '../../types/components/blog-preview/index.d.ts';

/**
 * Components - Blog Preview - Components Blog Preview.
 *
 * Homepage section that displays a heading, optional description, and
 * a card grid of recent blog posts with date formatting and
 * read-more links.
 *
 * @param {ComponentsBlogPreviewComponentsBlogPreviewProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ComponentsBlogPreview(props: ComponentsBlogPreviewComponentsBlogPreviewProps) {
  const context: ComponentsBlogPreviewComponentsBlogPreviewContext = useDocusaurusContext();
  const currentLocale: ComponentsBlogPreviewComponentsBlogPreviewCurrentLocale = context['i18n']['currentLocale'];

  const sectionClassName: ComponentsBlogPreviewComponentsBlogPreviewSectionClassName = [
    'nova-blog-preview',
    (props['description'] !== undefined) ? 'nova-blog-preview-has-description' : 'nova-blog-preview-no-description',
  ].join(' ');

  const readMore: ComponentsBlogPreviewReadMore = translate({
    id: 'theme.BlogPreview.readMore',
    message: 'Read more',
    description: 'The label on the blog preview read more link',
  });

  const globalData: ComponentsBlogPreviewComponentsBlogPreviewGlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as ComponentsBlogPreviewComponentsBlogPreviewGlobalData;
  const globalBlogPosts: ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPosts = (globalData['blogPosts'] ?? []);

  const resolvedPosts: ComponentsBlogPreviewComponentsBlogPreviewResolvedPosts = (props['auto'] === true) ? globalBlogPosts : (props['posts'] ?? []);

  const sortDirection: ComponentsBlogPreviewComponentsBlogPreviewSortDirection = (props['sort'] === 'oldest') ? -1 : 1;
  const sortedPosts: ComponentsBlogPreviewComponentsBlogPreviewSortedPosts = [...resolvedPosts].sort((a, b) => {
    return sortDirection * (new Date(b['date']).getTime() - new Date(a['date']).getTime());
  });

  const limitedPosts: ComponentsBlogPreviewComponentsBlogPreviewLimitedPosts = (props['limit'] !== undefined) ? sortedPosts.slice(0, props['limit']) : sortedPosts;

  const noPosts: ComponentsBlogPreviewComponentsBlogPreviewNoPosts = translate({
    id: 'theme.BlogPreview.noPosts',
    message: 'No posts yet',
    description: 'The placeholder message shown when no blog posts are available',
  });

  return (
    <section className={sectionClassName}>
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
                const dateObject: ComponentsBlogPreviewComponentsBlogPreviewDateObject = new Date(blogPost['date']);

                const formattedDate: ComponentsBlogPreviewComponentsBlogPreviewFormattedDate = dateObject.toLocaleDateString(currentLocale, {
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
                      {blogPost['title']}
                    </Heading>
                    <p>
                      {blogPost['description']}
                    </p>
                    <Link to={blogPost['permalink']}>
                      {readMore}
                    </Link>
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
              const dateObject: ComponentsBlogPreviewComponentsBlogPreviewDateObject = new Date(blogPost['date']);

              const formattedDate: ComponentsBlogPreviewComponentsBlogPreviewFormattedDate = dateObject.toLocaleDateString(currentLocale, {
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
                    {blogPost['title']}
                  </Heading>
                  <p>
                    {blogPost['description']}
                  </p>
                  <Link to={blogPost['permalink']} aria-label={`${readMore}: ${blogPost['title']}`}>
                    {readMore}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default ComponentsBlogPreview;
