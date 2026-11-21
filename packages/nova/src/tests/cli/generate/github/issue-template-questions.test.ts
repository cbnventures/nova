import {
  deepStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';
import { basename } from 'node:path';

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Runner as CliGenerateGithubIssueTemplate } from '../../../../cli/generate/github/issue-template.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_Github_IssueTemplateQuestions_GenerateIssueTemplates_Config,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_GenerateIssueTemplates_Files,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_GenerateIssueTemplates_Returns,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_Content,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_ExpectedIds,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_FileName,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_Files,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_Ids,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_Positions,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_DropsInvalidAndRepeatedCustomQuestionsWhileLoading_Parse,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_KeepsTheAffectedVersionBeforeTheRepoTypeSets_Bug,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_LeavesOutTheSponsorBlocksWhenSupportIsNotSponsorGated_Support,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_LinksTheDocumentationAndFallsBackToTheReadme_Files,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_PlacesCustomQuestionsInEachForm_Bug,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_PlacesCustomQuestionsInEachForm_Files,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_RefusesACustomIdThatRepeatsABuiltInQuestion_Files,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_RefusesTwoSetsThatAskTheSameQuestion_Files,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_ShipsEveryBuiltInRepoTypeSetForTheFormsItCovers_Bug,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_ShipsEveryBuiltInRepoTypeSetForTheFormsItCovers_Feature,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_ShipsEveryBuiltInRepoTypeSetForTheFormsItCovers_Files,
  Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_ShipsEveryBuiltInRepoTypeSetForTheFormsItCovers_Support,
} from '../../../../types/tests/cli/generate/github/issue-template-questions.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Issue Template Questions - Generate Issue Templates.
 *
 * Runs the generator against one config and returns each written file by name.
 *
 * @param {Tests_Cli_Generate_Github_IssueTemplateQuestions_GenerateIssueTemplates_Config} config - Config.
 *
 * @returns {Tests_Cli_Generate_Github_IssueTemplateQuestions_GenerateIssueTemplates_Returns}
 *
 * @since 0.49.0
 */
async function generateIssueTemplates(config: Tests_Cli_Generate_Github_IssueTemplateQuestions_GenerateIssueTemplates_Config): Tests_Cli_Generate_Github_IssueTemplateQuestions_GenerateIssueTemplates_Returns {
  vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

  vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(config);

  vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

  vi.spyOn(process['stdout'], 'write').mockImplementation(() => true);

  vi.spyOn(process['stderr'], 'write').mockImplementation(() => true);

  await CliGenerateGithubIssueTemplate.run({ replaceFile: true });

  const files: Tests_Cli_Generate_Github_IssueTemplateQuestions_GenerateIssueTemplates_Files = new Map();

  for (const call of vi.mocked(utility['saveGeneratedFile'])['mock']['calls']) {
    files.set(basename(call[0]), call[1]);
  }

  return files;
}

/**
 * Tests - CLI - Generate - GitHub - Issue Template Questions - Issue Template Questions.
 *
 * @since 0.49.0
 */
describe('issue template questions', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = 0;

    return;
  });

  it('links the documentation and falls back to the readme', async () => {
    const files: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_LinksTheDocumentationAndFallsBackToTheReadme_Files = await generateIssueTemplates({
      urls: { documentation: 'https://docs.example.com/' },
      github: {
        owner: 'example',
        repo: 'widget',
      },
    });

    ok(String(files.get('BUG-REPORT.yml')).includes('- label: "I have read the [documentation](https://docs.example.com/), and this is __NOT__ a duplicate bug report"'));
    strictEqual(String(files.get('BUG-REPORT.yml')).includes('README.md'), false);

    vi.restoreAllMocks();

    ok(String((await generateIssueTemplates({
      github: {
        owner: 'example',
        repo: 'widget',
      },
    })).get('BUG-REPORT.yml')).includes('[documentation](https://github.com/example/widget#readme)'));

    vi.restoreAllMocks();

    strictEqual(String((await generateIssueTemplates({})).get('BUG-REPORT.yml')).includes('I have read the'), false);

    return;
  });

  it('leaves out the sponsor blocks when support is not sponsor-gated', async () => {
    const support: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_LeavesOutTheSponsorBlocksWhenSupportIsNotSponsorGated_Support = String((await generateIssueTemplates({
      urls: {
        documentation: 'https://docs.example.com/',
        fundSources: ['https://github.com/sponsors/example'],
      },
      workflows: [{
        template: 'check-sponsor-gated-issues',
        name: 'project',
        triggers: ['issues'],
      }],
    })).get('SUPPORT-REQUEST.yml'));

    ok(support.includes('[GitHub Sponsors](https://github.com/sponsors/example) page.'));
    ok(support.includes('(these contributors will be listed in the [documentation](https://docs.example.com/))'));
    ok(support.includes('- label: "I am currently a sponsor or have heavily contributed to this project"'));

    for (const config of [
      {
        urls: { fundSources: ['https://github.com/sponsors/example'] },
      },
      {
        urls: { fundSources: [] },
        workflows: [{
          template: 'check-sponsor-gated-issues' as const,
          name: 'project',
          triggers: ['issues' as const],
        }],
      },
    ]) {
      vi.restoreAllMocks();

      strictEqual(String((await generateIssueTemplates(config)).get('SUPPORT-REQUEST.yml')).includes('sponsor'), false);
    }

    return;
  });

  it('asks the built-in global questions in every form', async () => {
    const files: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_Files = await generateIssueTemplates({
      urls: {
        privacyPolicy: 'https://example.com/privacy/',
        termsOfUse: 'https://example.com/terms/',
      },
    });
    const expectedIds: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_ExpectedIds = {
      'BUG-REPORT.yml': [
        'pre-check',
        'email',
        'steps-to-reproduce',
        'expected-behavior',
        'actual-behavior',
        'affected-version',
        'frequency',
        'logs',
        'additional-context',
      ],
      'FEATURE-REQUEST.yml': [
        'pre-check',
        'email',
        'problem',
        'requested-outcome',
        'alternatives',
        'additional-context',
      ],
      'SUPPORT-REQUEST.yml': [
        'pre-check',
        'help-needed',
        'troubleshooting',
        'desired-outcome',
        'affected-version',
        'logs',
        'additional-context',
      ],
    };

    for (const entry of Object.entries(expectedIds)) {
      const fileName: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_FileName = entry[0];
      const ids: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_Ids = entry[1];
      const content: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_Content = String(files.get(fileName));
      const positions: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_AsksTheBuiltInGlobalQuestionsInEveryForm_Positions = ids.map((id) => content.indexOf(`    id: "${id}"\n`));

      strictEqual(positions.includes(-1), false, `Expected ${fileName} to ask ${ids.join(', ')}`);
      deepStrictEqual(positions, [...positions].sort((a, b) => a - b), `Expected ${fileName} to keep its questions in order`);
      strictEqual(content.includes('—'), false);
      strictEqual(content.toLowerCase().includes(' free '), false);
    }

    ok(String(files.get('BUG-REPORT.yml')).includes('Remove all secrets and personal data before submitting.'));
    ok(String(files.get('SUPPORT-REQUEST.yml')).includes('Remove all secrets and personal data before submitting.'));

    return;
  });

  it('ships every built-in repo-type set for the forms it covers', async () => {
    const files: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_ShipsEveryBuiltInRepoTypeSetForTheFormsItCovers_Files = await generateIssueTemplates({
      github: {
        issueTemplate: {
          bugReportFields: [
            'nodejs',
            'apple',
            'android',
            'csharp',
            'python',
            'homebridge',
            'pfsense',
            'synology',
            'docker',
            'web',
            'screenshots',
            'cloudflare-worker',
            'pfsense-package',
            'github-action',
            'native-app',
            'docs-site',
            'notifications',
          ],
        },
      },
    });
    const bug: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_ShipsEveryBuiltInRepoTypeSetForTheFormsItCovers_Bug = String(files.get('BUG-REPORT.yml'));
    const feature: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_ShipsEveryBuiltInRepoTypeSetForTheFormsItCovers_Feature = String(files.get('FEATURE-REQUEST.yml'));
    const support: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_ShipsEveryBuiltInRepoTypeSetForTheFormsItCovers_Support = String(files.get('SUPPORT-REQUEST.yml'));

    strictEqual(process.exitCode === undefined || process.exitCode === 0, true);
    strictEqual(files.size, 4);

    for (const id of [
      'node-version',
      'minimal-reproduction',
      'affected-stage',
      'image-reference',
      'pfsense-edition',
      'installation-method',
      'homebridge-version',
      'workflow-step',
      'app-device',
      'installation-source',
      'affected-url',
      'screenshots',
      'content-type',
      'notification-service',
    ]) {
      ok(bug.includes(`    id: "${id}"\n`), `Expected the bug report to ask "${id}"`);
    }

    for (const id of [
      'affected-stage',
      'content-type',
      'notification-event',
    ]) {
      ok(feature.includes(`    id: "${id}"\n`), `Expected the feature request to ask "${id}"`);
    }

    strictEqual(feature.includes('id: "docker-version"'), false);
    ok(support.includes('    id: "docker-version"\n'));
    ok(support.includes('    id: "node-version"\n'));
    strictEqual(support.includes('id: "minimal-reproduction"'), false);

    return;
  });

  it('refuses two sets that ask the same question', async () => {
    const files: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_RefusesTwoSetsThatAskTheSameQuestion_Files = await generateIssueTemplates({
      github: {
        issueTemplate: {
          bugReportFields: [
            'php',
            'pfsense-package',
          ],
        },
      },
    });

    strictEqual(files.has('BUG-REPORT.yml'), false);
    strictEqual(process.exitCode, 1);

    return;
  });

  it('keeps the affected version before the repo-type sets', async () => {
    const bug: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_KeepsTheAffectedVersionBeforeTheRepoTypeSets_Bug = String((await generateIssueTemplates({
      github: {
        issueTemplate: {
          bugReportFields: [
            'docker',
            'web',
          ],
        },
      },
    })).get('BUG-REPORT.yml'));

    ok(bug.indexOf('id: "affected-version"') < bug.indexOf('id: "docker-version"'));
    ok(bug.indexOf('id: "docker-version"') < bug.indexOf('id: "logs"'));

    return;
  });

  it('places custom questions in each form', async () => {
    const files: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_PlacesCustomQuestionsInEachForm_Files = await generateIssueTemplates({
      github: {
        issueTemplate: {
          bugReportFields: ['docker'],
          customQuestions: {
            bug: [
              {
                type: 'dropdown',
                id: 'install-method',
                attributes: {
                  label: 'Install method',
                  options: [
                    'Docker Compose',
                    'docker run',
                  ],
                  default: 0,
                },
                validations: { required: true },
              },
              {
                type: 'markdown',
                attributes: { value: 'Thanks "for" reporting.' },
              },
            ],
            feature: [{
              type: 'checkboxes',
              id: 'scope',
              attributes: {
                label: 'Scope',
                options: [{
                  label: 'Web console',
                  required: false,
                }],
              },
            }],
            support: [{
              type: 'input',
              id: 'example-host',
              attributes: { label: 'Host name' },
            }],
          },
        },
      },
    });
    const bug: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_PlacesCustomQuestionsInEachForm_Bug = String(files.get('BUG-REPORT.yml'));

    ok(bug.includes([
      '  - type: "dropdown"',
      '    id: "install-method"',
      '    attributes:',
      '      label: "Install method"',
      '      options:',
      '        - "Docker Compose"',
      '        - "docker run"',
      '      default: 0',
      '    validations:',
      '      required: true',
      '  - type: "markdown"',
      '    attributes:',
      '      value: "Thanks \\"for\\" reporting."',
      '  - type: "textarea"',
      '    id: "logs"',
    ].join('\n')));
    ok(bug.indexOf('id: "deployment"') < bug.indexOf('id: "install-method"'));
    ok(String(files.get('FEATURE-REQUEST.yml')).includes([
      '        - label: "Web console"',
      '          required: false',
      '  - type: "textarea"',
      '    id: "additional-context"',
    ].join('\n')));
    ok(String(files.get('SUPPORT-REQUEST.yml')).includes([
      '      label: "Host name"',
      '  - type: "textarea"',
      '    id: "logs"',
    ].join('\n')));

    return;
  });

  it('refuses a custom id that repeats a built-in question', async () => {
    const files: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_RefusesACustomIdThatRepeatsABuiltInQuestion_Files = await generateIssueTemplates({
      github: {
        issueTemplate: {
          customQuestions: {
            bug: [{
              type: 'input',
              id: 'logs',
              attributes: { label: 'Logs again' },
            }],
          },
        },
      },
    });

    strictEqual(files.has('BUG-REPORT.yml'), false);
    ok(files.has('FEATURE-REQUEST.yml'));
    strictEqual(process.exitCode, 1);

    expect(process['stderr']['write']).toHaveBeenCalledWith(expect.stringContaining('repeats the question id "logs"'));

    return;
  });

  it('drops invalid and repeated custom questions while loading', async () => {
    const parse: Tests_Cli_Generate_Github_IssueTemplateQuestions_IssueTemplateQuestions_DropsInvalidAndRepeatedCustomQuestionsWhileLoading_Parse = Reflect.get(LibNovaConfig.prototype, 'getGithubIssueTemplateCustomQuestions');

    vi.spyOn(process['stderr'], 'write').mockImplementation(() => true);

    deepStrictEqual(Reflect.apply(parse, new LibNovaConfig(), [{
      bug: [
        {
          type: 'input',
          id: 'host',
          attributes: { label: 'Host' },
        },
        {
          type: 'input',
          id: 'host',
          attributes: { label: 'Host again' },
        },
        {
          type: 'input',
          id: 'bad id',
          attributes: { label: 'Bad' },
        },
        {
          type: 'textarea',
          id: 'notes',
          attributes: {
            label: 'Notes',
            colour: 'red',
          },
        },
      ],
      chat: [],
    }]), {
      bug: [{
        type: 'input',
        id: 'host',
        attributes: { label: 'Host' },
      }],
    });

    expect(process['stderr']['write']).toHaveBeenCalledWith(expect.stringContaining('repeats the id "host"'));

    expect(process['stderr']['write']).toHaveBeenCalledWith(expect.stringContaining('has an unknown form "chat"'));

    expect(process['stderr']['write']).toHaveBeenCalledWith(expect.stringContaining('"customQuestions.bug[3]" is not a valid issue-form question'));

    return;
  });

  return;
});
