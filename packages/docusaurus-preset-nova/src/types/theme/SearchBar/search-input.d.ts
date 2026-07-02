import type { Shared_SearchWorkerSearchHit } from '../../shared.d.ts';

/**
 * Theme - Search Bar - Search Input - Parse Shortcut Keymap.
 *
 * @since 0.19.0
 */
export type Theme_SearchBar_SearchInput_ParseShortcutKeymap_Keymap = string;

export type Theme_SearchBar_SearchInput_ParseShortcutKeymap_Returns_Key = string;

export type Theme_SearchBar_SearchInput_ParseShortcutKeymap_Returns_Modifiers = string[];

export type Theme_SearchBar_SearchInput_ParseShortcutKeymap_Returns = {
  key: Theme_SearchBar_SearchInput_ParseShortcutKeymap_Returns_Key;
  modifiers: Theme_SearchBar_SearchInput_ParseShortcutKeymap_Returns_Modifiers;
};

export type Theme_SearchBar_SearchInput_ParseShortcutKeymap_Function = (keymap: Theme_SearchBar_SearchInput_ParseShortcutKeymap_Keymap) => Theme_SearchBar_SearchInput_ParseShortcutKeymap_Returns;

export type Theme_SearchBar_SearchInput_ParseShortcutKeymap_Tokens = string[];

export type Theme_SearchBar_SearchInput_ParseShortcutKeymap_Key = string;

export type Theme_SearchBar_SearchInput_ParseShortcutKeymap_Modifiers = string[];

/**
 * Theme - Search Bar - Search Input - Search Input.
 *
 * @since 0.15.0
 */
export type Theme_SearchBar_SearchInput_Props = Record<string, unknown>;

export type Theme_SearchBar_SearchInput_SearchContext = import('./search-context.d.ts').Theme_SearchBar_SearchContext_Value;

export type Theme_SearchBar_SearchInput_Query = string;

export type Theme_SearchBar_SearchInput_IsOpen = boolean;

export type Theme_SearchBar_SearchInput_SetIsOpen = import('./search-context.d.ts').Theme_SearchBar_SearchContext_Value_SetIsOpen;

export type Theme_SearchBar_SearchInput_ActiveIndex = number;

export type Theme_SearchBar_SearchInput_SetActiveIndex = import('./search-context.d.ts').Theme_SearchBar_SearchContext_Value_SetActiveIndex;

export type Theme_SearchBar_SearchInput_Results = Shared_SearchWorkerSearchHit[];

export type Theme_SearchBar_SearchInput_HandleQueryChange = import('./search-context.d.ts').Theme_SearchBar_SearchContext_Value_HandleQueryChange;

export type Theme_SearchBar_SearchInput_InputRef = import('./search-context.d.ts').Theme_SearchBar_SearchContext_Value_InputRef;

export type Theme_SearchBar_SearchInput_PluginData_Search_SearchBarShortcutKeymap = string;

export type Theme_SearchBar_SearchInput_PluginData_Search = {
  searchBarShortcutKeymap?: Theme_SearchBar_SearchInput_PluginData_Search_SearchBarShortcutKeymap;
} | undefined;

export type Theme_SearchBar_SearchInput_PluginData = {
  search?: Theme_SearchBar_SearchInput_PluginData_Search;
  [key: string]: unknown;
};

export type Theme_SearchBar_SearchInput_SearchSettings = Theme_SearchBar_SearchInput_PluginData_Search;

export type Theme_SearchBar_SearchInput_ShortcutKeymap = string;

export type Theme_SearchBar_SearchInput_IsActive = boolean;

export type Theme_SearchBar_SearchInput_PreviousIsActiveRef = React.RefObject<boolean>;

export type Theme_SearchBar_SearchInput_Direction = 'in' | 'out';

export type Theme_SearchBar_SearchInput_Body = HTMLDivElement | null;

export type Theme_SearchBar_SearchInput_ClassName = string;

export type Theme_SearchBar_SearchInput_AnimationEvent = AnimationEvent;

export type Theme_SearchBar_SearchInput_SearchInput_OnSwapEnd_Function = (event: Theme_SearchBar_SearchInput_AnimationEvent) => void;

export type Theme_SearchBar_SearchInput_SearchInput_HandleKeyDown_Function = (event: Theme_SearchBar_SearchInput_KeyboardEvent) => void;

export type Theme_SearchBar_SearchInput_ParsedKeymap = Theme_SearchBar_SearchInput_ParseShortcutKeymap_Returns;

export type Theme_SearchBar_SearchInput_ShortcutKey = string;

export type Theme_SearchBar_SearchInput_ShortcutModifiers = string[];

export type Theme_SearchBar_SearchInput_KeyboardEvent = KeyboardEvent;

export type Theme_SearchBar_SearchInput_IsMac = boolean;

export type Theme_SearchBar_SearchInput_ModifiersMatch = boolean;

export type Theme_SearchBar_SearchInput_Modifier = string;

export type Theme_SearchBar_SearchInput_IsShortcutMatch = boolean;

export type Theme_SearchBar_SearchInput_HandleInputChangeFunction = (event: Theme_SearchBar_SearchInput_InputChangeEvent) => void;

export type Theme_SearchBar_SearchInput_InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type Theme_SearchBar_SearchInput_InputValue = string;

export type Theme_SearchBar_SearchInput_SearchInput_HandleKeyDown_CallbackFunction = (event: Theme_SearchBar_SearchInput_InputKeyboardEvent) => void;

export type Theme_SearchBar_SearchInput_InputKeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

export type Theme_SearchBar_SearchInput_ResultCount = number;

export type Theme_SearchBar_SearchInput_NextIndex = number;

export type Theme_SearchBar_SearchInput_PreviousIndex = number;

export type Theme_SearchBar_SearchInput_SelectedResult = Shared_SearchWorkerSearchHit | undefined;

export type Theme_SearchBar_SearchInput_DestinationUrl = string;

export type Theme_SearchBar_SearchInput_Placeholder = string;

export type Theme_SearchBar_SearchInput_AriaLabel = string;

export type Theme_SearchBar_SearchInput_ClearSearchAriaLabel = string;

export type Theme_SearchBar_SearchInput_SearchedQuery = string;
