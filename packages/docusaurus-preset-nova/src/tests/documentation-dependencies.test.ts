import { strictEqual } from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import type {
  Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_CurrentFileDirectory,
  Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_DependencyNames,
  Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_Ledger,
  Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_LedgerPath,
  Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_Manifest,
  Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_ManifestPath,
  Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_ManifestRaw,
  Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_PackageDirectory,
} from '../types/tests/documentation-dependencies.test.d.ts';

/**
 * Tests - Documentation Dependencies - Documentation Dependencies.
 *
 * @since 0.26.0
 */
describe('documentation dependencies', () => {
  it('documents every runtime and peer dependency', () => {
    const currentFileDirectory: Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_CurrentFileDirectory = dirname(fileURLToPath(import.meta.url));
    const packageDirectory: Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_PackageDirectory = resolve(currentFileDirectory, '../..');
    const manifestPath: Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_ManifestPath = resolve(packageDirectory, 'package.json');
    const ledgerPath: Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_LedgerPath = resolve(packageDirectory, '../../apps/docs/docs/facades/docusaurus-preset/reference/preset-stack.mdx');
    const manifestRaw: Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_ManifestRaw = readFileSync(manifestPath, 'utf-8');
    const manifest: Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_Manifest = JSON.parse(manifestRaw) as Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_Manifest;
    const ledger: Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_Ledger = readFileSync(ledgerPath, 'utf-8');
    const dependencyNames: Tests_DocumentationDependencies_DocumentationDependencies_DocumentsEveryRuntimeAndPeerDependency_DependencyNames = [
      ...Object.keys(manifest['dependencies']),
      ...Object.keys(manifest['peerDependencies']),
    ];

    for (const dependencyName of dependencyNames) {
      strictEqual(
        ledger.includes(`\`${dependencyName}\``),
        true,
        `Document ${dependencyName} in the Docusaurus preset dependency ledger.`,
      );
    }

    return;
  });

  return;
});
