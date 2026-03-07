import { CLIRecipePackageJsonCleanup } from '@/cli/recipe/package-json/cleanup.js';
import { CLIRecipePackageJsonNormalizeArtifacts } from '@/cli/recipe/package-json/normalize-artifacts.js';
import { CLIRecipePackageJsonNormalizeBundler } from '@/cli/recipe/package-json/normalize-bundler.js';
import { CLIRecipePackageJsonNormalizeDependencies } from '@/cli/recipe/package-json/normalize-dependencies.js';
import { CLIRecipePackageJsonNormalizeModules } from '@/cli/recipe/package-json/normalize-modules.js';
import { CLIRecipePackageJsonNormalizeTooling } from '@/cli/recipe/package-json/normalize-tooling.js';
import { CLIRecipePackageJsonSyncEnvironment } from '@/cli/recipe/package-json/sync-environment.js';
import { CLIRecipePackageJsonSyncIdentity } from '@/cli/recipe/package-json/sync-identity.js';
import { CLIRecipePackageJsonSyncOwnership } from '@/cli/recipe/package-json/sync-ownership.js';

import type { CLIRecipeRegistry } from '@/types/cli/recipe/index.d.ts';

/**
 * CLI Recipe - Registry.
 *
 * @since 1.0.0
 */
export const recipeRegistry: CLIRecipeRegistry = [
  {
    name: 'sync-identity',
    label: 'package-json/sync-identity',
    run: CLIRecipePackageJsonSyncIdentity.run,
  },
  {
    name: 'sync-ownership',
    label: 'package-json/sync-ownership',
    run: CLIRecipePackageJsonSyncOwnership.run,
  },
  {
    name: 'normalize-modules',
    label: 'package-json/normalize-modules',
    run: CLIRecipePackageJsonNormalizeModules.run,
  },
  {
    name: 'normalize-artifacts',
    label: 'package-json/normalize-artifacts',
    run: CLIRecipePackageJsonNormalizeArtifacts.run,
  },
  {
    name: 'sync-environment',
    label: 'package-json/sync-environment',
    run: CLIRecipePackageJsonSyncEnvironment.run,
  },
  {
    name: 'normalize-dependencies',
    label: 'package-json/normalize-dependencies',
    run: CLIRecipePackageJsonNormalizeDependencies.run,
  },
  {
    name: 'normalize-bundler',
    label: 'package-json/normalize-bundler',
    run: CLIRecipePackageJsonNormalizeBundler.run,
  },
  {
    name: 'normalize-tooling',
    label: 'package-json/normalize-tooling',
    run: CLIRecipePackageJsonNormalizeTooling.run,
  },
  {
    name: 'cleanup',
    label: 'package-json/cleanup',
    run: CLIRecipePackageJsonCleanup.run,
  },
];
