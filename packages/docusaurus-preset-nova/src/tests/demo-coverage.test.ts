import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import {
  LIB_REGEX_NOVA_THEME_CONFIG_OBJECT_TYPE,
  LIB_REGEX_NOVA_THEME_CONFIG_TYPE_REFERENCE,
  LIB_REGEX_TYPE_DECLARATION_FIELD,
} from '../lib/regex.js';
import { presetsIndexNames } from '../presets/index.js';

import type {
  Tests_DemoCoverage_DemoCoverage_Config,
  Tests_DemoCoverage_DemoCoverage_Demo,
  Tests_DemoCoverage_DemoCoverage_Derived,
  Tests_DemoCoverage_DemoCoverage_DerivedSet,
  Tests_DemoCoverage_DemoCoverage_Leaf,
  Tests_DemoCoverage_DemoCoverage_Message,
  Tests_DemoCoverage_DemoCoverage_Misses,
  Tests_DemoCoverage_DemoCoverage_MissingInRegistry,
  Tests_DemoCoverage_DemoCoverage_RegistryMessage,
  Tests_DemoCoverage_DemoCoverage_RegistrySet,
  Tests_DemoCoverage_DemoCoverage_StaleInRegistry,
  Tests_DemoCoverage_DemoCoverage_Value,
  Tests_DemoCoverage_DemoEntry,
  Tests_DemoCoverage_DemoRecord,
  Tests_DemoCoverage_Demos,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_BlockBody,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_BlockMatch,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_BlockPattern,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_EntryFields,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldEntry,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldExpression,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldMatch,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldName,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldPattern,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_Fields,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldType,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldTypeMatch,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_FileText,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_Leaves,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_ObjectTypes,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_Returns,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_TypeFilePath,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_TypeName,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkEntry,
  Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkStack,
  Tests_DemoCoverage_GetPackageRoot_CurrentFileDirectory,
  Tests_DemoCoverage_GetPackageRoot_CurrentFilePath,
  Tests_DemoCoverage_GetPackageRoot_Returns,
  Tests_DemoCoverage_GetRepoRoot_Returns,
  Tests_DemoCoverage_LoadDemoConfig_ConfigUrl,
  Tests_DemoCoverage_LoadDemoConfig_DemoPath,
  Tests_DemoCoverage_LoadDemoConfig_Module,
  Tests_DemoCoverage_LoadDemoConfig_Returns,
  Tests_DemoCoverage_RequiredLeafPaths,
  Tests_DemoCoverage_ResolveLeaf_Config,
  Tests_DemoCoverage_ResolveLeaf_Cursor,
  Tests_DemoCoverage_ResolveLeaf_Index,
  Tests_DemoCoverage_ResolveLeaf_Path,
  Tests_DemoCoverage_ResolveLeaf_Returns,
  Tests_DemoCoverage_ResolveLeaf_Segment,
  Tests_DemoCoverage_ResolveLeaf_Segments,
} from '../types/tests/demo-coverage.test.d.ts';

/**
 * Tests - Demo Coverage - Demos.
 *
 * Registry of the showcase demos, derived from the runtime
 * `presetsIndexNames` source of truth so "forgot to add a
 * demo entry" drift is impossible by construction. Each
 * entry's `path` follows the `apps/demo-<preset>/` pattern
 * and points at the `docusaurus.config.ts` that will be
 * dynamically imported and walked against the required-leaf
 * list.
 *
 * @since 0.18.0
 */
const demos: Tests_DemoCoverage_Demos = presetsIndexNames.map((name) => ({
  name,
  path: `apps/demo-${name}/docusaurus.config.ts`,
}));

/**
 * Tests - Demo Coverage - Required Leaf Paths.
 *
 * Dotted-path catalogue of every consumer-facing leaf in
 * `NovaThemeConfig`. Every demo MUST resolve a non-undefined
 * value for every entry here. Adding a new field to the
 * preset type contract requires adding the leaf path here
 * AND populating it in all six demos.
 *
 * Notation: dots separate object keys; the catalogue stops
 * at primitive leaves and at array / record values (arrays
 * and records are treated as leaves - their internal shape
 * is exercised by content rather than by config-coverage).
 *
 * @since 0.18.0
 */
const requiredLeafPaths: Tests_DemoCoverage_RequiredLeafPaths = [
  'themeConfig.site.title',
  'themeConfig.site.logo.alt',
  'themeConfig.site.logo.src.light',
  'themeConfig.site.logo.src.dark',
  'themeConfig.site.logo.href',
  'themeConfig.site.logo.target',
  'themeConfig.site.logo.rel',
  'themeConfig.site.logo.ariaLabel',
  'themeConfig.site.logo.wordmark.light',
  'themeConfig.site.logo.wordmark.dark',
  'themeConfig.site.logo.title',
  'themeConfig.site.image',
  'themeConfig.site.metadata',
  'themeConfig.colorMode.defaultMode',
  'themeConfig.colorMode.disableSwitch',
  'themeConfig.navbar.hideOnScroll',
  'themeConfig.navbar.items',
  'themeConfig.docs.versionPersistence',
  'themeConfig.docs.sidebar.hideable',
  'themeConfig.docs.sidebar.autoCollapseCategories',
  'themeConfig.blog.sidebar.groupByYear',
  'themeConfig.blog.layout.heading',
  'themeConfig.blog.layout.description',
  'themeConfig.blog.share.platforms',
  'themeConfig.tableOfContents.minHeadingLevel',
  'themeConfig.tableOfContents.maxHeadingLevel',
  'themeConfig.announcementBar.id',
  'themeConfig.announcementBar.content',
  'themeConfig.announcementBar.backgroundColor',
  'themeConfig.announcementBar.textColor',
  'themeConfig.announcementBar.isCloseable',
  'themeConfig.backToTopButton',
  'themeConfig.errorPages.notFound.title',
  'themeConfig.errorPages.notFound.description',
  'themeConfig.errorPages.notFound.backHomeLabel',
  'themeConfig.errorPages.notFound.backHomeHref',
  'themeConfig.errorPages.errorPageContent.title',
  'themeConfig.errorPages.errorPageContent.retryLabel',
  'themeConfig.errorPages.error.retryLabel',
  'themeConfig.footer.sections',
  'themeConfig.footer.layout',
  'themeConfig.footer.socialLinks',
  'themeConfig.footer.copyright',
  'themeConfig.footer.credit',
  'themeConfig.footer.cta',
];

/**
 * Tests - Demo Coverage - Derive Required Leaf Paths.
 *
 * Parses `nova-config.d.ts` to discover every leaf path
 * reachable from `NovaThemeConfig` and returns the full
 * dotted-path list (rooted at `themeConfig`). The walk
 * recurses through `NovaThemeConfig{Path}` object-type
 * aliases and terminates at any type alias that is not
 * itself an object definition (primitives, enums, arrays,
 * records). The result is compared against the manually
 * authored `requiredLeafPaths` registry so neither side
 * can drift without the test catching it.
 *
 * @since 0.18.0
 */
async function deriveRequiredLeafPaths(typeFilePath: Tests_DemoCoverage_DeriveRequiredLeafPaths_TypeFilePath): Tests_DemoCoverage_DeriveRequiredLeafPaths_Returns {
  const fileText: Tests_DemoCoverage_DeriveRequiredLeafPaths_FileText = await readFile(typeFilePath, 'utf-8');
  const objectTypes: Tests_DemoCoverage_DeriveRequiredLeafPaths_ObjectTypes = new Map();
  const blockPattern: Tests_DemoCoverage_DeriveRequiredLeafPaths_BlockPattern = new RegExp(LIB_REGEX_NOVA_THEME_CONFIG_OBJECT_TYPE.source, 'g');

  let blockMatch: Tests_DemoCoverage_DeriveRequiredLeafPaths_BlockMatch = blockPattern.exec(fileText);

  while (blockMatch !== null) {
    const typeName: Tests_DemoCoverage_DeriveRequiredLeafPaths_TypeName = blockMatch[1] ?? '';
    const blockBody: Tests_DemoCoverage_DeriveRequiredLeafPaths_BlockBody = blockMatch[2] ?? '';
    const fields: Tests_DemoCoverage_DeriveRequiredLeafPaths_Fields = new Map();
    const fieldPattern: Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldPattern = new RegExp(LIB_REGEX_TYPE_DECLARATION_FIELD.source, 'gm');

    let fieldMatch: Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldMatch = fieldPattern.exec(blockBody);

    while (fieldMatch !== null) {
      const fieldName: Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldName = fieldMatch[1] ?? '';
      const fieldExpression: Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldExpression = (fieldMatch[2] ?? '').trim();
      const fieldTypeMatch: Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldTypeMatch = fieldExpression.match(LIB_REGEX_NOVA_THEME_CONFIG_TYPE_REFERENCE);
      const fieldType: Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldType = (fieldTypeMatch !== null && fieldTypeMatch[1] !== undefined) ? fieldTypeMatch[1] : fieldExpression;

      fields.set(fieldName, fieldType);

      fieldMatch = fieldPattern.exec(blockBody);
    }

    objectTypes.set(typeName, fields);

    blockMatch = blockPattern.exec(fileText);
  }

  const leaves: Tests_DemoCoverage_DeriveRequiredLeafPaths_Leaves = [];
  const walkStack: Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkStack = [{
    typeName: 'NovaThemeConfig',
    path: ['themeConfig'],
  }];

  while (walkStack.length > 0) {
    const entry: Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkEntry = walkStack.pop() as Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkEntry;
    const entryFields: Tests_DemoCoverage_DeriveRequiredLeafPaths_EntryFields = objectTypes.get(entry['typeName']);

    if (entryFields === undefined) {
      leaves.push(entry['path'].join('.'));

      continue;
    }

    for (const fieldEntry of entryFields) {
      const walkFieldEntry: Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldEntry = fieldEntry;
      const walkFieldName: Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldName = walkFieldEntry[0];
      const walkFieldType: Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldType = walkFieldEntry[1];

      walkStack.push({
        typeName: walkFieldType,
        path: [
          ...entry['path'],
          walkFieldName,
        ],
      });
    }
  }

  return leaves;
}

/**
 * Tests - Demo Coverage - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from
 * the current test file location.
 *
 * @since 0.18.0
 */
function getPackageRoot(): Tests_DemoCoverage_GetPackageRoot_Returns {
  const currentFilePath: Tests_DemoCoverage_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_DemoCoverage_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Demo Coverage - Get Repo Root.
 *
 * Resolves the monorepo root by walking up from the
 * preset package directory to its grandparent.
 *
 * @since 0.18.0
 */
function getRepoRoot(): Tests_DemoCoverage_GetRepoRoot_Returns {
  return resolve(getPackageRoot(), '..', '..');
}

/**
 * Tests - Demo Coverage - Load Demo Config.
 *
 * Dynamically imports a demo's `docusaurus.config.ts` and
 * returns its default export as a record. The configs are
 * TypeScript object literals with type-only imports - the
 * import resolves at vite-node load time without running
 * any Docusaurus runtime.
 *
 * @since 0.18.0
 */
async function loadDemoConfig(demoPath: Tests_DemoCoverage_LoadDemoConfig_DemoPath): Tests_DemoCoverage_LoadDemoConfig_Returns {
  const configUrl: Tests_DemoCoverage_LoadDemoConfig_ConfigUrl = pathToFileURL(resolve(getRepoRoot(), demoPath)).href;
  const moduleNamespace: Tests_DemoCoverage_LoadDemoConfig_Module = await import(configUrl);

  return moduleNamespace['default'];
}

/**
 * Tests - Demo Coverage - Resolve Leaf.
 *
 * Walks a dotted-path expression through a config record
 * and returns the FIRST segment that is not declared as an
 * own property at its level, or `null` if every segment in
 * the path is declared. Property values may be `undefined`
 * - the rule only requires the property *name* to exist on
 * the parent object, mirroring the schema. A missing
 * property (where `Object.hasOwn` returns false) or a
 * non-object intermediate value is reported as a miss.
 *
 * @since 0.18.0
 */
function resolveLeaf(config: Tests_DemoCoverage_ResolveLeaf_Config, path: Tests_DemoCoverage_ResolveLeaf_Path): Tests_DemoCoverage_ResolveLeaf_Returns {
  const segments: Tests_DemoCoverage_ResolveLeaf_Segments = path.split('.');

  let cursor: Tests_DemoCoverage_ResolveLeaf_Cursor = config;

  for (let index: Tests_DemoCoverage_ResolveLeaf_Index = 0; index < segments.length; index += 1) {
    const segmentName: Tests_DemoCoverage_ResolveLeaf_Segment = segments[index] ?? '';

    if (
      cursor === null
      || cursor === undefined
      || typeof cursor !== 'object'
    ) {
      return segments.slice(0, index + 1).join('.');
    }

    if (Object.hasOwn(cursor as Tests_DemoCoverage_DemoRecord, segmentName) === false) {
      return segments.slice(0, index + 1).join('.');
    }

    cursor = (cursor as Tests_DemoCoverage_DemoRecord)[segmentName];
  }

  return null;
}

/**
 * Tests - Demo Coverage - Demo Coverage.
 *
 * For every demo and every registered required leaf path,
 * assert the demo's config resolves a non-undefined value
 * at that path. Aggregates misses per demo into a single
 * fail message. Catches the drift mode where a preset
 * feature ships in `NovaThemeConfig` but only a subset of
 * the six demos populate it - the unpopulated demos rot
 * silently because their rendering path is never exercised.
 *
 * @since 0.18.0
 */
describe('demo coverage', () => {
  it('registry matches every leaf reachable from NovaThemeConfig', async () => {
    const typeFilePath: Tests_DemoCoverage_DeriveRequiredLeafPaths_TypeFilePath = resolve(getPackageRoot(), 'nova-config.d.ts');
    const derived: Tests_DemoCoverage_DemoCoverage_Derived = await deriveRequiredLeafPaths(typeFilePath);
    const derivedSet: Tests_DemoCoverage_DemoCoverage_DerivedSet = new Set(derived);
    const registrySet: Tests_DemoCoverage_DemoCoverage_RegistrySet = new Set(requiredLeafPaths);
    const missingInRegistry: Tests_DemoCoverage_DemoCoverage_MissingInRegistry = derived.filter((leaf) => registrySet.has(leaf) === false);
    const staleInRegistry: Tests_DemoCoverage_DemoCoverage_StaleInRegistry = requiredLeafPaths.filter((leaf) => derivedSet.has(leaf) === false);
    const registryMessage: Tests_DemoCoverage_DemoCoverage_RegistryMessage = [
      'Registry / NovaThemeConfig drift:',
      `  Missing in registry (in type but not registered): ${missingInRegistry.length}`,
      ...missingInRegistry.map((leaf) => `    + ${leaf}`),
      `  Stale in registry (registered but not in type): ${staleInRegistry.length}`,
      ...staleInRegistry.map((leaf) => `    - ${leaf}`),
    ].join('\n');

    strictEqual(missingInRegistry.length + staleInRegistry.length, 0, registryMessage);

    return;
  });

  for (const demo of demos) {
    const demoContext: Tests_DemoCoverage_DemoEntry = demo;

    it(`'${demoContext['name']}' demo sets every required NovaThemeConfig leaf`, async () => {
      const demoParam: Tests_DemoCoverage_DemoCoverage_Demo = demoContext;
      const config: Tests_DemoCoverage_DemoCoverage_Config = await loadDemoConfig(demoParam['path']);
      const misses: Tests_DemoCoverage_DemoCoverage_Misses = [];

      for (const leaf of requiredLeafPaths) {
        const leafPath: Tests_DemoCoverage_DemoCoverage_Leaf = leaf;
        const missAt: Tests_DemoCoverage_DemoCoverage_Value = resolveLeaf(config, leafPath);

        if (missAt !== null) {
          misses.push(`  - ${leafPath} (missing at: ${missAt})`);
        }
      }

      const message: Tests_DemoCoverage_DemoCoverage_Message = [
        `'${demoParam['name']}' demo has ${misses.length} undefined required leaves:`,
        ...misses,
      ].join('\n');

      strictEqual(misses.length, 0, message);

      return;
    });
  }

  return;
});
