import { ok } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { rehypeShiki } from '../../lib/rehype-shiki.js';

import type {
  Tests_Lib_RehypeShiki_AddRemoveCode,
  Tests_Lib_RehypeShiki_AddRemoveExcludesAddMarker,
  Tests_Lib_RehypeShiki_AddRemoveExcludesRemoveMarker,
  Tests_Lib_RehypeShiki_AddRemoveIncludesAdd,
  Tests_Lib_RehypeShiki_AddRemoveIncludesRemove,
  Tests_Lib_RehypeShiki_AddRemoveOutputJson,
  Tests_Lib_RehypeShiki_AddRemoveOutputNode,
  Tests_Lib_RehypeShiki_AddRemoveTransformer,
  Tests_Lib_RehypeShiki_AddRemoveTree,
  Tests_Lib_RehypeShiki_DiffCode,
  Tests_Lib_RehypeShiki_DiffIncludesAdd,
  Tests_Lib_RehypeShiki_DiffIncludesRemove,
  Tests_Lib_RehypeShiki_DiffOutputJson,
  Tests_Lib_RehypeShiki_DiffOutputNode,
  Tests_Lib_RehypeShiki_DiffTransformer,
  Tests_Lib_RehypeShiki_DiffTree,
  Tests_Lib_RehypeShiki_IncludesMarker,
  Tests_Lib_RehypeShiki_IncludesShiki,
  Tests_Lib_RehypeShiki_LangIncludesShiki,
  Tests_Lib_RehypeShiki_LangOutputJson,
  Tests_Lib_RehypeShiki_LangOutputNode,
  Tests_Lib_RehypeShiki_LangTransformer,
  Tests_Lib_RehypeShiki_LangTree,
  Tests_Lib_RehypeShiki_MagicCode,
  Tests_Lib_RehypeShiki_MagicExcludesComment,
  Tests_Lib_RehypeShiki_MagicIncludesHighlighted,
  Tests_Lib_RehypeShiki_MagicOutputJson,
  Tests_Lib_RehypeShiki_MagicOutputNode,
  Tests_Lib_RehypeShiki_MagicTransformer,
  Tests_Lib_RehypeShiki_MagicTree,
  Tests_Lib_RehypeShiki_MarkerIncludesAttribute,
  Tests_Lib_RehypeShiki_MarkerOutputJson,
  Tests_Lib_RehypeShiki_MarkerOutputNode,
  Tests_Lib_RehypeShiki_MarkerTransformer,
  Tests_Lib_RehypeShiki_MarkerTree,
  Tests_Lib_RehypeShiki_MetadataIncludesLanguage,
  Tests_Lib_RehypeShiki_MetadataIncludesLive,
  Tests_Lib_RehypeShiki_MetadataIncludesMetastring,
  Tests_Lib_RehypeShiki_MetadataIncludesShowLineNumbers,
  Tests_Lib_RehypeShiki_MetadataIncludesTitle,
  Tests_Lib_RehypeShiki_MetadataOutputJson,
  Tests_Lib_RehypeShiki_MetadataOutputNode,
  Tests_Lib_RehypeShiki_MetadataTransformer,
  Tests_Lib_RehypeShiki_MetadataTree,
  Tests_Lib_RehypeShiki_NoLangIncludesShiki,
  Tests_Lib_RehypeShiki_NoLangOutputJson,
  Tests_Lib_RehypeShiki_NoLangOutputNode,
  Tests_Lib_RehypeShiki_NoLangTransformer,
  Tests_Lib_RehypeShiki_NoLangTree,
  Tests_Lib_RehypeShiki_OutputJson,
  Tests_Lib_RehypeShiki_OutputNode,
  Tests_Lib_RehypeShiki_RangeCode,
  Tests_Lib_RehypeShiki_RangeIncludesHighlighted,
  Tests_Lib_RehypeShiki_RangeOutputJson,
  Tests_Lib_RehypeShiki_RangeOutputNode,
  Tests_Lib_RehypeShiki_RangeTransformer,
  Tests_Lib_RehypeShiki_RangeTree,
  Tests_Lib_RehypeShiki_Transformer,
  Tests_Lib_RehypeShiki_Tree,
} from '../../types/tests/lib/rehype-shiki.test.d.ts';

/**
 * Tests - Lib - Rehype Shiki - Rehype Shiki.
 *
 * @since 0.15.0
 */
describe('rehypeShiki', async () => {
  it('highlights code with shiki classes', async () => {
    const tree: Tests_Lib_RehypeShiki_Tree = {
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

    const transformer: Tests_Lib_RehypeShiki_Transformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_OutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_OutputJson = JSON.stringify(outputNode);
    const includesShiki: Tests_Lib_RehypeShiki_IncludesShiki = outputJson.includes('shiki');
    const includesMarker: Tests_Lib_RehypeShiki_IncludesMarker = outputJson.includes('data-rehype-shiki');

    ok(includesShiki);
    ok(includesMarker);

    return;
  });

  it('extracts language from className', async () => {
    const tree: Tests_Lib_RehypeShiki_LangTree = {
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

    const transformer: Tests_Lib_RehypeShiki_LangTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_LangOutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_LangOutputJson = JSON.stringify(outputNode);
    const includesShiki: Tests_Lib_RehypeShiki_LangIncludesShiki = outputJson.includes('shiki');

    ok(includesShiki);

    return;
  });

  it('handles code blocks without a language class', async () => {
    const tree: Tests_Lib_RehypeShiki_NoLangTree = {
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

    const transformer: Tests_Lib_RehypeShiki_NoLangTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_NoLangOutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_NoLangOutputJson = JSON.stringify(outputNode);
    const includesShiki: Tests_Lib_RehypeShiki_NoLangIncludesShiki = outputJson.includes('shiki');

    ok(includesShiki);

    return;
  });

  it('strips magic comments and marks highlighted lines', async () => {
    const magicCode: Tests_Lib_RehypeShiki_MagicCode = [
      'const a = 1;',
      '// highlight-next-line',
      'const b = 2;',
      'const c = 3;',
    ].join('\n');

    const tree: Tests_Lib_RehypeShiki_MagicTree = {
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

    const transformer: Tests_Lib_RehypeShiki_MagicTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_MagicOutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_MagicOutputJson = JSON.stringify(outputNode);
    const includesHighlighted: Tests_Lib_RehypeShiki_MagicIncludesHighlighted = outputJson.includes('data-highlighted');
    const excludesComment: Tests_Lib_RehypeShiki_MagicExcludesComment = outputJson.includes('highlight-next-line') === false;

    ok(includesHighlighted);
    ok(excludesComment);

    return;
  });

  it('marks lines from metastring line range', async () => {
    const rangeCode: Tests_Lib_RehypeShiki_RangeCode = [
      'const a = 1;',
      'const b = 2;',
      'const c = 3;',
    ].join('\n');

    const tree: Tests_Lib_RehypeShiki_RangeTree = {
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

    const transformer: Tests_Lib_RehypeShiki_RangeTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_RangeOutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_RangeOutputJson = JSON.stringify(outputNode);
    const includesHighlighted: Tests_Lib_RehypeShiki_RangeIncludesHighlighted = outputJson.includes('data-highlighted');

    ok(includesHighlighted);

    return;
  });

  it('marks diff add and remove lines', async () => {
    const diffCode: Tests_Lib_RehypeShiki_DiffCode = [
      '+added line',
      '-removed line',
      ' unchanged line',
    ].join('\n');

    const tree: Tests_Lib_RehypeShiki_DiffTree = {
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

    const transformer: Tests_Lib_RehypeShiki_DiffTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_DiffOutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_DiffOutputJson = JSON.stringify(outputNode);
    const includesAdd: Tests_Lib_RehypeShiki_DiffIncludesAdd = outputJson.includes('data-diff-add');
    const includesRemove: Tests_Lib_RehypeShiki_DiffIncludesRemove = outputJson.includes('data-diff-remove');

    ok(includesAdd);
    ok(includesRemove);

    return;
  });

  it('preserves metastring metadata as data attributes on the output code element', async () => {
    const tree: Tests_Lib_RehypeShiki_MetadataTree = {
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

    const transformer: Tests_Lib_RehypeShiki_MetadataTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_MetadataOutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_MetadataOutputJson = JSON.stringify(outputNode);
    const includesTitle: Tests_Lib_RehypeShiki_MetadataIncludesTitle = outputJson.includes('"data-title":"src/relay/handler.ts"');
    const includesLanguage: Tests_Lib_RehypeShiki_MetadataIncludesLanguage = outputJson.includes('"data-language":"typescript"');
    const includesShowLineNumbers: Tests_Lib_RehypeShiki_MetadataIncludesShowLineNumbers = outputJson.includes('"data-show-line-numbers":"true"');
    const includesLive: Tests_Lib_RehypeShiki_MetadataIncludesLive = outputJson.includes('"data-live":"true"');
    const includesMetastring: Tests_Lib_RehypeShiki_MetadataIncludesMetastring = outputJson.includes('"metastring":"showLineNumbers title=');

    ok(includesTitle);
    ok(includesLanguage);
    ok(includesShowLineNumbers);
    ok(includesLive);
    ok(includesMetastring);

    return;
  });

  it('marks add and remove lines from add-start/remove-start magic comments and strips the markers', async () => {
    const addRemoveCode: Tests_Lib_RehypeShiki_AddRemoveCode = [
      'const a = 1;',
      '// remove-start',
      'const removed = "old";',
      '// remove-end',
      '// add-start',
      'const added = "new";',
      '// add-end',
      'const c = 3;',
    ].join('\n');

    const tree: Tests_Lib_RehypeShiki_AddRemoveTree = {
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

    const transformer: Tests_Lib_RehypeShiki_AddRemoveTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_AddRemoveOutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_AddRemoveOutputJson = JSON.stringify(outputNode);
    const includesAdd: Tests_Lib_RehypeShiki_AddRemoveIncludesAdd = outputJson.includes('data-diff-add');
    const includesRemove: Tests_Lib_RehypeShiki_AddRemoveIncludesRemove = outputJson.includes('data-diff-remove');
    const excludesAddMarker: Tests_Lib_RehypeShiki_AddRemoveExcludesAddMarker = outputJson.includes('add-start') === false && outputJson.includes('add-end') === false;
    const excludesRemoveMarker: Tests_Lib_RehypeShiki_AddRemoveExcludesRemoveMarker = outputJson.includes('remove-start') === false && outputJson.includes('remove-end') === false;

    ok(includesAdd);
    ok(includesRemove);
    ok(excludesAddMarker);
    ok(excludesRemoveMarker);

    return;
  });

  it('adds data-rehype-shiki attribute to output', async () => {
    const tree: Tests_Lib_RehypeShiki_MarkerTree = {
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

    const transformer: Tests_Lib_RehypeShiki_MarkerTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: Tests_Lib_RehypeShiki_MarkerOutputNode = (tree['children'] ?? [])[0];
    const outputJson: Tests_Lib_RehypeShiki_MarkerOutputJson = JSON.stringify(outputNode);
    const includesAttribute: Tests_Lib_RehypeShiki_MarkerIncludesAttribute = outputJson.includes('data-rehype-shiki');

    ok(includesAttribute);

    return;
  });

  return;
});
