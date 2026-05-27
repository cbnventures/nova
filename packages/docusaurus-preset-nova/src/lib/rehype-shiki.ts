import {
  LIB_REGEX_METASTRING_LINE_RANGE,
  LIB_REGEX_METASTRING_LIVE,
  LIB_REGEX_METASTRING_SHOW_LINE_NUMBERS,
  LIB_REGEX_METASTRING_TITLE,
} from './regex.js';

import type {
  Lib_RehypeShiki_CollectNodes_Child,
  Lib_RehypeShiki_CollectNodes_Children,
  Lib_RehypeShiki_CollectNodes_Matches,
  Lib_RehypeShiki_CollectNodes_Returns,
  Lib_RehypeShiki_CollectNodes_TagName,
  Lib_RehypeShiki_CollectNodes_Tree,
  Lib_RehypeShiki_CollectNodes_Walk_Node,
  Lib_RehypeShiki_ExtractText_Children,
  Lib_RehypeShiki_ExtractText_Node,
  Lib_RehypeShiki_ExtractText_Parts,
  Lib_RehypeShiki_ExtractText_Returns,
  Lib_RehypeShiki_ModuleHighlighterHighlighter,
  Lib_RehypeShiki_ModuleHighlighterHighlighterPromise,
  Lib_RehypeShiki_ParseLineRange_DashIndex,
  Lib_RehypeShiki_ParseLineRange_End,
  Lib_RehypeShiki_ParseLineRange_LineNumber,
  Lib_RehypeShiki_ParseLineRange_Match,
  Lib_RehypeShiki_ParseLineRange_Metastring,
  Lib_RehypeShiki_ParseLineRange_Parts,
  Lib_RehypeShiki_ParseLineRange_RangeContent,
  Lib_RehypeShiki_ParseLineRange_Result,
  Lib_RehypeShiki_ParseLineRange_Returns,
  Lib_RehypeShiki_ParseLineRange_Start,
  Lib_RehypeShiki_ParseLineRange_TrimmedPart,
  Lib_RehypeShiki_ProcessDiffLines_AddLines,
  Lib_RehypeShiki_ProcessDiffLines_Code,
  Lib_RehypeShiki_ProcessDiffLines_FirstChar,
  Lib_RehypeShiki_ProcessDiffLines_Lines,
  Lib_RehypeShiki_ProcessDiffLines_RemoveLines,
  Lib_RehypeShiki_ProcessDiffLines_Result,
  Lib_RehypeShiki_ProcessDiffLines_Returns,
  Lib_RehypeShiki_ProcessMagicComments_AddedLines,
  Lib_RehypeShiki_ProcessMagicComments_Code,
  Lib_RehypeShiki_ProcessMagicComments_HighlightedLines,
  Lib_RehypeShiki_ProcessMagicComments_InsideAddBlock,
  Lib_RehypeShiki_ProcessMagicComments_InsideHighlightBlock,
  Lib_RehypeShiki_ProcessMagicComments_InsideRemoveBlock,
  Lib_RehypeShiki_ProcessMagicComments_IsHighlightNext,
  Lib_RehypeShiki_ProcessMagicComments_Lines,
  Lib_RehypeShiki_ProcessMagicComments_OutputLineNumber,
  Lib_RehypeShiki_ProcessMagicComments_OutputLines,
  Lib_RehypeShiki_ProcessMagicComments_RemovedLines,
  Lib_RehypeShiki_ProcessMagicComments_Returns,
  Lib_RehypeShiki_ProcessMagicComments_TrimmedLine,
  Lib_RehypeShiki_ProcessNode_ClassNameRaw,
  Lib_RehypeShiki_ProcessNode_ClassNames,
  Lib_RehypeShiki_ProcessNode_CodeNode,
  Lib_RehypeShiki_ProcessNode_DiffAddLineNumbers,
  Lib_RehypeShiki_ProcessNode_DiffRemoveLineNumbers,
  Lib_RehypeShiki_ProcessNode_HastChildren,
  Lib_RehypeShiki_ProcessNode_HastCodeElement,
  Lib_RehypeShiki_ProcessNode_HastPreChildren,
  Lib_RehypeShiki_ProcessNode_HastPreElement,
  Lib_RehypeShiki_ProcessNode_HastRootRecord,
  Lib_RehypeShiki_ProcessNode_HighlightedHtml,
  Lib_RehypeShiki_ProcessNode_HighlightedLineNumbers,
  Lib_RehypeShiki_ProcessNode_Highlighter,
  Lib_RehypeShiki_ProcessNode_Index,
  Lib_RehypeShiki_ProcessNode_Lang,
  Lib_RehypeShiki_ProcessNode_LangClass,
  Lib_RehypeShiki_ProcessNode_Line_Node,
  Lib_RehypeShiki_ProcessNode_Line_Number,
  Lib_RehypeShiki_ProcessNode_Line_Properties,
  Lib_RehypeShiki_ProcessNode_Live,
  Lib_RehypeShiki_ProcessNode_MarkedHtml,
  Lib_RehypeShiki_ProcessNode_Metastring,
  Lib_RehypeShiki_ProcessNode_MetastringValue,
  Lib_RehypeShiki_ProcessNode_MetaValue,
  Lib_RehypeShiki_ProcessNode_Node,
  Lib_RehypeShiki_ProcessNode_Options,
  Lib_RehypeShiki_ProcessNode_Parent,
  Lib_RehypeShiki_ProcessNode_ParentChildren,
  Lib_RehypeShiki_ProcessNode_ProcessedCode,
  Lib_RehypeShiki_ProcessNode_RawText,
  Lib_RehypeShiki_ProcessNode_ShowLineNumbers,
  Lib_RehypeShiki_ProcessNode_Title,
  Lib_RehypeShiki_ProcessNode_TitleMatch,
  Lib_RehypeShiki_ProcessNode_TypedHighlighter,
  Lib_RehypeShiki_RehypeShiki_Options,
  Lib_RehypeShiki_RehypeShiki_Returns,
  Lib_RehypeShiki_RehypeShiki_Transformer_BundledLanguageLoader,
  Lib_RehypeShiki_RehypeShiki_Transformer_IsLanguageLoaded,
  Lib_RehypeShiki_RehypeShiki_Transformer_LoadedLanguages,
  Lib_RehypeShiki_RehypeShiki_Transformer_Nodes,
  Lib_RehypeShiki_RehypeShiki_Transformer_Returns,
  Lib_RehypeShiki_RehypeShiki_Transformer_ShikiModule,
  Lib_RehypeShiki_RehypeShiki_Transformer_Tree,
} from '../types/lib/rehype-shiki.d.ts';

/**
 * Lib - Rehype Shiki - Collect Nodes.
 *
 * Recursively walks a hast tree and collects all element nodes matching
 * the given tag name along with their parent reference
 * and child index.
 *
 * @param {Lib_RehypeShiki_CollectNodes_Tree}    tree    - Tree.
 * @param {Lib_RehypeShiki_CollectNodes_TagName} tagName - Tag name.
 *
 * @returns {Lib_RehypeShiki_CollectNodes_Returns}
 *
 * @since 0.15.0
 */
function collectNodes(tree: Lib_RehypeShiki_CollectNodes_Tree, tagName: Lib_RehypeShiki_CollectNodes_TagName): Lib_RehypeShiki_CollectNodes_Returns {
  const matches: Lib_RehypeShiki_CollectNodes_Matches = [];

  function walk(node: Lib_RehypeShiki_CollectNodes_Walk_Node) {
    const children: Lib_RehypeShiki_CollectNodes_Children = node['children'] ?? [];

    for (let i = 0; i < children.length; i += 1) {
      const child: Lib_RehypeShiki_CollectNodes_Child = children[i];

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
 * @param {Lib_RehypeShiki_ExtractText_Node} node - Node.
 *
 * @returns {Lib_RehypeShiki_ExtractText_Returns}
 *
 * @since 0.15.0
 */
function extractText(node: Lib_RehypeShiki_ExtractText_Node): Lib_RehypeShiki_ExtractText_Returns {
  if (node['type'] === 'text') {
    return node['value'] ?? '';
  }

  const parts: Lib_RehypeShiki_ExtractText_Parts = [];
  const children: Lib_RehypeShiki_ExtractText_Children = node['children'] ?? [];

  for (const child of children) {
    parts.push(extractText(child));
  }

  return parts.join('');
}

/**
 * Lib - Rehype Shiki - Process Magic Comments.
 *
 * Scans code lines for highlight-next-line, highlight-start/end, add-start/end, and
 * remove-start/end directives, stripping them from the output while recording
 * which output lines should be highlighted, marked as added, or marked as removed.
 *
 * @param {Lib_RehypeShiki_ProcessMagicComments_Code} code - Code.
 *
 * @returns {Lib_RehypeShiki_ProcessMagicComments_Returns}
 *
 * @since 0.15.0
 */
function processMagicComments(code: Lib_RehypeShiki_ProcessMagicComments_Code): Lib_RehypeShiki_ProcessMagicComments_Returns {
  const lines: Lib_RehypeShiki_ProcessMagicComments_Lines = code.split('\n');
  const outputLines: Lib_RehypeShiki_ProcessMagicComments_OutputLines = [];
  const highlightedLines: Lib_RehypeShiki_ProcessMagicComments_HighlightedLines = [];
  const addedLines: Lib_RehypeShiki_ProcessMagicComments_AddedLines = [];
  const removedLines: Lib_RehypeShiki_ProcessMagicComments_RemovedLines = [];

  let outputLineNumber: Lib_RehypeShiki_ProcessMagicComments_OutputLineNumber = 0;
  let isHighlightNext: Lib_RehypeShiki_ProcessMagicComments_IsHighlightNext = false;
  let insideHighlightBlock: Lib_RehypeShiki_ProcessMagicComments_InsideHighlightBlock = false;
  let insideAddBlock: Lib_RehypeShiki_ProcessMagicComments_InsideAddBlock = false;
  let insideRemoveBlock: Lib_RehypeShiki_ProcessMagicComments_InsideRemoveBlock = false;

  for (const line of lines) {
    const trimmedLine: Lib_RehypeShiki_ProcessMagicComments_TrimmedLine = line.trim();

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

    if (trimmedLine === '// add-start') {
      insideAddBlock = true;

      continue;
    }

    if (trimmedLine === '// add-end') {
      insideAddBlock = false;

      continue;
    }

    if (trimmedLine === '// remove-start') {
      insideRemoveBlock = true;

      continue;
    }

    if (trimmedLine === '// remove-end') {
      insideRemoveBlock = false;

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

    if (insideAddBlock === true) {
      addedLines.push(outputLineNumber);
    }

    if (insideRemoveBlock === true) {
      removedLines.push(outputLineNumber);
    }
  }

  return {
    code: outputLines.join('\n'),
    highlightedLines,
    addedLines,
    removedLines,
  };
}

/**
 * Lib - Rehype Shiki - Parse Line Range.
 *
 * Extracts line numbers from a metastring pattern like {1,3-5} and returns them
 * as a flat array of one-based line numbers for
 * highlight marking.
 *
 * @param {Lib_RehypeShiki_ParseLineRange_Metastring} metastring - Metastring.
 *
 * @returns {Lib_RehypeShiki_ParseLineRange_Returns}
 *
 * @since 0.15.0
 */
function parseLineRange(metastring: Lib_RehypeShiki_ParseLineRange_Metastring): Lib_RehypeShiki_ParseLineRange_Returns {
  const result: Lib_RehypeShiki_ParseLineRange_Result = [];
  const match: Lib_RehypeShiki_ParseLineRange_Match = metastring.match(LIB_REGEX_METASTRING_LINE_RANGE);

  if (match === null) {
    return result;
  }

  const rangeContent: Lib_RehypeShiki_ParseLineRange_RangeContent = match[1];

  if (rangeContent === undefined) {
    return result;
  }

  const parts: Lib_RehypeShiki_ParseLineRange_Parts = rangeContent.split(',');

  for (const part of parts) {
    const dashIndex: Lib_RehypeShiki_ParseLineRange_DashIndex = part.indexOf('-');

    if (dashIndex === -1) {
      const trimmedPart: Lib_RehypeShiki_ParseLineRange_TrimmedPart = part.trim();
      const lineNumber: Lib_RehypeShiki_ParseLineRange_LineNumber = parseInt(trimmedPart, 10);

      if (Number.isNaN(lineNumber) === false) {
        result.push(lineNumber);
      }
    } else {
      const start: Lib_RehypeShiki_ParseLineRange_Start = parseInt(part.slice(0, dashIndex).trim(), 10);
      const end: Lib_RehypeShiki_ParseLineRange_End = parseInt(part.slice(dashIndex + 1).trim(), 10);

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
 * @param {Lib_RehypeShiki_ProcessDiffLines_Code} code - Code.
 *
 * @returns {Lib_RehypeShiki_ProcessDiffLines_Returns}
 *
 * @since 0.15.0
 */
function processDiffLines(code: Lib_RehypeShiki_ProcessDiffLines_Code): Lib_RehypeShiki_ProcessDiffLines_Returns {
  const lines: Lib_RehypeShiki_ProcessDiffLines_Lines = code.split('\n');
  const addLines: Lib_RehypeShiki_ProcessDiffLines_AddLines = [];
  const removeLines: Lib_RehypeShiki_ProcessDiffLines_RemoveLines = [];

  for (let i = 0; i < lines.length; i += 1) {
    const firstChar: Lib_RehypeShiki_ProcessDiffLines_FirstChar = (lines[i] ?? '').charAt(0);

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
 * @param {Lib_RehypeShiki_ProcessNode_Node}        node        - Node.
 * @param {Lib_RehypeShiki_ProcessNode_Index}       index       - Index.
 * @param {Lib_RehypeShiki_ProcessNode_Parent}      parent      - Parent.
 * @param {Lib_RehypeShiki_ProcessNode_Highlighter} highlighter - Highlighter.
 * @param {Lib_RehypeShiki_ProcessNode_Options}     options     - Options.
 *
 * @since 0.15.0
 */
function processNode(node: Lib_RehypeShiki_ProcessNode_Node, index: Lib_RehypeShiki_ProcessNode_Index, parent: Lib_RehypeShiki_ProcessNode_Parent, highlighter: Lib_RehypeShiki_ProcessNode_Highlighter, options: Lib_RehypeShiki_ProcessNode_Options) {
  const codeNode: Lib_RehypeShiki_ProcessNode_CodeNode = (node['children'] ?? [])[0];

  if (codeNode === undefined) {
    return;
  }

  if (codeNode['tagName'] !== 'code') {
    return;
  }

  const classNameRaw: Lib_RehypeShiki_ProcessNode_ClassNameRaw = (codeNode['properties'] ?? {})['className'];
  const classNames: Lib_RehypeShiki_ProcessNode_ClassNames = (Array.isArray(classNameRaw) === true) ? classNameRaw : [];
  let langClass: Lib_RehypeShiki_ProcessNode_LangClass = undefined;

  for (const className of classNames) {
    if (className.startsWith('language-') === true) {
      langClass = className;
    }
  }

  const lang: Lib_RehypeShiki_ProcessNode_Lang = (langClass !== undefined) ? langClass.replace('language-', '') : 'text';
  const rawText: Lib_RehypeShiki_ProcessNode_RawText = extractText(codeNode);
  const metaValue: Lib_RehypeShiki_ProcessNode_MetaValue = (codeNode['data'] ?? {})['meta'];
  const metastringValue: Lib_RehypeShiki_ProcessNode_MetastringValue = (codeNode['properties'] ?? {})['metastring'];
  const metastring: Lib_RehypeShiki_ProcessNode_Metastring = String(
    metaValue
    ?? metastringValue
    ?? '',
  );

  const processed: Lib_RehypeShiki_ProcessMagicComments_Returns = processMagicComments(rawText);
  const processedCode: Lib_RehypeShiki_ProcessNode_ProcessedCode = processed['code'];

  const highlightedLineNumbers: Lib_RehypeShiki_ProcessNode_HighlightedLineNumbers = [
    ...processed['highlightedLines'],
    ...parseLineRange(metastring),
  ];

  let diffAddLineNumbers: Lib_RehypeShiki_ProcessNode_DiffAddLineNumbers = [...processed['addedLines']];
  let diffRemoveLineNumbers: Lib_RehypeShiki_ProcessNode_DiffRemoveLineNumbers = [...processed['removedLines']];

  if (lang === 'diff') {
    const diffResult: Lib_RehypeShiki_ProcessDiffLines_Result = processDiffLines(processedCode);

    diffAddLineNumbers = [
      ...diffAddLineNumbers,
      ...diffResult['addLines'],
    ];
    diffRemoveLineNumbers = [
      ...diffRemoveLineNumbers,
      ...diffResult['removeLines'],
    ];
  }

  const typedHighlighter: Lib_RehypeShiki_ProcessNode_TypedHighlighter = highlighter as Lib_RehypeShiki_ProcessNode_TypedHighlighter;

  let highlightedHast: Lib_RehypeShiki_ProcessNode_HighlightedHtml = undefined;

  try {
    highlightedHast = typedHighlighter.codeToHast(processedCode, {
      lang,
      themes: {
        light: options['light'],
        dark: options['dark'],
      },
      defaultColor: false,
      transformers: [{
        line(lineNode: Lib_RehypeShiki_ProcessNode_Line_Node, lineNumber: Lib_RehypeShiki_ProcessNode_Line_Number) {
          const lineProperties: Lib_RehypeShiki_ProcessNode_Line_Properties = lineNode['properties'] ?? {};

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

  const hastRoot: Lib_RehypeShiki_ProcessNode_MarkedHtml = highlightedHast as Lib_RehypeShiki_ProcessNode_MarkedHtml;
  const hastRootRecord: Lib_RehypeShiki_ProcessNode_HastRootRecord = hastRoot as Lib_RehypeShiki_ProcessNode_HastRootRecord;
  const hastChildren: Lib_RehypeShiki_ProcessNode_HastChildren = (hastRootRecord['children'] ?? []) as Lib_RehypeShiki_ProcessNode_HastChildren;
  const preElement: Lib_RehypeShiki_ProcessNode_HastPreElement = hastChildren[0] as Lib_RehypeShiki_ProcessNode_HastPreElement;

  if (preElement !== undefined) {
    const preProperties: Lib_RehypeShiki_ProcessNode_Line_Properties = (preElement['properties'] ?? {}) as Lib_RehypeShiki_ProcessNode_Line_Properties;

    Reflect.set(preProperties, 'data-rehype-shiki', 'true');

    const preChildren: Lib_RehypeShiki_ProcessNode_HastPreChildren = (preElement['children'] ?? []) as Lib_RehypeShiki_ProcessNode_HastPreChildren;
    const innerCode: Lib_RehypeShiki_ProcessNode_HastCodeElement = preChildren[0] as Lib_RehypeShiki_ProcessNode_HastCodeElement;

    if (
      innerCode !== undefined
      && innerCode['type'] === 'element'
      && innerCode['tagName'] === 'code'
    ) {
      const innerCodeProperties: Lib_RehypeShiki_ProcessNode_Line_Properties = (innerCode['properties'] ?? {}) as Lib_RehypeShiki_ProcessNode_Line_Properties;

      Reflect.set(innerCodeProperties, 'data-language', lang);

      if (metastring !== '') {
        Reflect.set(innerCodeProperties, 'metastring', metastring);

        const titleMatch: Lib_RehypeShiki_ProcessNode_TitleMatch = metastring.match(LIB_REGEX_METASTRING_TITLE);
        const titleDoubleQuoted: Lib_RehypeShiki_ProcessNode_Title = (titleMatch !== null) ? titleMatch[1] : undefined;
        const titleSingleQuoted: Lib_RehypeShiki_ProcessNode_Title = (titleMatch !== null) ? titleMatch[2] : undefined;
        const title: Lib_RehypeShiki_ProcessNode_Title = titleDoubleQuoted ?? titleSingleQuoted;

        if (title !== undefined) {
          Reflect.set(innerCodeProperties, 'data-title', title);
        }

        const showLineNumbers: Lib_RehypeShiki_ProcessNode_ShowLineNumbers = LIB_REGEX_METASTRING_SHOW_LINE_NUMBERS.test(metastring);

        if (showLineNumbers === true) {
          Reflect.set(innerCodeProperties, 'data-show-line-numbers', 'true');
        }

        const live: Lib_RehypeShiki_ProcessNode_Live = LIB_REGEX_METASTRING_LIVE.test(metastring);

        if (live === true) {
          Reflect.set(innerCodeProperties, 'data-live', 'true');
        }
      }

      Reflect.set(innerCode, 'properties', innerCodeProperties);
    }
  }

  const parentChildren: Lib_RehypeShiki_ProcessNode_ParentChildren = parent['children'] ?? [];

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
let moduleHighlighter: Lib_RehypeShiki_ModuleHighlighterHighlighter = undefined;
let moduleHighlighterPromise: Lib_RehypeShiki_ModuleHighlighterHighlighterPromise = undefined;

/**
 * Lib - Rehype Shiki - Rehype Shiki.
 *
 * Creates a rehype plugin that lazily initializes a Shiki highlighter on first
 * invocation and transforms pre/code AST nodes into
 * syntax-highlighted raw HTML output.
 *
 * @param {Lib_RehypeShiki_RehypeShiki_Options} options - Options.
 *
 * @returns {Lib_RehypeShiki_RehypeShiki_Returns}
 *
 * @since 0.15.0
 */
export function rehypeShiki(options: Lib_RehypeShiki_RehypeShiki_Options): Lib_RehypeShiki_RehypeShiki_Returns {
  /**
   * Lib - Rehype Shiki - Rehype Shiki - Transformer.
   *
   * Walks the hast tree to find pre elements containing code children, initializes
   * the Shiki highlighter if not yet cached, then delegates
   * each match to processNode for replacement.
   *
   * @param {Lib_RehypeShiki_RehypeShiki_Transformer_Tree} tree - Tree.
   *
   * @returns {Lib_RehypeShiki_RehypeShiki_Transformer_Returns}
   *
   * @since 0.15.0
   */
  async function transformer(tree: Lib_RehypeShiki_RehypeShiki_Transformer_Tree): Lib_RehypeShiki_RehypeShiki_Transformer_Returns {
    if (moduleHighlighter === undefined) {
      if (moduleHighlighterPromise === undefined) {
        moduleHighlighterPromise = (async () => {
          const shikiModule: Lib_RehypeShiki_RehypeShiki_Transformer_ShikiModule = await import('shiki') as Lib_RehypeShiki_RehypeShiki_Transformer_ShikiModule;

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

    const nodes: Lib_RehypeShiki_RehypeShiki_Transformer_Nodes = collectNodes(tree, 'pre');

    for (const entry of nodes) {
      const entryCodeNode: Lib_RehypeShiki_ProcessNode_CodeNode = ((entry['node']['children'] ?? []) as Lib_RehypeShiki_ProcessNode_HastChildren)[0] as Lib_RehypeShiki_ProcessNode_CodeNode;

      if (entryCodeNode !== undefined && entryCodeNode['tagName'] === 'code') {
        const entryClassNameRaw: Lib_RehypeShiki_ProcessNode_ClassNameRaw = (entryCodeNode['properties'] ?? {})['className'];
        const entryClassNames: Lib_RehypeShiki_ProcessNode_ClassNames = (Array.isArray(entryClassNameRaw) === true) ? entryClassNameRaw : [];
        let entryLang: Lib_RehypeShiki_ProcessNode_Lang = 'text';

        for (const className of entryClassNames) {
          if (className.startsWith('language-') === true) {
            entryLang = className.replace('language-', '');
          }
        }

        const shikiModule: Lib_RehypeShiki_RehypeShiki_Transformer_ShikiModule = await import('shiki') as Lib_RehypeShiki_RehypeShiki_Transformer_ShikiModule;
        const loadedLanguages: Lib_RehypeShiki_RehypeShiki_Transformer_LoadedLanguages = (moduleHighlighter as Lib_RehypeShiki_ProcessNode_TypedHighlighter).getLoadedLanguages();
        const isLanguageLoaded: Lib_RehypeShiki_RehypeShiki_Transformer_IsLanguageLoaded = loadedLanguages.includes(entryLang);

        if (isLanguageLoaded === false && shikiModule['bundledLanguages'][entryLang] !== undefined) {
          const languageLoader: Lib_RehypeShiki_RehypeShiki_Transformer_BundledLanguageLoader = shikiModule['bundledLanguages'][entryLang];

          await (moduleHighlighter as Lib_RehypeShiki_ProcessNode_TypedHighlighter).loadLanguage(languageLoader);
        }
      }

      processNode(entry['node'], entry['index'], entry['parent'], moduleHighlighter, options);
    }

    return;
  }

  return transformer;
}
