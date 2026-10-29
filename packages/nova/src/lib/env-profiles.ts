import { promises as fs } from 'node:fs';
import {
  join,
  resolve,
} from 'node:path';

import { Logger } from '../toolkit/index.js';
import { writeDotenvFiles } from './dotenv.js';
import {
  pathExists,
  renameFileWithDate,
} from './utility.js';

import type {
  Lib_EnvProfiles_MigrateEnvironmentProfiles_CurrentEnabled,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentEnvContents,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentEnvPath,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentSampleContents,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentSamplePath,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_Environment,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_NextEnabled,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_Options,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainEnvContents,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainEnvExists,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainEnvPath,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainSampleContents,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainSampleExists,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainSamplePath,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_Returns,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_RootDirectory,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_TargetDirectory,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_Variables,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_Workspace,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_WorkspacePath,
  Lib_EnvProfiles_MigrateEnvironmentProfiles_Workspaces,
} from '../types/lib/env-profiles.d.ts';

/**
 * Lib - Env Profiles - Migrate Environment Profiles.
 *
 * Reversibly migrates plain environment files to or from profile pairs.
 * Existing destinations are backed up and inactive profiles remain untouched.
 *
 * @param {Lib_EnvProfiles_MigrateEnvironmentProfiles_Options} options - Options.
 *
 * @returns {Lib_EnvProfiles_MigrateEnvironmentProfiles_Returns}
 *
 * @since 0.36.0
 */
export async function migrateEnvironmentProfiles(options: Lib_EnvProfiles_MigrateEnvironmentProfiles_Options): Lib_EnvProfiles_MigrateEnvironmentProfiles_Returns {
  const rootDirectory: Lib_EnvProfiles_MigrateEnvironmentProfiles_RootDirectory = options['rootDirectory'];
  const currentEnabled: Lib_EnvProfiles_MigrateEnvironmentProfiles_CurrentEnabled = options['currentEnabled'];
  const nextEnabled: Lib_EnvProfiles_MigrateEnvironmentProfiles_NextEnabled = options['nextEnabled'];
  const environment: Lib_EnvProfiles_MigrateEnvironmentProfiles_Environment = options['environment'];

  if (currentEnabled === nextEnabled) {
    return;
  }

  const workspaces: Lib_EnvProfiles_MigrateEnvironmentProfiles_Workspaces = environment['workspaces'] ?? {};

  for (const workspaceEntry of Object.entries(workspaces)) {
    const workspacePath: Lib_EnvProfiles_MigrateEnvironmentProfiles_WorkspacePath = workspaceEntry[0];
    const workspace: Lib_EnvProfiles_MigrateEnvironmentProfiles_Workspace = workspaceEntry[1];
    const variables: Lib_EnvProfiles_MigrateEnvironmentProfiles_Variables = workspace['variables'] ?? [];
    const targetDirectory: Lib_EnvProfiles_MigrateEnvironmentProfiles_TargetDirectory = resolve(rootDirectory, workspacePath);
    const plainEnvPath: Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainEnvPath = join(targetDirectory, '.env');
    const plainSamplePath: Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainSamplePath = join(targetDirectory, '.env.sample');
    const developmentEnvPath: Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentEnvPath = join(targetDirectory, '.env.development');
    const developmentSamplePath: Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentSamplePath = join(targetDirectory, '.env.development.sample');

    if (nextEnabled === true) {
      const plainEnvExists: Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainEnvExists = await pathExists(plainEnvPath);
      const plainSampleExists: Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainSampleExists = await pathExists(plainSamplePath);
      const plainEnvContents: Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainEnvContents = (plainEnvExists === true) ? await fs.readFile(plainEnvPath, 'utf-8') : undefined;
      const plainSampleContents: Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainSampleContents = (plainSampleExists === true) ? await fs.readFile(plainSamplePath, 'utf-8') : undefined;

      if (await pathExists(developmentEnvPath) === true) {
        await renameFileWithDate(developmentEnvPath);
      }

      if (await pathExists(developmentSamplePath) === true) {
        await renameFileWithDate(developmentSamplePath);
      }

      await writeDotenvFiles({
        profilesEnabled: true,
        report: false,
        targetDirectory,
        variables,
      });

      if (plainEnvContents !== undefined) {
        await fs.writeFile(developmentEnvPath, plainEnvContents, 'utf-8');
      }

      if (plainSampleContents !== undefined) {
        await fs.writeFile(developmentSamplePath, plainSampleContents, 'utf-8');
      }

      continue;
    }

    if (await pathExists(developmentEnvPath) === true) {
      const developmentEnvContents: Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentEnvContents = await fs.readFile(developmentEnvPath, 'utf-8');

      if (await pathExists(plainEnvPath) === true) {
        await renameFileWithDate(plainEnvPath);
      }

      await fs.writeFile(plainEnvPath, developmentEnvContents, 'utf-8');
    }

    if (await pathExists(developmentSamplePath) === true) {
      const developmentSampleContents: Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentSampleContents = await fs.readFile(developmentSamplePath, 'utf-8');

      if (await pathExists(plainSamplePath) === true) {
        await renameFileWithDate(plainSamplePath);
      }

      await fs.writeFile(plainSamplePath, developmentSampleContents, 'utf-8');
    }
  }

  Logger.customize({
    name: 'migrateEnvironmentProfiles',
    purpose: 'complete',
  }).info((nextEnabled === true) ? 'Enabled environment profiles. Plain files remain available while development, staging, and production pairs are active.' : 'Disabled environment profiles. The development pair was restored to the plain names; staging and production files remain untouched but inactive.');

  return;
}
