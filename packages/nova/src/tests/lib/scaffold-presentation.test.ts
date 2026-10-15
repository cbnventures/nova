import {
  ok,
  strictEqual,
} from 'node:assert/strict';

import prompts from 'prompts';
import {
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import {
  LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
  LIB_REGEX_PLACEHOLDER_VITE_FRAMEWORK,
} from '../../lib/regex.js';
import {
  confirmScaffoldPlan,
  createScaffoldProgress,
  reportScaffoldCompletion,
  reportScaffoldPlan,
  resolveDisplayPath,
  resolveScaffoldInstall,
} from '../../lib/scaffold-presentation.js';

import type {
  Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_HonorsInteractiveConfirmation_Accepted,
  Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_HonorsInteractiveConfirmation_Rejected,
  Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_SkipsPromptsForAutomationAndPreviews_Automated,
  Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_SkipsPromptsForAutomationAndPreviews_Preview,
  Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_ActiveOutput,
  Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_CompletedOutput,
  Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress,
  Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Output,
  Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress,
  Tests_Lib_ScaffoldPresentation_Prompts_MockModule,
  Tests_Lib_ScaffoldPresentation_Questions,
  Tests_Lib_ScaffoldPresentation_ReportScaffoldCompletion_ReportsCopyableWorkspaceCommands_Output,
  Tests_Lib_ScaffoldPresentation_ReportScaffoldCompletion_ReportsDryRunWithoutCommands_Output,
  Tests_Lib_ScaffoldPresentation_ReportScaffoldPlan_ReportsResolvedChoicesAndHidesInactiveChoices_Output,
  Tests_Lib_ScaffoldPresentation_ResolveDisplayPath_UsesADotForTheCurrentDirectory_CurrentDirectory,
  Tests_Lib_ScaffoldPresentation_ResolveScaffoldInstall_DefaultsToInstall_Result,
  Tests_Lib_ScaffoldPresentation_ResolveScaffoldInstall_HonorsExplicitChoices_ExplicitNo,
  Tests_Lib_ScaffoldPresentation_ResolveScaffoldInstall_HonorsExplicitChoices_ExplicitYes,
} from '../../types/tests/lib/scaffold-presentation.test.d.ts';

vi.mock('prompts', () => {
  return {
    default: vi.fn(),
  } satisfies Tests_Lib_ScaffoldPresentation_Prompts_MockModule;
});

/**
 * Tests - Lib - Scaffold Presentation - Questions.
 *
 * Provides an active option and an inactive dependent option for presentation
 * coverage.
 *
 * @since 0.31.0
 */
const questions: Tests_Lib_ScaffoldPresentation_Questions = [
  {
    choices: [
      {
        title: 'React',
        description: 'React application',
        value: 'react',
      },
      {
        title: 'Vanilla',
        description: 'Browser application',
        value: 'vanilla',
      },
    ],
    flag: '--framework',
    initial: 0,
    message: 'Select a framework:',
    name: 'framework',
    placeholder: LIB_REGEX_PLACEHOLDER_VITE_FRAMEWORK,
  },
  {
    choices: [{
      title: 'Docker',
      description: 'Container packaging',
      value: 'docker',
    }],
    dependsOn: {
      name: 'framework',
      values: ['vanilla'],
    },
    flag: '--packaging',
    initial: 0,
    message: 'Select packaging:',
    name: 'packaging',
    placeholder: LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
  },
];

afterEach(() => {
  vi.useRealTimers();

  vi.mocked(prompts).mockReset();

  return;
});

/**
 * Tests - Lib - Scaffold Presentation - Confirm Scaffold Plan.
 *
 * @since 0.31.0
 */
describe('confirmScaffoldPlan', () => {
  it('honors interactive confirmation', async () => {
    vi.mocked(prompts)
      .mockResolvedValueOnce({ confirmed: true })
      .mockResolvedValueOnce({ confirmed: false });

    const accepted: Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_HonorsInteractiveConfirmation_Accepted = await confirmScaffoldPlan(false, false);
    const rejected: Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_HonorsInteractiveConfirmation_Rejected = await confirmScaffoldPlan(false, false);

    strictEqual(accepted, true);
    strictEqual(rejected, false);
    strictEqual(vi.mocked(prompts).mock.calls.length, 2);

    return;
  });

  it('skips prompts for automation and previews', async () => {
    const automated: Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_SkipsPromptsForAutomationAndPreviews_Automated = await confirmScaffoldPlan(true, false);
    const preview: Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_SkipsPromptsForAutomationAndPreviews_Preview = await confirmScaffoldPlan(false, true);

    strictEqual(automated, true);
    strictEqual(preview, true);
    strictEqual(vi.mocked(prompts).mock.calls.length, 0);

    return;
  });

  return;
});

/**
 * Tests - Lib - Scaffold Presentation - Resolve Scaffold Install.
 *
 * @since 0.31.0
 */
describe('resolveScaffoldInstall', () => {
  it('honors explicit choices', () => {
    const explicitYes: Tests_Lib_ScaffoldPresentation_ResolveScaffoldInstall_HonorsExplicitChoices_ExplicitYes = resolveScaffoldInstall(true);
    const explicitNo: Tests_Lib_ScaffoldPresentation_ResolveScaffoldInstall_HonorsExplicitChoices_ExplicitNo = resolveScaffoldInstall(false);

    strictEqual(explicitYes, true);
    strictEqual(explicitNo, false);
    strictEqual(vi.mocked(prompts).mock.calls.length, 0);

    return;
  });

  it('defaults to install', () => {
    const result: Tests_Lib_ScaffoldPresentation_ResolveScaffoldInstall_DefaultsToInstall_Result = resolveScaffoldInstall(undefined);

    strictEqual(result, true);
    strictEqual(vi.mocked(prompts).mock.calls.length, 0);

    return;
  });

  return;
});

/**
 * Tests - Lib - Scaffold Presentation - Report Scaffold Plan.
 *
 * @since 0.31.0
 */
describe('reportScaffoldPlan', () => {
  it('reports resolved choices and hides inactive choices', () => {
    reportScaffoldPlan({
      additionalOptions: [{
        flag: '--application-id',
        value: 'io.example.application',
      }],
      answers: new Map([
        [
          'framework',
          'react',
        ],
        [
          'packaging',
          'docker',
        ],
      ]),
      displayName: 'Vite',
      destination: 'apps/web',
      mode: 'workspace',
      project: 'example-project',
      questions,
      workspacePackageName: 'example-project-web',
    });

    const output: Tests_Lib_ScaffoldPresentation_ReportScaffoldPlan_ReportsResolvedChoicesAndHidesInactiveChoices_Output = vi.mocked(process.stdout.write).mock.calls.map((call) => String(call[0])).join('');

    ok(output.includes('Nova × Vite'));
    ok(output.includes('Existing monorepo'));
    ok(output.includes('example-project-web'));
    ok(output.includes('apps/web'));
    ok(output.includes('--framework'));
    ok(output.includes('React'));
    ok(output.includes('--application-id'));
    ok(output.includes('io.example.application'));
    ok(output.includes('--packaging') === false);
    ok(output.includes('╭') === false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Scaffold Presentation - Report Scaffold Completion.
 *
 * @since 0.31.0
 */
describe('reportScaffoldCompletion', () => {
  it('reports copyable workspace commands', () => {
    reportScaffoldCompletion({
      completionNotes: [
        'Create a Discord application and bot: https://discord.com/developers/applications',
        'From the application Installation page, add the bot to a server with the "bot" scope.',
        'Set DISCORD_TOKEN in ".env".',
      ],
      dependenciesInstalled: false,
      displayName: 'Next.js',
      dryRun: false,
      packageManager: 'npm',
      primaryScript: 'dev',
      projectRoot: 'example-project',
      shouldConfigure: true,
      workspacePackageName: 'example-project-web',
    });

    const output: Tests_Lib_ScaffoldPresentation_ReportScaffoldCompletion_ReportsCopyableWorkspaceCommands_Output = vi.mocked(process.stdout.write).mock.calls.map((call) => String(call[0])).join('');

    ok(output.includes('cd "example-project"'));
    ok(output.includes('Setup required:'));
    ok(output.includes('https://discord.com/developers/applications'));
    ok(output.includes('"bot" scope'));
    ok(output.includes('DISCORD_TOKEN'));
    ok(output.includes('npm install'));
    ok(output.includes('nova utility configure'));
    ok(output.includes('npm run check --workspace "example-project-web"'));
    ok(output.includes('npm run dev --workspace "example-project-web"'));

    return;
  });

  it('reports dry run without commands', () => {
    reportScaffoldCompletion({
      dependenciesInstalled: false,
      displayName: 'Astro',
      dryRun: true,
      packageManager: 'npm',
      primaryScript: 'dev',
      projectRoot: 'example-project',
      workspacePackageName: 'example-project-web',
    });

    const output: Tests_Lib_ScaffoldPresentation_ReportScaffoldCompletion_ReportsDryRunWithoutCommands_Output = vi.mocked(process.stdout.write).mock.calls.map((call) => String(call[0])).join('');

    ok(output.startsWith('\n') === false);
    ok(output.includes('No files were written.'));
    ok(output.includes('npm install') === false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Scaffold Presentation - Create Scaffold Progress.
 *
 * @since 0.31.0
 */
describe('createScaffoldProgress', () => {
  it('reports plain durable stages outside a terminal', async () => {
    const progress: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress = createScaffoldProgress(2, false);

    progress.start('Writing workspace files', 'apps/web');

    await progress.complete();

    progress.start('Registering workspace');

    await progress.complete();

    progress.finish('Vite scaffold ready');

    const output: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Output = vi.mocked(process.stdout.write).mock.calls.map((call) => String(call[0])).join('');

    ok(output.includes('Step 1/2'));
    ok(output.includes('Writing workspace files'));
    ok(output.includes('apps/web'));
    ok(output.includes('Step 2/2'));
    ok(output.includes('2/2 Vite scaffold ready'));

    return;
  });

  it('advances only after a stage completes', async () => {
    vi.useFakeTimers();

    const progress: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress = createScaffoldProgress(4, true);

    progress.start('Preparing monorepo root');

    await Promise.all([
      progress.complete(),
      vi.advanceTimersByTimeAsync(500),
    ]);

    progress.start('Writing workspace');

    await Promise.all([
      progress.complete(),
      vi.advanceTimersByTimeAsync(500),
    ]);

    progress.start('Registering workspace');

    await Promise.all([
      progress.complete(),
      vi.advanceTimersByTimeAsync(500),
    ]);

    vi.mocked(process.stdout.write).mockClear();

    progress.start('Installing dependencies with npm');

    const activeOutput: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_ActiveOutput = vi.mocked(process.stdout.write).mock.calls.map((call) => String(call[0])).join('');

    ok(activeOutput.includes('3/4'));
    ok(activeOutput.includes('4/4') === false);

    await Promise.all([
      progress.complete(),
      vi.advanceTimersByTimeAsync(500),
    ]);

    progress.finish('Next.js scaffold ready');

    const completedOutput: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_CompletedOutput = vi.mocked(process.stdout.write).mock.calls.map((call) => String(call[0])).join('');

    ok(completedOutput.includes('4/4'));
    ok(completedOutput.includes('Next.js scaffold ready'));

    return;
  });

  return;
});

/**
 * Tests - Lib - Scaffold Presentation - Resolve Display Path.
 *
 * @since 0.31.0
 */
describe('resolveDisplayPath', () => {
  it('uses a dot for the current directory', () => {
    const currentDirectory: Tests_Lib_ScaffoldPresentation_ResolveDisplayPath_UsesADotForTheCurrentDirectory_CurrentDirectory = process.cwd();

    strictEqual(resolveDisplayPath(currentDirectory, currentDirectory), '.');

    return;
  });

  return;
});
