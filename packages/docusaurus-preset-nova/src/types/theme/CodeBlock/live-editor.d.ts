/**
 * Theme - Code Block - Live Editor - Is Sandpack Supported.
 *
 * @since 0.15.0
 */
export type Theme_CodeBlock_LiveEditor_IsSandpackSupported_Language = string;

export type Theme_CodeBlock_LiveEditor_IsSandpackSupported_Returns = boolean;

/**
 * Theme - Code Block - Live Editor - Live Editor.
 *
 * @since 0.15.0
 */
export type Theme_CodeBlock_LiveEditor_LiveEditor_Props_Code = string;

export type Theme_CodeBlock_LiveEditor_LiveEditor_Props_Language = string;

export type Theme_CodeBlock_LiveEditor_LiveEditor_Props = {
  code: Theme_CodeBlock_LiveEditor_LiveEditor_Props_Code;
  language: Theme_CodeBlock_LiveEditor_LiveEditor_Props_Language;
};

export type Theme_CodeBlock_LiveEditor_LiveEditor_SandpackTemplate = 'vanilla' | 'vanilla-ts' | 'react' | 'react-ts' | 'vue' | 'svelte' | 'angular';

/**
 * Theme - Code Block - Live Editor - Supported Languages.
 *
 * @since 0.15.0
 */
export type Theme_CodeBlock_LiveEditor_SupportedLanguages = string[];

/**
 * Theme - Code Block - Live Editor - Template Map.
 *
 * @since 0.15.0
 */
export type Theme_CodeBlock_LiveEditor_TemplateMap = Record<string, string>;
