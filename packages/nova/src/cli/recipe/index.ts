import { CliRecipePackageJsonCleanup } from './package-json/cleanup.js';
import { CliRecipePackageJsonNormalizeArtifacts } from './package-json/normalize-artifacts.js';
import { CliRecipePackageJsonNormalizeBundler } from './package-json/normalize-bundler.js';
import { CliRecipePackageJsonNormalizeDependencies } from './package-json/normalize-dependencies.js';
import { CliRecipePackageJsonNormalizeModules } from './package-json/normalize-modules.js';
import { CliRecipePackageJsonNormalizeTooling } from './package-json/normalize-tooling.js';
import { CliRecipePackageJsonSyncEnvironment } from './package-json/sync-environment.js';
import { CliRecipePackageJsonSyncIdentity } from './package-json/sync-identity.js';
import { CliRecipePackageJsonSyncOwnership } from './package-json/sync-ownership.js';

import type { CliRecipeRegistry } from '../../types/cli/recipe/index.d.ts';

/**
 * CLI - Recipe - Registry.
 *
 * Ordered list of all package-json recipes executed by run-recipes. Each entry maps a
 * recipe name to its run method for invocation.
 *
 * @since 0.14.0
 */
export const registry: CliRecipeRegistry = [
  {
    name: 'sync-identity',
    label: 'package-json/sync-identity',
    run: CliRecipePackageJsonSyncIdentity['run'],
  },
  {
    name: 'sync-ownership',
    label: 'package-json/sync-ownership',
    run: CliRecipePackageJsonSyncOwnership['run'],
  },
  {
    name: 'normalize-modules',
    label: 'package-json/normalize-modules',
    run: CliRecipePackageJsonNormalizeModules['run'],
  },
  {
    name: 'normalize-artifacts',
    label: 'package-json/normalize-artifacts',
    run: CliRecipePackageJsonNormalizeArtifacts['run'],
  },
  {
    name: 'sync-environment',
    label: 'package-json/sync-environment',
    run: CliRecipePackageJsonSyncEnvironment['run'],
  },
  {
    name: 'normalize-dependencies',
    label: 'package-json/normalize-dependencies',
    run: CliRecipePackageJsonNormalizeDependencies['run'],
  },
  {
    name: 'normalize-bundler',
    label: 'package-json/normalize-bundler',
    run: CliRecipePackageJsonNormalizeBundler['run'],
  },
  {
    name: 'normalize-tooling',
    label: 'package-json/normalize-tooling',
    run: CliRecipePackageJsonNormalizeTooling['run'],
  },
  {
    name: 'cleanup',
    label: 'package-json/cleanup',
    run: CliRecipePackageJsonCleanup['run'],
  },
];
