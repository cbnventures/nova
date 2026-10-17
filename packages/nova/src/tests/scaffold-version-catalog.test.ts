import {
  notStrictEqual,
  strictEqual,
  throws,
} from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { globSync } from 'glob';
import {
  describe,
  it,
} from 'vitest';

import {
  applyScaffoldVersionReplacements,
  getScaffoldVersion,
} from '../lib/scaffold-versions.js';

import type {
  Tests_ScaffoldVersionCatalog_Catalog,
  Tests_ScaffoldVersionCatalog_CatalogPath,
  Tests_ScaffoldVersionCatalog_CatalogRaw,
  Tests_ScaffoldVersionCatalog_PackageDirectory,
  Tests_ScaffoldVersionCatalog_Placeholders,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_ContainsValidAndUniquelyAddressableEntries_EntryKey,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_ContainsValidAndUniquelyAddressableEntries_EntryValue,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_Placeholder,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_Segments,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_SuffixIndex,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_TypedSegment,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_Manifest,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestPaths,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestRaw,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestSections,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestValues,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_Name,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_TypedManifestPath,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_TypedManifestSection,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_Value,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyWorkflowActionReference_BlueprintLine,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_ResolvesCatalogValuesWithoutNetworkAccess_TypescriptEntry,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_UsesEveryCatalogEntryInATemplateOrGeneratedCodePath_EntryKey,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_UsesEveryCatalogEntryInATemplateOrGeneratedCodePath_EntryUsage,
  Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_UsesEveryCatalogEntryInATemplateOrGeneratedCodePath_EntryValue,
  Tests_ScaffoldVersionCatalog_SourceContents,
  Tests_ScaffoldVersionCatalog_SourcePaths,
  Tests_ScaffoldVersionCatalog_TemplateContents,
  Tests_ScaffoldVersionCatalog_TemplatePaths,
  Tests_ScaffoldVersionCatalog_WorkflowBlueprintContents,
  Tests_ScaffoldVersionCatalog_WorkflowBlueprintPath,
} from '../types/tests/scaffold-version-catalog.test.d.ts';

const packageDirectory: Tests_ScaffoldVersionCatalog_PackageDirectory = join(fileURLToPath(import.meta.url), '..', '..', '..');
const catalogPath: Tests_ScaffoldVersionCatalog_CatalogPath = join(packageDirectory, 'scaffold-versions.json');
const catalogRaw: Tests_ScaffoldVersionCatalog_CatalogRaw = readFileSync(catalogPath, 'utf-8');
const catalog: Tests_ScaffoldVersionCatalog_Catalog = JSON.parse(catalogRaw);
const templatePaths: Tests_ScaffoldVersionCatalog_TemplatePaths = globSync('templates/**/*', {
  absolute: true,
  cwd: packageDirectory,
  ignore: [
    '**/*.gif',
    '**/*.ico',
    '**/*.jar',
    '**/*.jpeg',
    '**/*.jpg',
    '**/*.png',
    '**/*.webp',
    '**/*.woff',
    '**/*.woff2',
  ],
  nodir: true,
}).sort();
const sourcePaths: Tests_ScaffoldVersionCatalog_SourcePaths = globSync('src/**/*.ts', {
  absolute: true,
  cwd: packageDirectory,
  nodir: true,
}).sort();
const templateContents: Tests_ScaffoldVersionCatalog_TemplateContents = templatePaths.map((templatePath) => readFileSync(templatePath, 'utf-8')).join('\n');
const sourceContents: Tests_ScaffoldVersionCatalog_SourceContents = sourcePaths.map((sourcePath) => readFileSync(sourcePath, 'utf-8')).join('\n');
const workflowBlueprintPath: Tests_ScaffoldVersionCatalog_WorkflowBlueprintPath = join(packageDirectory, 'src', 'cli', 'generate', 'github', 'workflows-blueprint.ts');
const workflowBlueprintContents: Tests_ScaffoldVersionCatalog_WorkflowBlueprintContents = readFileSync(workflowBlueprintPath, 'utf-8');
const placeholders: Tests_ScaffoldVersionCatalog_Placeholders = new Set(Object.values(catalog['entries']).map((entry) => entry['placeholder']));

/**
 * Tests - Scaffold Version Catalog - Scaffold Version Catalog.
 *
 * Verifies the bundled version snapshot owns every third-party scaffold pin,
 * resolves every template token, and leaves Nova's own release version under
 * the existing release machinery.
 *
 * @since 0.32.0
 */
describe('scaffold version catalog', () => {
  it('contains valid and uniquely addressable entries', () => {
    strictEqual(catalog['schemaVersion'], 1);

    for (const catalogEntry of Object.entries(catalog['entries'])) {
      const entryKey: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_ContainsValidAndUniquelyAddressableEntries_EntryKey = catalogEntry[0];
      const entryValue: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_ContainsValidAndUniquelyAddressableEntries_EntryValue = catalogEntry[1];

      notStrictEqual(entryKey, '');
      notStrictEqual(entryValue['value'], '');
      notStrictEqual(entryValue['group'], '');
      strictEqual(entryValue['placeholder'].startsWith('[__SCAFFOLD_VERSION_'), true);
      strictEqual(entryValue['placeholder'].endsWith('__]'), true);
    }

    strictEqual(placeholders.size, Object.keys(catalog['entries']).length, 'Every scaffold version catalog placeholder must be unique.');

    return;
  });

  it('uses every catalog entry in a template or generated code path', () => {
    for (const catalogEntry of Object.entries(catalog['entries'])) {
      const entryKey: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_UsesEveryCatalogEntryInATemplateOrGeneratedCodePath_EntryKey = catalogEntry[0];
      const entryValue: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_UsesEveryCatalogEntryInATemplateOrGeneratedCodePath_EntryValue = catalogEntry[1];
      const entryUsage: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_UsesEveryCatalogEntryInATemplateOrGeneratedCodePath_EntryUsage = templateContents.includes(entryValue['placeholder'])
        || sourceContents.includes(`getScaffoldVersion('${entryKey}')`);

      strictEqual(entryUsage, true, `Unused scaffold version catalog entry: ${entryKey}`);
    }

    return;
  });

  it('does not contain unknown scaffold version placeholders', () => {
    const segments: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_Segments = templateContents.split('[__SCAFFOLD_VERSION_').slice(1);

    for (const segment of segments) {
      const typedSegment: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_TypedSegment = segment;
      const suffixIndex: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_SuffixIndex = typedSegment.indexOf('__]');

      notStrictEqual(suffixIndex, -1, 'Scaffold version placeholder is missing its closing marker.');

      const placeholder: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_Placeholder = `[__SCAFFOLD_VERSION_${typedSegment.slice(0, suffixIndex)}__]`;

      strictEqual(placeholders.has(placeholder), true, `Unknown scaffold version placeholder: ${placeholder}`);
    }

    return;
  });

  it('resolves catalog values without network access', () => {
    const typescriptEntry: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_ResolvesCatalogValuesWithoutNetworkAccess_TypescriptEntry = catalog['entries']['typescript'];

    if (typescriptEntry === undefined) {
      throw new Error('The TypeScript scaffold version catalog entry must exist.');
    }

    strictEqual(getScaffoldVersion('typescript'), typescriptEntry['value']);
    strictEqual(
      applyScaffoldVersionReplacements('Version [__SCAFFOLD_VERSION_TYPESCRIPT__].'),
      `Version ${typescriptEntry['value']}.`,
    );
    throws(() => getScaffoldVersion('not-a-catalog-key'), {
      message: 'Unknown scaffold version catalog key: not-a-catalog-key',
    });

    return;
  });

  it('owns every third-party package manifest pin', () => {
    const manifestPaths: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestPaths = globSync('templates/scaffold/**/package.json', {
      absolute: true,
      cwd: packageDirectory,
    }).sort();
    const manifestSections: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestSections = [
      'dependencies',
      'devDependencies',
      'engines',
      'peerDependencies',
    ];

    for (const manifestPath of manifestPaths) {
      const typedManifestPath: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_TypedManifestPath = manifestPath;
      const manifestRaw: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestRaw = readFileSync(typedManifestPath, 'utf-8');
      const manifest: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_Manifest = JSON.parse(manifestRaw);

      for (const manifestSection of manifestSections) {
        const typedManifestSection: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_TypedManifestSection = manifestSection;
        const manifestValues: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestValues = manifest[typedManifestSection] ?? {};

        for (const manifestEntry of Object.entries(manifestValues)) {
          const name: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_Name = manifestEntry[0];
          const value: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_Value = manifestEntry[1];

          if (name === '@cbnventures/nova' || name === '@cbnventures/docusaurus-preset-nova') {
            continue;
          }

          strictEqual(placeholders.has(value), true, `Unmanaged scaffold version "${value}" for "${name}" in ${typedManifestPath}.`);
        }
      }
    }

    return;
  });

  it('owns every third-party workflow action reference', () => {
    for (const workflowBlueprintLine of workflowBlueprintContents.split('\n')) {
      const blueprintLine: Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyWorkflowActionReference_BlueprintLine = workflowBlueprintLine.trim();

      if (blueprintLine.startsWith('uses: ') === false) {
        continue;
      }

      strictEqual(
        blueprintLine.includes('getScaffoldVersion(\'workflowAction'),
        true,
        `Unmanaged workflow action reference in the programmatic generator: ${blueprintLine}`,
      );
    }

    return;
  });

  return;
});
