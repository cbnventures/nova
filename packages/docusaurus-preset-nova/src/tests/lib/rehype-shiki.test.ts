import { ok } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { rehypeShiki } from '../../lib/rehype-shiki.js';

import type {
  Tests_Lib_RehypeShiki_RehypeShiki_AddsDataRehypeShikiAttributeToOutput_IncludesAttribute,
  Tests_Lib_RehypeShiki_RehypeShiki_AddsDataRehypeShikiAttributeToOutput_OutputJson,
  Tests_Lib_RehypeShiki_RehypeShiki_AddsDataRehypeShikiAttributeToOutput_OutputNode,
  Tests_Lib_RehypeShiki_RehypeShiki_AddsDataRehypeShikiAttributeToOutput_Transformer,
  Tests_Lib_RehypeShiki_RehypeShiki_AddsDataRehypeShikiAttributeToOutput_Tree,
  Tests_Lib_RehypeShiki_RehypeShiki_ExtractsLanguageFromClassName_IncludesShiki,
  Tests_Lib_RehypeShiki_RehypeShiki_ExtractsLanguageFromClassName_OutputJson,
  Tests_Lib_RehypeShiki_RehypeShiki_ExtractsLanguageFromClassName_OutputNode,
  Tests_Lib_RehypeShiki_RehypeShiki_ExtractsLanguageFromClassName_Transformer,
  Tests_Lib_RehypeShiki_RehypeShiki_ExtractsLanguageFromClassName_Tree,
  Tests_Lib_RehypeShiki_RehypeShiki_HandlesCodeBlocksWithoutALanguageClass_IncludesShiki,
  Tests_Lib_RehypeShiki_RehypeShiki_HandlesCodeBlocksWithoutALanguageClass_OutputJson,
  Tests_Lib_RehypeShiki_RehypeShiki_HandlesCodeBlocksWithoutALanguageClass_OutputNode,
  Tests_Lib_RehypeShiki_RehypeShiki_HandlesCodeBlocksWithoutALanguageClass_Transformer,
  Tests_Lib_RehypeShiki_RehypeShiki_HandlesCodeBlocksWithoutALanguageClass_Tree,
  Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_IncludesMarker,
  Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_IncludesShiki,
  Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_OutputJson,
  Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_OutputNode,
  Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_Transformer,
  Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_Tree,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_AddRemoveCode,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_ExcludesAddMarker,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_ExcludesRemoveMarker,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_IncludesAdd,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_IncludesRemove,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_OutputJson,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_OutputNode,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_Transformer,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_Tree,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_DiffCode,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_IncludesAdd,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_IncludesRemove,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_OutputJson,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_OutputNode,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_Transformer,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_Tree,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_IncludesHighlighted,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_OutputJson,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_OutputNode,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_RangeCode,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_Transformer,
  Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_Tree,
  Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_IncludesLanguage,
  Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_IncludesLive,
  Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_IncludesMetastring,
  Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_IncludesShowLineNumbers,
  Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_IncludesTitle,
  Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_OutputJson,
  Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_OutputNode,
  Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_Transformer,
  Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_Tree,
  Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_ExcludesComment,
  Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_IncludesHighlighted,
  Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_MagicCode,
  Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_OutputJson,
  Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_OutputNode,
  Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_Transformer,
  Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_Tree,
} from '../../types/tests/lib/rehype-shiki.test.d.ts';

/**
 * Tests - Lib - Rehype Shiki - Rehype Shiki.
 *
 * @since 0.15.0
 */
describe('rehypeShiki', async () => {
  it('highlights code with shiki classes', async () => {
    const tree: Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_Tree = {
      type: 'root',
      children: [{
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'code',
          properties: {
            className: ['language-typescript'],
          },
          children: [{
            type: 'text',
            value: 'const x: number = 1;',
          }],
        }],
      }],
    };

    const transformer: Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_Transformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_OutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_OutputJson = JSON.stringify(outputNode);
    const includesShiki: Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_IncludesShiki = outputJson.includes('shiki');
    const includesMarker: Tests_Lib_RehypeShiki_RehypeShiki_HighlightsCodeWithShikiClasses_IncludesMarker = outputJson.includes('data-rehype-shiki');

    ok(includesShiki);
    ok(includesMarker);

    return;
  });

  it('extracts language from className', async () => {
    const tree: Tests_Lib_RehypeShiki_RehypeShiki_ExtractsLanguageFromClassName_Tree = {
      type: 'root',
      children: [{
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'code',
          properties: {
            className: ['language-javascript'],
          },
          children: [{
            type: 'text',
            value: 'const y = 2;',
          }],
        }],
      }],
    };

    const transformer: Tests_Lib_RehypeShiki_RehypeShiki_ExtractsLanguageFromClassName_Transformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_RehypeShiki_ExtractsLanguageFromClassName_OutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_RehypeShiki_ExtractsLanguageFromClassName_OutputJson = JSON.stringify(outputNode);
    const includesShiki: Tests_Lib_RehypeShiki_RehypeShiki_ExtractsLanguageFromClassName_IncludesShiki = outputJson.includes('shiki');

    ok(includesShiki);

    return;
  });

  it('handles code blocks without a language class', async () => {
    const tree: Tests_Lib_RehypeShiki_RehypeShiki_HandlesCodeBlocksWithoutALanguageClass_Tree = {
      type: 'root',
      children: [{
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'code',
          properties: {},
          children: [{
            type: 'text',
            value: 'plain text here',
          }],
        }],
      }],
    };

    const transformer: Tests_Lib_RehypeShiki_RehypeShiki_HandlesCodeBlocksWithoutALanguageClass_Transformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_RehypeShiki_HandlesCodeBlocksWithoutALanguageClass_OutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_RehypeShiki_HandlesCodeBlocksWithoutALanguageClass_OutputJson = JSON.stringify(outputNode);
    const includesShiki: Tests_Lib_RehypeShiki_RehypeShiki_HandlesCodeBlocksWithoutALanguageClass_IncludesShiki = outputJson.includes('shiki');

    ok(includesShiki);

    return;
  });

  it('strips magic comments and marks highlighted lines', async () => {
    const magicCode: Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_MagicCode = [
      'const a = 1;',
      '// highlight-next-line',
      'const b = 2;',
      'const c = 3;',
    ].join('\n');

    const tree: Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_Tree = {
      type: 'root',
      children: [{
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'code',
          properties: {
            className: ['language-typescript'],
          },
          children: [{
            type: 'text',
            value: magicCode,
          }],
        }],
      }],
    };

    const transformer: Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_Transformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_OutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_OutputJson = JSON.stringify(outputNode);
    const includesHighlighted: Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_IncludesHighlighted = outputJson.includes('data-highlighted');
    const excludesComment: Tests_Lib_RehypeShiki_RehypeShiki_StripsMagicCommentsAndMarksHighlightedLines_ExcludesComment = outputJson.includes('highlight-next-line') === false;

    ok(includesHighlighted);
    ok(excludesComment);

    return;
  });

  it('marks lines from metastring line range', async () => {
    const rangeCode: Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_RangeCode = [
      'const a = 1;',
      'const b = 2;',
      'const c = 3;',
    ].join('\n');

    const tree: Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_Tree = {
      type: 'root',
      children: [{
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'code',
          properties: {
            className: ['language-typescript'],
            metastring: '{1,3}',
          },
          children: [{
            type: 'text',
            value: rangeCode,
          }],
        }],
      }],
    };

    const transformer: Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_Transformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_OutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_OutputJson = JSON.stringify(outputNode);
    const includesHighlighted: Tests_Lib_RehypeShiki_RehypeShiki_MarksLinesFromMetastringLineRange_IncludesHighlighted = outputJson.includes('data-highlighted');

    ok(includesHighlighted);

    return;
  });

  it('marks diff add and remove lines', async () => {
    const diffCode: Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_DiffCode = [
      '+added line',
      '-removed line',
      ' unchanged line',
    ].join('\n');

    const tree: Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_Tree = {
      type: 'root',
      children: [{
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'code',
          properties: {
            className: ['language-diff'],
          },
          children: [{
            type: 'text',
            value: diffCode,
          }],
        }],
      }],
    };

    const transformer: Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_Transformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_OutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_OutputJson = JSON.stringify(outputNode);
    const includesAdd: Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_IncludesAdd = outputJson.includes('data-diff-add');
    const includesRemove: Tests_Lib_RehypeShiki_RehypeShiki_MarksDiffAddAndRemoveLines_IncludesRemove = outputJson.includes('data-diff-remove');

    ok(includesAdd);
    ok(includesRemove);

    return;
  });

  it('preserves metastring metadata as data attributes on the output code element', async () => {
    const tree: Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_Tree = {
      type: 'root',
      children: [{
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'code',
          properties: {
            className: ['language-typescript'],
            metastring: 'showLineNumbers title="src/relay/handler.ts" live',
          },
          children: [{
            type: 'text',
            value: 'const x = 1;',
          }],
        }],
      }],
    };

    const transformer: Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_Transformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_OutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_OutputJson = JSON.stringify(outputNode);
    const includesTitle: Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_IncludesTitle = outputJson.includes('"data-title":"src/relay/handler.ts"');
    const includesLanguage: Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_IncludesLanguage = outputJson.includes('"data-language":"typescript"');
    const includesShowLineNumbers: Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_IncludesShowLineNumbers = outputJson.includes('"data-show-line-numbers":"true"');
    const includesLive: Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_IncludesLive = outputJson.includes('"data-live":"true"');
    const includesMetastring: Tests_Lib_RehypeShiki_RehypeShiki_PreservesMetastringMetadataAsDataAttributesOnTheOutputCodeElement_IncludesMetastring = outputJson.includes('"metastring":"showLineNumbers title=');

    ok(includesTitle);
    ok(includesLanguage);
    ok(includesShowLineNumbers);
    ok(includesLive);
    ok(includesMetastring);

    return;
  });

  it('marks add and remove lines from add-start/remove-start magic comments and strips the markers', async () => {
    const addRemoveCode: Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_AddRemoveCode = [
      'const a = 1;',
      '// remove-start',
      'const removed = "old";',
      '// remove-end',
      '// add-start',
      'const added = "new";',
      '// add-end',
      'const c = 3;',
    ].join('\n');

    const tree: Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_Tree = {
      type: 'root',
      children: [{
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'code',
          properties: {
            className: ['language-typescript'],
          },
          children: [{
            type: 'text',
            value: addRemoveCode,
          }],
        }],
      }],
    };

    const transformer: Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_Transformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_OutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_OutputJson = JSON.stringify(outputNode);
    const includesAdd: Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_IncludesAdd = outputJson.includes('data-diff-add');
    const includesRemove: Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_IncludesRemove = outputJson.includes('data-diff-remove');
    const excludesAddMarker: Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_ExcludesAddMarker = outputJson.includes('add-start') === false && outputJson.includes('add-end') === false;
    const excludesRemoveMarker: Tests_Lib_RehypeShiki_RehypeShiki_MarksAddAndRemoveLinesFromAddStartRemoveStartMagicCommentsAndStripsTheMarkers_ExcludesRemoveMarker = outputJson.includes('remove-start') === false && outputJson.includes('remove-end') === false;

    ok(includesAdd);
    ok(includesRemove);
    ok(excludesAddMarker);
    ok(excludesRemoveMarker);

    return;
  });

  it('adds data-rehype-shiki attribute to output', async () => {
    const tree: Tests_Lib_RehypeShiki_RehypeShiki_AddsDataRehypeShikiAttributeToOutput_Tree = {
      type: 'root',
      children: [{
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'code',
          properties: {
            className: ['language-typescript'],
          },
          children: [{
            type: 'text',
            value: 'const z = 42;',
          }],
        }],
      }],
    };

    const transformer: Tests_Lib_RehypeShiki_RehypeShiki_AddsDataRehypeShikiAttributeToOutput_Transformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_RehypeShiki_AddsDataRehypeShikiAttributeToOutput_OutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_RehypeShiki_AddsDataRehypeShikiAttributeToOutput_OutputJson = JSON.stringify(outputNode);
    const includesAttribute: Tests_Lib_RehypeShiki_RehypeShiki_AddsDataRehypeShikiAttributeToOutput_IncludesAttribute = outputJson.includes('data-rehype-shiki');

    ok(includesAttribute);

    return;
  });

  return;
});
