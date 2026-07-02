import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import {
  libItemAllowedPoliciesByRole,
  libItemAllowedRecipes,
  libItemAllowedRoles,
  libItemBundlerKeys,
  libItemChangelogAdjectives,
  libItemChangelogCategoryBumpMap,
  libItemChangelogNouns,
  libItemChangelogValidBumps,
  libItemChangelogValidCategories,
  libItemChangelogVerbs,
  libItemCorepackKeys,
  libItemEcosystemKeys,
  libItemNodeJsKeys,
  libItemNpmKeys,
  libItemPrettyNamesBrand,
  libItemPrettyNamesCategory,
  libItemPrettyNamesColumnTitle,
  libItemPrettyNamesType,
  libItemReservedDotenvKeys,
  libItemSortOrderKeys,
} from '../../lib/item.js';
import { LIB_REGEX_PATTERN_ENV_VAR_KEY } from '../../lib/regex.js';

import type {
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedPoliciesByRoleCoversAllRoles_Roles,
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedPoliciesByRoleHasNoExtraRoles_Found,
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedPoliciesByRoleHasNoExtraRoles_PolicyRoles,
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesApp,
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesConfig,
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesDocs,
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesPackage,
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesProject,
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesTemplate,
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesTool,
  Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesHasNoDuplicates_Unique,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogAdjectivesHasNoDuplicates_Unique,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapCoversAllCategories_Categories,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapValuesAreValidBumps_Bump,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapValuesAreValidBumps_Category,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapValuesAreValidBumps_IsValidBump,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogNounsHasNoDuplicates_Unique,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsContainsMajorMinorPatch_IncludesMajor,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsContainsMajorMinorPatch_IncludesMinor,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsContainsMajorMinorPatch_IncludesPatch,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsHasNoDuplicates_Unique,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesAdded,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesFixed,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesRemoved,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesUpdated,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesHasNoDuplicates_Unique,
  Tests_Lib_Item_ChangelogConstants_LibItemChangelogVerbsHasNoDuplicates_Unique,
  Tests_Lib_Item_ChangelogConstants_WordArraysHaveMinimumLengthForSufficientCombinations_Adjectives,
  Tests_Lib_Item_ChangelogConstants_WordArraysHaveMinimumLengthForSufficientCombinations_Nouns,
  Tests_Lib_Item_ChangelogConstants_WordArraysHaveMinimumLengthForSufficientCombinations_Verbs,
  Tests_Lib_Item_LibItemAllowedRecipes_ContainsExpectedRecipes_IncludesNormalizeDependencies,
  Tests_Lib_Item_LibItemAllowedRecipes_ContainsExpectedRecipes_IncludesSyncEnvironment,
  Tests_Lib_Item_LibItemAllowedRecipes_ContainsExpectedRecipes_IncludesSyncIdentity,
  Tests_Lib_Item_LibItemAllowedRecipes_HasNoDuplicates_Unique,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemBundlerKeysHasNoDuplicates_Unique,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemCorepackKeysHasNoDuplicates_Unique,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemEcosystemKeysHasNoDuplicates_Unique,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemNodeJsKeysHasNoDuplicates_Unique,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemNpmKeysHasNoDuplicates_Unique,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesDependencies,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesDescription,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesDevDependencies,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesLicense,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesName,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesVersion,
  Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysHasNoDuplicates_Unique,
  Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesBrandValuesAreNonEmptyStrings_Key,
  Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesBrandValuesAreNonEmptyStrings_Value,
  Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesCategoryValuesAreNonEmptyStrings_Key,
  Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesCategoryValuesAreNonEmptyStrings_Value,
  Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesColumnTitleValuesAreNonEmptyStrings_Key,
  Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesColumnTitleValuesAreNonEmptyStrings_Value,
  Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesTypeValuesAreNonEmptyStrings_Key,
  Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesTypeValuesAreNonEmptyStrings_Value,
  Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_CurrentDirectory,
  Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_FilePath,
  Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_KeyMatch,
  Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_ReservedKeys,
  Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_Template,
  Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_TemplateKeys,
  Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_TemplateLines,
  Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_TemplatePath,
} from '../../types/tests/lib/item.test.d.ts';

/**
 * Tests - Lib - Item - Allowed Roles And Policies.
 *
 * @since 0.13.0
 */
describe('allowed roles and policies', async () => {
  it('libItemAllowedRoles contains expected roles', () => {
    const includesProject: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesProject = libItemAllowedRoles.includes('project');
    const includesDocs: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesDocs = libItemAllowedRoles.includes('docs');
    const includesConfig: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesConfig = libItemAllowedRoles.includes('config');
    const includesApp: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesApp = libItemAllowedRoles.includes('app');
    const includesPackage: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesPackage = libItemAllowedRoles.includes('package');
    const includesTool: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesTool = libItemAllowedRoles.includes('tool');
    const includesTemplate: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesContainsExpectedRoles_IncludesTemplate = libItemAllowedRoles.includes('template');

    ok(includesProject);
    ok(includesDocs);
    ok(includesConfig);
    ok(includesApp);
    ok(includesPackage);
    ok(includesTool);
    ok(includesTemplate);

    return;
  });

  it('libItemAllowedRoles has no duplicates', () => {
    const unique: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedRolesHasNoDuplicates_Unique = new Set(libItemAllowedRoles);

    strictEqual(unique.size, libItemAllowedRoles.length);

    return;
  });

  it('libItemAllowedPoliciesByRole covers all roles', () => {
    const roles: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedPoliciesByRoleCoversAllRoles_Roles = libItemAllowedRoles;

    for (const role of roles) {
      ok(role in libItemAllowedPoliciesByRole, `Missing policies for role "${role}"`);
    }

    return;
  });

  it('libItemAllowedPoliciesByRole has no extra roles', () => {
    const policyRoles: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedPoliciesByRoleHasNoExtraRoles_PolicyRoles = Object.keys(libItemAllowedPoliciesByRole);

    for (const role of policyRoles) {
      const found: Tests_Lib_Item_AllowedRolesAndPolicies_LibItemAllowedPoliciesByRoleHasNoExtraRoles_Found = libItemAllowedRoles.find(
        (allowedRole) => allowedRole === role,
      );

      ok(found !== undefined, `Unexpected role "${role}" in policies`);
    }

    return;
  });

  return;
});

/**
 * Tests - Lib - Item - Allowed Recipes.
 *
 * @since 0.13.0
 */
describe('libItemAllowedRecipes', async () => {
  it('has no duplicates', () => {
    const unique: Tests_Lib_Item_LibItemAllowedRecipes_HasNoDuplicates_Unique = new Set(libItemAllowedRecipes);

    strictEqual(unique.size, libItemAllowedRecipes.length);

    return;
  });

  it('contains expected recipes', () => {
    const includesSyncIdentity: Tests_Lib_Item_LibItemAllowedRecipes_ContainsExpectedRecipes_IncludesSyncIdentity = libItemAllowedRecipes.includes('sync-identity');
    const includesNormalizeDependencies: Tests_Lib_Item_LibItemAllowedRecipes_ContainsExpectedRecipes_IncludesNormalizeDependencies = libItemAllowedRecipes.includes('normalize-dependencies');
    const includesSyncEnvironment: Tests_Lib_Item_LibItemAllowedRecipes_ContainsExpectedRecipes_IncludesSyncEnvironment = libItemAllowedRecipes.includes('sync-environment');

    ok(includesSyncIdentity);
    ok(includesNormalizeDependencies);
    ok(includesSyncEnvironment);

    return;
  });

  return;
});

/**
 * Tests - Lib - Item - Changelog Constants.
 *
 * @since 0.13.0
 */
describe('changelog constants', async () => {
  it('libItemChangelogValidBumps has no duplicates', () => {
    const unique: Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsHasNoDuplicates_Unique = new Set(libItemChangelogValidBumps);

    strictEqual(unique.size, libItemChangelogValidBumps.length);

    return;
  });

  it('libItemChangelogValidBumps contains major, minor, patch', () => {
    const includesMajor: Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsContainsMajorMinorPatch_IncludesMajor = libItemChangelogValidBumps.includes('major');
    const includesMinor: Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsContainsMajorMinorPatch_IncludesMinor = libItemChangelogValidBumps.includes('minor');
    const includesPatch: Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidBumpsContainsMajorMinorPatch_IncludesPatch = libItemChangelogValidBumps.includes('patch');

    ok(includesMajor);
    ok(includesMinor);
    ok(includesPatch);

    return;
  });

  it('libItemChangelogValidCategories has no duplicates', () => {
    const unique: Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesHasNoDuplicates_Unique = new Set(libItemChangelogValidCategories);

    strictEqual(unique.size, libItemChangelogValidCategories.length);

    return;
  });

  it('libItemChangelogValidCategories contains expected categories', () => {
    const includesAdded: Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesAdded = libItemChangelogValidCategories.includes('added');
    const includesUpdated: Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesUpdated = libItemChangelogValidCategories.includes('updated');
    const includesFixed: Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesFixed = libItemChangelogValidCategories.includes('fixed');
    const includesRemoved: Tests_Lib_Item_ChangelogConstants_LibItemChangelogValidCategoriesContainsExpectedCategories_IncludesRemoved = libItemChangelogValidCategories.includes('removed');

    ok(includesAdded);
    ok(includesUpdated);
    ok(includesFixed);
    ok(includesRemoved);

    return;
  });

  it('libItemChangelogCategoryBumpMap covers all categories', () => {
    const categories: Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapCoversAllCategories_Categories = libItemChangelogValidCategories;

    for (const category of categories) {
      ok(category in libItemChangelogCategoryBumpMap, `Missing bump for category "${category}"`);
    }

    return;
  });

  it('libItemChangelogCategoryBumpMap values are valid bumps', () => {
    for (const categoryBumpEntry of Object.entries(libItemChangelogCategoryBumpMap)) {
      const category: Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapValuesAreValidBumps_Category = categoryBumpEntry[0];
      const bump: Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapValuesAreValidBumps_Bump = categoryBumpEntry[1];
      const isValidBump: Tests_Lib_Item_ChangelogConstants_LibItemChangelogCategoryBumpMapValuesAreValidBumps_IsValidBump = libItemChangelogValidBumps.includes(bump);

      ok(isValidBump, `Invalid bump "${bump}" for category "${category}"`);
    }

    return;
  });

  it('libItemChangelogAdjectives has no duplicates', () => {
    const unique: Tests_Lib_Item_ChangelogConstants_LibItemChangelogAdjectivesHasNoDuplicates_Unique = new Set(libItemChangelogAdjectives);

    strictEqual(unique.size, libItemChangelogAdjectives.length);

    return;
  });

  it('libItemChangelogNouns has no duplicates', () => {
    const unique: Tests_Lib_Item_ChangelogConstants_LibItemChangelogNounsHasNoDuplicates_Unique = new Set(libItemChangelogNouns);

    strictEqual(unique.size, libItemChangelogNouns.length);

    return;
  });

  it('libItemChangelogVerbs has no duplicates', () => {
    const unique: Tests_Lib_Item_ChangelogConstants_LibItemChangelogVerbsHasNoDuplicates_Unique = new Set(libItemChangelogVerbs);

    strictEqual(unique.size, libItemChangelogVerbs.length);

    return;
  });

  it('word arrays have minimum length for sufficient combinations', () => {
    const adjectives: Tests_Lib_Item_ChangelogConstants_WordArraysHaveMinimumLengthForSufficientCombinations_Adjectives = libItemChangelogAdjectives;
    const nouns: Tests_Lib_Item_ChangelogConstants_WordArraysHaveMinimumLengthForSufficientCombinations_Nouns = libItemChangelogNouns;
    const verbs: Tests_Lib_Item_ChangelogConstants_WordArraysHaveMinimumLengthForSufficientCombinations_Verbs = libItemChangelogVerbs;

    ok(adjectives.length >= 10);
    ok(nouns.length >= 10);
    ok(verbs.length >= 10);

    return;
  });

  return;
});

/**
 * Tests - Lib - Item - package.json Key Arrays.
 *
 * @since 0.13.0
 */
describe('package.json key arrays', async () => {
  it('libItemSortOrderKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysHasNoDuplicates_Unique = new Set(libItemSortOrderKeys);

    strictEqual(unique.size, libItemSortOrderKeys.length);

    return;
  });

  it('libItemSortOrderKeys contains critical keys', () => {
    const includesName: Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesName = libItemSortOrderKeys.includes('name');
    const includesVersion: Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesVersion = libItemSortOrderKeys.includes('version');
    const includesDescription: Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesDescription = libItemSortOrderKeys.includes('description');
    const includesLicense: Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesLicense = libItemSortOrderKeys.includes('license');
    const includesDependencies: Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesDependencies = libItemSortOrderKeys.includes('dependencies');
    const includesDevDependencies: Tests_Lib_Item_PackageJsonKeyArrays_LibItemSortOrderKeysContainsCriticalKeys_IncludesDevDependencies = libItemSortOrderKeys.includes('devDependencies');

    ok(includesName);
    ok(includesVersion);
    ok(includesDescription);
    ok(includesLicense);
    ok(includesDependencies);
    ok(includesDevDependencies);

    return;
  });

  it('libItemNpmKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_PackageJsonKeyArrays_LibItemNpmKeysHasNoDuplicates_Unique = new Set(libItemNpmKeys);

    strictEqual(unique.size, libItemNpmKeys.length);

    return;
  });

  it('libItemNodeJsKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_PackageJsonKeyArrays_LibItemNodeJsKeysHasNoDuplicates_Unique = new Set(libItemNodeJsKeys);

    strictEqual(unique.size, libItemNodeJsKeys.length);

    return;
  });

  it('libItemBundlerKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_PackageJsonKeyArrays_LibItemBundlerKeysHasNoDuplicates_Unique = new Set(libItemBundlerKeys);

    strictEqual(unique.size, libItemBundlerKeys.length);

    return;
  });

  it('libItemCorepackKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_PackageJsonKeyArrays_LibItemCorepackKeysHasNoDuplicates_Unique = new Set(libItemCorepackKeys);

    strictEqual(unique.size, libItemCorepackKeys.length);

    return;
  });

  it('libItemEcosystemKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_PackageJsonKeyArrays_LibItemEcosystemKeysHasNoDuplicates_Unique = new Set(libItemEcosystemKeys);

    strictEqual(unique.size, libItemEcosystemKeys.length);

    return;
  });

  return;
});

/**
 * Tests - Lib - Item - Pretty Name Maps.
 *
 * @since 0.13.0
 */
describe('pretty name maps', async () => {
  it('libItemPrettyNamesBrand values are non-empty strings', () => {
    for (const brandEntry of Object.entries(libItemPrettyNamesBrand)) {
      const key: Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesBrandValuesAreNonEmptyStrings_Key = brandEntry[0];
      const value: Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesBrandValuesAreNonEmptyStrings_Value = brandEntry[1];

      ok(value.length > 0, `Empty value for brand key "${key}"`);
    }

    return;
  });

  it('libItemPrettyNamesCategory values are non-empty strings', () => {
    for (const categoryEntry of Object.entries(libItemPrettyNamesCategory)) {
      const key: Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesCategoryValuesAreNonEmptyStrings_Key = categoryEntry[0];
      const value: Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesCategoryValuesAreNonEmptyStrings_Value = categoryEntry[1];

      ok(value.length > 0, `Empty value for category key "${key}"`);
    }

    return;
  });

  it('libItemPrettyNamesColumnTitle values are non-empty strings', () => {
    for (const columnTitleEntry of Object.entries(libItemPrettyNamesColumnTitle)) {
      const key: Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesColumnTitleValuesAreNonEmptyStrings_Key = columnTitleEntry[0];
      const value: Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesColumnTitleValuesAreNonEmptyStrings_Value = columnTitleEntry[1];

      ok(value.length > 0, `Empty value for column title key "${key}"`);
    }

    return;
  });

  it('libItemPrettyNamesType values are non-empty strings', () => {
    for (const typeEntry of Object.entries(libItemPrettyNamesType)) {
      const key: Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesTypeValuesAreNonEmptyStrings_Key = typeEntry[0];
      const value: Tests_Lib_Item_PrettyNameMaps_LibItemPrettyNamesTypeValuesAreNonEmptyStrings_Value = typeEntry[1];

      ok(value.length > 0, `Empty value for type key "${key}"`);
    }

    return;
  });

  return;
});

/**
 * Tests - Lib - Item - Reserved Dotenv Keys.
 *
 * @since 0.20.0
 */
describe('reserved dotenv keys', async () => {
  it('libItemReservedDotenvKeys exactly matches the bundled dotenv template keys', async () => {
    const filePath: Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_FilePath = fileURLToPath(import.meta.url);
    const currentDirectory: Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_CurrentDirectory = dirname(filePath);
    const templatePath: Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_TemplatePath = join(currentDirectory, '..', '..', '..', 'templates', 'generators', 'must-haves', 'dotenv', 'env');
    const template: Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_Template = await readFile(templatePath, 'utf-8');
    const templateLines: Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_TemplateLines = template.split('\n');
    const templateKeys: Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_TemplateKeys = new Set();

    for (const templateLine of templateLines) {
      const keyMatch: Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_KeyMatch = templateLine.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

      if (keyMatch !== null) {
        templateKeys.add(keyMatch[1] ?? '');
      }
    }

    const reservedKeys: Tests_Lib_Item_ReservedDotenvKeys_LibItemReservedDotenvKeysExactlyMatchesTheBundledDotenvTemplateKeys_ReservedKeys = new Set(libItemReservedDotenvKeys);

    deepStrictEqual(templateKeys, reservedKeys);

    return;
  });

  return;
});
