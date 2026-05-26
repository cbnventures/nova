import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import { useDateTimeFormat } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import BlogLayout from '@theme/BlogLayout';
import Heading from '@theme/Heading';

import type {
  ThemeBlogArchivePageBlogArchivePageDateTimeFormat,
  ThemeBlogArchivePageBlogArchivePageDescription,
  ThemeBlogArchivePageBlogArchivePageFormattedDate,
  ThemeBlogArchivePageBlogArchivePageHeading,
  ThemeBlogArchivePageBlogArchivePageProps,
  ThemeBlogArchivePageListPostsByYearsBlogPosts,
  ThemeBlogArchivePageListPostsByYearsExistingPosts,
  ThemeBlogArchivePageListPostsByYearsPostsByYear,
  ThemeBlogArchivePageListPostsByYearsYear,
  ThemeBlogArchivePageYearGroup,
  ThemeBlogArchivePageYearGroups,
  ThemeBlogArchivePageYearPost,
} from '../../types/theme/BlogArchivePage/index.d.ts';

/**
 * Theme - Blog Archive Page - Blog Archive Page.
 *
 * Renders a full-page blog archive grouped by year with formatted dates,
 * post titles as links, and a plain heading above each year
 * section without framework-specific layout classes.
 *
 * @param {ThemeBlogArchivePageBlogArchivePageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogArchivePage(props: ThemeBlogArchivePageBlogArchivePageProps) {
  const dateTimeFormat: ThemeBlogArchivePageBlogArchivePageDateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
  const yearGroups: ThemeBlogArchivePageYearGroups = listPostsByYears(props['archive']['blogPosts']);
  const heading: ThemeBlogArchivePageBlogArchivePageHeading = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The heading of the blog archive page',
  });
  const archiveDescription: ThemeBlogArchivePageBlogArchivePageDescription = translate({
    id: 'theme.blog.archive.description',
    message: 'Archive',
    description: 'The meta description of the blog archive page',
  });

  return (
    <BlogLayout
      showHeader
      header={<Heading as="h1">{heading}</Heading>}
    >
      <PageMetadata title={heading} description={archiveDescription} />
      <div
        className={(props['className'] !== undefined) ? `nova-blog-archive ${props['className']}` : 'nova-blog-archive'}
        style={props['style']}
      >
        {
          yearGroups.map((yearGroup: ThemeBlogArchivePageYearGroup) => (
            <section key={yearGroup['year']}>
              <Heading as="h3">
                {yearGroup['year']}
              </Heading>
              <ul>
                {
                  yearGroup['posts'].map((post: ThemeBlogArchivePageYearPost) => {
                    const formattedDate: ThemeBlogArchivePageBlogArchivePageFormattedDate = dateTimeFormat.format(new Date(post['metadata']['date']));

                    return (
                      <li key={post['metadata']['date']}>
                        <Link to={post['metadata']['permalink']}>
                          {formattedDate}
                          {' - '}
                          {post['metadata']['title']}
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
            </section>
          ))
        }
      </div>
    </BlogLayout>
  );
}

/**
 * Theme - Blog Archive Page - List Posts By Years.
 *
 * Groups an array of blog posts by their publication year,
 * sorting each year group in reverse chronological order
 * and returning an array of year-post pairs.
 *
 * @param {ThemeBlogArchivePageListPostsByYearsBlogPosts} blogPosts - Blog posts.
 *
 * @returns {ThemeBlogArchivePageYearGroups} Year groups.
 *
 * @since 0.15.0
 */
function listPostsByYears(blogPosts: ThemeBlogArchivePageListPostsByYearsBlogPosts): ThemeBlogArchivePageYearGroups {
  const postsByYear: ThemeBlogArchivePageListPostsByYearsPostsByYear = new Map();

  for (const post of blogPosts) {
    const year: ThemeBlogArchivePageListPostsByYearsYear = String(post['metadata']['date']).split('-')[0] ?? '';
    const existingPosts: ThemeBlogArchivePageListPostsByYearsExistingPosts = postsByYear.get(year) ?? [];

    postsByYear.set(year, [
      post,
      ...existingPosts,
    ]);
  }

  return Array.from(postsByYear, ([
    year,
    posts,
  ]) => ({
    year,
    posts,
  }));
}

export default BlogArchivePage;
