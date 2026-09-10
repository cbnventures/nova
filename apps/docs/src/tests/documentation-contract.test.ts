import { ok, strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';

import { describe, it } from 'vitest';

import {
  PATTERN_ICONIFY_ICON_TYPE_BLOCK,
  PATTERN_MDX_PREAMBLE,
  PATTERN_NOVA_CONFIG_TYPE_BLOCK,
  PATTERN_RECIPE_REGISTRY_CATEGORY,
  PATTERN_TITLED_NOVA_CONFIG_JSON_BLOCK,
  PATTERN_TYPE_PROPERTY,
} from '@site/src/lib/regex.js';

import type {
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ConfigBlock,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ConfigFields,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ConfigMatch,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ConfigReference,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_Cwd,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_DotenvDocs,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ExampleConfig,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ExampleMatch,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_InitializeDocs,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_NovaRoot,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_Reaches,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_RecipeCategories,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_RecipeRegistry,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_RunRecipesDocs,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_SharedTypes,
  Tests_DocumentationContract_DocumentationContract_ConfigAndCli_WorkflowDocs,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_ConventionGenerated,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_ConventionTemplate,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_Cwd,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_DocsContent,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_DocsEntries,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_DocsPagePath,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_DocsRoot,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_FirstContent,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_NovaRoot,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_RecipeContent,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_RecipeEntries,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_RecipePagePath,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_RecipeRoot,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_ToolkitContent,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_ToolkitEntries,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_ToolkitPagePath,
  Tests_DocumentationContract_DocumentationContract_PageTemplates_ToolkitRoot,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_Cwd,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_I18nCli,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_I18nCommands,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_I18nDocs,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_IconBlock,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_IconFields,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_IconMatch,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_NovaRoot,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_PresetTypes,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_ThemeDocs,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_VitestDocsRoot,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_VitestEntries,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_VitestPage,
  Tests_DocumentationContract_DocumentationContract_PresetContracts_VitestPagePath,
} from '@site/src/types/tests/documentation-contract.test.d.ts';

/**
 * Tests - Documentation Contract - Documentation Contract.
 *
 * @since UNRELEASED
 */
describe('Documentation contract', () => {
  it('config and cli', async () => {
    const cwd: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_Cwd = process.cwd();
    const novaRoot: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_NovaRoot = resolve(cwd, '..', '..');
    const sharedTypes: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_SharedTypes = await readFile(resolve(novaRoot, 'packages', 'nova', 'src', 'types', 'shared.d.ts'), 'utf-8');
    const configReference: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ConfigReference = await readFile(resolve(cwd, 'docs', 'quickstart', 'nova-config.mdx'), 'utf-8');
    const initializeDocs: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_InitializeDocs = await readFile(resolve(cwd, 'docs', 'cli', 'utilities', 'initialize.mdx'), 'utf-8');
    const configMatch: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ConfigMatch = sharedTypes.match(PATTERN_NOVA_CONFIG_TYPE_BLOCK);

    ok(configMatch !== null, 'Shared_NovaConfig public type block was not found');

    const configBlock: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ConfigBlock = configMatch[1] ?? '';
    const configFields: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ConfigFields = [];

    for (const fieldMatch of configBlock.matchAll(new RegExp(PATTERN_TYPE_PROPERTY, 'gm'))) {
      configFields.push(fieldMatch[1] ?? '');
    }

    ok(configFields.length > 0, 'Shared_NovaConfig has no documented fields');

    for (const configField of configFields) {
      ok(configReference.includes(`## \`${configField}\``) === true, `Config reference is missing the top-level "${configField}" field`);
    }

    const exampleMatch: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ExampleMatch = initializeDocs.match(PATTERN_TITLED_NOVA_CONFIG_JSON_BLOCK);

    ok(exampleMatch !== null, 'Initializer reference is missing its full nova.config.json example');

    const exampleConfig: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ExampleConfig = JSON.parse(exampleMatch[1] ?? '') as Tests_DocumentationContract_DocumentationContract_ConfigAndCli_ExampleConfig;

    for (const configField of configFields) {
      ok(Object.hasOwn(exampleConfig, configField) === true, `Initializer output example is missing the top-level "${configField}" field`);
    }

    const dotenvDocs: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_DotenvDocs = await readFile(resolve(cwd, 'docs', 'cli', 'generators', 'must-haves', 'dotenv.mdx'), 'utf-8');
    const workflowDocs: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_WorkflowDocs = await readFile(resolve(cwd, 'docs', 'cli', 'generators', 'github', 'workflows.mdx'), 'utf-8');
    const reaches: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_Reaches = [
      'local',
      'managed',
      'build',
      'runtime',
    ];

    ok(dotenvDocs.includes('`--prune`') === true, 'Dotenv reference is missing --prune');
    ok(initializeDocs.includes('`-s, --status`') === true, 'Initializer reference is missing --status');
    strictEqual(configReference.includes('buildOnly'), false, 'Config reference still teaches the retired buildOnly field');
    strictEqual(dotenvDocs.includes('buildOnly'), false, 'Dotenv reference still teaches the retired buildOnly field');
    strictEqual(workflowDocs.includes('buildOnly'), false, 'Workflow reference still teaches the retired buildOnly field');
    strictEqual(initializeDocs.includes('buildOnly'), false, 'Initializer reference still teaches the retired buildOnly field');

    for (const reach of reaches) {
      ok(sharedTypes.includes(`'${reach}'`) === true, `Public environment types are missing reach "${reach}"`);
      ok(configReference.includes(`\`${reach}\``) === true, `Config reference is missing reach "${reach}"`);
      ok(workflowDocs.includes(`\`${reach}\``) === true, `Workflow reference is missing reach "${reach}"`);
    }

    const recipeRegistry: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_RecipeRegistry = await readFile(resolve(novaRoot, 'packages', 'nova', 'src', 'cli', 'recipe', 'index.ts'), 'utf-8');
    const runRecipesDocs: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_RunRecipesDocs = await readFile(resolve(cwd, 'docs', 'cli', 'utilities', 'run-recipes.mdx'), 'utf-8');
    const recipeCategories: Tests_DocumentationContract_DocumentationContract_ConfigAndCli_RecipeCategories = [];

    for (const categoryMatch of recipeRegistry.matchAll(new RegExp(PATTERN_RECIPE_REGISTRY_CATEGORY, 'gm'))) {
      recipeCategories.push(categoryMatch[1] ?? '');
    }

    ok(recipeCategories.length > 0, 'Recipe registry has no categories');

    for (const recipeCategory of recipeCategories) {
      ok(runRecipesDocs.includes(`| \`${recipeCategory}\``) === true, `Run-recipes reference is missing the "${recipeCategory}" category`);
    }

    return;
  });

  it('preset contracts', async () => {
    const cwd: Tests_DocumentationContract_DocumentationContract_PresetContracts_Cwd = process.cwd();
    const novaRoot: Tests_DocumentationContract_DocumentationContract_PresetContracts_NovaRoot = resolve(cwd, '..', '..');
    const i18nCli: Tests_DocumentationContract_DocumentationContract_PresetContracts_I18nCli = await readFile(resolve(novaRoot, 'packages', 'docusaurus-preset-nova', 'src', 'cli', 'index.ts'), 'utf-8');
    const i18nDocs: Tests_DocumentationContract_DocumentationContract_PresetContracts_I18nDocs = await readFile(resolve(cwd, 'docs', 'facades', 'docusaurus-preset', 'systems', 'internationalization.mdx'), 'utf-8');
    const i18nCommands: Tests_DocumentationContract_DocumentationContract_PresetContracts_I18nCommands = [
      'sync',
      'check',
      'coverage',
    ];

    for (const i18nCommand of i18nCommands) {
      ok(i18nCli.includes(`.command('${i18nCommand}')`) === true, `Preset CLI is missing i18n ${i18nCommand}`);
      ok(i18nDocs.includes(`theme-nova i18n ${i18nCommand}`) === true, `Internationalization reference is missing i18n ${i18nCommand}`);
    }

    const presetTypes: Tests_DocumentationContract_DocumentationContract_PresetContracts_PresetTypes = await readFile(resolve(novaRoot, 'packages', 'docusaurus-preset-nova', 'nova-config.d.ts'), 'utf-8');
    const themeDocs: Tests_DocumentationContract_DocumentationContract_PresetContracts_ThemeDocs = await readFile(resolve(cwd, 'docs', 'facades', 'docusaurus-preset', 'reference', 'theme-config.mdx'), 'utf-8');

    ok(presetTypes.includes('NovaThemeConfigNavbarItemDocId') === true, 'Preset public types are missing navbar docId');
    ok(presetTypes.includes('NovaThemeConfigNavbarItemItems') === true, 'Preset public types are missing navbar items');
    ok(themeDocs.includes('`docId`') === true, 'Theme reference is missing navbar docId');
    ok(themeDocs.includes('`items`') === true, 'Theme reference is missing navbar items');
    ok(themeDocs.includes('IconifyIcon') === true, 'Theme reference is missing inline Iconify icons');

    const iconMatch: Tests_DocumentationContract_DocumentationContract_PresetContracts_IconMatch = presetTypes.match(PATTERN_ICONIFY_ICON_TYPE_BLOCK);

    ok(iconMatch !== null, 'Preset public Iconify type block was not found');

    const iconBlock: Tests_DocumentationContract_DocumentationContract_PresetContracts_IconBlock = iconMatch[1] ?? '';
    const iconFields: Tests_DocumentationContract_DocumentationContract_PresetContracts_IconFields = [];

    for (const iconFieldMatch of iconBlock.matchAll(new RegExp(PATTERN_TYPE_PROPERTY, 'gm'))) {
      iconFields.push(iconFieldMatch[1] ?? '');
    }

    for (const iconField of iconFields) {
      ok(themeDocs.includes(`\`${iconField}\``) === true, `Theme reference is missing Iconify field "${iconField}"`);
    }

    const vitestDocsRoot: Tests_DocumentationContract_DocumentationContract_PresetContracts_VitestDocsRoot = resolve(cwd, 'docs', 'rules', 'vitest');
    const vitestEntries: Tests_DocumentationContract_DocumentationContract_PresetContracts_VitestEntries = await readdir(vitestDocsRoot);

    for (const vitestEntry of vitestEntries) {
      if (extname(vitestEntry) !== '.mdx') {
        continue;
      }

      const vitestPagePath: Tests_DocumentationContract_DocumentationContract_PresetContracts_VitestPagePath = resolve(vitestDocsRoot, vitestEntry);
      const vitestPage: Tests_DocumentationContract_DocumentationContract_PresetContracts_VitestPage = await readFile(vitestPagePath, 'utf-8');

      ok(vitestPage.includes('| `vitest`') === true, `${vitestEntry} is missing the required vitest configuration field`);
    }

    return;
  });

  it('page templates', async () => {
    const cwd: Tests_DocumentationContract_DocumentationContract_PageTemplates_Cwd = process.cwd();
    const novaRoot: Tests_DocumentationContract_DocumentationContract_PageTemplates_NovaRoot = resolve(cwd, '..', '..');
    const docsRoot: Tests_DocumentationContract_DocumentationContract_PageTemplates_DocsRoot = resolve(cwd, 'docs');
    const docsEntries: Tests_DocumentationContract_DocumentationContract_PageTemplates_DocsEntries = await readdir(docsRoot, { recursive: true });

    for (const docsEntry of docsEntries) {
      if (extname(docsEntry) !== '.mdx') {
        continue;
      }

      const docsPagePath: Tests_DocumentationContract_DocumentationContract_PageTemplates_DocsPagePath = resolve(docsRoot, docsEntry);
      const docsContent: Tests_DocumentationContract_DocumentationContract_PageTemplates_DocsContent = await readFile(docsPagePath, 'utf-8');
      const firstContent: Tests_DocumentationContract_DocumentationContract_PageTemplates_FirstContent = docsContent.replace(PATTERN_MDX_PREAMBLE, '').trimStart();

      strictEqual(firstContent.startsWith('#'), false, `${relative(cwd, docsPagePath)} starts with a heading instead of an opening sentence`);
    }

    const recipeRoot: Tests_DocumentationContract_DocumentationContract_PageTemplates_RecipeRoot = resolve(docsRoot, 'cli', 'recipes');
    const recipeEntries: Tests_DocumentationContract_DocumentationContract_PageTemplates_RecipeEntries = await readdir(recipeRoot, { recursive: true });

    for (const recipeEntry of recipeEntries) {
      if (extname(recipeEntry) !== '.mdx') {
        continue;
      }

      const recipePagePath: Tests_DocumentationContract_DocumentationContract_PageTemplates_RecipePagePath = resolve(recipeRoot, recipeEntry);
      const recipeContent: Tests_DocumentationContract_DocumentationContract_PageTemplates_RecipeContent = await readFile(recipePagePath, 'utf-8');

      ok(recipeContent.includes('## Why Use This Command?') === true, `${relative(cwd, recipePagePath)} is missing Why Use This Command?`);
      ok(recipeContent.includes('## Requirements') === true, `${relative(cwd, recipePagePath)} is missing Requirements`);
      ok(recipeContent.includes('## Usage') === true, `${relative(cwd, recipePagePath)} is missing Usage`);
      ok(recipeContent.includes('## Options') === true, `${relative(cwd, recipePagePath)} is missing Options`);
    }

    const toolkitRoot: Tests_DocumentationContract_DocumentationContract_PageTemplates_ToolkitRoot = resolve(docsRoot, 'toolkit');
    const toolkitEntries: Tests_DocumentationContract_DocumentationContract_PageTemplates_ToolkitEntries = await readdir(toolkitRoot, { recursive: true });

    for (const toolkitEntry of toolkitEntries) {
      if (extname(toolkitEntry) !== '.mdx' || toolkitEntry === 'index.mdx') {
        continue;
      }

      const toolkitPagePath: Tests_DocumentationContract_DocumentationContract_PageTemplates_ToolkitPagePath = resolve(toolkitRoot, toolkitEntry);
      const toolkitContent: Tests_DocumentationContract_DocumentationContract_PageTemplates_ToolkitContent = await readFile(toolkitPagePath, 'utf-8');

      ok(toolkitContent.includes('## Why Use This Battery?') === true, `${relative(cwd, toolkitPagePath)} is missing Why Use This Battery?`);
      ok(toolkitContent.includes('## Usage') === true, `${relative(cwd, toolkitPagePath)} is missing Usage`);
      ok(toolkitContent.includes('## Settings') === true, `${relative(cwd, toolkitPagePath)} is missing Settings`);
      ok(toolkitContent.includes('## Output Examples') === true, `${relative(cwd, toolkitPagePath)} is missing Output Examples`);
    }

    const conventionTemplate: Tests_DocumentationContract_DocumentationContract_PageTemplates_ConventionTemplate = await readFile(resolve(novaRoot, 'packages', 'nova', 'templates', 'generators', 'must-haves', 'agent-conventions', 'conventions', 'documentation.md'), 'utf-8');
    const conventionGenerated: Tests_DocumentationContract_DocumentationContract_PageTemplates_ConventionGenerated = await readFile(resolve(novaRoot, 'conventions', 'documentation.md'), 'utf-8');

    strictEqual(conventionGenerated, conventionTemplate, 'Generated documentation convention drifted from its Nova template');
    ok(conventionGenerated.includes('Content is a numbered list.') === true, 'Documentation convention does not resolve Why sections to numbered lists');

    return;
  });

  return;
});
