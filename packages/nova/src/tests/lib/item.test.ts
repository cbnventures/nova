import { ok, strictEqual } from 'node:assert/strict';

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
  libItemSortOrderKeys,
} from '../../lib/item.js';

import type {
  Tests_Lib_Item_Bump,
  Tests_Lib_Item_Category,
  Tests_Lib_Item_Found,
  Tests_Lib_Item_IncludesAdded,
  Tests_Lib_Item_IncludesApp,
  Tests_Lib_Item_IncludesConfig,
  Tests_Lib_Item_IncludesDependencies,
  Tests_Lib_Item_IncludesDescription,
  Tests_Lib_Item_IncludesDevDependencies,
  Tests_Lib_Item_IncludesDocs,
  Tests_Lib_Item_IncludesFixed,
  Tests_Lib_Item_IncludesLicense,
  Tests_Lib_Item_IncludesMajor,
  Tests_Lib_Item_IncludesMinor,
  Tests_Lib_Item_IncludesName,
  Tests_Lib_Item_IncludesNormalizeDependencies,
  Tests_Lib_Item_IncludesPackage,
  Tests_Lib_Item_IncludesPatch,
  Tests_Lib_Item_IncludesProject,
  Tests_Lib_Item_IncludesRemoved,
  Tests_Lib_Item_IncludesSyncEnvironment,
  Tests_Lib_Item_IncludesSyncIdentity,
  Tests_Lib_Item_IncludesTemplate,
  Tests_Lib_Item_IncludesTool,
  Tests_Lib_Item_IncludesUpdated,
  Tests_Lib_Item_IncludesVersion,
  Tests_Lib_Item_IsValidBump,
  Tests_Lib_Item_Key,
  Tests_Lib_Item_PolicyRoles,
  Tests_Lib_Item_Unique,
  Tests_Lib_Item_Value,
} from '../../types/tests/lib/item.test.d.ts';

/**
 * Tests - Lib - Item - Allowed Roles And Policies.
 *
 * @since 0.13.0
 */
describe('allowed roles and policies', async () => {
  it('libItemAllowedRoles contains expected roles', () => {
    const includesProject: Tests_Lib_Item_IncludesProject = libItemAllowedRoles.includes('project');
    const includesDocs: Tests_Lib_Item_IncludesDocs = libItemAllowedRoles.includes('docs');
    const includesConfig: Tests_Lib_Item_IncludesConfig = libItemAllowedRoles.includes('config');
    const includesApp: Tests_Lib_Item_IncludesApp = libItemAllowedRoles.includes('app');
    const includesPackage: Tests_Lib_Item_IncludesPackage = libItemAllowedRoles.includes('package');
    const includesTool: Tests_Lib_Item_IncludesTool = libItemAllowedRoles.includes('tool');
    const includesTemplate: Tests_Lib_Item_IncludesTemplate = libItemAllowedRoles.includes('template');

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
    const unique: Tests_Lib_Item_Unique = new Set(libItemAllowedRoles);

    strictEqual(unique.size, libItemAllowedRoles.length);

    return;
  });

  it('libItemAllowedPoliciesByRole covers all roles', () => {
    for (const role of libItemAllowedRoles) {
      ok(role in libItemAllowedPoliciesByRole, `Missing policies for role "${role}"`);
    }

    return;
  });

  it('libItemAllowedPoliciesByRole has no extra roles', () => {
    const policyRoles: Tests_Lib_Item_PolicyRoles = Object.keys(libItemAllowedPoliciesByRole);

    for (const role of policyRoles) {
      const found: Tests_Lib_Item_Found = libItemAllowedRoles.find(
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
    const unique: Tests_Lib_Item_Unique = new Set(libItemAllowedRecipes);

    strictEqual(unique.size, libItemAllowedRecipes.length);

    return;
  });

  it('contains expected recipes', () => {
    const includesSyncIdentity: Tests_Lib_Item_IncludesSyncIdentity = libItemAllowedRecipes.includes('sync-identity');
    const includesNormalizeDependencies: Tests_Lib_Item_IncludesNormalizeDependencies = libItemAllowedRecipes.includes('normalize-dependencies');
    const includesSyncEnvironment: Tests_Lib_Item_IncludesSyncEnvironment = libItemAllowedRecipes.includes('sync-environment');

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
    const unique: Tests_Lib_Item_Unique = new Set(libItemChangelogValidBumps);

    strictEqual(unique.size, libItemChangelogValidBumps.length);

    return;
  });

  it('libItemChangelogValidBumps contains major, minor, patch', () => {
    const includesMajor: Tests_Lib_Item_IncludesMajor = libItemChangelogValidBumps.includes('major');
    const includesMinor: Tests_Lib_Item_IncludesMinor = libItemChangelogValidBumps.includes('minor');
    const includesPatch: Tests_Lib_Item_IncludesPatch = libItemChangelogValidBumps.includes('patch');

    ok(includesMajor);
    ok(includesMinor);
    ok(includesPatch);

    return;
  });

  it('libItemChangelogValidCategories has no duplicates', () => {
    const unique: Tests_Lib_Item_Unique = new Set(libItemChangelogValidCategories);

    strictEqual(unique.size, libItemChangelogValidCategories.length);

    return;
  });

  it('libItemChangelogValidCategories contains expected categories', () => {
    const includesAdded: Tests_Lib_Item_IncludesAdded = libItemChangelogValidCategories.includes('added');
    const includesUpdated: Tests_Lib_Item_IncludesUpdated = libItemChangelogValidCategories.includes('updated');
    const includesFixed: Tests_Lib_Item_IncludesFixed = libItemChangelogValidCategories.includes('fixed');
    const includesRemoved: Tests_Lib_Item_IncludesRemoved = libItemChangelogValidCategories.includes('removed');

    ok(includesAdded);
    ok(includesUpdated);
    ok(includesFixed);
    ok(includesRemoved);

    return;
  });

  it('libItemChangelogCategoryBumpMap covers all categories', () => {
    for (const category of libItemChangelogValidCategories) {
      ok(category in libItemChangelogCategoryBumpMap, `Missing bump for category "${category}"`);
    }

    return;
  });

  it('libItemChangelogCategoryBumpMap values are valid bumps', () => {
    for (const categoryBumpEntry of Object.entries(libItemChangelogCategoryBumpMap)) {
      const category: Tests_Lib_Item_Category = categoryBumpEntry[0];
      const bump: Tests_Lib_Item_Bump = categoryBumpEntry[1];
      const isValidBump: Tests_Lib_Item_IsValidBump = libItemChangelogValidBumps.includes(bump);

      ok(isValidBump, `Invalid bump "${bump}" for category "${category}"`);
    }

    return;
  });

  it('libItemChangelogAdjectives has no duplicates', () => {
    const unique: Tests_Lib_Item_Unique = new Set(libItemChangelogAdjectives);

    strictEqual(unique.size, libItemChangelogAdjectives.length);

    return;
  });

  it('libItemChangelogNouns has no duplicates', () => {
    const unique: Tests_Lib_Item_Unique = new Set(libItemChangelogNouns);

    strictEqual(unique.size, libItemChangelogNouns.length);

    return;
  });

  it('libItemChangelogVerbs has no duplicates', () => {
    const unique: Tests_Lib_Item_Unique = new Set(libItemChangelogVerbs);

    strictEqual(unique.size, libItemChangelogVerbs.length);

    return;
  });

  it('word arrays have minimum length for sufficient combinations', () => {
    ok(libItemChangelogAdjectives.length >= 10);
    ok(libItemChangelogNouns.length >= 10);
    ok(libItemChangelogVerbs.length >= 10);

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
    const unique: Tests_Lib_Item_Unique = new Set(libItemSortOrderKeys);

    strictEqual(unique.size, libItemSortOrderKeys.length);

    return;
  });

  it('libItemSortOrderKeys contains critical keys', () => {
    const includesName: Tests_Lib_Item_IncludesName = libItemSortOrderKeys.includes('name');
    const includesVersion: Tests_Lib_Item_IncludesVersion = libItemSortOrderKeys.includes('version');
    const includesDescription: Tests_Lib_Item_IncludesDescription = libItemSortOrderKeys.includes('description');
    const includesLicense: Tests_Lib_Item_IncludesLicense = libItemSortOrderKeys.includes('license');
    const includesDependencies: Tests_Lib_Item_IncludesDependencies = libItemSortOrderKeys.includes('dependencies');
    const includesDevDependencies: Tests_Lib_Item_IncludesDevDependencies = libItemSortOrderKeys.includes('devDependencies');

    ok(includesName);
    ok(includesVersion);
    ok(includesDescription);
    ok(includesLicense);
    ok(includesDependencies);
    ok(includesDevDependencies);

    return;
  });

  it('libItemNpmKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_Unique = new Set(libItemNpmKeys);

    strictEqual(unique.size, libItemNpmKeys.length);

    return;
  });

  it('libItemNodeJsKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_Unique = new Set(libItemNodeJsKeys);

    strictEqual(unique.size, libItemNodeJsKeys.length);

    return;
  });

  it('libItemBundlerKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_Unique = new Set(libItemBundlerKeys);

    strictEqual(unique.size, libItemBundlerKeys.length);

    return;
  });

  it('libItemCorepackKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_Unique = new Set(libItemCorepackKeys);

    strictEqual(unique.size, libItemCorepackKeys.length);

    return;
  });

  it('libItemEcosystemKeys has no duplicates', () => {
    const unique: Tests_Lib_Item_Unique = new Set(libItemEcosystemKeys);

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
      const key: Tests_Lib_Item_Key = brandEntry[0];
      const value: Tests_Lib_Item_Value = brandEntry[1];

      ok(value.length > 0, `Empty value for brand key "${key}"`);
    }

    return;
  });

  it('libItemPrettyNamesCategory values are non-empty strings', () => {
    for (const categoryEntry of Object.entries(libItemPrettyNamesCategory)) {
      const key: Tests_Lib_Item_Key = categoryEntry[0];
      const value: Tests_Lib_Item_Value = categoryEntry[1];

      ok(value.length > 0, `Empty value for category key "${key}"`);
    }

    return;
  });

  it('libItemPrettyNamesColumnTitle values are non-empty strings', () => {
    for (const columnTitleEntry of Object.entries(libItemPrettyNamesColumnTitle)) {
      const key: Tests_Lib_Item_Key = columnTitleEntry[0];
      const value: Tests_Lib_Item_Value = columnTitleEntry[1];

      ok(value.length > 0, `Empty value for column title key "${key}"`);
    }

    return;
  });

  it('libItemPrettyNamesType values are non-empty strings', () => {
    for (const typeEntry of Object.entries(libItemPrettyNamesType)) {
      const key: Tests_Lib_Item_Key = typeEntry[0];
      const value: Tests_Lib_Item_Value = typeEntry[1];

      ok(value.length > 0, `Empty value for type key "${key}"`);
    }

    return;
  });

  return;
});
