import {
  ok,
  strictEqual,
} from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import { Runner as WorkflowsBlueprint } from '../../../../cli/generate/github/workflows-blueprint.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_CheckJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_CheckRun,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_CheckStep,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_EmptyValues,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_Failed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_Passed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_Workflow,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_Generated,
} from '../../../../types/tests/cli/generate/github/workflows-blueprint-parity.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Parity - Check Sponsor Gated Issues.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintParity.checkSponsorGatedIssues', () => {
  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_Entry = {
    template: 'check-sponsor-gated-issues',
    runsOn: 'ubuntu-24.04',
    name: 'sponsor-check',
    triggers: [
      'issue-comment',
      'issues',
    ],
  };

  const environment: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_Environment = {
    workflows: {
      'sponsor-check': {
        prefix: 'SGI_',
      },
    },
  };

  it('reproduces the sponsor-check workflow with prefixed keys byte-for-byte', async () => {
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_Generated = WorkflowsBlueprint.dispatch(entry, {}, environment);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_FixturePath = join(fixturesDir, 'nova-check-sponsor-gated-issues-sponsor-check.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  it('fails the job by name on a placeholder value and lets empty optional values pass', () => {
    const workflow: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_Workflow = WorkflowsBlueprint.buildCheckSponsorGatedIssues(entry, environment);

    WorkflowsBlueprint.addPlaceholderChecks(workflow);

    const checkJob: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_CheckJob = workflow['jobs'][0];

    ok(checkJob !== undefined);

    const checkStep: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_CheckStep = checkJob['steps'][0];

    ok(checkStep !== undefined);

    strictEqual(checkStep['name'], 'Check for Nova placeholders');

    const checkRun: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_CheckRun = checkStep['run'] ?? '';
    const emptyValues: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_EmptyValues = {
      PATH: process.env['PATH'] ?? '',
    };

    // Every optional variable is left unset, which reaches the job as an empty string.
    for (const envEntry of checkStep['env'] ?? []) {
      Reflect.set(emptyValues, envEntry['key'], '');
    }

    const failed: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_Failed = spawnSync('bash', [
      '-c',
      checkRun,
    ], {
      encoding: 'utf-8',
      env: {
        ...emptyValues,
        SGI_PERSONAL_ACCESS_TOKEN: 'NOVA_PLACEHOLDER',
      },
    });

    strictEqual(failed['status'], 1);

    strictEqual(failed['stdout'], '::error::SGI_PERSONAL_ACCESS_TOKEN still holds the Nova placeholder; set its real value in the repository settings.\n');

    const passed: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_FailsTheJobByNameOnAPlaceholderValueAndLetsEmptyOptionalValuesPass_Passed = spawnSync('bash', [
      '-c',
      checkRun,
    ], {
      encoding: 'utf-8',
      env: {
        ...emptyValues,
        SGI_PERSONAL_ACCESS_TOKEN: 'ghp_example',
      },
    });

    strictEqual(passed['status'], 0);

    strictEqual(passed['stdout'], '');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Parity - Lock Schedule Daily.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintParity.lockScheduleDaily', () => {
  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_Entry = {
    template: 'lock-inactive-issues',
    runsOn: 'ubuntu-24.04',
    name: 'daily',
    triggers: ['schedule-daily'],
  };

  it('reproduces the synthetic daily workflow byte-for-byte', async () => {
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_Generated = WorkflowsBlueprint.dispatch(entry, {});
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-lock-schedule-daily.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Parity - Lock Schedule Monthly.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintParity.lockScheduleMonthly', () => {
  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_Entry = {
    template: 'lock-inactive-issues',
    runsOn: 'ubuntu-24.04',
    name: 'monthly',
    triggers: ['schedule-monthly'],
  };

  it('reproduces the synthetic monthly workflow byte-for-byte', async () => {
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_Generated = WorkflowsBlueprint.dispatch(entry, {});
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-lock-schedule-monthly.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});
