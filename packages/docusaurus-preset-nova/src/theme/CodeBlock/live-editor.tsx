import { Sandpack } from '@codesandbox/sandpack-react';

import type {
  ThemeCodeBlockLiveEditorIsSandpackSupportedLanguage,
  ThemeCodeBlockLiveEditorIsSandpackSupportedReturns,
  ThemeCodeBlockLiveEditorLiveEditorProps,
  ThemeCodeBlockLiveEditorLiveEditorSandpackTemplate,
  ThemeCodeBlockLiveEditorSupportedLanguages,
  ThemeCodeBlockLiveEditorTemplateMap,
} from '../../types/theme/CodeBlock/live-editor.d.ts';

/**
 * Theme - Code Block - Live Editor - Template Map.
 *
 * Maps programming language identifiers to their corresponding
 * Sandpack template names for initializing the correct
 * runtime environment.
 *
 * @since 0.15.0
 */
const templateMap: ThemeCodeBlockLiveEditorTemplateMap = {
  js: 'vanilla',
  javascript: 'vanilla',
  ts: 'vanilla-ts',
  typescript: 'vanilla-ts',
  jsx: 'react',
  tsx: 'react-ts',
  vue: 'vue',
  svelte: 'svelte',
  angular: 'angular',
};

/**
 * Theme - Code Block - Live Editor - Supported Languages.
 *
 * Derived from the template map keys so that the CodeBlock component
 * can check whether a given language has a matching Sandpack
 * template before enabling live editing.
 *
 * @since 0.15.0
 */
const supportedLanguages: ThemeCodeBlockLiveEditorSupportedLanguages = Object.keys(templateMap);

/**
 * Theme - Code Block - Live Editor - Is Sandpack Supported.
 *
 * Checks whether the given programming language has a corresponding
 * Sandpack template available for interactive code
 * editing and live preview.
 *
 * @param {ThemeCodeBlockLiveEditorIsSandpackSupportedLanguage} language - Language.
 *
 * @returns {ThemeCodeBlockLiveEditorIsSandpackSupportedReturns}
 *
 * @since 0.15.0
 */
export function isSandpackSupported(language: ThemeCodeBlockLiveEditorIsSandpackSupportedLanguage): ThemeCodeBlockLiveEditorIsSandpackSupportedReturns {
  return supportedLanguages.includes(language);
}

/**
 * Theme - Code Block - Live Editor - Live Editor.
 *
 * Renders an interactive code editor with live preview using the
 * Sandpack runtime, mapping the given language to the appropriate
 * template for the editing environment.
 *
 * @param {ThemeCodeBlockLiveEditorLiveEditorProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function LiveEditor(props: ThemeCodeBlockLiveEditorLiveEditorProps) {
  const template: ThemeCodeBlockLiveEditorLiveEditorSandpackTemplate = (templateMap[props['language']] ?? 'vanilla') as ThemeCodeBlockLiveEditorLiveEditorSandpackTemplate;

  return (
    <Sandpack
      template={template}
      files={{
        '/App.tsx': props['code'],
      }}
      options={{
        showConsole: false,
        showConsoleButton: true,
        editorHeight: 400,
      }}
    />
  );
}

export default LiveEditor;
