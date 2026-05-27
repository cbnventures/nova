import { strictEqual } from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

import { describe, it } from 'vitest';

import {
  PATTERN_CODE_BLOCK,
  PATTERN_HEADING_H2_LINE,
  PATTERN_HTML_TAGS,
  PATTERN_NON_WORD_CHARS,
  PATTERN_TERMINOLOGY_COMPONENT,
  PATTERN_TERMINOLOGY_TITLE_ATTR,
  PATTERN_TERMINOLOGY_TO_ATTR,
  PATTERN_WHITESPACE,
} from '@site/src/lib/regex.js';

import type {
  Tests_Terminology_TerminologyValidation_Anchor,
  Tests_Terminology_TerminologyValidation_Attrs,
  Tests_Terminology_TerminologyValidation_Children,
  Tests_Terminology_TerminologyValidation_Content,
  Tests_Terminology_TerminologyValidation_ContentDirs,
  Tests_Terminology_TerminologyValidation_ContentPath,
  Tests_Terminology_TerminologyValidation_Cwd,
  Tests_Terminology_TerminologyValidation_Entries,
  Tests_Terminology_TerminologyValidation_ExpectedBase,
  Tests_Terminology_TerminologyValidation_Ext,
  Tests_Terminology_TerminologyValidation_Failures,
  Tests_Terminology_TerminologyValidation_FilePath,
  Tests_Terminology_TerminologyValidation_HeadingCapture,
  Tests_Terminology_TerminologyValidation_HeadingText,
  Tests_Terminology_TerminologyValidation_MdFiles,
  Tests_Terminology_TerminologyValidation_StrippedContent,
  Tests_Terminology_TerminologyValidation_TerminologyContent,
  Tests_Terminology_TerminologyValidation_TerminologyPath,
  Tests_Terminology_TerminologyValidation_TitleMatch,
  Tests_Terminology_TerminologyValidation_ToMatch,
  Tests_Terminology_TerminologyValidation_ToValue,
  Tests_Terminology_TerminologyValidation_ValidAnchors,
} from '@site/src/types/tests/terminology.test.d.ts';

/**
 * Tests - Terminology - Terminology Validation.
 *
 * @since 0.14.0
 */
describe('Terminology validation', async () => {
  it('all Terminology components have valid attributes and anchors', async () => {
    const cwd: Tests_Terminology_TerminologyValidation_Cwd = process.cwd();
    const contentDirs: Tests_Terminology_TerminologyValidation_ContentDirs = [
      'docs',
      'blog',
    ];
    const terminologyPath: Tests_Terminology_TerminologyValidation_TerminologyPath = join(cwd, 'docs', 'quickstart', 'terminology.mdx');

    if (existsSync(terminologyPath) === false) {
      return;
    }

    const terminologyContent: Tests_Terminology_TerminologyValidation_TerminologyContent = await readFile(terminologyPath, 'utf-8');

    // Build valid anchors from h2 headings in terminology.mdx.
    const validAnchors: Tests_Terminology_TerminologyValidation_ValidAnchors = new Set();

    for (const headingMatch of terminologyContent.matchAll(new RegExp(PATTERN_HEADING_H2_LINE, 'gm'))) {
      const headingCapture: Tests_Terminology_TerminologyValidation_HeadingCapture = headingMatch[1] ?? '';

      const headingText: Tests_Terminology_TerminologyValidation_HeadingText = headingCapture
        .replace(new RegExp(PATTERN_HTML_TAGS, 'g'), '')
        .trim()
        .toLowerCase()
        .replace(new RegExp(PATTERN_NON_WORD_CHARS, 'g'), '')
        .replace(new RegExp(PATTERN_WHITESPACE, 'g'), '-');

      validAnchors.add(headingText);
    }

    const mdFiles: Tests_Terminology_TerminologyValidation_MdFiles = [];

    for (const contentDir of contentDirs) {
      const contentPath: Tests_Terminology_TerminologyValidation_ContentPath = resolve(cwd, contentDir);
      const entries: Tests_Terminology_TerminologyValidation_Entries = await readdir(contentPath, { recursive: true });

      for (const entry of entries) {
        const ext: Tests_Terminology_TerminologyValidation_Ext = extname(entry);

        if (ext === '.md' || ext === '.mdx') {
          mdFiles.push(join(contentDir, entry));
        }
      }
    }

    const failures: Tests_Terminology_TerminologyValidation_Failures = [];

    for (const mdFile of mdFiles) {
      const filePath: Tests_Terminology_TerminologyValidation_FilePath = join(cwd, mdFile);
      const content: Tests_Terminology_TerminologyValidation_Content = await readFile(filePath, 'utf-8');
      const strippedContent: Tests_Terminology_TerminologyValidation_StrippedContent = content.replace(new RegExp(PATTERN_CODE_BLOCK, 'g'), '');

      for (const terminologyMatch of strippedContent.matchAll(new RegExp(PATTERN_TERMINOLOGY_COMPONENT, 'g'))) {
        const attrs: Tests_Terminology_TerminologyValidation_Attrs = terminologyMatch[1] ?? '';
        const children: Tests_Terminology_TerminologyValidation_Children = (terminologyMatch[2] ?? '').trim();
        const titleMatch: Tests_Terminology_TerminologyValidation_TitleMatch = new RegExp(PATTERN_TERMINOLOGY_TITLE_ATTR).exec(attrs);
        const toMatch: Tests_Terminology_TerminologyValidation_ToMatch = new RegExp(PATTERN_TERMINOLOGY_TO_ATTR).exec(attrs);

        if (titleMatch === null || (titleMatch[1] ?? '').length === 0) {
          failures.push(`${mdFile}: <Terminology> missing or empty title attribute`);

          continue;
        }

        if (toMatch === null || (toMatch[1] ?? '').length === 0) {
          failures.push(`${mdFile}: <Terminology> missing or empty to attribute`);

          continue;
        }

        if (children.length === 0) {
          failures.push(`${mdFile}: <Terminology> has empty children`);

          continue;
        }

        const toValue: Tests_Terminology_TerminologyValidation_ToValue = toMatch[1] ?? '';
        const expectedBase: Tests_Terminology_TerminologyValidation_ExpectedBase = '/docs/quickstart/terminology';

        if (toValue !== expectedBase && toValue.startsWith(`${expectedBase}#`) === false) {
          failures.push(`${mdFile}: <Terminology to="${toValue}"> does not point to ${expectedBase}`);

          continue;
        }

        if (toValue.startsWith(`${expectedBase}#`) === true) {
          const anchor: Tests_Terminology_TerminologyValidation_Anchor = toValue.slice(`${expectedBase}#`.length);

          if (validAnchors.has(anchor) === false) {
            failures.push(`${mdFile}: <Terminology to="${toValue}"> references unknown anchor "#${anchor}"`);
          }
        }
      }
    }

    strictEqual(
      failures.length,
      0,
      `\nTerminology component issues:\n${failures.join('\n')}`,
    );

    return;
  });

  return;
});
