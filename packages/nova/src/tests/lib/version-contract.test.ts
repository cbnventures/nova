import { strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as LibVersionContract } from '../../lib/version-contract.js';

import type {
  Tests_Lib_VersionContract_CalverDate,
  Tests_Lib_VersionContract_CalverInitialCases,
  Tests_Lib_VersionContract_CalverNextCases,
  Tests_Lib_VersionContract_InvalidCases,
  Tests_Lib_VersionContract_SemverInitialCases,
  Tests_Lib_VersionContract_SemverNextCases,
  Tests_Lib_VersionContract_UtcBoundaryDate,
} from '../../types/tests/lib/version-contract.test.d.ts';

/**
 * Tests - Lib - Version Contract - Version Contract Behavior Matrix.
 *
 * @since 0.34.0
 */
describe('version contract behavior matrix', () => {
  const calverDate: Tests_Lib_VersionContract_CalverDate = new Date('2026-10-20T12:00:00.000Z');

  it('resolves policy-aware initial versions for both strategies', () => {
    const semverInitialCases: Tests_Lib_VersionContract_SemverInitialCases = [
      [
        'freezable',
        '0.0.0',
      ],
      [
        'trackable',
        '0.0.1',
      ],
      [
        'distributable',
        '0.0.1',
      ],
    ];
    const calverInitialCases: Tests_Lib_VersionContract_CalverInitialCases = [
      [
        'freezable',
        '0.0.0',
      ],
      [
        'trackable',
        '2026.10.0',
      ],
      [
        'distributable',
        '2026.10.0',
      ],
    ];

    for (const initialCase of semverInitialCases) {
      strictEqual(LibVersionContract.getInitialVersion(initialCase[0], 'semver', calverDate), initialCase[1]);
    }

    for (const initialCase of calverInitialCases) {
      strictEqual(LibVersionContract.getInitialVersion(initialCase[0], 'calver', calverDate), initialCase[1]);
    }

    return;
  });

  it('advances releases according to strategy and release history', () => {
    const semverNextCases: Tests_Lib_VersionContract_SemverNextCases = [
      [
        '1.2.3',
        'patch',
        '1.2.4',
      ],
      [
        '1.2.3',
        'minor',
        '1.3.0',
      ],
      [
        '1.2.3',
        'major',
        '2.0.0',
      ],
    ];
    const calverNextCases: Tests_Lib_VersionContract_CalverNextCases = [
      [
        '2026.10.0',
        false,
        '2026.10.0',
      ],
      [
        '2026.10.0',
        true,
        '2026.10.1',
      ],
      [
        '2026.9.12',
        true,
        '2026.10.0',
      ],
    ];

    for (const nextCase of semverNextCases) {
      strictEqual(LibVersionContract.getNextVersion(nextCase[0], 'semver', nextCase[1], true, calverDate), nextCase[2]);
    }

    for (const nextCase of calverNextCases) {
      strictEqual(LibVersionContract.getNextVersion(nextCase[0], 'calver', 'patch', nextCase[1], calverDate), nextCase[2]);
    }

    return;
  });

  it('rejects sentinel misuse, strategy mismatches, future CalVer, and overflow', () => {
    const invalidCases: Tests_Lib_VersionContract_InvalidCases = [
      () => LibVersionContract.validate('0.0.0', 'trackable', 'semver', 'trackable package', calverDate),
      () => LibVersionContract.validate('0.0.1', 'freezable', 'semver', 'freezable package', calverDate),
      () => LibVersionContract.validate('1.2.3', 'trackable', 'calver', 'CalVer package', calverDate),
      () => LibVersionContract.validate('2026.11.0', 'trackable', 'calver', 'future package', calverDate),
      () => LibVersionContract.getNextVersion(`1.2.${Number.MAX_SAFE_INTEGER}`, 'semver', 'patch', true, calverDate),
      () => LibVersionContract.getNextVersion(`2026.10.${Number.MAX_SAFE_INTEGER}`, 'calver', 'patch', true, calverDate),
    ];

    for (const invalidCase of invalidCases) {
      throws(invalidCase);
    }

    return;
  });

  it('uses UTC rather than the host timezone at a month boundary', () => {
    const utcBoundaryDate: Tests_Lib_VersionContract_UtcBoundaryDate = new Date('2027-01-01T00:05:00.000Z');

    strictEqual(LibVersionContract.getInitialVersion('trackable', 'calver', utcBoundaryDate), '2027.1.0');
    strictEqual(LibVersionContract.getNextVersion('2026.12.8', 'calver', 'patch', true, utcBoundaryDate), '2027.1.0');

    return;
  });

  return;
});
