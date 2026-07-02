import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  dirname,
  join,
} from 'node:path';

import { it } from 'vitest';

import { slugifyHeading } from '../../../lib/markdown-slug.js';
import {
  LIB_REGEX_PATTERN_BLOG_DATE_PREFIX,
  LIB_REGEX_PATTERN_FILE_EXTENSION_MD,
  LIB_REGEX_PATTERN_HEADING_LINE,
  LIB_REGEX_PATTERN_ID_LINE,
  LIB_REGEX_PATTERN_INDEX_SUFFIX,
  LIB_REGEX_PATTERN_MARKDOWN_LINK,
  LIB_REGEX_PATTERN_SLUG_LINE,
  LIB_REGEX_PATTERN_TRAILING_SLASH,
} from '../../../lib/regex.js';
import { isEnabled } from '../enable.js';

import type {
  Rules_Vitest_Link_Rules_BuildLinkIndex_Anchor,
  Rules_Vitest_Link_Rules_BuildLinkIndex_BlogFileName,
  Rules_Vitest_Link_Rules_BuildLinkIndex_BlogPaths,
  Rules_Vitest_Link_Rules_BuildLinkIndex_BlogSlug,
  Rules_Vitest_Link_Rules_BuildLinkIndex_Config,
  Rules_Vitest_Link_Rules_BuildLinkIndex_Content,
  Rules_Vitest_Link_Rules_BuildLinkIndex_Dir,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocDir,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocId,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocIdMatch,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocIdPath,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocIndexSuffix,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocMapRelativePath,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocMapWithoutExt,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocPrefix,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocRelativePath,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocsDir,
  Rules_Vitest_Link_Rules_BuildLinkIndex_DocWithoutExt,
  Rules_Vitest_Link_Rules_BuildLinkIndex_ExistingPaths,
  Rules_Vitest_Link_Rules_BuildLinkIndex_FileHeadings,
  Rules_Vitest_Link_Rules_BuildLinkIndex_FilePath,
  Rules_Vitest_Link_Rules_BuildLinkIndex_Files,
  Rules_Vitest_Link_Rules_BuildLinkIndex_HeadingContent,
  Rules_Vitest_Link_Rules_BuildLinkIndex_HeadingFilePath,
  Rules_Vitest_Link_Rules_BuildLinkIndex_Headings,
  Rules_Vitest_Link_Rules_BuildLinkIndex_Id,
  Rules_Vitest_Link_Rules_BuildLinkIndex_IdMatch,
  Rules_Vitest_Link_Rules_BuildLinkIndex_IdPath,
  Rules_Vitest_Link_Rules_BuildLinkIndex_IdPaths,
  Rules_Vitest_Link_Rules_BuildLinkIndex_IndexSuffix,
  Rules_Vitest_Link_Rules_BuildLinkIndex_MatchCapture,
  Rules_Vitest_Link_Rules_BuildLinkIndex_Returns,
  Rules_Vitest_Link_Rules_BuildLinkIndex_SelfWithoutExt,
  Rules_Vitest_Link_Rules_BuildLinkIndex_SlugMatch,
  Rules_Vitest_Link_Rules_CollectProseLinks_Content,
  Rules_Vitest_Link_Rules_CollectProseLinks_Href,
  Rules_Vitest_Link_Rules_CollectProseLinks_Hrefs,
  Rules_Vitest_Link_Rules_CollectProseLinks_Prose,
  Rules_Vitest_Link_Rules_CollectProseLinks_Returns,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Anchor,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_BlogPath,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_BlogPrefix,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Config,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Content,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Enable,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Failures,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_FilePath,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Files,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_HeadingsLookup,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Hrefs,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_PathPartValue,
  Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Returns,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_BlogPath,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_BlogPrefix,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_Config,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_Content,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_Enable,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_Failures,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_FilePath,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_Files,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_Hrefs,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_PathPartValue,
  Rules_Vitest_Link_Rules_InternalBlogTargetExists_Returns,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_Anchor,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_Config,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_Content,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_DocPath,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_DocPrefix,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_Enable,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_Failures,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_FilePath,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_Files,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_HeadingsLookup,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_Hrefs,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_PathPartValue,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_Returns,
  Rules_Vitest_Link_Rules_InternalDocAnchorExists_SkipPrefix,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_Config,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_Content,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_DocPath,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_DocPrefix,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_Enable,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_Failures,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_FilePath,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_Files,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_Hrefs,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_Index,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_PathPartValue,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_Returns,
  Rules_Vitest_Link_Rules_InternalDocTargetExists_SkipPrefix,
  Rules_Vitest_Link_Rules_LinkContentDirs_Config,
  Rules_Vitest_Link_Rules_LinkContentDirs_Dirs,
  Rules_Vitest_Link_Rules_LinkContentDirs_Returns,
  Rules_Vitest_Link_Rules_SelfAnchorExists_Anchor,
  Rules_Vitest_Link_Rules_SelfAnchorExists_Config,
  Rules_Vitest_Link_Rules_SelfAnchorExists_Content,
  Rules_Vitest_Link_Rules_SelfAnchorExists_CurrentPath,
  Rules_Vitest_Link_Rules_SelfAnchorExists_Enable,
  Rules_Vitest_Link_Rules_SelfAnchorExists_Failures,
  Rules_Vitest_Link_Rules_SelfAnchorExists_FilePath,
  Rules_Vitest_Link_Rules_SelfAnchorExists_Files,
  Rules_Vitest_Link_Rules_SelfAnchorExists_HeadingsLookup,
  Rules_Vitest_Link_Rules_SelfAnchorExists_Hrefs,
  Rules_Vitest_Link_Rules_SelfAnchorExists_Index,
  Rules_Vitest_Link_Rules_SelfAnchorExists_Returns,
  Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Enable,
  Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Hrefs,
  Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Returns,
  Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Sample,
  Rules_Vitest_Link_Rules_StripProse_Content,
  Rules_Vitest_Link_Rules_StripProse_InCodeBlock,
  Rules_Vitest_Link_Rules_StripProse_Lines,
  Rules_Vitest_Link_Rules_StripProse_ProseLines,
  Rules_Vitest_Link_Rules_StripProse_Returns,
} from '../../../types/rules/vitest/link/rules.d.ts';

/**
 * Rules - Vitest - Link - Rules - Build Link Index.
 *
 * Scans every content file and builds the lookup index every link rule shares: the set of
 * existing docs paths (with `/index` and id aliases), the set of valid blog slugs, and a map
 * from every resolvable path key to its set of heading anchor slugs.
 *
 * @param {Rules_Vitest_Link_Rules_BuildLinkIndex_Config} config - Config.
 * @param {Rules_Vitest_Link_Rules_BuildLinkIndex_Files}  files  - Files.
 *
 * @returns {Rules_Vitest_Link_Rules_BuildLinkIndex_Returns}
 *
 * @since 0.20.0
 */
export async function buildLinkIndex(config: Rules_Vitest_Link_Rules_BuildLinkIndex_Config, files: Rules_Vitest_Link_Rules_BuildLinkIndex_Files): Rules_Vitest_Link_Rules_BuildLinkIndex_Returns {
  const docsDir: Rules_Vitest_Link_Rules_BuildLinkIndex_DocsDir = config['contentDirs']['docs'];
  const docPrefix: Rules_Vitest_Link_Rules_BuildLinkIndex_DocPrefix = `${docsDir}/`;
  const existingPaths: Rules_Vitest_Link_Rules_BuildLinkIndex_ExistingPaths = new Set<string>();
  const blogPaths: Rules_Vitest_Link_Rules_BuildLinkIndex_BlogPaths = new Set<string>();
  const idPaths: Rules_Vitest_Link_Rules_BuildLinkIndex_IdPaths = new Set<string>();
  const fileHeadings: Rules_Vitest_Link_Rules_BuildLinkIndex_FileHeadings = new Map<string, Set<string>>();

  for (const file of files) {
    if (file.startsWith(docPrefix) === false) {
      continue;
    }

    const docRelativePath: Rules_Vitest_Link_Rules_BuildLinkIndex_DocRelativePath = file.slice(docPrefix.length);
    const docWithoutExt: Rules_Vitest_Link_Rules_BuildLinkIndex_DocWithoutExt = docRelativePath.replace(new RegExp(LIB_REGEX_PATTERN_FILE_EXTENSION_MD), '');

    existingPaths.add(docWithoutExt);

    // Index files can be referenced by their directory path.
    if (docWithoutExt.endsWith('/index') === true) {
      const indexSuffix: Rules_Vitest_Link_Rules_BuildLinkIndex_IndexSuffix = docWithoutExt.replace(new RegExp(LIB_REGEX_PATTERN_INDEX_SUFFIX), '');

      existingPaths.add(indexSuffix);
    }

    const filePath: Rules_Vitest_Link_Rules_BuildLinkIndex_FilePath = join(config['projectRoot'], file);
    const content: Rules_Vitest_Link_Rules_BuildLinkIndex_Content = await readFile(filePath, 'utf-8');
    const idMatch: Rules_Vitest_Link_Rules_BuildLinkIndex_IdMatch = new RegExp(LIB_REGEX_PATTERN_ID_LINE, 'm').exec(content);

    if (idMatch !== null && idMatch[1] !== undefined) {
      const id: Rules_Vitest_Link_Rules_BuildLinkIndex_Id = idMatch[1].trim();
      const dir: Rules_Vitest_Link_Rules_BuildLinkIndex_Dir = dirname(docWithoutExt);
      const idPath: Rules_Vitest_Link_Rules_BuildLinkIndex_IdPath = (dir === '.') ? id : `${dir}/${id}`;

      idPaths.add(idPath);
    }
  }

  for (const file of files) {
    const headingFilePath: Rules_Vitest_Link_Rules_BuildLinkIndex_HeadingFilePath = join(config['projectRoot'], file);
    const headingContent: Rules_Vitest_Link_Rules_BuildLinkIndex_HeadingContent = await readFile(headingFilePath, 'utf-8');
    const headings: Rules_Vitest_Link_Rules_BuildLinkIndex_Headings = new Set<string>();

    for (const match of headingContent.matchAll(new RegExp(LIB_REGEX_PATTERN_HEADING_LINE, 'gm'))) {
      const matchCapture: Rules_Vitest_Link_Rules_BuildLinkIndex_MatchCapture = match[1] ?? '';
      const anchor: Rules_Vitest_Link_Rules_BuildLinkIndex_Anchor = slugifyHeading(matchCapture);

      headings.add(anchor);
    }

    // Store by full path for self-anchor lookups.
    const selfWithoutExt: Rules_Vitest_Link_Rules_BuildLinkIndex_SelfWithoutExt = file.replace(new RegExp(LIB_REGEX_PATTERN_FILE_EXTENSION_MD), '');

    fileHeadings.set(selfWithoutExt, headings);

    // Docs files also need docs-relative keys for docs-route link lookups.
    if (file.startsWith(docPrefix) === true) {
      const docMapRelativePath: Rules_Vitest_Link_Rules_BuildLinkIndex_DocMapRelativePath = file.slice(docPrefix.length);
      const docMapWithoutExt: Rules_Vitest_Link_Rules_BuildLinkIndex_DocMapWithoutExt = docMapRelativePath.replace(new RegExp(LIB_REGEX_PATTERN_FILE_EXTENSION_MD), '');

      fileHeadings.set(docMapWithoutExt, headings);

      if (docMapWithoutExt.endsWith('/index') === true) {
        const docIndexSuffix: Rules_Vitest_Link_Rules_BuildLinkIndex_DocIndexSuffix = docMapWithoutExt.replace(new RegExp(LIB_REGEX_PATTERN_INDEX_SUFFIX), '');

        fileHeadings.set(docIndexSuffix, headings);
      }

      const docIdMatch: Rules_Vitest_Link_Rules_BuildLinkIndex_DocIdMatch = new RegExp(LIB_REGEX_PATTERN_ID_LINE, 'm').exec(headingContent);

      if (docIdMatch !== null && docIdMatch[1] !== undefined) {
        const docId: Rules_Vitest_Link_Rules_BuildLinkIndex_DocId = docIdMatch[1].trim();
        const docDir: Rules_Vitest_Link_Rules_BuildLinkIndex_DocDir = dirname(docMapWithoutExt);
        const docIdPath: Rules_Vitest_Link_Rules_BuildLinkIndex_DocIdPath = (docDir === '.') ? docId : `${docDir}/${docId}`;

        fileHeadings.set(docIdPath, headings);
      }
    }

    // Blog files: build the slug lookup for blog-route link validation.
    if (config['contentDirs']['blog'] !== undefined && file.startsWith(`${config['contentDirs']['blog']}/`) === true) {
      const slugMatch: Rules_Vitest_Link_Rules_BuildLinkIndex_SlugMatch = new RegExp(LIB_REGEX_PATTERN_SLUG_LINE, 'm').exec(headingContent);
      let blogSlug: Rules_Vitest_Link_Rules_BuildLinkIndex_BlogSlug = '';

      if (slugMatch !== null && slugMatch[1] !== undefined) {
        blogSlug = slugMatch[1].trim();
      } else {
        const blogFileName: Rules_Vitest_Link_Rules_BuildLinkIndex_BlogFileName = selfWithoutExt.split('/').pop() ?? '';

        blogSlug = blogFileName.replace(new RegExp(LIB_REGEX_PATTERN_BLOG_DATE_PREFIX), '');
      }

      if (blogSlug !== '') {
        blogPaths.add(blogSlug);

        fileHeadings.set(blogSlug, headings);
      }
    }
  }

  return {
    existingPaths,
    blogPaths,
    idPaths,
    fileHeadings,
  };
}

/**
 * Rules - Vitest - Link - Rules - Link Content Dirs.
 *
 * Flattens the suite's `contentDirs` map into the array shape the file-discovery helper
 * expects, including the blog directory only when the consumer configured one.
 *
 * @param {Rules_Vitest_Link_Rules_LinkContentDirs_Config} config - Config.
 *
 * @returns {Rules_Vitest_Link_Rules_LinkContentDirs_Returns}
 *
 * @since 0.20.0
 */
export function linkContentDirs(config: Rules_Vitest_Link_Rules_LinkContentDirs_Config): Rules_Vitest_Link_Rules_LinkContentDirs_Returns {
  const dirs: Rules_Vitest_Link_Rules_LinkContentDirs_Dirs = [config['contentDirs']['docs']];

  if (config['contentDirs']['blog'] !== undefined) {
    dirs.push(config['contentDirs']['blog']);
  }

  return dirs;
}

/**
 * Rules - Vitest - Link - Rules - Collect Prose Links.
 *
 * Strips fenced code blocks from a file's content and returns the href of every markdown
 * link that remains in the prose. This is the shared filter the link target/anchor rules
 * scan over so links inside code samples are never validated.
 *
 * @param {Rules_Vitest_Link_Rules_CollectProseLinks_Content} content - Content.
 *
 * @returns {Rules_Vitest_Link_Rules_CollectProseLinks_Returns}
 *
 * @since 0.20.0
 */
export function collectProseLinks(content: Rules_Vitest_Link_Rules_CollectProseLinks_Content): Rules_Vitest_Link_Rules_CollectProseLinks_Returns {
  const prose: Rules_Vitest_Link_Rules_CollectProseLinks_Prose = stripProse(content);
  const hrefs: Rules_Vitest_Link_Rules_CollectProseLinks_Hrefs = [];

  for (const linkMatch of prose.matchAll(new RegExp(LIB_REGEX_PATTERN_MARKDOWN_LINK, 'g'))) {
    const href: Rules_Vitest_Link_Rules_CollectProseLinks_Href = linkMatch[2] ?? '';

    hrefs.push(href);
  }

  return hrefs;
}

/**
 * Rules - Vitest - Link - Rules - Strip Prose.
 *
 * Removes fenced code blocks from markdown content, returning only the prose lines so the
 * markdown-link scan ignores links inside code samples.
 *
 * @param {Rules_Vitest_Link_Rules_StripProse_Content} content - Content.
 *
 * @returns {Rules_Vitest_Link_Rules_StripProse_Returns}
 *
 * @since 0.20.0
 */
export function stripProse(content: Rules_Vitest_Link_Rules_StripProse_Content): Rules_Vitest_Link_Rules_StripProse_Returns {
  const lines: Rules_Vitest_Link_Rules_StripProse_Lines = content.split('\n');
  let inCodeBlock: Rules_Vitest_Link_Rules_StripProse_InCodeBlock = false;
  const proseLines: Rules_Vitest_Link_Rules_StripProse_ProseLines = [];

  for (const line of lines) {
    if (line.trimStart().startsWith('```') === true) {
      inCodeBlock = !inCodeBlock;

      continue;
    }

    if (inCodeBlock === false) {
      proseLines.push(line);
    }
  }

  return proseLines.join('\n');
}

/**
 * Rules - Vitest - Link - Rules - Internal Doc Target Exists.
 *
 * Rule `link-internal-doc-target-exists`: every internal link beginning with the docs route
 * prefix must resolve to an existing docs file (by path, `/index` directory alias, or
 * frontmatter-id alias). Docusaurus auto-generated category routes are skipped.
 *
 * @param {Rules_Vitest_Link_Rules_InternalDocTargetExists_Config} config - Config.
 * @param {Rules_Vitest_Link_Rules_InternalDocTargetExists_Files}  files  - Files.
 * @param {Rules_Vitest_Link_Rules_InternalDocTargetExists_Index}  index  - Index.
 * @param {Rules_Vitest_Link_Rules_InternalDocTargetExists_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Link_Rules_InternalDocTargetExists_Returns}
 *
 * @since 0.20.0
 */
export async function internalDocTargetExists(config: Rules_Vitest_Link_Rules_InternalDocTargetExists_Config, files: Rules_Vitest_Link_Rules_InternalDocTargetExists_Files, index: Rules_Vitest_Link_Rules_InternalDocTargetExists_Index, enable: Rules_Vitest_Link_Rules_InternalDocTargetExists_Enable): Rules_Vitest_Link_Rules_InternalDocTargetExists_Returns {
  if (isEnabled('link-internal-doc-target-exists', enable) === false) {
    return;
  }

  const docPrefix: Rules_Vitest_Link_Rules_InternalDocTargetExists_DocPrefix = `/${config['docsRouteBasePath']}/`;

  for (const file of files) {
    it(`internal doc link targets exist in ${file}`, async () => {
      const filePath: Rules_Vitest_Link_Rules_InternalDocTargetExists_FilePath = join(config['projectRoot'], file);
      const content: Rules_Vitest_Link_Rules_InternalDocTargetExists_Content = await readFile(filePath, 'utf-8');
      const hrefs: Rules_Vitest_Link_Rules_InternalDocTargetExists_Hrefs = collectProseLinks(content);
      const failures: Rules_Vitest_Link_Rules_InternalDocTargetExists_Failures = [];

      for (const href of hrefs) {
        if (href.startsWith(docPrefix) === false) {
          continue;
        }

        const pathPartValue: Rules_Vitest_Link_Rules_InternalDocTargetExists_PathPartValue = href.split('#')[0] ?? '';
        const docPath: Rules_Vitest_Link_Rules_InternalDocTargetExists_DocPath = pathPartValue.replace(docPrefix, '').replace(new RegExp(LIB_REGEX_PATTERN_TRAILING_SLASH), '');
        const skipPrefix: Rules_Vitest_Link_Rules_InternalDocTargetExists_SkipPrefix = config['categoryRouteSkipPrefix'];

        if (docPath.startsWith(skipPrefix) === true) {
          continue;
        }

        if (index['existingPaths'].has(docPath) === false && index['idPaths'].has(docPath) === false) {
          failures.push(`${file}: link target "${pathPartValue}" does not exist`);
        }
      }

      strictEqual(failures.length, 0, [
        '',
        'Broken doc link targets:',
        failures.join('\n'),
      ].join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Link - Rules - Internal Doc Anchor Exists.
 *
 * Rule `link-internal-doc-anchor-exists`: when a docs-route link carries a `#anchor`, the
 * anchor must match a heading slug in the resolved target file.
 *
 * @param {Rules_Vitest_Link_Rules_InternalDocAnchorExists_Config} config - Config.
 * @param {Rules_Vitest_Link_Rules_InternalDocAnchorExists_Files}  files  - Files.
 * @param {Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index}  index  - Index.
 * @param {Rules_Vitest_Link_Rules_InternalDocAnchorExists_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Link_Rules_InternalDocAnchorExists_Returns}
 *
 * @since 0.20.0
 */
export async function internalDocAnchorExists(config: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Config, files: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Files, index: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Index, enable: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Enable): Rules_Vitest_Link_Rules_InternalDocAnchorExists_Returns {
  if (isEnabled('link-internal-doc-anchor-exists', enable) === false) {
    return;
  }

  const docPrefix: Rules_Vitest_Link_Rules_InternalDocAnchorExists_DocPrefix = `/${config['docsRouteBasePath']}/`;

  for (const file of files) {
    it(`internal doc link anchors exist in ${file}`, async () => {
      const filePath: Rules_Vitest_Link_Rules_InternalDocAnchorExists_FilePath = join(config['projectRoot'], file);
      const content: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Content = await readFile(filePath, 'utf-8');
      const hrefs: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Hrefs = collectProseLinks(content);
      const failures: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Failures = [];

      for (const href of hrefs) {
        if (href.startsWith(docPrefix) === false) {
          continue;
        }

        const pathPartValue: Rules_Vitest_Link_Rules_InternalDocAnchorExists_PathPartValue = href.split('#')[0] ?? '';
        const anchor: Rules_Vitest_Link_Rules_InternalDocAnchorExists_Anchor = href.split('#')[1] ?? '';

        if (anchor === '') {
          continue;
        }

        const docPath: Rules_Vitest_Link_Rules_InternalDocAnchorExists_DocPath = pathPartValue.replace(docPrefix, '').replace(new RegExp(LIB_REGEX_PATTERN_TRAILING_SLASH), '');
        const skipPrefix: Rules_Vitest_Link_Rules_InternalDocAnchorExists_SkipPrefix = config['categoryRouteSkipPrefix'];

        if (docPath.startsWith(skipPrefix) === true) {
          continue;
        }

        const headingsLookup: Rules_Vitest_Link_Rules_InternalDocAnchorExists_HeadingsLookup = index['fileHeadings'].get(docPath);

        if (headingsLookup !== undefined && headingsLookup.has(anchor) === false) {
          failures.push(`${file}: anchor "${href}" not found in target file`);
        }
      }

      strictEqual(failures.length, 0, [
        '',
        'Broken doc link anchors:',
        failures.join('\n'),
      ].join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Link - Rules - Internal Blog Target Exists.
 *
 * Rule `link-internal-blog-target-exists`: every blog-route link must resolve to a known
 * blog slug. A blog-less consumer disables this rule by omitting `contentDirs.blog`.
 *
 * @param {Rules_Vitest_Link_Rules_InternalBlogTargetExists_Config} config - Config.
 * @param {Rules_Vitest_Link_Rules_InternalBlogTargetExists_Files}  files  - Files.
 * @param {Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index}  index  - Index.
 * @param {Rules_Vitest_Link_Rules_InternalBlogTargetExists_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Link_Rules_InternalBlogTargetExists_Returns}
 *
 * @since 0.20.0
 */
export async function internalBlogTargetExists(config: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Config, files: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Files, index: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Index, enable: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Enable): Rules_Vitest_Link_Rules_InternalBlogTargetExists_Returns {
  if (isEnabled('link-internal-blog-target-exists', enable) === false) {
    return;
  }

  if (config['contentDirs']['blog'] === undefined) {
    return;
  }

  const blogPrefix: Rules_Vitest_Link_Rules_InternalBlogTargetExists_BlogPrefix = `/${config['blogRouteBasePath']}/`;

  for (const file of files) {
    it(`internal blog link targets exist in ${file}`, async () => {
      const filePath: Rules_Vitest_Link_Rules_InternalBlogTargetExists_FilePath = join(config['projectRoot'], file);
      const content: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Content = await readFile(filePath, 'utf-8');
      const hrefs: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Hrefs = collectProseLinks(content);
      const failures: Rules_Vitest_Link_Rules_InternalBlogTargetExists_Failures = [];

      for (const href of hrefs) {
        if (href.startsWith(blogPrefix) === false) {
          continue;
        }

        const pathPartValue: Rules_Vitest_Link_Rules_InternalBlogTargetExists_PathPartValue = href.split('#')[0] ?? '';
        const blogPath: Rules_Vitest_Link_Rules_InternalBlogTargetExists_BlogPath = pathPartValue.replace(blogPrefix, '').replace(new RegExp(LIB_REGEX_PATTERN_TRAILING_SLASH), '');

        if (index['blogPaths'].has(blogPath) === false) {
          failures.push(`${file}: link target "${pathPartValue}" does not exist`);
        }
      }

      strictEqual(failures.length, 0, [
        '',
        'Broken blog link targets:',
        failures.join('\n'),
      ].join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Link - Rules - Internal Blog Anchor Exists.
 *
 * Rule `link-internal-blog-anchor-exists`: when a blog-route link carries a `#anchor`, the
 * anchor must match a heading slug in the resolved blog post. Disabled by omitting
 * `contentDirs.blog`.
 *
 * @param {Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Config} config - Config.
 * @param {Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Files}  files  - Files.
 * @param {Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index}  index  - Index.
 * @param {Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Returns}
 *
 * @since 0.20.0
 */
export async function internalBlogAnchorExists(config: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Config, files: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Files, index: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Index, enable: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Enable): Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Returns {
  if (isEnabled('link-internal-blog-anchor-exists', enable) === false) {
    return;
  }

  if (config['contentDirs']['blog'] === undefined) {
    return;
  }

  const blogPrefix: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_BlogPrefix = `/${config['blogRouteBasePath']}/`;

  for (const file of files) {
    it(`internal blog link anchors exist in ${file}`, async () => {
      const filePath: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_FilePath = join(config['projectRoot'], file);
      const content: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Content = await readFile(filePath, 'utf-8');
      const hrefs: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Hrefs = collectProseLinks(content);
      const failures: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Failures = [];

      for (const href of hrefs) {
        if (href.startsWith(blogPrefix) === false) {
          continue;
        }

        const pathPartValue: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_PathPartValue = href.split('#')[0] ?? '';
        const anchor: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_Anchor = href.split('#')[1] ?? '';

        if (anchor === '') {
          continue;
        }

        const blogPath: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_BlogPath = pathPartValue.replace(blogPrefix, '').replace(new RegExp(LIB_REGEX_PATTERN_TRAILING_SLASH), '');
        const headingsLookup: Rules_Vitest_Link_Rules_InternalBlogAnchorExists_HeadingsLookup = index['fileHeadings'].get(blogPath);

        if (headingsLookup !== undefined && headingsLookup.has(anchor) === false) {
          failures.push(`${file}: anchor "${href}" not found in target file`);
        }
      }

      strictEqual(failures.length, 0, [
        '',
        'Broken blog link anchors:',
        failures.join('\n'),
      ].join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Link - Rules - Self Anchor Exists.
 *
 * Rule `link-self-anchor-exists`: an anchor-only link (`#anchor`) must match a heading slug
 * in the same file it appears in.
 *
 * @param {Rules_Vitest_Link_Rules_SelfAnchorExists_Config} config - Config.
 * @param {Rules_Vitest_Link_Rules_SelfAnchorExists_Files}  files  - Files.
 * @param {Rules_Vitest_Link_Rules_SelfAnchorExists_Index}  index  - Index.
 * @param {Rules_Vitest_Link_Rules_SelfAnchorExists_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Link_Rules_SelfAnchorExists_Returns}
 *
 * @since 0.20.0
 */
export async function selfAnchorExists(config: Rules_Vitest_Link_Rules_SelfAnchorExists_Config, files: Rules_Vitest_Link_Rules_SelfAnchorExists_Files, index: Rules_Vitest_Link_Rules_SelfAnchorExists_Index, enable: Rules_Vitest_Link_Rules_SelfAnchorExists_Enable): Rules_Vitest_Link_Rules_SelfAnchorExists_Returns {
  if (isEnabled('link-self-anchor-exists', enable) === false) {
    return;
  }

  for (const file of files) {
    it(`self anchors exist in ${file}`, async () => {
      const filePath: Rules_Vitest_Link_Rules_SelfAnchorExists_FilePath = join(config['projectRoot'], file);
      const content: Rules_Vitest_Link_Rules_SelfAnchorExists_Content = await readFile(filePath, 'utf-8');
      const hrefs: Rules_Vitest_Link_Rules_SelfAnchorExists_Hrefs = collectProseLinks(content);
      const failures: Rules_Vitest_Link_Rules_SelfAnchorExists_Failures = [];

      for (const href of hrefs) {
        if (href.startsWith('#') === false) {
          continue;
        }

        const anchor: Rules_Vitest_Link_Rules_SelfAnchorExists_Anchor = href.slice(1);
        const currentPath: Rules_Vitest_Link_Rules_SelfAnchorExists_CurrentPath = file.replace(new RegExp(LIB_REGEX_PATTERN_FILE_EXTENSION_MD), '');
        const headingsLookup: Rules_Vitest_Link_Rules_SelfAnchorExists_HeadingsLookup = index['fileHeadings'].get(currentPath);

        if (headingsLookup !== undefined && headingsLookup.has(anchor) === false) {
          failures.push(`${file}: anchor "${href}" not found in same file`);
        }
      }

      strictEqual(failures.length, 0, [
        '',
        'Broken self anchors:',
        failures.join('\n'),
      ].join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Link - Rules - Skip External And Code Blocks.
 *
 * Rule `link-skip-external-and-code-blocks`: the shared scoping filter (code-fence exclusion
 * plus external-link skipping) other rules depend on. It owns no assertion; the visible test
 * simply documents that the filter is on.
 *
 * @param {Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Returns}
 *
 * @since 0.20.0
 */
export function skipExternalAndCodeBlocks(enable: Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Enable): Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Returns {
  if (isEnabled('link-skip-external-and-code-blocks', enable) === false) {
    return;
  }

  const sample: Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Sample = [
    '```',
    '[fenced](/docs/should-be-ignored)',
    '```',
    '[external](https://example.com)',
  ].join('\n');
  const hrefs: Rules_Vitest_Link_Rules_SkipExternalAndCodeBlocks_Hrefs = collectProseLinks(sample);

  it(`external links and code blocks are excluded from link validation${''}`, () => {
    strictEqual(hrefs.includes('/docs/should-be-ignored'), false, 'links inside code fences must be excluded');

    return;
  });

  return;
}
