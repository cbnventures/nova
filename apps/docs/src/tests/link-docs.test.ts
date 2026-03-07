import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import {
  dirname,
  extname,
  join,
  resolve,
} from 'node:path';
import { test } from 'node:test';

import {
  PATTERN_DOCS_PREFIX,
  PATTERN_FILE_EXTENSION_MD,
  PATTERN_HEADING_LINE,
  PATTERN_HTML_TAGS,
  PATTERN_ID_LINE,
  PATTERN_INDEX_SUFFIX,
  PATTERN_MARKDOWN_LINK,
  PATTERN_NON_WORD_CHARS,
  PATTERN_TRAILING_SLASH,
  PATTERN_WHITESPACE,
} from '@/lib/regex.js';

import type {
  LinkDocsTestExistingPaths,
  LinkDocsTestFailures,
  LinkDocsTestFileHeadings,
  LinkDocsTestHeadings,
  LinkDocsTestIdPaths,
  LinkDocsTestProseLines,
} from '@/types/tests/link-docs.test.d.ts';

/**
 * Link docs validation.
 *
 * @since 1.0.0
 */
test('Link docs validation', async (context) => {
  await context.test('all internal links point to existing files and anchors', async () => {
    const docsDir = resolve(process.cwd(), 'docs');
    const entries = await readdir(docsDir, { recursive: true });
    const mdFiles = entries.filter((entry) => {
      const ext = extname(entry);

      return ext === '.md' || ext === '.mdx';
    });

    // Build a set of all existing doc file paths (normalized without extension).
    const existingPaths: LinkDocsTestExistingPaths = new Set();

    // Build an id-based lookup: dir + frontmatter id → valid path.
    const idPaths: LinkDocsTestIdPaths = new Set();

    for (const entry of mdFiles) {
      const withoutExt = entry.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');

      existingPaths.add(withoutExt);

      // index files can be referenced by directory path.
      if (withoutExt.endsWith('/index')) {
        existingPaths.add(withoutExt.replace(new RegExp(PATTERN_INDEX_SUFFIX), ''));
      }

      // Parse frontmatter id for id-based routing.
      const filePath = join(docsDir, entry);
      const content = await readFile(filePath, 'utf-8');
      const idMatch = new RegExp(PATTERN_ID_LINE, 'm').exec(content);

      if (idMatch !== null && idMatch[1] !== undefined) {
        const id = idMatch[1].trim();
        const dir = dirname(withoutExt);
        const idPath = dir === '.' ? id : `${dir}/${id}`;

        idPaths.add(idPath);
      }
    }

    // Build a map of file path to heading anchors.
    const fileHeadings: LinkDocsTestFileHeadings = new Map();

    for (const relativePath of mdFiles) {
      const filePath = join(docsDir, relativePath);
      const content = await readFile(filePath, 'utf-8');
      const headings: LinkDocsTestHeadings = new Set();

      for (const match of content.matchAll(new RegExp(PATTERN_HEADING_LINE, 'gm'))) {
        const matchCapture = match[1] ?? '';

        const anchor = matchCapture
          .replace(new RegExp(PATTERN_HTML_TAGS, 'g'), '')
          .trim()
          .toLowerCase()
          .replace(new RegExp(PATTERN_NON_WORD_CHARS, 'g'), '')
          .replace(new RegExp(PATTERN_WHITESPACE, 'g'), '-');

        headings.add(anchor);
      }

      const withoutExt = relativePath.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');

      fileHeadings.set(withoutExt, headings);

      if (withoutExt.endsWith('/index')) {
        fileHeadings.set(withoutExt.replace(new RegExp(PATTERN_INDEX_SUFFIX), ''), headings);
      }

      // Also map by frontmatter id.
      const idMatch = new RegExp(PATTERN_ID_LINE, 'm').exec(content);

      if (idMatch !== null && idMatch[1] !== undefined) {
        const id = idMatch[1].trim();
        const dir = dirname(withoutExt);
        const idPath = dir === '.' ? id : `${dir}/${id}`;

        fileHeadings.set(idPath, headings);
      }
    }

    const failures: LinkDocsTestFailures = [];

    for (const relativePath of mdFiles) {
      const filePath = join(docsDir, relativePath);
      const content = await readFile(filePath, 'utf-8');

      // Skip code blocks.
      const lines = content.split('\n');
      let inCodeBlock = false;
      const proseLines: LinkDocsTestProseLines = [];

      for (const line of lines) {
        if (line.trimStart().startsWith('```')) {
          inCodeBlock = !inCodeBlock;

          continue;
        }

        if (!inCodeBlock) {
          proseLines.push(line);
        }
      }

      const prose = proseLines.join('\n');

      for (const linkMatch of prose.matchAll(new RegExp(PATTERN_MARKDOWN_LINK, 'g'))) {
        const href = linkMatch[2] ?? '';

        // Skip external links, mailto, and protocol links.
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('#')) {
          // Anchor-only links: check heading exists in current file.
          if (href.startsWith('#')) {
            const anchor = href.slice(1);
            const currentPath = relativePath.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');
            const headings = fileHeadings.get(currentPath);

            if (headings && !headings.has(anchor)) {
              failures.push(`${relativePath}: anchor "${href}" not found in same file`);
            }
          }

          continue;
        }

        // Internal doc links starting with /docs/.
        if (href.startsWith('/docs/')) {
          const [pathPart, anchor] = href.split('#');
          const pathPartValue = pathPart ?? '';

          // Strip trailing slash and normalize.
          const docPath = pathPartValue.replace(new RegExp(PATTERN_DOCS_PREFIX), '').replace(new RegExp(PATTERN_TRAILING_SLASH), '');

          // Skip Docusaurus auto-generated category routes.
          if (docPath.startsWith('category/')) {
            continue;
          }

          if (!existingPaths.has(docPath) && !idPaths.has(docPath)) {
            failures.push(`${relativePath}: link target "${pathPartValue}" does not exist`);

            continue;
          }

          if (anchor) {
            const headings = fileHeadings.get(docPath);

            if (headings && !headings.has(anchor)) {
              failures.push(`${relativePath}: anchor "${href}" not found in target file`);
            }
          }
        }
      }
    }

    strictEqual(
      failures.length,
      0,
      `\nBroken links:\n${failures.join('\n')}`,
    );
  });
});
