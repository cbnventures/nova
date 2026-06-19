import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import { describe, it } from 'vitest';

import { LIB_REGEX_PROPS_CLASS_NAME_INTERPOLATION } from '../lib/regex.js';

import type {
  Tests_ClassNameStylePassthrough_AllComponents,
  Tests_ClassNameStylePassthrough_ClassNameStylePassthrough_EveryExemptComponentStillExistsOnDisk_Message,
  Tests_ClassNameStylePassthrough_ClassNameStylePassthrough_EveryInScopeComponentDeclaresClassNameAndStyleInItsPropsType_Message,
  Tests_ClassNameStylePassthrough_ClassNameStylePassthrough_EveryInScopeComponentForwardsPropsStyleToTheRootElement_Message,
  Tests_ClassNameStylePassthrough_ClassNameStylePassthrough_EveryInScopeComponentMergesPropsClassNameWithTheCanonicalPattern_Message,
  Tests_ClassNameStylePassthrough_ClassNameStylePassthrough_ExemptSet,
  Tests_ClassNameStylePassthrough_ComponentKey,
  Tests_ClassNameStylePassthrough_DiscoverComponents_BlocksFiles,
  Tests_ClassNameStylePassthrough_DiscoverComponents_BlocksRoot,
  Tests_ClassNameStylePassthrough_DiscoverComponents_Keyed,
  Tests_ClassNameStylePassthrough_DiscoverComponents_Returns,
  Tests_ClassNameStylePassthrough_DiscoverComponents_ThemeFiles,
  Tests_ClassNameStylePassthrough_DiscoverComponents_ThemeRoot,
  Tests_ClassNameStylePassthrough_DtsContent,
  Tests_ClassNameStylePassthrough_DtsPath,
  Tests_ClassNameStylePassthrough_ExemptComponents,
  Tests_ClassNameStylePassthrough_GetPackageRoot_CurrentFileDirectory,
  Tests_ClassNameStylePassthrough_GetPackageRoot_CurrentFilePath,
  Tests_ClassNameStylePassthrough_GetPackageRoot_Returns,
  Tests_ClassNameStylePassthrough_HasConditional,
  Tests_ClassNameStylePassthrough_HasInterpolation,
  Tests_ClassNameStylePassthrough_PresentSet,
  Tests_ClassNameStylePassthrough_TsxContent,
  Tests_ClassNameStylePassthrough_TsxPath,
  Tests_ClassNameStylePassthrough_Violations,
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
const exemptComponents: Tests_ClassNameStylePassthrough_ExemptComponents = [
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
function getPackageRoot(): Tests_ClassNameStylePassthrough_GetPackageRoot_Returns {
  const currentFilePath: Tests_ClassNameStylePassthrough_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_ClassNameStylePassthrough_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

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
async function discoverComponents(): Tests_ClassNameStylePassthrough_DiscoverComponents_Returns {
  const themeRoot: Tests_ClassNameStylePassthrough_DiscoverComponents_ThemeRoot = resolve(getPackageRoot(), 'src', 'theme');
  const blocksRoot: Tests_ClassNameStylePassthrough_DiscoverComponents_BlocksRoot = resolve(getPackageRoot(), 'src', 'blocks');
  const themeFiles: Tests_ClassNameStylePassthrough_DiscoverComponents_ThemeFiles = await glob('**/index.tsx', {
    cwd: themeRoot, posix: true,
  });
  const blocksFiles: Tests_ClassNameStylePassthrough_DiscoverComponents_BlocksFiles = await glob('**/index.tsx', {
    cwd: blocksRoot, posix: true,
  });
  const keyed: Tests_ClassNameStylePassthrough_DiscoverComponents_Keyed = [];

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
  const exemptSet: Tests_ClassNameStylePassthrough_ClassNameStylePassthrough_ExemptSet = new Set(exemptComponents);

  it('every exempt component still exists on disk', async () => {
    const allComponents: Tests_ClassNameStylePassthrough_AllComponents = await discoverComponents();
    const presentSet: Tests_ClassNameStylePassthrough_PresentSet = new Set(allComponents);
    const violations: Tests_ClassNameStylePassthrough_Violations = exemptComponents.filter((entry) => presentSet.has(entry) === false);
    const message: Tests_ClassNameStylePassthrough_ClassNameStylePassthrough_EveryExemptComponentStillExistsOnDisk_Message = [
      `Exempt list has ${violations.length} stale entries that no longer exist as components:`,
      ...violations.map((entry) => `  - ${entry}`),
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  it('every in-scope component declares className?: and style?: in its props type', async () => {
    const allComponents: Tests_ClassNameStylePassthrough_AllComponents = await discoverComponents();
    const violations: Tests_ClassNameStylePassthrough_Violations = [];

    for (const component of allComponents) {
      const componentKey: Tests_ClassNameStylePassthrough_ComponentKey = component;

      if (exemptSet.has(componentKey) === true) {
        continue;
      }

      const dtsPath: Tests_ClassNameStylePassthrough_DtsPath = resolve(getPackageRoot(), 'src', 'types', `${componentKey}/index.d.ts`);
      const dtsContent: Tests_ClassNameStylePassthrough_DtsContent = await readFile(dtsPath, 'utf-8');

      if (dtsContent.includes('className?:') === false) {
        violations.push(`  - ${componentKey}: types file is missing 'className?:' prop`);
      }

      if (dtsContent.includes('style?:') === false) {
        violations.push(`  - ${componentKey}: types file is missing 'style?:' prop`);
      }
    }

    const message: Tests_ClassNameStylePassthrough_ClassNameStylePassthrough_EveryInScopeComponentDeclaresClassNameAndStyleInItsPropsType_Message = [
      `${violations.length} type-declaration violations:`,
      ...violations,
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  it('every in-scope component merges props.className with the canonical pattern', async () => {
    const allComponents: Tests_ClassNameStylePassthrough_AllComponents = await discoverComponents();
    const violations: Tests_ClassNameStylePassthrough_Violations = [];

    for (const component of allComponents) {
      const componentKey: Tests_ClassNameStylePassthrough_ComponentKey = component;

      if (exemptSet.has(componentKey) === true) {
        continue;
      }

      const tsxPath: Tests_ClassNameStylePassthrough_TsxPath = resolve(getPackageRoot(), 'src', `${componentKey}/index.tsx`);
      const tsxContent: Tests_ClassNameStylePassthrough_TsxContent = await readFile(tsxPath, 'utf-8');
      const hasConditional: Tests_ClassNameStylePassthrough_HasConditional = tsxContent.includes('(props[\'className\'] !== undefined)');
      const hasInterpolation: Tests_ClassNameStylePassthrough_HasInterpolation = LIB_REGEX_PROPS_CLASS_NAME_INTERPOLATION.test(tsxContent);

      if (hasConditional === false || hasInterpolation === false) {
        violations.push(`  - ${componentKey}: missing the canonical merge pattern '(props['className'] !== undefined) ? \`umbrella \${props['className']}\` : \\'umbrella\\''`);
      }
    }

    const message: Tests_ClassNameStylePassthrough_ClassNameStylePassthrough_EveryInScopeComponentMergesPropsClassNameWithTheCanonicalPattern_Message = [
      `${violations.length} className merge violations:`,
      ...violations,
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  it('every in-scope component forwards props.style to the root element', async () => {
    const allComponents: Tests_ClassNameStylePassthrough_AllComponents = await discoverComponents();
    const violations: Tests_ClassNameStylePassthrough_Violations = [];

    for (const component of allComponents) {
      const componentKey: Tests_ClassNameStylePassthrough_ComponentKey = component;

      if (exemptSet.has(componentKey) === true) {
        continue;
      }

      const tsxPath: Tests_ClassNameStylePassthrough_TsxPath = resolve(getPackageRoot(), 'src', `${componentKey}/index.tsx`);
      const tsxContent: Tests_ClassNameStylePassthrough_TsxContent = await readFile(tsxPath, 'utf-8');

      if (tsxContent.includes('props[\'style\']') === false) {
        violations.push(`  - ${componentKey}: missing 'props[\\'style\\']' forward to root element`);
      }
    }

    const message: Tests_ClassNameStylePassthrough_ClassNameStylePassthrough_EveryInScopeComponentForwardsPropsStyleToTheRootElement_Message = [
      `${violations.length} style forward violations:`,
      ...violations,
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  return;
});
