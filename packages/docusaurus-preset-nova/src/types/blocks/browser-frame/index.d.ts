import type { CSSProperties, ReactNode } from 'react';

/**
 * Blocks - Browser Frame.
 *
 * @since 0.43.0
 */
export type Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_Children = ReactNode;

export type Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_ClassName = string | undefined;

export type Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_Favicon = string | undefined;

export type Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_Style = CSSProperties | undefined;

export type Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_Title = string;

export type Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_Url = string;

export type Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props = {
  children: Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_Children;
  className?: Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_ClassName;
  favicon?: Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_Favicon;
  style?: Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_Style;
  title: Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_Title;
  url: Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props_Url;
};

export type Blocks_BrowserFrame_Index_BlocksBrowserFrame_Returns = React.JSX.Element;

export type Blocks_BrowserFrame_Index_BlocksBrowserFrame_FaviconUrl = string;
