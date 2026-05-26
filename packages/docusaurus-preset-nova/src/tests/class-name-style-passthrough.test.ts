import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import { describe, it } from 'vitest';

import { LIB_REGEX_PROPS_CLASS_NAME_INTERPOLATION } from '../lib/regex.js';

import type {
  TestsClassNameStylePassthroughClassNameStylePassthroughComponentKey,
  TestsClassNameStylePassthroughClassNameStylePassthroughDtsContent,
  TestsClassNameStylePassthroughClassNameStylePassthroughDtsPath,
  TestsClassNameStylePassthroughClassNameStylePassthroughExemptSet,
  TestsClassNameStylePassthroughClassNameStylePassthroughHasConditional,
  TestsClassNameStylePassthroughClassNameStylePassthroughHasInterpolation,
  TestsClassNameStylePassthroughClassNameStylePassthroughInScopeComponents,
  TestsClassNameStylePassthroughClassNameStylePassthroughMessage,
  TestsClassNameStylePassthroughClassNameStylePassthroughTsxContent,
  TestsClassNameStylePassthroughClassNameStylePassthroughTsxPath,
  TestsClassNameStylePassthroughClassNameStylePassthroughViolations,
  TestsClassNameStylePassthroughDiscoverComponentsBlocksFiles,
  TestsClassNameStylePassthroughDiscoverComponentsBlocksRoot,
  TestsClassNameStylePassthroughDiscoverComponentsKeyed,
  TestsClassNameStylePassthroughDiscoverComponentsReturns,
  TestsClassNameStylePassthroughDiscoverComponentsThemeFiles,
  TestsClassNameStylePassthroughDiscoverComponentsThemeRoot,
  TestsClassNameStylePassthroughExemptComponents,
  TestsClassNameStylePassthroughGetPackageRootCurrentFileDirectory,
  TestsClassNameStylePassthroughGetPackageRootCurrentFilePath,
  TestsClassNameStylePassthroughGetPackageRootReturns,
} from '../types/tests/class-name-style-passthrough.test.d.ts';

/**
 * Tests - Class Name Style Passthrough - Exempt Components.
 *
 * Components that legitimately cannot accept `className` /
 * `style` passthrough because they have no single DOM root
 * (return a fragment, return `null`, render only Helmet
 * children, or export a non-component object). Listed by
 * their key form `theme/Path/To/Component` or
 * `blocks/Name` so glob output can be compared
 * directly.
 *
 * @since 0.18.0
 */
const exemptComponents: TestsClassNameStylePassthroughExemptComponents = [
  'theme/BlogListPage/StructuredData',
  'theme/BlogPostPage/Metadata',
  'theme/BlogPostPage/StructuredData',
  'theme/ColorModeToggle',
  'theme/DocBreadcrumbs/StructuredData',
  'theme/DocVersionRoot',
  'theme/DocsRoot',
  'theme/Layout/Provider',
  'theme/Logo',
  'theme/MDXComponents',
  'theme/Root',
  'theme/SearchBar',
  'theme/SearchMetadata',
  'theme/SiteMetadata',
  'theme/ThemeProvider',
  'theme/ThemeProvider/TitleFormatter',
];

/**
 * Tests - Class Name Style Passthrough - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @since 0.18.0
 */
function getPackageRoot(): TestsClassNameStylePassthroughGetPackageRootReturns {
  const currentFilePath: TestsClassNameStylePassthroughGetPackageRootCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsClassNameStylePassthroughGetPackageRootCurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Class Name Style Passthrough - Discover Components.
 *
 * Globs every `index.tsx` under `src/theme/` and
 * `src/blocks/` and returns their relative keys, sorted
 * for stable assertion order. Keys are forward-slashed so
 * the comparison against the exempt list is consistent
 * across operating systems.
 *
 * @since 0.18.0
 */
async function discoverComponents(): TestsClassNameStylePassthroughDiscoverComponentsReturns {
  const themeRoot: TestsClassNameStylePassthroughDiscoverComponentsThemeRoot = resolve(getPackageRoot(), 'src', 'theme');
  const blocksRoot: TestsClassNameStylePassthroughDiscoverComponentsBlocksRoot = resolve(getPackageRoot(), 'src', 'blocks');
  const themeFiles: TestsClassNameStylePassthroughDiscoverComponentsThemeFiles = await glob('**/index.tsx', {
    cwd: themeRoot, posix: true,
  });
  const blocksFiles: TestsClassNameStylePassthroughDiscoverComponentsBlocksFiles = await glob('**/index.tsx', {
    cwd: blocksRoot, posix: true,
  });
  const keyed: TestsClassNameStylePassthroughDiscoverComponentsKeyed = [];

  for (const file of themeFiles) {
    keyed.push(`theme/${file.replace('/index.tsx', '')}`);
  }

  for (const file of blocksFiles) {
    keyed.push(`blocks/${file.replace('/index.tsx', '')}`);
  }

  keyed.sort();

  return keyed;
}

/**
 * Tests - Class Name Style Passthrough - Class Name Style Passthrough.
 *
 * For every in-scope component (eligibility: single JSX
 * root element; exempt list captures the 13 components that
 * legitimately cannot accept the props), asserts the
 * canonical Frame pattern is wired:
 *
 *   1. Props type declares `className?:` and `style?:`.
 *   2. .tsx body merges `props['className']` onto the root
 *      element using the `(props['className'] !== undefined)
 *      ? \`umbrella ${props['className']}\` : 'umbrella'`
 *      conditional template-literal form.
 *   3. .tsx body forwards `props['style']` onto the root
 *      element.
 *
 * Catches the drift mode where a consumer-facing prop is
 * declared but silently ignored (the failure case that
 * surfaced TOC / DocPaginator / BlogPostItem /
 * TOCCollapsible during the 9D audit).
 *
 * @since 0.18.0
 */
describe('class name style passthrough', () => {
  const exemptSet: TestsClassNameStylePassthroughClassNameStylePassthroughExemptSet = new Set(exemptComponents);

  it('every exempt component still exists on disk', async () => {
    const allComponents: TestsClassNameStylePassthroughClassNameStylePassthroughInScopeComponents = await discoverComponents();
    const presentSet: TestsClassNameStylePassthroughClassNameStylePassthroughExemptSet = new Set(allComponents);
    const violations: TestsClassNameStylePassthroughClassNameStylePassthroughViolations = exemptComponents.filter((entry) => presentSet.has(entry) === false);
    const message: TestsClassNameStylePassthroughClassNameStylePassthroughMessage = [
      `Exempt list has ${violations.length} stale entries that no longer exist as components:`,
      ...violations.map((entry) => `  - ${entry}`),
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  it('every in-scope component declares className?: and style?: in its props type', async () => {
    const allComponents: TestsClassNameStylePassthroughClassNameStylePassthroughInScopeComponents = await discoverComponents();
    const violations: TestsClassNameStylePassthroughClassNameStylePassthroughViolations = [];

    for (const component of allComponents) {
      const componentKey: TestsClassNameStylePassthroughClassNameStylePassthroughComponentKey = component;

      if (exemptSet.has(componentKey) === true) {
        continue;
      }

      const dtsPath: TestsClassNameStylePassthroughClassNameStylePassthroughDtsPath = resolve(getPackageRoot(), 'src', 'types', `${componentKey}/index.d.ts`);
      const dtsContent: TestsClassNameStylePassthroughClassNameStylePassthroughDtsContent = await readFile(dtsPath, 'utf-8');

      if (dtsContent.includes('className?:') === false) {
        violations.push(`  - ${componentKey}: types file is missing 'className?:' prop`);
      }

      if (dtsContent.includes('style?:') === false) {
        violations.push(`  - ${componentKey}: types file is missing 'style?:' prop`);
      }
    }

    const message: TestsClassNameStylePassthroughClassNameStylePassthroughMessage = [
      `${violations.length} type-declaration violations:`,
      ...violations,
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  it('every in-scope component merges props.className with the canonical pattern', async () => {
    const allComponents: TestsClassNameStylePassthroughClassNameStylePassthroughInScopeComponents = await discoverComponents();
    const violations: TestsClassNameStylePassthroughClassNameStylePassthroughViolations = [];

    for (const component of allComponents) {
      const componentKey: TestsClassNameStylePassthroughClassNameStylePassthroughComponentKey = component;

      if (exemptSet.has(componentKey) === true) {
        continue;
      }

      const tsxPath: TestsClassNameStylePassthroughClassNameStylePassthroughTsxPath = resolve(getPackageRoot(), 'src', `${componentKey}/index.tsx`);
      const tsxContent: TestsClassNameStylePassthroughClassNameStylePassthroughTsxContent = await readFile(tsxPath, 'utf-8');
      const hasConditional: TestsClassNameStylePassthroughClassNameStylePassthroughHasConditional = tsxContent.includes('(props[\'className\'] !== undefined)');
      const hasInterpolation: TestsClassNameStylePassthroughClassNameStylePassthroughHasInterpolation = LIB_REGEX_PROPS_CLASS_NAME_INTERPOLATION.test(tsxContent);

      if (hasConditional === false || hasInterpolation === false) {
        violations.push(`  - ${componentKey}: missing the canonical merge pattern '(props['className'] !== undefined) ? \`umbrella \${props['className']}\` : \\'umbrella\\''`);
      }
    }

    const message: TestsClassNameStylePassthroughClassNameStylePassthroughMessage = [
      `${violations.length} className merge violations:`,
      ...violations,
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  it('every in-scope component forwards props.style to the root element', async () => {
    const allComponents: TestsClassNameStylePassthroughClassNameStylePassthroughInScopeComponents = await discoverComponents();
    const violations: TestsClassNameStylePassthroughClassNameStylePassthroughViolations = [];

    for (const component of allComponents) {
      const componentKey: TestsClassNameStylePassthroughClassNameStylePassthroughComponentKey = component;

      if (exemptSet.has(componentKey) === true) {
        continue;
      }

      const tsxPath: TestsClassNameStylePassthroughClassNameStylePassthroughTsxPath = resolve(getPackageRoot(), 'src', `${componentKey}/index.tsx`);
      const tsxContent: TestsClassNameStylePassthroughClassNameStylePassthroughTsxContent = await readFile(tsxPath, 'utf-8');

      if (tsxContent.includes('props[\'style\']') === false) {
        violations.push(`  - ${componentKey}: missing 'props[\\'style\\']' forward to root element`);
      }
    }

    const message: TestsClassNameStylePassthroughClassNameStylePassthroughMessage = [
      `${violations.length} style forward violations:`,
      ...violations,
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  return;
});
