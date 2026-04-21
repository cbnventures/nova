import { strictEqual } from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import { pathExists } from '../../lib/utility.js';
import { libWorkflowTemplatesMetadata } from '../../lib/workflow-templates.js';

import type {
  TestsLibWorkflowTemplatesBasePath,
  TestsLibWorkflowTemplatesCurrentDirectory,
  TestsLibWorkflowTemplatesDirExists,
  TestsLibWorkflowTemplatesEntry,
  TestsLibWorkflowTemplatesExists,
  TestsLibWorkflowTemplatesFilePath,
  TestsLibWorkflowTemplatesHasDescription,
  TestsLibWorkflowTemplatesTargetDirPath,
  TestsLibWorkflowTemplatesTargetFileExists,
  TestsLibWorkflowTemplatesTargetFilePath,
  TestsLibWorkflowTemplatesTargetName,
  TestsLibWorkflowTemplatesTargetsDirExists,
  TestsLibWorkflowTemplatesTemplatePath,
  TestsLibWorkflowTemplatesTemplatesDir,
  TestsLibWorkflowTemplatesVariable,
  TestsLibWorkflowTemplatesVariableName,
  TestsLibWorkflowTemplatesVariableNames,
} from '../../types/tests/lib/workflow-templates.test.d.ts';

const filePath: TestsLibWorkflowTemplatesFilePath = fileURLToPath(import.meta.url);
const currentDirectory: TestsLibWorkflowTemplatesCurrentDirectory = dirname(filePath);
const templatesDir: TestsLibWorkflowTemplatesTemplatesDir = join(currentDirectory, '..', '..', '..', 'templates', 'generators', 'github', 'workflows');

for (const entry of libWorkflowTemplatesMetadata) {
  const currentEntry: TestsLibWorkflowTemplatesEntry = entry;

  describe(`${currentEntry['name']} template directory existence`, () => {
    it('has a directory with base.yml', async () => {
      const templatePath: TestsLibWorkflowTemplatesTemplatePath = join(templatesDir, currentEntry['name']);
      const dirExists: TestsLibWorkflowTemplatesDirExists = await pathExists(templatePath);

      strictEqual(dirExists, true, `Expected directory "${currentEntry['name']}" to exist`);

      const basePath: TestsLibWorkflowTemplatesBasePath = join(templatePath, 'base.yml');
      const exists: TestsLibWorkflowTemplatesExists = await pathExists(basePath);

      strictEqual(exists, true, `Expected "${currentEntry['name']}/base.yml" to exist`);

      return;
    });

    return;
  });

  describe(`${currentEntry['name']} description coverage`, () => {
    it('every literal variable has a description', () => {
      const variableNames: TestsLibWorkflowTemplatesVariableNames = Object.keys(currentEntry['variables']);

      for (const variableName of variableNames) {
        const name: TestsLibWorkflowTemplatesVariableName = variableName;
        const variable: TestsLibWorkflowTemplatesVariable = currentEntry['variables'][name] as TestsLibWorkflowTemplatesVariable;

        if (variable['format'] === 'literal') {
          const hasDescription: TestsLibWorkflowTemplatesHasDescription = typeof variable['description'] === 'string' && variable['description'].length > 0;

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
        const targetDirPath: TestsLibWorkflowTemplatesTargetDirPath = join(templatesDir, currentEntry['name'], 'targets');
        const targetsDirExists: TestsLibWorkflowTemplatesTargetsDirExists = await pathExists(targetDirPath);

        strictEqual(targetsDirExists, true, `Expected "${currentEntry['name']}/targets" dir to exist`);

        for (const targetEntry of Object.entries(currentEntry['targets']!)) {
          const targetName: TestsLibWorkflowTemplatesTargetName = targetEntry[0];
          const targetFilePath: TestsLibWorkflowTemplatesTargetFilePath = join(targetDirPath, `${targetName}.yml`);
          const targetFileExists: TestsLibWorkflowTemplatesTargetFileExists = await pathExists(targetFilePath);

          strictEqual(targetFileExists, true, `Expected target fragment "${targetName}.yml" to exist`);
        }

        return;
      });

      return;
    });
  }
}
