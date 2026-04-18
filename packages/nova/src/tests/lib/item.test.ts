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
  libItemNodeJsKeys,
  libItemNpmKeys,
  libItemPrettyNamesBrand,
  libItemPrettyNamesCategory,
  libItemPrettyNamesColumnTitle,
  libItemPrettyNamesType,
  libItemSortOrderKeys,
} from '../../lib/item.js';

import type {
  TestsLibItemBump,
  TestsLibItemCategory,
  TestsLibItemFound,
  TestsLibItemIncludesAdded,
  TestsLibItemIncludesApp,
  TestsLibItemIncludesConfig,
  TestsLibItemIncludesDependencies,
  TestsLibItemIncludesDescription,
  TestsLibItemIncludesDevDependencies,
  TestsLibItemIncludesDocs,
  TestsLibItemIncludesFixed,
  TestsLibItemIncludesLicense,
  TestsLibItemIncludesMajor,
  TestsLibItemIncludesMinor,
  TestsLibItemIncludesName,
  TestsLibItemIncludesNormalizeDependencies,
  TestsLibItemIncludesPackage,
  TestsLibItemIncludesPatch,
  TestsLibItemIncludesProject,
  TestsLibItemIncludesRemoved,
  TestsLibItemIncludesSyncEnvironment,
  TestsLibItemIncludesSyncIdentity,
  TestsLibItemIncludesTemplate,
  TestsLibItemIncludesTool,
  TestsLibItemIncludesUpdated,
  TestsLibItemIncludesVersion,
  TestsLibItemIsValidBump,
  TestsLibItemKey,
  TestsLibItemPolicyRoles,
  TestsLibItemUnique,
  TestsLibItemValue,
} from '../../types/tests/lib/item.test.d.ts';

/**
 * Tests - Lib - Item - Allowed Roles And Policies.
 *
 * @since 0.13.0
 */
describe('allowed roles and policies', async () => {
  it('libItemAllowedRoles contains expected roles', () => {
    const includesProject: TestsLibItemIncludesProject = libItemAllowedRoles.includes('project');
    const includesDocs: TestsLibItemIncludesDocs = libItemAllowedRoles.includes('docs');
    const includesConfig: TestsLibItemIncludesConfig = libItemAllowedRoles.includes('config');
    const includesApp: TestsLibItemIncludesApp = libItemAllowedRoles.includes('app');
    const includesPackage: TestsLibItemIncludesPackage = libItemAllowedRoles.includes('package');
    const includesTool: TestsLibItemIncludesTool = libItemAllowedRoles.includes('tool');
    const includesTemplate: TestsLibItemIncludesTemplate = libItemAllowedRoles.includes('template');

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
    const unique: TestsLibItemUnique = new Set(libItemAllowedRoles);

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
    const policyRoles: TestsLibItemPolicyRoles = Object.keys(libItemAllowedPoliciesByRole);

    for (const role of policyRoles) {
      const found: TestsLibItemFound = libItemAllowedRoles.find(
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
    const unique: TestsLibItemUnique = new Set(libItemAllowedRecipes);

    strictEqual(unique.size, libItemAllowedRecipes.length);

    return;
  });

  it('contains expected recipes', () => {
    const includesSyncIdentity: TestsLibItemIncludesSyncIdentity = libItemAllowedRecipes.includes('sync-identity');
    const includesNormalizeDependencies: TestsLibItemIncludesNormalizeDependencies = libItemAllowedRecipes.includes('normalize-dependencies');
    const includesSyncEnvironment: TestsLibItemIncludesSyncEnvironment = libItemAllowedRecipes.includes('sync-environment');

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
    const unique: TestsLibItemUnique = new Set(libItemChangelogValidBumps);

    strictEqual(unique.size, libItemChangelogValidBumps.length);

    return;
  });

  it('libItemChangelogValidBumps contains major, minor, patch', () => {
    const includesMajor: TestsLibItemIncludesMajor = libItemChangelogValidBumps.includes('major');
    const includesMinor: TestsLibItemIncludesMinor = libItemChangelogValidBumps.includes('minor');
    const includesPatch: TestsLibItemIncludesPatch = libItemChangelogValidBumps.includes('patch');

    ok(includesMajor);
    ok(includesMinor);
    ok(includesPatch);

    return;
  });

  it('libItemChangelogValidCategories has no duplicates', () => {
    const unique: TestsLibItemUnique = new Set(libItemChangelogValidCategories);

    strictEqual(unique.size, libItemChangelogValidCategories.length);

    return;
  });

  it('libItemChangelogValidCategories contains expected categories', () => {
    const includesAdded: TestsLibItemIncludesAdded = libItemChangelogValidCategories.includes('added');
    const includesUpdated: TestsLibItemIncludesUpdated = libItemChangelogValidCategories.includes('updated');
    const includesFixed: TestsLibItemIncludesFixed = libItemChangelogValidCategories.includes('fixed');
    const includesRemoved: TestsLibItemIncludesRemoved = libItemChangelogValidCategories.includes('removed');

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
      const category: TestsLibItemCategory = categoryBumpEntry[0];
      const bump: TestsLibItemBump = categoryBumpEntry[1];
      const isValidBump: TestsLibItemIsValidBump = libItemChangelogValidBumps.includes(bump);

      ok(isValidBump, `Invalid bump "${bump}" for category "${category}"`);
    }

    return;
  });

  it('libItemChangelogAdjectives has no duplicates', () => {
    const unique: TestsLibItemUnique = new Set(libItemChangelogAdjectives);

    strictEqual(unique.size, libItemChangelogAdjectives.length);

    return;
  });

  it('libItemChangelogNouns has no duplicates', () => {
    const unique: TestsLibItemUnique = new Set(libItemChangelogNouns);

    strictEqual(unique.size, libItemChangelogNouns.length);

    return;
  });

  it('libItemChangelogVerbs has no duplicates', () => {
    const unique: TestsLibItemUnique = new Set(libItemChangelogVerbs);

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
    const unique: TestsLibItemUnique = new Set(libItemSortOrderKeys);

    strictEqual(unique.size, libItemSortOrderKeys.length);

    return;
  });

  it('libItemSortOrderKeys contains critical keys', () => {
    const includesName: TestsLibItemIncludesName = libItemSortOrderKeys.includes('name');
    const includesVersion: TestsLibItemIncludesVersion = libItemSortOrderKeys.includes('version');
    const includesDescription: TestsLibItemIncludesDescription = libItemSortOrderKeys.includes('description');
    const includesLicense: TestsLibItemIncludesLicense = libItemSortOrderKeys.includes('license');
    const includesDependencies: TestsLibItemIncludesDependencies = libItemSortOrderKeys.includes('dependencies');
    const includesDevDependencies: TestsLibItemIncludesDevDependencies = libItemSortOrderKeys.includes('devDependencies');

    ok(includesName);
    ok(includesVersion);
    ok(includesDescription);
    ok(includesLicense);
    ok(includesDependencies);
    ok(includesDevDependencies);

    return;
  });

  it('libItemNpmKeys has no duplicates', () => {
    const unique: TestsLibItemUnique = new Set(libItemNpmKeys);

    strictEqual(unique.size, libItemNpmKeys.length);

    return;
  });

  it('libItemNodeJsKeys has no duplicates', () => {
    const unique: TestsLibItemUnique = new Set(libItemNodeJsKeys);

    strictEqual(unique.size, libItemNodeJsKeys.length);

    return;
  });

  it('libItemBundlerKeys has no duplicates', () => {
    const unique: TestsLibItemUnique = new Set(libItemBundlerKeys);

    strictEqual(unique.size, libItemBundlerKeys.length);

    return;
  });

  it('libItemCorepackKeys has no duplicates', () => {
    const unique: TestsLibItemUnique = new Set(libItemCorepackKeys);

    strictEqual(unique.size, libItemCorepackKeys.length);

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
      const key: TestsLibItemKey = brandEntry[0];
      const value: TestsLibItemValue = brandEntry[1];

      ok(value.length > 0, `Empty value for brand key "${key}"`);
    }

    return;
  });

  it('libItemPrettyNamesCategory values are non-empty strings', () => {
    for (const categoryEntry of Object.entries(libItemPrettyNamesCategory)) {
      const key: TestsLibItemKey = categoryEntry[0];
      const value: TestsLibItemValue = categoryEntry[1];

      ok(value.length > 0, `Empty value for category key "${key}"`);
    }

    return;
  });

  it('libItemPrettyNamesColumnTitle values are non-empty strings', () => {
    for (const columnTitleEntry of Object.entries(libItemPrettyNamesColumnTitle)) {
      const key: TestsLibItemKey = columnTitleEntry[0];
      const value: TestsLibItemValue = columnTitleEntry[1];

      ok(value.length > 0, `Empty value for column title key "${key}"`);
    }

    return;
  });

  it('libItemPrettyNamesType values are non-empty strings', () => {
    for (const typeEntry of Object.entries(libItemPrettyNamesType)) {
      const key: TestsLibItemKey = typeEntry[0];
      const value: TestsLibItemValue = typeEntry[1];

      ok(value.length > 0, `Empty value for type key "${key}"`);
    }

    return;
  });

  return;
});
