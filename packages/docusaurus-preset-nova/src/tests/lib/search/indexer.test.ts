import { ok, strictEqual } from 'node:assert/strict';
import {
  existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { afterEach, describe, it } from 'vitest';

import { buildSearchIndex } from '../../../lib/search/indexer.js';

import type {
  Tests_Lib_Search_Indexer_CleanupTempDir,
  Tests_Lib_Search_Indexer_CleanupTempDirs,
  Tests_Lib_Search_Indexer_ExtractBodyDocuments,
  Tests_Lib_Search_Indexer_ExtractBodyExcludesNav,
  Tests_Lib_Search_Indexer_ExtractBodyFirstDocument,
  Tests_Lib_Search_Indexer_ExtractBodyHtmlContent,
  Tests_Lib_Search_Indexer_ExtractBodyHtmlFilePath,
  Tests_Lib_Search_Indexer_ExtractBodyIncludesArticle,
  Tests_Lib_Search_Indexer_ExtractBodyIndexContent,
  Tests_Lib_Search_Indexer_ExtractBodyIndexPath,
  Tests_Lib_Search_Indexer_ExtractBodyIndexUrl,
  Tests_Lib_Search_Indexer_ExtractBodyOutDir,
  Tests_Lib_Search_Indexer_ExtractBodyParentDirectory,
  Tests_Lib_Search_Indexer_ExtractBodyPayload,
  Tests_Lib_Search_Indexer_ExtractBodyRoutesPaths,
  Tests_Lib_Search_Indexer_ExtractBodySystemTempDir,
  Tests_Lib_Search_Indexer_ExtractBodyTempDir,
  Tests_Lib_Search_Indexer_ExtractBodyTempPathPrefix,
  Tests_Lib_Search_Indexer_ExtractDescriptionDocuments,
  Tests_Lib_Search_Indexer_ExtractDescriptionFirstDocument,
  Tests_Lib_Search_Indexer_ExtractDescriptionFirstDocumentDescription,
  Tests_Lib_Search_Indexer_ExtractDescriptionHtmlContent,
  Tests_Lib_Search_Indexer_ExtractDescriptionHtmlFilePath,
  Tests_Lib_Search_Indexer_ExtractDescriptionIndexContent,
  Tests_Lib_Search_Indexer_ExtractDescriptionIndexPath,
  Tests_Lib_Search_Indexer_ExtractDescriptionIndexUrl,
  Tests_Lib_Search_Indexer_ExtractDescriptionOutDir,
  Tests_Lib_Search_Indexer_ExtractDescriptionParentDirectory,
  Tests_Lib_Search_Indexer_ExtractDescriptionPayload,
  Tests_Lib_Search_Indexer_ExtractDescriptionRoutesPaths,
  Tests_Lib_Search_Indexer_ExtractDescriptionSystemTempDir,
  Tests_Lib_Search_Indexer_ExtractDescriptionTempDir,
  Tests_Lib_Search_Indexer_ExtractDescriptionTempPathPrefix,
  Tests_Lib_Search_Indexer_ExtractHeadingsDocuments,
  Tests_Lib_Search_Indexer_ExtractHeadingsFirstDocument,
  Tests_Lib_Search_Indexer_ExtractHeadingsFirstHeading,
  Tests_Lib_Search_Indexer_ExtractHeadingsFirstHeadingId,
  Tests_Lib_Search_Indexer_ExtractHeadingsFirstHeadingLevel,
  Tests_Lib_Search_Indexer_ExtractHeadingsFirstHeadingText,
  Tests_Lib_Search_Indexer_ExtractHeadingsHtmlContent,
  Tests_Lib_Search_Indexer_ExtractHeadingsHtmlFilePath,
  Tests_Lib_Search_Indexer_ExtractHeadingsIndexContent,
  Tests_Lib_Search_Indexer_ExtractHeadingsIndexPath,
  Tests_Lib_Search_Indexer_ExtractHeadingsIndexUrl,
  Tests_Lib_Search_Indexer_ExtractHeadingsOutDir,
  Tests_Lib_Search_Indexer_ExtractHeadingsParentDirectory,
  Tests_Lib_Search_Indexer_ExtractHeadingsPayload,
  Tests_Lib_Search_Indexer_ExtractHeadingsRoutesPaths,
  Tests_Lib_Search_Indexer_ExtractHeadingsSecondHeading,
  Tests_Lib_Search_Indexer_ExtractHeadingsSecondHeadingId,
  Tests_Lib_Search_Indexer_ExtractHeadingsSecondHeadingLevel,
  Tests_Lib_Search_Indexer_ExtractHeadingsSecondHeadingText,
  Tests_Lib_Search_Indexer_ExtractHeadingsSystemTempDir,
  Tests_Lib_Search_Indexer_ExtractHeadingsTempDir,
  Tests_Lib_Search_Indexer_ExtractHeadingsTempPathPrefix,
  Tests_Lib_Search_Indexer_ExtractTitleDocuments,
  Tests_Lib_Search_Indexer_ExtractTitleFirstDocument,
  Tests_Lib_Search_Indexer_ExtractTitleFirstDocumentTitle,
  Tests_Lib_Search_Indexer_ExtractTitleHtmlContent,
  Tests_Lib_Search_Indexer_ExtractTitleHtmlFilePath,
  Tests_Lib_Search_Indexer_ExtractTitleIndexContent,
  Tests_Lib_Search_Indexer_ExtractTitleIndexExists,
  Tests_Lib_Search_Indexer_ExtractTitleIndexPath,
  Tests_Lib_Search_Indexer_ExtractTitleIndexUrl,
  Tests_Lib_Search_Indexer_ExtractTitleManifest,
  Tests_Lib_Search_Indexer_ExtractTitleManifestContent,
  Tests_Lib_Search_Indexer_ExtractTitleManifestExists,
  Tests_Lib_Search_Indexer_ExtractTitleManifestPath,
  Tests_Lib_Search_Indexer_ExtractTitleOutDir,
  Tests_Lib_Search_Indexer_ExtractTitleParentDirectory,
  Tests_Lib_Search_Indexer_ExtractTitlePayload,
  Tests_Lib_Search_Indexer_ExtractTitleRoutesPaths,
  Tests_Lib_Search_Indexer_ExtractTitleSystemTempDir,
  Tests_Lib_Search_Indexer_ExtractTitleTempDir,
  Tests_Lib_Search_Indexer_ExtractTitleTempPathPrefix,
  Tests_Lib_Search_Indexer_IgnorePatternsDocuments,
  Tests_Lib_Search_Indexer_IgnorePatternsDocumentsLength,
  Tests_Lib_Search_Indexer_IgnorePatternsFirstDocumentPath,
  Tests_Lib_Search_Indexer_IgnorePatternsHtmlContentAdmin,
  Tests_Lib_Search_Indexer_IgnorePatternsHtmlContentDocs,
  Tests_Lib_Search_Indexer_IgnorePatternsHtmlFilePathAdmin,
  Tests_Lib_Search_Indexer_IgnorePatternsHtmlFilePathDocs,
  Tests_Lib_Search_Indexer_IgnorePatternsIndexContent,
  Tests_Lib_Search_Indexer_IgnorePatternsIndexPath,
  Tests_Lib_Search_Indexer_IgnorePatternsIndexUrl,
  Tests_Lib_Search_Indexer_IgnorePatternsOutDir,
  Tests_Lib_Search_Indexer_IgnorePatternsParentDirectoryAdmin,
  Tests_Lib_Search_Indexer_IgnorePatternsParentDirectoryDocs,
  Tests_Lib_Search_Indexer_IgnorePatternsPayload,
  Tests_Lib_Search_Indexer_IgnorePatternsRoutesPaths,
  Tests_Lib_Search_Indexer_IgnorePatternsSystemTempDir,
  Tests_Lib_Search_Indexer_IgnorePatternsTempDir,
  Tests_Lib_Search_Indexer_IgnorePatternsTempPathPrefix,
  Tests_Lib_Search_Indexer_IndexDocsFlagDocuments,
  Tests_Lib_Search_Indexer_IndexDocsFlagDocumentsLength,
  Tests_Lib_Search_Indexer_IndexDocsFlagFirstDocumentPath,
  Tests_Lib_Search_Indexer_IndexDocsFlagHtmlContentBlog,
  Tests_Lib_Search_Indexer_IndexDocsFlagHtmlContentDocs,
  Tests_Lib_Search_Indexer_IndexDocsFlagHtmlFilePathBlog,
  Tests_Lib_Search_Indexer_IndexDocsFlagHtmlFilePathDocs,
  Tests_Lib_Search_Indexer_IndexDocsFlagIndexContent,
  Tests_Lib_Search_Indexer_IndexDocsFlagIndexPath,
  Tests_Lib_Search_Indexer_IndexDocsFlagIndexUrl,
  Tests_Lib_Search_Indexer_IndexDocsFlagOutDir,
  Tests_Lib_Search_Indexer_IndexDocsFlagParentDirectoryBlog,
  Tests_Lib_Search_Indexer_IndexDocsFlagParentDirectoryDocs,
  Tests_Lib_Search_Indexer_IndexDocsFlagPayload,
  Tests_Lib_Search_Indexer_IndexDocsFlagRoutesPaths,
  Tests_Lib_Search_Indexer_IndexDocsFlagSystemTempDir,
  Tests_Lib_Search_Indexer_IndexDocsFlagTempDir,
  Tests_Lib_Search_Indexer_IndexDocsFlagTempPathPrefix,
  Tests_Lib_Search_Indexer_LunrSerializationHasFields,
  Tests_Lib_Search_Indexer_LunrSerializationHasInvertedIndex,
  Tests_Lib_Search_Indexer_LunrSerializationHasVersion,
  Tests_Lib_Search_Indexer_LunrSerializationHtmlContent,
  Tests_Lib_Search_Indexer_LunrSerializationHtmlFilePath,
  Tests_Lib_Search_Indexer_LunrSerializationIndex,
  Tests_Lib_Search_Indexer_LunrSerializationIndexContent,
  Tests_Lib_Search_Indexer_LunrSerializationIndexPath,
  Tests_Lib_Search_Indexer_LunrSerializationIndexUrl,
  Tests_Lib_Search_Indexer_LunrSerializationOutDir,
  Tests_Lib_Search_Indexer_LunrSerializationParentDirectory,
  Tests_Lib_Search_Indexer_LunrSerializationPayload,
  Tests_Lib_Search_Indexer_LunrSerializationRoutesPaths,
  Tests_Lib_Search_Indexer_LunrSerializationSystemTempDir,
  Tests_Lib_Search_Indexer_LunrSerializationTempDir,
  Tests_Lib_Search_Indexer_LunrSerializationTempPathPrefix,
} from '../../../types/tests/lib/search/indexer.test.d.ts';

const tempDirs: Tests_Lib_Search_Indexer_CleanupTempDirs = [];

/**
 * Tests - Lib - Search - Indexer.
 *
 * @since 0.15.0
 */
afterEach(() => {
  for (const tempDir of tempDirs) {
    const typedTempDir: Tests_Lib_Search_Indexer_CleanupTempDir = tempDir;

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
    const systemTempDir: Tests_Lib_Search_Indexer_ExtractTitleSystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_ExtractTitleTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_ExtractTitleTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_ExtractTitleOutDir = tempDir;
    const htmlFilePath: Tests_Lib_Search_Indexer_ExtractTitleHtmlFilePath = join(outDir, 'docs', 'getting-started', 'index.html');
    const parentDirectory: Tests_Lib_Search_Indexer_ExtractTitleParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: Tests_Lib_Search_Indexer_ExtractTitleHtmlContent = '<html><head><title>Getting Started</title></head><body><article>Some content here.</article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_ExtractTitleRoutesPaths = ['/docs/getting-started'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const manifestPath: Tests_Lib_Search_Indexer_ExtractTitleManifestPath = join(outDir, 'search-manifest.json');
    const manifestExists: Tests_Lib_Search_Indexer_ExtractTitleManifestExists = existsSync(manifestPath);

    ok(manifestExists);

    const manifestContent: Tests_Lib_Search_Indexer_ExtractTitleManifestContent = readFileSync(manifestPath, 'utf-8');
    const manifest: Tests_Lib_Search_Indexer_ExtractTitleManifest = JSON.parse(manifestContent);
    const indexUrl: Tests_Lib_Search_Indexer_ExtractTitleIndexUrl = manifest['indexUrl'] as Tests_Lib_Search_Indexer_ExtractTitleIndexUrl;

    strictEqual(indexUrl, 'search-index.json');

    const indexPath: Tests_Lib_Search_Indexer_ExtractTitleIndexPath = join(outDir, indexUrl);
    const indexExists: Tests_Lib_Search_Indexer_ExtractTitleIndexExists = existsSync(indexPath);

    ok(indexExists);

    const indexContent: Tests_Lib_Search_Indexer_ExtractTitleIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_ExtractTitlePayload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_ExtractTitleDocuments = payload['documents'] as Tests_Lib_Search_Indexer_ExtractTitleDocuments;
    const firstDocument: Tests_Lib_Search_Indexer_ExtractTitleFirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const firstDocumentTitle: Tests_Lib_Search_Indexer_ExtractTitleFirstDocumentTitle = firstDocument['title'];

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
    const systemTempDir: Tests_Lib_Search_Indexer_ExtractHeadingsSystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_ExtractHeadingsTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_ExtractHeadingsTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_ExtractHeadingsOutDir = tempDir;
    const htmlFilePath: Tests_Lib_Search_Indexer_ExtractHeadingsHtmlFilePath = join(outDir, 'docs', 'api', 'index.html');
    const parentDirectory: Tests_Lib_Search_Indexer_ExtractHeadingsParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: Tests_Lib_Search_Indexer_ExtractHeadingsHtmlContent = '<html><head><title>API Reference</title></head><body><article><h2 id="overview">Overview</h2><p>Text</p><h3 id="methods">Methods</h3><p>More text</p></article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_ExtractHeadingsRoutesPaths = ['/docs/api'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: Tests_Lib_Search_Indexer_ExtractHeadingsIndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_ExtractHeadingsIndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_ExtractHeadingsIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_ExtractHeadingsPayload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_ExtractHeadingsDocuments = payload['documents'] as Tests_Lib_Search_Indexer_ExtractHeadingsDocuments;
    const firstDocument: Tests_Lib_Search_Indexer_ExtractHeadingsFirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const firstHeading: Tests_Lib_Search_Indexer_ExtractHeadingsFirstHeading = firstDocument['headings'][0];

    ok(firstHeading !== undefined);

    const firstHeadingId: Tests_Lib_Search_Indexer_ExtractHeadingsFirstHeadingId = firstHeading['id'];
    const firstHeadingText: Tests_Lib_Search_Indexer_ExtractHeadingsFirstHeadingText = firstHeading['text'];
    const firstHeadingLevel: Tests_Lib_Search_Indexer_ExtractHeadingsFirstHeadingLevel = firstHeading['level'];

    strictEqual(firstHeadingId, 'overview');
    strictEqual(firstHeadingText, 'Overview');
    strictEqual(firstHeadingLevel, 2);

    const secondHeading: Tests_Lib_Search_Indexer_ExtractHeadingsSecondHeading = firstDocument['headings'][1];

    ok(secondHeading !== undefined);

    const secondHeadingId: Tests_Lib_Search_Indexer_ExtractHeadingsSecondHeadingId = secondHeading['id'];
    const secondHeadingText: Tests_Lib_Search_Indexer_ExtractHeadingsSecondHeadingText = secondHeading['text'];
    const secondHeadingLevel: Tests_Lib_Search_Indexer_ExtractHeadingsSecondHeadingLevel = secondHeading['level'];

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
    const systemTempDir: Tests_Lib_Search_Indexer_ExtractBodySystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_ExtractBodyTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_ExtractBodyTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_ExtractBodyOutDir = tempDir;
    const htmlFilePath: Tests_Lib_Search_Indexer_ExtractBodyHtmlFilePath = join(outDir, 'docs', 'guide', 'index.html');
    const parentDirectory: Tests_Lib_Search_Indexer_ExtractBodyParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: Tests_Lib_Search_Indexer_ExtractBodyHtmlContent = '<html><head><title>Guide</title></head><body><nav>Navigation</nav><article>Article body content here.</article><footer>Footer text</footer></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_ExtractBodyRoutesPaths = ['/docs/guide'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: Tests_Lib_Search_Indexer_ExtractBodyIndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_ExtractBodyIndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_ExtractBodyIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_ExtractBodyPayload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_ExtractBodyDocuments = payload['documents'] as Tests_Lib_Search_Indexer_ExtractBodyDocuments;
    const firstDocument: Tests_Lib_Search_Indexer_ExtractBodyFirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const includesArticle: Tests_Lib_Search_Indexer_ExtractBodyIncludesArticle = firstDocument['body'].includes('Article body content here.');
    const excludesNav: Tests_Lib_Search_Indexer_ExtractBodyExcludesNav = firstDocument['body'].includes('Navigation') === false;

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
    const systemTempDir: Tests_Lib_Search_Indexer_ExtractDescriptionSystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_ExtractDescriptionTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_ExtractDescriptionTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_ExtractDescriptionOutDir = tempDir;
    const htmlFilePath: Tests_Lib_Search_Indexer_ExtractDescriptionHtmlFilePath = join(outDir, 'docs', 'intro', 'index.html');
    const parentDirectory: Tests_Lib_Search_Indexer_ExtractDescriptionParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: Tests_Lib_Search_Indexer_ExtractDescriptionHtmlContent = '<html><head><title>Intro</title><meta name="description" content="A brief introduction to the project."></head><body><article>Content</article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_ExtractDescriptionRoutesPaths = ['/docs/intro'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: Tests_Lib_Search_Indexer_ExtractDescriptionIndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_ExtractDescriptionIndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_ExtractDescriptionIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_ExtractDescriptionPayload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_ExtractDescriptionDocuments = payload['documents'] as Tests_Lib_Search_Indexer_ExtractDescriptionDocuments;
    const firstDocument: Tests_Lib_Search_Indexer_ExtractDescriptionFirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const firstDocumentDescription: Tests_Lib_Search_Indexer_ExtractDescriptionFirstDocumentDescription = firstDocument['snippet'];

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
    const systemTempDir: Tests_Lib_Search_Indexer_IgnorePatternsSystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_IgnorePatternsTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_IgnorePatternsTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_IgnorePatternsOutDir = tempDir;
    const htmlFilePathDocs: Tests_Lib_Search_Indexer_IgnorePatternsHtmlFilePathDocs = join(outDir, 'docs', 'setup', 'index.html');
    const htmlFilePathAdmin: Tests_Lib_Search_Indexer_IgnorePatternsHtmlFilePathAdmin = join(outDir, 'admin', 'dashboard', 'index.html');
    const parentDirectoryDocs: Tests_Lib_Search_Indexer_IgnorePatternsParentDirectoryDocs = resolve(htmlFilePathDocs, '..');
    const parentDirectoryAdmin: Tests_Lib_Search_Indexer_IgnorePatternsParentDirectoryAdmin = resolve(htmlFilePathAdmin, '..');

    mkdirSync(parentDirectoryDocs, { recursive: true });
    mkdirSync(parentDirectoryAdmin, { recursive: true });

    const htmlContentDocs: Tests_Lib_Search_Indexer_IgnorePatternsHtmlContentDocs = '<html><head><title>Setup</title></head><body><article>Setup content</article></body></html>';
    const htmlContentAdmin: Tests_Lib_Search_Indexer_IgnorePatternsHtmlContentAdmin = '<html><head><title>Dashboard</title></head><body><article>Admin content</article></body></html>';

    writeFileSync(htmlFilePathDocs, htmlContentDocs, 'utf-8');
    writeFileSync(htmlFilePathAdmin, htmlContentAdmin, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_IgnorePatternsRoutesPaths = [
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

    const indexUrl: Tests_Lib_Search_Indexer_IgnorePatternsIndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_IgnorePatternsIndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_IgnorePatternsIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_IgnorePatternsPayload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_IgnorePatternsDocuments = payload['documents'] as Tests_Lib_Search_Indexer_IgnorePatternsDocuments;
    const documentsLength: Tests_Lib_Search_Indexer_IgnorePatternsDocumentsLength = documents.length;

    strictEqual(documentsLength, 1);

    ok(documents[0] !== undefined);

    const firstDocumentPath: Tests_Lib_Search_Indexer_IgnorePatternsFirstDocumentPath = documents[0]['path'];

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
    const systemTempDir: Tests_Lib_Search_Indexer_IndexDocsFlagSystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_IndexDocsFlagTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_IndexDocsFlagTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_IndexDocsFlagOutDir = tempDir;
    const htmlFilePathDocs: Tests_Lib_Search_Indexer_IndexDocsFlagHtmlFilePathDocs = join(outDir, 'docs', 'reference', 'index.html');
    const htmlFilePathBlog: Tests_Lib_Search_Indexer_IndexDocsFlagHtmlFilePathBlog = join(outDir, 'blog', 'post-one', 'index.html');
    const parentDirectoryDocs: Tests_Lib_Search_Indexer_IndexDocsFlagParentDirectoryDocs = resolve(htmlFilePathDocs, '..');
    const parentDirectoryBlog: Tests_Lib_Search_Indexer_IndexDocsFlagParentDirectoryBlog = resolve(htmlFilePathBlog, '..');

    mkdirSync(parentDirectoryDocs, { recursive: true });
    mkdirSync(parentDirectoryBlog, { recursive: true });

    const htmlContentDocs: Tests_Lib_Search_Indexer_IndexDocsFlagHtmlContentDocs = '<html><head><title>Reference</title></head><body><article>Docs content</article></body></html>';
    const htmlContentBlog: Tests_Lib_Search_Indexer_IndexDocsFlagHtmlContentBlog = '<html><head><title>Post One</title></head><body><article>Blog content</article></body></html>';

    writeFileSync(htmlFilePathDocs, htmlContentDocs, 'utf-8');
    writeFileSync(htmlFilePathBlog, htmlContentBlog, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_IndexDocsFlagRoutesPaths = [
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

    const indexUrl: Tests_Lib_Search_Indexer_IndexDocsFlagIndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_IndexDocsFlagIndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_IndexDocsFlagIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_IndexDocsFlagPayload = JSON.parse(indexContent);
    const documents: Tests_Lib_Search_Indexer_IndexDocsFlagDocuments = payload['documents'] as Tests_Lib_Search_Indexer_IndexDocsFlagDocuments;
    const documentsLength: Tests_Lib_Search_Indexer_IndexDocsFlagDocumentsLength = documents.length;

    strictEqual(documentsLength, 1);

    ok(documents[0] !== undefined);

    const firstDocumentPath: Tests_Lib_Search_Indexer_IndexDocsFlagFirstDocumentPath = documents[0]['path'];

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
    const systemTempDir: Tests_Lib_Search_Indexer_LunrSerializationSystemTempDir = tmpdir();
    const tempPathPrefix: Tests_Lib_Search_Indexer_LunrSerializationTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: Tests_Lib_Search_Indexer_LunrSerializationTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: Tests_Lib_Search_Indexer_LunrSerializationOutDir = tempDir;
    const htmlFilePath: Tests_Lib_Search_Indexer_LunrSerializationHtmlFilePath = join(outDir, 'docs', 'config', 'index.html');
    const parentDirectory: Tests_Lib_Search_Indexer_LunrSerializationParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: Tests_Lib_Search_Indexer_LunrSerializationHtmlContent = '<html><head><title>Configuration</title></head><body><article><h2 id="options">Options</h2><p>Configure the plugin with these options.</p></article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: Tests_Lib_Search_Indexer_LunrSerializationRoutesPaths = ['/docs/config'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: Tests_Lib_Search_Indexer_LunrSerializationIndexUrl = 'search-index.json';
    const indexPath: Tests_Lib_Search_Indexer_LunrSerializationIndexPath = join(outDir, indexUrl);
    const indexContent: Tests_Lib_Search_Indexer_LunrSerializationIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: Tests_Lib_Search_Indexer_LunrSerializationPayload = JSON.parse(indexContent);
    const index: Tests_Lib_Search_Indexer_LunrSerializationIndex = payload['index'] as Tests_Lib_Search_Indexer_LunrSerializationIndex;
    const hasVersion: Tests_Lib_Search_Indexer_LunrSerializationHasVersion = index['version'] !== undefined;
    const hasFields: Tests_Lib_Search_Indexer_LunrSerializationHasFields = index['fields'] !== undefined;
    const hasInvertedIndex: Tests_Lib_Search_Indexer_LunrSerializationHasInvertedIndex = index['invertedIndex'] !== undefined;

    ok(hasVersion);
    ok(hasFields);
    ok(hasInvertedIndex);

    return;
  });

  return;
});
