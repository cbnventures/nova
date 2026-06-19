import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import {
  basename,
  extname,
  join,
  resolve,
} from 'node:path';

import { describe, it } from 'vitest';

import {
  PATTERN_DESCRIPTION_LINE,
  PATTERN_ID_LINE,
} from '@site/src/lib/regex.js';

import type {
  Tests_Frontmatter_FrontmatterConfig,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_AfterKeywords,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_AfterTags,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Body,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Content,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_ContentDirs,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_ContentPath,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Cwd,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_DescMatch,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_EndIndex,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Entries,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_ExpectedId,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Ext,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Failures,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_FieldRegex,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_FieldSource,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_FileExt,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_FileName,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_FilePath,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Frontmatter,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Id,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_IdMatch,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_IsBlogPost,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_IsPlaceholder,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_KeywordLines,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_KeywordsIndex,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Line,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Lines,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_MdFiles,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_RequiredFields,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_TagLines,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_TagsIndex,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_TagSplitLine,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_TagSplitLines,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Target,
  Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Warnings,
} from '@site/src/types/tests/frontmatter.test.d.ts';

/**
 * Tests - Frontmatter - Config.
 *
 * @since 0.18.0
 */
const frontmatterConfig: Tests_Frontmatter_FrontmatterConfig = {
  requiredFields: [
    'title',
    'description',
    'tags',
  ],
  requiredBlogFields: [
    'title',
    'authors',
    'tags',
  ],
};

/**
 * Tests - Frontmatter - Frontmatter Validation.
 *
 * @since 0.14.0
 */
describe('Frontmatter validation', async () => {
  it('all documentation files have valid frontmatter', async () => {
    const cwd: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Cwd = process.cwd();
    const contentDirs: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_ContentDirs = [
      'docs',
      'blog',
    ];
    const mdFiles: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_MdFiles = [];

    for (const contentDir of contentDirs) {
      const contentPath: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_ContentPath = resolve(cwd, contentDir);
      const entries: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Entries = await readdir(contentPath, { recursive: true });

      for (const entry of entries) {
        const ext: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Ext = extname(entry);

        if (ext === '.md' || ext === '.mdx') {
          mdFiles.push(join(contentDir, entry));
        }
      }
    }

    const failures: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Failures = [];
    const warnings: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Warnings = [];

    for (const mdFile of mdFiles) {
      const filePath: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_FilePath = join(cwd, mdFile);
      const content: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Content = await readFile(filePath, 'utf-8');

      if (content.startsWith('---') === false) {
        failures.push(`${mdFile}: missing frontmatter`);

        continue;
      }

      const endIndex: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_EndIndex = content.indexOf('---', 3);

      if (endIndex === -1) {
        failures.push(`${mdFile}: unclosed frontmatter`);

        continue;
      }

      const frontmatter: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Frontmatter = content.slice(3, endIndex).trim();
      const body: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Body = content.slice(endIndex + 3).trim();
      const fileExt: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_FileExt = extname(mdFile);
      const fileName: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_FileName = basename(mdFile, fileExt);
      /*
       * TODO Remove placeholder warning bypass (isPlaceholder, warnings, target, and console.log)
       * once all "Coming soon" pages have real frontmatter.
       */
      const isBlogPost: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_IsBlogPost = mdFile.startsWith('blog/');
      const isPlaceholder: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_IsPlaceholder = body.startsWith('Coming soon');

      const target: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Target = (isPlaceholder === true) ? warnings : failures;

      // Check required fields exist.
      let requiredFields: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_RequiredFields = frontmatterConfig['requiredFields'];

      if (isBlogPost === true) {
        requiredFields = frontmatterConfig['requiredBlogFields'];
      }

      for (const field of requiredFields) {
        const fieldSource: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_FieldSource = `^${field}:`;
        const fieldRegex: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_FieldRegex = new RegExp(fieldSource, 'm');

        if (fieldRegex.test(frontmatter) === false) {
          target.push(`${mdFile}: missing "${field}" in frontmatter`);
        }
      }

      // Check id matches filename (docs only).
      const idMatch: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_IdMatch = new RegExp(PATTERN_ID_LINE, 'm').exec(frontmatter);

      if (
        isBlogPost === false
        && idMatch !== null
        && idMatch[1] !== undefined
      ) {
        const id: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Id = idMatch[1].trim();
        const expectedId: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_ExpectedId = (fileName === 'index') ? 'overview' : fileName;

        if (id !== expectedId) {
          target.push(`${mdFile}: id "${id}" does not match expected "${expectedId}"`);
        }
      }

      /*
       * TODO Remove placeholder "x" checks once all pages have real description, keywords, and tags.
       * Check description is not placeholder.
       */
      const descMatch: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_DescMatch = new RegExp(PATTERN_DESCRIPTION_LINE, 'm').exec(frontmatter);

      if (
        isBlogPost === false
        && descMatch !== null
        && descMatch[1] !== undefined
        && descMatch[1].trim() === 'x'
      ) {
        target.push(`${mdFile}: description is placeholder "x"`);
      }

      // Check keywords is not placeholder (docs only).
      const keywordsIndex: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_KeywordsIndex = frontmatter.indexOf('keywords:');

      if (isBlogPost === false && keywordsIndex !== -1) {
        const afterKeywords: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_AfterKeywords = frontmatter.slice(keywordsIndex + 'keywords:'.length);
        const keywordLines: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_KeywordLines = [];
        const lines: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Lines = afterKeywords.split('\n');

        for (let i = 1; i < lines.length; i += 1) {
          const line: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_Line = lines[i];

          if (line === undefined) {
            break;
          }

          if (line.startsWith('  - ') === true) {
            keywordLines.push(line.replace('  - ', '').trim());
          } else {
            break;
          }
        }

        if (keywordLines.length === 1 && keywordLines[0] === 'x') {
          target.push(`${mdFile}: keywords contains only placeholder "x"`);
        }

        if (keywordLines.length === 0) {
          target.push(`${mdFile}: keywords is empty`);
        }
      }

      // Check tags is not placeholder.
      const tagsIndex: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_TagsIndex = frontmatter.indexOf('tags:');

      if (tagsIndex !== -1) {
        const afterTags: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_AfterTags = frontmatter.slice(tagsIndex + 'tags:'.length);

        // Skip inline array format (e.g. tags: [a, b, c]).
        if (afterTags.trimStart().startsWith('[') === false) {
          const tagLines: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_TagLines = [];
          const tagSplitLines: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_TagSplitLines = afterTags.split('\n');

          for (let i = 1; i < tagSplitLines.length; i += 1) {
            const tagSplitLine: Tests_Frontmatter_FrontmatterValidation_AllDocumentationFilesHaveValidFrontmatter_TagSplitLine = tagSplitLines[i];

            if (tagSplitLine === undefined) {
              break;
            }

            if (tagSplitLine.startsWith('  - ') === true) {
              tagLines.push(tagSplitLine.replace('  - ', '').trim());
            } else {
              break;
            }
          }

          if (tagLines.length === 1 && tagLines[0] === 'x') {
            target.push(`${mdFile}: tags contains only placeholder "x"`);
          }

          if (tagLines.length === 0) {
            target.push(`${mdFile}: tags is empty`);
          }
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

    return;
  });

  return;
});
