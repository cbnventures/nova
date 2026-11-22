import type {
  Shared_PostCssPlugin,
  Shared_PostCssRoot,
  Shared_PostCssRule,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Prose Shield - Create Prose Shield Plugin - Leaves Files Outside The Preset Styles Alone.
 *
 * @since 0.50.0
 */
export type Tests_Lib_ProseShield_CreateProseShieldPlugin_LeavesFilesOutsideThePresetStylesAlone_Plugin = Shared_PostCssPlugin;

export type Tests_Lib_ProseShield_CreateProseShieldPlugin_LeavesFilesOutsideThePresetStylesAlone_Rule = Shared_PostCssRule;

export type Tests_Lib_ProseShield_CreateProseShieldPlugin_LeavesFilesOutsideThePresetStylesAlone_Root = Shared_PostCssRoot;

/**
 * Tests - Lib - Prose Shield - Create Prose Shield Plugin - Rewrites Preset Styles And Nested Rules.
 *
 * @since 0.50.0
 */
export type Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Plugin = Shared_PostCssPlugin;

export type Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Parent = Shared_PostCssRule;

export type Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Nested = Shared_PostCssRule;

export type Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Root = Shared_PostCssRoot;

/**
 * Tests - Lib - Prose Shield - Shield Prose Selector - Appends The Exclusion To The Subject Of A Prose Selector.
 *
 * @since 0.50.0
 */
export type Tests_Lib_ProseShield_ShieldProseSelector_AppendsTheExclusionToTheSubjectOfAProseSelector_Result = string;

/**
 * Tests - Lib - Prose Shield - Shield Prose Selector - Does Not Treat Class Names Containing Article As Prose.
 *
 * @since 0.50.0
 */
export type Tests_Lib_ProseShield_ShieldProseSelector_DoesNotTreatClassNamesContainingArticleAsProse_Result = string;

/**
 * Tests - Lib - Prose Shield - Shield Prose Selector - Ignores Combinators Inside Attribute Values.
 *
 * @since 0.50.0
 */
export type Tests_Lib_ProseShield_ShieldProseSelector_IgnoresCombinatorsInsideAttributeValues_Result = string;

/**
 * Tests - Lib - Prose Shield - Shield Prose Selector - Keeps Legacy Single Colon Pseudo Elements At The End.
 *
 * @since 0.50.0
 */
export type Tests_Lib_ProseShield_ShieldProseSelector_KeepsLegacySingleColonPseudoElementsAtTheEnd_Result = string;

/**
 * Tests - Lib - Prose Shield - Shield Prose Selector - Keeps Pseudo Elements At The End.
 *
 * @since 0.50.0
 */
export type Tests_Lib_ProseShield_ShieldProseSelector_KeepsPseudoElementsAtTheEnd_Result = string;

/**
 * Tests - Lib - Prose Shield - Shield Prose Selector - Leaves Selectors Outside Prose Alone.
 *
 * @since 0.50.0
 */
export type Tests_Lib_ProseShield_ShieldProseSelector_LeavesSelectorsOutsideProseAlone_Result = string;

/**
 * Tests - Lib - Prose Shield - Shield Prose Selector - Leaves The Playground Styles Alone.
 *
 * @since 0.50.0
 */
export type Tests_Lib_ProseShield_ShieldProseSelector_LeavesThePlaygroundStylesAlone_Result = string;

/**
 * Tests - Lib - Prose Shield - Shield Prose Selector - Shields Nested Selectors Under A Prose Rule.
 *
 * @since 0.50.0
 */
export type Tests_Lib_ProseShield_ShieldProseSelector_ShieldsNestedSelectorsUnderAProseRule_Result = string;
