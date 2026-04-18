import type { SharedSearchWorkerSearchHit } from '../../shared.d.ts';

/**
 * Theme - Search Bar - Search Input - Search Input.
 *
 * @since 0.15.0
 */
export type ThemeSearchBarSearchInputProps = Record<string, unknown>;

export type ThemeSearchBarSearchInputSearchContext = import('./search-context.d.ts').ThemeSearchBarSearchContextValue;

export type ThemeSearchBarSearchInputQuery = string;

export type ThemeSearchBarSearchInputIsOpen = boolean;

export type ThemeSearchBarSearchInputSetIsOpen = import('./search-context.d.ts').ThemeSearchBarSearchContextValueSetIsOpen;

export type ThemeSearchBarSearchInputActiveIndex = number;

export type ThemeSearchBarSearchInputSetActiveIndex = import('./search-context.d.ts').ThemeSearchBarSearchContextValueSetActiveIndex;

export type ThemeSearchBarSearchInputResults = SharedSearchWorkerSearchHit[];

export type ThemeSearchBarSearchInputHandleQueryChange = import('./search-context.d.ts').ThemeSearchBarSearchContextValueHandleQueryChange;

export type ThemeSearchBarSearchInputInputRef = import('./search-context.d.ts').ThemeSearchBarSearchContextValueInputRef;

export type ThemeSearchBarSearchInputHandleKeyDownFunction = (event: ThemeSearchBarSearchInputKeyboardEvent) => void;

export type ThemeSearchBarSearchInputKeyboardEvent = KeyboardEvent;

export type ThemeSearchBarSearchInputIsMac = boolean;

export type ThemeSearchBarSearchInputIsShortcutMatch = boolean;

export type ThemeSearchBarSearchInputHandleInputChangeFunction = (event: ThemeSearchBarSearchInputInputChangeEvent) => void;

export type ThemeSearchBarSearchInputInputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type ThemeSearchBarSearchInputInputValue = string;

export type ThemeSearchBarSearchInputHandleKeyDownCallbackFunction = (event: ThemeSearchBarSearchInputInputKeyboardEvent) => void;

export type ThemeSearchBarSearchInputInputKeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

export type ThemeSearchBarSearchInputResultCount = number;

export type ThemeSearchBarSearchInputNextIndex = number;

export type ThemeSearchBarSearchInputPreviousIndex = number;

export type ThemeSearchBarSearchInputSelectedResult = SharedSearchWorkerSearchHit | undefined;

export type ThemeSearchBarSearchInputDestinationUrl = string;

export type ThemeSearchBarSearchInputPlaceholder = string;

export type ThemeSearchBarSearchInputAriaLabel = string;

export type ThemeSearchBarSearchInputClearSearchAriaLabel = string;
