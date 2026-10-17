import { strictEqual } from 'node:assert/strict';
import {
  access,
  mkdtemp,
  readFile,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import prompts from 'prompts';
import {
  afterAll,
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliScaffoldToolServerless } from '../../../../cli/scaffold/tool/serverless.js';

import type {
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_ConfigPath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_OutputPath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_WorkspaceConfig,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_WranglerToml,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_ApiSource,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_OutputPath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_PackageJson,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_WorkspacePath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_WranglerExists,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_OriginalCwd,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_RejectsAnInvalidTargetBeforeWriting_Exists,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_RejectsAnInvalidTargetBeforeWriting_OutputPath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ResolvesTheTargetInteractivelyBeforeConfirmingTheScaffold_ApiSource,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ResolvesTheTargetInteractivelyBeforeConfirmingTheScaffold_OutputPath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_SandboxRoot,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_TemporaryBase,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_TemporaryDirectory,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ValidatesDryRunWithoutWriting_Exists,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ValidatesDryRunWithoutWriting_OutputPath,
  Tests_Cli_Scaffold_Tool_Serverless_Prompts_MockModule,
} from '../../../../types/tests/cli/scaffold/tool/serverless.test.d.ts';

vi.mock('prompts', () => {
  return {
    default: vi.fn(),
  } satisfies Tests_Cli_Scaffold_Tool_Serverless_Prompts_MockModule;
});

/**
 * Tests - CLI - Scaffold - Tool - Serverless - Run.
 *
 * @since UNRELEASED
 */
describe.sequential('CliScaffoldToolServerless.run', async () => {
  const originalCwd: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_TemporaryBase = join(temporaryDirectory, 'nova-serverless-test-');
  const sandboxRoot: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      force: true,
      recursive: true,
    });

    return;
  });

  afterEach(() => {
    process.chdir(originalCwd);
    process.exitCode = undefined;

    vi.mocked(prompts).mockReset();

    return;
  });

  it('creates the default Cloudflare Workers target as a distributable tool', async () => {
    const outputPath: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_OutputPath = join(sandboxRoot, 'cloudflare-target');

    process.chdir(sandboxRoot);

    await CliScaffoldToolServerless.run({
      install: false,
      name: 'cloudflare-target',
      nonInteractive: true,
      output: outputPath,
      workspaceName: 'gateway',
    });

    const wranglerToml: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_WranglerToml = await readFile(join(outputPath, 'packages', 'gateway', 'wrangler.toml'), 'utf-8');
    const configPath: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_ConfigPath = join(outputPath, 'nova.config.json');
    const config: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config = JSON.parse(await readFile(configPath, 'utf-8')) as Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config;
    const workspaceConfig: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_WorkspaceConfig = config['workspaces']['./packages/gateway'];

    if (workspaceConfig === undefined) {
      throw new Error('The generated serverless tool should be registered in nova.config.json.');
    }

    strictEqual(wranglerToml.includes('name = "cloudflare-target-tool-gateway"'), true);
    strictEqual(workspaceConfig['name'], 'cloudflare-target-tool-gateway');
    strictEqual(workspaceConfig['role'], 'tool');
    strictEqual(workspaceConfig['policy'], 'distributable');

    return;
  });

  it('creates the Vercel Functions target without Cloudflare files', async () => {
    const outputPath: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_OutputPath = join(sandboxRoot, 'vercel-target');

    process.chdir(sandboxRoot);

    await CliScaffoldToolServerless.run({
      install: false,
      name: 'vercel-target',
      nonInteractive: true,
      output: outputPath,
      target: 'vercel-functions',
      workspaceName: 'gateway',
    });

    const workspacePath: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_WorkspacePath = join(outputPath, 'packages', 'gateway');
    const apiSource: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_ApiSource = await readFile(join(workspacePath, 'api', 'index.ts'), 'utf-8');
    const packageJson: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_PackageJson = await readFile(join(workspacePath, 'package.json'), 'utf-8');

    let wranglerExists: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_WranglerExists = true;

    try {
      await access(join(workspacePath, 'wrangler.toml'));
    } catch {
      wranglerExists = false;
    }

    strictEqual(apiSource.includes('export function GET'), true);
    strictEqual(packageJson.includes('"vercel": "64.4.0"'), true);
    strictEqual(wranglerExists, false);

    return;
  });

  it('resolves the target interactively before confirming the scaffold', async () => {
    const outputPath: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ResolvesTheTargetInteractivelyBeforeConfirmingTheScaffold_OutputPath = join(sandboxRoot, 'interactive-target');

    vi.mocked(prompts)
      .mockResolvedValueOnce({ target: 'vercel-functions' })
      .mockResolvedValueOnce({ confirmed: true });

    process.chdir(sandboxRoot);

    await CliScaffoldToolServerless.run({
      install: false,
      name: 'interactive-target',
      output: outputPath,
      workspaceName: 'serverless',
    });

    const apiSource: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ResolvesTheTargetInteractivelyBeforeConfirmingTheScaffold_ApiSource = await readFile(join(outputPath, 'packages', 'serverless', 'api', 'index.ts'), 'utf-8');

    strictEqual(apiSource.includes('Vercel Function'), true);
    strictEqual(vi.mocked(prompts).mock.calls.length, 2);

    return;
  });

  it('rejects an invalid target before writing', async () => {
    const outputPath: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_RejectsAnInvalidTargetBeforeWriting_OutputPath = join(sandboxRoot, 'invalid-target');

    process.chdir(sandboxRoot);

    await CliScaffoldToolServerless.run({
      install: false,
      name: 'invalid-target',
      nonInteractive: true,
      output: outputPath,
      target: 'unsupported',
      workspaceName: 'serverless',
    });

    let exists: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_RejectsAnInvalidTargetBeforeWriting_Exists = true;

    try {
      await access(outputPath);
    } catch {
      exists = false;
    }

    strictEqual(process.exitCode, 1);
    strictEqual(exists, false);

    return;
  });

  it('validates dry run without writing', async () => {
    const outputPath: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ValidatesDryRunWithoutWriting_OutputPath = join(sandboxRoot, 'dry-run');

    process.chdir(sandboxRoot);

    await CliScaffoldToolServerless.run({
      dryRun: true,
      install: false,
      name: 'dry-run',
      nonInteractive: true,
      output: outputPath,
      target: 'cloudflare-workers',
      workspaceName: 'serverless',
    });

    let exists: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ValidatesDryRunWithoutWriting_Exists = true;

    try {
      await access(outputPath);
    } catch {
      exists = false;
    }

    strictEqual(process.exitCode, undefined);
    strictEqual(exists, false);

    return;
  });

  return;
});
