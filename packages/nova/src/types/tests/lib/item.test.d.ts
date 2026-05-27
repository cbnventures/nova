import type { Shared_ChangelogEntry_Bump } from '../../shared.d.ts';

/**
 * Tests - Lib - Item - Allowed Recipes.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_IncludesSyncIdentity = boolean;

export type Tests_Lib_Item_IncludesNormalizeDependencies = boolean;

export type Tests_Lib_Item_IncludesSyncEnvironment = boolean;

/**
 * Tests - Lib - Item - Allowed Roles And Policies.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_IncludesProject = boolean;

export type Tests_Lib_Item_IncludesDocs = boolean;

export type Tests_Lib_Item_IncludesConfig = boolean;

export type Tests_Lib_Item_IncludesApp = boolean;

export type Tests_Lib_Item_IncludesPackage = boolean;

export type Tests_Lib_Item_IncludesTool = boolean;

export type Tests_Lib_Item_IncludesTemplate = boolean;

export type Tests_Lib_Item_Unique = Set<string>;

export type Tests_Lib_Item_PolicyRoles = string[];

export type Tests_Lib_Item_Found = string | undefined;

/**
 * Tests - Lib - Item - Changelog Constants.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_IncludesMajor = boolean;

export type Tests_Lib_Item_IncludesMinor = boolean;

export type Tests_Lib_Item_IncludesPatch = boolean;

export type Tests_Lib_Item_IncludesAdded = boolean;

export type Tests_Lib_Item_IncludesUpdated = boolean;

export type Tests_Lib_Item_IncludesFixed = boolean;

export type Tests_Lib_Item_IncludesRemoved = boolean;

export type Tests_Lib_Item_Category = string;

export type Tests_Lib_Item_Bump = Shared_ChangelogEntry_Bump;

export type Tests_Lib_Item_IsValidBump = boolean;

/**
 * Tests - Lib - Item - package.json Key Arrays.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_IncludesName = boolean;

export type Tests_Lib_Item_IncludesVersion = boolean;

export type Tests_Lib_Item_IncludesDescription = boolean;

export type Tests_Lib_Item_IncludesLicense = boolean;

export type Tests_Lib_Item_IncludesDependencies = boolean;

export type Tests_Lib_Item_IncludesDevDependencies = boolean;

/**
 * Tests - Lib - Item - Pretty Name Maps.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_Key = string;

export type Tests_Lib_Item_Value = string;
