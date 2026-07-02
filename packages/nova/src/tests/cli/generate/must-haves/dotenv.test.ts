import { ok, strictEqual } from 'node:assert/strict';
import { promises as fsPromises } from 'node:fs';

import {
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliGenerateMustHavesDotenv } from '../../../../cli/generate/must-haves/dotenv.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_ActualReadFile,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_Calls,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_EnvTargetCall,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_ExistingEnvContent,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_LoadSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_ReadFileSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_SaveSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_ActualReadFile,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_Calls,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_EnvTargetCall,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_ExistingEnvContent,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_LoadSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_ReadFileSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_SampleTargetCall,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_SaveSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_ActualReadFile,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_Calls,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_EnvTargetCall,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_ExistingEnvContent,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_LoadSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_ReadFileSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_SaveSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_LoadSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_Result,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_SaveSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_ActualReadFile,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_Calls,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_LoadSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_ReadFileSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_RootEnvCall,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_SaveSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_WebEnvCall,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_ActualReadFile,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_Calls,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_EnvTargetCall,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_LoadSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_ReadFileSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_SampleTargetCall,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_SaveSpy,
} from '../../../../types/tests/cli/generate/must-haves/dotenv.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesDotenv.run', () => {
  it('preserves existing env values', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      workspaces: {
        './': {
          name: 'demo-project',
          role: 'project',
          policy: 'freezable',
          dotenv: {
            variables: [
              {
                key: 'CLOUDFLARE_API_TOKEN', defaultValue: 'changeme',
              },
              {
                key: 'NEW_KEY', defaultValue: 'fresh',
              },
            ],
          },
        },
      },
    });
    const saveSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    // The existing ".env" already holds real values that must survive the regenerate.
    const existingEnvContent: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_ExistingEnvContent = [
      'NODE_ENV="production"',
      'CLOUDFLARE_API_TOKEN="real-token"',
    ].join('\n');

    const actualReadFile: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_ActualReadFile = fsPromises.readFile;
    const readFileSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_ReadFileSpy = vi.spyOn(fsPromises, 'readFile').mockImplementation((filePath, encoding) => {
      if (typeof filePath === 'string' && filePath.endsWith('/.env') === true) {
        return Promise.resolve(existingEnvContent);
      }

      return actualReadFile(filePath, encoding);
    });

    await CliGenerateMustHavesDotenv.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_Calls = saveSpy['mock']['calls'];

    const envTargetCall: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_EnvTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.env'));

    ok(envTargetCall !== undefined, 'Expected saveGeneratedFile to be called for .env');

    ok(envTargetCall[1].includes('CLOUDFLARE_API_TOKEN="real-token"'), 'Expected .env content to preserve the filled config variable value');

    ok(envTargetCall[1].includes('NODE_ENV="production"'), 'Expected .env content to preserve the filled template value');

    ok(envTargetCall[1].includes('NEW_KEY=""'), 'Expected .env content to blank the newly-added config variable');

    const sampleTargetCall: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_SampleTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.env.sample'));

    ok(sampleTargetCall !== undefined, 'Expected saveGeneratedFile to be called for .env.sample');

    ok(sampleTargetCall[1].includes('CLOUDFLARE_API_TOKEN="changeme"'), 'Expected .env.sample content to use the config default value');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    readFileSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('drops keys not declared in the config or template', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      workspaces: {
        './': {
          name: 'demo-project',
          role: 'project',
          policy: 'freezable',
          dotenv: {
            variables: [{
              key: 'API_KEY', defaultValue: 'abc',
            }],
          },
        },
      },
    });
    const saveSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    // The existing ".env" carries a key that is neither a template baseline nor a config variable.
    const existingEnvContent: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_ExistingEnvContent = [
      'NODE_ENV="production"',
      'OLD_TOKEN="secret"',
    ].join('\n');

    const actualReadFile: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_ActualReadFile = fsPromises.readFile;
    const readFileSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_ReadFileSpy = vi.spyOn(fsPromises, 'readFile').mockImplementation((filePath, encoding) => {
      if (typeof filePath === 'string' && filePath.endsWith('/.env') === true) {
        return Promise.resolve(existingEnvContent);
      }

      return actualReadFile(filePath, encoding);
    });

    await CliGenerateMustHavesDotenv.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_Calls = saveSpy['mock']['calls'];

    const envTargetCall: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_EnvTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.env'));

    ok(envTargetCall !== undefined, 'Expected saveGeneratedFile to be called for .env');

    ok(envTargetCall[1].includes('OLD_TOKEN') === false, 'Expected .env content to drop the undeclared key');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    readFileSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('preserves multi-line quoted values', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      workspaces: {
        './': {
          name: 'demo-project',
          role: 'project',
          policy: 'freezable',
          dotenv: {
            variables: [{
              key: 'CLOUDFLARE_API_TOKEN', defaultValue: 'changeme',
            }],
          },
        },
      },
    });
    const saveSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    // The existing ".env" holds a multi-line quoted PEM value that must survive the regenerate intact.
    const existingEnvContent: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_ExistingEnvContent = [
      'CLOUDFLARE_API_TOKEN="-----BEGIN KEY-----',
      'MIDDLE',
      '-----END KEY-----"',
    ].join('\n');

    const actualReadFile: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_ActualReadFile = fsPromises.readFile;
    const readFileSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_ReadFileSpy = vi.spyOn(fsPromises, 'readFile').mockImplementation((filePath, encoding) => {
      if (typeof filePath === 'string' && filePath.endsWith('/.env') === true) {
        return Promise.resolve(existingEnvContent);
      }

      return actualReadFile(filePath, encoding);
    });

    await CliGenerateMustHavesDotenv.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_Calls = saveSpy['mock']['calls'];

    const envTargetCall: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_EnvTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.env'));

    ok(envTargetCall !== undefined, 'Expected saveGeneratedFile to be called for .env');

    ok(envTargetCall[1].includes('CLOUDFLARE_API_TOKEN="-----BEGIN KEY-----'), 'Expected .env content to preserve the first line of the multi-line value');

    ok(envTargetCall[1].includes('MIDDLE'), 'Expected .env content to preserve the middle line of the multi-line value');

    ok(envTargetCall[1].includes('-----END KEY-----"'), 'Expected .env content to preserve the last line of the multi-line value');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    readFileSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateMustHavesDotenv.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('writes config variables to env and env sample', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      workspaces: {
        './': {
          name: 'demo-project',
          role: 'project',
          policy: 'freezable',
          dotenv: {
            variables: [{
              key: 'API_KEY', defaultValue: 'abc',
            }],
          },
        },
      },
    });
    const saveSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    // Force the existing ".env" read to resolve empty so the blank-value assertion is deterministic.
    const actualReadFile: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_ActualReadFile = fsPromises.readFile;
    const readFileSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_ReadFileSpy = vi.spyOn(fsPromises, 'readFile').mockImplementation((filePath, encoding) => {
      if (typeof filePath === 'string' && filePath.endsWith('/.env') === true) {
        return Promise.resolve('');
      }

      return actualReadFile(filePath, encoding);
    });

    await CliGenerateMustHavesDotenv.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_Calls = saveSpy['mock']['calls'];

    const envTargetCall: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_EnvTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.env'));

    ok(envTargetCall !== undefined, 'Expected saveGeneratedFile to be called for .env');

    ok(envTargetCall[1].includes('API_KEY=""'), 'Expected .env content to include the blank-valued config variable');

    strictEqual((envTargetCall[3] !== undefined) ? envTargetCall[3]['mode'] : undefined, 'fillable');

    const sampleTargetCall: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_SampleTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.env.sample'));

    ok(sampleTargetCall !== undefined, 'Expected saveGeneratedFile to be called for .env.sample');

    ok(sampleTargetCall[1].includes('API_KEY="abc"'), 'Expected .env.sample content to include the default-valued config variable');

    strictEqual((sampleTargetCall[3] !== undefined) ? sampleTargetCall[3]['mode'] : undefined, 'strict');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    readFileSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('warns when no workspace declares dotenv', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      workspaces: {
        './': {
          name: 'demo-project',
          role: 'project',
          policy: 'freezable',
        },
      },
    });
    const saveSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    const result: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_Result = await CliGenerateMustHavesDotenv.run({});

    strictEqual(result, 'completed');

    strictEqual(saveSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('writes a file for each workspace that declares dotenv', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      workspaces: {
        './': {
          name: 'demo-project',
          role: 'project',
          policy: 'freezable',
          dotenv: {
            variables: [{
              key: 'ROOT_KEY', defaultValue: 'root',
            }],
          },
        },
        'apps/web': {
          name: 'demo-web',
          role: 'app',
          policy: 'freezable',
          dotenv: {
            variables: [{
              key: 'WEB_KEY', defaultValue: 'web',
            }],
          },
        },
        'packages/core': {
          name: '@demo/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    });
    const saveSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    // Force every existing ".env" read to resolve empty so blank-value assertions stay deterministic.
    const actualReadFile: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_ActualReadFile = fsPromises.readFile;
    const readFileSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_ReadFileSpy = vi.spyOn(fsPromises, 'readFile').mockImplementation((filePath, encoding) => {
      if (typeof filePath === 'string' && filePath.endsWith('/.env') === true) {
        return Promise.resolve('');
      }

      return actualReadFile(filePath, encoding);
    });

    await CliGenerateMustHavesDotenv.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_Calls = saveSpy['mock']['calls'];

    const rootEnvCall: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_RootEnvCall = calls.find((call) => call[0].endsWith('/.env') && call[0].includes('/apps/web/') === false);

    ok(rootEnvCall !== undefined, 'Expected saveGeneratedFile to be called for the root .env');

    ok(rootEnvCall[1].includes('ROOT_KEY=""'), 'Expected the root .env to include the root workspace variable');

    const webEnvCall: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_WebEnvCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/apps/web/.env'));

    ok(webEnvCall !== undefined, 'Expected saveGeneratedFile to be called for the apps/web .env');

    ok(webEnvCall[1].includes('WEB_KEY=""'), 'Expected the apps/web .env to include the web workspace variable');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    readFileSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  return;
});
