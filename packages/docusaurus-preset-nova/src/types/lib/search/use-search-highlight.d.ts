/**
 * Lib - Search - Use Search Highlight - Options.
 *
 * @since 0.15.0
 */
export type LibSearchUseSearchHighlightOptionsEnabled = boolean;

export type LibSearchUseSearchHighlightOptions = {
  enabled: LibSearchUseSearchHighlightOptionsEnabled;
};

/**
 * Lib - Search - Use Search Highlight - Use Search Highlight.
 *
 * @since 0.15.0
 */
export type LibSearchUseSearchHighlightReturns = void;

export type LibSearchUseSearchHighlightMarkRef = React.RefObject<unknown>;

export type LibSearchUseSearchHighlightSearchParams = URLSearchParams;

export type LibSearchUseSearchHighlightHighlightTerm = string | null;

export type LibSearchUseSearchHighlightIsCancelled = boolean;

export type LibSearchUseSearchHighlightMarkModule = unknown;

export type LibSearchUseSearchHighlightMarkModuleRecord = Record<string, unknown>;

export type LibSearchUseSearchHighlightMarkDefault = unknown;

export type LibSearchUseSearchHighlightMarkConstructorCast = unknown;

export type LibSearchUseSearchHighlightMarkConstructor = new (element: Element) => LibSearchUseSearchHighlightMarkInstance;

export type LibSearchUseSearchHighlightMarkInstanceMark = (term: string) => void;

export type LibSearchUseSearchHighlightMarkInstanceUnmark = () => void;

export type LibSearchUseSearchHighlightMarkInstance = {
  mark: LibSearchUseSearchHighlightMarkInstanceMark;
  unmark: LibSearchUseSearchHighlightMarkInstanceUnmark;
  [key: string]: unknown;
};

export type LibSearchUseSearchHighlightTargetElement = Element | null;

export type LibSearchUseSearchHighlightInstance = LibSearchUseSearchHighlightMarkInstance;

export type LibSearchUseSearchHighlightCurrentMark = unknown;
