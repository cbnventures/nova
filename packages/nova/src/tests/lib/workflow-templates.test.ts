import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { libWorkflowTemplatesMetadata } from '../../lib/workflow-templates.js';

import type {
  Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_HasDescription,
  Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_Name,
  Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_Variable,
  Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_VariableNames,
  Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_OtherTargetNames,
  Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_PublishEntry,
  Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_TargetName,
  Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_Targets,
  Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_CloudflareWorkers,
  Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_PublishEntry,
  Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_Targets,
  Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_Vercel,
  Tests_Lib_WorkflowTemplates_PublishTargets_StoresContainerIdentityAsTargetRequiredLiterals_DockerHub,
  Tests_Lib_WorkflowTemplates_PublishTargets_StoresContainerIdentityAsTargetRequiredLiterals_Ghcr,
  Tests_Lib_WorkflowTemplates_PublishTargets_StoresContainerIdentityAsTargetRequiredLiterals_PublishEntry,
  Tests_Lib_WorkflowTemplates_PublishTargets_StoresContainerIdentityAsTargetRequiredLiterals_Targets,
} from '../../types/tests/lib/workflow-templates.test.d.ts';

for (const currentEntry of libWorkflowTemplatesMetadata) {
  describe(`${currentEntry['name']} description coverage`, () => {
    it('every literal variable has a description', () => {
      const variableNames: Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_VariableNames = Object.keys(currentEntry['variables']);

      for (const variableName of variableNames) {
        const name: Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_Name = variableName;
        const variable: Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_Variable = currentEntry['variables'][name] as Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_Variable;

        if (variable['format'] === 'literal') {
          const hasDescription: Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_HasDescription = typeof variable['description'] === 'string' && variable['description'].length > 0;

          strictEqual(hasDescription, true, `Expected literal variable "${name}" in "${currentEntry['name']}" to have a description`);
        }
      }

      return;
    });

    return;
  });
}

describe('publish targets', () => {
  it('flag runtime secret sync support', () => {
    const publishEntry: Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_PublishEntry = libWorkflowTemplatesMetadata.find((entry) => entry['name'] === 'publish');

    strictEqual(publishEntry !== undefined, true, 'Expected a "publish" template entry to exist');

    const targets: Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_Targets = publishEntry!['targets'];

    strictEqual(targets !== undefined, true, 'Expected the "publish" entry to declare targets');

    strictEqual(targets!['cloudflare-workers']!['supportsRuntimeSecretSync'], true, 'Expected "cloudflare-workers" to support runtime secret sync');
    strictEqual(targets!['vercel-nextjs']!['supportsRuntimeSecretSync'], true, 'Expected "vercel-nextjs" to support runtime secret sync');

    const otherTargetNames: Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_OtherTargetNames = [
      'npm',
      'github-action',
      'github-packages',
      'docker-hub',
      'ghcr',
      'cloudflare-pages-docusaurus',
      'github-pages-docusaurus',
    ];

    for (const otherTargetName of otherTargetNames) {
      const targetName: Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_TargetName = otherTargetName;

      strictEqual(targets![targetName]!['supportsRuntimeSecretSync'], undefined, `Expected "${targetName}" to not support runtime secret sync`);
    }

    return;
  });

  it('marks per-app deploy creds with app scope and account creds with account scope', () => {
    const publishEntry: Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_PublishEntry = libWorkflowTemplatesMetadata.find((entry) => entry['name'] === 'publish');

    strictEqual(publishEntry !== undefined, true, 'Expected a "publish" template entry to exist');

    const targets: Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_Targets = publishEntry!['targets'];

    strictEqual(targets !== undefined, true, 'Expected the "publish" entry to declare targets');

    const vercel: Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_Vercel = targets!['vercel-nextjs'];
    const cloudflareWorkers: Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_CloudflareWorkers = targets!['cloudflare-workers'];

    strictEqual(vercel!['variables']['VERCEL_PROJECT_ID']!['scope'], 'app', 'Expected "VERCEL_PROJECT_ID" to be app scoped');
    strictEqual(vercel!['variables']['VERCEL_TOKEN']!['scope'], 'account', 'Expected "VERCEL_TOKEN" to be account scoped');
    strictEqual(vercel!['variables']['VERCEL_ORG_ID']!['scope'], 'account', 'Expected "VERCEL_ORG_ID" to be account scoped');
    strictEqual(cloudflareWorkers!['variables']['CLOUDFLARE_API_TOKEN']!['scope'], 'account', 'Expected "CLOUDFLARE_API_TOKEN" to be account scoped');
    strictEqual(cloudflareWorkers!['variables']['CLOUDFLARE_ACCOUNT_ID']!['scope'], 'account', 'Expected "CLOUDFLARE_ACCOUNT_ID" to be account scoped');

    return;
  });

  it('stores container identity as target required literals', () => {
    const publishEntry: Tests_Lib_WorkflowTemplates_PublishTargets_StoresContainerIdentityAsTargetRequiredLiterals_PublishEntry = libWorkflowTemplatesMetadata.find((entry) => entry['name'] === 'publish');

    strictEqual(publishEntry !== undefined, true, 'Expected a "publish" template entry to exist');

    const targets: Tests_Lib_WorkflowTemplates_PublishTargets_StoresContainerIdentityAsTargetRequiredLiterals_Targets = publishEntry!['targets'];
    const dockerHub: Tests_Lib_WorkflowTemplates_PublishTargets_StoresContainerIdentityAsTargetRequiredLiterals_DockerHub = targets!['docker-hub'];
    const ghcr: Tests_Lib_WorkflowTemplates_PublishTargets_StoresContainerIdentityAsTargetRequiredLiterals_Ghcr = targets!['ghcr'];

    strictEqual(dockerHub!['variables']['IMAGE_NAMESPACE'], undefined);
    strictEqual(dockerHub!['variables']['IMAGE_REPOSITORY'], undefined);
    strictEqual(dockerHub!['requiredLiterals']!['IMAGE_NAMESPACE']!['description'].length > 0, true);
    strictEqual(dockerHub!['requiredLiterals']!['IMAGE_REPOSITORY']!['description'].length > 0, true);
    strictEqual(ghcr!['variables']['IMAGE_REPOSITORY'], undefined);
    strictEqual(ghcr!['requiredLiterals']!['IMAGE_REPOSITORY']!['description'].length > 0, true);

    return;
  });

  return;
});
