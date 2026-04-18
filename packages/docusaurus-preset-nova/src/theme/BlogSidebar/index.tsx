import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import { Icon } from '@iconify/react/offline';

import type {
  ThemeBlogSidebarBlogSidebarAriaLabel,
  ThemeBlogSidebarBlogSidebarAuthorsLabel,
  ThemeBlogSidebarBlogSidebarBlogAuthor,
  ThemeBlogSidebarBlogSidebarBlogAuthors,
  ThemeBlogSidebarBlogSidebarBlogConfig,
  ThemeBlogSidebarBlogSidebarCurrentYear,
  ThemeBlogSidebarBlogSidebarFeedUrl,
  ThemeBlogSidebarBlogSidebarGlobalData,
  ThemeBlogSidebarBlogSidebarGroupByYear,
  ThemeBlogSidebarBlogSidebarItem,
  ThemeBlogSidebarBlogSidebarItemDate,
  ThemeBlogSidebarBlogSidebarItemFullYear,
  ThemeBlogSidebarBlogSidebarItemYear,
  ThemeBlogSidebarBlogSidebarProps,
  ThemeBlogSidebarBlogSidebarShowYearHeading,
  ThemeBlogSidebarBlogSidebarSidebarConfig,
  ThemeBlogSidebarBlogSidebarSubscribeLabel,
  ThemeBlogSidebarBlogSidebarThemeConfig,
  ThemeBlogSidebarBlogSidebarThemeConfigCast,
} from '../../types/theme/BlogSidebar/index.d.ts';

/**
 * Theme - Blog Sidebar - Blog Sidebar.
 *
 * Renders a sidebar navigation with recent post links, an authors
 * widget from global data, and RSS/Atom subscribe links, returning
 * nothing when the sidebar is empty or not provided.
 *
 * @param {ThemeBlogSidebarBlogSidebarProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogSidebar(props: ThemeBlogSidebarBlogSidebarProps) {
  const themeConfig: ThemeBlogSidebarBlogSidebarThemeConfig = useThemeConfig() as ThemeBlogSidebarBlogSidebarThemeConfigCast as ThemeBlogSidebarBlogSidebarThemeConfig;
  const blogConfig: ThemeBlogSidebarBlogSidebarBlogConfig = themeConfig['blog'] as ThemeBlogSidebarBlogSidebarBlogConfig;
  const sidebarConfig: ThemeBlogSidebarBlogSidebarSidebarConfig = blogConfig['sidebar'];
  const groupByYearValue: ThemeBlogSidebarBlogSidebarGroupByYear = (sidebarConfig['groupByYear'] ?? true);
  const globalData: ThemeBlogSidebarBlogSidebarGlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as ThemeBlogSidebarBlogSidebarGlobalData;
  const blogAuthors: ThemeBlogSidebarBlogSidebarBlogAuthors = (globalData['blogAuthors'] ?? []) as ThemeBlogSidebarBlogSidebarBlogAuthors;

  if (
    props['sidebar'] === undefined
    || props['sidebar']['items']['length'] === 0
  ) {
    return undefined;
  }

  const sidebarAriaLabel: ThemeBlogSidebarBlogSidebarAriaLabel = translate({
    id: 'theme.blog.sidebar.ariaLabel',
    message: 'Blog sidebar',
    description: 'The ARIA label for the blog sidebar navigation',
  });
  const authorsLabel: ThemeBlogSidebarBlogSidebarAuthorsLabel = translate({
    id: 'theme.blog.sidebar.authorsLabel',
    message: 'Authors',
    description: 'The label for the authors section in the blog sidebar',
  });
  const subscribeLabel: ThemeBlogSidebarBlogSidebarSubscribeLabel = translate({
    id: 'theme.blog.sidebar.subscribeLabel',
    message: 'Subscribe',
    description: 'The label for the subscribe section in the blog sidebar',
  });
  const rssUrl: ThemeBlogSidebarBlogSidebarFeedUrl = useBaseUrl('/blog/rss.xml');
  const atomUrl: ThemeBlogSidebarBlogSidebarFeedUrl = useBaseUrl('/blog/atom.xml');

  if (groupByYearValue === true) {
    let currentYear: ThemeBlogSidebarBlogSidebarCurrentYear = '';

    return (
      <nav className="nova-blog-sidebar" aria-label={sidebarAriaLabel}>
        <strong>{props['sidebar']['title']}</strong>
        {
          props['sidebar']['items'].map((item: ThemeBlogSidebarBlogSidebarItem) => {
            const itemDate: ThemeBlogSidebarBlogSidebarItemDate = new Date(item['date']);
            const itemFullYear: ThemeBlogSidebarBlogSidebarItemFullYear = itemDate.getFullYear();
            const itemYear: ThemeBlogSidebarBlogSidebarItemYear = String(itemFullYear);
            const showYearHeading: ThemeBlogSidebarBlogSidebarShowYearHeading = itemYear !== currentYear;

            if (showYearHeading === true) {
              currentYear = itemYear;
            }

            return (
              <div key={item['permalink']}>
                {(showYearHeading === true) && (
                  <h4>{itemYear}</h4>
                )}
                <ul>
                  <li>
                    <Link to={item['permalink']}>
                      {item['title']}
                    </Link>
                  </li>
                </ul>
              </div>
            );
          })
        }
        {(blogAuthors['length'] > 0) && (
          <div className="nova-blog-sidebar-authors">
            <strong>{authorsLabel}</strong>
            <ul>
              {blogAuthors.map((author: ThemeBlogSidebarBlogSidebarBlogAuthor) => (
                <li key={author['key']}>
                  {(author['permalink'] !== undefined) && (
                    <Link to={author['permalink']} className="nova-blog-sidebar-author">
                      {(author['imageURL'] !== undefined) && (
                        <img src={author['imageURL']} alt={author['name'] ?? ''} width="20" height="20" />
                      )}
                      {(author['name'] !== undefined) ? author['name'] : author['key']}
                    </Link>
                  )}
                  {(author['permalink'] === undefined) && (
                    <span className="nova-blog-sidebar-author">
                      {(author['imageURL'] !== undefined) && (
                        <img src={author['imageURL']} alt={author['name'] ?? ''} width="20" height="20" />
                      )}
                      {(author['name'] !== undefined) ? author['name'] : author['key']}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="nova-blog-sidebar-subscribe">
          <strong>{subscribeLabel}</strong>
          <ul>
            <li>
              <a href={rssUrl} className="nova-blog-sidebar-feed-link">
                <Icon icon="lucide:rss" width="14" height="14" aria-hidden="true" />
                RSS
              </a>
            </li>
            <li>
              <a href={atomUrl} className="nova-blog-sidebar-feed-link">
                <Icon icon="lucide:rss" width="14" height="14" aria-hidden="true" />
                Atom
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="nova-blog-sidebar nova-col-12 nova-col-lg-3" aria-label={sidebarAriaLabel}>
      <strong>{props['sidebar']['title']}</strong>
      <ul>
        {
          props['sidebar']['items'].map((item: ThemeBlogSidebarBlogSidebarItem) => (
            <li key={item['permalink']}>
              <Link to={item['permalink']}>
                {item['title']}
              </Link>
            </li>
          ))
        }
      </ul>
      {(blogAuthors['length'] > 0) && (
        <div className="nova-blog-sidebar-authors">
          <strong>{authorsLabel}</strong>
          <ul>
            {blogAuthors.map((author: ThemeBlogSidebarBlogSidebarBlogAuthor) => (
              <li key={author['key']}>
                {(author['permalink'] !== undefined) && (
                  <Link to={author['permalink']} className="nova-blog-sidebar-author">
                    {(author['imageURL'] !== undefined) && (
                      <img src={author['imageURL']} alt={author['name'] ?? ''} width="20" height="20" />
                    )}
                    {(author['name'] !== undefined) ? author['name'] : author['key']}
                  </Link>
                )}
                {(author['permalink'] === undefined) && (
                  <span className="nova-blog-sidebar-author">
                    {(author['imageURL'] !== undefined) && (
                      <img src={author['imageURL']} alt={author['name'] ?? ''} width="20" height="20" />
                    )}
                    {(author['name'] !== undefined) ? author['name'] : author['key']}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="nova-blog-sidebar-subscribe">
        <strong>{subscribeLabel}</strong>
        <ul>
          <li>
            <Link to="/blog/rss.xml" className="nova-blog-sidebar-feed-link">
              <Icon icon="lucide:rss" width="14" height="14" aria-hidden="true" />
              RSS
            </Link>
          </li>
          <li>
            <Link to="/blog/atom.xml" className="nova-blog-sidebar-feed-link">
              <Icon icon="lucide:rss" width="14" height="14" aria-hidden="true" />
              Atom
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default BlogSidebar;
