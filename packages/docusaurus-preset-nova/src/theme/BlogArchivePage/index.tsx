import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import { useDateTimeFormat } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import BlogLayout from '@theme/BlogLayout';
import Heading from '@theme/Heading';

import type {
  Theme_BlogArchivePage_Index_BlogArchivePage_DateTimeFormat,
  Theme_BlogArchivePage_Index_BlogArchivePage_Description,
  Theme_BlogArchivePage_Index_BlogArchivePage_FormattedDate,
  Theme_BlogArchivePage_Index_BlogArchivePage_Heading,
  Theme_BlogArchivePage_Index_BlogArchivePage_Props,
  Theme_BlogArchivePage_Index_ListPostsByYears_BlogPosts,
  Theme_BlogArchivePage_Index_ListPostsByYears_ExistingPosts,
  Theme_BlogArchivePage_Index_ListPostsByYears_PostsByYear,
  Theme_BlogArchivePage_Index_ListPostsByYears_Year,
  Theme_BlogArchivePage_Index_BlogArchivePage_YearGroup,
  Theme_BlogArchivePage_Index_BlogArchivePage_YearGroups,
  Theme_BlogArchivePage_Index_BlogArchivePage_YearPost,
} from '../../types/theme/BlogArchivePage/index.d.ts';

/**
 * Theme - Blog Archive Page - Blog Archive Page.
 *
 * Renders a full-page blog archive grouped by year with formatted dates,
 * post titles as links, and a plain heading above each year
 * section without framework-specific layout classes.
 *
 * @param {Theme_BlogArchivePage_Index_BlogArchivePage_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogArchivePage(props: Theme_BlogArchivePage_Index_BlogArchivePage_Props) {
  const dateTimeFormat: Theme_BlogArchivePage_Index_BlogArchivePage_DateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
  const yearGroups: Theme_BlogArchivePage_Index_BlogArchivePage_YearGroups = listPostsByYears(props['archive']['blogPosts']);
  const heading: Theme_BlogArchivePage_Index_BlogArchivePage_Heading = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The heading of the blog archive page',
  });
  const archiveDescription: Theme_BlogArchivePage_Index_BlogArchivePage_Description = translate({
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
          yearGroups.map((yearGroup: Theme_BlogArchivePage_Index_BlogArchivePage_YearGroup) => (
            <section key={yearGroup['year']}>
              <Heading as="h3">
                {yearGroup['year']}
              </Heading>
              <ul>
                {
                  yearGroup['posts'].map((post: Theme_BlogArchivePage_Index_BlogArchivePage_YearPost) => {
                    const formattedDate: Theme_BlogArchivePage_Index_BlogArchivePage_FormattedDate = dateTimeFormat.format(new Date(post['metadata']['date']));

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
 * @param {Theme_BlogArchivePage_Index_ListPostsByYears_BlogPosts} blogPosts - Blog posts.
 *
 * @returns {Theme_BlogArchivePage_Index_BlogArchivePage_YearGroups} Year groups.
 *
 * @since 0.15.0
 */
function listPostsByYears(blogPosts: Theme_BlogArchivePage_Index_ListPostsByYears_BlogPosts): Theme_BlogArchivePage_Index_BlogArchivePage_YearGroups {
  const postsByYear: Theme_BlogArchivePage_Index_ListPostsByYears_PostsByYear = new Map();

  for (const post of blogPosts) {
    const year: Theme_BlogArchivePage_Index_ListPostsByYears_Year = String(post['metadata']['date']).split('-')[0] ?? '';
    const existingPosts: Theme_BlogArchivePage_Index_ListPostsByYears_ExistingPosts = postsByYear.get(year) ?? [];

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
