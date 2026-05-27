import type {
  CSSProperties,
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
export type Theme_CodeBlock_Index_CodeBlock_Props_Children = ReactNode;

export type Theme_CodeBlock_Index_CodeBlock_Props_Language = string | undefined;

export type Theme_CodeBlock_Index_CodeBlock_Props_Title = string | undefined;

export type Theme_CodeBlock_Index_CodeBlock_Props_ShowLineNumbers = boolean | undefined;

export type Theme_CodeBlock_Index_CodeBlock_Props_Live = boolean | undefined;

export type Theme_CodeBlock_Index_CodeBlock_Props_Metastring = string | undefined;

export type Theme_CodeBlock_Index_CodeBlock_Props_ClassName = string | undefined;

export type Theme_CodeBlock_Index_CodeBlock_Props_Style = CSSProperties | undefined;

export type Theme_CodeBlock_Index_CodeBlock_Props = {
  children: Theme_CodeBlock_Index_CodeBlock_Props_Children;
  language?: Theme_CodeBlock_Index_CodeBlock_Props_Language;
  title?: Theme_CodeBlock_Index_CodeBlock_Props_Title;
  showLineNumbers?: Theme_CodeBlock_Index_CodeBlock_Props_ShowLineNumbers;
  live?: Theme_CodeBlock_Index_CodeBlock_Props_Live;
  metastring?: Theme_CodeBlock_Index_CodeBlock_Props_Metastring;
  className?: Theme_CodeBlock_Index_CodeBlock_Props_ClassName;
  style?: Theme_CodeBlock_Index_CodeBlock_Props_Style;
  [key: string]: unknown;
};

export type Theme_CodeBlock_Index_CodeBlock_IsPreHighlighted = boolean;

export type Theme_CodeBlock_Index_CodeBlock_PlainText = string;

export type Theme_CodeBlock_Index_CodeBlock_Copied = boolean;

export type Theme_CodeBlock_Index_CodeBlock_CopiedState = [Theme_CodeBlock_Index_CodeBlock_Copied, Theme_CodeBlock_Index_CodeBlock_SetCopied];

export type Theme_CodeBlock_Index_CodeBlock_SetCopied = Dispatch<SetStateAction<Theme_CodeBlock_Index_CodeBlock_Copied>>;

export type Theme_CodeBlock_Index_CodeBlock_Collapsed = boolean;

export type Theme_CodeBlock_Index_CodeBlock_CollapsedState = [Theme_CodeBlock_Index_CodeBlock_Collapsed, Theme_CodeBlock_Index_CodeBlock_SetCollapsed];

export type Theme_CodeBlock_Index_CodeBlock_SetCollapsed = Dispatch<SetStateAction<Theme_CodeBlock_Index_CodeBlock_Collapsed>>;

export type Theme_CodeBlock_Index_CodeBlock_WordWrap = boolean;

export type Theme_CodeBlock_Index_CodeBlock_WordWrapState = [Theme_CodeBlock_Index_CodeBlock_WordWrap, Theme_CodeBlock_Index_CodeBlock_SetWordWrap];

export type Theme_CodeBlock_Index_CodeBlock_SetWordWrap = Dispatch<SetStateAction<Theme_CodeBlock_Index_CodeBlock_WordWrap>>;

export type Theme_CodeBlock_Index_CodeBlock_CodeRef = RefObject<HTMLElement | null>;

export type Theme_CodeBlock_Index_CodeBlock_LineCount = number;

export type Theme_CodeBlock_Index_CodeBlock_ShouldCollapse = boolean;

/**
 * Theme - Code Block - Code Block - Handle Copy.
 *
 * @since 0.15.0
 */
export type Theme_CodeBlock_Index_CodeBlock_HandleCopy_Textarea = HTMLTextAreaElement;

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

export type Theme_CodeBlock_Index_CodeBlock_WordWrapToggle = string;

export type Theme_CodeBlock_Index_CodeBlock_WrapLabel = string;

export type Theme_CodeBlock_Index_CodeBlock_CopyAriaLabel = string;

export type Theme_CodeBlock_Index_CodeBlock_CopiedLabel = string;

export type Theme_CodeBlock_Index_CodeBlock_CopyLabel = string;

export type Theme_CodeBlock_Index_CodeBlock_ShowMore = string;

export type Theme_CodeBlock_Index_CodeBlock_ShowLess = string;

/**
 * Theme - Code Block - Extract Plain Text.
 *
 * @since 0.15.0
 */
export type Theme_CodeBlock_Index_ExtractPlainText_Node = ReactNode;

export type Theme_CodeBlock_Index_ExtractPlainText_Returns = string;

export type Theme_CodeBlock_Index_ExtractPlainText_ElementProps_Children = ReactNode;

export type Theme_CodeBlock_Index_ExtractPlainText_ElementProps = {
  children: Theme_CodeBlock_Index_ExtractPlainText_ElementProps_Children;
  [key: string]: unknown;
};
