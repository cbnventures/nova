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
  TestsCascadeDefensiveCascadeDefensiveAnchorClasses,
  TestsCascadeDefensiveCascadeDefensiveBareClass,
  TestsCascadeDefensiveCascadeDefensiveBareClassMatch,
  TestsCascadeDefensiveCascadeDefensiveBareClassPattern,
  TestsCascadeDefensiveCascadeDefensiveBareColorClasses,
  TestsCascadeDefensiveCascadeDefensiveBareTextDecorationNoneClasses,
  TestsCascadeDefensiveCascadeDefensiveBareValue,
  TestsCascadeDefensiveCascadeDefensiveBareValueLookup,
  TestsCascadeDefensiveCascadeDefensiveClassName,
  TestsCascadeDefensiveCascadeDefensiveClassPlusPseudoPattern,
  TestsCascadeDefensiveCascadeDefensiveColorProperty,
  TestsCascadeDefensiveCascadeDefensiveDarkClass,
  TestsCascadeDefensiveCascadeDefensiveDarkClassMatch,
  TestsCascadeDefensiveCascadeDefensiveDarkLookupKey,
  TestsCascadeDefensiveCascadeDefensiveDarkStrippedSelector,
  TestsCascadeDefensiveCascadeDefensiveDeclaringFile,
  TestsCascadeDefensiveCascadeDefensiveEndsFocusClass,
  TestsCascadeDefensiveCascadeDefensiveEndsFocusClassMatch,
  TestsCascadeDefensiveCascadeDefensiveEndsFocusClassPattern,
  TestsCascadeDefensiveCascadeDefensiveEndsHoverClass,
  TestsCascadeDefensiveCascadeDefensiveEndsHoverClassMatch,
  TestsCascadeDefensiveCascadeDefensiveEndsHoverClassPattern,
  TestsCascadeDefensiveCascadeDefensiveFilePath,
  TestsCascadeDefensiveCascadeDefensiveFileTriples,
  TestsCascadeDefensiveCascadeDefensiveFocusClass,
  TestsCascadeDefensiveCascadeDefensiveFocusClassMatch,
  TestsCascadeDefensiveCascadeDefensiveFocusClassPattern,
  TestsCascadeDefensiveCascadeDefensiveFocusPseudoSuffix,
  TestsCascadeDefensiveCascadeDefensiveGuardedFocusClasses,
  TestsCascadeDefensiveCascadeDefensiveGuardedHoverClasses,
  TestsCascadeDefensiveCascadeDefensiveHoverClass,
  TestsCascadeDefensiveCascadeDefensiveHoverClassMatch,
  TestsCascadeDefensiveCascadeDefensiveHoverClassPattern,
  TestsCascadeDefensiveCascadeDefensiveHoverPseudoSuffix,
  TestsCascadeDefensiveCascadeDefensiveLookupKey,
  TestsCascadeDefensiveCascadeDefensiveMissingGuards,
  TestsCascadeDefensiveCascadeDefensiveMissingGuardsMessage,
  TestsCascadeDefensiveCascadeDefensivePart,
  TestsCascadeDefensiveCascadeDefensiveRedundancies,
  TestsCascadeDefensiveCascadeDefensiveRedundanciesMessage,
  TestsCascadeDefensiveCascadeDefensiveTriplesByFile,
  TestsCascadeDefensiveCascadeDefensiveTsxPaths,
  TestsCascadeDefensiveExtractAnchorClassesAnchorOpenPattern,
  TestsCascadeDefensiveExtractAnchorClassesBraceDepth,
  TestsCascadeDefensiveExtractAnchorClassesClasses,
  TestsCascadeDefensiveExtractAnchorClassesClassToken,
  TestsCascadeDefensiveExtractAnchorClassesContent,
  TestsCascadeDefensiveExtractAnchorClassesEndIndex,
  TestsCascadeDefensiveExtractAnchorClassesMergeCapture,
  TestsCascadeDefensiveExtractAnchorClassesMergeMatch,
  TestsCascadeDefensiveExtractAnchorClassesMergePattern,
  TestsCascadeDefensiveExtractAnchorClassesOpeningTag,
  TestsCascadeDefensiveExtractAnchorClassesReturns,
  TestsCascadeDefensiveExtractAnchorClassesScanChar,
  TestsCascadeDefensiveExtractAnchorClassesStaticCapture,
  TestsCascadeDefensiveExtractAnchorClassesStaticMatch,
  TestsCascadeDefensiveExtractAnchorClassesStaticPattern,
  TestsCascadeDefensiveExtractAnchorClassesTagMatch,
  TestsCascadeDefensiveExtractAnchorClassesTagName,
  TestsCascadeDefensiveExtractAnchorClassesWhitespacePattern,
  TestsCascadeDefensiveExtractRuleTriplesBlockStart,
  TestsCascadeDefensiveExtractRuleTriplesBody,
  TestsCascadeDefensiveExtractRuleTriplesChar,
  TestsCascadeDefensiveExtractRuleTriplesColon,
  TestsCascadeDefensiveExtractRuleTriplesDeclaration,
  TestsCascadeDefensiveExtractRuleTriplesDefensive,
  TestsCascadeDefensiveExtractRuleTriplesDefensivePattern,
  TestsCascadeDefensiveExtractRuleTriplesDepth,
  TestsCascadeDefensiveExtractRuleTriplesIndex,
  TestsCascadeDefensiveExtractRuleTriplesInner,
  TestsCascadeDefensiveExtractRuleTriplesNested,
  TestsCascadeDefensiveExtractRuleTriplesPrelude,
  TestsCascadeDefensiveExtractRuleTriplesPreludeStart,
  TestsCascadeDefensiveExtractRuleTriplesProperty,
  TestsCascadeDefensiveExtractRuleTriplesRawValue,
  TestsCascadeDefensiveExtractRuleTriplesReturns,
  TestsCascadeDefensiveExtractRuleTriplesSelector,
  TestsCascadeDefensiveExtractRuleTriplesSource,
  TestsCascadeDefensiveExtractRuleTriplesStripped,
  TestsCascadeDefensiveExtractRuleTriplesTriples,
  TestsCascadeDefensiveExtractRuleTriplesValue,
  TestsCascadeDefensiveExtractRuleTriplesWhitespacePattern,
  TestsCascadeDefensiveGetPackageRootCurrentFileDirectory,
  TestsCascadeDefensiveGetPackageRootCurrentFilePath,
  TestsCascadeDefensiveGetPackageRootReturns,
  TestsCascadeDefensiveListThemeAndBlockTsxAbsolute,
  TestsCascadeDefensiveListThemeAndBlockTsxBlocksFiles,
  TestsCascadeDefensiveListThemeAndBlockTsxBlocksRoot,
  TestsCascadeDefensiveListThemeAndBlockTsxReturns,
  TestsCascadeDefensiveListThemeAndBlockTsxThemeFiles,
  TestsCascadeDefensiveListThemeAndBlockTsxThemeRoot,
  TestsCascadeDefensiveReadAnchorClassesAnchorClasses,
  TestsCascadeDefensiveReadAnchorClassesClassName,
  TestsCascadeDefensiveReadAnchorClassesContent,
  TestsCascadeDefensiveReadAnchorClassesPerFileClasses,
  TestsCascadeDefensiveReadAnchorClassesReturns,
  TestsCascadeDefensiveReadAnchorClassesTsxPaths,
  TestsCascadeDefensiveReadCssTriplesByFileAbsolutePath,
  TestsCascadeDefensiveReadCssTriplesByFileContent,
  TestsCascadeDefensiveReadCssTriplesByFileRelativePaths,
  TestsCascadeDefensiveReadCssTriplesByFileReturns,
  TestsCascadeDefensiveReadCssTriplesByFileStylesRoot,
  TestsCascadeDefensiveReadCssTriplesByFileTriplesByFile,
  TestsCascadeDefensiveStripBlockCommentsPattern,
  TestsCascadeDefensiveStripBlockCommentsReturns,
  TestsCascadeDefensiveStripBlockCommentsSource,
  TestsCascadeDefensiveStripDarkSelectorPrefixPattern,
  TestsCascadeDefensiveStripDarkSelectorPrefixReturns,
  TestsCascadeDefensiveStripDarkSelectorPrefixSelector,
  TestsCascadeDefensiveTripleKeyReturns,
  TestsCascadeDefensiveTripleKeyTriple,
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
function extractAnchorClasses(content: TestsCascadeDefensiveExtractAnchorClassesContent): TestsCascadeDefensiveExtractAnchorClassesReturns {
  const classes: TestsCascadeDefensiveExtractAnchorClassesClasses = new Set();
  const anchorOpenPattern: TestsCascadeDefensiveExtractAnchorClassesAnchorOpenPattern = new RegExp(LIB_REGEX_JSX_TAG_OPEN_NAME.source, 'g');
  const staticPattern: TestsCascadeDefensiveExtractAnchorClassesStaticPattern = new RegExp(LIB_REGEX_JSX_CLASS_NAME.source);
  const mergePattern: TestsCascadeDefensiveExtractAnchorClassesMergePattern = new RegExp(LIB_REGEX_JSX_CLASS_NAME_MERGE_FALLBACK.source);
  const whitespacePattern: TestsCascadeDefensiveExtractAnchorClassesWhitespacePattern = new RegExp(LIB_REGEX_WHITESPACE_RUN.source);

  let tagMatch: TestsCascadeDefensiveExtractAnchorClassesTagMatch = anchorOpenPattern.exec(content);

  while (tagMatch !== null) {
    const tagName: TestsCascadeDefensiveExtractAnchorClassesTagName = tagMatch[1] ?? '';

    if (tagName !== 'a' && tagName !== 'Link') {
      tagMatch = anchorOpenPattern.exec(content);

      continue;
    }

    // Walk forward from the captured tag-name end to find the closing `>` of
    // the opening tag while tracking JSX expression brace depth so embedded
    // expressions like `to={getUrl(...)}` do not terminate the scan early.
    let endIndex: TestsCascadeDefensiveExtractAnchorClassesEndIndex = tagMatch.index + tagMatch[0].length;
    let braceDepth: TestsCascadeDefensiveExtractAnchorClassesBraceDepth = 0;

    while (endIndex < content.length) {
      const scanChar: TestsCascadeDefensiveExtractAnchorClassesScanChar = content[endIndex] ?? '';

      if (scanChar === '{') {
        braceDepth += 1;
      } else if (scanChar === '}') {
        braceDepth -= 1;
      } else if (scanChar === '>' && braceDepth === 0) {
        break;
      }

      endIndex += 1;
    }

    const openingTag: TestsCascadeDefensiveExtractAnchorClassesOpeningTag = content.slice(tagMatch.index, endIndex);
    const staticMatch: TestsCascadeDefensiveExtractAnchorClassesStaticMatch = openingTag.match(staticPattern);

    if (staticMatch !== null) {
      const staticCapture: TestsCascadeDefensiveExtractAnchorClassesStaticCapture = staticMatch[1] ?? '';

      for (const classToken of staticCapture.trim().split(whitespacePattern)) {
        const classTokenTrimmed: TestsCascadeDefensiveExtractAnchorClassesClassToken = classToken;

        if (classTokenTrimmed !== '') {
          classes.add(classTokenTrimmed);
        }
      }

      tagMatch = anchorOpenPattern.exec(content);

      continue;
    }

    const mergeMatch: TestsCascadeDefensiveExtractAnchorClassesMergeMatch = openingTag.match(mergePattern);

    if (mergeMatch !== null) {
      const mergeCapture: TestsCascadeDefensiveExtractAnchorClassesMergeCapture = mergeMatch[1] ?? '';

      for (const classToken of mergeCapture.trim().split(whitespacePattern)) {
        const classTokenTrimmed: TestsCascadeDefensiveExtractAnchorClassesClassToken = classToken;

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
function extractRuleTriples(source: TestsCascadeDefensiveExtractRuleTriplesSource): TestsCascadeDefensiveExtractRuleTriplesReturns {
  const stripped: TestsCascadeDefensiveExtractRuleTriplesStripped = stripBlockComments(source);
  const triples: TestsCascadeDefensiveExtractRuleTriplesTriples = [];
  const defensivePattern: TestsCascadeDefensiveExtractRuleTriplesDefensivePattern = new RegExp(LIB_REGEX_CASCADE_DEFENSIVE_COMMENT.source, 'g');
  const whitespacePattern: TestsCascadeDefensiveExtractRuleTriplesWhitespacePattern = new RegExp(LIB_REGEX_WHITESPACE_RUN.source, 'g');

  let depth: TestsCascadeDefensiveExtractRuleTriplesDepth = 0;
  let blockStart: TestsCascadeDefensiveExtractRuleTriplesBlockStart = 0;
  let preludeStart: TestsCascadeDefensiveExtractRuleTriplesPreludeStart = 0;
  let defensive: TestsCascadeDefensiveExtractRuleTriplesDefensive = false;

  for (let index: TestsCascadeDefensiveExtractRuleTriplesIndex = 0; index < stripped.length; index += 1) {
    const char: TestsCascadeDefensiveExtractRuleTriplesChar = stripped[index] ?? '';

    if (char === '{') {
      if (depth === 0) {
        const prelude: TestsCascadeDefensiveExtractRuleTriplesPrelude = stripped.slice(preludeStart, index).trim();

        if (prelude.startsWith('@') === true) {
          // At-rule. Walk to its matching close brace; skip emitting triples.
          let nested: TestsCascadeDefensiveExtractRuleTriplesNested = 1;

          index += 1;

          while (index < stripped.length && nested > 0) {
            const inner: TestsCascadeDefensiveExtractRuleTriplesInner = stripped[index] ?? '';

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
        const prelude: TestsCascadeDefensiveExtractRuleTriplesPrelude = stripped.slice(preludeStart, blockStart - 1).trim();
        const body: TestsCascadeDefensiveExtractRuleTriplesBody = stripped.slice(blockStart, index);
        const selector: TestsCascadeDefensiveExtractRuleTriplesSelector = prelude
          .replace(defensivePattern, '')
          .replace(whitespacePattern, ' ')
          .trim();

        for (const declaration of body.split(';')) {
          const declarationText: TestsCascadeDefensiveExtractRuleTriplesDeclaration = declaration;
          const colon: TestsCascadeDefensiveExtractRuleTriplesColon = declarationText.indexOf(':');

          if (colon === -1) {
            continue;
          }

          const property: TestsCascadeDefensiveExtractRuleTriplesProperty = declarationText.slice(0, colon).trim();
          const rawValue: TestsCascadeDefensiveExtractRuleTriplesRawValue = declarationText.slice(colon + 1).trim();

          if (property === '' || rawValue === '') {
            continue;
          }

          const value: TestsCascadeDefensiveExtractRuleTriplesValue = rawValue.replace(whitespacePattern, ' ');

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
function getPackageRoot(): TestsCascadeDefensiveGetPackageRootReturns {
  const currentFilePath: TestsCascadeDefensiveGetPackageRootCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsCascadeDefensiveGetPackageRootCurrentFileDirectory = dirname(currentFilePath);

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
async function listThemeAndBlockTsx(): TestsCascadeDefensiveListThemeAndBlockTsxReturns {
  const themeRoot: TestsCascadeDefensiveListThemeAndBlockTsxThemeRoot = resolve(getPackageRoot(), 'src', 'theme');
  const blocksRoot: TestsCascadeDefensiveListThemeAndBlockTsxBlocksRoot = resolve(getPackageRoot(), 'src', 'blocks');
  const themeFiles: TestsCascadeDefensiveListThemeAndBlockTsxThemeFiles = await glob('**/*.tsx', {
    cwd: themeRoot, posix: true,
  });
  const blocksFiles: TestsCascadeDefensiveListThemeAndBlockTsxBlocksFiles = await glob('**/*.tsx', {
    cwd: blocksRoot, posix: true,
  });
  const absolute: TestsCascadeDefensiveListThemeAndBlockTsxAbsolute = [];

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
async function readAnchorClasses(tsxPaths: TestsCascadeDefensiveReadAnchorClassesTsxPaths): TestsCascadeDefensiveReadAnchorClassesReturns {
  const anchorClasses: TestsCascadeDefensiveReadAnchorClassesAnchorClasses = new Set();

  for (const tsxPath of tsxPaths) {
    const content: TestsCascadeDefensiveReadAnchorClassesContent = await readFile(tsxPath, 'utf-8');
    const perFileClasses: TestsCascadeDefensiveReadAnchorClassesPerFileClasses = extractAnchorClasses(content);

    for (const className of perFileClasses) {
      const classNameToken: TestsCascadeDefensiveReadAnchorClassesClassName = className;

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
async function readCssTriplesByFile(): TestsCascadeDefensiveReadCssTriplesByFileReturns {
  const stylesRoot: TestsCascadeDefensiveReadCssTriplesByFileStylesRoot = resolve(getPackageRoot(), 'src', 'styles');
  const relativePaths: TestsCascadeDefensiveReadCssTriplesByFileRelativePaths = await glob('**/*.css', {
    cwd: stylesRoot, posix: true,
  });
  const triplesByFile: TestsCascadeDefensiveReadCssTriplesByFileTriplesByFile = new Map();

  for (const relativePath of relativePaths) {
    const absolutePath: TestsCascadeDefensiveReadCssTriplesByFileAbsolutePath = resolve(stylesRoot, relativePath);
    const content: TestsCascadeDefensiveReadCssTriplesByFileContent = await readFile(absolutePath, 'utf-8');

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
function stripBlockComments(source: TestsCascadeDefensiveStripBlockCommentsSource): TestsCascadeDefensiveStripBlockCommentsReturns {
  const pattern: TestsCascadeDefensiveStripBlockCommentsPattern = new RegExp(LIB_REGEX_CSS_BLOCK_COMMENT.source, 'g');

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
function stripDarkSelectorPrefix(selector: TestsCascadeDefensiveStripDarkSelectorPrefixSelector): TestsCascadeDefensiveStripDarkSelectorPrefixReturns {
  const pattern: TestsCascadeDefensiveStripDarkSelectorPrefixPattern = new RegExp(LIB_REGEX_DARK_SELECTOR_PREFIX.source);

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
function tripleKey(triple: TestsCascadeDefensiveTripleKeyTriple): TestsCascadeDefensiveTripleKeyReturns {
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
    const tsxPaths: TestsCascadeDefensiveCascadeDefensiveTsxPaths = await listThemeAndBlockTsx();
    const anchorClasses: TestsCascadeDefensiveCascadeDefensiveAnchorClasses = await readAnchorClasses(tsxPaths);
    const triplesByFile: TestsCascadeDefensiveCascadeDefensiveTriplesByFile = await readCssTriplesByFile();
    const bareTextDecorationNoneClasses: TestsCascadeDefensiveCascadeDefensiveBareTextDecorationNoneClasses = new Map();
    const guardedHover: TestsCascadeDefensiveCascadeDefensiveGuardedHoverClasses = new Set();
    const guardedFocus: TestsCascadeDefensiveCascadeDefensiveGuardedFocusClasses = new Set();
    const bareClassPattern: TestsCascadeDefensiveCascadeDefensiveBareClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_BARE_CLASS.source);
    const hoverClassPattern: TestsCascadeDefensiveCascadeDefensiveHoverClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_CLASS_HOVER.source);
    const focusClassPattern: TestsCascadeDefensiveCascadeDefensiveFocusClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_CLASS_FOCUS_VISIBLE.source);
    const hoverPseudoSuffix: TestsCascadeDefensiveCascadeDefensiveHoverPseudoSuffix = ':hover';
    const focusPseudoSuffix: TestsCascadeDefensiveCascadeDefensiveFocusPseudoSuffix = ':focus-visible';

    // First pass - collect every comma-part of every triple in every file.
    // Comma-separated selectors (`.foo:hover, .foo:focus-visible { ... }`)
    // are treated as independent selector matches against the bare and
    // pseudo regexes so a single rule can register guards for both pseudos.
    for (const entry of triplesByFile) {
      const filePath: TestsCascadeDefensiveCascadeDefensiveFilePath = entry[0];
      const fileTriples: TestsCascadeDefensiveCascadeDefensiveFileTriples = entry[1];

      for (const triple of fileTriples) {
        if (triple['property'] !== 'text-decoration' || triple['value'] !== 'none') {
          continue;
        }

        for (const rawPart of triple['selector'].split(',')) {
          const part: TestsCascadeDefensiveCascadeDefensivePart = rawPart.trim();
          const bareMatch: TestsCascadeDefensiveCascadeDefensiveBareClassMatch = part.match(bareClassPattern);

          if (bareMatch !== null) {
            const bareClass: TestsCascadeDefensiveCascadeDefensiveBareClass = bareMatch[1] ?? '';

            if (bareClass !== '' && bareTextDecorationNoneClasses.has(bareClass) === false) {
              bareTextDecorationNoneClasses.set(bareClass, filePath);
            }

            continue;
          }

          const hoverMatch: TestsCascadeDefensiveCascadeDefensiveHoverClassMatch = part.match(hoverClassPattern);

          if (hoverMatch !== null) {
            const hoverClass: TestsCascadeDefensiveCascadeDefensiveHoverClass = hoverMatch[1] ?? '';

            if (hoverClass !== '') {
              guardedHover.add(hoverClass);
            }

            continue;
          }

          const focusMatch: TestsCascadeDefensiveCascadeDefensiveFocusClassMatch = part.match(focusClassPattern);

          if (focusMatch !== null) {
            const focusClass: TestsCascadeDefensiveCascadeDefensiveFocusClass = focusMatch[1] ?? '';

            if (focusClass !== '') {
              guardedFocus.add(focusClass);
            }
          }
        }
      }
    }

    // Second pass - for each anchor class with bare text-decoration: none,
    // require both pseudo guards somewhere in the styles tree.
    const missingGuards: TestsCascadeDefensiveCascadeDefensiveMissingGuards = [];

    for (const entry of bareTextDecorationNoneClasses) {
      const className: TestsCascadeDefensiveCascadeDefensiveClassName = entry[0];
      const declaringFile: TestsCascadeDefensiveCascadeDefensiveDeclaringFile = entry[1];

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

    const missingGuardsMessage: TestsCascadeDefensiveCascadeDefensiveMissingGuardsMessage = [
      'Anchor classes with bare text-decoration: none missing defensive pseudo guards (the light-mode preset a:hover, a:focus-visible { text-decoration: underline } clobber rule will underline the link otherwise):',
      ...missingGuards,
    ].join('\n');

    strictEqual(missingGuards.length, 0, missingGuardsMessage);

    return;
  });

  it('no non-anchor class declares a dark-mode rule matching its light-mode value', async () => {
    const tsxPaths: TestsCascadeDefensiveCascadeDefensiveTsxPaths = await listThemeAndBlockTsx();
    const anchorClasses: TestsCascadeDefensiveCascadeDefensiveAnchorClasses = await readAnchorClasses(tsxPaths);
    const triplesByFile: TestsCascadeDefensiveCascadeDefensiveTriplesByFile = await readCssTriplesByFile();
    const classPlusPseudoPattern: TestsCascadeDefensiveCascadeDefensiveClassPlusPseudoPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_CLASS_PLUS_OPTIONAL_PSEUDO.source);
    const redundancies: TestsCascadeDefensiveCascadeDefensiveRedundancies = [];

    for (const entry of triplesByFile) {
      const filePath: TestsCascadeDefensiveCascadeDefensiveFilePath = entry[0];
      const fileTriples: TestsCascadeDefensiveCascadeDefensiveFileTriples = entry[1];
      const bareValueLookup: TestsCascadeDefensiveCascadeDefensiveBareValueLookup = new Map();

      // Build (selector, property) → value lookup for all non-dark rules in
      // this file. Dark rules are excluded so a dark rule's selector cannot
      // self-match against itself after the prefix strip.
      for (const triple of fileTriples) {
        if (triple['selector'].startsWith('[data-theme="dark"]') === true) {
          continue;
        }

        const lookupKey: TestsCascadeDefensiveCascadeDefensiveLookupKey = tripleKey(triple);

        bareValueLookup.set(lookupKey, triple['value']);
      }

      // Scan dark rules. Flag each where bare equivalent in same file has
      // the same value AND the class is not applied to any anchor element.
      for (const triple of fileTriples) {
        if (triple['defensive'] === true) {
          continue;
        }

        const strippedSelector: TestsCascadeDefensiveCascadeDefensiveDarkStrippedSelector = stripDarkSelectorPrefix(triple['selector']);

        if (strippedSelector === null) {
          continue;
        }

        const darkLookupKey: TestsCascadeDefensiveCascadeDefensiveDarkLookupKey = `${strippedSelector}|${triple['property']}`;
        const bareValue: TestsCascadeDefensiveCascadeDefensiveBareValue = bareValueLookup.get(darkLookupKey);

        if (bareValue !== triple['value']) {
          continue;
        }

        const darkClassMatch: TestsCascadeDefensiveCascadeDefensiveDarkClassMatch = strippedSelector.match(classPlusPseudoPattern);

        if (darkClassMatch === null) {
          continue;
        }

        const darkClass: TestsCascadeDefensiveCascadeDefensiveDarkClass = darkClassMatch[1] ?? '';

        if (darkClass === '' || anchorClasses.has(darkClass) === true) {
          continue;
        }

        redundancies.push(`  - ${filePath}: '[data-theme="dark"] ${strippedSelector} { ${triple['property']}: ${triple['value']} }' is redundant - bare '${strippedSelector}' in the same file declares the same value, and '.${darkClass}' is not applied to '<a>' or '<Link>' (no cascade clobber to defend against). Remove or annotate the rule with '/* cascade-defensive */'.`);
      }
    }

    const redundanciesMessage: TestsCascadeDefensiveCascadeDefensiveRedundanciesMessage = [
      'Non-anchor classes with redundant dark-mode rules matching the bare light value:',
      ...redundancies,
    ].join('\n');

    strictEqual(redundancies.length, 0, redundanciesMessage);

    return;
  });

  it('every anchor class with bare color declares hover and focus-visible color guards', async () => {
    const tsxPaths: TestsCascadeDefensiveCascadeDefensiveTsxPaths = await listThemeAndBlockTsx();
    const anchorClasses: TestsCascadeDefensiveCascadeDefensiveAnchorClasses = await readAnchorClasses(tsxPaths);
    const triplesByFile: TestsCascadeDefensiveCascadeDefensiveTriplesByFile = await readCssTriplesByFile();
    const bareColorClasses: TestsCascadeDefensiveCascadeDefensiveBareColorClasses = new Map();
    const guardedHover: TestsCascadeDefensiveCascadeDefensiveGuardedHoverClasses = new Set();
    const guardedFocus: TestsCascadeDefensiveCascadeDefensiveGuardedFocusClasses = new Set();
    const bareClassPattern: TestsCascadeDefensiveCascadeDefensiveBareClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_BARE_CLASS.source);
    const endsHoverPattern: TestsCascadeDefensiveCascadeDefensiveEndsHoverClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_ENDS_CLASS_HOVER.source);
    const endsFocusPattern: TestsCascadeDefensiveCascadeDefensiveEndsFocusClassPattern = new RegExp(LIB_REGEX_CSS_SELECTOR_ENDS_CLASS_FOCUS_VISIBLE.source);
    const colorProperty: TestsCascadeDefensiveCascadeDefensiveColorProperty = 'color';
    const hoverPseudoSuffix: TestsCascadeDefensiveCascadeDefensiveHoverPseudoSuffix = ':hover';
    const focusPseudoSuffix: TestsCascadeDefensiveCascadeDefensiveFocusPseudoSuffix = ':focus-visible';

    // First pass - collect (a) bare color declarations per class and (b) any
    // hover/focus-visible color guard that targets the class. Guards are
    // matched by selector SUFFIX (`.parent .button:hover` counts the same as
    // `.button:hover`) because either form yields specificity high enough to
    // tie or beat the global `a:hover` (0,1,1) clobber on later source order.
    for (const entry of triplesByFile) {
      const filePath: TestsCascadeDefensiveCascadeDefensiveFilePath = entry[0];
      const fileTriples: TestsCascadeDefensiveCascadeDefensiveFileTriples = entry[1];

      for (const triple of fileTriples) {
        if (triple['property'] !== colorProperty) {
          continue;
        }

        for (const rawPart of triple['selector'].split(',')) {
          const part: TestsCascadeDefensiveCascadeDefensivePart = rawPart.trim();
          const bareMatch: TestsCascadeDefensiveCascadeDefensiveBareClassMatch = part.match(bareClassPattern);

          if (bareMatch !== null) {
            const bareClass: TestsCascadeDefensiveCascadeDefensiveBareClass = bareMatch[1] ?? '';

            if (bareClass !== '' && bareColorClasses.has(bareClass) === false) {
              bareColorClasses.set(bareClass, filePath);
            }

            continue;
          }

          const hoverMatch: TestsCascadeDefensiveCascadeDefensiveEndsHoverClassMatch = part.match(endsHoverPattern);

          if (hoverMatch !== null) {
            const hoverClass: TestsCascadeDefensiveCascadeDefensiveEndsHoverClass = hoverMatch[1] ?? '';

            if (hoverClass !== '') {
              guardedHover.add(hoverClass);
            }

            continue;
          }

          const focusMatch: TestsCascadeDefensiveCascadeDefensiveEndsFocusClassMatch = part.match(endsFocusPattern);

          if (focusMatch !== null) {
            const focusClass: TestsCascadeDefensiveCascadeDefensiveEndsFocusClass = focusMatch[1] ?? '';

            if (focusClass !== '') {
              guardedFocus.add(focusClass);
            }
          }
        }
      }
    }

    // Second pass - for each anchor class with a bare color declaration,
    // require both pseudo guards to exist somewhere in the styles tree.
    const missingGuards: TestsCascadeDefensiveCascadeDefensiveMissingGuards = [];

    for (const entry of bareColorClasses) {
      const className: TestsCascadeDefensiveCascadeDefensiveClassName = entry[0];
      const declaringFile: TestsCascadeDefensiveCascadeDefensiveDeclaringFile = entry[1];

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

    const missingGuardsMessage: TestsCascadeDefensiveCascadeDefensiveMissingGuardsMessage = [
      'Anchor classes with bare color missing defensive hover/focus-visible color guards (the per-preset a:hover, a:focus-visible { color: var(--nova-color-primary-700) } clobber rule will recolor the link otherwise):',
      ...missingGuards,
    ].join('\n');

    strictEqual(missingGuards.length, 0, missingGuardsMessage);

    return;
  });

  return;
});
