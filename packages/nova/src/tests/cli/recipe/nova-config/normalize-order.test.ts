import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  afterEach,
  describe,
  it,
} from 'vitest';

import { Runner as CliRecipeNovaConfigNormalizeOrder } from '../../../../cli/recipe/nova-config/normalize-order.js';

import type {
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Config,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ConfigPath,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Keys,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Output,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_PackageJsonPath,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ParsedOutput,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ProjectDirectory,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OriginalCwd,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_SandboxRoot,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_TemporaryBase,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_TemporaryDirectory,
} from '../../../../types/tests/cli/recipe/nova-config/normalize-order.test.d.ts';

/**
 * Tests - CLI - Recipe - Nova Config - Normalize Order - Run.
 *
 * @since 0.33.0
 */
describe.sequential('CliRecipeNovaConfigNormalizeOrder.run', async () => {
  const originalCwd: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_TemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  afterEach(() => {
    process.exitCode = undefined;

    return;
  });

  it('orders known sections while preserving nested and unknown values', async () => {
    const projectDirectory: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ProjectDirectory = join(sandboxRoot, 'project');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, '{"name":"test-project"}\n', 'utf-8');

    const configPath: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ConfigPath = join(projectDirectory, 'nova.config.json');
    const config: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Config = {
      settings: {
        custom: [
          'keep',
          'nested',
          'values',
        ],
      },
      experimentalFirst: {
        enabled: true,
      },
      urls: {
        homepage: 'https://www.example.com',
      },
      recipes: {
        'nova-config': {
          'normalize-order': {
            enabled: true,
          },
        },
      },
      project: {
        name: {
          slug: 'test-project',
        },
      },
      workflows: [],
      experimentalSecond: 'unchanged',
    };

    await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeNovaConfigNormalizeOrder.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Output = await readFile(configPath, 'utf-8');
    const parsedOutput: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ParsedOutput = JSON.parse(output) as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ParsedOutput;
    const keys: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Keys = Object.keys(parsedOutput);

    deepStrictEqual(keys, [
      'project',
      'workflows',
      'urls',
      'recipes',
      'settings',
      'experimentalFirst',
      'experimentalSecond',
    ]);
    deepStrictEqual(parsedOutput['settings'], config['settings']);
    deepStrictEqual(parsedOutput['experimentalFirst'], config['experimentalFirst']);
    strictEqual(parsedOutput['experimentalSecond'], config['experimentalSecond']);

    return;
  });

  return;
});
