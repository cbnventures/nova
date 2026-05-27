import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import { describe, it } from 'vitest';

import {
  LIB_REGEX_CASCADE_DEFENSIVE_COMMENT,
  LIB_REGEX_CSS_BLOCK_COMMENT,
  LIB_REGEX_CSS_SELECTOR_BARE_CLASS,
  LIB_REGEX_CSS_SELECTOR_CLASS_FOCUS_VISIBLE,
  LIB_REGEX_CSS_SELECTOR_CLASS_HOVER,
  LIB_REGEX_CSS_SELECTOR_CLASS_PLUS_OPTIONAL_PSEUDO,
  LIB_REGEX_CSS_SELECTOR_ENDS_CLASS_FOCUS_VISIBLE,
  LIB_REGEX_CSS_SELECTOR_ENDS_CLASS_HOVER,
  LIB_REGEX_DARK_SELECTOR_PREFIX,
  LIB_REGEX_JSX_CLASS_NAME,
  LIB_REGEX_JSX_CLASS_NAME_MERGE_FALLBACK,
  LIB_REGEX_JSX_TAG_OPEN_NAME,
  LIB_REGEX_WHITESPACE_RUN,
} from '../lib/regex.js';

import type {
  Tests_CascadeDefensive_CascadeDefensive_AnchorClasses,
  Tests_CascadeDefensive_CascadeDefensive_BareClass,
  Tests_CascadeDefensive_CascadeDefensive_BareClassMatch,
  Tests_CascadeDefensive_CascadeDefensive_BareClassPattern,
  Tests_CascadeDefensive_CascadeDefensive_BareColorClasses,
  Tests_CascadeDefensive_CascadeDefensive_BareTextDecorationNoneClasses,
  Tests_CascadeDefensive_CascadeDefensive_BareValue,
  Tests_CascadeDefensive_CascadeDefensive_BareValueLookup,
  Tests_CascadeDefensive_CascadeDefensive_ClassName,
  Tests_CascadeDefensive_CascadeDefensive_ClassPlusPseudoPattern,
  Tests_CascadeDefensive_CascadeDefensive_ColorProperty,
  Tests_CascadeDefensive_CascadeDefensive_DarkClass,
  Tests_CascadeDefensive_CascadeDefensive_DarkClassMatch,
  Tests_CascadeDefensive_CascadeDefensive_DarkLookupKey,
  Tests_CascadeDefensive_CascadeDefensive_DarkStrippedSelector,
  Tests_CascadeDefensive_CascadeDefensive_DeclaringFile,
  Tests_CascadeDefensive_CascadeDefensive_EndsFocusClass,
  Tests_CascadeDefensive_CascadeDefensive_EndsFocusClassMatch,
  Tests_CascadeDefensive_CascadeDefensive_EndsFocusClassPattern,
  Tests_CascadeDefensive_CascadeDefensive_EndsHoverClass,
  Tests_CascadeDefensive_CascadeDefensive_EndsHoverClassMatch,
  Tests_CascadeDefensive_CascadeDefensive_EndsHoverClassPattern,
  Tests_CascadeDefensive_CascadeDefensive_FilePath,
  Tests_CascadeDefensive_CascadeDefensive_FileTriples,
  Tests_CascadeDefensive_CascadeDefensive_FocusClass,
  Tests_CascadeDefensive_CascadeDefensive_FocusClassMatch,
  Tests_CascadeDefensive_CascadeDefensive_FocusClassPattern,
  Tests_CascadeDefensive_CascadeDefensive_FocusPseudoSuffix,
  Tests_CascadeDefensive_CascadeDefensive_GuardedFocusClasses,
  Tests_CascadeDefensive_CascadeDefensive_GuardedHoverClasses,
  Tests_CascadeDefensive_CascadeDefensive_HoverClass,
  Tests_CascadeDefensive_CascadeDefensive_HoverClassMatch,
  Tests_CascadeDefensive_CascadeDefensive_HoverClassPattern,
  Tests_CascadeDefensive_CascadeDefensive_HoverPseudoSuffix,
  Tests_CascadeDefensive_CascadeDefensive_LookupKey,
  Tests_CascadeDefensive_CascadeDefensive_MissingGuards,
  Tests_CascadeDefensive_CascadeDefensive_MissingGuardsMessage,
  Tests_CascadeDefensive_CascadeDefensive_Part,
  Tests_CascadeDefensive_CascadeDefensive_Redundancies,
  Tests_CascadeDefensive_CascadeDefensive_RedundanciesMessage,
  Tests_CascadeDefensive_CascadeDefensive_TriplesByFile,
  Tests_CascadeDefensive_CascadeDefensive_TsxPaths,
  Tests_CascadeDefensive_ExtractAnchorClasses_AnchorOpenPattern,
  Tests_CascadeDefensive_ExtractAnchorClasses_BraceDepth,
  Tests_CascadeDefensive_ExtractAnchorClasses_Classes,
  Tests_CascadeDefensive_ExtractAnchorClasses_ClassToken,
  Tests_CascadeDefensive_ExtractAnchorClasses_Content,
  Tests_CascadeDefensive_ExtractAnchorClasses_EndIndex,
  Tests_CascadeDefensive_ExtractAnchorClasses_MergeCapture,
  Tests_CascadeDefensive_ExtractAnchorClasses_MergeMatch,
  Tests_CascadeDefensive_ExtractAnchorClasses_MergePattern,
  Tests_CascadeDefensive_ExtractAnchorClasses_OpeningTag,
  Tests_CascadeDefensive_ExtractAnchorClasses_Returns,
  Tests_CascadeDefensive_ExtractAnchorClasses_ScanChar,
  Tests_CascadeDefensive_ExtractAnchorClasses_StaticCapture,
  Tests_CascadeDefensive_ExtractAnchorClasses_StaticMatch,
  Tests_CascadeDefensive_ExtractAnchorClasses_StaticPattern,
  Tests_CascadeDefensive_ExtractAnchorClasses_TagMatch,
  Tests_CascadeDefensive_ExtractAnchorClasses_TagName,
  Tests_CascadeDefensive_ExtractAnchorClasses_WhitespacePattern,
  Tests_CascadeDefensive_ExtractRuleTriples_BlockStart,
  Tests_CascadeDefensive_ExtractRuleTriples_Body,
  Tests_CascadeDefensive_ExtractRuleTriples_Char,
  Tests_CascadeDefensive_ExtractRuleTriples_Colon,
  Tests_CascadeDefensive_ExtractRuleTriples_Declaration,
  Tests_CascadeDefensive_ExtractRuleTriples_Defensive,
  Tests_CascadeDefensive_ExtractRuleTriples_DefensivePattern,
  Tests_CascadeDefensive_ExtractRuleTriples_Depth,
  Tests_CascadeDefensive_ExtractRuleTriples_Index,
  Tests_CascadeDefensive_ExtractRuleTriples_Inner,
  Tests_CascadeDefensive_ExtractRuleTriples_Nested,
  Tests_CascadeDefensive_ExtractRuleTriples_Prelude,
  Tests_CascadeDefensive_ExtractRuleTriples_PreludeStart,
  Tests_CascadeDefensive_ExtractRuleTriples_Property,
  Tests_CascadeDefensive_ExtractRuleTriples_RawValue,
  Tests_CascadeDefensive_ExtractRuleTriples_Returns,
  Tests_CascadeDefensive_ExtractRuleTriples_Selector,
  Tests_CascadeDefensive_ExtractRuleTriples_Source,
  Tests_CascadeDefensive_ExtractRuleTriples_Stripped,
  Tests_CascadeDefensive_ExtractRuleTriples_Triples,
  Tests_CascadeDefensive_ExtractRuleTriples_Value,
  Tests_CascadeDefensive_ExtractRuleTriples_WhitespacePattern,
  Tests_CascadeDefensive_GetPackageRoot_CurrentFileDirectory,
  Tests_CascadeDefensive_GetPackageRoot_CurrentFilePath,
  Tests_CascadeDefensive_GetPackageRoot_Returns,
  Tests_CascadeDefensive_ListThemeAndBlockTsx_Absolute,
  Tests_CascadeDefensive_ListThemeAndBlockTsx_BlocksFiles,
  Tests_CascadeDefensive_ListThemeAndBlockTsx_BlocksRoot,
  Tests_CascadeDefensive_ListThemeAndBlockTsx_Returns,
  Tests_CascadeDefensive_ListThemeAndBlockTsx_ThemeFiles,
  Tests_CascadeDefensive_ListThemeAndBlockTsx_ThemeRoot,
  Tests_CascadeDefensive_ReadAnchorClasses_AnchorClasses,
  Tests_CascadeDefensive_ReadAnchorClasses_ClassName,
  Tests_CascadeDefensive_ReadAnchorClasses_Content,
  Tests_CascadeDefensive_ReadAnchorClasses_PerFileClasses,
  Tests_CascadeDefensive_ReadAnchorClasses_Returns,
  Tests_CascadeDefensive_ReadAnchorClasses_TsxPaths,
  Tests_CascadeDefensive_ReadCssTriplesByFile_AbsolutePath,
  Tests_CascadeDefensive_ReadCssTriplesByFile_Content,
  Tests_CascadeDefensive_ReadCssTriplesByFile_RelativePaths,
  Tests_CascadeDefensive_ReadCssTriplesByFile_Returns,
  Tests_CascadeDefensive_ReadCssTriplesByFile_StylesRoot,
  Tests_CascadeDefensive_ReadCssTriplesByFile_TriplesByFile,
  Tests_CascadeDefensive_StripBlockComments_Pattern,
  Tests_CascadeDefensive_StripBlockComments_Returns,
  Tests_CascadeDefensive_StripBlockComments_Source,
  Tests_CascadeDefensive_StripDarkSelectorPrefix_Pattern,
  Tests_CascadeDefensive_StripDarkSelectorPrefix_Returns,
  Tests_CascadeDefensive_StripDarkSelectorPrefix_Selector,
  Tests_CascadeDefensive_TripleKey_Returns,
  Tests_CascadeDefensive_TripleKey_Triple,
} from '../types/tests/cascade-defensive.test.d.ts';

/**
 * Tests - Cascade Defensive - Extract Anchor Classes.
 *
 * Scans a TSX source string for JSX opening tags that
 * render as anchor elements (`<a>` and `<Link>`) and
 * returns the set of CSS class names applied to those
 * tags. Handles both the static `className="..."` form and
 * the canonical merge fallback `className={(props[...] !==
 * undefined) ? \`X ${...}\` : 'X'}`. Multi-line opening
 * tags work because brace-depth tracking finds the closing
 * `>` of the opening tag (not the first `>` encountered,
 * which may sit inside a JSX expression).
 *
 * @since 0.18.0
 */
function extractAnchorClasses(content: Tests_CascadeDefensive_ExtractAnchorClasses_Content): Tests_CascadeDefensive_ExtractAnchorClasses_Returns {
  const classes: Tests_CascadeDefensive_ExtractAnchorClasses_Classes = new Set();
  const anchorOpenPattern: Tests_CascadeDefensive_ExtractAnchorClasses_AnchorOpenPattern = new RegExp(LIB_REGEX_JSX_TAG_OPEN_NAME.source, 'g');
  const staticPattern: Tests_CascadeDefensive_ExtractAnchorClasses_StaticPattern = new RegExp(LIB_REGEX_JSX_CLASS_NAME.source);
  const mergePattern: Tests_CascadeDefensive_ExtractAnchorClasses_MergePattern = new RegExp(LIB_REGEX_JSX_CLASS_NAME_MERGE_FALLBACK.source);
  const whitespacePattern: Tests_CascadeDefensive_ExtractAnchorClasses_WhitespacePattern = new RegExp(LIB_REGEX_WHITESPACE_RUN.source);

  let tagMatch: Tests_CascadeDefensive_ExtractAnchorClasses_TagMatch = anchorOpenPattern.exec(content);

  while (tagMatch !== null) {
    const tagName: Tests_CascadeDefensive_ExtractAnchorClasses_TagName = tagMatch[1] ?? '';

    if (tagName !== 'a' && tagName !== 'Link') {
      tagMatch = anchorOpenPattern.exec(content);

      continue;
    }

    // Walk forward from the captured tag-name end to find the closing `>` of
    // the opening tag while tracking JSX expression brace depth so embedded
    // expressions like `to={getUrl(...)}` do not terminate the scan early.
    let endIndex: Tests_CascadeDefensive_ExtractAnchorClasses_EndIndex = tagMatch.index + tagMatch[0].length;
    let braceDepth: Tests_CascadeDefensive_ExtractAnchorClasses_BraceDepth = 0;

    while (endIndex < content.length) {
      const scanChar: Tests_CascadeDefensive_ExtractAnchorClasses_ScanChar = content[endIndex] ?? '';

      if (scanChar === '{') {
        braceDepth += 1;
      } else if (scanChar === '}') {
        braceDepth -= 1;
      } else if (scanChar === '>' && braceDepth === 0) {
        break;
      }

      endIndex += 1;
    }

    const openingTag: Tests_CascadeDefensive_ExtractAnchorClasses_OpeningTag = content.slice(tagMatch.index, endIndex);
    const staticMatch: Tests_CascadeDefensive_ExtractAnchorClasses_StaticMatch = openingTag.match(staticPattern);

    if (staticMatch !== null) {
      const staticCapture: Tests_CascadeDefensive_ExtractAnchorClasses_StaticCapture = staticMatch[1] ?? '';

      for (const classToken of staticCapture.trim().split(whitespacePattern)) {
        const classTokenTrimmed: Tests_CascadeDefensive_ExtractAnchorClasses_ClassToken = classToken;

        if (classTokenTrimmed !== '') {
          classes.add(classTokenTrimmed);
        }
      }

      tagMatch = anchorOpenPattern.exec(content);

      continue;
    }

    const mergeMatch: Tests_CascadeDefensive_ExtractAnchorClasses_MergeMatch = openingTag.match(mergePattern);

    if (mergeMatch !== null) {
      const mergeCapture: Tests_CascadeDefensive_ExtractAnchorClasses_MergeCapture = mergeMatch[1] ?? '';

      for (const classToken of mergeCapture.trim().split(whitespacePattern)) {
        const classTokenTrimmed: Tests_CascadeDefensive_ExtractAnchorClasses_ClassToken = classToken;

        if (classTokenTrimmed !== '') {
          classes.add(classTokenTrimmed);
        }
      }
    }

    tagMatch = anchorOpenPattern.exec(content);
  }

  return classes;
}

/**
 * Tests - Cascade Defensive - Extract Rule Triples.
 *
 * Parses a CSS source string into a flat list of
 * (selector, property, value, defensive) triples for every
 * top-level rule. At-rule bodies (`@media`, `@supports`,
 * etc.) are skipped intentionally - they wrap rules that
 * often share triples with top-level rules but apply
 * conditionally, so comparing them blindly would produce
 * false positives. Selectors and values are
 * whitespace-normalised so trivial formatting differences
 * do not mask exact duplicates. A `/* cascade-defensive *\/`
 * comment immediately before a rule prelude tags every
 * triple from that rule with `defensive: true` so the
 * Pattern 2 check can skip it.
 *
 * @since 0.18.0
 */
function extractRuleTriples(source: Tests_CascadeDefensive_ExtractRuleTriples_Source): Tests_CascadeDefensive_ExtractRuleTriples_Returns {
  const stripped: Tests_CascadeDefensive_ExtractRuleTriples_Stripped = stripBlockComments(source);
  const triples: Tests_CascadeDefensive_ExtractRuleTriples_Triples = [];
  const defensivePattern: Tests_CascadeDefensive_ExtractRuleTriples_DefensivePattern = new RegExp(LIB_REGEX_CASCADE_DEFENSIVE_COMMENT.source, 'g');
  const whitespacePattern: Tests_CascadeDefensive_ExtractRuleTriples_WhitespacePattern = new RegExp(LIB_REGEX_WHITESPACE_RUN.source, 'g');

  let depth: Tests_CascadeDefensive_ExtractRuleTriples_Depth = 0;
  let blockStart: Tests_CascadeDefensive_ExtractRuleTriples_BlockStart = 0;
  let preludeStart: Tests_CascadeDefensive_ExtractRuleTriples_PreludeStart = 0;
  let defensive: Tests_CascadeDefensive_ExtractRuleTriples_Defensive = false;

  for (let index: Tests_CascadeDefensive_ExtractRuleTriples_Index = 0; index < stripped.length; index += 1) {
    const char: Tests_CascadeDefensive_ExtractRuleTriples_Char = stripped[index] ?? '';

    if (char === '{') {
      if (depth === 0) {
        const prelude: Tests_CascadeDefensive_ExtractRuleTriples_Prelude = stripped.slice(preludeStart, index).trim();

        if (prelude.startsWith('@') === true) {
          // At-rule. Walk to its matching close brace; skip emitting triples.
          let nested: Tests_CascadeDefensive_ExtractRuleTriples_Nested = 1;

          index += 1;

          while (index < stripped.length && nested > 0) {
            const inner: Tests_CascadeDefensive_ExtractRuleTriples_Inner = stripped[index] ?? '';

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
          defensive = stripped.slice(preludeStart, index).includes('cascade-defensive');
          depth += 1;
        }
      } else {
        depth += 1;
      }
    } else if (char === '}') {
      if (depth === 1) {
        const prelude: Tests_CascadeDefensive_ExtractRuleTriples_Prelude = stripped.slice(preludeStart, blockStart - 1).trim();
        const body: Tests_CascadeDefensive_ExtractRuleTriples_Body = stripped.slice(blockStart, index);
        const selector: Tests_CascadeDefensive_ExtractRuleTriples_Selector = prelude
          .replace(defensivePattern, '')
          .replace(whitespacePattern, ' ')
          .trim();

        for (const declaration of body.split(';')) {
          const declarationText: Tests_CascadeDefensive_ExtractRuleTriples_Declaration = declaration;
          const colon: Tests_CascadeDefensive_ExtractRuleTriples_Colon = declarationText.indexOf(':');

          if (colon === -1) {
            continue;
          }

          const property: Tests_CascadeDefensive_ExtractRuleTriples_Property = declarationText.slice(0, colon).trim();
          const rawValue: Tests_CascadeDefensive_ExtractRuleTriples_RawValue = declarationText.slice(colon + 1).trim();

          if (property === '' || rawValue === '') {
            continue;
          }

          const value: Tests_CascadeDefensive_ExtractRuleTriples_Value = rawValue.replace(whitespacePattern, ' ');

          triples.push({
            selector,
            property,
            value,
            defensive,
          });
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
 * Tests - Cascade Defensive - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @since 0.18.0
 */
function getPackageRoot(): Tests_CascadeDefensive_GetPackageRoot_Returns {
  const currentFilePath: Tests_CascadeDefensive_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_CascadeDefensive_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Cascade Defensive - List Theme And Block TSX.
 *
 * Globs every `*.tsx` file under `src/theme` and
 * `src/blocks` and returns absolute paths so the
 * anchor-class scan can read each in turn. Non-JSX helper
 * files (`*.ts`) are excluded because they cannot render
 * JSX anchor tags.
 *
 * @since 0.18.0
 */
async function listThemeAndBlockTsx(): Tests_CascadeDefensive_ListThemeAndBlockTsx_Returns {
  const themeRoot: Tests_CascadeDefensive_ListThemeAndBlockTsx_ThemeRoot = resolve(getPackageRoot(), 'src', 'theme');
  const blocksRoot: Tests_CascadeDefensive_ListThemeAndBlockTsx_BlocksRoot = resolve(getPackageRoot(), 'src', 'blocks');
  const themeFiles: Tests_CascadeDefensive_ListThemeAndBlockTsx_ThemeFiles = await glob('**/*.tsx', {
    cwd: themeRoot, posix: true,
  });
  const blocksFiles: Tests_CascadeDefensive_ListThemeAndBlockTsx_BlocksFiles = await glob('**/*.tsx', {
    cwd: blocksRoot, posix: true,
  });
  const absolute: Tests_CascadeDefensive_ListThemeAndBlockTsx_Absolute = [];

  for (const file of themeFiles) {
    absolute.push(resolve(themeRoot, file));
  }

  for (const file of blocksFiles) {
    absolute.push(resolve(blocksRoot, file));
  }

  return absolute;
}

/**
 * Tests - Cascade Defensive - Read Anchor Classes.
 *
 * Reads every TSX file in the supplied list and merges the
 * anchor-class sets they yield into one combined set. The
 * input is the absolute-path list from
 * `listThemeAndBlockTsx` so callers can short-circuit
 * re-scanning on the same invocation.
 *
 * @since 0.18.0
 */
async function readAnchorClasses(tsxPaths: Tests_CascadeDefensive_ReadAnchorClasses_TsxPaths): Tests_CascadeDefensive_ReadAnchorClasses_Returns {
  const anchorClasses: Tests_CascadeDefensive_ReadAnchorClasses_AnchorClasses = new Set();

  for (const tsxPath of tsxPaths) {
    const content: Tests_CascadeDefensive_ReadAnchorClasses_Content = await readFile(tsxPath, 'utf-8');
    const perFileClasses: Tests_CascadeDefensive_ReadAnchorClasses_PerFileClasses = extractAnchorClasses(content);

    for (const className of perFileClasses) {
      const classNameToken: Tests_CascadeDefensive_ReadAnchorClasses_ClassName = className;

      anchorClasses.add(classNameToken);
    }
  }

  return anchorClasses;
}

/**
 * Tests - Cascade Defensive - Read CSS Triples By File.
 *
 * Globs every `.css` file under `src/styles` and returns a
 * map keyed by relative path with each file's triple list.
 * Returning a map (instead of one flat list) lets both the
 * Pattern 5 cross-file guard search and the Pattern 2
 * per-file redundancy check share one disk pass.
 *
 * @since 0.18.0
 */
async function readCssTriplesByFile(): Tests_CascadeDefensive_ReadCssTriplesByFile_Returns {
  const stylesRoot: Tests_CascadeDefensive_ReadCssTriplesByFile_StylesRoot = resolve(getPackageRoot(), 'src', 'styles');
  const relativePaths: Tests_CascadeDefensive_ReadCssTriplesByFile_RelativePaths = await glob('**/*.css', {
    cwd: stylesRoot, posix: true,
  });
  const triplesByFile: Tests_CascadeDefensive_ReadCssTriplesByFile_TriplesByFile = new Map();

  for (const relativePath of relativePaths) {
    const absolutePath: Tests_CascadeDefensive_ReadCssTriplesByFile_AbsolutePath = resolve(stylesRoot, relativePath);
    const content: Tests_CascadeDefensive_ReadCssTriplesByFile_Content = await readFile(absolutePath, 'utf-8');

    triplesByFile.set(relativePath, extractRuleTriples(content));
  }

  return triplesByFile;
}

/**
 * Tests - Cascade Defensive - Strip Block Comments.
 *
 * Removes CSS block comments from a source string,
 * preserving any comment that carries the
 * `cascade-defensive` opt-out marker so the triple extractor
 * can detect it later when classifying the rule.
 *
 * @since 0.18.0
 */
function stripBlockComments(source: Tests_CascadeDefensive_StripBlockComments_Source): Tests_CascadeDefensive_StripBlockComments_Returns {
  const pattern: Tests_CascadeDefensive_StripBlockComments_Pattern = new RegExp(LIB_REGEX_CSS_BLOCK_COMMENT.source, 'g');

  return source.replace(pattern, (match) => {
    if (match.includes('cascade-defensive') === true) {
      return '/* cascade-defensive */';
    }

    return '';
  });
}

/**
 * Tests - Cascade Defensive - Strip Dark Selector Prefix.
 *
 * Returns the selector with the leading
 * `[data-theme="dark"]` descendant prefix removed, or
 * `null` if the selector does not start with that prefix.
 * The descendant pattern (attribute followed by whitespace)
 * is the only dark-mode form the Pattern 2 check models -
 * compound forms like `:root[data-theme="dark"]` and
 * `[data-theme="dark"] .a .b` strip to a leaf that
 * downstream regex filters reject, so this helper only has
 * to bail when the prefix itself is absent.
 *
 * @since 0.18.0
 */
function stripDarkSelectorPrefix(selector: Tests_CascadeDefensive_StripDarkSelectorPrefix_Selector): Tests_CascadeDefensive_StripDarkSelectorPrefix_Returns {
  const pattern: Tests_CascadeDefensive_StripDarkSelectorPrefix_Pattern = new RegExp(LIB_REGEX_DARK_SELECTOR_PREFIX.source);

  if (pattern.test(selector) === false) {
    return null;
  }

  return selector.replace(pattern, '');
}

/**
 * Tests - Cascade Defensive - Triple Key.
 *
 * Serialises the (selector, property) prefix of a triple to
 * a stable string key for Map lookup. The value field is
 * intentionally excluded - the Pattern 2 redundancy check
 * needs to look up bare values by (selector, property) to
 * compare against the dark rule's value, so the key omits
 * the value to make the lookup match dark/light pairs.
 *
 * @since 0.18.0
 */
function tripleKey(triple: Tests_CascadeDefensive_TripleKey_Triple): Tests_CascadeDefensive_TripleKey_Returns {
  return `${triple['selector']}|${triple['property']}`;
}

/**
 * Tests - Cascade Defensive - Cascade Defensive.
 *
 * Two complementary meta-tests run in this suite:
 *
 *   1. Pattern 5 - every class applied to an anchor element
 *      (`<a>` / `<Link>`) that also declares
 *      `text-decoration: none` on its bare class must
 *      declare matching `:hover` and `:focus-visible`
 *      defensive guards somewhere in the styles tree. The
 *      light-mode `a:hover { text-decoration: underline }`
 *      preset rule (specificity 0,1,1) clobbers the bare
 *      class (0,1,0) on hover and focus, so the
 *      class-on-anchor cascade requires the pseudo guards
 *      (0,2,0) to keep the link from underlining.
 *
 *   2. Pattern 2 - no non-anchor class may declare a
 *      `[data-theme="dark"] .X { prop: V }` rule whose
 *      value matches the bare `.X { prop: V }` rule's
 *      value in the same file. Without an anchor cascade
 *      to defend against, the dark rule is dead weight.
 *      Genuinely defensive guards on non-anchor classes
 *      (where some other intermediate selector clobbers
 *      in dark mode) annotate the rule with
 *      `/* cascade-defensive *\/` to opt out.
 *
 * @since 0.18.0
 */
describe('cascade defensive', () => {
  it('every anchor class with bare text-decoration: none declares hover and focus-visible guards', async () => {
    const tsxPaths: Tests_CascadeDefensive_CascadeDefensive_TsxPaths = await listThemeAndBlockTsx();
    const anchorClasses: Tests_CascadeDefensive_CascadeDefensive_AnchorClasses = await readAnchorClasses(tsxPaths);
    const triplesByFile: Tests_CascadeDefensive_CascadeDefensive_TriplesByFile = await readCssTriplesByFile();
    const bareTextDecorationNoneClasses: Tests_CascadeDefensive_CascadeDefensive_BareTextDecorationNoneClasses = new Map();
    const guardedHover: Tests_CascadeDefensive_CascadeDefensive_GuardedHoverClasses = new Set();
    const guardedFocus: Tests_CascadeDefensive_CascadeDefensive_GuardedFocusClasses = new Set();
    const bareClassPattern: Tests_CascadeDefensive_CascadeDefensive_BareClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_BARE_CLASS.source);
    const hoverClassPattern: Tests_CascadeDefensive_CascadeDefensive_HoverClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_CLASS_HOVER.source);
    const focusClassPattern: Tests_CascadeDefensive_CascadeDefensive_FocusClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_CLASS_FOCUS_VISIBLE.source);
    const hoverPseudoSuffix: Tests_CascadeDefensive_CascadeDefensive_HoverPseudoSuffix = ':hover';
    const focusPseudoSuffix: Tests_CascadeDefensive_CascadeDefensive_FocusPseudoSuffix = ':focus-visible';

    // First pass - collect every comma-part of every triple in every file.
    // Comma-separated selectors (`.foo:hover, .foo:focus-visible { ... }`)
    // are treated as independent selector matches against the bare and
    // pseudo regexes so a single rule can register guards for both pseudos.
    for (const entry of triplesByFile) {
      const filePath: Tests_CascadeDefensive_CascadeDefensive_FilePath = entry[0];
      const fileTriples: Tests_CascadeDefensive_CascadeDefensive_FileTriples = entry[1];

      for (const triple of fileTriples) {
        if (triple['property'] !== 'text-decoration' || triple['value'] !== 'none') {
          continue;
        }

        for (const rawPart of triple['selector'].split(',')) {
          const part: Tests_CascadeDefensive_CascadeDefensive_Part = rawPart.trim();
          const bareMatch: Tests_CascadeDefensive_CascadeDefensive_BareClassMatch = part.match(bareClassPattern);

          if (bareMatch !== null) {
            const bareClass: Tests_CascadeDefensive_CascadeDefensive_BareClass = bareMatch[1] ?? '';

            if (bareClass !== '' && bareTextDecorationNoneClasses.has(bareClass) === false) {
              bareTextDecorationNoneClasses.set(bareClass, filePath);
            }

            continue;
          }

          const hoverMatch: Tests_CascadeDefensive_CascadeDefensive_HoverClassMatch = part.match(hoverClassPattern);

          if (hoverMatch !== null) {
            const hoverClass: Tests_CascadeDefensive_CascadeDefensive_HoverClass = hoverMatch[1] ?? '';

            if (hoverClass !== '') {
              guardedHover.add(hoverClass);
            }

            continue;
          }

          const focusMatch: Tests_CascadeDefensive_CascadeDefensive_FocusClassMatch = part.match(focusClassPattern);

          if (focusMatch !== null) {
            const focusClass: Tests_CascadeDefensive_CascadeDefensive_FocusClass = focusMatch[1] ?? '';

            if (focusClass !== '') {
              guardedFocus.add(focusClass);
            }
          }
        }
      }
    }

    // Second pass - for each anchor class with bare text-decoration: none,
    // require both pseudo guards somewhere in the styles tree.
    const missingGuards: Tests_CascadeDefensive_CascadeDefensive_MissingGuards = [];

    for (const entry of bareTextDecorationNoneClasses) {
      const className: Tests_CascadeDefensive_CascadeDefensive_ClassName = entry[0];
      const declaringFile: Tests_CascadeDefensive_CascadeDefensive_DeclaringFile = entry[1];

      if (anchorClasses.has(className) === false) {
        continue;
      }

      if (guardedHover.has(className) === false) {
        missingGuards.push(`  - '.${className}' (bare declaration in ${declaringFile}): missing '.${className}${hoverPseudoSuffix} { text-decoration: none }' guard`);
      }

      if (guardedFocus.has(className) === false) {
        missingGuards.push(`  - '.${className}' (bare declaration in ${declaringFile}): missing '.${className}${focusPseudoSuffix} { text-decoration: none }' guard`);
      }
    }

    const missingGuardsMessage: Tests_CascadeDefensive_CascadeDefensive_MissingGuardsMessage = [
      'Anchor classes with bare text-decoration: none missing defensive pseudo guards (the light-mode preset a:hover, a:focus-visible { text-decoration: underline } clobber rule will underline the link otherwise):',
      ...missingGuards,
    ].join('\n');

    strictEqual(missingGuards.length, 0, missingGuardsMessage);

    return;
  });

  it('no non-anchor class declares a dark-mode rule matching its light-mode value', async () => {
    const tsxPaths: Tests_CascadeDefensive_CascadeDefensive_TsxPaths = await listThemeAndBlockTsx();
    const anchorClasses: Tests_CascadeDefensive_CascadeDefensive_AnchorClasses = await readAnchorClasses(tsxPaths);
    const triplesByFile: Tests_CascadeDefensive_CascadeDefensive_TriplesByFile = await readCssTriplesByFile();
    const classPlusPseudoPattern: Tests_CascadeDefensive_CascadeDefensive_ClassPlusPseudoPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_CLASS_PLUS_OPTIONAL_PSEUDO.source);
    const redundancies: Tests_CascadeDefensive_CascadeDefensive_Redundancies = [];

    for (const entry of triplesByFile) {
      const filePath: Tests_CascadeDefensive_CascadeDefensive_FilePath = entry[0];
      const fileTriples: Tests_CascadeDefensive_CascadeDefensive_FileTriples = entry[1];
      const bareValueLookup: Tests_CascadeDefensive_CascadeDefensive_BareValueLookup = new Map();

      // Build (selector, property) → value lookup for all non-dark rules in
      // this file. Dark rules are excluded so a dark rule's selector cannot
      // self-match against itself after the prefix strip.
      for (const triple of fileTriples) {
        if (triple['selector'].startsWith('[data-theme="dark"]') === true) {
          continue;
        }

        const lookupKey: Tests_CascadeDefensive_CascadeDefensive_LookupKey = tripleKey(triple);

        bareValueLookup.set(lookupKey, triple['value']);
      }

      // Scan dark rules. Flag each where bare equivalent in same file has
      // the same value AND the class is not applied to any anchor element.
      for (const triple of fileTriples) {
        if (triple['defensive'] === true) {
          continue;
        }

        const strippedSelector: Tests_CascadeDefensive_CascadeDefensive_DarkStrippedSelector = stripDarkSelectorPrefix(triple['selector']);

        if (strippedSelector === null) {
          continue;
        }

        const darkLookupKey: Tests_CascadeDefensive_CascadeDefensive_DarkLookupKey = `${strippedSelector}|${triple['property']}`;
        const bareValue: Tests_CascadeDefensive_CascadeDefensive_BareValue = bareValueLookup.get(darkLookupKey);

        if (bareValue !== triple['value']) {
          continue;
        }

        const darkClassMatch: Tests_CascadeDefensive_CascadeDefensive_DarkClassMatch = strippedSelector.match(classPlusPseudoPattern);

        if (darkClassMatch === null) {
          continue;
        }

        const darkClass: Tests_CascadeDefensive_CascadeDefensive_DarkClass = darkClassMatch[1] ?? '';

        if (darkClass === '' || anchorClasses.has(darkClass) === true) {
          continue;
        }

        redundancies.push(`  - ${filePath}: '[data-theme="dark"] ${strippedSelector} { ${triple['property']}: ${triple['value']} }' is redundant - bare '${strippedSelector}' in the same file declares the same value, and '.${darkClass}' is not applied to '<a>' or '<Link>' (no cascade clobber to defend against). Remove or annotate the rule with '/* cascade-defensive */'.`);
      }
    }

    const redundanciesMessage: Tests_CascadeDefensive_CascadeDefensive_RedundanciesMessage = [
      'Non-anchor classes with redundant dark-mode rules matching the bare light value:',
      ...redundancies,
    ].join('\n');

    strictEqual(redundancies.length, 0, redundanciesMessage);

    return;
  });

  it('every anchor class with bare color declares hover and focus-visible color guards', async () => {
    const tsxPaths: Tests_CascadeDefensive_CascadeDefensive_TsxPaths = await listThemeAndBlockTsx();
    const anchorClasses: Tests_CascadeDefensive_CascadeDefensive_AnchorClasses = await readAnchorClasses(tsxPaths);
    const triplesByFile: Tests_CascadeDefensive_CascadeDefensive_TriplesByFile = await readCssTriplesByFile();
    const bareColorClasses: Tests_CascadeDefensive_CascadeDefensive_BareColorClasses = new Map();
    const guardedHover: Tests_CascadeDefensive_CascadeDefensive_GuardedHoverClasses = new Set();
    const guardedFocus: Tests_CascadeDefensive_CascadeDefensive_GuardedFocusClasses = new Set();
    const bareClassPattern: Tests_CascadeDefensive_CascadeDefensive_BareClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_BARE_CLASS.source);
    const endsHoverPattern: Tests_CascadeDefensive_CascadeDefensive_EndsHoverClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_ENDS_CLASS_HOVER.source);
    const endsFocusPattern: Tests_CascadeDefensive_CascadeDefensive_EndsFocusClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_ENDS_CLASS_FOCUS_VISIBLE.source);
    const colorProperty: Tests_CascadeDefensive_CascadeDefensive_ColorProperty = 'color';
    const hoverPseudoSuffix: Tests_CascadeDefensive_CascadeDefensive_HoverPseudoSuffix = ':hover';
    const focusPseudoSuffix: Tests_CascadeDefensive_CascadeDefensive_FocusPseudoSuffix = ':focus-visible';

    // First pass - collect (a) bare color declarations per class and (b) any
    // hover/focus-visible color guard that targets the class. Guards are
    // matched by selector SUFFIX (`.parent .button:hover` counts the same as
    // `.button:hover`) because either form yields specificity high enough to
    // tie or beat the global `a:hover` (0,1,1) clobber on later source order.
    for (const entry of triplesByFile) {
      const filePath: Tests_CascadeDefensive_CascadeDefensive_FilePath = entry[0];
      const fileTriples: Tests_CascadeDefensive_CascadeDefensive_FileTriples = entry[1];

      for (const triple of fileTriples) {
        if (triple['property'] !== colorProperty) {
          continue;
        }

        for (const rawPart of triple['selector'].split(',')) {
          const part: Tests_CascadeDefensive_CascadeDefensive_Part = rawPart.trim();
          const bareMatch: Tests_CascadeDefensive_CascadeDefensive_BareClassMatch = part.match(bareClassPattern);

          if (bareMatch !== null) {
            const bareClass: Tests_CascadeDefensive_CascadeDefensive_BareClass = bareMatch[1] ?? '';

            if (bareClass !== '' && bareColorClasses.has(bareClass) === false) {
              bareColorClasses.set(bareClass, filePath);
            }

            continue;
          }

          const hoverMatch: Tests_CascadeDefensive_CascadeDefensive_EndsHoverClassMatch = part.match(endsHoverPattern);

          if (hoverMatch !== null) {
            const hoverClass: Tests_CascadeDefensive_CascadeDefensive_EndsHoverClass = hoverMatch[1] ?? '';

            if (hoverClass !== '') {
              guardedHover.add(hoverClass);
            }

            continue;
          }

          const focusMatch: Tests_CascadeDefensive_CascadeDefensive_EndsFocusClassMatch = part.match(endsFocusPattern);

          if (focusMatch !== null) {
            const focusClass: Tests_CascadeDefensive_CascadeDefensive_EndsFocusClass = focusMatch[1] ?? '';

            if (focusClass !== '') {
              guardedFocus.add(focusClass);
            }
          }
        }
      }
    }

    // Second pass - for each anchor class with a bare color declaration,
    // require both pseudo guards to exist somewhere in the styles tree.
    const missingGuards: Tests_CascadeDefensive_CascadeDefensive_MissingGuards = [];

    for (const entry of bareColorClasses) {
      const className: Tests_CascadeDefensive_CascadeDefensive_ClassName = entry[0];
      const declaringFile: Tests_CascadeDefensive_CascadeDefensive_DeclaringFile = entry[1];

      if (anchorClasses.has(className) === false) {
        continue;
      }

      if (guardedHover.has(className) === false) {
        missingGuards.push(`  - '.${className}' (bare color in ${declaringFile}): missing a '.${className}${hoverPseudoSuffix} { color: ... }' guard. Any descendant-scoped form ending in '.${className}${hoverPseudoSuffix}' (e.g. '.parent .${className}${hoverPseudoSuffix}') also satisfies.`);
      }

      if (guardedFocus.has(className) === false) {
        missingGuards.push(`  - '.${className}' (bare color in ${declaringFile}): missing a '.${className}${focusPseudoSuffix} { color: ... }' guard. Any descendant-scoped form ending in '.${className}${focusPseudoSuffix}' (e.g. '.parent .${className}${focusPseudoSuffix}') also satisfies.`);
      }
    }

    const missingGuardsMessage: Tests_CascadeDefensive_CascadeDefensive_MissingGuardsMessage = [
      'Anchor classes with bare color missing defensive hover/focus-visible color guards (the per-preset a:hover, a:focus-visible { color: var(--nova-color-primary-700) } clobber rule will recolor the link otherwise):',
      ...missingGuards,
    ].join('\n');

    strictEqual(missingGuards.length, 0, missingGuardsMessage);

    return;
  });

  return;
});
