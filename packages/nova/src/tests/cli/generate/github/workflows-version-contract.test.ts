import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as Validator } from '../../../../cli/generate/github/workflows-blueprint-validate.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult,
  Tests_Cli_Generate_Github_WorkflowsVersionContract_Diagnostic,
  Tests_Cli_Generate_Github_WorkflowsVersionContract_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult,
  Tests_Cli_Generate_Github_WorkflowsVersionContract_Workspaces,
} from '../../../../types/tests/cli/generate/github/workflows-version-contract.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Version Contract - GitHub Action Publishing.
 *
 * @since 0.34.0
 */
describe('GitHub Action publishing', () => {
  it('accepts SemVer and rejects CalVer before generating a floating-major workflow', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsVersionContract_Workspaces = {
      './packages/action': {
        name: 'example-action',
        policy: 'distributable',
        role: 'package',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsVersionContract_RawWorkflows = [{
      deploy: [{
        path: './packages/action',
        to: 'github-action',
        with: {
          ACTION_ENTRY_POINT: 'index.js',
          ACTION_OUTPUT_PATH: './packages/action/build',
          ACTION_YML_PATH: './action.yml',
          RELEASE_BRANCH_NAME: 'releases',
        },
      }],
      name: 'project',
      template: 'publish',
      triggers: ['release'],
      with: {},
    }];
    const semverResult: Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult = Validator.validate(rawWorkflows, workspaces, 'semver');
    const calverResult: Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult = Validator.validate(rawWorkflows, workspaces, 'calver');

    strictEqual(semverResult['diagnostics'].length, 0);
    strictEqual(semverResult['workflows'].length, 1);
    strictEqual(calverResult['workflows'].length, 0);
    strictEqual(calverResult['diagnostics'].length, 1);

    const diagnostic: Tests_Cli_Generate_Github_WorkflowsVersionContract_Diagnostic = calverResult['diagnostics'][0];

    strictEqual(diagnostic === undefined, false);

    if (diagnostic === undefined) {
      throw new Error('Expected one CalVer compatibility diagnostic.');
    }

    strictEqual(diagnostic['message'].includes('requires SemVer'), true);

    return;
  });

  return;
});
