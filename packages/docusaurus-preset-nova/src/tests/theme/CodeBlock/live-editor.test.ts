import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import LiveEditor, { isSandpackSupported } from '../../../theme/CodeBlock/live-editor.js';

import type {
  Tests_Theme_CodeBlock_LiveEditor_Language,
  Tests_Theme_CodeBlock_LiveEditor_LiveEditor_UsesEntryFile_Element,
  Tests_Theme_CodeBlock_LiveEditor_Result,
} from '../../../types/tests/theme/CodeBlock/live-editor.test.d.ts';

/**
 * Tests - Theme - Code Block - Live Editor - Is Sandpack Supported.
 *
 * @since 0.15.0
 */
describe('isSandpackSupported', async () => {
  it('returns true for tsx', () => {
    const language: Tests_Theme_CodeBlock_LiveEditor_Language = 'tsx';
    const result: Tests_Theme_CodeBlock_LiveEditor_Result = isSandpackSupported(language);

    strictEqual(result, true);

    return;
  });

  it('returns true for typescript', () => {
    const language: Tests_Theme_CodeBlock_LiveEditor_Language = 'typescript';
    const result: Tests_Theme_CodeBlock_LiveEditor_Result = isSandpackSupported(language);

    strictEqual(result, true);

    return;
  });

  it('returns true for vue', () => {
    const language: Tests_Theme_CodeBlock_LiveEditor_Language = 'vue';
    const result: Tests_Theme_CodeBlock_LiveEditor_Result = isSandpackSupported(language);

    strictEqual(result, true);

    return;
  });

  it('returns false for rust', () => {
    const language: Tests_Theme_CodeBlock_LiveEditor_Language = 'rust';
    const result: Tests_Theme_CodeBlock_LiveEditor_Result = isSandpackSupported(language);

    strictEqual(result, false);

    return;
  });

  it('returns false for python', () => {
    const language: Tests_Theme_CodeBlock_LiveEditor_Language = 'python';
    const result: Tests_Theme_CodeBlock_LiveEditor_Result = isSandpackSupported(language);

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Theme - Code Block - Live Editor - Live Editor.
 *
 * @since 0.21.0
 */
describe('LiveEditor', async () => {
  it('uses entry file', () => {
    const element: Tests_Theme_CodeBlock_LiveEditor_LiveEditor_UsesEntryFile_Element = LiveEditor({
      code: 'const value = 1;',
      language: 'js',
    });

    strictEqual(element['props']['files']['/index.js'], 'const value = 1;');
    strictEqual(element['props']['files']['/App.tsx'], undefined);

    return;
  });

  return;
});
