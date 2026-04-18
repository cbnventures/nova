import type {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react';

/**
 * Theme - Code Block - Code Block.
 *
 * @since 0.15.0
 */
export type ThemeCodeBlockCodeBlockPropsChildren = ReactNode;

export type ThemeCodeBlockCodeBlockPropsLanguage = string | undefined;

export type ThemeCodeBlockCodeBlockPropsTitle = string | undefined;

export type ThemeCodeBlockCodeBlockPropsShowLineNumbers = boolean | undefined;

export type ThemeCodeBlockCodeBlockPropsLive = boolean | undefined;

export type ThemeCodeBlockCodeBlockPropsMetastring = string | undefined;

export type ThemeCodeBlockCodeBlockProps = {
  children: ThemeCodeBlockCodeBlockPropsChildren;
  language?: ThemeCodeBlockCodeBlockPropsLanguage;
  title?: ThemeCodeBlockCodeBlockPropsTitle;
  showLineNumbers?: ThemeCodeBlockCodeBlockPropsShowLineNumbers;
  live?: ThemeCodeBlockCodeBlockPropsLive;
  metastring?: ThemeCodeBlockCodeBlockPropsMetastring;
  [key: string]: unknown;
};

export type ThemeCodeBlockCodeBlockIsPreHighlighted = boolean;

export type ThemeCodeBlockCodeBlockPlainText = string;

export type ThemeCodeBlockCodeBlockCopied = boolean;

export type ThemeCodeBlockCodeBlockCopiedState = [ThemeCodeBlockCodeBlockCopied, ThemeCodeBlockCodeBlockSetCopied];

export type ThemeCodeBlockCodeBlockSetCopied = Dispatch<SetStateAction<ThemeCodeBlockCodeBlockCopied>>;

export type ThemeCodeBlockCodeBlockCollapsed = boolean;

export type ThemeCodeBlockCodeBlockCollapsedState = [ThemeCodeBlockCodeBlockCollapsed, ThemeCodeBlockCodeBlockSetCollapsed];

export type ThemeCodeBlockCodeBlockSetCollapsed = Dispatch<SetStateAction<ThemeCodeBlockCodeBlockCollapsed>>;

export type ThemeCodeBlockCodeBlockWordWrap = boolean;

export type ThemeCodeBlockCodeBlockWordWrapState = [ThemeCodeBlockCodeBlockWordWrap, ThemeCodeBlockCodeBlockSetWordWrap];

export type ThemeCodeBlockCodeBlockSetWordWrap = Dispatch<SetStateAction<ThemeCodeBlockCodeBlockWordWrap>>;

export type ThemeCodeBlockCodeBlockCodeRef = RefObject<HTMLElement | null>;

export type ThemeCodeBlockCodeBlockLineCount = number;

export type ThemeCodeBlockCodeBlockShouldCollapse = boolean;

/**
 * Theme - Code Block - Code Block - Handle Copy.
 *
 * @since 0.15.0
 */

/**
 * Theme - Code Block - Code Block - Toggle Collapse.
 *
 * @since 0.15.0
 */

/**
 * Theme - Code Block - Code Block - Toggle Word Wrap.
 *
 * @since 0.15.0
 */

export type ThemeCodeBlockCodeBlockWordWrapToggle = string;

export type ThemeCodeBlockCodeBlockWrapLabel = string;

export type ThemeCodeBlockCodeBlockCopyAriaLabel = string;

export type ThemeCodeBlockCodeBlockCopiedLabel = string;

export type ThemeCodeBlockCodeBlockCopyLabel = string;

export type ThemeCodeBlockCodeBlockShowMore = string;

export type ThemeCodeBlockCodeBlockShowLess = string;

/**
 * Theme - Code Block - Extract Plain Text.
 *
 * @since 0.15.0
 */
export type ThemeCodeBlockExtractPlainTextNode = ReactNode;

export type ThemeCodeBlockExtractPlainTextReturns = string;

export type ThemeCodeBlockExtractPlainTextElementPropsChildren = ReactNode;

export type ThemeCodeBlockExtractPlainTextElementProps = {
  children: ThemeCodeBlockExtractPlainTextElementPropsChildren;
  [key: string]: unknown;
};
