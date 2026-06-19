/**
 * Tests - Lib - Item - Allowed Roles And Policies - libItemAllowedPoliciesByRole Covers All Roles.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedPoliciesByRoleCoversAllRoles_Roles = readonly string[];

/**
 * Tests - Lib - Item - Allowed Roles And Policies - libItemAllowedPoliciesByRole Has No Extra Roles.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedPoliciesByRoleHasNoExtraRoles_PolicyRoles = string[];

export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedPoliciesByRoleHasNoExtraRoles_Found = string | undefined;

/**
 * Tests - Lib - Item - Allowed Roles And Policies - libItemAllowedRoles Contains Expected Roles.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesProject = boolean;

export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesDocs = boolean;

export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesConfig = boolean;

export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesApp = boolean;

export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesPackage = boolean;

export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesTool = boolean;

export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesTemplate = boolean;

/**
 * Tests - Lib - Item - Allowed Roles And Policies - libItemAllowedRoles Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - Changelog Constants - libItemChangelogAdjectives Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogAdjectivesHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - Changelog Constants - libItemChangelogCategoryBumpMap Covers All Categories.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapCoversAllCategories_Categories = readonly string[];

/**
 * Tests - Lib - Item - Changelog Constants - libItemChangelogCategoryBumpMap Values Are Valid Bumps.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapValuesAreValidBumps_Category = string;

export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapValuesAreValidBumps_Bump = 'major' | 'minor' | 'patch';

export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapValuesAreValidBumps_IsValidBump = boolean;

/**
 * Tests - Lib - Item - Changelog Constants - libItemChangelogNouns Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogNounsHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - Changelog Constants - libItemChangelogValidBumps Contains Major Minor Patch.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsContainsMajorMinorPatch_IncludesMajor = boolean;

export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsContainsMajorMinorPatch_IncludesMinor = boolean;

export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsContainsMajorMinorPatch_IncludesPatch = boolean;

/**
 * Tests - Lib - Item - Changelog Constants - libItemChangelogValidBumps Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - Changelog Constants - libItemChangelogValidCategories Contains Expected Categories.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesAdded = boolean;

export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesUpdated = boolean;

export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesFixed = boolean;

export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesRemoved = boolean;

/**
 * Tests - Lib - Item - Changelog Constants - libItemChangelogValidCategories Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - Changelog Constants - libItemChangelogVerbs Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_ChangelogConstants_LibItemChangelogVerbsHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - Changelog Constants - Word Arrays Have Minimum Length For Sufficient Combinations.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_ChangelogConstants_WordArraysHaveMinimumLengthForSufficientCombinations_Adjectives = readonly string[];

export type Tests_Lib_Item_ChangelogConstants_WordArraysHaveMinimumLengthForSufficientCombinations_Nouns = readonly string[];

export type Tests_Lib_Item_ChangelogConstants_WordArraysHaveMinimumLengthForSufficientCombinations_Verbs = readonly string[];

/**
 * Tests - Lib - Item - libItemAllowedRecipes - Contains Expected Recipes.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_LibItemAllowedRecipes_ContainsExpectedRecipes_IncludesSyncIdentity = boolean;

export type Tests_Lib_Item_LibItemAllowedRecipes_ContainsExpectedRecipes_IncludesNormalizeDependencies = boolean;

export type Tests_Lib_Item_LibItemAllowedRecipes_ContainsExpectedRecipes_IncludesSyncEnvironment = boolean;

/**
 * Tests - Lib - Item - libItemAllowedRecipes - Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_LibItemAllowedRecipes_HasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - package.json Key Arrays - libItemBundlerKeys Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemBundlerKeysHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - package.json Key Arrays - libItemCorepackKeys Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemCorepackKeysHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - package.json Key Arrays - libItemEcosystemKeys Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemEcosystemKeysHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - package.json Key Arrays - libItemNodeJsKeys Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemNodeJsKeysHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - package.json Key Arrays - libItemNpmKeys Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemNpmKeysHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - package.json Key Arrays - libItemSortOrderKeys Contains Critical Keys.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesName = boolean;

export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesVersion = boolean;

export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesDescription = boolean;

export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesLicense = boolean;

export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesDependencies = boolean;

export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesDevDependencies = boolean;

/**
 * Tests - Lib - Item - package.json Key Arrays - libItemSortOrderKeys Has No Duplicates.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysHasNoDuplicates_Unique = Set<string>;

/**
 * Tests - Lib - Item - Pretty Name Maps - libItemPrettyNamesBrand Values Are Non Empty Strings.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesBrandValuesAreNonEmptyStrings_Key = string;

export type Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesBrandValuesAreNonEmptyStrings_Value = string;

/**
 * Tests - Lib - Item - Pretty Name Maps - libItemPrettyNamesCategory Values Are Non Empty Strings.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesCategoryValuesAreNonEmptyStrings_Key = string;

export type Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesCategoryValuesAreNonEmptyStrings_Value = string;

/**
 * Tests - Lib - Item - Pretty Name Maps - libItemPrettyNamesColumnTitle Values Are Non Empty Strings.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesColumnTitleValuesAreNonEmptyStrings_Key = string;

export type Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesColumnTitleValuesAreNonEmptyStrings_Value = string;

/**
 * Tests - Lib - Item - Pretty Name Maps - libItemPrettyNamesType Values Are Non Empty Strings.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesTypeValuesAreNonEmptyStrings_Key = string;

export type Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesTypeValuesAreNonEmptyStrings_Value = string;
