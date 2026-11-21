import { deepStrictEqual, strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  getSupportedAttributeFileBundles,
  isSupportedAttributeFileConfigPath,
  mergeAttributeLines,
  renderAttributeFile,
} from '../../lib/attribute-files.js';

/**
 * Tests - Lib - Attribute Files - Attribute Files.
 *
 * @since 0.49.0
 */
describe('attribute files', () => {
  it('accepts only project-relative gitattributes paths', () => {
    strictEqual(isSupportedAttributeFileConfigPath('./packages/docker/.gitattributes'), true);

    strictEqual(isSupportedAttributeFileConfigPath('./.gitattributes'), true);

    strictEqual(isSupportedAttributeFileConfigPath('packages/docker/.gitattributes'), false);

    strictEqual(isSupportedAttributeFileConfigPath('./packages/../.gitattributes'), false);

    strictEqual(isSupportedAttributeFileConfigPath('./packages/docker/.gitignore'), false);

    deepStrictEqual(getSupportedAttributeFileBundles(), ['docker-scripts']);

    return;
  });

  it('puts patterns after the bundle and drops repeated lines', () => {
    strictEqual(renderAttributeFile('./packages/docker/.gitattributes', {
      bundles: ['docker-scripts'],
      patterns: [
        'rootfs/**   text eol=lf',
        '*.sh text eol=lf',
        '*.sh text eol=lf',
      ],
    }), [
      'rootfs/** text eol=lf',
      'project/** text eol=lf',
      'stages/** text eol=lf',
      '*.sh text eol=lf',
      '',
    ].join('\n'));

    return;
  });

  it('refuses a pattern that gives a bundle path other attributes', () => {
    deepStrictEqual(mergeAttributeLines({
      bundles: ['docker-scripts'],
      patterns: ['rootfs/** binary'],
    })['conflicts'], ['The pattern "rootfs/** binary" sets "rootfs/**", which a bundle already sets to "text eol=lf". Remove the pattern, or drop the bundle and list every line as a pattern.']);

    throws(() => renderAttributeFile('./packages/docker/.gitattributes', {
      bundles: ['docker-scripts'],
      patterns: ['rootfs/** binary'],
    }), { message: 'Attribute file "./packages/docker/.gitattributes" cannot be generated. The pattern "rootfs/** binary" sets "rootfs/**", which a bundle already sets to "text eol=lf". Remove the pattern, or drop the bundle and list every line as a pattern.' });

    return;
  });

  return;
});
