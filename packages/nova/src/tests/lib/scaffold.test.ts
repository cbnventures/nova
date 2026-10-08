import {
  deepStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
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

import {
  LIB_REGEX_PLACEHOLDER_DOCKER_ARCHITECTURES,
  LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
  LIB_REGEX_PLACEHOLDER_DOCKER_PUBLISH,
  LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET,
} from '../../lib/regex.js';
import {
  detectMonorepoContext,
  normalizeWorkspaceRelativePath,
  promptScaffoldOptions,
  resolveTemplateAnswers,
  resolveWorkspacePackageName,
} from '../../lib/scaffold.js';

import type {
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_PackageJsonPath,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_ProjectDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_ResolvedDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_Result,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ProjectDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ResolvedDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_Result,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageContents,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJson,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJsonPath,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ProjectDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ResolvedDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_Result,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageContents,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJson,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJsonPath,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ProjectDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ResolvedDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_Result,
  Tests_Lib_Scaffold_DetectMonorepoContext_OriginalCwd,
  Tests_Lib_Scaffold_DetectMonorepoContext_SandboxRoot,
  Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryPrefix,
  Tests_Lib_Scaffold_OptionalTemplateQuestions,
  Tests_Lib_Scaffold_Prompts_MockModule,
  Tests_Lib_Scaffold_PromptScaffoldOptions_UsesCompleteValuesWithoutPrompting_Result,
  Tests_Lib_Scaffold_ResolveTemplateAnswers_PromptsForAMissingInteractiveValue_Result,
  Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsAMissingNonInteractiveValue_Result,
  Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsAnInvalidProvidedValue_Result,
  Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsValuesPassedToBooleanOnlyFlags_Result,
  Tests_Lib_Scaffold_ResolveTemplateAnswers_ResolvesBooleanFlagsAndActiveDependentChoices_Result,
  Tests_Lib_Scaffold_ResolveTemplateAnswers_UsesAValidNonInteractiveValueWithoutPrompting_Result,
  Tests_Lib_Scaffold_ResolveTemplateAnswers_UsesNonInteractiveDefaultsWithoutRequiringOptionalFlags_Result,
  Tests_Lib_Scaffold_TemplateQuestions,
} from '../../types/tests/lib/scaffold.test.d.ts';

vi.mock('prompts', () => {
  return {
    default: vi.fn(),
  } satisfies Tests_Lib_Scaffold_Prompts_MockModule;
});

/**
 * Tests - Lib - Scaffold - Template Questions.
 *
 * Provides one representative scaffold-specific choice contract for exercising
 * interactive and non-interactive resolution through the shared pipeline.
 *
 * @since 0.26.0
 */
const templateQuestions: Tests_Lib_Scaffold_TemplateQuestions = [{
  choices: [
    {
      title: 'Foundry',
      description: 'Default preset',
      value: 'foundry',
    },
    {
      title: 'Signal',
      description: 'Compact preset',
      value: 'signal',
    },
  ],
  flag: '--preset',
  initial: 0,
  message: 'Select a preset:',
  name: 'preset',
  placeholder: LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET,
}];

/**
 * Tests - Lib - Scaffold - Optional Template Questions.
 *
 * Covers defaults, dependent choices, replacement values, and boolean flags
 * used by framework scaffold options.
 *
 * @since 0.29.0
 */
const optionalTemplateQuestions: Tests_Lib_Scaffold_OptionalTemplateQuestions = [
  {
    choices: [
      {
        title: 'None',
        description: 'No publishing',
        value: 'none',
      },
      {
        title: 'GitHub Container Registry',
        description: 'Publish to GitHub',
        value: 'ghcr',
      },
    ],
    defaultValue: 'none',
    flag: '--publish',
    initial: 0,
    message: 'Select publishing:',
    name: 'publish',
    placeholder: LIB_REGEX_PLACEHOLDER_DOCKER_PUBLISH,
  },
  {
    choices: [
      {
        title: 'Both',
        description: 'Publish both architectures',
        replacement: 'linux/amd64,linux/arm64',
        value: 'amd64,arm64',
      },
      {
        title: 'ARM64',
        description: 'Publish ARM64',
        replacement: 'linux/arm64',
        value: 'arm64',
      },
    ],
    defaultValue: 'amd64,arm64',
    dependsOn: {
      name: 'publish',
      values: ['ghcr'],
    },
    flag: '--architectures',
    initial: 0,
    message: 'Select architectures:',
    name: 'architectures',
    placeholder: LIB_REGEX_PLACEHOLDER_DOCKER_ARCHITECTURES,
  },
  {
    choices: [
      {
        title: 'No',
        description: 'Do not add Docker',
        replacement: 'false',
        value: 'disabled',
      },
      {
        title: 'Yes',
        description: 'Add Docker',
        replacement: 'true',
        value: 'enabled',
      },
    ],
    defaultValue: 'disabled',
    flag: '--docker-image',
    flagValue: 'enabled',
    initial: 0,
    message: 'Add Docker?',
    name: 'dockerImage',
    placeholder: LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
  },
];

afterEach(() => {
  vi.mocked(prompts).mockReset();

  process.exitCode = undefined;

  return;
});

/**
 * Tests - Lib - Scaffold - Workspace Contract.
 *
 * @since 0.26.0
 */
describe('workspace contract', () => {
  it('derives role-based package names', () => {
    strictEqual(resolveWorkspacePackageName('my-project', 'web', 'app'), 'my-project-app-web');
    strictEqual(resolveWorkspacePackageName('my-project', 'website', 'docs'), 'my-project-docs');
    strictEqual(resolveWorkspacePackageName('my-project', 'my-library', 'package'), 'my-library');

    return;
  });

  it('normalizes only workspace paths inside the root', () => {
    strictEqual(normalizeWorkspaceRelativePath('/project', '/project/apps/web'), './apps/web');
    strictEqual(normalizeWorkspaceRelativePath('/project', '/project'), undefined);
    strictEqual(normalizeWorkspaceRelativePath('/project', '/outside/web'), undefined);

    return;
  });

  return;
});

/**
 * Tests - Lib - Scaffold - Resolve Template Answers.
 *
 * @since 0.26.0
 */
describe('resolveTemplateAnswers', () => {
  it('uses a valid non-interactive value without prompting', async () => {
    const result: Tests_Lib_Scaffold_ResolveTemplateAnswers_UsesAValidNonInteractiveValueWithoutPrompting_Result = await resolveTemplateAnswers({ preset: 'signal' }, templateQuestions, true);

    ok(result !== undefined);
    strictEqual(result['answers'].get('preset'), 'signal');
    strictEqual(result['replacements'].get(LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET), 'signal');
    strictEqual(vi.mocked(prompts).mock.calls.length, 0);

    return;
  });

  it('prompts for a missing interactive value', async () => {
    vi.mocked(prompts).mockResolvedValueOnce({ preset: 'foundry' });

    const result: Tests_Lib_Scaffold_ResolveTemplateAnswers_PromptsForAMissingInteractiveValue_Result = await resolveTemplateAnswers({}, templateQuestions, false);

    ok(result !== undefined);
    strictEqual(result['answers'].get('preset'), 'foundry');
    strictEqual(result['replacements'].get(LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET), 'foundry');
    strictEqual(vi.mocked(prompts).mock.calls.length, 1);

    return;
  });

  it('rejects a missing non-interactive value', async () => {
    const result: Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsAMissingNonInteractiveValue_Result = await resolveTemplateAnswers({}, templateQuestions, true);

    strictEqual(result, undefined);
    strictEqual(process.exitCode, 1);
    strictEqual(vi.mocked(prompts).mock.calls.length, 0);

    return;
  });

  it('rejects an invalid provided value', async () => {
    const result: Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsAnInvalidProvidedValue_Result = await resolveTemplateAnswers({ preset: 'unknown' }, templateQuestions, false);

    strictEqual(result, undefined);
    strictEqual(process.exitCode, 1);
    strictEqual(vi.mocked(prompts).mock.calls.length, 0);

    return;
  });

  it('uses non-interactive defaults without requiring optional flags', async () => {
    const result: Tests_Lib_Scaffold_ResolveTemplateAnswers_UsesNonInteractiveDefaultsWithoutRequiringOptionalFlags_Result = await resolveTemplateAnswers({}, optionalTemplateQuestions, true);

    ok(result !== undefined);
    strictEqual(result['answers'].get('publish'), 'none');
    strictEqual(result['answers'].get('architectures'), 'amd64,arm64');
    strictEqual(result['answers'].get('dockerImage'), 'disabled');
    strictEqual(result['replacements'].get(LIB_REGEX_PLACEHOLDER_DOCKER_ARCHITECTURES), 'linux/amd64,linux/arm64');
    strictEqual(result['replacements'].get(LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE), 'false');
    strictEqual(vi.mocked(prompts).mock.calls.length, 0);

    return;
  });

  it('resolves boolean flags and active dependent choices', async () => {
    const result: Tests_Lib_Scaffold_ResolveTemplateAnswers_ResolvesBooleanFlagsAndActiveDependentChoices_Result = await resolveTemplateAnswers({
      architectures: 'arm64',
      dockerImage: true,
      publish: 'ghcr',
    }, optionalTemplateQuestions, true);

    ok(result !== undefined);
    strictEqual(result['answers'].get('publish'), 'ghcr');
    strictEqual(result['answers'].get('architectures'), 'arm64');
    strictEqual(result['answers'].get('dockerImage'), 'enabled');
    strictEqual(result['replacements'].get(LIB_REGEX_PLACEHOLDER_DOCKER_ARCHITECTURES), 'linux/arm64');
    strictEqual(result['replacements'].get(LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE), 'true');

    return;
  });

  it('rejects values passed to boolean-only flags', async () => {
    const result: Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsValuesPassedToBooleanOnlyFlags_Result = await resolveTemplateAnswers({
      dockerImage: 'yes',
    }, optionalTemplateQuestions, true);

    strictEqual(result, undefined);
    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});

/**
 * Tests - Lib - Scaffold - Prompt Scaffold Options.
 *
 * @since 0.26.0
 */
describe('promptScaffoldOptions', () => {
  it('uses complete values without prompting', async () => {
    const result: Tests_Lib_Scaffold_PromptScaffoldOptions_UsesCompleteValuesWithoutPrompting_Result = await promptScaffoldOptions({ context: 'monorepo' }, {
      name: 'my-project',
      output: './my-project',
      typeName: 'vite',
      workspaceBaseDirectory: 'apps',
      workspaceName: 'web',
    });

    deepStrictEqual(result, {
      mode: 'monorepo',
      name: 'my-project',
      outputDirectory: join(process.cwd(), 'my-project'),
      workspaceName: 'web',
    });
    strictEqual(vi.mocked(prompts).mock.calls.length, 0);

    return;
  });

  return;
});

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context.
 *
 * @since 0.15.0
 */
describe('detectMonorepoContext', async () => {
  const originalCwd: Tests_Lib_Scaffold_DetectMonorepoContext_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Lib_Scaffold_DetectMonorepoContext_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('detects monorepo mode in empty directory', async () => {
    const projectDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ProjectDirectory = join(sandboxRoot, 'empty-dir');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    const resolvedDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ResolvedDirectory = process.cwd();

    const result: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_Result = await detectMonorepoContext(resolvedDirectory);

    deepStrictEqual(result, { context: 'monorepo' });

    return;
  });

  it('detects invalid package.json before scaffolding', async () => {
    const projectDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_ProjectDirectory = join(sandboxRoot, 'invalid-package-json');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, '{', 'utf-8');

    process.chdir(projectDirectory);

    const resolvedDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_ResolvedDirectory = process.cwd();
    const result: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_Result = await detectMonorepoContext(resolvedDirectory);

    deepStrictEqual(result, {
      context: 'invalid',
      reason: 'The current package.json contains invalid JSON.',
    });

    return;
  });

  it('detects workspace mode at monorepo root', async () => {
    const projectDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ProjectDirectory = join(sandboxRoot, 'monorepo-root');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJson = JSON.stringify({
      name: 'test-project',
      workspaces: [
        'apps/*',
        'packages/*',
      ],
    }, null, 2);
    const packageContents: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageContents = `${packageJson}\n`;

    const packageJsonPath: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, packageContents, 'utf-8');

    process.chdir(projectDirectory);

    const resolvedDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ResolvedDirectory = process.cwd();

    const result: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_Result = await detectMonorepoContext(resolvedDirectory);

    strictEqual(result['context'], 'workspace');

    return;
  });

  it('detects standalone project', async () => {
    const projectDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJson = JSON.stringify({
      name: 'standalone-project',
    }, null, 2);
    const packageContents: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageContents = `${packageJson}\n`;

    const packageJsonPath: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, packageContents, 'utf-8');

    process.chdir(projectDirectory);

    const resolvedDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ResolvedDirectory = process.cwd();

    const result: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_Result = await detectMonorepoContext(resolvedDirectory);

    deepStrictEqual(result, { context: 'standalone' });

    return;
  });

  return;
});
