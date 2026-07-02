import { strictEqual } from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  createSourceFile,
  forEachChild,
  getLeadingCommentRanges,
  ScriptTarget,
  SyntaxKind,
} from 'typescript';
import { describe, it } from 'vitest';

import { LIB_REGEX_PATTERN_JSDOC_TAG_SCAN, LIB_REGEX_PATTERN_SEMVER_LEADING } from '../lib/regex.js';

import type {
  Tests_SinceVersion_CompareSemverLte_A,
  Tests_SinceVersion_CompareSemverLte_B,
  Tests_SinceVersion_CompareSemverLte_Length,
  Tests_SinceVersion_CompareSemverLte_PartsA,
  Tests_SinceVersion_CompareSemverLte_PartsB,
  Tests_SinceVersion_CompareSemverLte_Returns,
  Tests_SinceVersion_CompareSemverLte_ValA,
  Tests_SinceVersion_CompareSemverLte_ValB,
  Tests_SinceVersion_ExtractTagValues_Content,
  Tests_SinceVersion_ExtractTagValues_FilePath,
  Tests_SinceVersion_ExtractTagValues_Returns,
  Tests_SinceVersion_ExtractTagValues_Seen,
  Tests_SinceVersion_ExtractTagValues_Sf,
  Tests_SinceVersion_ExtractTagValues_TagRe,
  Tests_SinceVersion_ExtractTagValues_Values,
  Tests_SinceVersion_ExtractTagValues_Visit_CommentText,
  Tests_SinceVersion_ExtractTagValues_Visit_Key,
  Tests_SinceVersion_ExtractTagValues_Visit_Node,
  Tests_SinceVersion_ExtractTagValues_Visit_R,
  Tests_SinceVersion_ExtractTagValues_Visit_Ranges,
  Tests_SinceVersion_ExtractTagValues_Visit_Returns,
  Tests_SinceVersion_ExtractTagValues_Visit_TagMatch,
  Tests_SinceVersion_ExtractTagValues_Visit_TagValue,
  Tests_SinceVersion_FileContent,
  Tests_SinceVersion_IsValidTagValue_AcceptsSince0180PastVersion_Fixture,
  Tests_SinceVersion_IsValidTagValue_AcceptsSinceEqualToTheCurrentPackageVersionBoundary_Fixture,
  Tests_SinceVersion_IsValidTagValue_AcceptsSinceUNRELEASED_Fixture,
  Tests_SinceVersion_IsValidTagValue_CurrentVersion,
  Tests_SinceVersion_IsValidTagValue_PackageJsonPath,
  Tests_SinceVersion_IsValidTagValue_PackageVersion,
  Tests_SinceVersion_IsValidTagValue_RejectsSince0990FutureVersion_Fixture,
  Tests_SinceVersion_IsValidTagValue_RejectsSinceBananaNonSemverNonUNRELEASED_Fixture,
  Tests_SinceVersion_IsValidTagValue_Returns,
  Tests_SinceVersion_IsValidTagValue_SemverMatch,
  Tests_SinceVersion_IsValidTagValue_Value,
  Tests_SinceVersion_Message,
  Tests_SinceVersion_MessageParts,
  Tests_SinceVersion_PackageJson,
  Tests_SinceVersion_PackageJsonRaw,
  Tests_SinceVersion_PackageVersion,
  Tests_SinceVersion_RawEntries,
  Tests_SinceVersion_SinceVersionScan_EverySinceDeprecatedValueIsUNRELEASEDOrAReleasedVersion_Violations,
  Tests_SinceVersion_SinceVersionScan_PackageDirectory,
  Tests_SinceVersion_SinceVersionScan_PackageJsonPath,
  Tests_SinceVersion_SourceFile,
  Tests_SinceVersion_SourceFiles,
  Tests_SinceVersion_SrcDir,
  Tests_SinceVersion_TagValue,
  Tests_SinceVersion_TagValues,
  Tests_SinceVersion_Violation,
} from '../types/tests/since-version.test.d.ts';

/**
 * Tests - Since Version - Compare Semver Lte.
 *
 * Returns true when a is less than or equal to b, comparing numerically by
 * each dot-separated segment. Inlined here because this package cannot import
 * nova internals directly.
 *
 * @param {Tests_SinceVersion_CompareSemverLte_A} a - A.
 * @param {Tests_SinceVersion_CompareSemverLte_B} b - B.
 *
 * @returns {Tests_SinceVersion_CompareSemverLte_Returns}
 *
 * @since 0.20.0
 */
function compareSemverLte(a: Tests_SinceVersion_CompareSemverLte_A, b: Tests_SinceVersion_CompareSemverLte_B): Tests_SinceVersion_CompareSemverLte_Returns {
  const partsA: Tests_SinceVersion_CompareSemverLte_PartsA = a.split('.').map((part) => parseInt(part, 10));
  const partsB: Tests_SinceVersion_CompareSemverLte_PartsB = b.split('.').map((part) => parseInt(part, 10));
  const length: Tests_SinceVersion_CompareSemverLte_Length = Math.max(partsA.length, partsB.length);

  for (let i = 0; i < length; i += 1) {
    const valA: Tests_SinceVersion_CompareSemverLte_ValA = partsA[i] ?? 0;
    const valB: Tests_SinceVersion_CompareSemverLte_ValB = partsB[i] ?? 0;

    if (valA !== valB) {
      return valA <= valB;
    }
  }

  return true;
}

/**
 * Tests - Since Version - Is Valid Tag Value.
 *
 * Returns true when the tag value is acceptable: either the sentinel string
 * "UNRELEASED" or a semver version that is <= the package version.
 *
 * @param {Tests_SinceVersion_IsValidTagValue_Value}          value          - Value.
 * @param {Tests_SinceVersion_IsValidTagValue_PackageVersion} packageVersion - Package version.
 *
 * @returns {Tests_SinceVersion_IsValidTagValue_Returns}
 *
 * @since 0.20.0
 */
function isValidTagValue(value: Tests_SinceVersion_IsValidTagValue_Value, packageVersion: Tests_SinceVersion_IsValidTagValue_PackageVersion): Tests_SinceVersion_IsValidTagValue_Returns {
  if (value === 'UNRELEASED') {
    return true;
  }

  const semverMatch: Tests_SinceVersion_IsValidTagValue_SemverMatch = value.match(LIB_REGEX_PATTERN_SEMVER_LEADING);

  if (semverMatch === null || semverMatch[1] === undefined) {
    return false;
  }

  return compareSemverLte(semverMatch[1], packageVersion);
}

/**
 * Tests - Since Version - Extract Tag Values.
 *
 * Extracts all `@since` and `@deprecated` tag values from real comment tokens
 * in the given TypeScript source text. String literal contents are excluded
 * automatically because the TypeScript AST comment ranges do not include
 * string node content. Only MultiLineCommentTrivia blocks are inspected.
 *
 * @param {Tests_SinceVersion_ExtractTagValues_FilePath} filePath - File path.
 * @param {Tests_SinceVersion_ExtractTagValues_Content}  content  - Content.
 *
 * @returns {Tests_SinceVersion_ExtractTagValues_Returns}
 *
 * @since 0.20.0
 */
function extractTagValues(filePath: Tests_SinceVersion_ExtractTagValues_FilePath, content: Tests_SinceVersion_ExtractTagValues_Content): Tests_SinceVersion_ExtractTagValues_Returns {
  const sf: Tests_SinceVersion_ExtractTagValues_Sf = createSourceFile(filePath, content, ScriptTarget.Latest, true);
  const seen: Tests_SinceVersion_ExtractTagValues_Seen = new Set();
  const values: Tests_SinceVersion_ExtractTagValues_Values = [];
  const tagRe: Tests_SinceVersion_ExtractTagValues_TagRe = new RegExp(LIB_REGEX_PATTERN_JSDOC_TAG_SCAN, 'g');

  function visit(node: Tests_SinceVersion_ExtractTagValues_Visit_Node): Tests_SinceVersion_ExtractTagValues_Visit_Returns {
    const ranges: Tests_SinceVersion_ExtractTagValues_Visit_Ranges = getLeadingCommentRanges(content, node.pos);

    if (ranges !== undefined) {
      for (const range of ranges) {
        const r: Tests_SinceVersion_ExtractTagValues_Visit_R = range;

        if (r.kind !== SyntaxKind.MultiLineCommentTrivia) {
          continue;
        }

        const key: Tests_SinceVersion_ExtractTagValues_Visit_Key = `${r.pos}:${r.end}`;

        if (seen.has(key) === false) {
          seen.add(key);

          const commentText: Tests_SinceVersion_ExtractTagValues_Visit_CommentText = content.slice(r.pos, r.end);

          tagRe.lastIndex = 0;

          let tagMatch: Tests_SinceVersion_ExtractTagValues_Visit_TagMatch = tagRe.exec(commentText);

          while (tagMatch !== null) {
            const tagValue: Tests_SinceVersion_ExtractTagValues_Visit_TagValue = tagMatch[1] ?? '';

            if (tagValue !== '') {
              values.push(tagValue);
            }

            tagMatch = tagRe.exec(commentText);
          }
        }
      }
    }

    forEachChild(node, visit);

    return;
  }

  visit(sf);

  return values;
}

/**
 * Tests - Since Version - Since Version Scan.
 *
 * Walks every `src/*.ts`, `*.d.ts`, and `*.tsx` file in this package and asserts
 * that every `@since` and `@deprecated` tag value in a real comment is either
 * "UNRELEASED" or a semver version that is less than or equal to the current
 * package version. Only MultiLineCommentTrivia blocks are inspected; string
 * literal contents are excluded automatically via AST-level comment extraction.
 *
 * @since 0.20.0
 */
describe('since version scan', () => {
  const packageDirectory: Tests_SinceVersion_SinceVersionScan_PackageDirectory = join(fileURLToPath(import.meta.url), '..', '..', '..');
  const packageJsonPath: Tests_SinceVersion_SinceVersionScan_PackageJsonPath = join(packageDirectory, 'package.json');

  it('every @since / @deprecated value is UNRELEASED or a released version', async () => {
    const packageJsonRaw: Tests_SinceVersion_PackageJsonRaw = await readFile(packageJsonPath, 'utf-8');
    const packageJson: Tests_SinceVersion_PackageJson = JSON.parse(packageJsonRaw);
    const packageVersion: Tests_SinceVersion_PackageVersion = packageJson['version'] ?? '';

    const srcDir: Tests_SinceVersion_SrcDir = join(packageDirectory, 'src');
    const rawEntries: Tests_SinceVersion_RawEntries = await readdir(srcDir, { recursive: true });
    const sourceFiles: Tests_SinceVersion_SourceFiles = rawEntries
      .filter((entry) => (
        entry.endsWith('.ts') === true
        || entry.endsWith('.tsx') === true
      ))
      .map((entry) => join(srcDir, entry));

    const violations: Tests_SinceVersion_SinceVersionScan_EverySinceDeprecatedValueIsUNRELEASEDOrAReleasedVersion_Violations = [];

    for (const sf of sourceFiles) {
      const sourceFile: Tests_SinceVersion_SourceFile = sf;
      const fileContent: Tests_SinceVersion_FileContent = await readFile(sourceFile, 'utf-8');
      const tagValues: Tests_SinceVersion_TagValues = extractTagValues(sourceFile, fileContent);

      for (const tv of tagValues) {
        const tagValue: Tests_SinceVersion_TagValue = tv;

        if (isValidTagValue(tagValue, packageVersion) === false) {
          const violation: Tests_SinceVersion_Violation = `${sourceFile}:${tagValue}`;

          violations.push(violation);
        }
      }
    }

    const messageParts: Tests_SinceVersion_MessageParts = [
      `Found @since/@deprecated values that exceed the package version (${packageVersion}):`,
      violations.join('\n'),
    ];
    const message: Tests_SinceVersion_Message = messageParts.join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  return;
});

/**
 * Tests - Since Version - Is Valid Tag Value.
 *
 * Self-tests the isValidTagValue predicate against in-memory fixture strings.
 * Asserts bad values are rejected and good values are accepted without
 * planting any bad tag in real source.
 *
 * @since 0.20.0
 */
describe('isValidTagValue', () => {
  // Read the real package version so the boundary tracks reality and these cases never go stale.
  const packageJsonPath: Tests_SinceVersion_IsValidTagValue_PackageJsonPath = join(fileURLToPath(import.meta.url), '..', '..', '..', 'package.json');
  const packageJsonRaw: Tests_SinceVersion_PackageJsonRaw = readFileSync(packageJsonPath, 'utf-8');
  const packageJson: Tests_SinceVersion_PackageJson = JSON.parse(packageJsonRaw);
  const currentVersion: Tests_SinceVersion_IsValidTagValue_CurrentVersion = packageJson['version'] ?? '';

  it('rejects @since 0.99.0 (future version)', () => {
    const fixture: Tests_SinceVersion_IsValidTagValue_RejectsSince0990FutureVersion_Fixture = '0.99.0';

    strictEqual(isValidTagValue(fixture, currentVersion), false);

    return;
  });

  it('accepts @since equal to the current package version (boundary)', () => {
    const fixture: Tests_SinceVersion_IsValidTagValue_AcceptsSinceEqualToTheCurrentPackageVersionBoundary_Fixture = currentVersion;

    strictEqual(isValidTagValue(fixture, currentVersion), true);

    return;
  });

  it('rejects @since banana (non-semver, non-UNRELEASED)', () => {
    const fixture: Tests_SinceVersion_IsValidTagValue_RejectsSinceBananaNonSemverNonUNRELEASED_Fixture = 'banana';

    strictEqual(isValidTagValue(fixture, currentVersion), false);

    return;
  });

  it('accepts @since UNRELEASED', () => {
    const fixture: Tests_SinceVersion_IsValidTagValue_AcceptsSinceUNRELEASED_Fixture = 'UNRELEASED';

    strictEqual(isValidTagValue(fixture, currentVersion), true);

    return;
  });

  it('accepts @since 0.18.0 (past version)', () => {
    const fixture: Tests_SinceVersion_IsValidTagValue_AcceptsSince0180PastVersion_Fixture = '0.18.0';

    strictEqual(isValidTagValue(fixture, currentVersion), true);

    return;
  });

  return;
});
