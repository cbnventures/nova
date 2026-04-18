/**
 * Theme - Code Block - Live Editor - Is Sandpack Supported.
 *
 * @since 0.15.0
 */
export type ThemeCodeBlockLiveEditorIsSandpackSupportedLanguage = string;

export type ThemeCodeBlockLiveEditorIsSandpackSupportedReturns = boolean;

/**
 * Theme - Code Block - Live Editor - Live Editor.
 *
 * @since 0.15.0
 */
export type ThemeCodeBlockLiveEditorLiveEditorPropsCode = string;

export type ThemeCodeBlockLiveEditorLiveEditorPropsLanguage = string;

export type ThemeCodeBlockLiveEditorLiveEditorProps = {
  code: ThemeCodeBlockLiveEditorLiveEditorPropsCode;
  language: ThemeCodeBlockLiveEditorLiveEditorPropsLanguage;
};

export type ThemeCodeBlockLiveEditorLiveEditorSandpackTemplate = 'vanilla' | 'vanilla-ts' | 'react' | 'react-ts' | 'vue' | 'svelte' | 'angular';

/**
 * Theme - Code Block - Live Editor - Supported Languages.
 *
 * @since 0.15.0
 */
export type ThemeCodeBlockLiveEditorSupportedLanguages = string[];

/**
 * Theme - Code Block - Live Editor - Template Map.
 *
 * @since 0.15.0
 */
export type ThemeCodeBlockLiveEditorTemplateMap = Record<string, string>;
