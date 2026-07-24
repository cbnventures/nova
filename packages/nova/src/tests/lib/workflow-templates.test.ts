import { strictEqual } from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import { pathExists } from '../../lib/utility.js';
import { libWorkflowTemplatesMetadata } from '../../lib/workflow-templates.js';

import type {
  Tests_Lib_WorkflowTemplates_CurrentDirectory,
  Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_HasDescription,
  Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_Name,
  Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_Variable,
  Tests_Lib_WorkflowTemplates_EveryLiteralVariableHasADescription_VariableNames,
  Tests_Lib_WorkflowTemplates_FilePath,
  Tests_Lib_WorkflowTemplates_HasADirectoryWithBaseYml_BasePath,
  Tests_Lib_WorkflowTemplates_HasADirectoryWithBaseYml_DirExists,
  Tests_Lib_WorkflowTemplates_HasADirectoryWithBaseYml_Exists,
  Tests_Lib_WorkflowTemplates_HasADirectoryWithBaseYml_TemplatePath,
  Tests_Lib_WorkflowTemplates_HasATargetsDirectoryWithAYAMLFileForEachDeclaredTargetType_TargetDirPath,
  Tests_Lib_WorkflowTemplates_HasATargetsDirectoryWithAYAMLFileForEachDeclaredTargetType_TargetFileExists,
  Tests_Lib_WorkflowTemplates_HasATargetsDirectoryWithAYAMLFileForEachDeclaredTargetType_TargetFilePath,
  Tests_Lib_WorkflowTemplates_HasATargetsDirectoryWithAYAMLFileForEachDeclaredTargetType_TargetName,
  Tests_Lib_WorkflowTemplates_HasATargetsDirectoryWithAYAMLFileForEachDeclaredTargetType_TargetsDirExists,
  Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_OtherTargetNames,
  Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_PublishEntry,
  Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_TargetName,
  Tests_Lib_WorkflowTemplates_PublishTargets_FlagRuntimeSecretSyncSupport_Targets,
  Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_CloudflareWorkers,
  Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_PublishEntry,
  Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_Targets,
  Tests_Lib_WorkflowTemplates_PublishTargets_MarksPerAppDeployCredsWithAppScopeAndAccountCredsWithAccountScope_Vercel,
  Tests_Lib_WorkflowTemplates_TemplatesDir,
} from '../../types/tests/lib/workflow-templates.test.d.ts';

const filePath: Tests_Lib_WorkflowTemplates_FilePath = fileURLToPath(import.meta.url);
const currentDirectory: Tests_Lib_WorkflowTemplates_CurrentDirectory = dirname(filePath);
const templatesDir: Tests_Lib_WorkflowTemplates_TemplatesDir = join(currentDirectory, '..', '..', '..', 'templates', 'generators', 'github', 'workflows');

for (const currentEntry of libWorkflowTemplatesMetadata) {
  describe(`${currentEntry['name']} template directory existence`, () => {
    it('has a directory with base.yml', async () => {
      const templatePath: Tests_Lib_WorkflowTemplates_HasADirectoryWithBaseYml_TemplatePath = join(templatesDir, currentEntry['name']);
      const dirExists: Tests_Lib_WorkflowTemplates_HasADirectoryWithBaseYml_DirExists = await pathExists(templatePath);

      strictEqual(dirExists, true, `Expected directory "${currentEntry['name']}" to exist`);

      const basePath: Tests_Lib_WorkflowTemplates_HasADirectoryWithBaseYml_BasePath = join(templatePath, 'base.yml');
      const exists: Tests_Lib_WorkflowTemplates_HasADirectoryWithBaseYml_Exists = await pathExists(basePath);

      strictEqual(exists, true, `Expected "${currentEntry['name']}/base.yml" to exist`);

      return;
    });

    return;
  });

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

  if (currentEntry['supportsTargets'] === true && currentEntry['targets'] !== undefined) {
    describe(`${currentEntry['name']} target file existence`, () => {
      it('has a targets directory with a YAML file for each declared target type', async () => {
        const targetDirPath: Tests_Lib_WorkflowTemplates_HasATargetsDirectoryWithAYAMLFileForEachDeclaredTargetType_TargetDirPath = join(templatesDir, currentEntry['name'], 'targets');
        const targetsDirExists: Tests_Lib_WorkflowTemplates_HasATargetsDirectoryWithAYAMLFileForEachDeclaredTargetType_TargetsDirExists = await pathExists(targetDirPath);

        strictEqual(targetsDirExists, true, `Expected "${currentEntry['name']}/targets" dir to exist`);

        for (const targetEntry of Object.entries(currentEntry['targets']!)) {
          const targetName: Tests_Lib_WorkflowTemplates_HasATargetsDirectoryWithAYAMLFileForEachDeclaredTargetType_TargetName = targetEntry[0];
          const targetFilePath: Tests_Lib_WorkflowTemplates_HasATargetsDirectoryWithAYAMLFileForEachDeclaredTargetType_TargetFilePath = join(targetDirPath, `${targetName}.yml`);
          const targetFileExists: Tests_Lib_WorkflowTemplates_HasATargetsDirectoryWithAYAMLFileForEachDeclaredTargetType_TargetFileExists = await pathExists(targetFilePath);

          strictEqual(targetFileExists, true, `Expected target fragment "${targetName}.yml" to exist`);
        }

        return;
      });

      return;
    });
  }
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

  return;
});
