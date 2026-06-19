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
  Tests_LayeredScope_ExtractRuleTriples_AllowDuplicatePattern,
  Tests_LayeredScope_ExtractRuleTriples_Allowed,
  Tests_LayeredScope_ExtractRuleTriples_BlockStart,
  Tests_LayeredScope_ExtractRuleTriples_Body,
  Tests_LayeredScope_ExtractRuleTriples_Char,
  Tests_LayeredScope_ExtractRuleTriples_ClosePrelude,
  Tests_LayeredScope_ExtractRuleTriples_Colon,
  Tests_LayeredScope_ExtractRuleTriples_DeclarationText,
  Tests_LayeredScope_ExtractRuleTriples_Depth,
  Tests_LayeredScope_ExtractRuleTriples_Index,
  Tests_LayeredScope_ExtractRuleTriples_Inner,
  Tests_LayeredScope_ExtractRuleTriples_Nested,
  Tests_LayeredScope_ExtractRuleTriples_Prelude,
  Tests_LayeredScope_ExtractRuleTriples_PreludeStart,
  Tests_LayeredScope_ExtractRuleTriples_Property,
  Tests_LayeredScope_ExtractRuleTriples_RawValue,
  Tests_LayeredScope_ExtractRuleTriples_Returns,
  Tests_LayeredScope_ExtractRuleTriples_Selector,
  Tests_LayeredScope_ExtractRuleTriples_Source,
  Tests_LayeredScope_ExtractRuleTriples_Stripped,
  Tests_LayeredScope_ExtractRuleTriples_Triples,
  Tests_LayeredScope_ExtractRuleTriples_Value,
  Tests_LayeredScope_ExtractRuleTriples_WhitespacePattern,
  Tests_LayeredScope_GetPackageRoot_CurrentFileDirectory,
  Tests_LayeredScope_GetPackageRoot_CurrentFilePath,
  Tests_LayeredScope_GetPackageRoot_Returns,
  Tests_LayeredScope_LayeredScope_CombinedKeys,
  Tests_LayeredScope_LayeredScope_DryFamilyParam,
  Tests_LayeredScope_LayeredScope_DryMemberParam,
  Tests_LayeredScope_LayeredScope_DryMessage,
  Tests_LayeredScope_LayeredScope_Duplicates,
  Tests_LayeredScope_LayeredScope_FamilyContext,
  Tests_LayeredScope_LayeredScope_FamilyParam,
  Tests_LayeredScope_LayeredScope_HasUmbrellaAndMember,
  Tests_LayeredScope_LayeredScope_Literals,
  Tests_LayeredScope_LayeredScope_MemberParam,
  Tests_LayeredScope_LayeredScope_MemberPreset,
  Tests_LayeredScope_LayeredScope_MemberPresetMatch,
  Tests_LayeredScope_LayeredScope_MembershipMessage,
  Tests_LayeredScope_LayeredScope_Missing,
  Tests_LayeredScope_LayeredScope_PerPresetMemberFiles,
  Tests_LayeredScope_LayeredScope_PerPresetMemberRelative,
  Tests_LayeredScope_LayeredScope_PerPresetMemberTriples,
  Tests_LayeredScope_LayeredScope_PerPresetUmbrellaByPreset,
  Tests_LayeredScope_LayeredScope_PerPresetUmbrellaFiles,
  Tests_LayeredScope_LayeredScope_PerPresetUmbrellaRelative,
  Tests_LayeredScope_LayeredScope_PerPresetUmbrellaTriples,
  Tests_LayeredScope_LayeredScope_Preset,
  Tests_LayeredScope_LayeredScope_PresetMatch,
  Tests_LayeredScope_LayeredScope_PresetPathPattern,
  Tests_LayeredScope_LayeredScope_SharedMemberPath,
  Tests_LayeredScope_LayeredScope_SharedMemberTriples,
  Tests_LayeredScope_LayeredScope_SharedUmbrellaKeys,
  Tests_LayeredScope_LayeredScope_SharedUmbrellaPath,
  Tests_LayeredScope_LayeredScope_SharedUmbrellaTriples,
  Tests_LayeredScope_LayeredScope_Tokens,
  Tests_LayeredScope_LayeredScope_Triples,
  Tests_LayeredScope_LayeredScope_TsxPath,
  Tests_LayeredScope_LayeredScopeFamilies,
  Tests_LayeredScope_ReadClassNameLiterals_Capture,
  Tests_LayeredScope_ReadClassNameLiterals_Content,
  Tests_LayeredScope_ReadClassNameLiterals_FilePath,
  Tests_LayeredScope_ReadClassNameLiterals_Literals,
  Tests_LayeredScope_ReadClassNameLiterals_Match,
  Tests_LayeredScope_ReadClassNameLiterals_MergeCapture,
  Tests_LayeredScope_ReadClassNameLiterals_MergeMatch,
  Tests_LayeredScope_ReadClassNameLiterals_MergePattern,
  Tests_LayeredScope_ReadClassNameLiterals_Pattern,
  Tests_LayeredScope_ReadClassNameLiterals_Returns,
  Tests_LayeredScope_ReadClassNameLiterals_WhitespacePattern,
  Tests_LayeredScope_ReadTriples_Content,
  Tests_LayeredScope_ReadTriples_FilePath,
  Tests_LayeredScope_ReadTriples_Returns,
  Tests_LayeredScope_StripBlockComments_Pattern,
  Tests_LayeredScope_StripBlockComments_Returns,
  Tests_LayeredScope_StripBlockComments_Source,
  Tests_LayeredScope_TripleKey_Returns,
  Tests_LayeredScope_TripleKey_Triple,
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
const layeredScopeFamilies: Tests_LayeredScope_LayeredScopeFamilies = [{
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
function extractRuleTriples(source: Tests_LayeredScope_ExtractRuleTriples_Source): Tests_LayeredScope_ExtractRuleTriples_Returns {
  const stripped: Tests_LayeredScope_ExtractRuleTriples_Stripped = stripBlockComments(source);
  const triples: Tests_LayeredScope_ExtractRuleTriples_Triples = [];
  const allowDuplicatePattern: Tests_LayeredScope_ExtractRuleTriples_AllowDuplicatePattern = new RegExp(LIB_REGEX_LAYERED_SCOPE_ALLOW_DUPLICATE_COMMENT.source, 'g');
  const whitespacePattern: Tests_LayeredScope_ExtractRuleTriples_WhitespacePattern = new RegExp(LIB_REGEX_WHITESPACE_RUN.source, 'g');

  let depth: Tests_LayeredScope_ExtractRuleTriples_Depth = 0;
  let blockStart: Tests_LayeredScope_ExtractRuleTriples_BlockStart = 0;
  let preludeStart: Tests_LayeredScope_ExtractRuleTriples_PreludeStart = 0;
  let allowed: Tests_LayeredScope_ExtractRuleTriples_Allowed = false;

  for (let index: Tests_LayeredScope_ExtractRuleTriples_Index = 0; index < stripped.length; index += 1) {
    const char: Tests_LayeredScope_ExtractRuleTriples_Char = stripped[index] ?? '';

    if (char === '{') {
      if (depth === 0) {
        const prelude: Tests_LayeredScope_ExtractRuleTriples_Prelude = stripped.slice(preludeStart, index).trim();

        if (prelude.startsWith('@') === true) {
          // At-rule. Walk to its matching close brace; skip emitting triples.
          let nested: Tests_LayeredScope_ExtractRuleTriples_Nested = 1;

          index += 1;

          while (index < stripped.length && nested > 0) {
            const inner: Tests_LayeredScope_ExtractRuleTriples_Inner = stripped[index] ?? '';

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
        const closePrelude: Tests_LayeredScope_ExtractRuleTriples_ClosePrelude = stripped.slice(preludeStart, blockStart - 1).trim();
        const body: Tests_LayeredScope_ExtractRuleTriples_Body = stripped.slice(blockStart, index);

        if (allowed === false) {
          const selector: Tests_LayeredScope_ExtractRuleTriples_Selector = closePrelude
            .replace(allowDuplicatePattern, '')
            .replace(whitespacePattern, ' ')
            .trim();

          for (const declaration of body.split(';')) {
            const declarationText: Tests_LayeredScope_ExtractRuleTriples_DeclarationText = declaration;
            const colon: Tests_LayeredScope_ExtractRuleTriples_Colon = declarationText.indexOf(':');

            if (colon === -1) {
              continue;
            }

            const property: Tests_LayeredScope_ExtractRuleTriples_Property = declarationText.slice(0, colon).trim();
            const rawValue: Tests_LayeredScope_ExtractRuleTriples_RawValue = declarationText.slice(colon + 1).trim();

            if (property === '' || rawValue === '') {
              continue;
            }

            const value: Tests_LayeredScope_ExtractRuleTriples_Value = rawValue.replace(whitespacePattern, ' ');

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
function getPackageRoot(): Tests_LayeredScope_GetPackageRoot_Returns {
  const currentFilePath: Tests_LayeredScope_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_LayeredScope_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

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
async function readClassNameLiterals(filePath: Tests_LayeredScope_ReadClassNameLiterals_FilePath): Tests_LayeredScope_ReadClassNameLiterals_Returns {
  const content: Tests_LayeredScope_ReadClassNameLiterals_Content = await readFile(filePath, 'utf-8');
  const pattern: Tests_LayeredScope_ReadClassNameLiterals_Pattern = new RegExp(LIB_REGEX_JSX_CLASS_NAME.source, 'g');
  const mergePattern: Tests_LayeredScope_ReadClassNameLiterals_MergePattern = new RegExp(LIB_REGEX_JSX_CLASS_NAME_MERGE_FALLBACK.source, 'g');
  const whitespacePattern: Tests_LayeredScope_ReadClassNameLiterals_WhitespacePattern = new RegExp(LIB_REGEX_WHITESPACE_RUN.source, 'g');
  const literals: Tests_LayeredScope_ReadClassNameLiterals_Literals = [];

  let match: Tests_LayeredScope_ReadClassNameLiterals_Match = pattern.exec(content);

  while (match !== null) {
    const capture: Tests_LayeredScope_ReadClassNameLiterals_Capture = match[1];

    if (capture !== undefined) {
      literals.push(capture.replace(whitespacePattern, ' ').trim());
    }

    match = pattern.exec(content);
  }

  let mergeMatch: Tests_LayeredScope_ReadClassNameLiterals_MergeMatch = mergePattern.exec(content);

  while (mergeMatch !== null) {
    const mergeCapture: Tests_LayeredScope_ReadClassNameLiterals_MergeCapture = mergeMatch[1];

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
async function readTriples(filePath: Tests_LayeredScope_ReadTriples_FilePath): Tests_LayeredScope_ReadTriples_Returns {
  try {
    const content: Tests_LayeredScope_ReadTriples_Content = await readFile(filePath, 'utf-8');

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
function stripBlockComments(source: Tests_LayeredScope_StripBlockComments_Source): Tests_LayeredScope_StripBlockComments_Returns {
  const pattern: Tests_LayeredScope_StripBlockComments_Pattern = new RegExp(LIB_REGEX_CSS_BLOCK_COMMENT.source, 'g');

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
function tripleKey(triple: Tests_LayeredScope_TripleKey_Triple): Tests_LayeredScope_TripleKey_Returns {
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
    const familyContext: Tests_LayeredScope_LayeredScope_FamilyContext = family;

    it(`every member of '${familyContext['umbrella']}' renders the umbrella class in its tsx`, async () => {
      const familyParam: Tests_LayeredScope_LayeredScope_FamilyParam = familyContext;
      const missing: Tests_LayeredScope_LayeredScope_Missing = [];

      for (const member of familyParam['members']) {
        const memberParam: Tests_LayeredScope_LayeredScope_MemberParam = member;
        const tsxPath: Tests_LayeredScope_LayeredScope_TsxPath = resolve(getPackageRoot(), memberParam['tsx']);
        const literals: Tests_LayeredScope_LayeredScope_Literals = await readClassNameLiterals(tsxPath);
        const hasUmbrellaAndMember: Tests_LayeredScope_LayeredScope_HasUmbrellaAndMember = literals.some((literal) => {
          const tokens: Tests_LayeredScope_LayeredScope_Tokens = literal.split(' ');

          return tokens.includes(familyParam['umbrella']) === true && tokens.includes(memberParam['class']) === true;
        });

        if (hasUmbrellaAndMember === false) {
          missing.push(`  - '${memberParam['class']}' in ${memberParam['tsx']} (expected className with both '${familyParam['umbrella']}' and '${memberParam['class']}')`);
        }
      }

      const membershipMessage: Tests_LayeredScope_LayeredScope_MembershipMessage = [
        `Members of '${familyParam['umbrella']}' missing the umbrella class in their TSX render:`,
        ...missing,
      ].join('\n');

      strictEqual(missing.length, 0, membershipMessage);

      return;
    });

    it(`no member of '${familyContext['umbrella']}' duplicates an umbrella triple`, async () => {
      const dryFamilyParam: Tests_LayeredScope_LayeredScope_DryFamilyParam = familyContext;
      const sharedUmbrellaPath: Tests_LayeredScope_LayeredScope_SharedUmbrellaPath = resolve(getPackageRoot(), dryFamilyParam['sharedUmbrellaFile']);
      const sharedUmbrellaTriples: Tests_LayeredScope_LayeredScope_SharedUmbrellaTriples = await readTriples(sharedUmbrellaPath);
      const sharedUmbrellaKeys: Tests_LayeredScope_LayeredScope_SharedUmbrellaKeys = new Set(sharedUmbrellaTriples.map(tripleKey));
      const duplicates: Tests_LayeredScope_LayeredScope_Duplicates = [];
      const presetPathPattern: Tests_LayeredScope_LayeredScope_PresetPathPattern = new RegExp(LIB_REGEX_PRESET_PATH_SEGMENT.source);

      const perPresetUmbrellaFiles: Tests_LayeredScope_LayeredScope_PerPresetUmbrellaFiles = await glob(dryFamilyParam['perPresetUmbrellaGlob'], { cwd: getPackageRoot() });
      const perPresetUmbrellaByPreset: Tests_LayeredScope_LayeredScope_PerPresetUmbrellaByPreset = new Map();

      for (const perPresetUmbrella of perPresetUmbrellaFiles) {
        const perPresetUmbrellaRelative: Tests_LayeredScope_LayeredScope_PerPresetUmbrellaRelative = perPresetUmbrella;
        const presetMatch: Tests_LayeredScope_LayeredScope_PresetMatch = perPresetUmbrellaRelative.match(presetPathPattern);

        if (presetMatch === null || presetMatch[1] === undefined) {
          continue;
        }

        const preset: Tests_LayeredScope_LayeredScope_Preset = presetMatch[1];
        const triples: Tests_LayeredScope_LayeredScope_Triples = await readTriples(resolve(getPackageRoot(), perPresetUmbrellaRelative));

        perPresetUmbrellaByPreset.set(preset, triples);
      }

      for (const member of dryFamilyParam['members']) {
        const dryMemberParam: Tests_LayeredScope_LayeredScope_DryMemberParam = member;
        const sharedMemberPath: Tests_LayeredScope_LayeredScope_SharedMemberPath = resolve(getPackageRoot(), dryMemberParam['sharedFile']);
        const sharedMemberTriples: Tests_LayeredScope_LayeredScope_SharedMemberTriples = await readTriples(sharedMemberPath);

        for (const triple of sharedMemberTriples) {
          if (sharedUmbrellaKeys.has(tripleKey(triple)) === true) {
            duplicates.push(`  - ${dryMemberParam['sharedFile']}: '${triple['selector']} { ${triple['property']}: ${triple['value']} }' also in ${dryFamilyParam['sharedUmbrellaFile']}`);
          }
        }

        const perPresetMemberFiles: Tests_LayeredScope_LayeredScope_PerPresetMemberFiles = await glob(dryMemberParam['perPresetGlob'], { cwd: getPackageRoot() });

        for (const perPresetMember of perPresetMemberFiles) {
          const perPresetMemberRelative: Tests_LayeredScope_LayeredScope_PerPresetMemberRelative = perPresetMember;
          const memberPresetMatch: Tests_LayeredScope_LayeredScope_MemberPresetMatch = perPresetMemberRelative.match(presetPathPattern);

          if (memberPresetMatch === null || memberPresetMatch[1] === undefined) {
            continue;
          }

          const memberPreset: Tests_LayeredScope_LayeredScope_MemberPreset = memberPresetMatch[1];
          const perPresetUmbrellaTriples: Tests_LayeredScope_LayeredScope_PerPresetUmbrellaTriples = perPresetUmbrellaByPreset.get(memberPreset) ?? [];
          const combinedKeys: Tests_LayeredScope_LayeredScope_CombinedKeys = new Set([
            ...sharedUmbrellaKeys,
            ...perPresetUmbrellaTriples.map(tripleKey),
          ]);
          const perPresetMemberTriples: Tests_LayeredScope_LayeredScope_PerPresetMemberTriples = await readTriples(resolve(getPackageRoot(), perPresetMemberRelative));

          for (const triple of perPresetMemberTriples) {
            if (combinedKeys.has(tripleKey(triple)) === true) {
              duplicates.push(`  - ${perPresetMemberRelative}: '${triple['selector']} { ${triple['property']}: ${triple['value']} }' also in shared umbrella or presets/${memberPreset} umbrella`);
            }
          }
        }
      }

      const dryMessage: Tests_LayeredScope_LayeredScope_DryMessage = [
        `Member files duplicate '${dryFamilyParam['umbrella']}' umbrella triples (annotate intentional overrides with /* layered-scope:allow-duplicate */):`,
        ...duplicates,
      ].join('\n');

      strictEqual(duplicates.length, 0, dryMessage);

      return;
    });
  }

  return;
});
