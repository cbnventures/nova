import { ok, strictEqual } from 'node:assert/strict';
import {
  existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { afterEach, describe, it } from 'vitest';

import { buildSearchIndex } from '../../../lib/search/indexer.js';

import type {
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_Documents,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_ExcludesNav,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_FirstDocument,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_HtmlContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_HtmlFilePath,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_IncludesArticle,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_IndexContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_IndexPath,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_IndexUrl,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_OutDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_ParentDirectory,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_Payload,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_RoutesPaths,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_SystemTempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_TempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_TempPathPrefix,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_Documents,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_FirstDocument,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_FirstHeading,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_FirstHeadingId,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_FirstHeadingLevel,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_FirstHeadingText,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_HtmlContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_HtmlFilePath,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_IndexContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_IndexPath,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_IndexUrl,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_OutDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_ParentDirectory,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_Payload,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_RoutesPaths,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_SecondHeading,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_SecondHeadingId,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_SecondHeadingLevel,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_SecondHeadingText,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_SystemTempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_TempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_TempPathPrefix,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_Documents,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_FirstDocument,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_FirstDocumentDescription,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_HtmlContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_HtmlFilePath,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_IndexContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_IndexPath,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_IndexUrl,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_OutDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_ParentDirectory,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_Payload,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_RoutesPaths,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_SystemTempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_TempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_TempPathPrefix,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_Documents,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_FirstDocument,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_FirstDocumentTitle,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_HtmlContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_HtmlFilePath,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_IndexContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_IndexExists,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_IndexPath,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_IndexUrl,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_Manifest,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_ManifestContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_ManifestExists,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_ManifestPath,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_OutDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_ParentDirectory,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_Payload,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_RoutesPaths,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_SystemTempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_TempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_TempPathPrefix,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_Documents,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_DocumentsLength,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_FirstDocumentPath,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_HtmlContentAdmin,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_HtmlContentDocs,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_HtmlFilePathAdmin,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_HtmlFilePathDocs,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_IndexContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_IndexPath,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_IndexUrl,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_OutDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_ParentDirectoryAdmin,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_ParentDirectoryDocs,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_Payload,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_RoutesPaths,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_SystemTempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_TempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_TempPathPrefix,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_HasFields,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_HasInvertedIndex,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_HasVersion,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_HtmlContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_HtmlFilePath,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_Index,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_IndexContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_IndexPath,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_IndexUrl,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_OutDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_ParentDirectory,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_Payload,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_RoutesPaths,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_SystemTempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_TempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_TempPathPrefix,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_Documents,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_DocumentsLength,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_FirstDocumentPath,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_HtmlContentBlog,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_HtmlContentDocs,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_HtmlFilePathBlog,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_HtmlFilePathDocs,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_IndexContent,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_IndexPath,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_IndexUrl,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_OutDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_ParentDirectoryBlog,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_ParentDirectoryDocs,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_Payload,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_RoutesPaths,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_SystemTempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_TempDir,
  Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_TempPathPrefix,
  Tests_Lib_Search_Indexer_TempDirs,
  Tests_Lib_Search_Indexer_TypedTempDir,
} from '../../../types/tests/lib/search/indexer.test.d.ts';

const tempDirs: Tests_Lib_Search_Indexer_TempDirs = [];

/**
 * Tests - Lib - Search - Indexer.
 *
 * @since 0.15.0
 */
afterEach(() => {
  for (const tempDir of tempDirs) {
    const typedTempDir: Tests_Lib_Search_Indexer_TypedTempDir = tempDir;

    if (existsSync(typedTempDir) === true) {
      rmSync(typedTempDir, {
        recursive: true, force: true,
      });
    }
  }

  tempDirs.length = 0;

  return;
});

/**
 * Tests - Lib - Search - Indexer - BuildSearchIndex Extracts Title.
 *
 * @since 0.15.0
 */
describe('buildSearchIndex extracts title', async () => {
  it('extracts title from the title tag', () => {
    const systemTempDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_SystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_TempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_TempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_OutDir = tempDir;
    const htmlFilePath: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_HtmlFilePath = join(outDir, 'docs', 'getting-started', 'index.html');
    const parentDirectory: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_ParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_HtmlContent = '<html><head><title>Getting Started</title></head><body><article>Some content here.</article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_RoutesPaths = ['/docs/getting-started'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const manifestPath: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_ManifestPath = join(outDir, 'search-manifest.json');
    const manifestExists: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_ManifestExists = existsSync(manifestPath);

    ok(manifestExists);

    const manifestContent: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_ManifestContent = readFileSync(manifestPath, 'utf-8');
    const manifest: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_Manifest = JSON.parse(manifestContent);
    const indexUrl: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_IndexUrl = manifest['indexUrl'] as Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_IndexUrl;

    strictEqual(indexUrl, 'search-index.json');

    const indexPath: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_IndexPath = join(outDir, indexUrl);
    const indexExists: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_IndexExists = existsSync(indexPath);

    ok(indexExists);

    const indexContent: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_IndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_Payload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_Documents = payload['documents'] as Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_Documents;
    const firstDocument: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_FirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const firstDocumentTitle: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsTitle_ExtractsTitleFromTheTitleTag_FirstDocumentTitle = firstDocument['title'];

    strictEqual(firstDocumentTitle, 'Getting Started');

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Indexer - BuildSearchIndex Extracts Headings.
 *
 * @since 0.15.0
 */
describe('buildSearchIndex extracts headings', async () => {
  it('extracts h2 and h3 headings with IDs', () => {
    const systemTempDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_SystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_TempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_TempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_OutDir = tempDir;
    const htmlFilePath: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_HtmlFilePath = join(outDir, 'docs', 'api', 'index.html');
    const parentDirectory: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_ParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_HtmlContent = '<html><head><title>API Reference</title></head><body><article><h2 id="overview">Overview</h2><p>Text</p><h3 id="methods">Methods</h3><p>More text</p></article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_RoutesPaths = ['/docs/api'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_IndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_IndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_IndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_Payload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_Documents = payload['documents'] as Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_Documents;
    const firstDocument: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_FirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const firstHeading: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_FirstHeading = firstDocument['headings'][0];

    ok(firstHeading !== undefined);

    const firstHeadingId: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_FirstHeadingId = firstHeading['id'];
    const firstHeadingText: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_FirstHeadingText = firstHeading['text'];
    const firstHeadingLevel: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_FirstHeadingLevel = firstHeading['level'];

    strictEqual(firstHeadingId, 'overview');
    strictEqual(firstHeadingText, 'Overview');
    strictEqual(firstHeadingLevel, 2);

    const secondHeading: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_SecondHeading = firstDocument['headings'][1];

    ok(secondHeading !== undefined);

    const secondHeadingId: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_SecondHeadingId = secondHeading['id'];
    const secondHeadingText: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_SecondHeadingText = secondHeading['text'];
    const secondHeadingLevel: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsHeadings_ExtractsH2AndH3HeadingsWithIDs_SecondHeadingLevel = secondHeading['level'];

    strictEqual(secondHeadingId, 'methods');
    strictEqual(secondHeadingText, 'Methods');
    strictEqual(secondHeadingLevel, 3);

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Indexer - BuildSearchIndex Extracts Body Text.
 *
 * @since 0.15.0
 */
describe('buildSearchIndex extracts body text', async () => {
  it('extracts article text and strips nav and footer', () => {
    const systemTempDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_SystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_TempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_TempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_OutDir = tempDir;
    const htmlFilePath: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_HtmlFilePath = join(outDir, 'docs', 'guide', 'index.html');
    const parentDirectory: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_ParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_HtmlContent = '<html><head><title>Guide</title></head><body><nav>Navigation</nav><article>Article body content here.</article><footer>Footer text</footer></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_RoutesPaths = ['/docs/guide'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_IndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_IndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_IndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_Payload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_Documents = payload['documents'] as Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_Documents;
    const firstDocument: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_FirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const includesArticle: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_IncludesArticle = firstDocument['body'].includes('Article body content here.');
    const excludesNav: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsBodyText_ExtractsArticleTextAndStripsNavAndFooter_ExcludesNav = firstDocument['body'].includes('Navigation') === false;

    ok(includesArticle);
    ok(excludesNav);

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Indexer - BuildSearchIndex Extracts Meta Description.
 *
 * @since 0.15.0
 */
describe('buildSearchIndex extracts meta description', async () => {
  it('extracts description from meta tag', () => {
    const systemTempDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_SystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_TempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_TempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_OutDir = tempDir;
    const htmlFilePath: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_HtmlFilePath = join(outDir, 'docs', 'intro', 'index.html');
    const parentDirectory: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_ParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_HtmlContent = '<html><head><title>Intro</title><meta name="description" content="A brief introduction to the project."></head><body><article>Content</article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_RoutesPaths = ['/docs/intro'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_IndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_IndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_IndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_Payload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_Documents = payload['documents'] as Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_Documents;
    const firstDocument: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_FirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const firstDocumentDescription: Tests_Lib_Search_Indexer_BuildSearchIndexExtractsMetaDescription_ExtractsDescriptionFromMetaTag_FirstDocumentDescription = firstDocument['snippet'];

    strictEqual(firstDocumentDescription, 'A brief introduction to the project.');

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Indexer - BuildSearchIndex Filters Ignored Patterns.
 *
 * @since 0.15.0
 */
describe('buildSearchIndex filters ignored patterns', async () => {
  it('excludes paths matching ignore patterns', () => {
    const systemTempDir: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_SystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_TempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_TempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_OutDir = tempDir;
    const htmlFilePathDocs: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_HtmlFilePathDocs = join(outDir, 'docs', 'setup', 'index.html');
    const htmlFilePathAdmin: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_HtmlFilePathAdmin = join(outDir, 'admin', 'dashboard', 'index.html');
    const parentDirectoryDocs: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_ParentDirectoryDocs = resolve(htmlFilePathDocs, '..');
    const parentDirectoryAdmin: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_ParentDirectoryAdmin = resolve(htmlFilePathAdmin, '..');

    mkdirSync(parentDirectoryDocs, { recursive: true });
    mkdirSync(parentDirectoryAdmin, { recursive: true });

    const htmlContentDocs: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_HtmlContentDocs = '<html><head><title>Setup</title></head><body><article>Setup content</article></body></html>';
    const htmlContentAdmin: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_HtmlContentAdmin = '<html><head><title>Dashboard</title></head><body><article>Admin content</article></body></html>';

    writeFileSync(htmlFilePathDocs, htmlContentDocs, 'utf-8');
    writeFileSync(htmlFilePathAdmin, htmlContentAdmin, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_RoutesPaths = [
      '/docs/setup',
      '/admin/dashboard',
    ];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: {
        hashed: false,
        ignorePatterns: ['/admin*'],
      },
    });

    const indexUrl: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_IndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_IndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_IndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_Payload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_Documents = payload['documents'] as Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_Documents;
    const documentsLength: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_DocumentsLength = documents.length;

    strictEqual(documentsLength, 1);

    ok(documents[0] !== undefined);

    const firstDocumentPath: Tests_Lib_Search_Indexer_BuildSearchIndexFiltersIgnoredPatterns_ExcludesPathsMatchingIgnorePatterns_FirstDocumentPath = documents[0]['path'];

    strictEqual(firstDocumentPath, '/docs/setup');

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Indexer - BuildSearchIndex Respects IndexDocs Flag.
 *
 * @since 0.15.0
 */
describe('buildSearchIndex respects indexDocs flag', async () => {
  it('skips docs routes when indexDocs is false', () => {
    const systemTempDir: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_SystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_TempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_TempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_OutDir = tempDir;
    const htmlFilePathDocs: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_HtmlFilePathDocs = join(outDir, 'docs', 'reference', 'index.html');
    const htmlFilePathBlog: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_HtmlFilePathBlog = join(outDir, 'blog', 'post-one', 'index.html');
    const parentDirectoryDocs: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_ParentDirectoryDocs = resolve(htmlFilePathDocs, '..');
    const parentDirectoryBlog: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_ParentDirectoryBlog = resolve(htmlFilePathBlog, '..');

    mkdirSync(parentDirectoryDocs, { recursive: true });
    mkdirSync(parentDirectoryBlog, { recursive: true });

    const htmlContentDocs: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_HtmlContentDocs = '<html><head><title>Reference</title></head><body><article>Docs content</article></body></html>';
    const htmlContentBlog: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_HtmlContentBlog = '<html><head><title>Post One</title></head><body><article>Blog content</article></body></html>';

    writeFileSync(htmlFilePathDocs, htmlContentDocs, 'utf-8');
    writeFileSync(htmlFilePathBlog, htmlContentBlog, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_RoutesPaths = [
      '/docs/reference',
      '/blog/post-one',
    ];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: {
        hashed: false,
        indexDocs: false,
      },
    });

    const indexUrl: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_IndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_IndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_IndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_Payload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_Documents = payload['documents'] as Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_Documents;
    const documentsLength: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_DocumentsLength = documents.length;

    strictEqual(documentsLength, 1);

    ok(documents[0] !== undefined);

    const firstDocumentPath: Tests_Lib_Search_Indexer_BuildSearchIndexRespectsIndexDocsFlag_SkipsDocsRoutesWhenIndexDocsIsFalse_FirstDocumentPath = documents[0]['path'];

    strictEqual(firstDocumentPath, '/blog/post-one');

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Indexer - BuildSearchIndex Produces Valid Lunr Index.
 *
 * @since 0.15.0
 */
describe('buildSearchIndex produces valid lunr index', async () => {
  it('serializes lunr index with expected structure', () => {
    const systemTempDir: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_SystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_TempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_TempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_OutDir = tempDir;
    const htmlFilePath: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_HtmlFilePath = join(outDir, 'docs', 'config', 'index.html');
    const parentDirectory: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_ParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_HtmlContent = '<html><head><title>Configuration</title></head><body><article><h2 id="options">Options</h2><p>Configure the plugin with these options.</p></article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_RoutesPaths = ['/docs/config'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_IndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_IndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_IndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_Payload = JSON.parse(indexContent);
    const index: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_Index = payload['index'] as Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_Index;
    const hasVersion: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_HasVersion = index['version'] !== undefined;
    const hasFields: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_HasFields = index['fields'] !== undefined;
    const hasInvertedIndex: Tests_Lib_Search_Indexer_BuildSearchIndexProducesValidLunrIndex_SerializesLunrIndexWithExpectedStructure_HasInvertedIndex = index['invertedIndex'] !== undefined;

    ok(hasVersion);
    ok(hasFields);
    ok(hasInvertedIndex);

    return;
  });

  return;
});
