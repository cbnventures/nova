import { CliRecipeGithubSyncFeatures } from './github/sync-features.js';
import { CliRecipeGithubSyncIdentity } from './github/sync-identity.js';
import { CliRecipeGithubSyncPolicies } from './github/sync-policies.js';
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
 * Category-keyed map of all recipes executed by run-recipes. Each entry maps a
 * recipe name to its run method for invocation.
 *
 * @since 0.14.0
 */
export const registry: CliRecipeRegistry = {
  'github': [
    {
      name: 'sync-features',
      run: CliRecipeGithubSyncFeatures['run'],
    },
    {
      name: 'sync-identity',
      run: CliRecipeGithubSyncIdentity['run'],
    },
    {
      name: 'sync-policies',
      run: CliRecipeGithubSyncPolicies['run'],
    },
  ],
  'package-json': [
    {
      name: 'sync-identity',
      run: CliRecipePackageJsonSyncIdentity['run'],
    },
    {
      name: 'sync-ownership',
      run: CliRecipePackageJsonSyncOwnership['run'],
    },
    {
      name: 'normalize-modules',
      run: CliRecipePackageJsonNormalizeModules['run'],
    },
    {
      name: 'normalize-artifacts',
      run: CliRecipePackageJsonNormalizeArtifacts['run'],
    },
    {
      name: 'sync-environment',
      run: CliRecipePackageJsonSyncEnvironment['run'],
    },
    {
      name: 'normalize-dependencies',
      run: CliRecipePackageJsonNormalizeDependencies['run'],
    },
    {
      name: 'normalize-bundler',
      run: CliRecipePackageJsonNormalizeBundler['run'],
    },
    {
      name: 'normalize-tooling',
      run: CliRecipePackageJsonNormalizeTooling['run'],
    },
    {
      name: 'cleanup',
      run: CliRecipePackageJsonCleanup['run'],
    },
  ],
};
