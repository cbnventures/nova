import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';
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

import { Runner as CliScaffoldAppApple } from '../../../../cli/scaffold/app/apple.js';

import type {
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_AcceptsInteractiveBundleIdentifier_OutputPath,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_AcceptsInteractiveBundleIdentifier_ProjectYml,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_OriginalCwd,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_PreservesDerivedBundleIdentifierDefault_OutputPath,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_PreservesDerivedBundleIdentifierDefault_ProjectYml,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidDerivedBundleIdentifierBeforeWriting_Exists,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidDerivedBundleIdentifierBeforeWriting_OutputPath,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_CurrentNovaConfig,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_InvalidBundleIdentifiers,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_NovaConfig,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_NovaConfigPath,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_OutputExistence,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_OutputPaths,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_PackageJson,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_PackageJsonPath,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_RootDirectory,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_Gitignore,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_IosMetadata,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_MacosMetadata,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_OutputPath,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_ProjectYml,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_SandboxRoot,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_TemporaryBase,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_TemporaryDirectory,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_ValidatesDryRunWithoutWriting_Exists,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_ValidatesDryRunWithoutWriting_OutputPath,
  Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_ValidatesDryRunWithoutWriting_ProjectDirectory,
  Tests_Cli_Scaffold_App_Apple_Prompts_MockModule,
} from '../../../../types/tests/cli/scaffold/app/apple.test.d.ts';

vi.mock('prompts', () => {
  return {
    default: vi.fn(),
  } satisfies Tests_Cli_Scaffold_App_Apple_Prompts_MockModule;
});

/**
 * Tests - CLI - Scaffold - App - Apple - Run.
 *
 * @since 0.32.0
 */
describe.sequential('CliScaffoldAppApple.run', async () => {
  const originalCwd: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_TemporaryBase = join(temporaryDirectory, `nova-apple-${'test'}-`);
  const sandboxRoot: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  afterEach(() => {
    process.chdir(originalCwd);
    process.exitCode = undefined;

    vi.mocked(prompts).mockReset();

    return;
  });

  it('accepts interactive bundle identifier', async () => {
    const outputPath: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_AcceptsInteractiveBundleIdentifier_OutputPath = join(sandboxRoot, 'interactive-bundle-id');

    vi.mocked(prompts)
      .mockResolvedValueOnce({ bundleId: 'io.cbnventures.interactive-app' })
      .mockResolvedValueOnce({ confirmed: true });

    process.chdir(sandboxRoot);

    await CliScaffoldAppApple.run({
      install: false,
      name: 'interactive-bundle-id',
      output: outputPath,
      workspaceName: 'apple',
    });

    const projectYml: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_AcceptsInteractiveBundleIdentifier_ProjectYml = await readFile(join(outputPath, 'apps', 'apple', 'project.yml'), 'utf-8');

    strictEqual(projectYml.includes('PRODUCT_BUNDLE_IDENTIFIER: io.cbnventures.interactive-app'), true);
    strictEqual(vi.mocked(prompts).mock.calls.length, 2);

    return;
  });

  it('preserves derived bundle identifier default', async () => {
    const outputPath: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_PreservesDerivedBundleIdentifierDefault_OutputPath = join(sandboxRoot, 'default-bundle-id');

    process.chdir(sandboxRoot);

    await CliScaffoldAppApple.run({
      install: false,
      name: 'default-bundle-id',
      nonInteractive: true,
      output: outputPath,
      workspaceName: 'apple-client',
    });

    const projectYml: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_PreservesDerivedBundleIdentifierDefault_ProjectYml = await readFile(join(outputPath, 'apps', 'apple-client', 'project.yml'), 'utf-8');

    strictEqual(projectYml.includes('PRODUCT_BUNDLE_IDENTIFIER: com.example.apple-client'), true);
    strictEqual(projectYml.includes('PRODUCT_BUNDLE_IDENTIFIER: com.example.apple-client.tests'), true);

    return;
  });

  it('rejects invalid derived bundle identifier before writing', async () => {
    const outputPath: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidDerivedBundleIdentifierBeforeWriting_OutputPath = join(sandboxRoot, 'invalid-derived-bundle-id');

    process.chdir(sandboxRoot);

    await CliScaffoldAppApple.run({
      install: false,
      name: 'invalid-derived-bundle-id',
      nonInteractive: true,
      output: outputPath,
      workspaceName: 'apple_client',
    });

    let exists: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidDerivedBundleIdentifierBeforeWriting_Exists = true;

    try {
      await access(outputPath);
    } catch {
      exists = false;
    }

    strictEqual(process.exitCode, 1);
    strictEqual(exists, false);

    return;
  });

  it('rejects invalid values before writing or registration', async () => {
    const rootDirectory: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_RootDirectory = join(sandboxRoot, 'invalid-values-root');

    await mkdir(rootDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_PackageJson = `${JSON.stringify({
      name: 'invalid-values-root',
      packageManager: 'npm@11.6.0',
      private: true,
      workspaces: ['apps/*'],
    }, null, 2)}\n`;
    const packageJsonPath: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_PackageJsonPath = join(rootDirectory, 'package.json');
    const novaConfig: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_NovaConfig = `${JSON.stringify({
      project: {
        name: {
          slug: 'invalid-values-root',
        },
      },
      workspaces: {},
    }, null, 2)}\n`;
    const novaConfigPath: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_NovaConfigPath = join(rootDirectory, 'nova.config.json');

    await Promise.all([
      writeFile(packageJsonPath, packageJson, 'utf-8'),
      writeFile(novaConfigPath, novaConfig, 'utf-8'),
    ]);

    const invalidBundleIdentifiers: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_InvalidBundleIdentifiers = [
      ' io.cbnventures.app',
      'io.cbnventures_app',
      'io..app',
      '.io.app',
      'io.app.',
      'io.cbnventures/app',
    ];
    const outputPaths: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_OutputPaths = invalidBundleIdentifiers.map((_invalidBundleIdentifier, index) => join(rootDirectory, 'apps', `invalid-${index}`));

    process.chdir(rootDirectory);

    await Promise.all(invalidBundleIdentifiers.map((invalidBundleIdentifier, index) => CliScaffoldAppApple.run({
      bundleId: invalidBundleIdentifier,
      install: false,
      nonInteractive: true,
      output: join(rootDirectory, 'apps', `invalid-${index}`),
      workspaceName: `invalid-${index}`,
    })));

    const outputExistence: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_OutputExistence = await Promise.all(outputPaths.map(async (outputPath) => {
      try {
        await access(outputPath);

        return true;
      } catch {
        return false;
      }
    }));
    const currentNovaConfig: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_CurrentNovaConfig = await readFile(novaConfigPath, 'utf-8');

    strictEqual(process.exitCode, 1);
    deepStrictEqual(outputExistence, [
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    strictEqual(currentNovaConfig, novaConfig);

    return;
  });

  it('renders exact custom bundle identifiers', async () => {
    const outputPath: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_OutputPath = join(sandboxRoot, 'custom-bundle-id');

    process.chdir(sandboxRoot);

    await CliScaffoldAppApple.run({
      bundleId: 'io.cbnventures.branded-short-links',
      install: false,
      name: 'custom-bundle-id',
      nonInteractive: true,
      output: outputPath,
      workspaceName: 'apple',
    });

    const projectYml: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_ProjectYml = await readFile(join(outputPath, 'apps', 'apple', 'project.yml'), 'utf-8');
    const gitignore: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_Gitignore = await readFile(join(outputPath, '.gitignore'), 'utf-8');
    const iosMetadata: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_IosMetadata = await readFile(join(outputPath, 'assets', 'app-store-connect', 'apple', 'metadata', 'ios', 'en-US.json'), 'utf-8');
    const macosMetadata: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_MacosMetadata = await readFile(join(outputPath, 'assets', 'app-store-connect', 'apple', 'metadata', 'macos', 'en-US.json'), 'utf-8');

    strictEqual(projectYml.includes('PRODUCT_BUNDLE_IDENTIFIER: io.cbnventures.branded-short-links'), true);
    strictEqual(projectYml.includes('PRODUCT_BUNDLE_IDENTIFIER: io.cbnventures.branded-short-links.tests'), true);
    strictEqual(projectYml.includes('INFOPLIST_KEY_UILaunchScreen_Generation: YES'), true);
    strictEqual(projectYml.includes('bundleIdPrefix'), false);
    strictEqual(projectYml.includes('com.example'), false);
    strictEqual(gitignore.includes('/assets/'), false);
    strictEqual(iosMetadata.includes('"description": null'), true);
    strictEqual(macosMetadata.includes('"description": null'), true);

    return;
  });

  it('validates dry run without writing', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_ValidatesDryRunWithoutWriting_ProjectDirectory = join(sandboxRoot, 'dry-run-root');

    await mkdir(projectDirectory, { recursive: true });

    const outputPath: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_ValidatesDryRunWithoutWriting_OutputPath = join(projectDirectory, 'dry-run-apple');

    process.chdir(projectDirectory);

    await CliScaffoldAppApple.run({
      bundleId: 'io.cbnventures.dry-run-app',
      dryRun: true,
      install: false,
      name: 'dry-run-apple',
      nonInteractive: true,
      output: outputPath,
      workspaceName: 'apple',
    });

    let exists: Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_ValidatesDryRunWithoutWriting_Exists = true;

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
