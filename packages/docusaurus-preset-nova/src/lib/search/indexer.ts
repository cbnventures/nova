import { createHash } from 'node:crypto';
import {
  copyFileSync, existsSync, readFileSync, writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';

import * as cheerio from 'cheerio';

import { LIB_REGEX_WILDCARD_ASTERISK } from '../regex.js';

import type {
  LibSearchIndexerBuildSearchIndexDefaultDocsRouteBasePath,
  LibSearchIndexerBuildSearchIndexDefaultHashed,
  LibSearchIndexerBuildSearchIndexDefaultIgnorePatterns,
  LibSearchIndexerBuildSearchIndexDefaultIndexBlog,
  LibSearchIndexerBuildSearchIndexDefaultIndexDocs,
  LibSearchIndexerBuildSearchIndexDefaultIndexPages,
  LibSearchIndexerBuildSearchIndexDefaultLanguage,
  LibSearchIndexerBuildSearchIndexDocsRouteBasePath,
  LibSearchIndexerBuildSearchIndexDocument,
  LibSearchIndexerBuildSearchIndexDocumentEntry,
  LibSearchIndexerBuildSearchIndexDocumentMetadata,
  LibSearchIndexerBuildSearchIndexDocuments,
  LibSearchIndexerBuildSearchIndexFileName,
  LibSearchIndexerBuildSearchIndexHash,
  LibSearchIndexerBuildSearchIndexHashed,
  LibSearchIndexerBuildSearchIndexHeadingEntry,
  LibSearchIndexerBuildSearchIndexHeadingsText,
  LibSearchIndexerBuildSearchIndexHeadingsTextParts,
  LibSearchIndexerBuildSearchIndexIgnorePatterns,
  LibSearchIndexerBuildSearchIndexIndexBlog,
  LibSearchIndexerBuildSearchIndexIndexDocs,
  LibSearchIndexerBuildSearchIndexIndexFilePath,
  LibSearchIndexerBuildSearchIndexIndexPages,
  LibSearchIndexerBuildSearchIndexIsBlogRoute,
  LibSearchIndexerBuildSearchIndexIsDocsRoute,
  LibSearchIndexerBuildSearchIndexIsIgnored,
  LibSearchIndexerBuildSearchIndexIsNonContentRoute,
  LibSearchIndexerBuildSearchIndexIsPageRoute,
  LibSearchIndexerBuildSearchIndexJsonContent,
  LibSearchIndexerBuildSearchIndexLanguage,
  LibSearchIndexerBuildSearchIndexLanguageCode,
  LibSearchIndexerBuildSearchIndexLunrBuilder,
  LibSearchIndexerBuildSearchIndexLunrDestinationPath,
  LibSearchIndexerBuildSearchIndexLunrFunction,
  LibSearchIndexerBuildSearchIndexLunrIndex,
  LibSearchIndexerBuildSearchIndexLunrLanguageLoader,
  LibSearchIndexerBuildSearchIndexLunrModule,
  LibSearchIndexerBuildSearchIndexLunrMultiLoader,
  LibSearchIndexerBuildSearchIndexLunrSourcePath,
  LibSearchIndexerBuildSearchIndexLunrStemmerSupportLoader,
  LibSearchIndexerBuildSearchIndexManifest,
  LibSearchIndexerBuildSearchIndexManifestFilePath,
  LibSearchIndexerBuildSearchIndexManifestJson,
  LibSearchIndexerBuildSearchIndexNonEnglishLanguageKey,
  LibSearchIndexerBuildSearchIndexNonEnglishLanguages,
  LibSearchIndexerBuildSearchIndexOptions,
  LibSearchIndexerBuildSearchIndexPayload,
  LibSearchIndexerBuildSearchIndexReturns,
  LibSearchIndexerBuildSearchIndexRoutePath,
  LibSearchIndexerBuildSearchIndexSerializedIndex,
  LibSearchIndexerBuildSearchIndexTypedBuilder,
  LibSearchIndexerBuildSearchIndexTypedLunrIndex,
  LibSearchIndexerBuildSearchIndexWorkerDestinationPath,
  LibSearchIndexerBuildSearchIndexWorkerSourcePath,
  LibSearchIndexerExtractDocumentArticleText,
  LibSearchIndexerExtractDocumentBody,
  LibSearchIndexerExtractDocumentCheerioApi,
  LibSearchIndexerExtractDocumentContentSelectors,
  LibSearchIndexerExtractDocumentContentText,
  LibSearchIndexerExtractDocumentDescription,
  LibSearchIndexerExtractDocumentDescriptionAttribute,
  LibSearchIndexerExtractDocumentFallbackText,
  LibSearchIndexerExtractDocumentFileExists,
  LibSearchIndexerExtractDocumentHeadingElement,
  LibSearchIndexerExtractDocumentHeadingId,
  LibSearchIndexerExtractDocumentHeadingLevel,
  LibSearchIndexerExtractDocumentHeadings,
  LibSearchIndexerExtractDocumentHeadingTagName,
  LibSearchIndexerExtractDocumentHeadingText,
  LibSearchIndexerExtractDocumentHtmlContent,
  LibSearchIndexerExtractDocumentHtmlFilePath,
  LibSearchIndexerExtractDocumentMainText,
  LibSearchIndexerExtractDocumentParsedHtml,
  LibSearchIndexerExtractDocumentReturns,
  LibSearchIndexerExtractDocumentRoutePath,
  LibSearchIndexerExtractDocumentTitle,
  LibSearchIndexerExtractDocumentTitleFromHeading,
  LibSearchIndexerExtractDocumentTitleFromTag,
  LibSearchIndexerMatchesIgnorePatternCleanPattern,
  LibSearchIndexerMatchesIgnorePatternIsMatch,
  LibSearchIndexerMatchesIgnorePatternPattern,
  LibSearchIndexerMatchesIgnorePatternPatterns,
  LibSearchIndexerMatchesIgnorePatternReturns,
  LibSearchIndexerMatchesIgnorePatternRoutePath,
} from '../../types/lib/search/indexer.d.ts';

/**
 * Lib - Search - Indexer - Matches Ignore Pattern.
 *
 * Tests whether a given route path matches any of the
 * provided ignore patterns using prefix-based and wildcard
 * suffix matching.
 *
 * @param routePath - Route path.
 * @param patterns  - Patterns.
 * @returns         Matches ignore pattern.
 *
 * @since 0.15.0
 */
function matchesIgnorePattern(routePath: LibSearchIndexerMatchesIgnorePatternRoutePath, patterns: LibSearchIndexerMatchesIgnorePatternPatterns): LibSearchIndexerMatchesIgnorePatternReturns {
  for (const pattern of patterns) {
    const typedPattern: LibSearchIndexerMatchesIgnorePatternPattern = pattern;
    const cleanPattern: LibSearchIndexerMatchesIgnorePatternCleanPattern = typedPattern.replace(new RegExp(LIB_REGEX_WILDCARD_ASTERISK, 'g'), '');
    const isMatch: LibSearchIndexerMatchesIgnorePatternIsMatch = routePath.startsWith(cleanPattern);

    if (isMatch === true) {
      return true;
    }
  }

  return false;
}

/**
 * Lib - Search - Indexer - Extract Document.
 *
 * Reads an HTML file from disk, parses it with cheerio, and
 * extracts the page title, meta description, headings, and body
 * text for search indexing.
 *
 * @param htmlFilePath - Html file path.
 * @param routePath    - Route path.
 * @returns            Extract document.
 *
 * @since 0.15.0
 */
function extractDocument(htmlFilePath: LibSearchIndexerExtractDocumentHtmlFilePath, routePath: LibSearchIndexerExtractDocumentRoutePath): LibSearchIndexerExtractDocumentReturns {
  const fileExists: LibSearchIndexerExtractDocumentFileExists = existsSync(htmlFilePath);

  if (fileExists === false) {
    return undefined;
  }

  const htmlContent: LibSearchIndexerExtractDocumentHtmlContent = readFileSync(htmlFilePath, 'utf-8');
  const parsedHtml: LibSearchIndexerExtractDocumentParsedHtml = cheerio.load(htmlContent);
  const cheerioApi: LibSearchIndexerExtractDocumentCheerioApi = parsedHtml as LibSearchIndexerExtractDocumentCheerioApi;
  const titleFromTag: LibSearchIndexerExtractDocumentTitleFromTag = String(cheerioApi('title').text() ?? '');
  const titleFromHeading: LibSearchIndexerExtractDocumentTitleFromHeading = String(cheerioApi('h1').first().text() ?? '');
  const title: LibSearchIndexerExtractDocumentTitle = (titleFromTag !== '') ? titleFromTag : titleFromHeading;

  const descriptionAttribute: LibSearchIndexerExtractDocumentDescriptionAttribute = cheerioApi('meta[name="description"]').attr('content') as LibSearchIndexerExtractDocumentDescriptionAttribute;
  const description: LibSearchIndexerExtractDocumentDescription = descriptionAttribute ?? '';

  const headings: LibSearchIndexerExtractDocumentHeadings = [];

  cheerioApi('h2, h3').each(function headingIterator(this: LibSearchIndexerExtractDocumentHeadingElement) {
    const headingElement: LibSearchIndexerExtractDocumentHeadingElement = this;
    const headingId: LibSearchIndexerExtractDocumentHeadingId = String(cheerioApi(headingElement).attr('id') ?? '');
    const headingText: LibSearchIndexerExtractDocumentHeadingText = String(cheerioApi(headingElement).text() ?? '');
    const headingTagName: LibSearchIndexerExtractDocumentHeadingTagName = String(cheerioApi(headingElement).prop('tagName') ?? '').toLowerCase();
    const headingLevel: LibSearchIndexerExtractDocumentHeadingLevel = (headingTagName === 'h2') ? 2 : 3;

    headings.push({
      id: headingId,
      text: headingText,
      level: headingLevel,
    });

    return;
  });

  // Extract clean content — prefer targeted content containers, fall back to article/main.
  const contentSelectors: LibSearchIndexerExtractDocumentContentSelectors = '.nova-doc-content, .nova-blog-post-item-content';
  const contentText: LibSearchIndexerExtractDocumentContentText = String(cheerioApi(contentSelectors).text() ?? '');
  const articleText: LibSearchIndexerExtractDocumentArticleText = String(cheerioApi('article').text() ?? '');
  const mainText: LibSearchIndexerExtractDocumentMainText = String(cheerioApi('main').text() ?? '');
  const fallbackText: LibSearchIndexerExtractDocumentFallbackText = (articleText !== '') ? articleText : mainText;
  const body: LibSearchIndexerExtractDocumentBody = (contentText !== '') ? contentText : fallbackText;

  return {
    path: routePath,
    title,
    headings,
    body,
    snippet: description,
  };
}

/**
 * Lib - Search - Indexer - Build Search Index.
 *
 * Iterates over all route paths, extracts document content from their
 * HTML output, builds a lunr full-text search index with language support,
 * and writes the serialized index and manifest files to the output directory.
 *
 * @param options - Options.
 * @since 0.15.0
 */
export function buildSearchIndex(options: LibSearchIndexerBuildSearchIndexOptions): LibSearchIndexerBuildSearchIndexReturns {
  const documents: LibSearchIndexerBuildSearchIndexDocuments = [];

  const defaultLanguage: LibSearchIndexerBuildSearchIndexDefaultLanguage = ['en'];
  const language: LibSearchIndexerBuildSearchIndexLanguage = (options['searchConfig']['language'] as LibSearchIndexerBuildSearchIndexLanguage) ?? defaultLanguage;

  const defaultIndexDocs: LibSearchIndexerBuildSearchIndexDefaultIndexDocs = true;
  const indexDocs: LibSearchIndexerBuildSearchIndexIndexDocs = (options['searchConfig']['indexDocs'] as LibSearchIndexerBuildSearchIndexIndexDocs) ?? defaultIndexDocs;

  const defaultIndexBlog: LibSearchIndexerBuildSearchIndexDefaultIndexBlog = true;
  const indexBlog: LibSearchIndexerBuildSearchIndexIndexBlog = (options['searchConfig']['indexBlog'] as LibSearchIndexerBuildSearchIndexIndexBlog) ?? defaultIndexBlog;

  const defaultIndexPages: LibSearchIndexerBuildSearchIndexDefaultIndexPages = true;
  const indexPages: LibSearchIndexerBuildSearchIndexIndexPages = (options['searchConfig']['indexPages'] as LibSearchIndexerBuildSearchIndexIndexPages) ?? defaultIndexPages;

  const defaultHashed: LibSearchIndexerBuildSearchIndexDefaultHashed = true;
  const hashed: LibSearchIndexerBuildSearchIndexHashed = (options['searchConfig']['hashed'] as LibSearchIndexerBuildSearchIndexHashed) ?? defaultHashed;

  const defaultIgnorePatterns: LibSearchIndexerBuildSearchIndexDefaultIgnorePatterns = [];
  const ignorePatterns: LibSearchIndexerBuildSearchIndexIgnorePatterns = (options['searchConfig']['ignorePatterns'] as LibSearchIndexerBuildSearchIndexIgnorePatterns) ?? defaultIgnorePatterns;

  const defaultDocsRouteBasePath: LibSearchIndexerBuildSearchIndexDefaultDocsRouteBasePath = 'docs';
  const docsRouteBasePath: LibSearchIndexerBuildSearchIndexDocsRouteBasePath = (options['searchConfig']['docsRouteBasePath'] as LibSearchIndexerBuildSearchIndexDocsRouteBasePath) ?? defaultDocsRouteBasePath;

  for (const routePath of options['routesPaths']) {
    const typedRoutePath: LibSearchIndexerBuildSearchIndexRoutePath = routePath;
    const isIgnored: LibSearchIndexerBuildSearchIndexIsIgnored = matchesIgnorePattern(typedRoutePath, ignorePatterns);

    if (isIgnored === true) {
      continue;
    }

    const isBlogRoute: LibSearchIndexerBuildSearchIndexIsBlogRoute = typedRoutePath.startsWith(`${options['baseUrl']}blog`);
    const isDocsRoute: LibSearchIndexerBuildSearchIndexIsDocsRoute = typedRoutePath.startsWith(`${options['baseUrl']}${docsRouteBasePath}`);
    const isPageRoute: LibSearchIndexerBuildSearchIndexIsPageRoute = (isBlogRoute === false && isDocsRoute === false);

    if (isDocsRoute === true && indexDocs === false) {
      continue;
    }

    if (isBlogRoute === true && indexBlog === false) {
      continue;
    }

    if (isPageRoute === true && indexPages === false) {
      continue;
    }

    // Skip non-content routes (archive, tags, authors, search).
    const isNonContentRoute: LibSearchIndexerBuildSearchIndexIsNonContentRoute = typedRoutePath.endsWith('/archive/')
      || typedRoutePath.includes('/tags/')
      || typedRoutePath.includes('/authors/')
      || typedRoutePath.endsWith('/search/');

    if (isNonContentRoute === true) {
      continue;
    }

    const htmlFilePath: LibSearchIndexerExtractDocumentHtmlFilePath = join(options['outDir'], typedRoutePath, 'index.html');
    const document: LibSearchIndexerBuildSearchIndexDocument = extractDocument(htmlFilePath, typedRoutePath);

    if (document === undefined) {
      continue;
    }

    documents.push(document);
  }

  const lunrModule: LibSearchIndexerBuildSearchIndexLunrModule = require('lunr');
  const lunrFunction: LibSearchIndexerBuildSearchIndexLunrFunction = lunrModule as LibSearchIndexerBuildSearchIndexLunrFunction;

  const nonEnglishLanguages: LibSearchIndexerBuildSearchIndexNonEnglishLanguages = [];

  for (const languageCode of language) {
    const typedLanguageCode: LibSearchIndexerBuildSearchIndexLanguageCode = languageCode;

    if (typedLanguageCode !== 'en') {
      nonEnglishLanguages.push(typedLanguageCode);
    }
  }

  if (nonEnglishLanguages.length > 0) {
    const lunrStemmerSupportLoader: LibSearchIndexerBuildSearchIndexLunrStemmerSupportLoader = require('lunr-languages/lunr.stemmer.support');

    lunrStemmerSupportLoader(lunrFunction);

    for (const languageCode of nonEnglishLanguages) {
      const typedLanguageCode: LibSearchIndexerBuildSearchIndexLanguageCode = languageCode;

      if (typedLanguageCode === 'zh') {
        try {
          require('@node-rs/jieba');
        } catch {
          throw new Error('Chinese ("zh") search requires "@node-rs/jieba". Install it with "npm install @node-rs/jieba" to enable Chinese segmentation.');
        }
      }

      const lunrLanguageLoader: LibSearchIndexerBuildSearchIndexLunrLanguageLoader = require(`lunr-languages/lunr.${typedLanguageCode}`);

      lunrLanguageLoader(lunrFunction);
    }

    if (nonEnglishLanguages.length >= 2) {
      const lunrMultiLoader: LibSearchIndexerBuildSearchIndexLunrMultiLoader = require('lunr-languages/lunr.multi');

      lunrMultiLoader(lunrFunction);
    }
  }

  const lunrIndex: LibSearchIndexerBuildSearchIndexLunrIndex = lunrFunction(function indexBuilder(this: LibSearchIndexerBuildSearchIndexLunrBuilder) {
    const builder: LibSearchIndexerBuildSearchIndexLunrBuilder = this;
    const typedBuilder: LibSearchIndexerBuildSearchIndexTypedBuilder = builder as LibSearchIndexerBuildSearchIndexTypedBuilder;

    if (
      nonEnglishLanguages.length > 0
      && language.length >= 2
    ) {
      typedBuilder.use(typedBuilder['multiLanguage'], ...language);
    } else if (
      nonEnglishLanguages.length === 1
      && language.length === 1
    ) {
      const nonEnglishLanguageKey: LibSearchIndexerBuildSearchIndexNonEnglishLanguageKey = nonEnglishLanguages[0] as LibSearchIndexerBuildSearchIndexNonEnglishLanguageKey;

      typedBuilder.use(typedBuilder[nonEnglishLanguageKey]);
    }

    typedBuilder.ref('path');

    typedBuilder.field('title', { boost: 10 });
    typedBuilder.field('headings', { boost: 5 });
    typedBuilder.field('body');

    for (const documentEntry of documents) {
      const typedDocumentEntry: LibSearchIndexerBuildSearchIndexDocumentEntry = documentEntry;
      const headingsTextParts: LibSearchIndexerBuildSearchIndexHeadingsTextParts = [];

      for (const headingEntry of typedDocumentEntry['headings']) {
        const typedHeadingEntry: LibSearchIndexerBuildSearchIndexHeadingEntry = headingEntry;

        headingsTextParts.push(typedHeadingEntry['text']);
      }

      const headingsText: LibSearchIndexerBuildSearchIndexHeadingsText = headingsTextParts.join(' ');

      typedBuilder.add({
        path: typedDocumentEntry['path'],
        title: typedDocumentEntry['title'],
        headings: headingsText,
        body: typedDocumentEntry['body'],
      });
    }

    return;
  });

  const typedLunrIndex: LibSearchIndexerBuildSearchIndexTypedLunrIndex = lunrIndex as LibSearchIndexerBuildSearchIndexTypedLunrIndex;
  const serializedIndex: LibSearchIndexerBuildSearchIndexSerializedIndex = typedLunrIndex.toJSON();
  const documentMetadata: LibSearchIndexerBuildSearchIndexDocumentMetadata = documents;
  const payload: LibSearchIndexerBuildSearchIndexPayload = {
    index: serializedIndex,
    documents: documentMetadata,
  };
  const jsonContent: LibSearchIndexerBuildSearchIndexJsonContent = JSON.stringify(payload);

  let fileName: LibSearchIndexerBuildSearchIndexFileName = 'search-index.json';

  if (hashed === true) {
    const hash: LibSearchIndexerBuildSearchIndexHash = createHash('md5').update(jsonContent).digest('hex');

    fileName = `search-index-${hash}.json`;
  }

  const indexFilePath: LibSearchIndexerBuildSearchIndexIndexFilePath = join(options['outDir'], fileName);

  writeFileSync(indexFilePath, jsonContent, 'utf-8');

  const manifest: LibSearchIndexerBuildSearchIndexManifest = {
    indexUrl: fileName,
  };
  const manifestJson: LibSearchIndexerBuildSearchIndexManifestJson = JSON.stringify(manifest);
  const manifestFilePath: LibSearchIndexerBuildSearchIndexManifestFilePath = join(options['outDir'], 'search-manifest.json');

  writeFileSync(manifestFilePath, manifestJson, 'utf-8');

  const lunrSourcePath: LibSearchIndexerBuildSearchIndexLunrSourcePath = join(dirname(require.resolve('lunr')), 'lunr.min.js');
  const lunrDestinationPath: LibSearchIndexerBuildSearchIndexLunrDestinationPath = join(options['outDir'], 'lunr.min.js');

  if (existsSync(lunrSourcePath) === true) {
    copyFileSync(lunrSourcePath, lunrDestinationPath);
  }

  const workerSourcePath: LibSearchIndexerBuildSearchIndexWorkerSourcePath = resolve(__dirname, 'worker.js');
  const workerDestinationPath: LibSearchIndexerBuildSearchIndexWorkerDestinationPath = join(options['outDir'], 'search-worker.js');

  if (existsSync(workerSourcePath) === true) {
    copyFileSync(workerSourcePath, workerDestinationPath);
  }

  return;
}
