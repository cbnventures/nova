import { strictEqual } from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import { pathExists } from '../../lib/utility.js';
import { libWorkflowTemplatesMetadata } from '../../lib/workflow-templates.js';

import type {
  Tests_Lib_WorkflowTemplates_BasePath,
  Tests_Lib_WorkflowTemplates_CurrentDirectory,
  Tests_Lib_WorkflowTemplates_DirExists,
  Tests_Lib_WorkflowTemplates_Entry,
  Tests_Lib_WorkflowTemplates_Exists,
  Tests_Lib_WorkflowTemplates_FilePath,
  Tests_Lib_WorkflowTemplates_HasDescription,
  Tests_Lib_WorkflowTemplates_TargetDirPath,
  Tests_Lib_WorkflowTemplates_TargetFileExists,
  Tests_Lib_WorkflowTemplates_TargetFilePath,
  Tests_Lib_WorkflowTemplates_TargetName,
  Tests_Lib_WorkflowTemplates_TargetsDirExists,
  Tests_Lib_WorkflowTemplates_TemplatePath,
  Tests_Lib_WorkflowTemplates_TemplatesDir,
  Tests_Lib_WorkflowTemplates_Variable,
  Tests_Lib_WorkflowTemplates_VariableName,
  Tests_Lib_WorkflowTemplates_VariableNames,
} from '../../types/tests/lib/workflow-templates.test.d.ts';

const filePath: Tests_Lib_WorkflowTemplates_FilePath = fileURLToPath(import.meta.url);
const currentDirectory: Tests_Lib_WorkflowTemplates_CurrentDirectory = dirname(filePath);
const templatesDir: Tests_Lib_WorkflowTemplates_TemplatesDir = join(currentDirectory, '..', '..', '..', 'templates', 'generators', 'github', 'workflows');

for (const entry of libWorkflowTemplatesMetadata) {
  const currentEntry: Tests_Lib_WorkflowTemplates_Entry = entry;

  describe(`${currentEntry['name']} template directory existence`, () => {
    it('has a directory with base.yml', async () => {
      const templatePath: Tests_Lib_WorkflowTemplates_TemplatePath = join(templatesDir, currentEntry['name']);
      const dirExists: Tests_Lib_WorkflowTemplates_DirExists = await pathExists(templatePath);

      strictEqual(dirExists, true, `Expected directory "${currentEntry['name']}" to exist`);

      const basePath: Tests_Lib_WorkflowTemplates_BasePath = join(templatePath, 'base.yml');
      const exists: Tests_Lib_WorkflowTemplates_Exists = await pathExists(basePath);

      strictEqual(exists, true, `Expected "${currentEntry['name']}/base.yml" to exist`);

      return;
    });

    return;
  });

  describe(`${currentEntry['name']} description coverage`, () => {
    it('every literal variable has a description', () => {
      const variableNames: Tests_Lib_WorkflowTemplates_VariableNames = Object.keys(currentEntry['variables']);

      for (const variableName of variableNames) {
        const name: Tests_Lib_WorkflowTemplates_VariableName = variableName;
        const variable: Tests_Lib_WorkflowTemplates_Variable = currentEntry['variables'][name] as Tests_Lib_WorkflowTemplates_Variable;

        if (variable['format'] === 'literal') {
          const hasDescription: Tests_Lib_WorkflowTemplates_HasDescription = typeof variable['description'] === 'string' && variable['description'].length > 0;

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
        const targetDirPath: Tests_Lib_WorkflowTemplates_TargetDirPath = join(templatesDir, currentEntry['name'], 'targets');
        const targetsDirExists: Tests_Lib_WorkflowTemplates_TargetsDirExists = await pathExists(targetDirPath);

        strictEqual(targetsDirExists, true, `Expected "${currentEntry['name']}/targets" dir to exist`);

        for (const targetEntry of Object.entries(currentEntry['targets']!)) {
          const targetName: Tests_Lib_WorkflowTemplates_TargetName = targetEntry[0];
          const targetFilePath: Tests_Lib_WorkflowTemplates_TargetFilePath = join(targetDirPath, `${targetName}.yml`);
          const targetFileExists: Tests_Lib_WorkflowTemplates_TargetFileExists = await pathExists(targetFilePath);

          strictEqual(targetFileExists, true, `Expected target fragment "${targetName}.yml" to exist`);
        }

        return;
      });

      return;
    });
  }
}
