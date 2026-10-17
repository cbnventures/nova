import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  applyScaffoldVersionAudit,
  auditScaffoldVersionCatalog,
  selectStableVersion,
} from '../../lib/scaffold-versions.mjs';

/**
 * Tests - CLI - Scaffold Versions - Response.
 *
 * Defines the response fixture shared by JSON and text source resolvers.
 *
 * @typedef {{json: () => Promise<unknown>, ok: true, status: 200, text: () => Promise<string>}} ScaffoldVersionTestResponse
 *
 * @since 0.0.0
 */

/**
 * Tests - CLI - Scaffold Versions - JSON Response.
 *
 * Creates the response surface used by catalog JSON resolvers.
 *
 * @param {unknown} body - Body.
 *
 * @returns {ScaffoldVersionTestResponse}
 *
 * @since 0.0.0
 */
function jsonResponse(body) {
  return {
    json: async () => body,
    ok: true,
    status: 200,
    text: async () => JSON.stringify(body),
  };
}

/**
 * Tests - CLI - Scaffold Versions - Text Response.
 *
 * Creates the response surface used by catalog text resolvers.
 *
 * @param {string} body - Body.
 *
 * @returns {ScaffoldVersionTestResponse}
 *
 * @since 0.0.0
 */
function textResponse(body) {
  return {
    json: async () => ({}),
    ok: true,
    status: 200,
    text: async () => body,
  };
}

/**
 * Tests - CLI - Scaffold Versions - Scaffold Version Maintenance.
 *
 * Verifies stable selection, upstream source parsing, coupled values, and the
 * immutable catalog update used by the weekly review workflow.
 *
 * @since 0.0.0
 */
describe('scaffold version maintenance', () => {
  it('selects stable updates without crossing a protected major', () => {
    expect(selectStableVersion([
      '6.1.0',
      '6.2.0-beta.1',
      '6.2.0',
      '7.0.0',
    ], '6.0.0', 'same-major')).toBe('6.2.0');

    expect(selectStableVersion([
      '6.1.0',
      '7.0.0',
    ], '6.0.0', 'latest')).toBe('7.0.0');

    return;
  });

  it('resolves every automatic source format and coupled values', async () => {
    const catalog = /** @type {Parameters<typeof auditScaffoldVersionCatalog>[0]} */ ({
      schemaVersion: 1,
      entries: {
        node: {
          group: 'javascript',
          placeholder: '[__SCAFFOLD_VERSION_NODE__]',
          source: {
            strategy: 'active-lts',
            type: 'node-lts',
          },
          value: '^22',
        },
        package: {
          group: 'cloudflare',
          placeholder: '[__SCAFFOLD_VERSION_PACKAGE__]',
          source: {
            package: 'example',
            strategy: 'same-major',
            type: 'npm',
          },
          value: '4.1.0',
        },
        cloudflareDate: {
          group: 'cloudflare',
          placeholder: '[__SCAFFOLD_VERSION_CLOUDFLARE_DATE__]',
          source: {
            strategy: 'coupled',
            type: 'cloudflare-date',
          },
          value: '2026-01-01',
        },
        docker: {
          group: 'docker',
          placeholder: '[__SCAFFOLD_VERSION_DOCKER__]',
          source: {
            pattern: '^3\\.23\\.\\d+-alpine3\\.23$',
            repository: 'library/example',
            strategy: 'pattern',
            type: 'docker-hub',
          },
          value: '3.23.1-alpine3.23',
        },
        githubAction: {
          group: 'github-workflow',
          placeholder: '[__SCAFFOLD_VERSION_GITHUB_ACTION__]',
          source: {
            repository: 'actions/example',
            strategy: 'latest-major',
            type: 'github-release',
          },
          value: 'actions/example@v3',
        },
        maven: {
          group: 'android',
          placeholder: '[__SCAFFOLD_VERSION_MAVEN__]',
          source: {
            strategy: 'same-major',
            type: 'maven-metadata',
            url: 'https://example.test/maven-metadata.xml',
          },
          value: '2.1.0',
        },
        gradle: {
          group: 'android',
          placeholder: '[__SCAFFOLD_VERSION_GRADLE__]',
          source: {
            strategy: 'same-major',
            type: 'gradle-current',
          },
          value: '9.1.0',
        },
        checksum: {
          group: 'android',
          placeholder: '[__SCAFFOLD_VERSION_CHECKSUM__]',
          source: {
            field: 'downloadChecksum',
            from: 'gradle',
            type: 'derived',
          },
          value: 'old-checksum',
        },
        manual: {
          group: 'apple',
          placeholder: '[__SCAFFOLD_VERSION_MANUAL__]',
          source: {
            reason: 'Policy.',
            type: 'manual',
          },
          value: '17.0',
        },
      },
    });
    const fetchImpl = /** @type {NonNullable<NonNullable<Parameters<typeof auditScaffoldVersionCatalog>[1]>['fetchImpl']>} */ (async (url) => {
      if (url.includes('registry.npmjs.org') === true) {
        return jsonResponse({
          versions: {
            '4.1.0': {},
            '4.2.0': {},
            '5.0.0': {},
          },
        });
      }

      if (url.includes('hub.docker.com') === true) {
        return jsonResponse({
          next: null,
          results: [
            { name: '3.23.1-alpine3.23' },
            { name: '3.23.2-alpine3.23' },
            { name: '3.24.0-alpine3.24' },
            { name: 'latest' },
          ],
        });
      }

      if (url.includes('api.github.com') === true) {
        return jsonResponse({
          tag_name: 'v4.2.1',
        });
      }

      if (url.includes('maven-metadata.xml') === true) {
        return textResponse('<metadata><version>2.1.0</version><version>2.2.0</version><version>3.0.0</version></metadata>');
      }

      if (url.includes('services.gradle.org') === true) {
        return jsonResponse([
          {
            broken: false,
            checksum: 'new-checksum',
            final: true,
            version: '9.2.0',
          },
          {
            broken: false,
            checksum: 'future-major-checksum',
            final: true,
            version: '10.0.0',
          },
          {
            broken: false,
            checksum: 'preview-checksum',
            final: false,
            version: '9.3.0-rc-1',
          },
        ]);
      }

      if (url.includes('nodejs/Release') === true) {
        return jsonResponse({
          v22: {
            end: '2027-04-30',
            lts: '2024-10-29',
          },
          v24: {
            end: '2028-04-30',
            lts: '2025-10-28',
          },
          v25: {
            end: '2026-06-01',
            lts: false,
          },
        });
      }

      throw new Error(`Unexpected URL: ${url}`);
    });
    const audit = await auditScaffoldVersionCatalog(catalog, {
      fetchImpl,
      now: new Date('2026-10-15T12:00:00.000Z'),
    });
    const candidates = Object.fromEntries(audit['results'].map((result) => [
      result['key'],
      result['candidate'],
    ]));

    expect(candidates).toEqual({
      checksum: 'new-checksum',
      cloudflareDate: '2026-10-15',
      docker: '3.23.2-alpine3.23',
      githubAction: 'actions/example@v4',
      gradle: '9.2.0',
      manual: '17.0',
      maven: '2.2.0',
      node: '^22 || ^24',
      package: '4.2.0',
    });

    expect(audit['manual']).toHaveLength(1);

    expect(audit['updates']).toHaveLength(8);

    return;
  });

  it('changes only audited entries in a cloned catalog', () => {
    const catalog = /** @type {Parameters<typeof applyScaffoldVersionAudit>[0]} */ ({
      schemaVersion: 1,
      entries: {
        example: {
          group: 'example',
          placeholder: '[__SCAFFOLD_VERSION_EXAMPLE__]',
          source: {
            type: 'manual',
          },
          value: '1.0.0',
        },
      },
    });
    const audit = /** @type {Parameters<typeof applyScaffoldVersionAudit>[1]} */ ({
      manual: [],
      results: [],
      updates: [{
        candidate: '1.1.0',
        current: '1.0.0',
        group: 'example',
        key: 'example',
        sourceType: 'manual',
      }],
    });
    const updatedCatalog = applyScaffoldVersionAudit(catalog, audit);
    const originalEntry = catalog['entries']['example'];
    const updatedEntry = updatedCatalog['entries']['example'];

    if (originalEntry === undefined || updatedEntry === undefined) {
      throw new Error('The example catalog entry must exist.');
    }

    expect(originalEntry['value']).toBe('1.0.0');

    expect(updatedEntry['value']).toBe('1.1.0');

    return;
  });

  return;
});
