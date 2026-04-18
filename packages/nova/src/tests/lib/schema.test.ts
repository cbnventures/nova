import { fail, strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  libSchemaNodeReleasesSchedule,
  libSchemaSpdxLicensesResponse,
} from '../../lib/schema.js';

import type {
  TestsLibSchemaNodeReleasesScheduleEntryOrUndefined,
  TestsLibSchemaNodeReleasesScheduleResult,
  TestsLibSchemaSpdxLicenseEntryOrUndefined,
  TestsLibSchemaSpdxLicensesResult,
} from '../../types/tests/lib/schema.test.d.ts';

/**
 * Tests - Lib - Schema - Node Releases Schedule.
 *
 * @since 0.13.0
 */
describe('libSchemaNodeReleasesSchedule', async () => {
  it('accepts schedule with multiple entries', () => {
    const result: TestsLibSchemaNodeReleasesScheduleResult = libSchemaNodeReleasesSchedule.parse({
      'v18': {
        lts: '2022-10-25',
        end: '2025-04-30',
      },
      'v19': { end: '2023-06-01' },
      'v20': {
        lts: '2023-10-24',
        end: '2026-04-30',
      },
    });

    strictEqual(Object.keys(result).length, 3);

    const v18: TestsLibSchemaNodeReleasesScheduleEntryOrUndefined = result['v18'];
    const v19: TestsLibSchemaNodeReleasesScheduleEntryOrUndefined = result['v19'];
    const v20: TestsLibSchemaNodeReleasesScheduleEntryOrUndefined = result['v20'];

    if (v18 === undefined) {
      fail('Expected v18 to be defined');
    }

    if (v19 === undefined) {
      fail('Expected v19 to be defined');
    }

    if (v20 === undefined) {
      fail('Expected v20 to be defined');
    }

    strictEqual(v18['lts'], '2022-10-25');
    strictEqual(v19['lts'], undefined);
    strictEqual(v20['end'], '2026-04-30');

    return;
  });

  it('accepts empty schedule', () => {
    const result: TestsLibSchemaNodeReleasesScheduleResult = libSchemaNodeReleasesSchedule.parse({});

    strictEqual(Object.keys(result).length, 0);

    return;
  });

  it('accepts single entry', () => {
    const result: TestsLibSchemaNodeReleasesScheduleResult = libSchemaNodeReleasesSchedule.parse({
      'v22': {
        lts: '2024-10-29',
        end: '2027-04-30',
      },
    });

    strictEqual(Object.keys(result).length, 1);

    const v22: TestsLibSchemaNodeReleasesScheduleEntryOrUndefined = result['v22'];

    if (v22 === undefined) {
      fail('Expected v22 to be defined');
    }

    strictEqual(v22['lts'], '2024-10-29');

    return;
  });

  it('rejects schedule with invalid entry value', () => {
    throws(() => {
      libSchemaNodeReleasesSchedule.parse({
        'v20': { lts: 123 },
      });

      return;
    });

    return;
  });

  it('rejects schedule with null entry value', () => {
    throws(() => {
      libSchemaNodeReleasesSchedule.parse({
        'v20': null,
      });

      return;
    });

    return;
  });

  it('rejects schedule with string entry value', () => {
    throws(() => {
      libSchemaNodeReleasesSchedule.parse({
        'v20': 'not-an-entry',
      });

      return;
    });

    return;
  });

  it('rejects null', () => {
    throws(() => {
      libSchemaNodeReleasesSchedule.parse(null);

      return;
    });

    return;
  });

  it('rejects array', () => {
    throws(() => {
      libSchemaNodeReleasesSchedule.parse([]);

      return;
    });

    return;
  });

  return;
});

/**
 * Tests - Lib - Schema - SPDX Licenses Response.
 *
 * @since 0.13.0
 */
describe('libSchemaSpdxLicensesResponse', async () => {
  it('accepts response with multiple licenses', () => {
    const result: TestsLibSchemaSpdxLicensesResult = libSchemaSpdxLicensesResponse.parse({
      licenses: [
        { licenseId: 'MIT' },
        { licenseId: 'Apache-2.0' },
        { licenseId: 'GPL-3.0-only' },
      ],
    });

    strictEqual(result['licenses'].length, 3);

    const license0: TestsLibSchemaSpdxLicenseEntryOrUndefined = result['licenses'][0];
    const license1: TestsLibSchemaSpdxLicenseEntryOrUndefined = result['licenses'][1];
    const license2: TestsLibSchemaSpdxLicenseEntryOrUndefined = result['licenses'][2];

    if (license0 === undefined) {
      fail('Expected license at index 0');
    }

    if (license1 === undefined) {
      fail('Expected license at index 1');
    }

    if (license2 === undefined) {
      fail('Expected license at index 2');
    }

    strictEqual(license0['licenseId'], 'MIT');
    strictEqual(license1['licenseId'], 'Apache-2.0');
    strictEqual(license2['licenseId'], 'GPL-3.0-only');

    return;
  });

  it('accepts response with empty licenses array', () => {
    const result: TestsLibSchemaSpdxLicensesResult = libSchemaSpdxLicensesResponse.parse({
      licenses: [],
    });

    strictEqual(result['licenses'].length, 0);

    return;
  });

  it('accepts response with single license', () => {
    const result: TestsLibSchemaSpdxLicensesResult = libSchemaSpdxLicensesResponse.parse({
      licenses: [{ licenseId: 'ISC' }],
    });

    strictEqual(result['licenses'].length, 1);

    const license0: TestsLibSchemaSpdxLicenseEntryOrUndefined = result['licenses'][0];

    if (license0 === undefined) {
      fail('Expected license at index 0');
    }

    strictEqual(license0['licenseId'], 'ISC');

    return;
  });

  it('rejects response missing licenses', () => {
    throws(() => {
      libSchemaSpdxLicensesResponse.parse({});

      return;
    });

    return;
  });

  it('rejects response with non-array licenses', () => {
    throws(() => {
      libSchemaSpdxLicensesResponse.parse({ licenses: 'not-array' });

      return;
    });

    return;
  });

  it('rejects response with invalid license entry', () => {
    throws(() => {
      libSchemaSpdxLicensesResponse.parse({
        licenses: [{ licenseId: 123 }],
      });

      return;
    });

    return;
  });

  it('rejects response with mixed valid and invalid entries', () => {
    throws(() => {
      libSchemaSpdxLicensesResponse.parse({
        licenses: [
          { licenseId: 'MIT' },
          { invalid: true },
        ],
      });

      return;
    });

    return;
  });

  it('rejects null', () => {
    throws(() => {
      libSchemaSpdxLicensesResponse.parse(null);

      return;
    });

    return;
  });

  it('rejects non-object value', () => {
    throws(() => {
      libSchemaSpdxLicensesResponse.parse(42);

      return;
    });

    return;
  });

  return;
});
