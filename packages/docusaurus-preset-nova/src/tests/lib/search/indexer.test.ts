import { ok, strictEqual } from 'node:assert/strict';
import {
  existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { afterEach, describe, it } from 'vitest';

import { buildSearchIndex } from '../../../lib/search/indexer.js';

import type {
  TestsLibSearchIndexerCleanupTempDir,
  TestsLibSearchIndexerCleanupTempDirs,
  TestsLibSearchIndexerExtractBodyDocuments,
  TestsLibSearchIndexerExtractBodyExcludesNav,
  TestsLibSearchIndexerExtractBodyFirstDocument,
  TestsLibSearchIndexerExtractBodyHtmlContent,
  TestsLibSearchIndexerExtractBodyHtmlFilePath,
  TestsLibSearchIndexerExtractBodyIncludesArticle,
  TestsLibSearchIndexerExtractBodyIndexContent,
  TestsLibSearchIndexerExtractBodyIndexPath,
  TestsLibSearchIndexerExtractBodyIndexUrl,
  TestsLibSearchIndexerExtractBodyOutDir,
  TestsLibSearchIndexerExtractBodyParentDirectory,
  TestsLibSearchIndexerExtractBodyPayload,
  TestsLibSearchIndexerExtractBodyRoutesPaths,
  TestsLibSearchIndexerExtractBodySystemTempDir,
  TestsLibSearchIndexerExtractBodyTempDir,
  TestsLibSearchIndexerExtractBodyTempPathPrefix,
  TestsLibSearchIndexerExtractDescriptionDocuments,
  TestsLibSearchIndexerExtractDescriptionFirstDocument,
  TestsLibSearchIndexerExtractDescriptionFirstDocumentDescription,
  TestsLibSearchIndexerExtractDescriptionHtmlContent,
  TestsLibSearchIndexerExtractDescriptionHtmlFilePath,
  TestsLibSearchIndexerExtractDescriptionIndexContent,
  TestsLibSearchIndexerExtractDescriptionIndexPath,
  TestsLibSearchIndexerExtractDescriptionIndexUrl,
  TestsLibSearchIndexerExtractDescriptionOutDir,
  TestsLibSearchIndexerExtractDescriptionParentDirectory,
  TestsLibSearchIndexerExtractDescriptionPayload,
  TestsLibSearchIndexerExtractDescriptionRoutesPaths,
  TestsLibSearchIndexerExtractDescriptionSystemTempDir,
  TestsLibSearchIndexerExtractDescriptionTempDir,
  TestsLibSearchIndexerExtractDescriptionTempPathPrefix,
  TestsLibSearchIndexerExtractHeadingsDocuments,
  TestsLibSearchIndexerExtractHeadingsFirstDocument,
  TestsLibSearchIndexerExtractHeadingsFirstHeading,
  TestsLibSearchIndexerExtractHeadingsFirstHeadingId,
  TestsLibSearchIndexerExtractHeadingsFirstHeadingLevel,
  TestsLibSearchIndexerExtractHeadingsFirstHeadingText,
  TestsLibSearchIndexerExtractHeadingsHtmlContent,
  TestsLibSearchIndexerExtractHeadingsHtmlFilePath,
  TestsLibSearchIndexerExtractHeadingsIndexContent,
  TestsLibSearchIndexerExtractHeadingsIndexPath,
  TestsLibSearchIndexerExtractHeadingsIndexUrl,
  TestsLibSearchIndexerExtractHeadingsOutDir,
  TestsLibSearchIndexerExtractHeadingsParentDirectory,
  TestsLibSearchIndexerExtractHeadingsPayload,
  TestsLibSearchIndexerExtractHeadingsRoutesPaths,
  TestsLibSearchIndexerExtractHeadingsSecondHeading,
  TestsLibSearchIndexerExtractHeadingsSecondHeadingId,
  TestsLibSearchIndexerExtractHeadingsSecondHeadingLevel,
  TestsLibSearchIndexerExtractHeadingsSecondHeadingText,
  TestsLibSearchIndexerExtractHeadingsSystemTempDir,
  TestsLibSearchIndexerExtractHeadingsTempDir,
  TestsLibSearchIndexerExtractHeadingsTempPathPrefix,
  TestsLibSearchIndexerExtractTitleDocuments,
  TestsLibSearchIndexerExtractTitleFirstDocument,
  TestsLibSearchIndexerExtractTitleFirstDocumentTitle,
  TestsLibSearchIndexerExtractTitleHtmlContent,
  TestsLibSearchIndexerExtractTitleHtmlFilePath,
  TestsLibSearchIndexerExtractTitleIndexContent,
  TestsLibSearchIndexerExtractTitleIndexExists,
  TestsLibSearchIndexerExtractTitleIndexPath,
  TestsLibSearchIndexerExtractTitleIndexUrl,
  TestsLibSearchIndexerExtractTitleManifest,
  TestsLibSearchIndexerExtractTitleManifestContent,
  TestsLibSearchIndexerExtractTitleManifestExists,
  TestsLibSearchIndexerExtractTitleManifestPath,
  TestsLibSearchIndexerExtractTitleOutDir,
  TestsLibSearchIndexerExtractTitleParentDirectory,
  TestsLibSearchIndexerExtractTitlePayload,
  TestsLibSearchIndexerExtractTitleRoutesPaths,
  TestsLibSearchIndexerExtractTitleSystemTempDir,
  TestsLibSearchIndexerExtractTitleTempDir,
  TestsLibSearchIndexerExtractTitleTempPathPrefix,
  TestsLibSearchIndexerIgnorePatternsDocuments,
  TestsLibSearchIndexerIgnorePatternsDocumentsLength,
  TestsLibSearchIndexerIgnorePatternsFirstDocumentPath,
  TestsLibSearchIndexerIgnorePatternsHtmlContentAdmin,
  TestsLibSearchIndexerIgnorePatternsHtmlContentDocs,
  TestsLibSearchIndexerIgnorePatternsHtmlFilePathAdmin,
  TestsLibSearchIndexerIgnorePatternsHtmlFilePathDocs,
  TestsLibSearchIndexerIgnorePatternsIndexContent,
  TestsLibSearchIndexerIgnorePatternsIndexPath,
  TestsLibSearchIndexerIgnorePatternsIndexUrl,
  TestsLibSearchIndexerIgnorePatternsOutDir,
  TestsLibSearchIndexerIgnorePatternsParentDirectoryAdmin,
  TestsLibSearchIndexerIgnorePatternsParentDirectoryDocs,
  TestsLibSearchIndexerIgnorePatternsPayload,
  TestsLibSearchIndexerIgnorePatternsRoutesPaths,
  TestsLibSearchIndexerIgnorePatternsSystemTempDir,
  TestsLibSearchIndexerIgnorePatternsTempDir,
  TestsLibSearchIndexerIgnorePatternsTempPathPrefix,
  TestsLibSearchIndexerIndexDocsFlagDocuments,
  TestsLibSearchIndexerIndexDocsFlagDocumentsLength,
  TestsLibSearchIndexerIndexDocsFlagFirstDocumentPath,
  TestsLibSearchIndexerIndexDocsFlagHtmlContentBlog,
  TestsLibSearchIndexerIndexDocsFlagHtmlContentDocs,
  TestsLibSearchIndexerIndexDocsFlagHtmlFilePathBlog,
  TestsLibSearchIndexerIndexDocsFlagHtmlFilePathDocs,
  TestsLibSearchIndexerIndexDocsFlagIndexContent,
  TestsLibSearchIndexerIndexDocsFlagIndexPath,
  TestsLibSearchIndexerIndexDocsFlagIndexUrl,
  TestsLibSearchIndexerIndexDocsFlagOutDir,
  TestsLibSearchIndexerIndexDocsFlagParentDirectoryBlog,
  TestsLibSearchIndexerIndexDocsFlagParentDirectoryDocs,
  TestsLibSearchIndexerIndexDocsFlagPayload,
  TestsLibSearchIndexerIndexDocsFlagRoutesPaths,
  TestsLibSearchIndexerIndexDocsFlagSystemTempDir,
  TestsLibSearchIndexerIndexDocsFlagTempDir,
  TestsLibSearchIndexerIndexDocsFlagTempPathPrefix,
  TestsLibSearchIndexerLunrSerializationHasFields,
  TestsLibSearchIndexerLunrSerializationHasInvertedIndex,
  TestsLibSearchIndexerLunrSerializationHasVersion,
  TestsLibSearchIndexerLunrSerializationHtmlContent,
  TestsLibSearchIndexerLunrSerializationHtmlFilePath,
  TestsLibSearchIndexerLunrSerializationIndex,
  TestsLibSearchIndexerLunrSerializationIndexContent,
  TestsLibSearchIndexerLunrSerializationIndexPath,
  TestsLibSearchIndexerLunrSerializationIndexUrl,
  TestsLibSearchIndexerLunrSerializationOutDir,
  TestsLibSearchIndexerLunrSerializationParentDirectory,
  TestsLibSearchIndexerLunrSerializationPayload,
  TestsLibSearchIndexerLunrSerializationRoutesPaths,
  TestsLibSearchIndexerLunrSerializationSystemTempDir,
  TestsLibSearchIndexerLunrSerializationTempDir,
  TestsLibSearchIndexerLunrSerializationTempPathPrefix,
} from '../../../types/tests/lib/search/indexer.test.d.ts';

const tempDirs: TestsLibSearchIndexerCleanupTempDirs = [];

/**
 * Tests - Lib - Search - Indexer.
 *
 * @since 0.15.0
 */
afterEach(() => {
  for (const tempDir of tempDirs) {
    const typedTempDir: TestsLibSearchIndexerCleanupTempDir = tempDir;

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
    const systemTempDir: TestsLibSearchIndexerExtractTitleSystemTempDir = tmpdir();
    const tempPathPrefix: TestsLibSearchIndexerExtractTitleTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: TestsLibSearchIndexerExtractTitleTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: TestsLibSearchIndexerExtractTitleOutDir = tempDir;
    const htmlFilePath: TestsLibSearchIndexerExtractTitleHtmlFilePath = join(outDir, 'docs', 'getting-started', 'index.html');
    const parentDirectory: TestsLibSearchIndexerExtractTitleParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: TestsLibSearchIndexerExtractTitleHtmlContent = '<html><head><title>Getting Started</title></head><body><article>Some content here.</article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: TestsLibSearchIndexerExtractTitleRoutesPaths = ['/docs/getting-started'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const manifestPath: TestsLibSearchIndexerExtractTitleManifestPath = join(outDir, 'search-manifest.json');
    const manifestExists: TestsLibSearchIndexerExtractTitleManifestExists = existsSync(manifestPath);

    ok(manifestExists);

    const manifestContent: TestsLibSearchIndexerExtractTitleManifestContent = readFileSync(manifestPath, 'utf-8');
    const manifest: TestsLibSearchIndexerExtractTitleManifest = JSON.parse(manifestContent);
    const indexUrl: TestsLibSearchIndexerExtractTitleIndexUrl = manifest['indexUrl'] as TestsLibSearchIndexerExtractTitleIndexUrl;

    strictEqual(indexUrl, 'search-index.json');

    const indexPath: TestsLibSearchIndexerExtractTitleIndexPath = join(outDir, indexUrl);
    const indexExists: TestsLibSearchIndexerExtractTitleIndexExists = existsSync(indexPath);

    ok(indexExists);

    const indexContent: TestsLibSearchIndexerExtractTitleIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: TestsLibSearchIndexerExtractTitlePayload = JSON.parse(indexContent);
    const documents: TestsLibSearchIndexerExtractTitleDocuments = payload['documents'] as TestsLibSearchIndexerExtractTitleDocuments;
    const firstDocument: TestsLibSearchIndexerExtractTitleFirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const firstDocumentTitle: TestsLibSearchIndexerExtractTitleFirstDocumentTitle = firstDocument['title'];

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
    const systemTempDir: TestsLibSearchIndexerExtractHeadingsSystemTempDir = tmpdir();
    const tempPathPrefix: TestsLibSearchIndexerExtractHeadingsTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: TestsLibSearchIndexerExtractHeadingsTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: TestsLibSearchIndexerExtractHeadingsOutDir = tempDir;
    const htmlFilePath: TestsLibSearchIndexerExtractHeadingsHtmlFilePath = join(outDir, 'docs', 'api', 'index.html');
    const parentDirectory: TestsLibSearchIndexerExtractHeadingsParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: TestsLibSearchIndexerExtractHeadingsHtmlContent = '<html><head><title>API Reference</title></head><body><article><h2 id="overview">Overview</h2><p>Text</p><h3 id="methods">Methods</h3><p>More text</p></article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: TestsLibSearchIndexerExtractHeadingsRoutesPaths = ['/docs/api'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: TestsLibSearchIndexerExtractHeadingsIndexUrl = 'search-index.json';
    const indexPath: TestsLibSearchIndexerExtractHeadingsIndexPath = join(outDir, indexUrl);
    const indexContent: TestsLibSearchIndexerExtractHeadingsIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: TestsLibSearchIndexerExtractHeadingsPayload = JSON.parse(indexContent);
    const documents: TestsLibSearchIndexerExtractHeadingsDocuments = payload['documents'] as TestsLibSearchIndexerExtractHeadingsDocuments;
    const firstDocument: TestsLibSearchIndexerExtractHeadingsFirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const firstHeading: TestsLibSearchIndexerExtractHeadingsFirstHeading = firstDocument['headings'][0];

    ok(firstHeading !== undefined);

    const firstHeadingId: TestsLibSearchIndexerExtractHeadingsFirstHeadingId = firstHeading['id'];
    const firstHeadingText: TestsLibSearchIndexerExtractHeadingsFirstHeadingText = firstHeading['text'];
    const firstHeadingLevel: TestsLibSearchIndexerExtractHeadingsFirstHeadingLevel = firstHeading['level'];

    strictEqual(firstHeadingId, 'overview');
    strictEqual(firstHeadingText, 'Overview');
    strictEqual(firstHeadingLevel, 2);

    const secondHeading: TestsLibSearchIndexerExtractHeadingsSecondHeading = firstDocument['headings'][1];

    ok(secondHeading !== undefined);

    const secondHeadingId: TestsLibSearchIndexerExtractHeadingsSecondHeadingId = secondHeading['id'];
    const secondHeadingText: TestsLibSearchIndexerExtractHeadingsSecondHeadingText = secondHeading['text'];
    const secondHeadingLevel: TestsLibSearchIndexerExtractHeadingsSecondHeadingLevel = secondHeading['level'];

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
    const systemTempDir: TestsLibSearchIndexerExtractBodySystemTempDir = tmpdir();
    const tempPathPrefix: TestsLibSearchIndexerExtractBodyTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: TestsLibSearchIndexerExtractBodyTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: TestsLibSearchIndexerExtractBodyOutDir = tempDir;
    const htmlFilePath: TestsLibSearchIndexerExtractBodyHtmlFilePath = join(outDir, 'docs', 'guide', 'index.html');
    const parentDirectory: TestsLibSearchIndexerExtractBodyParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: TestsLibSearchIndexerExtractBodyHtmlContent = '<html><head><title>Guide</title></head><body><nav>Navigation</nav><article>Article body content here.</article><footer>Footer text</footer></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: TestsLibSearchIndexerExtractBodyRoutesPaths = ['/docs/guide'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: TestsLibSearchIndexerExtractBodyIndexUrl = 'search-index.json';
    const indexPath: TestsLibSearchIndexerExtractBodyIndexPath = join(outDir, indexUrl);
    const indexContent: TestsLibSearchIndexerExtractBodyIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: TestsLibSearchIndexerExtractBodyPayload = JSON.parse(indexContent);
    const documents: TestsLibSearchIndexerExtractBodyDocuments = payload['documents'] as TestsLibSearchIndexerExtractBodyDocuments;
    const firstDocument: TestsLibSearchIndexerExtractBodyFirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const includesArticle: TestsLibSearchIndexerExtractBodyIncludesArticle = firstDocument['body'].includes('Article body content here.');
    const excludesNav: TestsLibSearchIndexerExtractBodyExcludesNav = firstDocument['body'].includes('Navigation') === false;

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
    const systemTempDir: TestsLibSearchIndexerExtractDescriptionSystemTempDir = tmpdir();
    const tempPathPrefix: TestsLibSearchIndexerExtractDescriptionTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: TestsLibSearchIndexerExtractDescriptionTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: TestsLibSearchIndexerExtractDescriptionOutDir = tempDir;
    const htmlFilePath: TestsLibSearchIndexerExtractDescriptionHtmlFilePath = join(outDir, 'docs', 'intro', 'index.html');
    const parentDirectory: TestsLibSearchIndexerExtractDescriptionParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: TestsLibSearchIndexerExtractDescriptionHtmlContent = '<html><head><title>Intro</title><meta name="description" content="A brief introduction to the project."></head><body><article>Content</article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: TestsLibSearchIndexerExtractDescriptionRoutesPaths = ['/docs/intro'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: TestsLibSearchIndexerExtractDescriptionIndexUrl = 'search-index.json';
    const indexPath: TestsLibSearchIndexerExtractDescriptionIndexPath = join(outDir, indexUrl);
    const indexContent: TestsLibSearchIndexerExtractDescriptionIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: TestsLibSearchIndexerExtractDescriptionPayload = JSON.parse(indexContent);
    const documents: TestsLibSearchIndexerExtractDescriptionDocuments = payload['documents'] as TestsLibSearchIndexerExtractDescriptionDocuments;
    const firstDocument: TestsLibSearchIndexerExtractDescriptionFirstDocument = documents[0];

    ok(firstDocument !== undefined);

    const firstDocumentDescription: TestsLibSearchIndexerExtractDescriptionFirstDocumentDescription = firstDocument['snippet'];

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
    const systemTempDir: TestsLibSearchIndexerIgnorePatternsSystemTempDir = tmpdir();
    const tempPathPrefix: TestsLibSearchIndexerIgnorePatternsTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: TestsLibSearchIndexerIgnorePatternsTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: TestsLibSearchIndexerIgnorePatternsOutDir = tempDir;
    const htmlFilePathDocs: TestsLibSearchIndexerIgnorePatternsHtmlFilePathDocs = join(outDir, 'docs', 'setup', 'index.html');
    const htmlFilePathAdmin: TestsLibSearchIndexerIgnorePatternsHtmlFilePathAdmin = join(outDir, 'admin', 'dashboard', 'index.html');
    const parentDirectoryDocs: TestsLibSearchIndexerIgnorePatternsParentDirectoryDocs = resolve(htmlFilePathDocs, '..');
    const parentDirectoryAdmin: TestsLibSearchIndexerIgnorePatternsParentDirectoryAdmin = resolve(htmlFilePathAdmin, '..');

    mkdirSync(parentDirectoryDocs, { recursive: true });
    mkdirSync(parentDirectoryAdmin, { recursive: true });

    const htmlContentDocs: TestsLibSearchIndexerIgnorePatternsHtmlContentDocs = '<html><head><title>Setup</title></head><body><article>Setup content</article></body></html>';
    const htmlContentAdmin: TestsLibSearchIndexerIgnorePatternsHtmlContentAdmin = '<html><head><title>Dashboard</title></head><body><article>Admin content</article></body></html>';

    writeFileSync(htmlFilePathDocs, htmlContentDocs, 'utf-8');
    writeFileSync(htmlFilePathAdmin, htmlContentAdmin, 'utf-8');

    const routesPaths: TestsLibSearchIndexerIgnorePatternsRoutesPaths = [
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

    const indexUrl: TestsLibSearchIndexerIgnorePatternsIndexUrl = 'search-index.json';
    const indexPath: TestsLibSearchIndexerIgnorePatternsIndexPath = join(outDir, indexUrl);
    const indexContent: TestsLibSearchIndexerIgnorePatternsIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: TestsLibSearchIndexerIgnorePatternsPayload = JSON.parse(indexContent);
    const documents: TestsLibSearchIndexerIgnorePatternsDocuments = payload['documents'] as TestsLibSearchIndexerIgnorePatternsDocuments;
    const documentsLength: TestsLibSearchIndexerIgnorePatternsDocumentsLength = documents.length;

    strictEqual(documentsLength, 1);

    ok(documents[0] !== undefined);

    const firstDocumentPath: TestsLibSearchIndexerIgnorePatternsFirstDocumentPath = documents[0]['path'];

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
    const systemTempDir: TestsLibSearchIndexerIndexDocsFlagSystemTempDir = tmpdir();
    const tempPathPrefix: TestsLibSearchIndexerIndexDocsFlagTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: TestsLibSearchIndexerIndexDocsFlagTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: TestsLibSearchIndexerIndexDocsFlagOutDir = tempDir;
    const htmlFilePathDocs: TestsLibSearchIndexerIndexDocsFlagHtmlFilePathDocs = join(outDir, 'docs', 'reference', 'index.html');
    const htmlFilePathBlog: TestsLibSearchIndexerIndexDocsFlagHtmlFilePathBlog = join(outDir, 'blog', 'post-one', 'index.html');
    const parentDirectoryDocs: TestsLibSearchIndexerIndexDocsFlagParentDirectoryDocs = resolve(htmlFilePathDocs, '..');
    const parentDirectoryBlog: TestsLibSearchIndexerIndexDocsFlagParentDirectoryBlog = resolve(htmlFilePathBlog, '..');

    mkdirSync(parentDirectoryDocs, { recursive: true });
    mkdirSync(parentDirectoryBlog, { recursive: true });

    const htmlContentDocs: TestsLibSearchIndexerIndexDocsFlagHtmlContentDocs = '<html><head><title>Reference</title></head><body><article>Docs content</article></body></html>';
    const htmlContentBlog: TestsLibSearchIndexerIndexDocsFlagHtmlContentBlog = '<html><head><title>Post One</title></head><body><article>Blog content</article></body></html>';

    writeFileSync(htmlFilePathDocs, htmlContentDocs, 'utf-8');
    writeFileSync(htmlFilePathBlog, htmlContentBlog, 'utf-8');

    const routesPaths: TestsLibSearchIndexerIndexDocsFlagRoutesPaths = [
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

    const indexUrl: TestsLibSearchIndexerIndexDocsFlagIndexUrl = 'search-index.json';
    const indexPath: TestsLibSearchIndexerIndexDocsFlagIndexPath = join(outDir, indexUrl);
    const indexContent: TestsLibSearchIndexerIndexDocsFlagIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: TestsLibSearchIndexerIndexDocsFlagPayload = JSON.parse(indexContent);
    const documents: TestsLibSearchIndexerIndexDocsFlagDocuments = payload['documents'] as TestsLibSearchIndexerIndexDocsFlagDocuments;
    const documentsLength: TestsLibSearchIndexerIndexDocsFlagDocumentsLength = documents.length;

    strictEqual(documentsLength, 1);

    ok(documents[0] !== undefined);

    const firstDocumentPath: TestsLibSearchIndexerIndexDocsFlagFirstDocumentPath = documents[0]['path'];

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
    const systemTempDir: TestsLibSearchIndexerLunrSerializationSystemTempDir = tmpdir();
    const tempPathPrefix: TestsLibSearchIndexerLunrSerializationTempPathPrefix = join(systemTempDir, 'nova-search-');
    const tempDir: TestsLibSearchIndexerLunrSerializationTempDir = mkdtempSync(tempPathPrefix);

    tempDirs.push(tempDir);

    const outDir: TestsLibSearchIndexerLunrSerializationOutDir = tempDir;
    const htmlFilePath: TestsLibSearchIndexerLunrSerializationHtmlFilePath = join(outDir, 'docs', 'config', 'index.html');
    const parentDirectory: TestsLibSearchIndexerLunrSerializationParentDirectory = resolve(htmlFilePath, '..');

    mkdirSync(parentDirectory, { recursive: true });

    const htmlContent: TestsLibSearchIndexerLunrSerializationHtmlContent = '<html><head><title>Configuration</title></head><body><article><h2 id="options">Options</h2><p>Configure the plugin with these options.</p></article></body></html>';

    writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    const routesPaths: TestsLibSearchIndexerLunrSerializationRoutesPaths = ['/docs/config'];

    buildSearchIndex({
      outDir,
      routesPaths,
      baseUrl: '/',
      searchConfig: { hashed: false },
    });

    const indexUrl: TestsLibSearchIndexerLunrSerializationIndexUrl = 'search-index.json';
    const indexPath: TestsLibSearchIndexerLunrSerializationIndexPath = join(outDir, indexUrl);
    const indexContent: TestsLibSearchIndexerLunrSerializationIndexContent = readFileSync(indexPath, 'utf-8');
    const payload: TestsLibSearchIndexerLunrSerializationPayload = JSON.parse(indexContent);
    const index: TestsLibSearchIndexerLunrSerializationIndex = payload['index'] as TestsLibSearchIndexerLunrSerializationIndex;
    const hasVersion: TestsLibSearchIndexerLunrSerializationHasVersion = index['version'] !== undefined;
    const hasFields: TestsLibSearchIndexerLunrSerializationHasFields = index['fields'] !== undefined;
    const hasInvertedIndex: TestsLibSearchIndexerLunrSerializationHasInvertedIndex = index['invertedIndex'] !== undefined;

    ok(hasVersion);
    ok(hasFields);
    ok(hasInvertedIndex);

    return;
  });

  return;
});
