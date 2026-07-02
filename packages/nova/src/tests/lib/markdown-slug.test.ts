import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { slugifyHeading, stripCodeFences } from '../../lib/markdown-slug.js';

import type {
  Tests_Lib_MarkdownSlug_SlugifyHeading_ProducesADocusaurusStyleSlugFromAHeading_Slug,
  Tests_Lib_MarkdownSlug_SlugifyHeading_StripsHtmlTagsAndPunctuation_Slug,
  Tests_Lib_MarkdownSlug_StripCodeFences_RemovesFencedCodeBlocksFromContent_Lines,
  Tests_Lib_MarkdownSlug_StripCodeFences_RemovesFencedCodeBlocksFromContent_Stripped,
} from '../../types/tests/lib/markdown-slug.test.d.ts';

/**
 * Tests - Lib - Markdown Slug - Slugify Heading.
 *
 * @since 0.19.0
 */
describe('slugifyHeading', () => {
  it('produces a Docusaurus-style slug from a heading', () => {
    const slug: Tests_Lib_MarkdownSlug_SlugifyHeading_ProducesADocusaurusStyleSlugFromAHeading_Slug = slugifyHeading('Hello World');

    strictEqual(slug, 'hello-world');

    return;
  });

  it('strips html tags and punctuation', () => {
    const slug: Tests_Lib_MarkdownSlug_SlugifyHeading_StripsHtmlTagsAndPunctuation_Slug = slugifyHeading('Config & <code>Options</code>!');

    strictEqual(slug, 'config-options');

    return;
  });

  return;
});

/**
 * Tests - Lib - Markdown Slug - Strip Code Fences.
 *
 * @since 0.19.0
 */
describe('stripCodeFences', () => {
  it('removes fenced code blocks from content', () => {
    const lines: Tests_Lib_MarkdownSlug_StripCodeFences_RemovesFencedCodeBlocksFromContent_Lines = [
      'Before',
      '```ts',
      'const fenced = true;',
      '```',
      'After',
    ];
    const stripped: Tests_Lib_MarkdownSlug_StripCodeFences_RemovesFencedCodeBlocksFromContent_Stripped = stripCodeFences(lines.join('\n'));

    strictEqual(stripped.includes('const fenced'), false);
    strictEqual(stripped.includes('Before'), true);
    strictEqual(stripped.includes('After'), true);

    return;
  });

  return;
});
