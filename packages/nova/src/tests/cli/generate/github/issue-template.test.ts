import { ok, strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

vi.mock('prompts', () => (
  {
    default: vi.fn().mockResolvedValue(
      {
        bugReportFields: [],
      },
    ),
  }
));

import { Runner as CliGenerateGithubIssueTemplate } from '../../../../cli/generate/github/issue-template.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_HeaderArg,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_IsProjectRootSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_LoadSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SaveCalls,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SaveSpy,
  Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_TargetCall,
} from '../../../../types/tests/cli/generate/github/issue-template.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Issue Template - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateGithubIssueTemplate.run', () => {
  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateGithubIssueTemplate.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ project: { name: { slug: 'test' } } });
    const saveSpy: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateGithubIssueTemplate.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_SaveCalls = saveSpy['mock']['calls'];

    const targetCall: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_TargetCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('ISSUE_TEMPLATE')
      && call[0].endsWith('.yml')
    ));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for an ISSUE_TEMPLATE .yml file');

    const headerArg: Tests_Cli_Generate_Github_IssueTemplate_CliGenerateGithubIssueTemplateRun_HeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate github issue-template');
    strictEqual(headerArg['docsSlug'], 'cli/generators/github/issue-template');
    strictEqual(headerArg['mode'], 'strict');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  return;
});
