import { createHash } from 'node:crypto';
import {
  copyFileSync, existsSync, readFileSync, writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';

import * as cheerio from 'cheerio';

import { LIB_REGEX_WILDCARD_ASTERISK } from '../regex.js';

import type {
  Lib_Search_Indexer_BuildSearchIndex_BaseUrlPrefixedRoute,
  Lib_Search_Indexer_BuildSearchIndex_BaseUrlString,
  Lib_Search_Indexer_BuildSearchIndex_DefaultDocsRouteBasePath,
  Lib_Search_Indexer_BuildSearchIndex_DefaultHashed,
  Lib_Search_Indexer_BuildSearchIndex_DefaultIgnorePatterns,
  Lib_Search_Indexer_BuildSearchIndex_DefaultIndexBlog,
  Lib_Search_Indexer_BuildSearchIndex_DefaultIndexDocs,
  Lib_Search_Indexer_BuildSearchIndex_DefaultIndexPages,
  Lib_Search_Indexer_BuildSearchIndex_DefaultLanguage,
  Lib_Search_Indexer_BuildSearchIndex_DocsRouteBasePath,
  Lib_Search_Indexer_BuildSearchIndex_Document,
  Lib_Search_Indexer_BuildSearchIndex_DocumentMetadata,
  Lib_Search_Indexer_BuildSearchIndex_Documents,
  Lib_Search_Indexer_BuildSearchIndex_FileName,
  Lib_Search_Indexer_BuildSearchIndex_Hash,
  Lib_Search_Indexer_BuildSearchIndex_Hashed,
  Lib_Search_Indexer_BuildSearchIndex_HtmlFilePath,
  Lib_Search_Indexer_BuildSearchIndex_IgnorePatterns,
  Lib_Search_Indexer_BuildSearchIndex_IndexBlog,
  Lib_Search_Indexer_BuildSearchIndex_IndexBuilder,
  Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_Builder,
  Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_HeadingsText,
  Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_HeadingsTextParts,
  Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_LunrLanguagePlugin,
  Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_LunrMultiLanguageFactory,
  Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_NonEnglishLanguageKey,
  Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_TypedBuilder,
  Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_TypedDocumentEntry,
  Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_TypedHeadingEntry,
  Lib_Search_Indexer_BuildSearchIndex_IndexDocs,
  Lib_Search_Indexer_BuildSearchIndex_IndexFilePath,
  Lib_Search_Indexer_BuildSearchIndex_IndexPages,
  Lib_Search_Indexer_BuildSearchIndex_IsBlogRoute,
  Lib_Search_Indexer_BuildSearchIndex_IsDocsRoute,
  Lib_Search_Indexer_BuildSearchIndex_IsIgnored,
  Lib_Search_Indexer_BuildSearchIndex_IsNonContentRoute,
  Lib_Search_Indexer_BuildSearchIndex_IsPageRoute,
  Lib_Search_Indexer_BuildSearchIndex_JsonContent,
  Lib_Search_Indexer_BuildSearchIndex_Language,
  Lib_Search_Indexer_BuildSearchIndex_LocaleRelativeRoutePath,
  Lib_Search_Indexer_BuildSearchIndex_LunrDestinationPath,
  Lib_Search_Indexer_BuildSearchIndex_LunrFunction,
  Lib_Search_Indexer_BuildSearchIndex_LunrIndex,
  Lib_Search_Indexer_BuildSearchIndex_LunrLanguageLoader,
  Lib_Search_Indexer_BuildSearchIndex_LunrLanguageRegistry,
  Lib_Search_Indexer_BuildSearchIndex_LunrModule,
  Lib_Search_Indexer_BuildSearchIndex_LunrMultiLanguageRegistry,
  Lib_Search_Indexer_BuildSearchIndex_LunrMultiLoader,
  Lib_Search_Indexer_BuildSearchIndex_LunrSourcePath,
  Lib_Search_Indexer_BuildSearchIndex_LunrStemmerSupportLoader,
  Lib_Search_Indexer_BuildSearchIndex_LunrTinySegLoader,
  Lib_Search_Indexer_BuildSearchIndex_Manifest,
  Lib_Search_Indexer_BuildSearchIndex_ManifestFilePath,
  Lib_Search_Indexer_BuildSearchIndex_ManifestJson,
  Lib_Search_Indexer_BuildSearchIndex_NonEnglishLanguageCode,
  Lib_Search_Indexer_BuildSearchIndex_NonEnglishLanguages,
  Lib_Search_Indexer_BuildSearchIndex_Options,
  Lib_Search_Indexer_BuildSearchIndex_Payload,
  Lib_Search_Indexer_BuildSearchIndex_Returns,
  Lib_Search_Indexer_BuildSearchIndex_SerializedIndex,
  Lib_Search_Indexer_BuildSearchIndex_TypedLanguageCode,
  Lib_Search_Indexer_BuildSearchIndex_TypedLunrIndex,
  Lib_Search_Indexer_BuildSearchIndex_TypedRoutePath,
  Lib_Search_Indexer_BuildSearchIndex_WorkerDestinationPath,
  Lib_Search_Indexer_BuildSearchIndex_WorkerSourcePath,
  Lib_Search_Indexer_ExtractDocument_ArticleText,
  Lib_Search_Indexer_ExtractDocument_Body,
  Lib_Search_Indexer_ExtractDocument_CheerioApi,
  Lib_Search_Indexer_ExtractDocument_ContentSelectors,
  Lib_Search_Indexer_ExtractDocument_ContentText,
  Lib_Search_Indexer_ExtractDocument_Description,
  Lib_Search_Indexer_ExtractDocument_DescriptionAttribute,
  Lib_Search_Indexer_ExtractDocument_FallbackText,
  Lib_Search_Indexer_ExtractDocument_FileExists,
  Lib_Search_Indexer_ExtractDocument_HeadingIterator,
  Lib_Search_Indexer_ExtractDocument_HeadingIterator_HeadingElement,
  Lib_Search_Indexer_ExtractDocument_HeadingIterator_HeadingId,
  Lib_Search_Indexer_ExtractDocument_HeadingIterator_HeadingLevel,
  Lib_Search_Indexer_ExtractDocument_HeadingIterator_HeadingTagName,
  Lib_Search_Indexer_ExtractDocument_HeadingIterator_HeadingText,
  Lib_Search_Indexer_ExtractDocument_Headings,
  Lib_Search_Indexer_ExtractDocument_HtmlContent,
  Lib_Search_Indexer_ExtractDocument_HtmlFilePath,
  Lib_Search_Indexer_ExtractDocument_MainText,
  Lib_Search_Indexer_ExtractDocument_ParsedHtml,
  Lib_Search_Indexer_ExtractDocument_Returns,
  Lib_Search_Indexer_ExtractDocument_RoutePath,
  Lib_Search_Indexer_ExtractDocument_Title,
  Lib_Search_Indexer_ExtractDocument_TitleFromHeading,
  Lib_Search_Indexer_ExtractDocument_TitleFromTag,
  Lib_Search_Indexer_MatchesIgnorePattern_CleanPattern,
  Lib_Search_Indexer_MatchesIgnorePattern_IsMatch,
  Lib_Search_Indexer_MatchesIgnorePattern_Patterns,
  Lib_Search_Indexer_MatchesIgnorePattern_Returns,
  Lib_Search_Indexer_MatchesIgnorePattern_RoutePath,
  Lib_Search_Indexer_MatchesIgnorePattern_TypedPattern,
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
function matchesIgnorePattern(routePath: Lib_Search_Indexer_MatchesIgnorePattern_RoutePath, patterns: Lib_Search_Indexer_MatchesIgnorePattern_Patterns): Lib_Search_Indexer_MatchesIgnorePattern_Returns {
  for (const pattern of patterns) {
    const typedPattern: Lib_Search_Indexer_MatchesIgnorePattern_TypedPattern = pattern;
    const cleanPattern: Lib_Search_Indexer_MatchesIgnorePattern_CleanPattern = typedPattern.replace(new RegExp(LIB_REGEX_WILDCARD_ASTERISK, 'g'), '');
    const isMatch: Lib_Search_Indexer_MatchesIgnorePattern_IsMatch = routePath.startsWith(cleanPattern);

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
function extractDocument(htmlFilePath: Lib_Search_Indexer_ExtractDocument_HtmlFilePath, routePath: Lib_Search_Indexer_ExtractDocument_RoutePath): Lib_Search_Indexer_ExtractDocument_Returns {
  const fileExists: Lib_Search_Indexer_ExtractDocument_FileExists = existsSync(htmlFilePath);

  if (fileExists === false) {
    return undefined;
  }

  const htmlContent: Lib_Search_Indexer_ExtractDocument_HtmlContent = readFileSync(htmlFilePath, 'utf-8');
  const parsedHtml: Lib_Search_Indexer_ExtractDocument_ParsedHtml = cheerio.load(htmlContent);
  const cheerioApi: Lib_Search_Indexer_ExtractDocument_CheerioApi = parsedHtml as Lib_Search_Indexer_ExtractDocument_CheerioApi;
  const titleFromTag: Lib_Search_Indexer_ExtractDocument_TitleFromTag = String(cheerioApi('title').text() ?? '');
  const titleFromHeading: Lib_Search_Indexer_ExtractDocument_TitleFromHeading = String(cheerioApi('h1').first().text() ?? '');
  const title: Lib_Search_Indexer_ExtractDocument_Title = (titleFromTag !== '') ? titleFromTag : titleFromHeading;

  const descriptionAttribute: Lib_Search_Indexer_ExtractDocument_DescriptionAttribute = cheerioApi('meta[name="description"]').attr('content') as Lib_Search_Indexer_ExtractDocument_DescriptionAttribute;
  const description: Lib_Search_Indexer_ExtractDocument_Description = descriptionAttribute ?? '';

  const headings: Lib_Search_Indexer_ExtractDocument_Headings = [];

  const headingIterator: Lib_Search_Indexer_ExtractDocument_HeadingIterator = (_index, element) => {
    const headingElement: Lib_Search_Indexer_ExtractDocument_HeadingIterator_HeadingElement = element;
    const headingId: Lib_Search_Indexer_ExtractDocument_HeadingIterator_HeadingId = String(cheerioApi(headingElement).attr('id') ?? '');
    const headingText: Lib_Search_Indexer_ExtractDocument_HeadingIterator_HeadingText = String(cheerioApi(headingElement).text() ?? '');
    const headingTagName: Lib_Search_Indexer_ExtractDocument_HeadingIterator_HeadingTagName = String(cheerioApi(headingElement).prop('tagName') ?? '').toLowerCase();
    const headingLevel: Lib_Search_Indexer_ExtractDocument_HeadingIterator_HeadingLevel = (headingTagName === 'h2') ? 2 : 3;

    headings.push({
      id: headingId,
      text: headingText,
      level: headingLevel,
    });

    return;
  };

  cheerioApi('h2, h3').each(headingIterator);

  // Extract clean content — prefer targeted content containers, fall back to article/main.
  const contentSelectors: Lib_Search_Indexer_ExtractDocument_ContentSelectors = '.nova-doc-content, .nova-blog-post-item-content';
  const contentText: Lib_Search_Indexer_ExtractDocument_ContentText = String(cheerioApi(contentSelectors).text() ?? '');
  const articleText: Lib_Search_Indexer_ExtractDocument_ArticleText = String(cheerioApi('article').text() ?? '');
  const mainText: Lib_Search_Indexer_ExtractDocument_MainText = String(cheerioApi('main').text() ?? '');
  const fallbackText: Lib_Search_Indexer_ExtractDocument_FallbackText = (articleText !== '') ? articleText : mainText;
  const body: Lib_Search_Indexer_ExtractDocument_Body = (contentText !== '') ? contentText : fallbackText;

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
export function buildSearchIndex(options: Lib_Search_Indexer_BuildSearchIndex_Options): Lib_Search_Indexer_BuildSearchIndex_Returns {
  const documents: Lib_Search_Indexer_BuildSearchIndex_Documents = [];

  const defaultLanguage: Lib_Search_Indexer_BuildSearchIndex_DefaultLanguage = ['en'];
  const language: Lib_Search_Indexer_BuildSearchIndex_Language = (options['searchConfig']['language'] as Lib_Search_Indexer_BuildSearchIndex_Language) ?? defaultLanguage;

  const defaultIndexDocs: Lib_Search_Indexer_BuildSearchIndex_DefaultIndexDocs = true;
  const indexDocs: Lib_Search_Indexer_BuildSearchIndex_IndexDocs = (options['searchConfig']['indexDocs'] as Lib_Search_Indexer_BuildSearchIndex_IndexDocs) ?? defaultIndexDocs;

  const defaultIndexBlog: Lib_Search_Indexer_BuildSearchIndex_DefaultIndexBlog = true;
  const indexBlog: Lib_Search_Indexer_BuildSearchIndex_IndexBlog = (options['searchConfig']['indexBlog'] as Lib_Search_Indexer_BuildSearchIndex_IndexBlog) ?? defaultIndexBlog;

  const defaultIndexPages: Lib_Search_Indexer_BuildSearchIndex_DefaultIndexPages = true;
  const indexPages: Lib_Search_Indexer_BuildSearchIndex_IndexPages = (options['searchConfig']['indexPages'] as Lib_Search_Indexer_BuildSearchIndex_IndexPages) ?? defaultIndexPages;

  const defaultHashed: Lib_Search_Indexer_BuildSearchIndex_DefaultHashed = true;
  const hashed: Lib_Search_Indexer_BuildSearchIndex_Hashed = (options['searchConfig']['hashed'] as Lib_Search_Indexer_BuildSearchIndex_Hashed) ?? defaultHashed;

  const defaultIgnorePatterns: Lib_Search_Indexer_BuildSearchIndex_DefaultIgnorePatterns = [];
  const ignorePatterns: Lib_Search_Indexer_BuildSearchIndex_IgnorePatterns = (options['searchConfig']['ignorePatterns'] as Lib_Search_Indexer_BuildSearchIndex_IgnorePatterns) ?? defaultIgnorePatterns;

  const defaultDocsRouteBasePath: Lib_Search_Indexer_BuildSearchIndex_DefaultDocsRouteBasePath = 'docs';
  const docsRouteBasePath: Lib_Search_Indexer_BuildSearchIndex_DocsRouteBasePath = (options['searchConfig']['docsRouteBasePath'] as Lib_Search_Indexer_BuildSearchIndex_DocsRouteBasePath) ?? defaultDocsRouteBasePath;

  for (const routePath of options['routesPaths']) {
    const typedRoutePath: Lib_Search_Indexer_BuildSearchIndex_TypedRoutePath = routePath;
    const isIgnored: Lib_Search_Indexer_BuildSearchIndex_IsIgnored = matchesIgnorePattern(typedRoutePath, ignorePatterns);

    if (isIgnored === true) {
      continue;
    }

    const isBlogRoute: Lib_Search_Indexer_BuildSearchIndex_IsBlogRoute = typedRoutePath.startsWith(`${options['baseUrl']}blog`);
    const isDocsRoute: Lib_Search_Indexer_BuildSearchIndex_IsDocsRoute = typedRoutePath.startsWith(`${options['baseUrl']}${docsRouteBasePath}`);
    const isPageRoute: Lib_Search_Indexer_BuildSearchIndex_IsPageRoute = (isBlogRoute === false && isDocsRoute === false);

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
    const isNonContentRoute: Lib_Search_Indexer_BuildSearchIndex_IsNonContentRoute = typedRoutePath.endsWith('/archive/')
      || typedRoutePath.includes('/tags/')
      || typedRoutePath.includes('/authors/')
      || typedRoutePath.endsWith('/search/');

    if (isNonContentRoute === true) {
      continue;
    }

    // For non-default locales Docusaurus passes the locale-aware
    // `baseUrl` (e.g. `/ja/`) AND already locale-prefixed routes (e.g.
    // `/ja/docs/overview/`), while `outDir` is the locale's build
    // directory (e.g. `build/ja`). Joining outDir + the full route
    // would double-prefix the locale and miss every HTML file. Strip
    // baseUrl from the route to recover the locale-relative path that
    // outDir expects. For the default locale `baseUrl` is `/` so the
    // slice is a no-op.
    const baseUrlString: Lib_Search_Indexer_BuildSearchIndex_BaseUrlString = options['baseUrl'];
    const baseUrlPrefixedRoute: Lib_Search_Indexer_BuildSearchIndex_BaseUrlPrefixedRoute = typedRoutePath.startsWith(baseUrlString) && baseUrlString.length > 1;
    const localeRelativeRoutePath: Lib_Search_Indexer_BuildSearchIndex_LocaleRelativeRoutePath = (baseUrlPrefixedRoute === true) ? `/${typedRoutePath.slice(baseUrlString.length)}` : typedRoutePath;
    const htmlFilePath: Lib_Search_Indexer_BuildSearchIndex_HtmlFilePath = join(options['outDir'], localeRelativeRoutePath, 'index.html');
    const document: Lib_Search_Indexer_BuildSearchIndex_Document = extractDocument(htmlFilePath, typedRoutePath);

    if (document === undefined) {
      continue;
    }

    documents.push(document);
  }

  const lunrModule: Lib_Search_Indexer_BuildSearchIndex_LunrModule = require('lunr');
  const lunrFunction: Lib_Search_Indexer_BuildSearchIndex_LunrFunction = lunrModule as Lib_Search_Indexer_BuildSearchIndex_LunrFunction;

  const nonEnglishLanguages: Lib_Search_Indexer_BuildSearchIndex_NonEnglishLanguages = [];

  for (const languageCode of language) {
    const typedLanguageCode: Lib_Search_Indexer_BuildSearchIndex_TypedLanguageCode = languageCode;

    if (typedLanguageCode !== 'en') {
      nonEnglishLanguages.push(typedLanguageCode);
    }
  }

  if (nonEnglishLanguages.length > 0) {
    const lunrStemmerSupportLoader: Lib_Search_Indexer_BuildSearchIndex_LunrStemmerSupportLoader = require('lunr-languages/lunr.stemmer.support');

    lunrStemmerSupportLoader(lunrFunction);

    for (const languageCode of nonEnglishLanguages) {
      const nonEnglishLanguageCode: Lib_Search_Indexer_BuildSearchIndex_NonEnglishLanguageCode = languageCode;

      if (nonEnglishLanguageCode === 'zh') {
        try {
          require('@node-rs/jieba');
        } catch {
          throw new Error('Chinese ("zh") search requires "@node-rs/jieba". Install it with "npm install @node-rs/jieba" to enable Chinese segmentation.');
        }
      }

      // Japanese (`lunr.ja.js`) and the older `lunr.jp.js` both call
      // `new lunr.TinySegmenter()` at load time. TinySegmenter ships
      // with lunr-languages as a separate `tinyseg.js` module that
      // attaches the constructor to `lunr`; without pre-loading it
      // the Japanese language loader crashes with
      // "TypeError: lunr.TinySegmenter is not a constructor".
      if (nonEnglishLanguageCode === 'ja' || nonEnglishLanguageCode === 'jp') {
        const lunrTinySegLoader: Lib_Search_Indexer_BuildSearchIndex_LunrTinySegLoader = require('lunr-languages/tinyseg');

        lunrTinySegLoader(lunrFunction);
      }

      const lunrLanguageLoader: Lib_Search_Indexer_BuildSearchIndex_LunrLanguageLoader = require(`lunr-languages/lunr.${nonEnglishLanguageCode}`);

      lunrLanguageLoader(lunrFunction);
    }

    if (nonEnglishLanguages.length >= 2) {
      const lunrMultiLoader: Lib_Search_Indexer_BuildSearchIndex_LunrMultiLoader = require('lunr-languages/lunr.multi');

      lunrMultiLoader(lunrFunction);
    }
  }

  const indexBuilder: Lib_Search_Indexer_BuildSearchIndex_IndexBuilder = function indexBuilder() {
    const builder: Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_Builder = this;
    const typedBuilder: Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_TypedBuilder = builder as Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_TypedBuilder;

    if (
      nonEnglishLanguages.length > 0
      && language.length >= 2
    ) {
      // `lunr-languages/lunr.multi` exposes the multi-language factory
      // as `lunr.multiLanguage(...codes)` -- it returns a configured
      // plugin function that `Builder.use` then runs. The previous
      // implementation read `typedBuilder['multiLanguage']` which is
      // undefined (multiLanguage lives on `lunr`, not the builder),
      // so the call crashed with "Cannot read properties of undefined
      // (reading 'apply')". Call the factory on `lunrFunction` and
      // pass the returned plugin to `use`. The `!` is safe because
      // `lunrMultiLoader(lunrFunction)` ran above when
      // `nonEnglishLanguages.length >= 2`, which is exactly the
      // condition that gates this branch.
      const lunrMultiLanguageFactory: Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_LunrMultiLanguageFactory = (lunrFunction as Lib_Search_Indexer_BuildSearchIndex_LunrModule as Lib_Search_Indexer_BuildSearchIndex_LunrMultiLanguageRegistry)['multiLanguage']!;

      typedBuilder.use(lunrMultiLanguageFactory(...language));
    } else if (
      nonEnglishLanguages.length === 1
      && language.length === 1
    ) {
      const nonEnglishLanguageKey: Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_NonEnglishLanguageKey = nonEnglishLanguages[0] as Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_NonEnglishLanguageKey;

      // Same fix as the multi-language branch above: per-language
      // plugins live on `lunr` (`lunr.de`, `lunr.fr`, ...) after the
      // language loader runs -- not on the Builder instance.
      const lunrLanguagePlugin: Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_LunrLanguagePlugin = (lunrFunction as Lib_Search_Indexer_BuildSearchIndex_LunrModule as Lib_Search_Indexer_BuildSearchIndex_LunrLanguageRegistry)[nonEnglishLanguageKey];

      typedBuilder.use(lunrLanguagePlugin);
    }

    typedBuilder.ref('path');

    typedBuilder.field('title', { boost: 10 });
    typedBuilder.field('headings', { boost: 5 });
    typedBuilder.field('body');

    for (const documentEntry of documents) {
      const typedDocumentEntry: Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_TypedDocumentEntry = documentEntry;
      const headingsTextParts: Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_HeadingsTextParts = [];

      for (const headingEntry of typedDocumentEntry['headings']) {
        const typedHeadingEntry: Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_TypedHeadingEntry = headingEntry;

        headingsTextParts.push(typedHeadingEntry['text']);
      }

      const headingsText: Lib_Search_Indexer_BuildSearchIndex_IndexBuilder_HeadingsText = headingsTextParts.join(' ');

      typedBuilder.add({
        path: typedDocumentEntry['path'],
        title: typedDocumentEntry['title'],
        headings: headingsText,
        body: typedDocumentEntry['body'],
      });
    }

    return;
  };

  const lunrIndex: Lib_Search_Indexer_BuildSearchIndex_LunrIndex = lunrFunction(indexBuilder);
  const typedLunrIndex: Lib_Search_Indexer_BuildSearchIndex_TypedLunrIndex = lunrIndex as Lib_Search_Indexer_BuildSearchIndex_TypedLunrIndex;
  const serializedIndex: Lib_Search_Indexer_BuildSearchIndex_SerializedIndex = typedLunrIndex.toJSON();
  const documentMetadata: Lib_Search_Indexer_BuildSearchIndex_DocumentMetadata = documents;
  const payload: Lib_Search_Indexer_BuildSearchIndex_Payload = {
    index: serializedIndex,
    documents: documentMetadata,
  };
  const jsonContent: Lib_Search_Indexer_BuildSearchIndex_JsonContent = JSON.stringify(payload);

  let fileName: Lib_Search_Indexer_BuildSearchIndex_FileName = 'search-index.json';

  if (hashed === true) {
    const hash: Lib_Search_Indexer_BuildSearchIndex_Hash = createHash('md5').update(jsonContent).digest('hex');

    fileName = `search-index-${hash}.json`;
  }

  const indexFilePath: Lib_Search_Indexer_BuildSearchIndex_IndexFilePath = join(options['outDir'], fileName);

  writeFileSync(indexFilePath, jsonContent, 'utf-8');

  const manifest: Lib_Search_Indexer_BuildSearchIndex_Manifest = {
    indexUrl: fileName,
  };
  const manifestJson: Lib_Search_Indexer_BuildSearchIndex_ManifestJson = JSON.stringify(manifest);
  const manifestFilePath: Lib_Search_Indexer_BuildSearchIndex_ManifestFilePath = join(options['outDir'], 'search-manifest.json');

  writeFileSync(manifestFilePath, manifestJson, 'utf-8');

  const lunrSourcePath: Lib_Search_Indexer_BuildSearchIndex_LunrSourcePath = join(dirname(require.resolve('lunr')), 'lunr.min.js');
  const lunrDestinationPath: Lib_Search_Indexer_BuildSearchIndex_LunrDestinationPath = join(options['outDir'], 'lunr.min.js');

  if (existsSync(lunrSourcePath) === true) {
    copyFileSync(lunrSourcePath, lunrDestinationPath);
  }

  const workerSourcePath: Lib_Search_Indexer_BuildSearchIndex_WorkerSourcePath = resolve(__dirname, 'worker.js');
  const workerDestinationPath: Lib_Search_Indexer_BuildSearchIndex_WorkerDestinationPath = join(options['outDir'], 'search-worker.js');

  if (existsSync(workerSourcePath) === true) {
    copyFileSync(workerSourcePath, workerDestinationPath);
  }

  return;
}
