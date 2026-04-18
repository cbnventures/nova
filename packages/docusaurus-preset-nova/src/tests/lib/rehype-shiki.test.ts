import { ok } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { rehypeShiki } from '../../lib/rehype-shiki.js';

import type {
  TestsLibRehypeShikiDiffCode,
  TestsLibRehypeShikiDiffIncludesAdd,
  TestsLibRehypeShikiDiffIncludesRemove,
  TestsLibRehypeShikiDiffOutputJson,
  TestsLibRehypeShikiDiffOutputNode,
  TestsLibRehypeShikiDiffTransformer,
  TestsLibRehypeShikiDiffTree,
  TestsLibRehypeShikiIncludesMarker,
  TestsLibRehypeShikiIncludesShiki,
  TestsLibRehypeShikiLangIncludesShiki,
  TestsLibRehypeShikiLangOutputJson,
  TestsLibRehypeShikiLangOutputNode,
  TestsLibRehypeShikiLangTransformer,
  TestsLibRehypeShikiLangTree,
  TestsLibRehypeShikiMagicCode,
  TestsLibRehypeShikiMagicExcludesComment,
  TestsLibRehypeShikiMagicIncludesHighlighted,
  TestsLibRehypeShikiMagicOutputJson,
  TestsLibRehypeShikiMagicOutputNode,
  TestsLibRehypeShikiMagicTransformer,
  TestsLibRehypeShikiMagicTree,
  TestsLibRehypeShikiMarkerIncludesAttribute,
  TestsLibRehypeShikiMarkerOutputJson,
  TestsLibRehypeShikiMarkerOutputNode,
  TestsLibRehypeShikiMarkerTransformer,
  TestsLibRehypeShikiMarkerTree,
  TestsLibRehypeShikiNoLangIncludesShiki,
  TestsLibRehypeShikiNoLangOutputJson,
  TestsLibRehypeShikiNoLangOutputNode,
  TestsLibRehypeShikiNoLangTransformer,
  TestsLibRehypeShikiNoLangTree,
  TestsLibRehypeShikiOutputJson,
  TestsLibRehypeShikiOutputNode,
  TestsLibRehypeShikiRangeCode,
  TestsLibRehypeShikiRangeIncludesHighlighted,
  TestsLibRehypeShikiRangeOutputJson,
  TestsLibRehypeShikiRangeOutputNode,
  TestsLibRehypeShikiRangeTransformer,
  TestsLibRehypeShikiRangeTree,
  TestsLibRehypeShikiTransformer,
  TestsLibRehypeShikiTree,
} from '../../types/tests/lib/rehype-shiki.test.d.ts';

/**
 * Tests - Lib - Rehype Shiki - Rehype Shiki.
 *
 * @since 0.15.0
 */
describe('rehypeShiki', async () => {
  it('highlights code with shiki classes', async () => {
    const tree: TestsLibRehypeShikiTree = {
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

    const transformer: TestsLibRehypeShikiTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: TestsLibRehypeShikiOutputNode = (tree['children'] ?? [])[0];
    const outputJson: TestsLibRehypeShikiOutputJson = JSON.stringify(outputNode);
    const includesShiki: TestsLibRehypeShikiIncludesShiki = outputJson.includes('shiki');
    const includesMarker: TestsLibRehypeShikiIncludesMarker = outputJson.includes('data-rehype-shiki');

    ok(includesShiki);
    ok(includesMarker);

    return;
  });

  it('extracts language from className', async () => {
    const tree: TestsLibRehypeShikiLangTree = {
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

    const transformer: TestsLibRehypeShikiLangTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: TestsLibRehypeShikiLangOutputNode = (tree['children'] ?? [])[0];
    const outputJson: TestsLibRehypeShikiLangOutputJson = JSON.stringify(outputNode);
    const includesShiki: TestsLibRehypeShikiLangIncludesShiki = outputJson.includes('shiki');

    ok(includesShiki);

    return;
  });

  it('handles code blocks without a language class', async () => {
    const tree: TestsLibRehypeShikiNoLangTree = {
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

    const transformer: TestsLibRehypeShikiNoLangTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: TestsLibRehypeShikiNoLangOutputNode = (tree['children'] ?? [])[0];
    const outputJson: TestsLibRehypeShikiNoLangOutputJson = JSON.stringify(outputNode);
    const includesShiki: TestsLibRehypeShikiNoLangIncludesShiki = outputJson.includes('shiki');

    ok(includesShiki);

    return;
  });

  it('strips magic comments and marks highlighted lines', async () => {
    const magicCode: TestsLibRehypeShikiMagicCode = [
      'const a = 1;',
      '// highlight-next-line',
      'const b = 2;',
      'const c = 3;',
    ].join('\n');

    const tree: TestsLibRehypeShikiMagicTree = {
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

    const transformer: TestsLibRehypeShikiMagicTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: TestsLibRehypeShikiMagicOutputNode = (tree['children'] ?? [])[0];
    const outputJson: TestsLibRehypeShikiMagicOutputJson = JSON.stringify(outputNode);
    const includesHighlighted: TestsLibRehypeShikiMagicIncludesHighlighted = outputJson.includes('data-highlighted');
    const excludesComment: TestsLibRehypeShikiMagicExcludesComment = outputJson.includes('highlight-next-line') === false;

    ok(includesHighlighted);
    ok(excludesComment);

    return;
  });

  it('marks lines from metastring line range', async () => {
    const rangeCode: TestsLibRehypeShikiRangeCode = [
      'const a = 1;',
      'const b = 2;',
      'const c = 3;',
    ].join('\n');

    const tree: TestsLibRehypeShikiRangeTree = {
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

    const transformer: TestsLibRehypeShikiRangeTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: TestsLibRehypeShikiRangeOutputNode = (tree['children'] ?? [])[0];
    const outputJson: TestsLibRehypeShikiRangeOutputJson = JSON.stringify(outputNode);
    const includesHighlighted: TestsLibRehypeShikiRangeIncludesHighlighted = outputJson.includes('data-highlighted');

    ok(includesHighlighted);

    return;
  });

  it('marks diff add and remove lines', async () => {
    const diffCode: TestsLibRehypeShikiDiffCode = [
      '+added line',
      '-removed line',
      ' unchanged line',
    ].join('\n');

    const tree: TestsLibRehypeShikiDiffTree = {
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

    const transformer: TestsLibRehypeShikiDiffTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: TestsLibRehypeShikiDiffOutputNode = (tree['children'] ?? [])[0];
    const outputJson: TestsLibRehypeShikiDiffOutputJson = JSON.stringify(outputNode);
    const includesAdd: TestsLibRehypeShikiDiffIncludesAdd = outputJson.includes('data-diff-add');
    const includesRemove: TestsLibRehypeShikiDiffIncludesRemove = outputJson.includes('data-diff-remove');

    ok(includesAdd);
    ok(includesRemove);

    return;
  });

  it('adds data-rehype-shiki attribute to output', async () => {
    const tree: TestsLibRehypeShikiMarkerTree = {
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

    const transformer: TestsLibRehypeShikiMarkerTransformer = rehypeShiki({
      light: 'github-light',
      dark: 'github-dark',
    });

    await transformer(tree);

    const outputNode: TestsLibRehypeShikiMarkerOutputNode = (tree['children'] ?? [])[0];
    const outputJson: TestsLibRehypeShikiMarkerOutputJson = JSON.stringify(outputNode);
    const includesAttribute: TestsLibRehypeShikiMarkerIncludesAttribute = outputJson.includes('data-rehype-shiki');

    ok(includesAttribute);

    return;
  });

  return;
});
