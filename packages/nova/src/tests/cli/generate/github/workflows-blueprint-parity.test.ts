import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import { Runner as WorkflowsBlueprint } from '../../../../cli/generate/github/workflows-blueprint.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_ReproducesTheCommittedProjectWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_ReproducesTheCommittedProjectWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_ReproducesTheCommittedProjectWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_ReproducesTheCommittedProjectWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_ReproducesTheCommittedProjectWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_Ir,
} from '../../../../types/tests/cli/generate/github/workflows-blueprint-parity.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Parity - Check Sponsor Gated Issues.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintParity.checkSponsorGatedIssues', () => {
  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_Entry = {
    template: 'check-sponsor-gated-issues',
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
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_Ir = WorkflowsBlueprint.buildCheckSponsorGatedIssues(entry, environment);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_FixturePath = join(fixturesDir, 'nova-check-sponsor-gated-issues-sponsor-check.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityCheckSponsorGatedIssues_ReproducesTheSponsorCheckWorkflowWithPrefixedKeysByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Parity - Lock Inactive Issues.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintParity.lockInactiveIssues', () => {
  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_Entry = {
    template: 'lock-inactive-issues',
    name: 'project',
    triggers: ['schedule-weekly'],
  };

  it('reproduces the committed project workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_ReproducesTheCommittedProjectWorkflowByteForByte_Ir = WorkflowsBlueprint.buildLockInactiveIssues(entry);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_ReproducesTheCommittedProjectWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_ReproducesTheCommittedProjectWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_ReproducesTheCommittedProjectWorkflowByteForByte_FixturePath = join(fixturesDir, 'nova-lock-inactive-issues-project.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockInactiveIssues_ReproducesTheCommittedProjectWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

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
    name: 'daily',
    triggers: ['schedule-daily'],
  };

  it('reproduces the synthetic daily workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_Ir = WorkflowsBlueprint.buildLockInactiveIssues(entry);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleDaily_ReproducesTheSyntheticDailyWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
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
    name: 'monthly',
    triggers: ['schedule-monthly'],
  };

  it('reproduces the synthetic monthly workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_Ir = WorkflowsBlueprint.buildLockInactiveIssues(entry);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-lock-schedule-monthly.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintParity_WorkflowsBlueprintParityLockScheduleMonthly_ReproducesTheSyntheticMonthlyWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});
