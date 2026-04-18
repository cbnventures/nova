export type LibSearchIndexerHeadingId = string;

export type LibSearchIndexerHeadingText = string;

export type LibSearchIndexerHeadingLevel = number;

export type LibSearchIndexerHeading = {
  id: LibSearchIndexerHeadingId;
  text: LibSearchIndexerHeadingText;
  level: LibSearchIndexerHeadingLevel;
};

export type LibSearchIndexerDocumentPath = string;

export type LibSearchIndexerDocumentTitle = string;

export type LibSearchIndexerDocumentHeadings = LibSearchIndexerHeading[];

export type LibSearchIndexerDocumentBody = string;

export type LibSearchIndexerDocumentSnippet = string;

export type LibSearchIndexerDocument = {
  path: LibSearchIndexerDocumentPath;
  title: LibSearchIndexerDocumentTitle;
  headings: LibSearchIndexerDocumentHeadings;
  body: LibSearchIndexerDocumentBody;
  snippet: LibSearchIndexerDocumentSnippet;
};

export type LibSearchIndexerManifestIndexUrl = string;

export type LibSearchIndexerManifest = {
  indexUrl: LibSearchIndexerManifestIndexUrl;
};

export type LibSearchIndexerOptionsOutDir = string;

export type LibSearchIndexerOptionsRoutesPaths = string[];

export type LibSearchIndexerOptionsBaseUrl = string;

export type LibSearchIndexerOptionsSearchConfig = Record<string, unknown>;

export type LibSearchIndexerOptions = {
  outDir: LibSearchIndexerOptionsOutDir;
  routesPaths: LibSearchIndexerOptionsRoutesPaths;
  baseUrl: LibSearchIndexerOptionsBaseUrl;
  searchConfig: LibSearchIndexerOptionsSearchConfig;
};

/**
 * Lib - Search - Indexer - Build Search Index.
 *
 * @since 0.15.0
 */
export type LibSearchIndexerBuildSearchIndexOptions = LibSearchIndexerOptions;

export type LibSearchIndexerBuildSearchIndexReturns = void;

export type LibSearchIndexerBuildSearchIndexDocuments = LibSearchIndexerDocument[];

export type LibSearchIndexerBuildSearchIndexDefaultLanguage = string[];

export type LibSearchIndexerBuildSearchIndexLanguage = string[];

export type LibSearchIndexerBuildSearchIndexDefaultIndexDocs = boolean;

export type LibSearchIndexerBuildSearchIndexIndexDocs = boolean;

export type LibSearchIndexerBuildSearchIndexDefaultIndexBlog = boolean;

export type LibSearchIndexerBuildSearchIndexIndexBlog = boolean;

export type LibSearchIndexerBuildSearchIndexDefaultIndexPages = boolean;

export type LibSearchIndexerBuildSearchIndexIndexPages = boolean;

export type LibSearchIndexerBuildSearchIndexDefaultHashed = boolean;

export type LibSearchIndexerBuildSearchIndexHashed = boolean;

export type LibSearchIndexerBuildSearchIndexDefaultIgnorePatterns = string[];

export type LibSearchIndexerBuildSearchIndexIgnorePatterns = string[];

export type LibSearchIndexerBuildSearchIndexDefaultDocsRouteBasePath = string;

export type LibSearchIndexerBuildSearchIndexDocsRouteBasePath = string;

export type LibSearchIndexerBuildSearchIndexRoutePath = string;

export type LibSearchIndexerBuildSearchIndexIsIgnored = boolean;

export type LibSearchIndexerBuildSearchIndexIsBlogRoute = boolean;

export type LibSearchIndexerBuildSearchIndexIsDocsRoute = boolean;

export type LibSearchIndexerBuildSearchIndexIsPageRoute = boolean;

export type LibSearchIndexerBuildSearchIndexIsNonContentRoute = boolean;

export type LibSearchIndexerBuildSearchIndexDocument = LibSearchIndexerDocument | undefined;

export type LibSearchIndexerBuildSearchIndexLunrModule = unknown;

export type LibSearchIndexerBuildSearchIndexLunrFunction = Function;

export type LibSearchIndexerBuildSearchIndexNonEnglishLanguages = string[];

export type LibSearchIndexerBuildSearchIndexLanguageCode = string;

export type LibSearchIndexerBuildSearchIndexLunrStemmerSupportLoader = Function;

export type LibSearchIndexerBuildSearchIndexLunrLanguageLoader = Function;

export type LibSearchIndexerBuildSearchIndexLunrMultiLoader = Function;

export type LibSearchIndexerBuildSearchIndexLunrBuilder = unknown;

export type LibSearchIndexerBuildSearchIndexLunrIndex = unknown;

export type LibSearchIndexerBuildSearchIndexTypedBuilderUse = Function;

export type LibSearchIndexerBuildSearchIndexTypedBuilderRef = Function;

export type LibSearchIndexerBuildSearchIndexTypedBuilderField = Function;

export type LibSearchIndexerBuildSearchIndexTypedBuilderAdd = Function;

export type LibSearchIndexerBuildSearchIndexTypedBuilderMultiLanguage = Function;

export type LibSearchIndexerBuildSearchIndexTypedBuilder = {
  use: LibSearchIndexerBuildSearchIndexTypedBuilderUse;
  ref: LibSearchIndexerBuildSearchIndexTypedBuilderRef;
  field: LibSearchIndexerBuildSearchIndexTypedBuilderField;
  add: LibSearchIndexerBuildSearchIndexTypedBuilderAdd;
  multiLanguage: LibSearchIndexerBuildSearchIndexTypedBuilderMultiLanguage;
  [key: string]: Function | undefined;
};

export type LibSearchIndexerBuildSearchIndexNonEnglishLanguageKey = string;

export type LibSearchIndexerBuildSearchIndexDocumentEntry = LibSearchIndexerDocument;

export type LibSearchIndexerBuildSearchIndexHeadingsTextParts = string[];

export type LibSearchIndexerBuildSearchIndexHeadingEntry = LibSearchIndexerHeading;

export type LibSearchIndexerBuildSearchIndexHeadingsText = string;

export type LibSearchIndexerBuildSearchIndexTypedLunrIndexToJson = Function;

export type LibSearchIndexerBuildSearchIndexTypedLunrIndex = {
  toJSON: LibSearchIndexerBuildSearchIndexTypedLunrIndexToJson;
  [key: string]: Function | undefined;
};

export type LibSearchIndexerBuildSearchIndexSerializedIndex = unknown;

export type LibSearchIndexerBuildSearchIndexDocumentMetadata = LibSearchIndexerDocument[];

export type LibSearchIndexerBuildSearchIndexPayloadIndex = LibSearchIndexerBuildSearchIndexSerializedIndex;

export type LibSearchIndexerBuildSearchIndexPayloadDocuments = LibSearchIndexerBuildSearchIndexDocumentMetadata;

export type LibSearchIndexerBuildSearchIndexPayload = {
  index: LibSearchIndexerBuildSearchIndexPayloadIndex;
  documents: LibSearchIndexerBuildSearchIndexPayloadDocuments;
};

export type LibSearchIndexerBuildSearchIndexJsonContent = string;

export type LibSearchIndexerBuildSearchIndexFileName = string;

export type LibSearchIndexerBuildSearchIndexHash = string;

export type LibSearchIndexerBuildSearchIndexIndexFilePath = string;

export type LibSearchIndexerBuildSearchIndexManifest = LibSearchIndexerManifest;

export type LibSearchIndexerBuildSearchIndexManifestJson = string;

export type LibSearchIndexerBuildSearchIndexManifestFilePath = string;

export type LibSearchIndexerBuildSearchIndexLunrSourcePath = string;

export type LibSearchIndexerBuildSearchIndexLunrDestinationPath = string;

export type LibSearchIndexerBuildSearchIndexWorkerSourcePath = string;

export type LibSearchIndexerBuildSearchIndexWorkerDestinationPath = string;

/**
 * Lib - Search - Indexer - Extract Document.
 *
 * @since 0.15.0
 */
export type LibSearchIndexerExtractDocumentHtmlFilePath = string;

export type LibSearchIndexerExtractDocumentRoutePath = string;

export type LibSearchIndexerExtractDocumentReturns = LibSearchIndexerDocument | undefined;

export type LibSearchIndexerExtractDocumentFileExists = boolean;

export type LibSearchIndexerExtractDocumentHtmlContent = string;

export type LibSearchIndexerExtractDocumentParsedHtml = unknown;

export type LibSearchIndexerExtractDocumentCheerioApi = Function;

export type LibSearchIndexerExtractDocumentTitleFromTag = string;

export type LibSearchIndexerExtractDocumentTitleFromHeading = string;

export type LibSearchIndexerExtractDocumentTitle = string;

export type LibSearchIndexerExtractDocumentDescriptionAttribute = string | undefined;

export type LibSearchIndexerExtractDocumentDescription = string;

export type LibSearchIndexerExtractDocumentHeadings = LibSearchIndexerHeading[];

export type LibSearchIndexerExtractDocumentHeadingElement = unknown;

export type LibSearchIndexerExtractDocumentHeadingId = string;

export type LibSearchIndexerExtractDocumentHeadingText = string;

export type LibSearchIndexerExtractDocumentHeadingTagName = string;

export type LibSearchIndexerExtractDocumentHeadingLevel = number;

export type LibSearchIndexerExtractDocumentContentSelectors = string;

export type LibSearchIndexerExtractDocumentContentText = string;

export type LibSearchIndexerExtractDocumentArticleText = string;

export type LibSearchIndexerExtractDocumentMainText = string;

export type LibSearchIndexerExtractDocumentFallbackText = string;

export type LibSearchIndexerExtractDocumentBody = string;

/**
 * Lib - Search - Indexer - Matches Ignore Pattern.
 *
 * @since 0.15.0
 */
export type LibSearchIndexerMatchesIgnorePatternRoutePath = string;

export type LibSearchIndexerMatchesIgnorePatternPatterns = string[];

export type LibSearchIndexerMatchesIgnorePatternReturns = boolean;

export type LibSearchIndexerMatchesIgnorePatternPattern = string;

export type LibSearchIndexerMatchesIgnorePatternCleanPattern = string;

export type LibSearchIndexerMatchesIgnorePatternIsMatch = boolean;
