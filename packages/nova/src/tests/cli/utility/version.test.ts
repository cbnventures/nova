import { strictEqual } from 'node:assert/strict';
import {
  mkdtemp,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { Runner as CliUtilityVersion } from '../../../cli/utility/version.js';

import type {
  Tests_Cli_Utility_Version_CliUtilityVersionRun_OriginalCwd,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_RunsWithAllFlagWithoutError_Options,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_RunsWithEmptyOptionsWithoutError_Options,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_RunsWithNodeFlagWithoutError_Options,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_SandboxRoot,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_TemporaryDirectory,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_TemporaryPrefix,
} from '../../../types/tests/cli/utility/version.test.d.ts';

/**
 * Tests - CLI - Utility - Version - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityVersion.run', async () => {
  const originalCwd: Tests_Cli_Utility_Version_CliUtilityVersionRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_Version_CliUtilityVersionRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Utility_Version_CliUtilityVersionRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Utility_Version_CliUtilityVersionRun_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('runs with --node flag without error', async () => {
    const options: Tests_Cli_Utility_Version_CliUtilityVersionRun_RunsWithNodeFlagWithoutError_Options = {
      node: true,
    };

    await CliUtilityVersion.run(options);

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('runs with --all flag without error', async () => {
    const options: Tests_Cli_Utility_Version_CliUtilityVersionRun_RunsWithAllFlagWithoutError_Options = {
      all: true,
    };

    await CliUtilityVersion.run(options);

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('runs with empty options without error', async () => {
    const options: Tests_Cli_Utility_Version_CliUtilityVersionRun_RunsWithEmptyOptionsWithoutError_Options = {};

    await CliUtilityVersion.run(options);

    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});
