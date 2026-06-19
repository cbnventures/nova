import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import {
  dirname,
  extname,
  join,
  resolve,
} from 'node:path';

import { describe, it } from 'vitest';

import {
  PATTERN_BLOG_DATE_PREFIX,
  PATTERN_BLOG_PREFIX,
  PATTERN_DOCS_PREFIX,
  PATTERN_FILE_EXTENSION_MD,
  PATTERN_HEADING_LINE,
  PATTERN_HTML_TAGS,
  PATTERN_ID_LINE,
  PATTERN_INDEX_SUFFIX,
  PATTERN_MARKDOWN_LINK,
  PATTERN_NON_WORD_CHARS,
  PATTERN_SLUG_LINE,
  PATTERN_TRAILING_SLASH,
  PATTERN_WHITESPACE,
} from '@site/src/lib/regex.js';

import type {
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Anchor,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogAnchor,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogFileName,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogHeadingsLookup,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogPath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogPathPartValue,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogPaths,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogSlug,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Content,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_ContentDirs,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_ContentPath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_CurrentPath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Cwd,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Dir,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocAnchor,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocDir,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocHeadingsLookup,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocId,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocIdMatch,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocIdPath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocIndexSuffix,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocMapRelativePath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocPath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocRelativePath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocWithoutExt,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Entries,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_ExistingPaths,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Ext,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Failures,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_FileHeadings,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_FilePath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_HeadingContent,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_HeadingFilePath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Headings,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_HeadingsLookup,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Href,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Id,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_IdMatch,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_IdPath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_IdPaths,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_InCodeBlock,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_IndexSuffix,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Lines,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_LinkContent,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_LinkFilePath,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_MatchCapture,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_MdFiles,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_PathPartValue,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Prose,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_ProseLines,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_SelfAnchor,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_SelfWithoutExt,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_SlugMatch,
  Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_WithoutExt,
} from '@site/src/types/tests/link.test.d.ts';

/**
 * Tests - Link - Link Validation.
 *
 * @since 0.14.0
 */
describe('Link validation', async () => {
  it('all internal links point to existing files and anchors', async () => {
    const cwd: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Cwd = process.cwd();
    const contentDirs: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_ContentDirs = [
      'docs',
      'blog',
    ];
    const mdFiles: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_MdFiles = [];

    for (const contentDir of contentDirs) {
      const contentPath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_ContentPath = resolve(cwd, contentDir);
      const entries: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Entries = await readdir(contentPath, { recursive: true });

      for (const entry of entries) {
        const ext: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Ext = extname(entry);

        if (ext === '.md' || ext === '.mdx') {
          mdFiles.push(join(contentDir, entry));
        }
      }
    }

    // Build a set of all existing doc file paths (normalized without extension).
    const existingPaths: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_ExistingPaths = new Set();

    // Build a set of valid blog slugs for /blog/... link validation.
    const blogPaths: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogPaths = new Set();

    // Build an id-based lookup: dir + frontmatter id -> valid path.
    const idPaths: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_IdPaths = new Set();

    for (const mdFile of mdFiles) {
      if (mdFile.startsWith('docs/') === false) {
        continue;
      }

      const docRelativePath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocRelativePath = mdFile.slice('docs/'.length);
      const withoutExt: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_WithoutExt = docRelativePath.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');

      existingPaths.add(withoutExt);

      // index files can be referenced by directory path.
      if (withoutExt.endsWith('/index') === true) {
        const indexSuffix: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_IndexSuffix = withoutExt.replace(new RegExp(PATTERN_INDEX_SUFFIX), '');

        existingPaths.add(indexSuffix);
      }

      // Parse frontmatter id for id-based routing.
      const filePath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_FilePath = join(cwd, mdFile);
      const content: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Content = await readFile(filePath, 'utf-8');
      const idMatch: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_IdMatch = new RegExp(PATTERN_ID_LINE, 'm').exec(content);

      if (idMatch !== null && idMatch[1] !== undefined) {
        const id: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Id = idMatch[1].trim();
        const dir: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Dir = dirname(withoutExt);
        const idPath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_IdPath = (dir === '.') ? id : `${dir}/${id}`;

        idPaths.add(idPath);
      }
    }

    // Build a map of file path to heading anchors.
    const fileHeadings: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_FileHeadings = new Map();

    for (const mdFile of mdFiles) {
      const headingFilePath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_HeadingFilePath = join(cwd, mdFile);
      const headingContent: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_HeadingContent = await readFile(headingFilePath, 'utf-8');
      const headings: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Headings = new Set();

      for (const match of headingContent.matchAll(new RegExp(PATTERN_HEADING_LINE, 'gm'))) {
        const matchCapture: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_MatchCapture = match[1] ?? '';

        const anchor: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Anchor = matchCapture
          .replace(new RegExp(PATTERN_HTML_TAGS, 'g'), '')
          .trim()
          .toLowerCase()
          .replace(new RegExp(PATTERN_NON_WORD_CHARS, 'g'), '')
          .replace(new RegExp(PATTERN_WHITESPACE, 'g'), '-');

        headings.add(anchor);
      }

      // Store by full path for self-anchor lookups.
      const selfWithoutExt: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_SelfWithoutExt = mdFile.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');

      fileHeadings.set(selfWithoutExt, headings);

      // Docs files also need docs-relative keys for /docs/... link lookups.
      if (mdFile.startsWith('docs/') === true) {
        const docMapRelativePath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocMapRelativePath = mdFile.slice('docs/'.length);
        const docWithoutExt: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocWithoutExt = docMapRelativePath.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');

        fileHeadings.set(docWithoutExt, headings);

        if (docWithoutExt.endsWith('/index') === true) {
          const docIndexSuffix: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocIndexSuffix = docWithoutExt.replace(new RegExp(PATTERN_INDEX_SUFFIX), '');

          fileHeadings.set(docIndexSuffix, headings);
        }

        // Also map by frontmatter id.
        const docIdMatch: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocIdMatch = new RegExp(PATTERN_ID_LINE, 'm').exec(headingContent);

        if (docIdMatch !== null && docIdMatch[1] !== undefined) {
          const docId: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocId = docIdMatch[1].trim();
          const docDir: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocDir = dirname(docWithoutExt);
          const docIdPath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocIdPath = (docDir === '.') ? docId : `${docDir}/${docId}`;

          fileHeadings.set(docIdPath, headings);
        }
      }

      // Blog files: build slug lookup for /blog/... link validation.
      if (mdFile.startsWith('blog/') === true) {
        const slugMatch: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_SlugMatch = new RegExp(PATTERN_SLUG_LINE, 'm').exec(headingContent);
        let blogSlug: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogSlug = '';

        if (slugMatch !== null && slugMatch[1] !== undefined) {
          blogSlug = slugMatch[1].trim();
        } else {
          const blogFileName: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogFileName = selfWithoutExt.split('/').pop() ?? '';

          blogSlug = blogFileName.replace(new RegExp(PATTERN_BLOG_DATE_PREFIX), '');
        }

        if (blogSlug !== '') {
          blogPaths.add(blogSlug);

          fileHeadings.set(blogSlug, headings);
        }
      }
    }

    const failures: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Failures = [];

    for (const mdFile of mdFiles) {
      const linkFilePath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_LinkFilePath = join(cwd, mdFile);
      const linkContent: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_LinkContent = await readFile(linkFilePath, 'utf-8');

      // Skip code blocks.
      const lines: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Lines = linkContent.split('\n');
      let inCodeBlock: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_InCodeBlock = false;
      const proseLines: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_ProseLines = [];

      for (const line of lines) {
        if (line.trimStart().startsWith('```') === true) {
          inCodeBlock = !inCodeBlock;

          continue;
        }

        if (inCodeBlock === false) {
          proseLines.push(line);
        }
      }

      const prose: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Prose = proseLines.join('\n');

      for (const linkMatch of prose.matchAll(new RegExp(PATTERN_MARKDOWN_LINK, 'g'))) {
        const href: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_Href = linkMatch[2] ?? '';

        // Skip external links, mailto, and protocol links.
        if (
          href.startsWith('http://') === true
          || href.startsWith('https://') === true
          || href.startsWith('mailto:') === true
          || href.startsWith('#') === true
        ) {
          // Anchor-only links: check heading exists in current file.
          if (href.startsWith('#') === true) {
            const selfAnchor: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_SelfAnchor = href.slice(1);
            const currentPath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_CurrentPath = mdFile.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');
            const headingsLookup: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_HeadingsLookup = fileHeadings.get(currentPath);

            if (headingsLookup !== undefined && headingsLookup.has(selfAnchor) === false) {
              failures.push(`${mdFile}: anchor "${href}" not found in same file`);
            }
          }

          continue;
        }

        // Internal doc links starting with /docs/.
        if (href.startsWith('/docs/') === true) {
          const pathPartValue: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_PathPartValue = href.split('#')[0] ?? '';
          const docAnchor: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocAnchor = href.split('#')[1] ?? '';

          // Strip trailing slash and normalize.
          const docPath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocPath = pathPartValue.replace(new RegExp(PATTERN_DOCS_PREFIX), '').replace(new RegExp(PATTERN_TRAILING_SLASH), '');

          // Skip Docusaurus auto-generated category routes.
          if (docPath.startsWith('category/') === true) {
            continue;
          }

          if (existingPaths.has(docPath) === false && idPaths.has(docPath) === false) {
            failures.push(`${mdFile}: link target "${pathPartValue}" does not exist`);

            continue;
          }

          if (docAnchor !== '') {
            const docHeadingsLookup: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_DocHeadingsLookup = fileHeadings.get(docPath);

            if (docHeadingsLookup !== undefined && docHeadingsLookup.has(docAnchor) === false) {
              failures.push(`${mdFile}: anchor "${href}" not found in target file`);
            }
          }
        }

        // Internal blog links starting with /blog/.
        if (href.startsWith('/blog/') === true) {
          const blogPathPartValue: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogPathPartValue = href.split('#')[0] ?? '';
          const blogAnchor: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogAnchor = href.split('#')[1] ?? '';

          // Strip /blog/ prefix and trailing slash.
          const blogPath: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogPath = blogPathPartValue.replace(new RegExp(PATTERN_BLOG_PREFIX), '').replace(new RegExp(PATTERN_TRAILING_SLASH), '');

          if (blogPaths.has(blogPath) === false) {
            failures.push(`${mdFile}: link target "${blogPathPartValue}" does not exist`);

            continue;
          }

          if (blogAnchor !== '') {
            const blogHeadingsLookup: Tests_Link_LinkValidation_AllInternalLinksPointToExistingFilesAndAnchors_BlogHeadingsLookup = fileHeadings.get(blogPath);

            if (blogHeadingsLookup !== undefined && blogHeadingsLookup.has(blogAnchor) === false) {
              failures.push(`${mdFile}: anchor "${href}" not found in target file`);
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

    return;
  });

  return;
});
