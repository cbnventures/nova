import { ok, strictEqual } from 'node:assert/strict';
import { test } from 'node:test';

import {
  itemAllowedPoliciesByRole,
  itemAllowedRoles,
  itemAllowedSyncProperties,
  itemChangelogAdjectives,
  itemChangelogCategoryBumpMap,
  itemChangelogNouns,
  itemChangelogValidBumps,
  itemChangelogValidCategories,
  itemChangelogVerbs,
  itemPackageJsonKeysBundler,
  itemPackageJsonKeysCorepack,
  itemPackageJsonKeysNodeJs,
  itemPackageJsonKeysNpm,
  itemPackageJsonSortOrder,
  itemPrettyNamesBrand,
  itemPrettyNamesCategory,
  itemPrettyNamesColumnTitle,
  itemPrettyNamesType,
} from '@/lib/item.js';

/**
 * Allowed roles and policies.
 *
 * @since 1.0.0
 */
test('allowed roles and policies', async (context) => {
  await context.test('itemAllowedRoles contains expected roles', () => {
    ok(itemAllowedRoles.includes('project'));
    ok(itemAllowedRoles.includes('docs'));
    ok(itemAllowedRoles.includes('config'));
    ok(itemAllowedRoles.includes('app'));
    ok(itemAllowedRoles.includes('package'));
    ok(itemAllowedRoles.includes('tool'));
    ok(itemAllowedRoles.includes('template'));
  });

  await context.test('itemAllowedRoles has no duplicates', () => {
    const unique = new Set(itemAllowedRoles);

    strictEqual(unique.size, itemAllowedRoles.length);
  });

  await context.test('itemAllowedPoliciesByRole covers all roles', () => {
    for (const role of itemAllowedRoles) {
      ok(role in itemAllowedPoliciesByRole, `Missing policies for role "${role}"`);
    }
  });

  await context.test('itemAllowedPoliciesByRole has no extra roles', () => {
    const policyRoles = Object.keys(itemAllowedPoliciesByRole);

    for (const role of policyRoles) {
      const found = itemAllowedRoles.find(
        (allowedRole) => allowedRole === role,
      );

      ok(found !== undefined, `Unexpected role "${role}" in policies`);
    }
  });
});

/**
 * Allowed sync properties.
 *
 * @since 1.0.0
 */
test('itemAllowedSyncProperties', async (context) => {
  await context.test('has no duplicates', () => {
    const unique = new Set(itemAllowedSyncProperties);

    strictEqual(unique.size, itemAllowedSyncProperties.length);
  });

  await context.test('contains expected properties', () => {
    ok(itemAllowedSyncProperties.includes('description'));
    ok(itemAllowedSyncProperties.includes('author'));
    ok(itemAllowedSyncProperties.includes('repository'));
  });
});

/**
 * Changelog constants.
 *
 * @since 1.0.0
 */
test('changelog constants', async (context) => {
  await context.test('itemChangelogValidBumps has no duplicates', () => {
    const unique = new Set(itemChangelogValidBumps);

    strictEqual(unique.size, itemChangelogValidBumps.length);
  });

  await context.test('itemChangelogValidBumps contains major, minor, patch', () => {
    ok(itemChangelogValidBumps.includes('major'));
    ok(itemChangelogValidBumps.includes('minor'));
    ok(itemChangelogValidBumps.includes('patch'));
  });

  await context.test('itemChangelogValidCategories has no duplicates', () => {
    const unique = new Set(itemChangelogValidCategories);

    strictEqual(unique.size, itemChangelogValidCategories.length);
  });

  await context.test('itemChangelogValidCategories contains expected categories', () => {
    ok(itemChangelogValidCategories.includes('added'));
    ok(itemChangelogValidCategories.includes('updated'));
    ok(itemChangelogValidCategories.includes('fixed'));
    ok(itemChangelogValidCategories.includes('removed'));
  });

  await context.test('itemChangelogCategoryBumpMap covers all categories', () => {
    for (const category of itemChangelogValidCategories) {
      ok(category in itemChangelogCategoryBumpMap, `Missing bump for category "${category}"`);
    }
  });

  await context.test('itemChangelogCategoryBumpMap values are valid bumps', () => {
    for (const [category, bump] of Object.entries(itemChangelogCategoryBumpMap)) {
      ok(itemChangelogValidBumps.includes(bump), `Invalid bump "${bump}" for category "${category}"`);
    }
  });

  await context.test('itemChangelogAdjectives has no duplicates', () => {
    const unique = new Set(itemChangelogAdjectives);

    strictEqual(unique.size, itemChangelogAdjectives.length);
  });

  await context.test('itemChangelogNouns has no duplicates', () => {
    const unique = new Set(itemChangelogNouns);

    strictEqual(unique.size, itemChangelogNouns.length);
  });

  await context.test('itemChangelogVerbs has no duplicates', () => {
    const unique = new Set(itemChangelogVerbs);

    strictEqual(unique.size, itemChangelogVerbs.length);
  });

  await context.test('word arrays have minimum length for sufficient combinations', () => {
    ok(itemChangelogAdjectives.length >= 10);
    ok(itemChangelogNouns.length >= 10);
    ok(itemChangelogVerbs.length >= 10);
  });
});

/**
 * Package.json key arrays.
 *
 * @since 1.0.0
 */
test('package.json key arrays', async (context) => {
  await context.test('itemPackageJsonSortOrder has no duplicates', () => {
    const unique = new Set(itemPackageJsonSortOrder);

    strictEqual(unique.size, itemPackageJsonSortOrder.length);
  });

  await context.test('itemPackageJsonSortOrder contains critical keys', () => {
    ok(itemPackageJsonSortOrder.includes('name'));
    ok(itemPackageJsonSortOrder.includes('version'));
    ok(itemPackageJsonSortOrder.includes('description'));
    ok(itemPackageJsonSortOrder.includes('license'));
    ok(itemPackageJsonSortOrder.includes('dependencies'));
    ok(itemPackageJsonSortOrder.includes('devDependencies'));
  });

  await context.test('itemPackageJsonKeysNpm has no duplicates', () => {
    const unique = new Set(itemPackageJsonKeysNpm);

    strictEqual(unique.size, itemPackageJsonKeysNpm.length);
  });

  await context.test('itemPackageJsonKeysNodeJs has no duplicates', () => {
    const unique = new Set(itemPackageJsonKeysNodeJs);

    strictEqual(unique.size, itemPackageJsonKeysNodeJs.length);
  });

  await context.test('itemPackageJsonKeysBundler has no duplicates', () => {
    const unique = new Set(itemPackageJsonKeysBundler);

    strictEqual(unique.size, itemPackageJsonKeysBundler.length);
  });

  await context.test('itemPackageJsonKeysCorepack has no duplicates', () => {
    const unique = new Set(itemPackageJsonKeysCorepack);

    strictEqual(unique.size, itemPackageJsonKeysCorepack.length);
  });
});

/**
 * Pretty name maps.
 *
 * @since 1.0.0
 */
test('pretty name maps', async (context) => {
  await context.test('itemPrettyNamesBrand values are non-empty strings', () => {
    for (const [key, value] of Object.entries(itemPrettyNamesBrand)) {
      ok(value.length > 0, `Empty value for brand key "${key}"`);
    }
  });

  await context.test('itemPrettyNamesCategory values are non-empty strings', () => {
    for (const [key, value] of Object.entries(itemPrettyNamesCategory)) {
      ok(value.length > 0, `Empty value for category key "${key}"`);
    }
  });

  await context.test('itemPrettyNamesColumnTitle values are non-empty strings', () => {
    for (const [key, value] of Object.entries(itemPrettyNamesColumnTitle)) {
      ok(value.length > 0, `Empty value for column title key "${key}"`);
    }
  });

  await context.test('itemPrettyNamesType values are non-empty strings', () => {
    for (const [key, value] of Object.entries(itemPrettyNamesType)) {
      ok(value.length > 0, `Empty value for type key "${key}"`);
    }
  });
});
