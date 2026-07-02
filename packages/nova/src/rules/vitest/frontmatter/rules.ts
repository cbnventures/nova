import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  basename,
  extname,
  join,
} from 'node:path';

import { it } from 'vitest';

import {
  LIB_REGEX_PATTERN_DESCRIPTION_LINE,
  LIB_REGEX_PATTERN_ID_LINE,
} from '../../../lib/regex.js';
import { isEnabled } from '../enable.js';

import type {
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Body,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Config,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Content,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_DescMatch,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Enable,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Failures,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_FilePath,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Files,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Frontmatter,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_IsBlogPost,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_IsPlaceholder,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Returns,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Sentinel,
  Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Split,
  Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Config,
  Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Content,
  Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Enable,
  Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_EndIndex,
  Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_FilePath,
  Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Files,
  Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Returns,
  Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Config,
  Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Content,
  Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Enable,
  Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_FilePath,
  Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Files,
  Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Returns,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Body,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Config,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Content,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Enable,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_ExpectedId,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Failures,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_FileExt,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_FileName,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_FilePath,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Files,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Frontmatter,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Id,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_IdMatch,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_IsBlogPost,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_IsPlaceholder,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Returns,
  Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Split,
  Rules_Vitest_Frontmatter_Rules_IsBlogFile_BlogDir,
  Rules_Vitest_Frontmatter_Rules_IsBlogFile_BlogPrefix,
  Rules_Vitest_Frontmatter_Rules_IsBlogFile_FilePath,
  Rules_Vitest_Frontmatter_Rules_IsBlogFile_Returns,
  Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Body,
  Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Config,
  Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Enable,
  Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Returns,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_AfterKeywords,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Config,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Content,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Enable,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Failures,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_FilePath,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Files,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Frontmatter,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_IsBlogPost,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_IsPlaceholder,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_KeywordLines,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_KeywordsIndex,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Line,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Lines,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Returns,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Split,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_AfterKeywords,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Body,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Config,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Content,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Enable,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Failures,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_FilePath,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Files,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Frontmatter,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_IsBlogPost,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_IsPlaceholder,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_KeywordLines,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_KeywordsIndex,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Line,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Lines,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Returns,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Sentinel,
  Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Split,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Config,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Content,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Enable,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Failures,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_FieldRegex,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_FieldSource,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_FilePath,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Files,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Frontmatter,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_IsBlogPost,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_IsPlaceholder,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Returns,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Split,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Config,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Content,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Enable,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Failures,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_FieldRegex,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_FieldSource,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_FilePath,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Files,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Frontmatter,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_IsBlogPost,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_IsPlaceholder,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Returns,
  Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Split,
  Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Body,
  Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Content,
  Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_EndIndex,
  Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Frontmatter,
  Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Returns,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_AfterTags,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Config,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Content,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Enable,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Failures,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_FilePath,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Files,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Frontmatter,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_IsPlaceholder,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Returns,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Split,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagLines,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagsIndex,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagSplitLine,
  Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagSplitLines,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_AfterTags,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Body,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Config,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Content,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Enable,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Failures,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_FilePath,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Files,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Frontmatter,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_IsPlaceholder,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Returns,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Sentinel,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Split,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagLines,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagsIndex,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagSplitLine,
  Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagSplitLines,
} from '../../../types/rules/vitest/frontmatter/rules.d.ts';

/**
 * Rules - Vitest - Frontmatter - Rules - Split Frontmatter.
 *
 * Splits a file's raw content into the trimmed frontmatter block and the trimmed body.
 * Returns `null` when the content has no opening or closing `---`; those conditions are
 * validated by dedicated rules, so other rules skip a file with no parseable frontmatter.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Content} content - Content.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Returns}
 *
 * @since 0.20.0
 */
export function splitFrontmatter(content: Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Content): Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Returns {
  if (content.startsWith('---') === false) {
    return null;
  }

  const endIndex: Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_EndIndex = content.indexOf('---', 3);

  if (endIndex === -1) {
    return null;
  }

  const frontmatter: Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Frontmatter = content.slice(3, endIndex).trim();
  const body: Rules_Vitest_Frontmatter_Rules_SplitFrontmatter_Body = content.slice(endIndex + 3).trim();

  return {
    frontmatter,
    body,
  };
}

/**
 * Rules - Vitest - Frontmatter - Rules - Is Placeholder Page.
 *
 * Decides whether a file's issues should be downgraded from failures to warnings. This is
 * the `placeholder-pages-warn-not-fail` behavior gate: a file qualifies only when that
 * toggle is enabled, a prefix is configured, and the body starts with that prefix.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Body}   body   - Body.
 * @param {Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Returns}
 *
 * @since 0.20.0
 */
export function isPlaceholderPage(body: Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Body, config: Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Config, enable: Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Enable): Rules_Vitest_Frontmatter_Rules_IsPlaceholderPage_Returns {
  if (isEnabled('placeholder-pages-warn-not-fail', enable) === false) {
    return false;
  }

  if (config['placeholderBodyPrefix'] === undefined) {
    return false;
  }

  return body.startsWith(config['placeholderBodyPrefix']) === true;
}

/**
 * Rules - Vitest - Frontmatter - Rules - Is Blog File.
 *
 * Tests whether a discovered content path belongs to the configured blog directory by
 * checking the path against the `<blogDir>/` prefix.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_IsBlogFile_FilePath} filePath - File path.
 * @param {Rules_Vitest_Frontmatter_Rules_IsBlogFile_BlogDir}  blogDir  - Blog dir.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_IsBlogFile_Returns}
 *
 * @since 0.20.0
 */
export function isBlogFile(filePath: Rules_Vitest_Frontmatter_Rules_IsBlogFile_FilePath, blogDir: Rules_Vitest_Frontmatter_Rules_IsBlogFile_BlogDir): Rules_Vitest_Frontmatter_Rules_IsBlogFile_Returns {
  const blogPrefix: Rules_Vitest_Frontmatter_Rules_IsBlogFile_BlogPrefix = `${blogDir}/`;

  return filePath.startsWith(blogPrefix) === true;
}

/**
 * Rules - Vitest - Frontmatter - Rules - Frontmatter Present.
 *
 * Rule `frontmatter-present`: every content file must open with a `---` frontmatter
 * fence at the top of the file.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Returns}
 *
 * @since 0.20.0
 */
export async function frontmatterPresent(config: Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Config, enable: Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Enable): Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Returns {
  if (isEnabled('frontmatter-present', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Files = config['files'];

  for (const file of files) {
    it(`frontmatter present in ${file}`, async () => {
      const filePath: Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Frontmatter_Rules_FrontmatterPresent_Content = await readFile(filePath, 'utf-8');

      strictEqual(content.startsWith('---'), true, `${file}: missing frontmatter`);

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Frontmatter - Rules - Frontmatter Closed.
 *
 * Rule `frontmatter-closed`: a file that opens a frontmatter fence must also close
 * it with `---`.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Returns}
 *
 * @since 0.20.0
 */
export async function frontmatterClosed(config: Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Config, enable: Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Enable): Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Returns {
  if (isEnabled('frontmatter-closed', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Files = config['files'];

  for (const file of files) {
    it(`frontmatter closed in ${file}`, async () => {
      const filePath: Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_Content = await readFile(filePath, 'utf-8');

      if (content.startsWith('---') === false) {
        return;
      }

      const endIndex: Rules_Vitest_Frontmatter_Rules_FrontmatterClosed_EndIndex = content.indexOf('---', 3);

      strictEqual(endIndex !== -1, true, `${file}: unclosed frontmatter`);

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Frontmatter - Rules - Required Fields Present Docs.
 *
 * Rule `required-fields-present-docs`: every non-blog doc must declare each of the
 * configured `requiredFields` keys.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Returns}
 *
 * @since 0.20.0
 */
export async function requiredFieldsPresentDocs(config: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Config, enable: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Enable): Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Returns {
  if (isEnabled('required-fields-present-docs', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Files = config['files'];

  for (const file of files) {
    const isBlogPost: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_IsBlogPost = isBlogFile(file, config['blogDir']);

    if (isBlogPost === true) {
      continue;
    }

    it(`required docs fields present in ${file}`, async () => {
      const filePath: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Content = await readFile(filePath, 'utf-8');
      const split: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Split = splitFrontmatter(content);

      if (split === null) {
        return;
      }

      const frontmatter: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Frontmatter = split['frontmatter'];
      const failures: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_Failures = [];

      for (const field of config['requiredFields']) {
        const fieldSource: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_FieldSource = `^${field}:`;
        const fieldRegex: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_FieldRegex = new RegExp(fieldSource, 'm');

        if (fieldRegex.test(frontmatter) === false) {
          failures.push(`${file}: missing "${field}" in frontmatter`);
        }
      }

      const isPlaceholder: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentDocs_IsPlaceholder = isPlaceholderPage(split['body'], config, enable);

      if (isPlaceholder === true) {
        if (failures.length > 0) {
          process.stdout.write([
            '',
            'Placeholder page with incomplete frontmatter:',
            failures.join('\n'),
            '',
          ].join('\n'));
        }

        return;
      }

      strictEqual(failures.length, 0, failures.join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Frontmatter - Rules - Required Fields Present Blog.
 *
 * Rule `required-fields-present-blog`: every blog post must declare each of the
 * configured `requiredBlogFields` keys.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Returns}
 *
 * @since 0.20.0
 */
export async function requiredFieldsPresentBlog(config: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Config, enable: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Enable): Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Returns {
  if (isEnabled('required-fields-present-blog', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Files = config['files'];

  for (const file of files) {
    const isBlogPost: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_IsBlogPost = isBlogFile(file, config['blogDir']);

    if (isBlogPost === false) {
      continue;
    }

    it(`required blog fields present in ${file}`, async () => {
      const filePath: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Content = await readFile(filePath, 'utf-8');
      const split: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Split = splitFrontmatter(content);

      if (split === null) {
        return;
      }

      const frontmatter: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Frontmatter = split['frontmatter'];
      const failures: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_Failures = [];

      for (const field of config['requiredBlogFields']) {
        const fieldSource: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_FieldSource = `^${field}:`;
        const fieldRegex: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_FieldRegex = new RegExp(fieldSource, 'm');

        if (fieldRegex.test(frontmatter) === false) {
          failures.push(`${file}: missing "${field}" in frontmatter`);
        }
      }

      const isPlaceholder: Rules_Vitest_Frontmatter_Rules_RequiredFieldsPresentBlog_IsPlaceholder = isPlaceholderPage(split['body'], config, enable);

      if (isPlaceholder === true) {
        if (failures.length > 0) {
          process.stdout.write([
            '',
            'Placeholder page with incomplete frontmatter:',
            failures.join('\n'),
            '',
          ].join('\n'));
        }

        return;
      }

      strictEqual(failures.length, 0, failures.join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Frontmatter - Rules - ID Matches Filename.
 *
 * Rule `id-matches-filename`: a non-blog doc's `id` must equal its filename (without
 * extension), with the configured `indexSlug` substituted for an `index` filename when set.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Returns}
 *
 * @since 0.20.0
 */
export async function idMatchesFilename(config: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Config, enable: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Enable): Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Returns {
  if (isEnabled('id-matches-filename', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Files = config['files'];

  for (const file of files) {
    const isBlogPost: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_IsBlogPost = isBlogFile(file, config['blogDir']);

    if (isBlogPost === true) {
      continue;
    }

    it(`id matches filename in ${file}`, async () => {
      const filePath: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Content = await readFile(filePath, 'utf-8');
      const split: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Split = splitFrontmatter(content);

      if (split === null) {
        return;
      }

      const frontmatter: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Frontmatter = split['frontmatter'];
      const body: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Body = split['body'];
      const fileExt: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_FileExt = extname(file);
      const fileName: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_FileName = basename(file, fileExt);
      const idMatch: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_IdMatch = new RegExp(LIB_REGEX_PATTERN_ID_LINE, 'm').exec(frontmatter);
      const failures: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Failures = [];

      if (idMatch !== null && idMatch[1] !== undefined) {
        const id: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_Id = idMatch[1].trim();
        let expectedId: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_ExpectedId = fileName;

        if (config['indexSlug'] !== null && fileName === 'index') {
          expectedId = config['indexSlug'];
        }

        if (id !== expectedId) {
          failures.push(`${file}: id "${id}" does not match expected "${expectedId}"`);
        }
      }

      const isPlaceholder: Rules_Vitest_Frontmatter_Rules_IdMatchesFilename_IsPlaceholder = isPlaceholderPage(body, config, enable);

      if (isPlaceholder === true) {
        if (failures.length > 0) {
          process.stdout.write([
            '',
            'Placeholder page with incomplete frontmatter:',
            failures.join('\n'),
            '',
          ].join('\n'));
        }

        return;
      }

      strictEqual(failures.length, 0, failures.join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Frontmatter - Rules - Description Not Placeholder.
 *
 * Rule `description-not-placeholder`: a non-blog doc's `description` must not equal the
 * configured `placeholderSentinel`. The rule is inert when no sentinel is configured.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Returns}
 *
 * @since 0.20.0
 */
export async function descriptionNotPlaceholder(config: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Config, enable: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Enable): Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Returns {
  if (isEnabled('description-not-placeholder', enable) === false) {
    return;
  }

  const sentinel: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Sentinel = config['placeholderSentinel'];

  if (sentinel === undefined) {
    return;
  }

  const files: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Files = config['files'];

  for (const file of files) {
    const isBlogPost: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_IsBlogPost = isBlogFile(file, config['blogDir']);

    if (isBlogPost === true) {
      continue;
    }

    it(`description not placeholder in ${file}`, async () => {
      const filePath: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Content = await readFile(filePath, 'utf-8');
      const split: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Split = splitFrontmatter(content);

      if (split === null) {
        return;
      }

      const frontmatter: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Frontmatter = split['frontmatter'];
      const body: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Body = split['body'];
      const descMatch: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_DescMatch = new RegExp(LIB_REGEX_PATTERN_DESCRIPTION_LINE, 'm').exec(frontmatter);
      const failures: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_Failures = [];

      if (
        descMatch !== null
        && descMatch[1] !== undefined
        && descMatch[1].trim() === sentinel
      ) {
        failures.push(`${file}: description is placeholder "${sentinel}"`);
      }

      const isPlaceholder: Rules_Vitest_Frontmatter_Rules_DescriptionNotPlaceholder_IsPlaceholder = isPlaceholderPage(body, config, enable);

      if (isPlaceholder === true) {
        if (failures.length > 0) {
          process.stdout.write([
            '',
            'Placeholder page with incomplete frontmatter:',
            failures.join('\n'),
            '',
          ].join('\n'));
        }

        return;
      }

      strictEqual(failures.length, 0, failures.join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Frontmatter - Rules - Keywords Not Placeholder.
 *
 * Rule `keywords-not-placeholder`: a non-blog doc's block-sequence `keywords` must not
 * contain only the configured `placeholderSentinel`. Inert when no sentinel is configured.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Returns}
 *
 * @since 0.20.0
 */
export async function keywordsNotPlaceholder(config: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Config, enable: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Enable): Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Returns {
  if (isEnabled('keywords-not-placeholder', enable) === false) {
    return;
  }

  const sentinel: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Sentinel = config['placeholderSentinel'];

  if (sentinel === undefined) {
    return;
  }

  const files: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Files = config['files'];

  for (const file of files) {
    const isBlogPost: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_IsBlogPost = isBlogFile(file, config['blogDir']);

    if (isBlogPost === true) {
      continue;
    }

    it(`keywords not placeholder in ${file}`, async () => {
      const filePath: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Content = await readFile(filePath, 'utf-8');
      const split: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Split = splitFrontmatter(content);

      if (split === null) {
        return;
      }

      const frontmatter: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Frontmatter = split['frontmatter'];
      const body: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Body = split['body'];
      const keywordsIndex: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_KeywordsIndex = frontmatter.indexOf('keywords:');
      const failures: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Failures = [];

      if (keywordsIndex !== -1) {
        const afterKeywords: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_AfterKeywords = frontmatter.slice(keywordsIndex + 'keywords:'.length);

        // Skip inline array format (e.g. keywords: [a, b, c]) - validated by keywords-not-empty.
        if (afterKeywords.trimStart().startsWith('[') === false) {
          const keywordLines: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_KeywordLines = [];
          const lines: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Lines = afterKeywords.split('\n');

          for (let i = 1; i < lines.length; i += 1) {
            const line: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_Line = lines[i];

            if (line === undefined) {
              break;
            }

            if (line.startsWith('  - ') === true) {
              keywordLines.push(line.replace('  - ', '').trim());
            } else {
              break;
            }
          }

          if (keywordLines.length === 1 && keywordLines[0] === sentinel) {
            failures.push(`${file}: keywords contains only placeholder "${sentinel}"`);
          }
        }
      }

      const isPlaceholder: Rules_Vitest_Frontmatter_Rules_KeywordsNotPlaceholder_IsPlaceholder = isPlaceholderPage(body, config, enable);

      if (isPlaceholder === true) {
        if (failures.length > 0) {
          process.stdout.write([
            '',
            'Placeholder page with incomplete frontmatter:',
            failures.join('\n'),
            '',
          ].join('\n'));
        }

        return;
      }

      strictEqual(failures.length, 0, failures.join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Frontmatter - Rules - Keywords Not Empty.
 *
 * Rule `keywords-not-empty`: a non-blog doc's block-sequence `keywords` must declare at
 * least one entry. The inline-array form (`keywords: [a, b]`) is skipped to avoid the latent
 * false positive where a populated inline array parses to zero block-sequence items.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Returns}
 *
 * @since 0.20.0
 */
export async function keywordsNotEmpty(config: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Config, enable: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Enable): Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Returns {
  if (isEnabled('keywords-not-empty', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Files = config['files'];

  for (const file of files) {
    const isBlogPost: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_IsBlogPost = isBlogFile(file, config['blogDir']);

    if (isBlogPost === true) {
      continue;
    }

    it(`keywords not empty in ${file}`, async () => {
      const filePath: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Content = await readFile(filePath, 'utf-8');
      const split: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Split = splitFrontmatter(content);

      if (split === null) {
        return;
      }

      const frontmatter: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Frontmatter = split['frontmatter'];
      const keywordsIndex: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_KeywordsIndex = frontmatter.indexOf('keywords:');
      const failures: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Failures = [];

      if (keywordsIndex !== -1) {
        const afterKeywords: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_AfterKeywords = frontmatter.slice(keywordsIndex + 'keywords:'.length);

        // Skip inline array format (e.g. keywords: [a, b, c]) - a populated inline array is non-empty.
        if (afterKeywords.trimStart().startsWith('[') === false) {
          const keywordLines: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_KeywordLines = [];
          const lines: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Lines = afterKeywords.split('\n');

          for (let i = 1; i < lines.length; i += 1) {
            const line: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_Line = lines[i];

            if (line === undefined) {
              break;
            }

            if (line.startsWith('  - ') === true) {
              keywordLines.push(line.replace('  - ', '').trim());
            } else {
              break;
            }
          }

          if (keywordLines.length === 0) {
            failures.push(`${file}: keywords is empty`);
          }
        }
      }

      const isPlaceholder: Rules_Vitest_Frontmatter_Rules_KeywordsNotEmpty_IsPlaceholder = isPlaceholderPage(split['body'], config, enable);

      if (isPlaceholder === true) {
        if (failures.length > 0) {
          process.stdout.write([
            '',
            'Placeholder page with incomplete frontmatter:',
            failures.join('\n'),
            '',
          ].join('\n'));
        }

        return;
      }

      strictEqual(failures.length, 0, failures.join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Frontmatter - Rules - Tags Not Placeholder.
 *
 * Rule `tags-not-placeholder`: a file's block-sequence `tags` must not contain only the
 * configured `placeholderSentinel`. The rule is inert when no sentinel is configured.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Returns}
 *
 * @since 0.20.0
 */
export async function tagsNotPlaceholder(config: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Config, enable: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Enable): Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Returns {
  if (isEnabled('tags-not-placeholder', enable) === false) {
    return;
  }

  const sentinel: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Sentinel = config['placeholderSentinel'];

  if (sentinel === undefined) {
    return;
  }

  const files: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Files = config['files'];

  for (const file of files) {
    it(`tags not placeholder in ${file}`, async () => {
      const filePath: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Content = await readFile(filePath, 'utf-8');
      const split: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Split = splitFrontmatter(content);

      if (split === null) {
        return;
      }

      const frontmatter: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Frontmatter = split['frontmatter'];
      const body: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Body = split['body'];
      const tagsIndex: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagsIndex = frontmatter.indexOf('tags:');
      const failures: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_Failures = [];

      if (tagsIndex !== -1) {
        const afterTags: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_AfterTags = frontmatter.slice(tagsIndex + 'tags:'.length);

        // Skip inline array format (e.g. tags: [a, b, c]).
        if (afterTags.trimStart().startsWith('[') === false) {
          const tagLines: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagLines = [];
          const tagSplitLines: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagSplitLines = afterTags.split('\n');

          for (let i = 1; i < tagSplitLines.length; i += 1) {
            const tagSplitLine: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_TagSplitLine = tagSplitLines[i];

            if (tagSplitLine === undefined) {
              break;
            }

            if (tagSplitLine.startsWith('  - ') === true) {
              tagLines.push(tagSplitLine.replace('  - ', '').trim());
            } else {
              break;
            }
          }

          if (tagLines.length === 1 && tagLines[0] === sentinel) {
            failures.push(`${file}: tags contains only placeholder "${sentinel}"`);
          }
        }
      }

      const isPlaceholder: Rules_Vitest_Frontmatter_Rules_TagsNotPlaceholder_IsPlaceholder = isPlaceholderPage(body, config, enable);

      if (isPlaceholder === true) {
        if (failures.length > 0) {
          process.stdout.write([
            '',
            'Placeholder page with incomplete frontmatter:',
            failures.join('\n'),
            '',
          ].join('\n'));
        }

        return;
      }

      strictEqual(failures.length, 0, failures.join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Frontmatter - Rules - Tags Not Empty.
 *
 * Rule `tags-not-empty`: a file's block-sequence `tags` must declare at least one entry.
 * The inline-array form (`tags: [a, b]`) is skipped because a populated array is non-empty.
 *
 * @param {Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Config} config - Config.
 * @param {Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Returns}
 *
 * @since 0.20.0
 */
export async function tagsNotEmpty(config: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Config, enable: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Enable): Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Returns {
  if (isEnabled('tags-not-empty', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Files = config['files'];

  for (const file of files) {
    it(`tags not empty in ${file}`, async () => {
      const filePath: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Content = await readFile(filePath, 'utf-8');
      const split: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Split = splitFrontmatter(content);

      if (split === null) {
        return;
      }

      const frontmatter: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Frontmatter = split['frontmatter'];
      const tagsIndex: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagsIndex = frontmatter.indexOf('tags:');
      const failures: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_Failures = [];

      if (tagsIndex !== -1) {
        const afterTags: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_AfterTags = frontmatter.slice(tagsIndex + 'tags:'.length);

        // Skip inline array format (e.g. tags: [a, b, c]) - a populated inline array is non-empty.
        if (afterTags.trimStart().startsWith('[') === false) {
          const tagLines: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagLines = [];
          const tagSplitLines: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagSplitLines = afterTags.split('\n');

          for (let i = 1; i < tagSplitLines.length; i += 1) {
            const tagSplitLine: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_TagSplitLine = tagSplitLines[i];

            if (tagSplitLine === undefined) {
              break;
            }

            if (tagSplitLine.startsWith('  - ') === true) {
              tagLines.push(tagSplitLine.replace('  - ', '').trim());
            } else {
              break;
            }
          }

          if (tagLines.length === 0) {
            failures.push(`${file}: tags is empty`);
          }
        }
      }

      const isPlaceholder: Rules_Vitest_Frontmatter_Rules_TagsNotEmpty_IsPlaceholder = isPlaceholderPage(split['body'], config, enable);

      if (isPlaceholder === true) {
        if (failures.length > 0) {
          process.stdout.write([
            '',
            'Placeholder page with incomplete frontmatter:',
            failures.join('\n'),
            '',
          ].join('\n'));
        }

        return;
      }

      strictEqual(failures.length, 0, failures.join('\n'));

      return;
    });
  }

  return;
}
