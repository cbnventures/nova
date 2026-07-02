import { ok, strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliGenerateGithubIssueTemplate } from '../../../../cli/generate/github/issue-template.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_FallsBackToPlatformDerivedFieldsWhenConfigIsAbsent_BugReportCall,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_FallsBackToPlatformDerivedFieldsWhenConfigIsAbsent_Calls,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_FallsBackToPlatformDerivedFieldsWhenConfigIsAbsent_IsProjectRootSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_FallsBackToPlatformDerivedFieldsWhenConfigIsAbsent_LoadSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_FallsBackToPlatformDerivedFieldsWhenConfigIsAbsent_SaveSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_GeneratesBugReportWithoutPlatformFieldsWhenConfigIsEmpty_BugReportCall,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_GeneratesBugReportWithoutPlatformFieldsWhenConfigIsEmpty_Calls,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_GeneratesBugReportWithoutPlatformFieldsWhenConfigIsEmpty_IsProjectRootSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_GeneratesBugReportWithoutPlatformFieldsWhenConfigIsEmpty_LoadSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_GeneratesBugReportWithoutPlatformFieldsWhenConfigIsEmpty_SaveSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SelectsBugReportFieldsFromConfig_BugReportCall,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SelectsBugReportFieldsFromConfig_Calls,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SelectsBugReportFieldsFromConfig_IsProjectRootSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SelectsBugReportFieldsFromConfig_LoadSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SelectsBugReportFieldsFromConfig_SaveSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy,
} from '../../../../types/tests/cli/generate/github/issue-template.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Issue Template - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateGithubIssueTemplate.run', () => {
  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateGithubIssueTemplate.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('selects bug report fields from config', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SelectsBugReportFieldsFromConfig_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SelectsBugReportFieldsFromConfig_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ github: { issueTemplate: { bugReportFields: ['docker.yml'] } } });
    const saveSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SelectsBugReportFieldsFromConfig_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateGithubIssueTemplate.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SelectsBugReportFieldsFromConfig_Calls = saveSpy['mock']['calls'];

    const bugReportCall: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SelectsBugReportFieldsFromConfig_BugReportCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].endsWith('/BUG-REPORT.yml')
    ));

    ok(bugReportCall !== undefined, 'Expected saveGeneratedFile to be called for BUG-REPORT.yml');

    ok(bugReportCall[1].includes('Docker'), 'Expected BUG-REPORT.yml content to include the Docker field fragment');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('falls back to platform-derived fields when config is absent', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_FallsBackToPlatformDerivedFieldsWhenConfigIsAbsent_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_FallsBackToPlatformDerivedFieldsWhenConfigIsAbsent_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ project: { platforms: ['nodejs'] } });
    const saveSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_FallsBackToPlatformDerivedFieldsWhenConfigIsAbsent_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateGithubIssueTemplate.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_FallsBackToPlatformDerivedFieldsWhenConfigIsAbsent_Calls = saveSpy['mock']['calls'];

    const bugReportCall: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_FallsBackToPlatformDerivedFieldsWhenConfigIsAbsent_BugReportCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].endsWith('/BUG-REPORT.yml')
    ));

    ok(bugReportCall !== undefined, 'Expected saveGeneratedFile to be called for BUG-REPORT.yml');

    ok(bugReportCall[1].includes('Node.js'), 'Expected BUG-REPORT.yml content to include the Node.js field fragment');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('generates bug report without platform fields when config is empty', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_GeneratesBugReportWithoutPlatformFieldsWhenConfigIsEmpty_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_GeneratesBugReportWithoutPlatformFieldsWhenConfigIsEmpty_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({});
    const saveSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_GeneratesBugReportWithoutPlatformFieldsWhenConfigIsEmpty_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateGithubIssueTemplate.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_GeneratesBugReportWithoutPlatformFieldsWhenConfigIsEmpty_Calls = saveSpy['mock']['calls'];

    const bugReportCall: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_GeneratesBugReportWithoutPlatformFieldsWhenConfigIsEmpty_BugReportCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].endsWith('/BUG-REPORT.yml')
    ));

    ok(bugReportCall !== undefined, 'Expected saveGeneratedFile to be called for BUG-REPORT.yml');

    ok(bugReportCall[1].includes('Bug Report'), 'Expected BUG-REPORT.yml content to include the base bug report form');

    ok(bugReportCall[1].includes('Node.js') === false, 'Expected BUG-REPORT.yml content to omit Node.js platform fields');

    ok(bugReportCall[1].includes('Docker') === false, 'Expected BUG-REPORT.yml content to omit Docker platform fields');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  return;
});
