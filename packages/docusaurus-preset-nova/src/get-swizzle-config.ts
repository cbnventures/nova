import type { GetSwizzleConfigGetSwizzleConfigReturns } from './types/get-swizzle-config.d.ts';

/**
 * Get Swizzle Config - Get Swizzle Config.
 *
 * Returns the swizzle configuration that declares which theme components are safe to eject
 * or wrap and which should remain untouched.
 *
 * @returns {GetSwizzleConfigGetSwizzleConfigReturns}
 *
 * @since 0.15.0
 */
export function getSwizzleConfig(): GetSwizzleConfigGetSwizzleConfigReturns {
  return {
    components: {
      'Admonition': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'AnnouncementBar': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BackToTopButton': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Blog/Pages/BlogAuthorsListPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Blog/Pages/BlogAuthorsPostsPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogArchivePage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogLayout': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogListPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogListPaginator': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogPostItem': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogPostItems': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogPostPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogPostPaginator': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogSidebar': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogTagsListPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'BlogTagsPostsPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'CodeBlock': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'CodeInline': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'ColorModeToggle': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'ContentFooter': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'ContentVisibility': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'ContentVisibility/Draft': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'ContentVisibility/Unlisted': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Details': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocBreadcrumbs': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocCard': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocCardList': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocCategoryGeneratedIndexPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocItem': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocItem/Content': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'DocItem/Footer': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'DocItem/Layout': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'DocItem/Metadata': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'DocItem/Paginator': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'DocItem/TOC/Desktop': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'DocItem/TOC/Mobile': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'DocPaginator': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocRoot': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocRoot/Layout': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocRoot/Layout/Main': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocRoot/Layout/Sidebar': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocSidebar': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocSidebarMobile': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocSidebarItem': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocSidebarItem/Category': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'DocSidebarItem/Html': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'DocSidebarItem/Link': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'DocSidebarItems': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocTagDocListPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocTagsListPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocVersionBadge': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocVersionBanner': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocVersionRoot': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'DocsRoot': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'EditMetaRow': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'EditThisPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Error': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'ErrorPageContent': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Footer': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Heading': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'LastUpdated': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Layout': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Layout/Provider': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Loading': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'MDXComponents': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Mermaid': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'MDXContent': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'MDXPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Navbar': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'NavbarItem': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'NotFound': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'NotFound/Content': {
        actions: {
          eject: 'unsafe',
          wrap: 'safe',
        },
      },
      'Root': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'SearchBar': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'SearchMetadata': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'SearchPage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'SiteMetadata': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'SkipToContent': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'TOC': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'TOCCollapsible': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'TabItem': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Tabs': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'Tag': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'TagsListByLetter': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'ThemeProvider': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'ThemeProvider/TitleFormatter': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
      'ThemedImage': {
        actions: {
          eject: 'safe',
          wrap: 'safe',
        },
      },
    },
  };
}
