import { deepStrictEqual } from 'node:assert/strict';
import {
  mkdtemp,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliUtilityVersion } from '../../../cli/utility/version.js';

import type {
  Tests_Cli_Utility_Version_CliUtilityVersionRun_OriginalCwd,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_Options,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintedList,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintSpy,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintTarget,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_Runner,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_Options,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintedList,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintSpy,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintTarget,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_Runner,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_Options,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintedList,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintSpy,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintTarget,
  Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_Runner,
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

  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('prints only the node category for the node flag', async () => {
    const options: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_Options = {
      node: true,
    };
    const runner: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_Runner = CliUtilityVersion;
    const printSpy: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintSpy = vi.spyOn(runner as Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintTarget, 'print').mockReturnValue(undefined);

    await CliUtilityVersion.run(options);

    const printedList: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintedList = (printSpy['mock']['calls'][0] ?? [])[0] ?? {};

    deepStrictEqual(Object.keys(printedList), ['node']);

    return;
  });

  it('prints every category for the all flag', async () => {
    const options: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_Options = {
      all: true,
    };
    const runner: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_Runner = CliUtilityVersion;
    const printSpy: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintSpy = vi.spyOn(runner as Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintTarget, 'print').mockReturnValue(undefined);

    await CliUtilityVersion.run(options);

    const printedList: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintedList = (printSpy['mock']['calls'][0] ?? [])[0] ?? {};

    deepStrictEqual(Object.keys(printedList), [
      'node',
      'env',
      'os',
      'browsers',
      'interpreters',
    ]);

    return;
  });

  it('prints every category when no flag is set', async () => {
    const options: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_Options = {};
    const runner: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_Runner = CliUtilityVersion;
    const printSpy: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintSpy = vi.spyOn(runner as Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintTarget, 'print').mockReturnValue(undefined);

    await CliUtilityVersion.run(options);

    const printedList: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintedList = (printSpy['mock']['calls'][0] ?? [])[0] ?? {};

    deepStrictEqual(Object.keys(printedList), [
      'node',
      'env',
      'os',
      'browsers',
      'interpreters',
    ]);

    return;
  });

  return;
});
