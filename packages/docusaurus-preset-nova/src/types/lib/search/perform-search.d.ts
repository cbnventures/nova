/**
 * Lib - Search - Perform Search - Perform Search.
 *
 * @since 0.15.0
 */
export type Lib_Search_PerformSearch_PerformSearch_Index = unknown;

export type Lib_Search_PerformSearch_PerformSearch_Documents_Item_Path = string;

export type Lib_Search_PerformSearch_PerformSearch_Documents_Item_Title = string;

export type Lib_Search_PerformSearch_PerformSearch_Documents_Item_Snippet = string;

export type Lib_Search_PerformSearch_PerformSearch_Documents_Item_Body = string;

export type Lib_Search_PerformSearch_PerformSearch_Documents_Item = {
  path: Lib_Search_PerformSearch_PerformSearch_Documents_Item_Path;
  title: Lib_Search_PerformSearch_PerformSearch_Documents_Item_Title;
  snippet: Lib_Search_PerformSearch_PerformSearch_Documents_Item_Snippet;
  body: Lib_Search_PerformSearch_PerformSearch_Documents_Item_Body;
};

export type Lib_Search_PerformSearch_PerformSearch_Documents = Lib_Search_PerformSearch_PerformSearch_Documents_Item[];

export type Lib_Search_PerformSearch_PerformSearch_Query = string;

export type Lib_Search_PerformSearch_PerformSearch_Limit = number;

export type Lib_Search_PerformSearch_PerformSearch_Returns_Item_Path = string;

export type Lib_Search_PerformSearch_PerformSearch_Returns_Item_Title = string;

export type Lib_Search_PerformSearch_PerformSearch_Returns_Item_Snippet = string;

export type Lib_Search_PerformSearch_PerformSearch_Returns_Item_SnippetSegments_Item_Text = string;

export type Lib_Search_PerformSearch_PerformSearch_Returns_Item_SnippetSegments_Item_Highlight = boolean;

export type Lib_Search_PerformSearch_PerformSearch_Returns_Item_SnippetSegments_Item = {
  text: Lib_Search_PerformSearch_PerformSearch_Returns_Item_SnippetSegments_Item_Text;
  highlight: Lib_Search_PerformSearch_PerformSearch_Returns_Item_SnippetSegments_Item_Highlight;
};

export type Lib_Search_PerformSearch_PerformSearch_Returns_Item_SnippetSegments = Lib_Search_PerformSearch_PerformSearch_Returns_Item_SnippetSegments_Item[];

export type Lib_Search_PerformSearch_PerformSearch_Returns_Item_Score = number;

export type Lib_Search_PerformSearch_PerformSearch_Returns_Item = {
  path: Lib_Search_PerformSearch_PerformSearch_Returns_Item_Path;
  title: Lib_Search_PerformSearch_PerformSearch_Returns_Item_Title;
  snippet: Lib_Search_PerformSearch_PerformSearch_Returns_Item_Snippet;
  snippetSegments: Lib_Search_PerformSearch_PerformSearch_Returns_Item_SnippetSegments;
  score: Lib_Search_PerformSearch_PerformSearch_Returns_Item_Score;
};

export type Lib_Search_PerformSearch_PerformSearch_Returns = Lib_Search_PerformSearch_PerformSearch_Returns_Item[];

export type Lib_Search_PerformSearch_PerformSearch_TrimmedQuery = string;

export type Lib_Search_PerformSearch_PerformSearch_LunrResult_Item_Ref = string;

export type Lib_Search_PerformSearch_PerformSearch_LunrResult_Item_Score = number;

export type Lib_Search_PerformSearch_PerformSearch_LunrResult_Item_MatchData_Metadata = Record<string, unknown>;

export type Lib_Search_PerformSearch_PerformSearch_LunrResult_Item_MatchData = {
  metadata: Lib_Search_PerformSearch_PerformSearch_LunrResult_Item_MatchData_Metadata;
};

export type Lib_Search_PerformSearch_PerformSearch_LunrResult_Item = {
  ref: Lib_Search_PerformSearch_PerformSearch_LunrResult_Item_Ref;
  score: Lib_Search_PerformSearch_PerformSearch_LunrResult_Item_Score;
  matchData: Lib_Search_PerformSearch_PerformSearch_LunrResult_Item_MatchData;
};

export type Lib_Search_PerformSearch_PerformSearch_TypedIndex_Search = (query: string) => Lib_Search_PerformSearch_PerformSearch_LunrResult_Item[];

export type Lib_Search_PerformSearch_PerformSearch_TypedIndex = {
  search: Lib_Search_PerformSearch_PerformSearch_TypedIndex_Search;
};

export type Lib_Search_PerformSearch_PerformSearch_ExactResults = Lib_Search_PerformSearch_PerformSearch_LunrResult_Item[];

export type Lib_Search_PerformSearch_PerformSearch_WildcardQuery = string;

export type Lib_Search_PerformSearch_PerformSearch_WildcardResults = Lib_Search_PerformSearch_PerformSearch_LunrResult_Item[];

export type Lib_Search_PerformSearch_PerformSearch_FuzzyQuery = string;

export type Lib_Search_PerformSearch_PerformSearch_FuzzyResults = Lib_Search_PerformSearch_PerformSearch_LunrResult_Item[];

export type Lib_Search_PerformSearch_PerformSearch_AllResults = Lib_Search_PerformSearch_PerformSearch_LunrResult_Item[];

export type Lib_Search_PerformSearch_PerformSearch_ScoreMap = Map<string, number>;

export type Lib_Search_PerformSearch_PerformSearch_TermsMap = Map<string, Set<string>>;

export type Lib_Search_PerformSearch_PerformSearch_Result = Lib_Search_PerformSearch_PerformSearch_LunrResult_Item | undefined;

export type Lib_Search_PerformSearch_PerformSearch_ExistingScore = number | undefined;

export type Lib_Search_PerformSearch_PerformSearch_TermsSet = Set<string> | undefined;

export type Lib_Search_PerformSearch_PerformSearch_Term = string;

export type Lib_Search_PerformSearch_PerformSearch_SortedRefs = string[];

export type Lib_Search_PerformSearch_PerformSearch_A = [string, number] | undefined;

export type Lib_Search_PerformSearch_PerformSearch_B = [string, number] | undefined;

export type Lib_Search_PerformSearch_PerformSearch_MappedEntry = [string, number] | undefined;

export type Lib_Search_PerformSearch_PerformSearch_SlicedRefs = string[];

export type Lib_Search_PerformSearch_PerformSearch_Hits_Item_Path = string;

export type Lib_Search_PerformSearch_PerformSearch_Hits_Item_Title = string;

export type Lib_Search_PerformSearch_PerformSearch_Hits_Item_Snippet = string;

export type Lib_Search_PerformSearch_PerformSearch_Hits_Item_SnippetSegments_Item_Text = string;

export type Lib_Search_PerformSearch_PerformSearch_Hits_Item_SnippetSegments_Item_Highlight = boolean;

export type Lib_Search_PerformSearch_PerformSearch_Hits_Item_SnippetSegments_Item = {
  text: Lib_Search_PerformSearch_PerformSearch_Hits_Item_SnippetSegments_Item_Text;
  highlight: Lib_Search_PerformSearch_PerformSearch_Hits_Item_SnippetSegments_Item_Highlight;
};

export type Lib_Search_PerformSearch_PerformSearch_Hits_Item_SnippetSegments = Lib_Search_PerformSearch_PerformSearch_Hits_Item_SnippetSegments_Item[];

export type Lib_Search_PerformSearch_PerformSearch_Hits_Item_Score = number;

export type Lib_Search_PerformSearch_PerformSearch_Hits_Item = {
  path: Lib_Search_PerformSearch_PerformSearch_Hits_Item_Path;
  title: Lib_Search_PerformSearch_PerformSearch_Hits_Item_Title;
  snippet: Lib_Search_PerformSearch_PerformSearch_Hits_Item_Snippet;
  snippetSegments: Lib_Search_PerformSearch_PerformSearch_Hits_Item_SnippetSegments;
  score: Lib_Search_PerformSearch_PerformSearch_Hits_Item_Score;
};

export type Lib_Search_PerformSearch_PerformSearch_Hits = Lib_Search_PerformSearch_PerformSearch_Hits_Item[];

export type Lib_Search_PerformSearch_PerformSearch_Ref = string | undefined;

export type Lib_Search_PerformSearch_PerformSearch_MatchedDocument = Lib_Search_PerformSearch_PerformSearch_Documents_Item | undefined;

export type Lib_Search_PerformSearch_PerformSearch_Score = number | undefined;

export type Lib_Search_PerformSearch_PerformSearch_TermPatterns = string[];

export type Lib_Search_PerformSearch_PerformSearch_RefTerms = Set<string> | undefined;

export type Lib_Search_PerformSearch_PerformSearch_RefTerm = string;

export type Lib_Search_PerformSearch_PerformSearch_EscapedTerm = string;

export type Lib_Search_PerformSearch_PerformSearch_EscapedQuery = string;

export type Lib_Search_PerformSearch_PerformSearch_HighlightPattern = string;

export type Lib_Search_PerformSearch_PerformSearch_SegmentPattern = RegExp;

export type Lib_Search_PerformSearch_PerformSearch_ContextRadius = number;

export type Lib_Search_PerformSearch_PerformSearch_ContextPattern = RegExp;

export type Lib_Search_PerformSearch_PerformSearch_ContextMatch = RegExpExecArray | null;

export type Lib_Search_PerformSearch_PerformSearch_ContextSnippet = string;

export type Lib_Search_PerformSearch_PerformSearch_ContextStart = number;

export type Lib_Search_PerformSearch_PerformSearch_ContextEnd = number;

export type Lib_Search_PerformSearch_PerformSearch_SegmentParts = string[];

export type Lib_Search_PerformSearch_PerformSearch_SnippetSegments_Item_Text = string;

export type Lib_Search_PerformSearch_PerformSearch_SnippetSegments_Item_Highlight = boolean;

export type Lib_Search_PerformSearch_PerformSearch_SnippetSegments_Item = {
  text: Lib_Search_PerformSearch_PerformSearch_SnippetSegments_Item_Text;
  highlight: Lib_Search_PerformSearch_PerformSearch_SnippetSegments_Item_Highlight;
};

export type Lib_Search_PerformSearch_PerformSearch_SnippetSegments = Lib_Search_PerformSearch_PerformSearch_SnippetSegments_Item[];

export type Lib_Search_PerformSearch_PerformSearch_SegmentPart = string;

export type Lib_Search_PerformSearch_PerformSearch_SegmentPartIndex = number;

export type Lib_Search_PerformSearch_PerformSearch_IsHighlight = boolean;
