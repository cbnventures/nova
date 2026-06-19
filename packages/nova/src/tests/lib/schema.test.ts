import { fail, strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  libSchemaNodeReleasesSchedule,
  libSchemaSpdxLicensesResponse,
} from '../../lib/schema.js';

import type {
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsEmptySchedule_Result,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_V18,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_V19,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_V20,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_Result,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_V22,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsArray_Input,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsNull_Input,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsScheduleWithInvalidEntryValue_Input,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsScheduleWithNullEntryValue_Input,
  Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsScheduleWithStringEntryValue_Input,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithEmptyLicensesArray_Result,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_License0,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_License1,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_License2,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_License0,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_Result,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsNonObjectValue_Input,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsNull_Input,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseMissingLicenses_Input,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseWithInvalidLicenseEntry_Input,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseWithMixedValidAndInvalidEntries_Input,
  Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseWithNonArrayLicenses_Input,
} from '../../types/tests/lib/schema.test.d.ts';

/**
 * Tests - Lib - Schema - Node Releases Schedule.
 *
 * @since 0.13.0
 */
describe('libSchemaNodeReleasesSchedule', async () => {
  it('accepts schedule with multiple entries', () => {
    const result: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result = libSchemaNodeReleasesSchedule.parse({
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

    const v18: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_V18 = result['v18'];
    const v19: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_V19 = result['v19'];
    const v20: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_V20 = result['v20'];

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
    const result: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsEmptySchedule_Result = libSchemaNodeReleasesSchedule.parse({});

    strictEqual(Object.keys(result).length, 0);

    return;
  });

  it('accepts single entry', () => {
    const result: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_Result = libSchemaNodeReleasesSchedule.parse({
      'v22': {
        lts: '2024-10-29',
        end: '2027-04-30',
      },
    });

    strictEqual(Object.keys(result).length, 1);

    const v22: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_V22 = result['v22'];

    if (v22 === undefined) {
      fail('Expected v22 to be defined');
    }

    strictEqual(v22['lts'], '2024-10-29');

    return;
  });

  it('rejects schedule with invalid entry value', () => {
    const input: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsScheduleWithInvalidEntryValue_Input = {
      'v20': { lts: 123 },
    };

    throws(() => {
      libSchemaNodeReleasesSchedule.parse(input);

      return;
    });

    return;
  });

  it('rejects schedule with null entry value', () => {
    const input: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsScheduleWithNullEntryValue_Input = {
      'v20': null,
    };

    throws(() => {
      libSchemaNodeReleasesSchedule.parse(input);

      return;
    });

    return;
  });

  it('rejects schedule with string entry value', () => {
    const input: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsScheduleWithStringEntryValue_Input = {
      'v20': 'not-an-entry',
    };

    throws(() => {
      libSchemaNodeReleasesSchedule.parse(input);

      return;
    });

    return;
  });

  it('rejects null', () => {
    const input: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsNull_Input = null;

    throws(() => {
      libSchemaNodeReleasesSchedule.parse(input);

      return;
    });

    return;
  });

  it('rejects array', () => {
    const input: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsArray_Input = [];

    throws(() => {
      libSchemaNodeReleasesSchedule.parse(input);

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
    const result: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result = libSchemaSpdxLicensesResponse.parse({
      licenses: [
        { licenseId: 'MIT' },
        { licenseId: 'Apache-2.0' },
        { licenseId: 'GPL-3.0-only' },
      ],
    });

    strictEqual(result['licenses'].length, 3);

    const license0: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_License0 = result['licenses'][0];
    const license1: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_License1 = result['licenses'][1];
    const license2: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_License2 = result['licenses'][2];

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
    const result: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithEmptyLicensesArray_Result = libSchemaSpdxLicensesResponse.parse({
      licenses: [],
    });

    strictEqual(result['licenses'].length, 0);

    return;
  });

  it('accepts response with single license', () => {
    const result: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_Result = libSchemaSpdxLicensesResponse.parse({
      licenses: [{ licenseId: 'ISC' }],
    });

    strictEqual(result['licenses'].length, 1);

    const license0: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_License0 = result['licenses'][0];

    if (license0 === undefined) {
      fail('Expected license at index 0');
    }

    strictEqual(license0['licenseId'], 'ISC');

    return;
  });

  it('rejects response missing licenses', () => {
    const input: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseMissingLicenses_Input = {};

    throws(() => {
      libSchemaSpdxLicensesResponse.parse(input);

      return;
    });

    return;
  });

  it('rejects response with non-array licenses', () => {
    const input: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseWithNonArrayLicenses_Input = { licenses: 'not-array' };

    throws(() => {
      libSchemaSpdxLicensesResponse.parse(input);

      return;
    });

    return;
  });

  it('rejects response with invalid license entry', () => {
    const input: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseWithInvalidLicenseEntry_Input = {
      licenses: [{ licenseId: 123 }],
    };

    throws(() => {
      libSchemaSpdxLicensesResponse.parse(input);

      return;
    });

    return;
  });

  it('rejects response with mixed valid and invalid entries', () => {
    const input: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseWithMixedValidAndInvalidEntries_Input = {
      licenses: [
        { licenseId: 'MIT' },
        { invalid: true },
      ],
    };

    throws(() => {
      libSchemaSpdxLicensesResponse.parse(input);

      return;
    });

    return;
  });

  it('rejects null', () => {
    const input: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsNull_Input = null;

    throws(() => {
      libSchemaSpdxLicensesResponse.parse(input);

      return;
    });

    return;
  });

  it('rejects non-object value', () => {
    const input: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsNonObjectValue_Input = 42;

    throws(() => {
      libSchemaSpdxLicensesResponse.parse(input);

      return;
    });

    return;
  });

  return;
});
