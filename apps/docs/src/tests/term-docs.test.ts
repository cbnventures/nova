import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { test } from 'node:test';

import {
  PATTERN_HEADING_H2_LINE,
  PATTERN_HTML_TAGS,
  PATTERN_NON_WORD_CHARS,
  PATTERN_TERM_COMPONENT,
  PATTERN_TERM_TITLE_ATTR,
  PATTERN_TERM_TO_ATTR,
  PATTERN_WHITESPACE,
} from '@/lib/regex.js';

import type {
  TermDocsTestFailures,
  TermDocsTestValidAnchors,
} from '@/types/tests/term-docs.test.d.ts';

/**
 * Term docs validation.
 *
 * @since 1.0.0
 */
test('Term docs validation', async (context) => {
  await context.test('all Term components have valid attributes and anchors', async () => {
    const docsDir = resolve(process.cwd(), 'docs');
    const terminologyPath = join(docsDir, 'quickstart', 'terminology.mdx');
    const terminologyContent = await readFile(terminologyPath, 'utf-8');

    // Build valid anchors from h2 headings in terminology.mdx.
    const validAnchors: TermDocsTestValidAnchors = new Set();

    for (const headingMatch of terminologyContent.matchAll(new RegExp(PATTERN_HEADING_H2_LINE, 'gm'))) {
      const headingCapture = headingMatch[1] ?? '';

      const headingText = headingCapture
        .replace(new RegExp(PATTERN_HTML_TAGS, 'g'), '')
        .trim()
        .toLowerCase()
        .replace(new RegExp(PATTERN_NON_WORD_CHARS, 'g'), '')
        .replace(new RegExp(PATTERN_WHITESPACE, 'g'), '-');

      validAnchors.add(headingText);
    }

    const entries = await readdir(docsDir, { recursive: true });
    const mdFiles = entries.filter((entry) => {
      const ext = extname(entry);

      return ext === '.md' || ext === '.mdx';
    });

    const failures: TermDocsTestFailures = [];

    for (const relativePath of mdFiles) {
      const filePath = join(docsDir, relativePath);
      const content = await readFile(filePath, 'utf-8');

      for (const termMatch of content.matchAll(new RegExp(PATTERN_TERM_COMPONENT, 'g'))) {
        const attrs = termMatch[1] ?? '';
        const children = (termMatch[2] ?? '').trim();
        const titleMatch = new RegExp(PATTERN_TERM_TITLE_ATTR).exec(attrs);
        const toMatch = new RegExp(PATTERN_TERM_TO_ATTR).exec(attrs);

        if (!titleMatch || (titleMatch[1] ?? '').length === 0) {
          failures.push(`${relativePath}: <Term> missing or empty title attribute`);

          continue;
        }

        if (!toMatch || (toMatch[1] ?? '').length === 0) {
          failures.push(`${relativePath}: <Term> missing or empty to attribute`);

          continue;
        }

        if (children.length === 0) {
          failures.push(`${relativePath}: <Term> has empty children`);

          continue;
        }

        const toValue = toMatch[1] ?? '';
        const expectedPrefix = '/docs/quickstart/terminology#';

        if (!toValue.startsWith(expectedPrefix)) {
          failures.push(`${relativePath}: <Term to="${toValue}"> does not start with ${expectedPrefix}`);

          continue;
        }

        const anchor = toValue.slice(expectedPrefix.length);

        if (!validAnchors.has(anchor)) {
          failures.push(`${relativePath}: <Term to="${toValue}"> references unknown anchor "#${anchor}"`);
        }
      }
    }

    strictEqual(
      failures.length,
      0,
      `\nTerm component issues:\n${failures.join('\n')}`,
    );
  });
});
