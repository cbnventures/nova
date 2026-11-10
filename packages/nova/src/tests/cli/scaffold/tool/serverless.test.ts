import { strictEqual } from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
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
import { getScaffoldVersion } from '../../../../lib/scaffold-versions.js';

import type {
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_ConfigPath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_OutputPath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_WorkspaceConfig,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_WranglerToml,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_ApiSource,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_OutputPath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_PackageJson,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_VercelConfig,
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
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_IndexSource,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_LandingPageSource,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_NovaConfig,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_NovaConfigPath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_PackageJson,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_PackageJsonPath,
  Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_ProjectDirectory,
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
 * @since 0.32.0
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
    const vercelConfig: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_VercelConfig = await readFile(join(workspacePath, 'vercel.json'), 'utf-8');

    let wranglerExists: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_WranglerExists = true;

    try {
      await access(join(workspacePath, 'wrangler.toml'));
    } catch {
      wranglerExists = false;
    }

    strictEqual(apiSource.includes('return landingPage'), true);
    strictEqual(apiSource.includes('message: \'Not found\''), true);
    strictEqual(packageJson.includes(`"vercel": "${getScaffoldVersion('vercel')}"`), true);
    strictEqual(vercelConfig.includes('"destination": "/api?path=:path*"'), true);
    strictEqual(wranglerExists, false);

    return;
  });

  it('uses the configured repository on the homepage', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_ProjectDirectory = join(sandboxRoot, 'repository-homepage');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_PackageJson = JSON.stringify({
      name: 'repository-homepage-project',
      workspaces: ['packages/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_PackageJsonPath = join(projectDirectory, 'package.json');
    const novaConfig: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_NovaConfig = JSON.stringify({
      project: {
        name: {
          slug: 'repository-homepage',
          title: 'Repository Homepage',
        },
      },
      urls: {
        repository: 'https://github.com/example/serverless',
      },
      workspaces: {
        './': {
          name: 'repository-homepage-project',
          role: 'project',
          policy: 'freezable',
        },
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');
    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldToolServerless.run({
      install: false,
      nonInteractive: true,
      output: './packages/gateway',
      target: 'cloudflare-workers',
      workspaceName: 'gateway',
    });

    const indexSource: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_IndexSource = await readFile(join(projectDirectory, 'packages', 'gateway', 'src', 'worker', 'index.ts'), 'utf-8');
    const landingPageSource: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_UsesTheConfiguredRepositoryOnTheHomepage_LandingPageSource = await readFile(join(projectDirectory, 'packages', 'gateway', 'src', 'worker', 'landing-page.ts'), 'utf-8');

    strictEqual(indexSource.includes('landingPage(\'repository-homepage\', \'https://github.com/example/serverless\', request.method === \'HEAD\')'), true);
    strictEqual(indexSource.includes('[__PROJECT_REPOSITORY__]'), false);
    strictEqual(landingPageSource.includes('class="button ghost"'), true);
    strictEqual(landingPageSource.includes('target="_blank" rel="noopener noreferrer"'), true);

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
