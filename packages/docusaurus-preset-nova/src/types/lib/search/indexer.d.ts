export type Lib_Search_Indexer_Heading_Id = string;

export type Lib_Search_Indexer_Heading_Text = string;

export type Lib_Search_Indexer_Heading_Level = number;

export type Lib_Search_Indexer_Heading = {
  id: Lib_Search_Indexer_Heading_Id;
  text: Lib_Search_Indexer_Heading_Text;
  level: Lib_Search_Indexer_Heading_Level;
};

export type Lib_Search_Indexer_Document_Path = string;

export type Lib_Search_Indexer_Document_Title = string;

export type Lib_Search_Indexer_Document_Headings = Lib_Search_Indexer_Heading[];

export type Lib_Search_Indexer_Document_Body = string;

export type Lib_Search_Indexer_Document_Snippet = string;

export type Lib_Search_Indexer_Document = {
  path: Lib_Search_Indexer_Document_Path;
  title: Lib_Search_Indexer_Document_Title;
  headings: Lib_Search_Indexer_Document_Headings;
  body: Lib_Search_Indexer_Document_Body;
  snippet: Lib_Search_Indexer_Document_Snippet;
};

export type Lib_Search_Indexer_Manifest_IndexUrl = string;

export type Lib_Search_Indexer_Manifest = {
  indexUrl: Lib_Search_Indexer_Manifest_IndexUrl;
};

export type Lib_Search_Indexer_Options_OutDir = string;

export type Lib_Search_Indexer_Options_RoutesPaths = string[];

export type Lib_Search_Indexer_Options_BaseUrl = string;

export type Lib_Search_Indexer_Options_SearchConfig = Record<string, unknown>;

export type Lib_Search_Indexer_Options = {
  outDir: Lib_Search_Indexer_Options_OutDir;
  routesPaths: Lib_Search_Indexer_Options_RoutesPaths;
  baseUrl: Lib_Search_Indexer_Options_BaseUrl;
  searchConfig: Lib_Search_Indexer_Options_SearchConfig;
};

/**
 * Lib - Search - Indexer - Build Search Index.
 *
 * @since 0.15.0
 */
export type Lib_Search_Indexer_BuildSearchIndex_Options = Lib_Search_Indexer_Options;

export type Lib_Search_Indexer_BuildSearchIndex_Returns = void;

export type Lib_Search_Indexer_BuildSearchIndex_Documents = Lib_Search_Indexer_Document[];

export type Lib_Search_Indexer_BuildSearchIndex_DefaultLanguage = string[];

export type Lib_Search_Indexer_BuildSearchIndex_Language = string[];

export type Lib_Search_Indexer_BuildSearchIndex_DefaultIndexDocs = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_IndexDocs = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_DefaultIndexBlog = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_IndexBlog = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_DefaultIndexPages = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_IndexPages = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_DefaultHashed = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_Hashed = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_DefaultIgnorePatterns = string[];

export type Lib_Search_Indexer_BuildSearchIndex_IgnorePatterns = string[];

export type Lib_Search_Indexer_BuildSearchIndex_DefaultDocsRouteBasePath = string;

export type Lib_Search_Indexer_BuildSearchIndex_DocsRouteBasePath = string;

export type Lib_Search_Indexer_BuildSearchIndex_RoutePath = string;

export type Lib_Search_Indexer_BuildSearchIndex_IsIgnored = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_IsBlogRoute = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_IsDocsRoute = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_IsPageRoute = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_IsNonContentRoute = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_BaseUrl = string;

export type Lib_Search_Indexer_BuildSearchIndex_IsBaseUrlPrefixedRoute = boolean;

export type Lib_Search_Indexer_BuildSearchIndex_LocaleRelativeRoutePath = string;

export type Lib_Search_Indexer_BuildSearchIndex_Document = Lib_Search_Indexer_Document | undefined;

export type Lib_Search_Indexer_BuildSearchIndex_LunrModule = unknown;

export type Lib_Search_Indexer_BuildSearchIndex_LunrFunction = Function;

export type Lib_Search_Indexer_BuildSearchIndex_NonEnglishLanguages = string[];

export type Lib_Search_Indexer_BuildSearchIndex_LanguageCode = string;

export type Lib_Search_Indexer_BuildSearchIndex_LunrStemmerSupportLoader = Function;

export type Lib_Search_Indexer_BuildSearchIndex_LunrLanguageLoader = Function;

export type Lib_Search_Indexer_BuildSearchIndex_LunrTinySegLoader = Function;

export type Lib_Search_Indexer_BuildSearchIndex_LunrMultiLoader = Function;

export type Lib_Search_Indexer_BuildSearchIndex_LunrBuilder = unknown;

export type Lib_Search_Indexer_BuildSearchIndex_LunrIndex = unknown;

export type Lib_Search_Indexer_BuildSearchIndex_TypedBuilder_Use = Function;

export type Lib_Search_Indexer_BuildSearchIndex_TypedBuilder_Ref = Function;

export type Lib_Search_Indexer_BuildSearchIndex_TypedBuilder_Field = Function;

export type Lib_Search_Indexer_BuildSearchIndex_TypedBuilder_Add = Function;

export type Lib_Search_Indexer_BuildSearchIndex_TypedBuilder_MultiLanguage = Function;

export type Lib_Search_Indexer_BuildSearchIndex_TypedBuilder = {
  use: Lib_Search_Indexer_BuildSearchIndex_TypedBuilder_Use;
  ref: Lib_Search_Indexer_BuildSearchIndex_TypedBuilder_Ref;
  field: Lib_Search_Indexer_BuildSearchIndex_TypedBuilder_Field;
  add: Lib_Search_Indexer_BuildSearchIndex_TypedBuilder_Add;
  multiLanguage: Lib_Search_Indexer_BuildSearchIndex_TypedBuilder_MultiLanguage;
  [key: string]: Function | undefined;
};

export type Lib_Search_Indexer_BuildSearchIndex_NonEnglishLanguageKey = string;

export type Lib_Search_Indexer_BuildSearchIndex_DocumentEntry = Lib_Search_Indexer_Document;

export type Lib_Search_Indexer_BuildSearchIndex_HeadingsTextParts = string[];

export type Lib_Search_Indexer_BuildSearchIndex_HeadingEntry = Lib_Search_Indexer_Heading;

export type Lib_Search_Indexer_BuildSearchIndex_HeadingsText = string;

export type Lib_Search_Indexer_BuildSearchIndex_TypedLunrIndex_ToJSON = Function;

export type Lib_Search_Indexer_BuildSearchIndex_TypedLunrIndex = {
  toJSON: Lib_Search_Indexer_BuildSearchIndex_TypedLunrIndex_ToJSON;
  [key: string]: Function | undefined;
};

export type Lib_Search_Indexer_BuildSearchIndex_SerializedIndex = unknown;

export type Lib_Search_Indexer_BuildSearchIndex_DocumentMetadata = Lib_Search_Indexer_Document[];

export type Lib_Search_Indexer_BuildSearchIndex_Payload_Index = Lib_Search_Indexer_BuildSearchIndex_SerializedIndex;

export type Lib_Search_Indexer_BuildSearchIndex_Payload_Documents = Lib_Search_Indexer_BuildSearchIndex_DocumentMetadata;

export type Lib_Search_Indexer_BuildSearchIndex_Payload = {
  index: Lib_Search_Indexer_BuildSearchIndex_Payload_Index;
  documents: Lib_Search_Indexer_BuildSearchIndex_Payload_Documents;
};

export type Lib_Search_Indexer_BuildSearchIndex_JsonContent = string;

export type Lib_Search_Indexer_BuildSearchIndex_FileName = string;

export type Lib_Search_Indexer_BuildSearchIndex_Hash = string;

export type Lib_Search_Indexer_BuildSearchIndex_IndexFilePath = string;

export type Lib_Search_Indexer_BuildSearchIndex_Manifest = Lib_Search_Indexer_Manifest;

export type Lib_Search_Indexer_BuildSearchIndex_ManifestJson = string;

export type Lib_Search_Indexer_BuildSearchIndex_ManifestFilePath = string;

export type Lib_Search_Indexer_BuildSearchIndex_LunrSourcePath = string;

export type Lib_Search_Indexer_BuildSearchIndex_LunrDestinationPath = string;

export type Lib_Search_Indexer_BuildSearchIndex_WorkerSourcePath = string;

export type Lib_Search_Indexer_BuildSearchIndex_WorkerDestinationPath = string;

/**
 * Lib - Search - Indexer - Extract Document.
 *
 * @since 0.15.0
 */
export type Lib_Search_Indexer_ExtractDocument_HtmlFilePath = string;

export type Lib_Search_Indexer_ExtractDocument_RoutePath = string;

export type Lib_Search_Indexer_ExtractDocument_Returns = Lib_Search_Indexer_Document | undefined;

export type Lib_Search_Indexer_ExtractDocument_FileExists = boolean;

export type Lib_Search_Indexer_ExtractDocument_HtmlContent = string;

export type Lib_Search_Indexer_ExtractDocument_ParsedHtml = unknown;

export type Lib_Search_Indexer_ExtractDocument_CheerioApi = Function;

export type Lib_Search_Indexer_ExtractDocument_TitleFromTag = string;

export type Lib_Search_Indexer_ExtractDocument_TitleFromHeading = string;

export type Lib_Search_Indexer_ExtractDocument_Title = string;

export type Lib_Search_Indexer_ExtractDocument_DescriptionAttribute = string | undefined;

export type Lib_Search_Indexer_ExtractDocument_Description = string;

export type Lib_Search_Indexer_ExtractDocument_Headings = Lib_Search_Indexer_Heading[];

export type Lib_Search_Indexer_ExtractDocument_HeadingElement = unknown;

export type Lib_Search_Indexer_ExtractDocument_HeadingId = string;

export type Lib_Search_Indexer_ExtractDocument_HeadingText = string;

export type Lib_Search_Indexer_ExtractDocument_HeadingTagName = string;

export type Lib_Search_Indexer_ExtractDocument_HeadingLevel = number;

export type Lib_Search_Indexer_ExtractDocument_ContentSelectors = string;

export type Lib_Search_Indexer_ExtractDocument_ContentText = string;

export type Lib_Search_Indexer_ExtractDocument_ArticleText = string;

export type Lib_Search_Indexer_ExtractDocument_MainText = string;

export type Lib_Search_Indexer_ExtractDocument_FallbackText = string;

export type Lib_Search_Indexer_ExtractDocument_Body = string;

/**
 * Lib - Search - Indexer - Matches Ignore Pattern.
 *
 * @since 0.15.0
 */
export type Lib_Search_Indexer_MatchesIgnorePattern_RoutePath = string;

export type Lib_Search_Indexer_MatchesIgnorePattern_Patterns = string[];

export type Lib_Search_Indexer_MatchesIgnorePattern_Returns = boolean;

export type Lib_Search_Indexer_MatchesIgnorePattern_Pattern = string;

export type Lib_Search_Indexer_MatchesIgnorePattern_CleanPattern = string;

export type Lib_Search_Indexer_MatchesIgnorePattern_IsMatch = boolean;
