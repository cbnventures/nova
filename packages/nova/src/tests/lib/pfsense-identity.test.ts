import { ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  escapePhpSingleQuoted,
  formatPfsenseInfoDescription,
  replacePfsenseAboutDescription,
  replacePfsenseInfoDescription,
  replacePfsenseMakefileVariable,
  resolvePfsenseMaintainer,
  wrapPfsensePackageDescription,
} from '../../lib/pfsense-identity.js';

import type {
  Tests_Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_EscapesTheValueTheSameWayTheScaffoldDoes_About,
  Tests_Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_RewritesOnlyTheCdataText_Info,
  Tests_Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_KeepsTheOperatorAndSeparator_Makefile,
  Tests_Lib_PfsenseIdentity_ResolvePfsenseMaintainer_ReturnsTheFirstAuthorEmail_Maintainer,
  Tests_Lib_PfsenseIdentity_WrapPfsensePackageDescription_WrapsAt80ColumnsAndKeepsParagraphs_Source,
  Tests_Lib_PfsenseIdentity_WrapPfsensePackageDescription_WrapsAt80ColumnsAndKeepsParagraphs_Wrapped,
} from '../../types/tests/lib/pfsense-identity.test.d.ts';

/**
 * Tests - Lib - Pfsense Identity - Wrap Pfsense Package Description.
 *
 * @since 0.49.0
 */
describe('wrapPfsensePackageDescription', () => {
  it('wraps at 80 columns and keeps paragraphs', () => {
    const source: Tests_Lib_PfsenseIdentity_WrapPfsensePackageDescription_WrapsAt80ColumnsAndKeepsParagraphs_Source = [
      'word '.repeat(40),
      '',
      'Second   paragraph',
      'keeps flowing.',
    ].join('\n');
    const wrapped: Tests_Lib_PfsenseIdentity_WrapPfsensePackageDescription_WrapsAt80ColumnsAndKeepsParagraphs_Wrapped = wrapPfsensePackageDescription(source) ?? '';

    ok(wrapped.endsWith('Second paragraph keeps flowing.\n'));
    ok(wrapped.split('\n').every((wrappedLine) => wrappedLine.length <= 80));
    strictEqual(wrapped.split('\n').filter((wrappedLine) => wrappedLine === '').length, 2);
    strictEqual(wrapPfsensePackageDescription(undefined), undefined);
    strictEqual(wrapPfsensePackageDescription('   '), undefined);

    return;
  });

  return;
});

/**
 * Tests - Lib - Pfsense Identity - Replace Pfsense Makefile Variable.
 *
 * @since 0.49.0
 */
describe('replacePfsenseMakefileVariable', () => {
  it('keeps the operator and separator', () => {
    const makefile: Tests_Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_KeepsTheOperatorAndSeparator_Makefile = [
      'MAINTAINER?=\told@example.com',
      'COMMENT=  Old comment',
      'COMMENTS=\tunrelated',
      '',
    ].join('\n');

    strictEqual(replacePfsenseMakefileVariable(makefile, 'MAINTAINER', 'new@example.com'), makefile.replace('old@example.com', 'new@example.com'));
    strictEqual(replacePfsenseMakefileVariable(makefile, 'COMMENT', 'New comment'), makefile.replace('Old comment', 'New comment'));
    strictEqual(replacePfsenseMakefileVariable(makefile, 'WWW', 'https://example.com'), undefined);

    return;
  });

  return;
});

/**
 * Tests - Lib - Pfsense Identity - Replace Pfsense Info Description.
 *
 * @since 0.49.0
 */
describe('replacePfsenseInfoDescription', () => {
  it('rewrites only the cdata text', () => {
    const info: Tests_Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_RewritesOnlyTheCdataText_Info = '<name>Firewall</name><descr><![CDATA[Old.]]></descr><version>1</version>';

    strictEqual(replacePfsenseInfoDescription(info, 'New.'), info.replace('Old.', 'New.'));
    strictEqual(replacePfsenseInfoDescription(info, 'A ]]> B.'), info.replace('Old.', 'A ]]]]><![CDATA[> B.'));
    strictEqual(replacePfsenseInfoDescription('<descr>Old</descr>', 'New.'), undefined);
    strictEqual(formatPfsenseInfoDescription('No period'), 'No period.');
    strictEqual(formatPfsenseInfoDescription('Has period.'), 'Has period.');

    return;
  });

  return;
});

/**
 * Tests - Lib - Pfsense Identity - Replace Pfsense About Description.
 *
 * @since 0.49.0
 */
describe('replacePfsenseAboutDescription', () => {
  it('escapes the value the same way the scaffold does', () => {
    const about: Tests_Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_EscapesTheValueTheSameWayTheScaffoldDoes_About = [
      '<?php',
      '    $projectDescription = \'Old\';',
      '$projectBugs = \'\';',
      '',
    ].join('\n');

    strictEqual(replacePfsenseAboutDescription(about, 'Owner\'s \\ tool'), about.replace('\'Old\'', `'${escapePhpSingleQuoted('Owner\'s \\ tool')}'`));
    strictEqual(escapePhpSingleQuoted('Owner\'s \\ tool'), 'Owner\\\'s \\\\ tool');
    strictEqual(replacePfsenseAboutDescription('<?php', 'New'), undefined);

    return;
  });

  return;
});

/**
 * Tests - Lib - Pfsense Identity - Resolve Pfsense Maintainer.
 *
 * @since 0.49.0
 */
describe('resolvePfsenseMaintainer', () => {
  it('returns the first author email', () => {
    const maintainer: Tests_Lib_PfsenseIdentity_ResolvePfsenseMaintainer_ReturnsTheFirstAuthorEmail_Maintainer = resolvePfsenseMaintainer([
      {
        name: 'No Email',
        roles: ['author'],
      },
      {
        name: 'Jane Doe',
        email: ' jane@example.com ',
        roles: ['author'],
      },
    ]);

    strictEqual(maintainer, 'jane@example.com');
    strictEqual(resolvePfsenseMaintainer([]), undefined);

    return;
  });

  return;
});
