import type {
  Rules_Vitest_Index_TerminologyResolvedConfig,
  Rules_Vitest_Index_TerminologyToggleKey,
} from '../index.d.ts';

/**
 * Rules - Vitest - Terminology - Rules - Anchor Resolves.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Terminology_Rules_AnchorResolves_Config = Rules_Vitest_Index_TerminologyResolvedConfig;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_Enable = 'all' | Rules_Vitest_Index_TerminologyToggleKey[];

export type Rules_Vitest_Terminology_Rules_AnchorResolves_Returns = Promise<void>;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_TerminologyPath = string;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_ValidAnchors = Set<string>;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_Files = string[];

export type Rules_Vitest_Terminology_Rules_AnchorResolves_ComponentRegexSource = string;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_ExpectedBase = string;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_FilePath = string;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_Content = string;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_StrippedContent = string;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_Failures = string[];

export type Rules_Vitest_Terminology_Rules_AnchorResolves_ToMatch = RegExpExecArray | null;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_ToValue = string;

export type Rules_Vitest_Terminology_Rules_AnchorResolves_Anchor = string;

/**
 * Rules - Vitest - Terminology - Rules - Build Valid Anchors.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Terminology_Rules_BuildValidAnchors_Config = Rules_Vitest_Index_TerminologyResolvedConfig;

export type Rules_Vitest_Terminology_Rules_BuildValidAnchors_Returns = Promise<Set<string>>;

export type Rules_Vitest_Terminology_Rules_BuildValidAnchors_ValidAnchors = Set<string>;

export type Rules_Vitest_Terminology_Rules_BuildValidAnchors_TerminologyPath = string;

export type Rules_Vitest_Terminology_Rules_BuildValidAnchors_TerminologyContent = string;

export type Rules_Vitest_Terminology_Rules_BuildValidAnchors_HeadingCapture = string;

export type Rules_Vitest_Terminology_Rules_BuildValidAnchors_Anchor = string;

/**
 * Rules - Vitest - Terminology - Rules - Children Nonempty.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Terminology_Rules_ChildrenNonempty_Config = Rules_Vitest_Index_TerminologyResolvedConfig;

export type Rules_Vitest_Terminology_Rules_ChildrenNonempty_Enable = 'all' | Rules_Vitest_Index_TerminologyToggleKey[];

export type Rules_Vitest_Terminology_Rules_ChildrenNonempty_Returns = Promise<void>;

export type Rules_Vitest_Terminology_Rules_ChildrenNonempty_Files = string[];

export type Rules_Vitest_Terminology_Rules_ChildrenNonempty_ComponentRegexSource = string;

export type Rules_Vitest_Terminology_Rules_ChildrenNonempty_FilePath = string;

export type Rules_Vitest_Terminology_Rules_ChildrenNonempty_Content = string;

export type Rules_Vitest_Terminology_Rules_ChildrenNonempty_StrippedContent = string;

export type Rules_Vitest_Terminology_Rules_ChildrenNonempty_Failures = string[];

export type Rules_Vitest_Terminology_Rules_ChildrenNonempty_Children = string;

/**
 * Rules - Vitest - Terminology - Rules - Component Pattern.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Terminology_Rules_ComponentPattern_ComponentName = string;

export type Rules_Vitest_Terminology_Rules_ComponentPattern_Returns = string;

/**
 * Rules - Vitest - Terminology - Rules - Component Validation.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Terminology_Rules_ComponentValidation_Config = Rules_Vitest_Index_TerminologyResolvedConfig;

export type Rules_Vitest_Terminology_Rules_ComponentValidation_Enable = 'all' | Rules_Vitest_Index_TerminologyToggleKey[];

export type Rules_Vitest_Terminology_Rules_ComponentValidation_Returns = void;

export type Rules_Vitest_Terminology_Rules_ComponentValidation_TerminologyPath = string;

/**
 * Rules - Vitest - Terminology - Rules - Title Attr Present.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_Config = Rules_Vitest_Index_TerminologyResolvedConfig;

export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_Enable = 'all' | Rules_Vitest_Index_TerminologyToggleKey[];

export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_Returns = Promise<void>;

export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_Files = string[];

export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_ComponentRegexSource = string;

export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_FilePath = string;

export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_Content = string;

export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_StrippedContent = string;

export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_Failures = string[];

export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_Attrs = string;

export type Rules_Vitest_Terminology_Rules_TitleAttrPresent_TitleMatch = RegExpExecArray | null;

/**
 * Rules - Vitest - Terminology - Rules - To Attr Present.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Terminology_Rules_ToAttrPresent_Config = Rules_Vitest_Index_TerminologyResolvedConfig;

export type Rules_Vitest_Terminology_Rules_ToAttrPresent_Enable = 'all' | Rules_Vitest_Index_TerminologyToggleKey[];

export type Rules_Vitest_Terminology_Rules_ToAttrPresent_Returns = Promise<void>;

export type Rules_Vitest_Terminology_Rules_ToAttrPresent_Files = string[];

export type Rules_Vitest_Terminology_Rules_ToAttrPresent_ComponentRegexSource = string;

export type Rules_Vitest_Terminology_Rules_ToAttrPresent_FilePath = string;

export type Rules_Vitest_Terminology_Rules_ToAttrPresent_Content = string;

export type Rules_Vitest_Terminology_Rules_ToAttrPresent_StrippedContent = string;

export type Rules_Vitest_Terminology_Rules_ToAttrPresent_Failures = string[];

export type Rules_Vitest_Terminology_Rules_ToAttrPresent_Attrs = string;

export type Rules_Vitest_Terminology_Rules_ToAttrPresent_ToMatch = RegExpExecArray | null;

/**
 * Rules - Vitest - Terminology - Rules - To Points To Base.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Terminology_Rules_ToPointsToBase_Config = Rules_Vitest_Index_TerminologyResolvedConfig;

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_Enable = 'all' | Rules_Vitest_Index_TerminologyToggleKey[];

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_Returns = Promise<void>;

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_Files = string[];

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_ComponentRegexSource = string;

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_ExpectedBase = string;

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_FilePath = string;

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_Content = string;

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_StrippedContent = string;

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_Failures = string[];

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_Attrs = string;

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_ToMatch = RegExpExecArray | null;

export type Rules_Vitest_Terminology_Rules_ToPointsToBase_ToValue = string;
