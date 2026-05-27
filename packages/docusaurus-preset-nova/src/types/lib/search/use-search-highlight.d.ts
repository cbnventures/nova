/**
 * Lib - Search - Use Search Highlight - Options.
 *
 * @since 0.15.0
 */
export type Lib_Search_UseSearchHighlight_Options_Enabled = boolean;

export type Lib_Search_UseSearchHighlight_Options = {
  enabled: Lib_Search_UseSearchHighlight_Options_Enabled;
};

/**
 * Lib - Search - Use Search Highlight - Use Search Highlight.
 *
 * @since 0.15.0
 */
export type Lib_Search_UseSearchHighlight_Returns = void;

export type Lib_Search_UseSearchHighlight_MarkRef = React.RefObject<unknown>;

export type Lib_Search_UseSearchHighlight_SearchParams = URLSearchParams;

export type Lib_Search_UseSearchHighlight_HighlightTerm = string | null;

export type Lib_Search_UseSearchHighlight_IsCancelled = boolean;

export type Lib_Search_UseSearchHighlight_MarkModule = unknown;

export type Lib_Search_UseSearchHighlight_MarkModuleRecord = Record<string, unknown>;

export type Lib_Search_UseSearchHighlight_MarkDefault = unknown;

export type Lib_Search_UseSearchHighlight_MarkConstructorCast = unknown;

export type Lib_Search_UseSearchHighlight_MarkConstructor = new (element: Element) => Lib_Search_UseSearchHighlight_MarkInstance;

export type Lib_Search_UseSearchHighlight_MarkInstance_Mark = (term: string) => void;

export type Lib_Search_UseSearchHighlight_MarkInstance_Unmark = () => void;

export type Lib_Search_UseSearchHighlight_MarkInstance = {
  mark: Lib_Search_UseSearchHighlight_MarkInstance_Mark;
  unmark: Lib_Search_UseSearchHighlight_MarkInstance_Unmark;
  [key: string]: unknown;
};

export type Lib_Search_UseSearchHighlight_TargetElement = Element | null;

export type Lib_Search_UseSearchHighlight_Instance = Lib_Search_UseSearchHighlight_MarkInstance;

export type Lib_Search_UseSearchHighlight_CurrentMark = unknown;
