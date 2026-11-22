import type {
  Shared_PostCssNode,
  Shared_PostCssPlugin,
  Shared_PostCssRoot,
} from '../shared.d.ts';

/**
 * Lib - Prose Shield.
 *
 * @since 0.50.0
 */
export type Lib_ProseShield_ProseShieldExclusion = string;

export type Lib_ProseShield_ProseShieldLegacyPseudoElements = string[];

/**
 * Lib - Prose Shield - Create Prose Shield Plugin.
 *
 * @since 0.50.0
 */
export type Lib_ProseShield_CreateProseShieldPlugin_StylesDirectory = string;

export type Lib_ProseShield_CreateProseShieldPlugin_Returns = Shared_PostCssPlugin;

export type Lib_ProseShield_CreateProseShieldPlugin_StylesPrefix = string;

/**
 * Lib - Prose Shield - Create Prose Shield Plugin - Once.
 *
 * @since 0.50.0
 */
export type Lib_ProseShield_CreateProseShieldPlugin_Once_Root = Shared_PostCssRoot;

export type Lib_ProseShield_CreateProseShieldPlugin_Once_Returns = void;

export type Lib_ProseShield_CreateProseShieldPlugin_Once_SourceFile = string | undefined;

export type Lib_ProseShield_CreateProseShieldPlugin_Once_Inherited = boolean;

export type Lib_ProseShield_CreateProseShieldPlugin_Once_NextSelectors = string[];

/**
 * Lib - Prose Shield - Find Subject Insert Index.
 *
 * @since 0.50.0
 */
export type Lib_ProseShield_FindSubjectInsertIndex_Selector = string;

export type Lib_ProseShield_FindSubjectInsertIndex_Returns = number;

export type Lib_ProseShield_FindSubjectInsertIndex_Depth = number;

export type Lib_ProseShield_FindSubjectInsertIndex_Quote = string | undefined;

export type Lib_ProseShield_FindSubjectInsertIndex_SubjectStart = number;

export type Lib_ProseShield_FindSubjectInsertIndex_Character = string;

export type Lib_ProseShield_FindSubjectInsertIndex_SubjectCharacter = string;

export type Lib_ProseShield_FindSubjectInsertIndex_Remainder = string;

/**
 * Lib - Prose Shield - Has Prose Ancestor.
 *
 * @since 0.50.0
 */
export type Lib_ProseShield_HasProseAncestor_Node = Shared_PostCssNode;

export type Lib_ProseShield_HasProseAncestor_Returns = boolean;

export type Lib_ProseShield_HasProseAncestor_Current = Shared_PostCssNode | undefined;

/**
 * Lib - Prose Shield - Is Prose Selector.
 *
 * @since 0.50.0
 */
export type Lib_ProseShield_IsProseSelector_Selector = string;

export type Lib_ProseShield_IsProseSelector_Returns = boolean;

/**
 * Lib - Prose Shield - Shield Prose Selector.
 *
 * @since 0.50.0
 */
export type Lib_ProseShield_ShieldProseSelector_Selector = string;

export type Lib_ProseShield_ShieldProseSelector_Inherited = boolean;

export type Lib_ProseShield_ShieldProseSelector_Returns = string;

export type Lib_ProseShield_ShieldProseSelector_InsertIndex = number;
