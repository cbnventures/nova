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
  TestsDemoCoverageDemoCoverageConfig,
  TestsDemoCoverageDemoCoverageDemo,
  TestsDemoCoverageDemoCoverageDerived,
  TestsDemoCoverageDemoCoverageDerivedSet,
  TestsDemoCoverageDemoCoverageLeaf,
  TestsDemoCoverageDemoCoverageMessage,
  TestsDemoCoverageDemoCoverageMisses,
  TestsDemoCoverageDemoCoverageMissingInRegistry,
  TestsDemoCoverageDemoCoverageRegistryMessage,
  TestsDemoCoverageDemoCoverageRegistrySet,
  TestsDemoCoverageDemoCoverageStaleInRegistry,
  TestsDemoCoverageDemoCoverageValue,
  TestsDemoCoverageDemoEntry,
  TestsDemoCoverageDemoRecord,
  TestsDemoCoverageDemos,
  TestsDemoCoverageDeriveRequiredLeafPathsBlockBody,
  TestsDemoCoverageDeriveRequiredLeafPathsBlockMatch,
  TestsDemoCoverageDeriveRequiredLeafPathsBlockPattern,
  TestsDemoCoverageDeriveRequiredLeafPathsEntryFields,
  TestsDemoCoverageDeriveRequiredLeafPathsFieldEntry,
  TestsDemoCoverageDeriveRequiredLeafPathsFieldExpression,
  TestsDemoCoverageDeriveRequiredLeafPathsFieldMatch,
  TestsDemoCoverageDeriveRequiredLeafPathsFieldName,
  TestsDemoCoverageDeriveRequiredLeafPathsFieldPattern,
  TestsDemoCoverageDeriveRequiredLeafPathsFields,
  TestsDemoCoverageDeriveRequiredLeafPathsFieldType,
  TestsDemoCoverageDeriveRequiredLeafPathsFieldTypeMatch,
  TestsDemoCoverageDeriveRequiredLeafPathsFileText,
  TestsDemoCoverageDeriveRequiredLeafPathsLeaves,
  TestsDemoCoverageDeriveRequiredLeafPathsObjectTypes,
  TestsDemoCoverageDeriveRequiredLeafPathsReturns,
  TestsDemoCoverageDeriveRequiredLeafPathsTypeFilePath,
  TestsDemoCoverageDeriveRequiredLeafPathsTypeName,
  TestsDemoCoverageDeriveRequiredLeafPathsWalkEntry,
  TestsDemoCoverageDeriveRequiredLeafPathsWalkStack,
  TestsDemoCoverageGetPackageRootCurrentFileDirectory,
  TestsDemoCoverageGetPackageRootCurrentFilePath,
  TestsDemoCoverageGetPackageRootReturns,
  TestsDemoCoverageGetRepoRootReturns,
  TestsDemoCoverageLoadDemoConfigConfigUrl,
  TestsDemoCoverageLoadDemoConfigDemoPath,
  TestsDemoCoverageLoadDemoConfigModule,
  TestsDemoCoverageLoadDemoConfigReturns,
  TestsDemoCoverageRequiredLeafPaths,
  TestsDemoCoverageResolveLeafConfig,
  TestsDemoCoverageResolveLeafCursor,
  TestsDemoCoverageResolveLeafIndex,
  TestsDemoCoverageResolveLeafPath,
  TestsDemoCoverageResolveLeafReturns,
  TestsDemoCoverageResolveLeafSegment,
  TestsDemoCoverageResolveLeafSegments,
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
const demos: TestsDemoCoverageDemos = presetsIndexNames.map((name) => ({
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
const requiredLeafPaths: TestsDemoCoverageRequiredLeafPaths = [
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
async function deriveRequiredLeafPaths(typeFilePath: TestsDemoCoverageDeriveRequiredLeafPathsTypeFilePath): TestsDemoCoverageDeriveRequiredLeafPathsReturns {
  const fileText: TestsDemoCoverageDeriveRequiredLeafPathsFileText = await readFile(typeFilePath, 'utf-8');
  const objectTypes: TestsDemoCoverageDeriveRequiredLeafPathsObjectTypes = new Map();
  const blockPattern: TestsDemoCoverageDeriveRequiredLeafPathsBlockPattern = new RegExp(LIB_REGEX_NOVA_THEME_CONFIG_OBJECT_TYPE.source, 'g');

  let blockMatch: TestsDemoCoverageDeriveRequiredLeafPathsBlockMatch = blockPattern.exec(fileText);

  while (blockMatch !== null) {
    const typeName: TestsDemoCoverageDeriveRequiredLeafPathsTypeName = blockMatch[1] ?? '';
    const blockBody: TestsDemoCoverageDeriveRequiredLeafPathsBlockBody = blockMatch[2] ?? '';
    const fields: TestsDemoCoverageDeriveRequiredLeafPathsFields = new Map();
    const fieldPattern: TestsDemoCoverageDeriveRequiredLeafPathsFieldPattern = new RegExp(LIB_REGEX_TYPE_DECLARATION_FIELD.source, 'gm');

    let fieldMatch: TestsDemoCoverageDeriveRequiredLeafPathsFieldMatch = fieldPattern.exec(blockBody);

    while (fieldMatch !== null) {
      const fieldName: TestsDemoCoverageDeriveRequiredLeafPathsFieldName = fieldMatch[1] ?? '';
      const fieldExpression: TestsDemoCoverageDeriveRequiredLeafPathsFieldExpression = (fieldMatch[2] ?? '').trim();
      const fieldTypeMatch: TestsDemoCoverageDeriveRequiredLeafPathsFieldTypeMatch = fieldExpression.match(LIB_REGEX_NOVA_THEME_CONFIG_TYPE_REFERENCE);
      const fieldType: TestsDemoCoverageDeriveRequiredLeafPathsFieldType = (fieldTypeMatch !== null && fieldTypeMatch[1] !== undefined) ? fieldTypeMatch[1] : fieldExpression;

      fields.set(fieldName, fieldType);

      fieldMatch = fieldPattern.exec(blockBody);
    }

    objectTypes.set(typeName, fields);

    blockMatch = blockPattern.exec(fileText);
  }

  const leaves: TestsDemoCoverageDeriveRequiredLeafPathsLeaves = [];
  const walkStack: TestsDemoCoverageDeriveRequiredLeafPathsWalkStack = [{
    typeName: 'NovaThemeConfig',
    path: ['themeConfig'],
  }];

  while (walkStack.length > 0) {
    const entry: TestsDemoCoverageDeriveRequiredLeafPathsWalkEntry = walkStack.pop() as TestsDemoCoverageDeriveRequiredLeafPathsWalkEntry;
    const entryFields: TestsDemoCoverageDeriveRequiredLeafPathsEntryFields = objectTypes.get(entry['typeName']);

    if (entryFields === undefined) {
      leaves.push(entry['path'].join('.'));

      continue;
    }

    for (const fieldEntry of entryFields) {
      const walkFieldEntry: TestsDemoCoverageDeriveRequiredLeafPathsFieldEntry = fieldEntry;
      const walkFieldName: TestsDemoCoverageDeriveRequiredLeafPathsFieldName = walkFieldEntry[0];
      const walkFieldType: TestsDemoCoverageDeriveRequiredLeafPathsFieldType = walkFieldEntry[1];

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
function getPackageRoot(): TestsDemoCoverageGetPackageRootReturns {
  const currentFilePath: TestsDemoCoverageGetPackageRootCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsDemoCoverageGetPackageRootCurrentFileDirectory = dirname(currentFilePath);

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
function getRepoRoot(): TestsDemoCoverageGetRepoRootReturns {
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
async function loadDemoConfig(demoPath: TestsDemoCoverageLoadDemoConfigDemoPath): TestsDemoCoverageLoadDemoConfigReturns {
  const configUrl: TestsDemoCoverageLoadDemoConfigConfigUrl = pathToFileURL(resolve(getRepoRoot(), demoPath)).href;
  const moduleNamespace: TestsDemoCoverageLoadDemoConfigModule = await import(configUrl);

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
function resolveLeaf(config: TestsDemoCoverageResolveLeafConfig, path: TestsDemoCoverageResolveLeafPath): TestsDemoCoverageResolveLeafReturns {
  const segments: TestsDemoCoverageResolveLeafSegments = path.split('.');

  let cursor: TestsDemoCoverageResolveLeafCursor = config;

  for (let index: TestsDemoCoverageResolveLeafIndex = 0; index < segments.length; index += 1) {
    const segmentName: TestsDemoCoverageResolveLeafSegment = segments[index] ?? '';

    if (
      cursor === null
      || cursor === undefined
      || typeof cursor !== 'object'
    ) {
      return segments.slice(0, index + 1).join('.');
    }

    if (Object.hasOwn(cursor as TestsDemoCoverageDemoRecord, segmentName) === false) {
      return segments.slice(0, index + 1).join('.');
    }

    cursor = (cursor as TestsDemoCoverageDemoRecord)[segmentName];
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
    const typeFilePath: TestsDemoCoverageDeriveRequiredLeafPathsTypeFilePath = resolve(getPackageRoot(), 'nova-config.d.ts');
    const derived: TestsDemoCoverageDemoCoverageDerived = await deriveRequiredLeafPaths(typeFilePath);
    const derivedSet: TestsDemoCoverageDemoCoverageDerivedSet = new Set(derived);
    const registrySet: TestsDemoCoverageDemoCoverageRegistrySet = new Set(requiredLeafPaths);
    const missingInRegistry: TestsDemoCoverageDemoCoverageMissingInRegistry = derived.filter((leaf) => registrySet.has(leaf) === false);
    const staleInRegistry: TestsDemoCoverageDemoCoverageStaleInRegistry = requiredLeafPaths.filter((leaf) => derivedSet.has(leaf) === false);
    const registryMessage: TestsDemoCoverageDemoCoverageRegistryMessage = [
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
    const demoContext: TestsDemoCoverageDemoEntry = demo;

    it(`'${demoContext['name']}' demo sets every required NovaThemeConfig leaf`, async () => {
      const demoParam: TestsDemoCoverageDemoCoverageDemo = demoContext;
      const config: TestsDemoCoverageDemoCoverageConfig = await loadDemoConfig(demoParam['path']);
      const misses: TestsDemoCoverageDemoCoverageMisses = [];

      for (const leaf of requiredLeafPaths) {
        const leafPath: TestsDemoCoverageDemoCoverageLeaf = leaf;
        const missAt: TestsDemoCoverageDemoCoverageValue = resolveLeaf(config, leafPath);

        if (missAt !== null) {
          misses.push(`  - ${leafPath} (missing at: ${missAt})`);
        }
      }

      const message: TestsDemoCoverageDemoCoverageMessage = [
        `'${demoParam['name']}' demo has ${misses.length} undefined required leaves:`,
        ...misses,
      ].join('\n');

      strictEqual(misses.length, 0, message);

      return;
    });
  }

  return;
});
