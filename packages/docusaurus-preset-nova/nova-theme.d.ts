declare module '@theme/Admonition' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly type: string;
    readonly title?: ReactNode;
    readonly children?: ReactNode;
    [key: string]: unknown;
  }

  export default function Admonition(props: Props): React.JSX.Element;
}

declare module '@theme/AnnouncementBar' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function AnnouncementBar(props: Props): React.JSX.Element;
}

declare module '@theme/BackToTopButton' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function BackToTopButton(props: Props): React.JSX.Element;
}

declare module '@theme/Blog/Pages/BlogAuthorsListPage' {
  import type {
    AuthorItemProp,
    BlogSidebar,
  } from '@docusaurus/plugin-content-blog';

  export interface Props {
    readonly sidebar: BlogSidebar;
    readonly authors: AuthorItemProp[];
    [key: string]: unknown;
  }

  export default function BlogAuthorsListPage(props: Props): React.JSX.Element;
}

declare module '@theme/Blog/Pages/BlogAuthorsPostsPage' {
  import type { Content } from '@theme/BlogPostPage';
  import type {
    AuthorItemProp,
    BlogSidebar,
    BlogPaginatedMetadata,
  } from '@docusaurus/plugin-content-blog';

  export interface Props {
    readonly sidebar: BlogSidebar;
    readonly author: AuthorItemProp;
    readonly listMetadata: BlogPaginatedMetadata;
    readonly items: readonly {
      readonly content: Content;
    }[];
    [key: string]: unknown;
  }

  export default function BlogAuthorsPostsPage(props: Props): React.JSX.Element;
}

declare module '@theme/BlogArchivePage' {
  import type { Content } from '@theme/BlogPostPage';

  export interface Props {
    readonly archive: {
      readonly blogPosts: readonly Content[];
    };
    [key: string]: unknown;
  }

  export default function BlogArchivePage(props: Props): React.JSX.Element;
}

declare module '@theme/BlogLayout' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly sidebar?: unknown;
    readonly toc?: ReactNode;
    readonly children?: ReactNode;
    [key: string]: unknown;
  }

  export default function BlogLayout(props: Props): React.JSX.Element;
}

declare module '@theme/BlogListPage' {
  import type { Content } from '@theme/BlogPostPage';
  import type {
    BlogSidebar,
    BlogPaginatedMetadata,
  } from '@docusaurus/plugin-content-blog';

  export interface Props {
    readonly sidebar: BlogSidebar;
    readonly metadata: BlogPaginatedMetadata;
    readonly items: readonly {
      readonly content: Content;
    }[];
    [key: string]: unknown;
  }

  export default function BlogListPage(props: Props): React.JSX.Element;
}

declare module '@theme/BlogListPaginator' {
  export interface Props {
    readonly metadata: unknown;
    [key: string]: unknown;
  }

  export default function BlogListPaginator(props: Props): React.JSX.Element;
}

declare module '@theme/BlogPostItem' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
    [key: string]: unknown;
  }

  export default function BlogPostItem(props: Props): React.JSX.Element;
}

declare module '@theme/BlogPostItems' {
  export interface Props {
    readonly items: readonly Record<string, unknown>[];
    readonly component?: unknown;
    [key: string]: unknown;
  }

  export default function BlogPostItems(props: Props): React.JSX.Element;
}

declare module '@theme/BlogPostPage' {
  import type {
    BlogSidebar,
    PropBlogPostContent,
    BlogMetadata,
  } from '@docusaurus/plugin-content-blog';

  export interface Props {
    readonly sidebar: BlogSidebar;
    readonly content: PropBlogPostContent;
    readonly blogMetadata: BlogMetadata;
    [key: string]: unknown;
  }

  export default function BlogPostPage(props: Props): React.JSX.Element;
}

declare module '@theme/BlogPostPaginator' {
  export interface Props {
    readonly nextItem?: Record<string, unknown>;
    readonly prevItem?: Record<string, unknown>;
    [key: string]: unknown;
  }

  export default function BlogPostPaginator(props: Props): React.JSX.Element;
}

declare module '@theme/BlogSidebar' {
  export interface Props {
    readonly sidebar?: unknown;
    [key: string]: unknown;
  }

  export default function BlogSidebar(props: Props): React.JSX.Element;
}

declare module '@theme/BlogSidebarMobile' {
  export interface Props {
    readonly sidebar?: unknown;
    [key: string]: unknown;
  }

  export default function BlogSidebarMobile(props: Props): React.JSX.Element;
}

declare module '@theme/BlogTagsListPage' {
  import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
  import type { TagsListItem } from '@docusaurus/utils';

  export interface Props {
    readonly sidebar: BlogSidebar;
    readonly tags: TagsListItem[];
    [key: string]: unknown;
  }

  export default function BlogTagsListPage(props: Props): React.JSX.Element;
}

declare module '@theme/BlogTagsPostsPage' {
  import type { Content } from '@theme/BlogPostPage';
  import type {
    BlogSidebar,
    BlogPaginatedMetadata,
  } from '@docusaurus/plugin-content-blog';
  import type { TagModule } from '@docusaurus/utils';

  export interface Props {
    readonly sidebar: BlogSidebar;
    readonly tag: TagModule;
    readonly listMetadata: BlogPaginatedMetadata;
    readonly items: readonly {
      readonly content: Content;
    }[];
    [key: string]: unknown;
  }

  export default function BlogTagsPostsPage(props: Props): React.JSX.Element;
}

declare module '@theme/CodeBlock' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    readonly language?: string;
    readonly title?: string;
    readonly showLineNumbers?: boolean;
    readonly live?: boolean;
    readonly metastring?: string;
    [key: string]: unknown;
  }

  export default function CodeBlock(props: Props): React.JSX.Element;
}

declare module '@theme/CodeInline' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function CodeInline(props: Props): React.JSX.Element;
}

declare module '@theme/ColorModeToggle' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function ColorModeToggle(props: Props): React.JSX.Element;
}

declare module '@theme/ContentVisibility' {
  export interface Props {
    readonly metadata: Record<string, unknown>;
    [key: string]: unknown;
  }

  export default function ContentVisibility(props: Props): React.JSX.Element;
}

declare module '@theme/ContentVisibility/Draft' {
  export interface Props {
    readonly className?: string;
    [key: string]: unknown;
  }

  export default function Draft(props: Props): React.JSX.Element;
}

declare module '@theme/ContentVisibility/Unlisted' {
  export interface Props {
    readonly className?: string;
    [key: string]: unknown;
  }

  export default function Unlisted(props: Props): React.JSX.Element;
}

declare module '@theme/ContentFooter' {
  export interface Props {
    readonly tags?: readonly {
      readonly permalink: string;
      readonly label: string;
      readonly description: string | undefined;
      [key: string]: unknown;
    }[];
    readonly sharePlatforms?: string[];
    readonly shareUrl?: string;
    readonly editUrl?: string;
    readonly lastUpdatedAt?: number;
    readonly lastUpdatedBy?: string;
    [key: string]: unknown;
  }

  export default function ContentFooter(props: Props): React.JSX.Element;
}

declare module '@theme/Details' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly summary?: ReactNode;
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function Details(props: Props): React.JSX.Element;
}

declare module '@theme/DocBreadcrumbs' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function DocBreadcrumbs(props: Props): React.JSX.Element;
}

declare module '@theme/DocCard' {
  export interface Props {
    readonly item: Record<string, unknown>;
    [key: string]: unknown;
  }

  export default function DocCard(props: Props): React.JSX.Element;
}

declare module '@theme/DocCardList' {
  export interface Props {
    readonly items?: unknown[];
    [key: string]: unknown;
  }

  export default function DocCardList(props: Props): React.JSX.Element;
}

declare module '@theme/DocCategoryGeneratedIndexPage' {
  import type { PropCategoryGeneratedIndex } from '@docusaurus/plugin-content-docs';

  export interface Props {
    readonly categoryGeneratedIndex: PropCategoryGeneratedIndex;
    [key: string]: unknown;
  }

  export default function DocCategoryGeneratedIndexPage(props: Props): React.JSX.Element;
}

declare module '@theme/DocItem' {
  import type { PropDocContent } from '@docusaurus/plugin-content-docs';

  export interface Props {
    readonly content: PropDocContent;
    [key: string]: unknown;
  }

  export default function DocItem(props: Props): React.JSX.Element;
}

declare module '@theme/DocItem/Content' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function Content(props: Props): React.JSX.Element;
}

declare module '@theme/DocItem/Footer' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function Footer(props: Props): React.JSX.Element;
}

declare module '@theme/DocItem/Layout' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function Layout(props: Props): React.JSX.Element;
}

declare module '@theme/DocItem/Metadata' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function Metadata(props: Props): React.JSX.Element;
}

declare module '@theme/DocItem/Paginator' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function Paginator(props: Props): React.JSX.Element;
}

declare module '@theme/DocItem/TOC/Desktop' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function Desktop(props: Props): React.JSX.Element;
}

declare module '@theme/DocItem/TOC/Mobile' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function Mobile(props: Props): React.JSX.Element;
}

declare module '@theme/DocPaginator' {
  export interface Props {
    readonly className?: string;
    readonly previous?: Record<string, unknown>;
    readonly next?: Record<string, unknown>;
    [key: string]: unknown;
  }

  export default function DocPaginator(props: Props): React.JSX.Element;
}

declare module '@theme/DocRoot' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function DocRoot(props: Props): React.JSX.Element;
}

declare module '@theme/DocRoot/Layout' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function Layout(props: Props): React.JSX.Element;
}

declare module '@theme/DocRoot/Layout/Main' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function Main(props: Props): React.JSX.Element;
}

declare module '@theme/DocRoot/Layout/Sidebar' {
  export interface Props {
    readonly sidebar: unknown[];
    [key: string]: unknown;
  }

  export default function Sidebar(props: Props): React.JSX.Element;
}

declare module '@theme/DocSidebarMobile' {
  export default function DocSidebarMobile(): React.JSX.Element | null;
}

declare module '@theme/DocSidebar' {
  export interface Props {
    readonly path: string;
    readonly sidebar: unknown[];
    readonly onCollapse?: () => void;
    readonly isHidden?: boolean;
    [key: string]: unknown;
  }

  export default function DocSidebar(props: Props): React.JSX.Element;
}

declare module '@theme/DocSidebarItem' {
  export interface Props {
    readonly item: unknown;
    readonly activePath: string;
    readonly level: number;
    readonly index: number;
    [key: string]: unknown;
  }

  export default function DocSidebarItem(props: Props): React.JSX.Element;
}

declare module '@theme/DocSidebarItem/Category' {
  export interface Props {
    readonly item: Record<string, unknown>;
    readonly activePath: string;
    readonly level: number;
    [key: string]: unknown;
  }

  export default function Category(props: Props): React.JSX.Element;
}

declare module '@theme/DocSidebarItem/Html' {
  export interface Props {
    readonly item: Record<string, unknown>;
    readonly activePath: string;
    readonly level: number;
    [key: string]: unknown;
  }

  export default function Html(props: Props): React.JSX.Element;
}

declare module '@theme/DocSidebarItem/Link' {
  export interface Props {
    readonly item: Record<string, unknown>;
    readonly activePath: string;
    readonly level: number;
    [key: string]: unknown;
  }

  export default function Link(props: Props): React.JSX.Element;
}

declare module '@theme/DocSidebarItems' {
  export interface Props {
    readonly items: readonly unknown[];
    readonly activePath: string;
    readonly level: number;
    [key: string]: unknown;
  }

  export default function DocSidebarItems(props: Props): React.JSX.Element;
}

declare module '@theme/DocTagDocListPage' {
  import type { PropTagDocList } from '@docusaurus/plugin-content-docs';

  export interface Props {
    readonly tag: PropTagDocList;
    [key: string]: unknown;
  }

  export default function DocTagDocListPage(props: Props): React.JSX.Element;
}

declare module '@theme/DocTagsListPage' {
  import type { TagsListItem } from '@docusaurus/utils';

  export interface Props {
    readonly tags: TagsListItem[];
    [key: string]: unknown;
  }

  export default function DocTagsListPage(props: Props): React.JSX.Element;
}

declare module '@theme/DocVersionBadge' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function DocVersionBadge(props: Props): React.JSX.Element;
}

declare module '@theme/DocVersionBanner' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function DocVersionBanner(props: Props): React.JSX.Element;
}

declare module '@theme/DocVersionRoot' {
  import type { PropVersionMetadata } from '@docusaurus/plugin-content-docs';

  export interface Props {
    readonly version: PropVersionMetadata;
    [key: string]: unknown;
  }

  export default function DocVersionRoot(props: Props): React.JSX.Element;
}

declare module '@theme/DocsRoot' {
  export interface Props {
    readonly route: Record<string, unknown>;
    [key: string]: unknown;
  }

  export default function DocsRoot(props: Props): React.JSX.Element;
}

declare module '@theme/EditMetaRow' {
  export interface Props {
    readonly className?: string;
    readonly editUrl?: string | null | undefined;
    readonly lastUpdatedAt?: number | null | undefined;
    readonly lastUpdatedBy?: string | null | undefined;
    [key: string]: unknown;
  }

  export default function EditMetaRow(props: Props): React.JSX.Element;
}

declare module '@theme/EditThisPage' {
  export interface Props {
    readonly editUrl: string;
    [key: string]: unknown;
  }

  export default function EditThisPage(props: Props): React.JSX.Element;
}

declare module '@theme/Error' {
  export interface Props {
    readonly error: Error;
    readonly tryAgain: () => void;
    [key: string]: unknown;
  }

  export default function Error(props: Props): React.JSX.Element;
}

declare module '@theme/ErrorPageContent' {
  export interface Props {
    readonly error: Error;
    readonly tryAgain: () => void;
    [key: string]: unknown;
  }

  export default function ErrorPageContent(props: Props): React.JSX.Element;
}

declare module '@theme/Footer' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function Footer(props: Props): React.JSX.Element;
}

declare module '@theme/Heading' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    readonly id?: string | undefined;
    readonly children?: ReactNode | undefined;
    readonly className?: string | undefined;
    [key: string]: unknown;
  }

  export default function Heading(props: Props): React.JSX.Element;
}

declare module '@theme/LastUpdated' {
  export interface Props {
    readonly lastUpdatedAt?: number | null | undefined;
    readonly lastUpdatedBy?: string | null | undefined;
    [key: string]: unknown;
  }

  export default function LastUpdated(props: Props): React.JSX.Element;
}

declare module '@theme/Layout' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children?: ReactNode;
    readonly title?: string;
    readonly description?: string;
    readonly noFooter?: boolean;
    readonly wrapperClassName?: string;
    [key: string]: unknown;
  }

  export default function Layout(props: Props): React.JSX.Element;
}

declare module '@theme/Layout/Provider' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function Provider(props: Props): React.JSX.Element;
}

declare module '@theme/Loading' {
  export interface Props {
    readonly isLoading: boolean;
    readonly pastDelay: boolean;
    readonly timedOut: boolean;
    readonly error: Error | null | undefined;
    readonly retry: (() => void) | undefined;
    [key: string]: unknown;
  }

  export default function Loading(props: Props): React.JSX.Element;
}

declare module '@theme/Mermaid' {
  export interface Props {
    readonly value: string;
  }

  export default function Mermaid(props: Props): React.JSX.Element | null;
}

declare module '@theme/MDXComponents' {
  const mdxComponents: Record<string, unknown>;

  export default mdxComponents;
}

declare module '@theme/MDXContent' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function MDXContent(props: Props): React.JSX.Element;
}

declare module '@theme/MDXPage' {
  import type { LoadedMDXContent } from '@docusaurus/mdx-loader';
  import type {
    MDXPageMetadata,
    PageFrontMatter,
    Assets,
  } from '@docusaurus/plugin-content-pages';

  export interface Props {
    readonly content: LoadedMDXContent<PageFrontMatter, MDXPageMetadata, Assets>;
    [key: string]: unknown;
  }

  export default function MDXPage(props: Props): React.JSX.Element;
}

declare module '@theme/Navbar' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function Navbar(props: Props): React.JSX.Element;
}

declare module '@theme/NavbarItem' {
  export interface Props {
    readonly type?: string;
    [key: string]: unknown;
  }

  export default function NavbarItem(props: Props): React.JSX.Element;
}

declare module '@theme/NotFound' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function NotFound(props: Props): React.JSX.Element;
}

declare module '@theme/NotFound/Content' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function Content(props: Props): React.JSX.Element;
}

declare module '@theme/Root' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function Root(props: Props): React.JSX.Element;
}

declare module '@theme/SearchBar' {
  export interface Props {
    [key: string]: unknown;
  }

  export function useSearchContext(): import('./src/types/theme/SearchBar/search-context.d.ts').ThemeSearchBarSearchContextValue;

  export const searchContext: React.Context<import('./src/types/theme/SearchBar/search-context.d.ts').ThemeSearchBarSearchContextValue | undefined>;

  export function SearchInput(props: Props): React.JSX.Element;

  export function SearchProvider(props: {
    children: React.ReactNode;
  }): React.JSX.Element;

  export function SearchResults(props: Props): React.JSX.Element;
}

declare module '@theme/SearchMetadata' {
  export interface Props {
    readonly locale?: string;
    readonly version?: string;
    readonly tag?: string;
    [key: string]: unknown;
  }

  export default function SearchMetadata(props: Props): React.JSX.Element;
}

declare module '@theme/SearchPage' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function SearchPage(props: Props): React.JSX.Element;
}

declare module '@theme/SiteMetadata' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function SiteMetadata(props: Props): React.JSX.Element;
}

declare module '@theme/SkipToContent' {
  export interface Props {
    [key: string]: unknown;
  }

  export default function SkipToContent(props: Props): React.JSX.Element;
}

declare module '@theme/TOC' {
  export interface Props {
    readonly toc: readonly unknown[];
    readonly className?: string;
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    [key: string]: unknown;
  }

  export default function TOC(props: Props): React.JSX.Element;
}

declare module '@theme/TOCCollapsible' {
  export interface Props {
    readonly toc: readonly unknown[];
    readonly className?: string;
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    [key: string]: unknown;
  }

  export default function TOCCollapsible(props: Props): React.JSX.Element;
}

declare module '@theme/TabItem' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    readonly value: string;
    readonly hidden?: boolean;
    [key: string]: unknown;
  }

  export default function TabItem(props: Props): React.JSX.Element;
}

declare module '@theme/Tabs' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    readonly lazy?: boolean;
    readonly block?: boolean;
    readonly defaultValue?: string | null;
    readonly values?: Record<string, unknown>[];
    readonly groupId?: string;
    readonly className?: string;
    readonly queryString?: string | boolean;
    [key: string]: unknown;
  }

  export default function Tabs(props: Props): React.JSX.Element;
}

declare module '@theme/Tag' {
  export interface Props {
    readonly permalink: string;
    readonly label: string;
    readonly count?: number | undefined;
    readonly description?: string | undefined;
    [key: string]: unknown;
  }

  export default function Tag(props: Props): React.JSX.Element;
}

declare module '@theme/TagsListByLetter' {
  export interface Props {
    readonly tags: readonly unknown[];
    [key: string]: unknown;
  }

  export default function TagsListByLetter(props: Props): React.JSX.Element;
}

declare module '@theme/ThemeProvider' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function ThemeProvider(props: Props): React.JSX.Element;
}

declare module '@theme/ThemeProvider/TitleFormatter' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    [key: string]: unknown;
  }

  export default function TitleFormatter(props: Props): React.JSX.Element;
}

declare module '@theme/ThemedImage' {
  export interface Props {
    readonly alt?: string;
    readonly sources: {
      readonly light: string;
      readonly dark: string;
    };
    readonly width?: string | number;
    readonly height?: string | number;
    [key: string]: unknown;
  }

  export default function ThemedImage(props: Props): React.JSX.Element;
}

declare module 'mark.js' {
  class Mark {
    public constructor(element: Element);
    public mark(term: string): void;
    public unmark(): void;
  }

  export default Mark;
}

declare module 'lunr' {
  interface Builder {
    ref: (fieldName: string) => void;
    field: (fieldName: string) => void;
    add: (document: Record<string, unknown>) => void;
  }

  interface Index {
    search: (query: string) => Array<{
      ref: string; score: number;
    }>;
  }

  function lunr(config: (this: Builder) => void): Index;

  namespace lunr {
    namespace Index {
      function load(serializedIndex: unknown): Index;
    }
  }

  export default lunr;
}
