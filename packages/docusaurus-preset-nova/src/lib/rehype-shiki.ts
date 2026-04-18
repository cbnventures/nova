import { LIB_REGEX_METASTRING_LINE_RANGE } from './regex.js';

import type {
  LibRehypeShikiCollectNodesChild,
  LibRehypeShikiCollectNodesChildren,
  LibRehypeShikiCollectNodesMatches,
  LibRehypeShikiCollectNodesReturns,
  LibRehypeShikiCollectNodesTagName,
  LibRehypeShikiCollectNodesTree,
  LibRehypeShikiCollectNodesWalkNode,
  LibRehypeShikiExtractTextChildren,
  LibRehypeShikiExtractTextNode,
  LibRehypeShikiExtractTextParts,
  LibRehypeShikiExtractTextReturns,
  LibRehypeShikiModuleHighlighterHighlighter,
  LibRehypeShikiModuleHighlighterHighlighterPromise,
  LibRehypeShikiParseLineRangeDashIndex,
  LibRehypeShikiParseLineRangeEnd,
  LibRehypeShikiParseLineRangeLineNumber,
  LibRehypeShikiParseLineRangeMatch,
  LibRehypeShikiParseLineRangeMetastring,
  LibRehypeShikiParseLineRangeParts,
  LibRehypeShikiParseLineRangeRangeContent,
  LibRehypeShikiParseLineRangeResult,
  LibRehypeShikiParseLineRangeReturns,
  LibRehypeShikiParseLineRangeStart,
  LibRehypeShikiParseLineRangeTrimmedPart,
  LibRehypeShikiProcessDiffLinesAddLines,
  LibRehypeShikiProcessDiffLinesCode,
  LibRehypeShikiProcessDiffLinesFirstChar,
  LibRehypeShikiProcessDiffLinesLines,
  LibRehypeShikiProcessDiffLinesRemoveLines,
  LibRehypeShikiProcessDiffLinesResult,
  LibRehypeShikiProcessDiffLinesReturns,
  LibRehypeShikiProcessMagicCommentsCode,
  LibRehypeShikiProcessMagicCommentsHighlightedLines,
  LibRehypeShikiProcessMagicCommentsInsideHighlightBlock,
  LibRehypeShikiProcessMagicCommentsIsHighlightNext,
  LibRehypeShikiProcessMagicCommentsLines,
  LibRehypeShikiProcessMagicCommentsOutputLineNumber,
  LibRehypeShikiProcessMagicCommentsOutputLines,
  LibRehypeShikiProcessMagicCommentsReturns,
  LibRehypeShikiProcessMagicCommentsTrimmedLine,
  LibRehypeShikiProcessNodeClassNameRaw,
  LibRehypeShikiProcessNodeClassNames,
  LibRehypeShikiProcessNodeCodeNode,
  LibRehypeShikiProcessNodeDiffAddLineNumbers,
  LibRehypeShikiProcessNodeDiffRemoveLineNumbers,
  LibRehypeShikiProcessNodeHastChildren,
  LibRehypeShikiProcessNodeHastPreElement,
  LibRehypeShikiProcessNodeHastRootRecord,
  LibRehypeShikiProcessNodeHighlightedHtml,
  LibRehypeShikiProcessNodeHighlightedLineNumbers,
  LibRehypeShikiProcessNodeHighlighter,
  LibRehypeShikiProcessNodeIndex,
  LibRehypeShikiProcessNodeLang,
  LibRehypeShikiProcessNodeLangClass,
  LibRehypeShikiProcessNodeLineNode,
  LibRehypeShikiProcessNodeLineNumber,
  LibRehypeShikiProcessNodeLineProperties,
  LibRehypeShikiProcessNodeMarkedHtml,
  LibRehypeShikiProcessNodeMetastring,
  LibRehypeShikiProcessNodeMetastringValue,
  LibRehypeShikiProcessNodeMetaValue,
  LibRehypeShikiProcessNodeNode,
  LibRehypeShikiProcessNodeOptions,
  LibRehypeShikiProcessNodeParent,
  LibRehypeShikiProcessNodeParentChildren,
  LibRehypeShikiProcessNodeProcessedCode,
  LibRehypeShikiProcessNodeRawText,
  LibRehypeShikiProcessNodeTypedHighlighter,
  LibRehypeShikiRehypeShikiOptions,
  LibRehypeShikiRehypeShikiReturns,
  LibRehypeShikiRehypeShikiTransformerBundledLanguageLoader,
  LibRehypeShikiRehypeShikiTransformerIsLanguageLoaded,
  LibRehypeShikiRehypeShikiTransformerLoadedLanguages,
  LibRehypeShikiRehypeShikiTransformerNodes,
  LibRehypeShikiRehypeShikiTransformerReturns,
  LibRehypeShikiRehypeShikiTransformerShikiModule,
  LibRehypeShikiRehypeShikiTransformerTree,
} from '../types/lib/rehype-shiki.d.ts';

/**
 * Lib - Rehype Shiki - Collect Nodes.
 *
 * Recursively walks a hast tree and collects all element nodes matching
 * the given tag name along with their parent reference
 * and child index.
 *
 * @param {LibRehypeShikiCollectNodesTree}    tree    - Tree.
 * @param {LibRehypeShikiCollectNodesTagName} tagName - Tag name.
 *
 * @returns {LibRehypeShikiCollectNodesReturns}
 *
 * @since 0.15.0
 */
function collectNodes(tree: LibRehypeShikiCollectNodesTree, tagName: LibRehypeShikiCollectNodesTagName): LibRehypeShikiCollectNodesReturns {
  const matches: LibRehypeShikiCollectNodesMatches = [];

  function walk(node: LibRehypeShikiCollectNodesWalkNode) {
    const children: LibRehypeShikiCollectNodesChildren = node['children'] ?? [];

    for (let i = 0; i < children.length; i += 1) {
      const child: LibRehypeShikiCollectNodesChild = children[i];

      if (child === undefined) {
        continue;
      }

      if (child['type'] === 'element' && child['tagName'] === tagName) {
        matches.push({
          node: child,
          index: i,
          parent: node,
        });
      }

      walk(child);
    }

    return;
  }

  walk(tree);

  return matches;
}

/**
 * Lib - Rehype Shiki - Extract Text.
 *
 * Concatenates all text node values found within a hast subtree into
 * a single string for use as the raw code input
 * to the highlighter.
 *
 * @param {LibRehypeShikiExtractTextNode} node - Node.
 *
 * @returns {LibRehypeShikiExtractTextReturns}
 *
 * @since 0.15.0
 */
function extractText(node: LibRehypeShikiExtractTextNode): LibRehypeShikiExtractTextReturns {
  if (node['type'] === 'text') {
    return node['value'] ?? '';
  }

  const parts: LibRehypeShikiExtractTextParts = [];
  const children: LibRehypeShikiExtractTextChildren = node['children'] ?? [];

  for (const child of children) {
    parts.push(extractText(child));
  }

  return parts.join('');
}

/**
 * Lib - Rehype Shiki - Process Magic Comments.
 *
 * Scans code lines for highlight-next-line, highlight-start, and highlight-end directives,
 * stripping them from the output while recording which
 * output lines should be highlighted.
 *
 * @param {LibRehypeShikiProcessMagicCommentsCode} code - Code.
 *
 * @returns {LibRehypeShikiProcessMagicCommentsReturns}
 *
 * @since 0.15.0
 */
function processMagicComments(code: LibRehypeShikiProcessMagicCommentsCode): LibRehypeShikiProcessMagicCommentsReturns {
  const lines: LibRehypeShikiProcessMagicCommentsLines = code.split('\n');
  const outputLines: LibRehypeShikiProcessMagicCommentsOutputLines = [];
  const highlightedLines: LibRehypeShikiProcessMagicCommentsHighlightedLines = [];

  let outputLineNumber: LibRehypeShikiProcessMagicCommentsOutputLineNumber = 0;
  let isHighlightNext: LibRehypeShikiProcessMagicCommentsIsHighlightNext = false;
  let insideHighlightBlock: LibRehypeShikiProcessMagicCommentsInsideHighlightBlock = false;

  for (const line of lines) {
    const trimmedLine: LibRehypeShikiProcessMagicCommentsTrimmedLine = line.trim();

    if (trimmedLine === '// highlight-next-line') {
      isHighlightNext = true;

      continue;
    }

    if (trimmedLine === '// highlight-start') {
      insideHighlightBlock = true;

      continue;
    }

    if (trimmedLine === '// highlight-end') {
      insideHighlightBlock = false;

      continue;
    }

    outputLines.push(line);
    outputLineNumber += 1;

    if (isHighlightNext === true) {
      highlightedLines.push(outputLineNumber);
      isHighlightNext = false;
    }

    if (insideHighlightBlock === true) {
      highlightedLines.push(outputLineNumber);
    }
  }

  return {
    code: outputLines.join('\n'),
    highlightedLines,
  };
}

/**
 * Lib - Rehype Shiki - Parse Line Range.
 *
 * Extracts line numbers from a metastring pattern like {1,3-5} and returns them
 * as a flat array of one-based line numbers for
 * highlight marking.
 *
 * @param {LibRehypeShikiParseLineRangeMetastring} metastring - Metastring.
 *
 * @returns {LibRehypeShikiParseLineRangeReturns}
 *
 * @since 0.15.0
 */
function parseLineRange(metastring: LibRehypeShikiParseLineRangeMetastring): LibRehypeShikiParseLineRangeReturns {
  const result: LibRehypeShikiParseLineRangeResult = [];
  const match: LibRehypeShikiParseLineRangeMatch = metastring.match(LIB_REGEX_METASTRING_LINE_RANGE);

  if (match === null) {
    return result;
  }

  const rangeContent: LibRehypeShikiParseLineRangeRangeContent = match[1];

  if (rangeContent === undefined) {
    return result;
  }

  const parts: LibRehypeShikiParseLineRangeParts = rangeContent.split(',');

  for (const part of parts) {
    const dashIndex: LibRehypeShikiParseLineRangeDashIndex = part.indexOf('-');

    if (dashIndex === -1) {
      const trimmedPart: LibRehypeShikiParseLineRangeTrimmedPart = part.trim();
      const lineNumber: LibRehypeShikiParseLineRangeLineNumber = parseInt(trimmedPart, 10);

      if (Number.isNaN(lineNumber) === false) {
        result.push(lineNumber);
      }
    } else {
      const start: LibRehypeShikiParseLineRangeStart = parseInt(part.slice(0, dashIndex).trim(), 10);
      const end: LibRehypeShikiParseLineRangeEnd = parseInt(part.slice(dashIndex + 1).trim(), 10);

      if (
        Number.isNaN(start) === false
        && Number.isNaN(end) === false
      ) {
        for (let lineNumber = start; lineNumber <= end; lineNumber += 1) {
          result.push(lineNumber);
        }
      }
    }
  }

  return result;
}

/**
 * Lib - Rehype Shiki - Process Diff Lines.
 *
 * Scans lines of a diff-formatted code block and identifies which one-based line
 * numbers represent additions and which represent
 * removals.
 *
 * @param {LibRehypeShikiProcessDiffLinesCode} code - Code.
 *
 * @returns {LibRehypeShikiProcessDiffLinesReturns}
 *
 * @since 0.15.0
 */
function processDiffLines(code: LibRehypeShikiProcessDiffLinesCode): LibRehypeShikiProcessDiffLinesReturns {
  const lines: LibRehypeShikiProcessDiffLinesLines = code.split('\n');
  const addLines: LibRehypeShikiProcessDiffLinesAddLines = [];
  const removeLines: LibRehypeShikiProcessDiffLinesRemoveLines = [];

  for (let i = 0; i < lines.length; i += 1) {
    const firstChar: LibRehypeShikiProcessDiffLinesFirstChar = (lines[i] ?? '').charAt(0);

    if (firstChar === '+') {
      addLines.push(i + 1);
    }

    if (firstChar === '-') {
      removeLines.push(i + 1);
    }
  }

  return {
    addLines,
    removeLines,
  };
}

/**
 * Lib - Rehype Shiki - Process Node.
 *
 * Handles a single pre element node by extracting its code child, determining the language
 * and metastring, processing magic comments and diff annotations, then replacing the
 * original node with Shiki-highlighted raw HTML output.
 *
 * @param {LibRehypeShikiProcessNodeNode}        node        - Node.
 * @param {LibRehypeShikiProcessNodeIndex}       index       - Index.
 * @param {LibRehypeShikiProcessNodeParent}      parent      - Parent.
 * @param {LibRehypeShikiProcessNodeHighlighter} highlighter - Highlighter.
 * @param {LibRehypeShikiProcessNodeOptions}     options     - Options.
 *
 * @since 0.15.0
 */
function processNode(node: LibRehypeShikiProcessNodeNode, index: LibRehypeShikiProcessNodeIndex, parent: LibRehypeShikiProcessNodeParent, highlighter: LibRehypeShikiProcessNodeHighlighter, options: LibRehypeShikiProcessNodeOptions) {
  const codeNode: LibRehypeShikiProcessNodeCodeNode = (node['children'] ?? [])[0];

  if (codeNode === undefined) {
    return;
  }

  if (codeNode['tagName'] !== 'code') {
    return;
  }

  const classNameRaw: LibRehypeShikiProcessNodeClassNameRaw = (codeNode['properties'] ?? {})['className'];
  const classNames: LibRehypeShikiProcessNodeClassNames = (Array.isArray(classNameRaw) === true) ? classNameRaw : [];
  let langClass: LibRehypeShikiProcessNodeLangClass = undefined;

  for (const className of classNames) {
    if (className.startsWith('language-') === true) {
      langClass = className;
    }
  }

  const lang: LibRehypeShikiProcessNodeLang = (langClass !== undefined) ? langClass.replace('language-', '') : 'text';
  const rawText: LibRehypeShikiProcessNodeRawText = extractText(codeNode);
  const metaValue: LibRehypeShikiProcessNodeMetaValue = (codeNode['data'] ?? {})['meta'];
  const metastringValue: LibRehypeShikiProcessNodeMetastringValue = (codeNode['properties'] ?? {})['metastring'];
  const metastring: LibRehypeShikiProcessNodeMetastring = String(
    metaValue
    ?? metastringValue
    ?? '',
  );

  const processed: LibRehypeShikiProcessMagicCommentsReturns = processMagicComments(rawText);
  const processedCode: LibRehypeShikiProcessNodeProcessedCode = processed['code'];

  const highlightedLineNumbers: LibRehypeShikiProcessNodeHighlightedLineNumbers = [
    ...processed['highlightedLines'],
    ...parseLineRange(metastring),
  ];

  let diffAddLineNumbers: LibRehypeShikiProcessNodeDiffAddLineNumbers = [];
  let diffRemoveLineNumbers: LibRehypeShikiProcessNodeDiffRemoveLineNumbers = [];

  if (lang === 'diff') {
    const diffResult: LibRehypeShikiProcessDiffLinesResult = processDiffLines(processedCode);

    diffAddLineNumbers = diffResult['addLines'];
    diffRemoveLineNumbers = diffResult['removeLines'];
  }

  const typedHighlighter: LibRehypeShikiProcessNodeTypedHighlighter = highlighter as LibRehypeShikiProcessNodeTypedHighlighter;

  let highlightedHast: LibRehypeShikiProcessNodeHighlightedHtml = undefined;

  try {
    highlightedHast = typedHighlighter.codeToHast(processedCode, {
      lang,
      themes: {
        light: options['light'],
        dark: options['dark'],
      },
      defaultColor: false,
      transformers: [{
        line(lineNode: LibRehypeShikiProcessNodeLineNode, lineNumber: LibRehypeShikiProcessNodeLineNumber) {
          const lineProperties: LibRehypeShikiProcessNodeLineProperties = lineNode['properties'] ?? {};

          if (highlightedLineNumbers.includes(lineNumber) === true) {
            Reflect.set(lineProperties, 'data-highlighted', 'true');
          }

          if (diffAddLineNumbers.includes(lineNumber) === true) {
            Reflect.set(lineProperties, 'data-diff-add', 'true');
          }

          if (diffRemoveLineNumbers.includes(lineNumber) === true) {
            Reflect.set(lineProperties, 'data-diff-remove', 'true');
          }

          return;
        },
      }],
    });
  } catch {
    return;
  }

  if (highlightedHast === undefined) {
    return;
  }

  const hastRoot: LibRehypeShikiProcessNodeMarkedHtml = highlightedHast as LibRehypeShikiProcessNodeMarkedHtml;
  const hastRootRecord: LibRehypeShikiProcessNodeHastRootRecord = hastRoot as LibRehypeShikiProcessNodeHastRootRecord;
  const hastChildren: LibRehypeShikiProcessNodeHastChildren = (hastRootRecord['children'] ?? []) as LibRehypeShikiProcessNodeHastChildren;
  const preElement: LibRehypeShikiProcessNodeHastPreElement = hastChildren[0] as LibRehypeShikiProcessNodeHastPreElement;

  if (preElement !== undefined) {
    const preProperties: LibRehypeShikiProcessNodeLineProperties = (preElement['properties'] ?? {}) as LibRehypeShikiProcessNodeLineProperties;

    Reflect.set(preProperties, 'data-rehype-shiki', 'true');
  }

  const parentChildren: LibRehypeShikiProcessNodeParentChildren = parent['children'] ?? [];

  Reflect.set(parentChildren, index, preElement ?? {
    type: 'element',
    tagName: 'pre',
    properties: {},
    children: [],
  });

  return;
}

/**
 * Lib - Rehype Shiki - Module Highlighter.
 *
 * Module-scoped singleton Shiki highlighter instance shared across
 * all rehype plugin invocations to avoid creating multiple
 * highlighter instances during concurrent MDX compilation.
 *
 * @since 0.15.0
 */
let moduleHighlighter: LibRehypeShikiModuleHighlighterHighlighter = undefined;
let moduleHighlighterPromise: LibRehypeShikiModuleHighlighterHighlighterPromise = undefined;

/**
 * Lib - Rehype Shiki - Rehype Shiki.
 *
 * Creates a rehype plugin that lazily initializes a Shiki highlighter on first
 * invocation and transforms pre/code AST nodes into
 * syntax-highlighted raw HTML output.
 *
 * @param {LibRehypeShikiRehypeShikiOptions} options - Options.
 *
 * @returns {LibRehypeShikiRehypeShikiReturns}
 *
 * @since 0.15.0
 */
export function rehypeShiki(options: LibRehypeShikiRehypeShikiOptions): LibRehypeShikiRehypeShikiReturns {
  /**
   * Lib - Rehype Shiki - Rehype Shiki - Transformer.
   *
   * Walks the hast tree to find pre elements containing code children, initializes
   * the Shiki highlighter if not yet cached, then delegates
   * each match to processNode for replacement.
   *
   * @param {LibRehypeShikiRehypeShikiTransformerTree} tree - Tree.
   *
   * @returns {LibRehypeShikiRehypeShikiTransformerReturns}
   *
   * @since 0.15.0
   */
  async function transformer(tree: LibRehypeShikiRehypeShikiTransformerTree): LibRehypeShikiRehypeShikiTransformerReturns {
    if (moduleHighlighter === undefined) {
      if (moduleHighlighterPromise === undefined) {
        moduleHighlighterPromise = (async () => {
          const shikiModule: LibRehypeShikiRehypeShikiTransformerShikiModule = await import('shiki') as LibRehypeShikiRehypeShikiTransformerShikiModule;

          moduleHighlighter = await shikiModule.createHighlighter({
            themes: [
              options['light'],
              options['dark'],
            ],
            langs: [],
          });

          return;
        })();
      }

      await moduleHighlighterPromise;
    }

    const nodes: LibRehypeShikiRehypeShikiTransformerNodes = collectNodes(tree, 'pre');

    for (const entry of nodes) {
      const entryCodeNode: LibRehypeShikiProcessNodeCodeNode = ((entry['node']['children'] ?? []) as LibRehypeShikiProcessNodeHastChildren)[0] as LibRehypeShikiProcessNodeCodeNode;

      if (entryCodeNode !== undefined && entryCodeNode['tagName'] === 'code') {
        const entryClassNameRaw: LibRehypeShikiProcessNodeClassNameRaw = (entryCodeNode['properties'] ?? {})['className'];
        const entryClassNames: LibRehypeShikiProcessNodeClassNames = (Array.isArray(entryClassNameRaw) === true) ? entryClassNameRaw : [];
        let entryLang: LibRehypeShikiProcessNodeLang = 'text';

        for (const className of entryClassNames) {
          if (className.startsWith('language-') === true) {
            entryLang = className.replace('language-', '');
          }
        }

        const shikiModule: LibRehypeShikiRehypeShikiTransformerShikiModule = await import('shiki') as LibRehypeShikiRehypeShikiTransformerShikiModule;
        const loadedLanguages: LibRehypeShikiRehypeShikiTransformerLoadedLanguages = (moduleHighlighter as LibRehypeShikiProcessNodeTypedHighlighter).getLoadedLanguages();
        const isLanguageLoaded: LibRehypeShikiRehypeShikiTransformerIsLanguageLoaded = loadedLanguages.includes(entryLang);

        if (isLanguageLoaded === false && shikiModule['bundledLanguages'][entryLang] !== undefined) {
          const languageLoader: LibRehypeShikiRehypeShikiTransformerBundledLanguageLoader = shikiModule['bundledLanguages'][entryLang];

          await (moduleHighlighter as LibRehypeShikiProcessNodeTypedHighlighter).loadLanguage(languageLoader);
        }
      }

      processNode(entry['node'], entry['index'], entry['parent'], moduleHighlighter, options);
    }

    return;
  }

  return transformer;
}
