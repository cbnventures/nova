import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import {
  basename,
  extname,
  join,
  resolve,
} from 'node:path';
import { test } from 'node:test';

import {
  PATTERN_DESCRIPTION_LINE,
  PATTERN_ID_LINE,
} from '@/lib/regex.js';

import type {
  FrontmatterDocsTestFailures,
  FrontmatterDocsTestKeywordLines,
  FrontmatterDocsTestTagLines,
  FrontmatterDocsTestWarnings,
} from '@/types/tests/frontmatter-docs.test.d.ts';

/**
 * Frontmatter docs validation.
 *
 * @since 1.0.0
 */
test('Frontmatter docs validation', async (context) => {
  await context.test('all documentation files have valid frontmatter', async () => {
    const docsDir = resolve(process.cwd(), 'docs');
    const entries = await readdir(docsDir, { recursive: true });
    const mdFiles = entries.filter((entry) => {
      const ext = extname(entry);

      return ext === '.md' || ext === '.mdx';
    });

    const failures: FrontmatterDocsTestFailures = [];
    const warnings: FrontmatterDocsTestWarnings = [];

    for (const relativePath of mdFiles) {
      const filePath = join(docsDir, relativePath);
      const content = await readFile(filePath, 'utf-8');

      if (!content.startsWith('---')) {
        failures.push(`${relativePath}: missing frontmatter`);

        continue;
      }

      const endIndex = content.indexOf('---', 3);

      if (endIndex === -1) {
        failures.push(`${relativePath}: unclosed frontmatter`);

        continue;
      }

      const frontmatter = content.slice(3, endIndex).trim();
      const body = content.slice(endIndex + 3).trim();
      const fileName = basename(relativePath, extname(relativePath));
      // TODO Remove placeholder warning bypass (isPlaceholder, warnings, target, and console.log)
      // once all "Coming soon" pages have real frontmatter.
      const isPlaceholder = body.startsWith('Coming soon');

      const target = isPlaceholder ? warnings : failures;

      // Check required fields exist.
      const requiredFields = ['id', 'title', 'description', 'keywords', 'tags'];

      for (const field of requiredFields) {
        const fieldSource = `^${field}:`;
        const fieldRegex = new RegExp(fieldSource, 'm');

        if (!fieldRegex.test(frontmatter)) {
          target.push(`${relativePath}: missing "${field}" in frontmatter`);
        }
      }

      // Check id matches filename.
      const idMatch = new RegExp(PATTERN_ID_LINE, 'm').exec(frontmatter);

      if (idMatch !== null && idMatch[1] !== undefined) {
        const id = idMatch[1].trim();
        const expectedId = fileName === 'index' ? 'overview' : fileName;

        if (id !== expectedId) {
          target.push(`${relativePath}: id "${id}" does not match expected "${expectedId}"`);
        }
      }

      // TODO Remove placeholder "x" checks once all pages have real description, keywords, and tags.
      // Check description is not placeholder.
      const descMatch = new RegExp(PATTERN_DESCRIPTION_LINE, 'm').exec(frontmatter);

      if (descMatch !== null && descMatch[1] !== undefined && descMatch[1].trim() === 'x') {
        target.push(`${relativePath}: description is placeholder "x"`);
      }

      // Check keywords is not placeholder.
      const keywordsIndex = frontmatter.indexOf('keywords:');

      if (keywordsIndex !== -1) {
        const afterKeywords = frontmatter.slice(keywordsIndex + 'keywords:'.length);
        const keywordLines: FrontmatterDocsTestKeywordLines = [];
        const lines = afterKeywords.split('\n');

        for (let i = 1; i < lines.length; i += 1) {
          const line = lines[i];

          if (line === undefined) {
            break;
          }

          if (line.startsWith('  - ')) {
            keywordLines.push(line.replace('  - ', '').trim());
          } else {
            break;
          }
        }

        if (keywordLines.length === 1 && keywordLines[0] === 'x') {
          target.push(`${relativePath}: keywords contains only placeholder "x"`);
        }

        if (keywordLines.length === 0) {
          target.push(`${relativePath}: keywords is empty`);
        }
      }

      // Check tags is not placeholder.
      const tagsIndex = frontmatter.indexOf('tags:');

      if (tagsIndex !== -1) {
        const afterTags = frontmatter.slice(tagsIndex + 'tags:'.length);
        const tagLines: FrontmatterDocsTestTagLines = [];
        const lines = afterTags.split('\n');

        for (let i = 1; i < lines.length; i += 1) {
          const line = lines[i];

          if (line === undefined) {
            break;
          }

          if (line.startsWith('  - ')) {
            tagLines.push(line.replace('  - ', '').trim());
          } else {
            break;
          }
        }

        if (tagLines.length === 1 && tagLines[0] === 'x') {
          target.push(`${relativePath}: tags contains only placeholder "x"`);
        }

        if (tagLines.length === 0) {
          target.push(`${relativePath}: tags is empty`);
        }
      }
    }

    if (warnings.length > 0) {
      process.stdout.write(`\nPlaceholder pages with incomplete frontmatter (${warnings.length}):\n${warnings.join('\n')}\n`);
    }

    strictEqual(
      failures.length,
      0,
      `\nFrontmatter issues:\n${failures.join('\n')}`,
    );
  });
});
