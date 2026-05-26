import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import { describe, it } from 'vitest';

import {
  LIB_REGEX_CSS_BLOCK_COMMENT,
  LIB_REGEX_JSX_CLASS_NAME,
  LIB_REGEX_JSX_CLASS_NAME_MERGE_FALLBACK,
  LIB_REGEX_LAYERED_SCOPE_ALLOW_DUPLICATE_COMMENT,
  LIB_REGEX_PRESET_PATH_SEGMENT,
  LIB_REGEX_WHITESPACE_RUN,
} from '../lib/regex.js';

import type {
  TestsLayeredScopeExtractRuleTriplesAllowDuplicatePattern,
  TestsLayeredScopeExtractRuleTriplesAllowed,
  TestsLayeredScopeExtractRuleTriplesBlockStart,
  TestsLayeredScopeExtractRuleTriplesBody,
  TestsLayeredScopeExtractRuleTriplesChar,
  TestsLayeredScopeExtractRuleTriplesColon,
  TestsLayeredScopeExtractRuleTriplesDeclaration,
  TestsLayeredScopeExtractRuleTriplesDepth,
  TestsLayeredScopeExtractRuleTriplesIndex,
  TestsLayeredScopeExtractRuleTriplesInner,
  TestsLayeredScopeExtractRuleTriplesNested,
  TestsLayeredScopeExtractRuleTriplesPrelude,
  TestsLayeredScopeExtractRuleTriplesPreludeStart,
  TestsLayeredScopeExtractRuleTriplesProperty,
  TestsLayeredScopeExtractRuleTriplesRawValue,
  TestsLayeredScopeExtractRuleTriplesReturns,
  TestsLayeredScopeExtractRuleTriplesSelector,
  TestsLayeredScopeExtractRuleTriplesSource,
  TestsLayeredScopeExtractRuleTriplesStripped,
  TestsLayeredScopeExtractRuleTriplesTriples,
  TestsLayeredScopeExtractRuleTriplesValue,
  TestsLayeredScopeExtractRuleTriplesWhitespacePattern,
  TestsLayeredScopeGetPackageRootCurrentFileDirectory,
  TestsLayeredScopeGetPackageRootCurrentFilePath,
  TestsLayeredScopeGetPackageRootReturns,
  TestsLayeredScopeLayeredScopeCombinedKeys,
  TestsLayeredScopeLayeredScopeDryMessage,
  TestsLayeredScopeLayeredScopeDuplicates,
  TestsLayeredScopeLayeredScopeFamilies,
  TestsLayeredScopeLayeredScopeFamily,
  TestsLayeredScopeLayeredScopeFamilyParam,
  TestsLayeredScopeLayeredScopeHasUmbrellaAndMember,
  TestsLayeredScopeLayeredScopeLiterals,
  TestsLayeredScopeLayeredScopeMember,
  TestsLayeredScopeLayeredScopeMemberParam,
  TestsLayeredScopeLayeredScopeMembershipMessage,
  TestsLayeredScopeLayeredScopeMissing,
  TestsLayeredScopeLayeredScopePerPresetMember,
  TestsLayeredScopeLayeredScopePerPresetMemberFiles,
  TestsLayeredScopeLayeredScopePerPresetMemberTriples,
  TestsLayeredScopeLayeredScopePerPresetUmbrella,
  TestsLayeredScopeLayeredScopePerPresetUmbrellaByPreset,
  TestsLayeredScopeLayeredScopePerPresetUmbrellaFiles,
  TestsLayeredScopeLayeredScopePerPresetUmbrellaTriples,
  TestsLayeredScopeLayeredScopePreset,
  TestsLayeredScopeLayeredScopePresetMatch,
  TestsLayeredScopeLayeredScopePresetPathPattern,
  TestsLayeredScopeLayeredScopeSharedMemberPath,
  TestsLayeredScopeLayeredScopeSharedMemberTriples,
  TestsLayeredScopeLayeredScopeSharedUmbrellaKeys,
  TestsLayeredScopeLayeredScopeSharedUmbrellaPath,
  TestsLayeredScopeLayeredScopeSharedUmbrellaTriples,
  TestsLayeredScopeLayeredScopeTokens,
  TestsLayeredScopeLayeredScopeTsxPath,
  TestsLayeredScopeReadClassNameLiteralsCapture,
  TestsLayeredScopeReadClassNameLiteralsContent,
  TestsLayeredScopeReadClassNameLiteralsFilePath,
  TestsLayeredScopeReadClassNameLiteralsLiterals,
  TestsLayeredScopeReadClassNameLiteralsMatch,
  TestsLayeredScopeReadClassNameLiteralsMergeCapture,
  TestsLayeredScopeReadClassNameLiteralsMergeMatch,
  TestsLayeredScopeReadClassNameLiteralsMergePattern,
  TestsLayeredScopeReadClassNameLiteralsPattern,
  TestsLayeredScopeReadClassNameLiteralsReturns,
  TestsLayeredScopeReadClassNameLiteralsWhitespacePattern,
  TestsLayeredScopeReadTriplesContent,
  TestsLayeredScopeReadTriplesFilePath,
  TestsLayeredScopeReadTriplesReturns,
  TestsLayeredScopeStripBlockCommentsPattern,
  TestsLayeredScopeStripBlockCommentsReturns,
  TestsLayeredScopeStripBlockCommentsSource,
  TestsLayeredScopeTripleKeyReturns,
  TestsLayeredScopeTripleKeyTriple,
} from '../types/tests/layered-scope.test.d.ts';

/**
 * Tests - Layered Scope - Layered Scope Families.
 *
 * Registry of layered-scope families (umbrella class plus
 * member classes that co-render on the same element). Each
 * family declares its shared umbrella CSS file, its glob
 * for per-preset umbrella overlays, and the list of member
 * components (TSX render site, shared CSS file, per-preset
 * overlay glob). Add a new entry here to extend the
 * drift-detection meta-test to a new family.
 *
 * @since 0.18.0
 */
const layeredScopeFamilies: TestsLayeredScopeLayeredScopeFamilies = [{
  umbrella: 'nova-error-surface',
  sharedUmbrellaFile: 'src/styles/theme/error-surface/style.css',
  perPresetUmbrellaGlob: 'src/styles/presets/*/theme/error-surface/style.css',
  members: [
    {
      class: 'nova-not-found',
      tsx: 'src/theme/NotFound/Content/index.tsx',
      sharedFile: 'src/styles/theme/NotFound/Content/style.css',
      perPresetGlob: 'src/styles/presets/*/theme/NotFound/Content/style.css',
    },
    {
      class: 'nova-error-page-content',
      tsx: 'src/theme/ErrorPageContent/index.tsx',
      sharedFile: 'src/styles/theme/ErrorPageContent/style.css',
      perPresetGlob: 'src/styles/presets/*/theme/ErrorPageContent/style.css',
    },
    {
      class: 'nova-error',
      tsx: 'src/theme/Error/index.tsx',
      sharedFile: 'src/styles/theme/Error/style.css',
      perPresetGlob: 'src/styles/presets/*/theme/Error/style.css',
    },
  ],
}];

/**
 * Tests - Layered Scope - Extract Rule Triples.
 *
 * Parses a CSS source string into a flat list of
 * (selector, property, value) triples for every top-level
 * rule. At-rule bodies (`@media`, `@supports`, etc.) are
 * skipped intentionally - they wrap rules that often share
 * triples with top-level rules but apply conditionally, so
 * comparing them blindly would produce false positives.
 * Selectors and values are whitespace-normalised so trivial
 * formatting differences do not mask exact duplicates.
 *
 * @since 0.18.0
 */
function extractRuleTriples(source: TestsLayeredScopeExtractRuleTriplesSource): TestsLayeredScopeExtractRuleTriplesReturns {
  const stripped: TestsLayeredScopeExtractRuleTriplesStripped = stripBlockComments(source);
  const triples: TestsLayeredScopeExtractRuleTriplesTriples = [];
  const allowDuplicatePattern: TestsLayeredScopeExtractRuleTriplesAllowDuplicatePattern = new RegExp(LIB_REGEX_LAYERED_SCOPE_ALLOW_DUPLICATE_COMMENT.source, 'g');
  const whitespacePattern: TestsLayeredScopeExtractRuleTriplesWhitespacePattern = new RegExp(LIB_REGEX_WHITESPACE_RUN.source, 'g');

  let depth: TestsLayeredScopeExtractRuleTriplesDepth = 0;
  let blockStart: TestsLayeredScopeExtractRuleTriplesBlockStart = 0;
  let preludeStart: TestsLayeredScopeExtractRuleTriplesPreludeStart = 0;
  let allowed: TestsLayeredScopeExtractRuleTriplesAllowed = false;

  for (let index: TestsLayeredScopeExtractRuleTriplesIndex = 0; index < stripped.length; index += 1) {
    const char: TestsLayeredScopeExtractRuleTriplesChar = stripped[index] ?? '';

    if (char === '{') {
      if (depth === 0) {
        const prelude: TestsLayeredScopeExtractRuleTriplesPrelude = stripped.slice(preludeStart, index).trim();

        if (prelude.startsWith('@') === true) {
          // At-rule. Walk to its matching close brace; skip emitting triples.
          let nested: TestsLayeredScopeExtractRuleTriplesNested = 1;

          index += 1;

          while (index < stripped.length && nested > 0) {
            const inner: TestsLayeredScopeExtractRuleTriplesInner = stripped[index] ?? '';

            if (inner === '{') {
              nested += 1;
            } else if (inner === '}') {
              nested -= 1;
            }

            index += 1;
          }

          preludeStart = index;

          // Outer loop's index += 1 still runs - rewind once.
          index -= 1;
        } else {
          blockStart = index + 1;
          allowed = stripped.slice(preludeStart, index).includes('layered-scope:allow-duplicate');
          depth += 1;
        }
      } else {
        depth += 1;
      }
    } else if (char === '}') {
      if (depth === 1) {
        const prelude: TestsLayeredScopeExtractRuleTriplesPrelude = stripped.slice(preludeStart, blockStart - 1).trim();
        const body: TestsLayeredScopeExtractRuleTriplesBody = stripped.slice(blockStart, index);

        if (allowed === false) {
          const selector: TestsLayeredScopeExtractRuleTriplesSelector = prelude
            .replace(allowDuplicatePattern, '')
            .replace(whitespacePattern, ' ')
            .trim();

          for (const declaration of body.split(';')) {
            const declarationText: TestsLayeredScopeExtractRuleTriplesDeclaration = declaration;
            const colon: TestsLayeredScopeExtractRuleTriplesColon = declarationText.indexOf(':');

            if (colon === -1) {
              continue;
            }

            const property: TestsLayeredScopeExtractRuleTriplesProperty = declarationText.slice(0, colon).trim();
            const rawValue: TestsLayeredScopeExtractRuleTriplesRawValue = declarationText.slice(colon + 1).trim();

            if (property === '' || rawValue === '') {
              continue;
            }

            const value: TestsLayeredScopeExtractRuleTriplesValue = rawValue.replace(whitespacePattern, ' ');

            triples.push({
              selector,
              property,
              value,
            });
          }
        }

        preludeStart = index + 1;
        depth -= 1;
      } else if (depth > 0) {
        depth -= 1;
      }
    }
  }

  return triples;
}

/**
 * Tests - Layered Scope - Get Package Root.
 *
 * Resolves the package root directory from the current
 * test file location.
 *
 * @since 0.18.0
 */
function getPackageRoot(): TestsLayeredScopeGetPackageRootReturns {
  const currentFilePath: TestsLayeredScopeGetPackageRootCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsLayeredScopeGetPackageRootCurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Layered Scope - Read Class Name Literals.
 *
 * Extracts every `className="..."` literal from a TSX file
 * and returns the inner strings (whitespace-collapsed).
 * Used by the membership test to verify the umbrella plus
 * member classes co-render on the same element.
 *
 * @since 0.18.0
 */
async function readClassNameLiterals(filePath: TestsLayeredScopeReadClassNameLiteralsFilePath): TestsLayeredScopeReadClassNameLiteralsReturns {
  const content: TestsLayeredScopeReadClassNameLiteralsContent = await readFile(filePath, 'utf-8');
  const pattern: TestsLayeredScopeReadClassNameLiteralsPattern = new RegExp(LIB_REGEX_JSX_CLASS_NAME.source, 'g');
  const mergePattern: TestsLayeredScopeReadClassNameLiteralsMergePattern = new RegExp(LIB_REGEX_JSX_CLASS_NAME_MERGE_FALLBACK.source, 'g');
  const whitespacePattern: TestsLayeredScopeReadClassNameLiteralsWhitespacePattern = new RegExp(LIB_REGEX_WHITESPACE_RUN.source, 'g');
  const literals: TestsLayeredScopeReadClassNameLiteralsLiterals = [];

  let match: TestsLayeredScopeReadClassNameLiteralsMatch = pattern.exec(content);

  while (match !== null) {
    const capture: TestsLayeredScopeReadClassNameLiteralsCapture = match[1];

    if (capture !== undefined) {
      literals.push(capture.replace(whitespacePattern, ' ').trim());
    }

    match = pattern.exec(content);
  }

  let mergeMatch: TestsLayeredScopeReadClassNameLiteralsMergeMatch = mergePattern.exec(content);

  while (mergeMatch !== null) {
    const mergeCapture: TestsLayeredScopeReadClassNameLiteralsMergeCapture = mergeMatch[1];

    if (mergeCapture !== undefined) {
      literals.push(mergeCapture.replace(whitespacePattern, ' ').trim());
    }

    mergeMatch = mergePattern.exec(content);
  }

  return literals;
}

/**
 * Tests - Layered Scope - Read Triples.
 *
 * Reads a CSS file from disk and parses it into triples.
 * Missing files yield an empty list - per-preset overlays
 * for some members are intended placeholders, and globs
 * may legitimately return zero hits during partial
 * scaffolding.
 *
 * @since 0.18.0
 */
async function readTriples(filePath: TestsLayeredScopeReadTriplesFilePath): TestsLayeredScopeReadTriplesReturns {
  try {
    const content: TestsLayeredScopeReadTriplesContent = await readFile(filePath, 'utf-8');

    return extractRuleTriples(content);
  } catch {
    return [];
  }
}

/**
 * Tests - Layered Scope - Strip Block Comments.
 *
 * Removes CSS block comments (slash-star pairs) from a
 * source string, preserving any comment that carries the
 * `layered-scope:allow-duplicate` opt-out marker so the
 * triple extractor can detect it later.
 *
 * @since 0.18.0
 */
function stripBlockComments(source: TestsLayeredScopeStripBlockCommentsSource): TestsLayeredScopeStripBlockCommentsReturns {
  const pattern: TestsLayeredScopeStripBlockCommentsPattern = new RegExp(LIB_REGEX_CSS_BLOCK_COMMENT.source, 'g');

  return source.replace(pattern, (match) => {
    if (match.includes('layered-scope:allow-duplicate') === true) {
      return '/* layered-scope:allow-duplicate */';
    }

    return '';
  });
}

/**
 * Tests - Layered Scope - Triple Key.
 *
 * Serialises a triple to a stable string key for Set
 * lookup. The three fields are joined with a pipe
 * separator so any subfield that contains a pipe would
 * still produce a unique key against an unrelated triple.
 *
 * @since 0.18.0
 */
function tripleKey(triple: TestsLayeredScopeTripleKeyTriple): TestsLayeredScopeTripleKeyReturns {
  return `${triple['selector']}|${triple['property']}|${triple['value']}`;
}

/**
 * Tests - Layered Scope - Layered Scope.
 *
 * Two complementary meta-tests run for each registered
 * family in `layeredScopeFamilies`:
 *
 *   1. Membership - every registered member component
 *      must render the umbrella class alongside its own
 *      scope class in at least one `className=` literal.
 *
 *   2. Dry - no member CSS file (shared or per-preset
 *      overlay) may declare a (selector, property, value)
 *      triple that exactly matches a triple in its
 *      umbrella file. Annotate intentional overrides with
 *      a layered-scope:allow-duplicate comment.
 *
 * @since 0.18.0
 */
describe('layered scope', () => {
  for (const family of layeredScopeFamilies) {
    const familyContext: TestsLayeredScopeLayeredScopeFamily = family;

    it(`every member of '${familyContext['umbrella']}' renders the umbrella class in its tsx`, async () => {
      const familyParam: TestsLayeredScopeLayeredScopeFamilyParam = familyContext;
      const missing: TestsLayeredScopeLayeredScopeMissing = [];

      for (const member of familyParam['members']) {
        const memberParam: TestsLayeredScopeLayeredScopeMemberParam = member;
        const tsxPath: TestsLayeredScopeLayeredScopeTsxPath = resolve(getPackageRoot(), memberParam['tsx']);
        const literals: TestsLayeredScopeLayeredScopeLiterals = await readClassNameLiterals(tsxPath);
        const hasUmbrellaAndMember: TestsLayeredScopeLayeredScopeHasUmbrellaAndMember = literals.some((literal) => {
          const tokens: TestsLayeredScopeLayeredScopeTokens = literal.split(' ');

          return tokens.includes(familyParam['umbrella']) === true && tokens.includes(memberParam['class']) === true;
        });

        if (hasUmbrellaAndMember === false) {
          missing.push(`  - '${memberParam['class']}' in ${memberParam['tsx']} (expected className with both '${familyParam['umbrella']}' and '${memberParam['class']}')`);
        }
      }

      const message: TestsLayeredScopeLayeredScopeMembershipMessage = [
        `Members of '${familyParam['umbrella']}' missing the umbrella class in their TSX render:`,
        ...missing,
      ].join('\n');

      strictEqual(missing.length, 0, message);

      return;
    });

    it(`no member of '${familyContext['umbrella']}' duplicates an umbrella triple`, async () => {
      const familyParam: TestsLayeredScopeLayeredScopeFamilyParam = familyContext;
      const sharedUmbrellaPath: TestsLayeredScopeLayeredScopeSharedUmbrellaPath = resolve(getPackageRoot(), familyParam['sharedUmbrellaFile']);
      const sharedUmbrellaTriples: TestsLayeredScopeLayeredScopeSharedUmbrellaTriples = await readTriples(sharedUmbrellaPath);
      const sharedUmbrellaKeys: TestsLayeredScopeLayeredScopeSharedUmbrellaKeys = new Set(sharedUmbrellaTriples.map(tripleKey));
      const duplicates: TestsLayeredScopeLayeredScopeDuplicates = [];
      const presetPathPattern: TestsLayeredScopeLayeredScopePresetPathPattern = new RegExp(LIB_REGEX_PRESET_PATH_SEGMENT.source);

      const perPresetUmbrellaFiles: TestsLayeredScopeLayeredScopePerPresetUmbrellaFiles = await glob(familyParam['perPresetUmbrellaGlob'], { cwd: getPackageRoot() });
      const perPresetUmbrellaByPreset: TestsLayeredScopeLayeredScopePerPresetUmbrellaByPreset = new Map();

      for (const perPresetUmbrella of perPresetUmbrellaFiles) {
        const perPresetUmbrellaRelative: TestsLayeredScopeLayeredScopePerPresetUmbrella = perPresetUmbrella;
        const presetMatch: TestsLayeredScopeLayeredScopePresetMatch = perPresetUmbrellaRelative.match(presetPathPattern);

        if (presetMatch === null || presetMatch[1] === undefined) {
          continue;
        }

        const preset: TestsLayeredScopeLayeredScopePreset = presetMatch[1];
        const triples: TestsLayeredScopeLayeredScopePerPresetUmbrellaTriples = await readTriples(resolve(getPackageRoot(), perPresetUmbrellaRelative));

        perPresetUmbrellaByPreset.set(preset, triples);
      }

      for (const member of familyParam['members']) {
        const memberParam: TestsLayeredScopeLayeredScopeMember = member;
        const sharedMemberPath: TestsLayeredScopeLayeredScopeSharedMemberPath = resolve(getPackageRoot(), memberParam['sharedFile']);
        const sharedMemberTriples: TestsLayeredScopeLayeredScopeSharedMemberTriples = await readTriples(sharedMemberPath);

        for (const triple of sharedMemberTriples) {
          if (sharedUmbrellaKeys.has(tripleKey(triple)) === true) {
            duplicates.push(`  - ${memberParam['sharedFile']}: '${triple['selector']} { ${triple['property']}: ${triple['value']} }' also in ${familyParam['sharedUmbrellaFile']}`);
          }
        }

        const perPresetMemberFiles: TestsLayeredScopeLayeredScopePerPresetMemberFiles = await glob(memberParam['perPresetGlob'], { cwd: getPackageRoot() });

        for (const perPresetMember of perPresetMemberFiles) {
          const perPresetMemberRelative: TestsLayeredScopeLayeredScopePerPresetMember = perPresetMember;
          const presetMatch: TestsLayeredScopeLayeredScopePresetMatch = perPresetMemberRelative.match(presetPathPattern);

          if (presetMatch === null || presetMatch[1] === undefined) {
            continue;
          }

          const preset: TestsLayeredScopeLayeredScopePreset = presetMatch[1];
          const perPresetUmbrellaTriples: TestsLayeredScopeLayeredScopePerPresetUmbrellaTriples = perPresetUmbrellaByPreset.get(preset) ?? [];
          const combinedKeys: TestsLayeredScopeLayeredScopeCombinedKeys = new Set([
            ...sharedUmbrellaKeys,
            ...perPresetUmbrellaTriples.map(tripleKey),
          ]);
          const perPresetMemberTriples: TestsLayeredScopeLayeredScopePerPresetMemberTriples = await readTriples(resolve(getPackageRoot(), perPresetMemberRelative));

          for (const triple of perPresetMemberTriples) {
            if (combinedKeys.has(tripleKey(triple)) === true) {
              duplicates.push(`  - ${perPresetMemberRelative}: '${triple['selector']} { ${triple['property']}: ${triple['value']} }' also in shared umbrella or presets/${preset} umbrella`);
            }
          }
        }
      }

      const message: TestsLayeredScopeLayeredScopeDryMessage = [
        `Member files duplicate '${familyParam['umbrella']}' umbrella triples (annotate intentional overrides with /* layered-scope:allow-duplicate */):`,
        ...duplicates,
      ].join('\n');

      strictEqual(duplicates.length, 0, message);

      return;
    });
  }

  return;
});
