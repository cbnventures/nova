import { fail, strictEqual, throws } from 'node:assert/strict';
import { test } from 'node:test';

import {
  schemaNodeReleasesScheduleEntry,
  schemaNodeReleasesSchedule,
  schemaSpdxLicensesLicense,
  schemaSpdxLicensesResponse,
} from '@/lib/schema.js';

/**
 * Node releases schedule entry schema.
 *
 * @since 1.0.0
 */
test('schemaNodeReleasesScheduleEntry', async (context) => {
  await context.test('accepts entry with lts and end', () => {
    const result = schemaNodeReleasesScheduleEntry.parse({
      lts: '2024-10-29',
      end: '2027-04-30',
    });

    strictEqual(result.lts, '2024-10-29');
    strictEqual(result.end, '2027-04-30');
  });

  await context.test('accepts entry without lts', () => {
    const result = schemaNodeReleasesScheduleEntry.parse({
      end: '2025-04-01',
    });

    strictEqual(result.lts, undefined);
    strictEqual(result.end, '2025-04-01');
  });

  await context.test('strips unknown properties', () => {
    const result = schemaNodeReleasesScheduleEntry.parse({
      lts: '2024-10-29',
      end: '2027-04-30',
      maintenance: '2025-10-01',
      start: '2024-04-01',
    });

    strictEqual(result.lts, '2024-10-29');
    strictEqual(result.end, '2027-04-30');
    strictEqual('maintenance' in result, false);
    strictEqual('start' in result, false);
  });

  await context.test('rejects entry missing end', () => {
    throws(() => {
      schemaNodeReleasesScheduleEntry.parse({});
    });
  });

  await context.test('rejects entry with non-string end', () => {
    throws(() => {
      schemaNodeReleasesScheduleEntry.parse({ end: 123 });
    });
  });

  await context.test('rejects entry with non-string lts', () => {
    throws(() => {
      schemaNodeReleasesScheduleEntry.parse({
        lts: 123,
        end: '2027-04-30',
      });
    });
  });

  await context.test('rejects null', () => {
    throws(() => {
      schemaNodeReleasesScheduleEntry.parse(null);
    });
  });

  await context.test('rejects non-object value', () => {
    throws(() => {
      schemaNodeReleasesScheduleEntry.parse('string');
    });
  });
});

/**
 * Node releases schedule schema.
 *
 * @since 1.0.0
 */
test('schemaNodeReleasesSchedule', async (context) => {
  await context.test('accepts schedule with multiple entries', () => {
    const result = schemaNodeReleasesSchedule.parse({
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

    const v18 = result['v18'];
    const v19 = result['v19'];
    const v20 = result['v20'];

    if (v18 === undefined) {
      fail('Expected v18 to be defined');
    }

    if (v19 === undefined) {
      fail('Expected v19 to be defined');
    }

    if (v20 === undefined) {
      fail('Expected v20 to be defined');
    }

    strictEqual(v18.lts, '2022-10-25');
    strictEqual(v19.lts, undefined);
    strictEqual(v20.end, '2026-04-30');
  });

  await context.test('accepts empty schedule', () => {
    const result = schemaNodeReleasesSchedule.parse({});

    strictEqual(Object.keys(result).length, 0);
  });

  await context.test('accepts single entry', () => {
    const result = schemaNodeReleasesSchedule.parse({
      'v22': {
        lts: '2024-10-29',
        end: '2027-04-30',
      },
    });

    strictEqual(Object.keys(result).length, 1);

    const v22 = result['v22'];

    if (v22 === undefined) {
      fail('Expected v22 to be defined');
    }

    strictEqual(v22.lts, '2024-10-29');
  });

  await context.test('rejects schedule with invalid entry value', () => {
    throws(() => {
      schemaNodeReleasesSchedule.parse({
        'v20': { lts: 123 },
      });
    });
  });

  await context.test('rejects schedule with null entry value', () => {
    throws(() => {
      schemaNodeReleasesSchedule.parse({
        'v20': null,
      });
    });
  });

  await context.test('rejects schedule with string entry value', () => {
    throws(() => {
      schemaNodeReleasesSchedule.parse({
        'v20': 'not-an-entry',
      });
    });
  });

  await context.test('rejects null', () => {
    throws(() => {
      schemaNodeReleasesSchedule.parse(null);
    });
  });

  await context.test('rejects array', () => {
    throws(() => {
      schemaNodeReleasesSchedule.parse([]);
    });
  });
});

/**
 * SPDX licenses license schema.
 *
 * @since 1.0.0
 */
test('schemaSpdxLicensesLicense', async (context) => {
  await context.test('accepts valid license', () => {
    const result = schemaSpdxLicensesLicense.parse({
      licenseId: 'MIT',
    });

    strictEqual(result.licenseId, 'MIT');
  });

  await context.test('strips unknown properties', () => {
    const result = schemaSpdxLicensesLicense.parse({
      licenseId: 'Apache-2.0',
      name: 'Apache License 2.0',
      isOsiApproved: true,
    });

    strictEqual(result.licenseId, 'Apache-2.0');
    strictEqual('name' in result, false);
    strictEqual('isOsiApproved' in result, false);
  });

  await context.test('rejects license missing licenseId', () => {
    throws(() => {
      schemaSpdxLicensesLicense.parse({});
    });
  });

  await context.test('rejects license with non-string licenseId', () => {
    throws(() => {
      schemaSpdxLicensesLicense.parse({ licenseId: 123 });
    });
  });

  await context.test('rejects null', () => {
    throws(() => {
      schemaSpdxLicensesLicense.parse(null);
    });
  });

  await context.test('rejects non-object value', () => {
    throws(() => {
      schemaSpdxLicensesLicense.parse('MIT');
    });
  });
});

/**
 * SPDX licenses response schema.
 *
 * @since 1.0.0
 */
test('schemaSpdxLicensesResponse', async (context) => {
  await context.test('accepts response with multiple licenses', () => {
    const result = schemaSpdxLicensesResponse.parse({
      licenses: [
        { licenseId: 'MIT' },
        { licenseId: 'Apache-2.0' },
        { licenseId: 'GPL-3.0-only' },
      ],
    });

    strictEqual(result.licenses.length, 3);

    const license0 = result.licenses[0];
    const license1 = result.licenses[1];
    const license2 = result.licenses[2];

    if (license0 === undefined) {
      fail('Expected license at index 0');
    }

    if (license1 === undefined) {
      fail('Expected license at index 1');
    }

    if (license2 === undefined) {
      fail('Expected license at index 2');
    }

    strictEqual(license0.licenseId, 'MIT');
    strictEqual(license1.licenseId, 'Apache-2.0');
    strictEqual(license2.licenseId, 'GPL-3.0-only');
  });

  await context.test('accepts response with empty licenses array', () => {
    const result = schemaSpdxLicensesResponse.parse({
      licenses: [],
    });

    strictEqual(result.licenses.length, 0);
  });

  await context.test('accepts response with single license', () => {
    const result = schemaSpdxLicensesResponse.parse({
      licenses: [{ licenseId: 'ISC' }],
    });

    strictEqual(result.licenses.length, 1);

    const license0 = result.licenses[0];

    if (license0 === undefined) {
      fail('Expected license at index 0');
    }

    strictEqual(license0.licenseId, 'ISC');
  });

  await context.test('rejects response missing licenses', () => {
    throws(() => {
      schemaSpdxLicensesResponse.parse({});
    });
  });

  await context.test('rejects response with non-array licenses', () => {
    throws(() => {
      schemaSpdxLicensesResponse.parse({ licenses: 'not-array' });
    });
  });

  await context.test('rejects response with invalid license entry', () => {
    throws(() => {
      schemaSpdxLicensesResponse.parse({
        licenses: [{ licenseId: 123 }],
      });
    });
  });

  await context.test('rejects response with mixed valid and invalid entries', () => {
    throws(() => {
      schemaSpdxLicensesResponse.parse({
        licenses: [
          { licenseId: 'MIT' },
          { invalid: true },
        ],
      });
    });
  });

  await context.test('rejects null', () => {
    throws(() => {
      schemaSpdxLicensesResponse.parse(null);
    });
  });

  await context.test('rejects non-object value', () => {
    throws(() => {
      schemaSpdxLicensesResponse.parse(42);
    });
  });
});
