import { Runner as CliRecipeGithubSyncActions } from './github/sync-actions.js';
import { Runner as CliRecipeGithubSyncFeatures } from './github/sync-features.js';
import { Runner as CliRecipeGithubSyncIdentity } from './github/sync-identity.js';
import { Runner as CliRecipeGithubSyncLabels } from './github/sync-labels.js';
import { Runner as CliRecipeGithubSyncPolicies } from './github/sync-policies.js';
import { Runner as CliRecipeGithubSyncRulesets } from './github/sync-rulesets.js';
import { Runner as CliRecipeGithubSyncSecurity } from './github/sync-security.js';
import { Runner as CliRecipeLicenseUpdateCopyright } from './license/update-copyright.js';
import { Runner as CliRecipeMiscellaneousFixMarkdownTables } from './miscellaneous/fix-markdown-tables.js';
import { Runner as CliRecipePackageJsonCleanup } from './package-json/cleanup.js';
import { Runner as CliRecipePackageJsonNormalizeArtifacts } from './package-json/normalize-artifacts.js';
import { Runner as CliRecipePackageJsonNormalizeBundler } from './package-json/normalize-bundler.js';
import { Runner as CliRecipePackageJsonNormalizeDependencies } from './package-json/normalize-dependencies.js';
import { Runner as CliRecipePackageJsonNormalizeModules } from './package-json/normalize-modules.js';
import { Runner as CliRecipePackageJsonNormalizeTooling } from './package-json/normalize-tooling.js';
import { Runner as CliRecipePackageJsonSyncEnvironment } from './package-json/sync-environment.js';
import { Runner as CliRecipePackageJsonSyncIdentity } from './package-json/sync-identity.js';
import { Runner as CliRecipePackageJsonSyncOwnership } from './package-json/sync-ownership.js';
import { Runner as CliRecipeReadMeUpdateBadges } from './read-me/update-badges.js';
import { Runner as CliRecipeReadMeUpdateCredits } from './read-me/update-credits.js';
import { Runner as CliRecipeReadMeUpdateDocumentation } from './read-me/update-documentation.js';
import { Runner as CliRecipeReadMeUpdateHeader } from './read-me/update-header.js';
import { Runner as CliRecipeReadMeUpdateIntroduction } from './read-me/update-introduction.js';

import type { Cli_Recipe_Registry } from '../../types/cli/recipe/index.d.ts';

/**
 * CLI - Recipe - Registry.
 *
 * Category-keyed map of all recipes executed by run-recipes. Each entry maps a
 * recipe name to its run method for invocation.
 *
 * @since 0.14.0
 */
export const registry: Cli_Recipe_Registry = {
  'github': [
    {
      name: 'sync-actions',
      run: CliRecipeGithubSyncActions['run'],
    },
    {
      name: 'sync-features',
      run: CliRecipeGithubSyncFeatures['run'],
    },
    {
      name: 'sync-identity',
      run: CliRecipeGithubSyncIdentity['run'],
    },
    {
      name: 'sync-labels',
      run: CliRecipeGithubSyncLabels['run'],
    },
    {
      name: 'sync-policies',
      run: CliRecipeGithubSyncPolicies['run'],
    },
    {
      name: 'sync-rulesets',
      run: CliRecipeGithubSyncRulesets['run'],
    },
    {
      name: 'sync-security',
      run: CliRecipeGithubSyncSecurity['run'],
    },
  ],
  'license': [{
    name: 'update-copyright',
    run: CliRecipeLicenseUpdateCopyright['run'],
  }],
  'miscellaneous': [{
    name: 'fix-markdown-tables',
    run: CliRecipeMiscellaneousFixMarkdownTables['run'],
  }],
  'read-me': [
    {
      name: 'update-badges',
      run: CliRecipeReadMeUpdateBadges['run'],
    },
    {
      name: 'update-credits',
      run: CliRecipeReadMeUpdateCredits['run'],
    },
    {
      name: 'update-documentation',
      run: CliRecipeReadMeUpdateDocumentation['run'],
    },
    {
      name: 'update-header',
      run: CliRecipeReadMeUpdateHeader['run'],
    },
    {
      name: 'update-introduction',
      run: CliRecipeReadMeUpdateIntroduction['run'],
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
