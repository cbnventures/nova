import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import { Icon } from '@iconify/react/offline';

import type {
  Theme_BlogSidebar_Index_BlogSidebar_AriaLabel,
  Theme_BlogSidebar_Index_BlogSidebar_AuthorsLabel,
  Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor,
  Theme_BlogSidebar_Index_BlogSidebar_BlogAuthors,
  Theme_BlogSidebar_Index_BlogSidebar_BlogConfig,
  Theme_BlogSidebar_Index_BlogSidebar_CurrentYear,
  Theme_BlogSidebar_Index_BlogSidebar_FeedUrl,
  Theme_BlogSidebar_Index_BlogSidebar_GlobalData,
  Theme_BlogSidebar_Index_BlogSidebar_GroupByYear,
  Theme_BlogSidebar_Index_BlogSidebar_Item,
  Theme_BlogSidebar_Index_BlogSidebar_ItemDate,
  Theme_BlogSidebar_Index_BlogSidebar_ItemFullYear,
  Theme_BlogSidebar_Index_BlogSidebar_ItemYear,
  Theme_BlogSidebar_Index_BlogSidebar_Props,
  Theme_BlogSidebar_Index_BlogSidebar_ShowYearHeading,
  Theme_BlogSidebar_Index_BlogSidebar_SidebarConfig,
  Theme_BlogSidebar_Index_BlogSidebar_SubscribeLabel,
  Theme_BlogSidebar_Index_BlogSidebar_ThemeConfig,
  Theme_BlogSidebar_Index_BlogSidebar_ThemeConfigCast,
} from '../../types/theme/BlogSidebar/index.d.ts';

/**
 * Theme - Blog Sidebar - Blog Sidebar.
 *
 * Renders a sidebar navigation with recent post links, an authors
 * widget from global data, and RSS/Atom subscribe links, returning
 * nothing when the sidebar is empty or not provided.
 *
 * @param {Theme_BlogSidebar_Index_BlogSidebar_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogSidebar(props: Theme_BlogSidebar_Index_BlogSidebar_Props) {
  const themeConfig: Theme_BlogSidebar_Index_BlogSidebar_ThemeConfig = useThemeConfig() as Theme_BlogSidebar_Index_BlogSidebar_ThemeConfigCast as Theme_BlogSidebar_Index_BlogSidebar_ThemeConfig;
  const blogConfig: Theme_BlogSidebar_Index_BlogSidebar_BlogConfig = themeConfig['blog'] as Theme_BlogSidebar_Index_BlogSidebar_BlogConfig;
  const sidebarConfig: Theme_BlogSidebar_Index_BlogSidebar_SidebarConfig = blogConfig['sidebar'];
  const groupByYearValue: Theme_BlogSidebar_Index_BlogSidebar_GroupByYear = (sidebarConfig['groupByYear'] ?? true);
  const globalData: Theme_BlogSidebar_Index_BlogSidebar_GlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as Theme_BlogSidebar_Index_BlogSidebar_GlobalData;
  const blogAuthors: Theme_BlogSidebar_Index_BlogSidebar_BlogAuthors = (globalData['blogAuthors'] ?? []) as Theme_BlogSidebar_Index_BlogSidebar_BlogAuthors;

  if (
    props['sidebar'] === undefined
    || props['sidebar']['items']['length'] === 0
  ) {
    return undefined;
  }

  const sidebarAriaLabel: Theme_BlogSidebar_Index_BlogSidebar_AriaLabel = translate({
    id: 'theme.blog.sidebar.ariaLabel',
    message: 'Blog sidebar',
    description: 'The ARIA label for the blog sidebar navigation',
  });
  const authorsLabel: Theme_BlogSidebar_Index_BlogSidebar_AuthorsLabel = translate({
    id: 'theme.blog.sidebar.authorsLabel',
    message: 'Authors',
    description: 'The label for the authors section in the blog sidebar',
  });
  const subscribeLabel: Theme_BlogSidebar_Index_BlogSidebar_SubscribeLabel = translate({
    id: 'theme.blog.sidebar.subscribeLabel',
    message: 'Subscribe',
    description: 'The label for the subscribe section in the blog sidebar',
  });
  const rssUrl: Theme_BlogSidebar_Index_BlogSidebar_FeedUrl = useBaseUrl('/blog/rss.xml');
  const atomUrl: Theme_BlogSidebar_Index_BlogSidebar_FeedUrl = useBaseUrl('/blog/atom.xml');

  if (groupByYearValue === true) {
    let currentYear: Theme_BlogSidebar_Index_BlogSidebar_CurrentYear = '';

    return (
      <nav
        className={(props['className'] !== undefined) ? `nova-blog-sidebar ${props['className']}` : 'nova-blog-sidebar'}
        style={props['style']}
        aria-label={sidebarAriaLabel}
      >
        <strong>{props['sidebar']['title']}</strong>
        {
          props['sidebar']['items'].map((item: Theme_BlogSidebar_Index_BlogSidebar_Item) => {
            const itemDate: Theme_BlogSidebar_Index_BlogSidebar_ItemDate = new Date(item['date']);
            const itemFullYear: Theme_BlogSidebar_Index_BlogSidebar_ItemFullYear = itemDate.getFullYear();
            const itemYear: Theme_BlogSidebar_Index_BlogSidebar_ItemYear = String(itemFullYear);
            const showYearHeading: Theme_BlogSidebar_Index_BlogSidebar_ShowYearHeading = itemYear !== currentYear;

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
              {blogAuthors.map((author: Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor) => (
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
    <nav
      className={(props['className'] !== undefined) ? `nova-blog-sidebar ${props['className']}` : 'nova-blog-sidebar'}
      style={props['style']}
      aria-label={sidebarAriaLabel}
    >
      <strong>{props['sidebar']['title']}</strong>
      <ul>
        {
          props['sidebar']['items'].map((item: Theme_BlogSidebar_Index_BlogSidebar_Item) => (
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
            {blogAuthors.map((author: Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor) => (
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
