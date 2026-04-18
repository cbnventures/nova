import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import { LIB_REGEX_PATTERN_WORKFLOW_SECRET_REFERENCE, LIB_REGEX_PATTERN_WORKFLOW_VAR_REFERENCE } from '../../lib/regex.js';
import { pathExists } from '../../lib/utility.js';
import { libWorkflowTemplatesMetadata } from '../../lib/workflow-templates.js';

import type {
  TestsLibWorkflowTemplatesBasePath,
  TestsLibWorkflowTemplatesCurrentDirectory,
  TestsLibWorkflowTemplatesDirExists,
  TestsLibWorkflowTemplatesEntry,
  TestsLibWorkflowTemplatesExists,
  TestsLibWorkflowTemplatesExpectedRef,
  TestsLibWorkflowTemplatesFilePath,
  TestsLibWorkflowTemplatesFound,
  TestsLibWorkflowTemplatesHasDescription,
  TestsLibWorkflowTemplatesMetadataHasKey,
  TestsLibWorkflowTemplatesSecretMatch,
  TestsLibWorkflowTemplatesSecretMatchCapture,
  TestsLibWorkflowTemplatesSecretPattern,
  TestsLibWorkflowTemplatesTemplateContent,
  TestsLibWorkflowTemplatesTemplatePath,
  TestsLibWorkflowTemplatesTemplatesDir,
  TestsLibWorkflowTemplatesVariable,
  TestsLibWorkflowTemplatesVariableName,
  TestsLibWorkflowTemplatesVariableNames,
  TestsLibWorkflowTemplatesVarMatch,
  TestsLibWorkflowTemplatesVarMatchCapture,
  TestsLibWorkflowTemplatesVarPattern,
  TestsLibWorkflowTemplatesYamlRef,
  TestsLibWorkflowTemplatesYamlReferences,
} from '../../types/tests/lib/workflow-templates.test.d.ts';

/**
 * Tests - Lib - Workflow Templates - File Path.
 *
 * @since 0.20.0
 */
const filePath: TestsLibWorkflowTemplatesFilePath = fileURLToPath(import.meta.url);
const currentDirectory: TestsLibWorkflowTemplatesCurrentDirectory = dirname(filePath);
const templatesDir: TestsLibWorkflowTemplatesTemplatesDir = join(currentDirectory, '..', '..', '..', 'templates', 'generators', 'github', 'workflows');

for (const entry of libWorkflowTemplatesMetadata) {
  const currentEntry: TestsLibWorkflowTemplatesEntry = entry;

  /**
   * Tests - Lib - Workflow Templates.
   *
   * @since 0.21.0
   */
  describe(`${currentEntry['name']} template directory existence`, () => {
    it(`has a directory with base.yml for "${currentEntry['name']}"`, async () => {
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

  /**
   * Tests - Lib - Workflow Templates.
   *
   * @since 0.21.0
   */
  describe(`${currentEntry['name']} forward coverage`, () => {
    it('every metadata variable exists in base.yml', async () => {
      const templatePath: TestsLibWorkflowTemplatesTemplatePath = join(templatesDir, currentEntry['name'], 'base.yml');
      const templateContent: TestsLibWorkflowTemplatesTemplateContent = await readFile(templatePath, 'utf-8');
      const variableNames: TestsLibWorkflowTemplatesVariableNames = Object.keys(currentEntry['variables']);

      for (const variableName of variableNames) {
        const name: TestsLibWorkflowTemplatesVariableName = variableName;
        const variable: TestsLibWorkflowTemplatesVariable = currentEntry['variables'][name] as TestsLibWorkflowTemplatesVariable;
        const expectedRef: TestsLibWorkflowTemplatesExpectedRef = (variable['format'] === 'secret') ? `\${{ secrets.${name} }}` : `\${{ vars.${name} }}`;
        const found: TestsLibWorkflowTemplatesFound = templateContent.includes(expectedRef);

        strictEqual(found, true, `Expected "${currentEntry['name']}/base.yml" to contain "${expectedRef}"`);
      }

      return;
    });

    return;
  });

  /**
   * Tests - Lib - Workflow Templates.
   *
   * @since 0.21.0
   */
  describe(`${currentEntry['name']} reverse coverage`, () => {
    it('every secrets/vars reference in base.yml is covered by metadata', async () => {
      const templatePath: TestsLibWorkflowTemplatesTemplatePath = join(templatesDir, currentEntry['name'], 'base.yml');
      const templateContent: TestsLibWorkflowTemplatesTemplateContent = await readFile(templatePath, 'utf-8');
      const secretPattern: TestsLibWorkflowTemplatesSecretPattern = new RegExp(LIB_REGEX_PATTERN_WORKFLOW_SECRET_REFERENCE.source, 'g');
      const varPattern: TestsLibWorkflowTemplatesVarPattern = new RegExp(LIB_REGEX_PATTERN_WORKFLOW_VAR_REFERENCE.source, 'g');
      const yamlReferences: TestsLibWorkflowTemplatesYamlReferences = [];

      let secretMatch: TestsLibWorkflowTemplatesSecretMatch = secretPattern.exec(templateContent);

      while (secretMatch !== null) {
        yamlReferences.push(secretMatch[1] as TestsLibWorkflowTemplatesSecretMatchCapture);
        secretMatch = secretPattern.exec(templateContent);
      }

      let varMatch: TestsLibWorkflowTemplatesVarMatch = varPattern.exec(templateContent);

      while (varMatch !== null) {
        yamlReferences.push(varMatch[1] as TestsLibWorkflowTemplatesVarMatchCapture);
        varMatch = varPattern.exec(templateContent);
      }

      for (const yamlRef of yamlReferences) {
        const ref: TestsLibWorkflowTemplatesYamlRef = yamlRef;
        const metadataHasKey: TestsLibWorkflowTemplatesMetadataHasKey = ref in currentEntry['variables'];

        strictEqual(metadataHasKey, true, `Expected metadata for "${currentEntry['name']}" to include "${ref}"`);
      }

      return;
    });

    return;
  });

  /**
   * Tests - Lib - Workflow Templates.
   *
   * @since 0.21.0
   */
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
}
