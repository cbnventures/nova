import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { isSandpackSupported } from '../../../theme/CodeBlock/live-editor.js';

import type {
  TestsThemeCodeBlockLiveEditorLanguage,
  TestsThemeCodeBlockLiveEditorResult,
} from '../../../types/tests/theme/CodeBlock/live-editor.test.d.ts';

/**
 * Tests - Theme - Code Block - Live Editor - Is Sandpack Supported.
 *
 * @since 0.15.0
 */
describe('isSandpackSupported', async () => {
  it('returns true for tsx', () => {
    const language: TestsThemeCodeBlockLiveEditorLanguage = 'tsx';
    const result: TestsThemeCodeBlockLiveEditorResult = isSandpackSupported(language);

    strictEqual(result, true);

    return;
  });

  it('returns true for typescript', () => {
    const language: TestsThemeCodeBlockLiveEditorLanguage = 'typescript';
    const result: TestsThemeCodeBlockLiveEditorResult = isSandpackSupported(language);

    strictEqual(result, true);

    return;
  });

  it('returns true for vue', () => {
    const language: TestsThemeCodeBlockLiveEditorLanguage = 'vue';
    const result: TestsThemeCodeBlockLiveEditorResult = isSandpackSupported(language);

    strictEqual(result, true);

    return;
  });

  it('returns false for rust', () => {
    const language: TestsThemeCodeBlockLiveEditorLanguage = 'rust';
    const result: TestsThemeCodeBlockLiveEditorResult = isSandpackSupported(language);

    strictEqual(result, false);

    return;
  });

  it('returns false for python', () => {
    const language: TestsThemeCodeBlockLiveEditorLanguage = 'python';
    const result: TestsThemeCodeBlockLiveEditorResult = isSandpackSupported(language);

    strictEqual(result, false);

    return;
  });

  return;
});
