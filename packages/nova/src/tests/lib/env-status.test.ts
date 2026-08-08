import { deepStrictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { libEnvStatus } from '../../lib/env-status.js';

/**
 * Tests - Lib - Env Status - Lib Env Status.
 *
 * @since 0.22.0
 */
describe('libEnvStatus', () => {
  it('classifies declared, stale, and unmanaged names', () => {
    deepStrictEqual(
      libEnvStatus.classify(
        [{
          name: 'CBN_A',
          secret: true,
          kind: 'workspace',
        }],
        {
          available: true,
          variables: [],
          secrets: [
            'CBN_A',
            'CBN_LEGACY',
            'OTHER_X',
          ],
        },
        {
          workspaces: {
            './apps/a': { prefix: 'CBN_' },
          },
        },
      ),
      [
        {
          name: 'CBN_A',
          state: 'declared',
        },
        {
          name: 'CBN_LEGACY',
          state: 'stale',
        },
        {
          name: 'OTHER_X',
          state: 'unmanaged',
        },
      ],
    );

    return;
  });

  it('reports a managed key absent from GitHub as missing', () => {
    deepStrictEqual(
      libEnvStatus.classify(
        [{
          name: 'CBN_MISSING',
          secret: false,
          kind: 'workspace',
        }],
        {
          available: true,
          variables: [],
          secrets: [],
        },
        {
          workspaces: {
            './apps/a': { prefix: 'CBN_' },
          },
        },
      ),
      [{
        name: 'CBN_MISSING',
        state: 'missing',
      }],
    );

    return;
  });

  it('reports a secret managed key stored as a Variable as a type mismatch', () => {
    deepStrictEqual(
      libEnvStatus.classify(
        [{
          name: 'CBN_TOKEN',
          secret: true,
          kind: 'workflow',
        }],
        {
          available: true,
          variables: ['CBN_TOKEN'],
          secrets: [],
        },
        {
          workflows: {
            sponsor: { prefix: 'CBN_' },
          },
        },
      ),
      [{
        name: 'CBN_TOKEN',
        state: 'type-mismatch',
      }],
    );

    return;
  });

  it('flags a non-secret Variable holding the NOVA_PLACEHOLDER stub value as stub-unreplaced', () => {
    deepStrictEqual(
      libEnvStatus.classify(
        [{
          name: 'CBN_REGION',
          secret: false,
          kind: 'workspace',
        }],
        {
          available: true,
          variables: ['CBN_REGION'],
          secrets: [],
          variableValues: { CBN_REGION: 'NOVA_PLACEHOLDER' },
        },
        {
          workspaces: {
            './apps/a': {
              prefix: 'CBN_',
              variables: [{
                key: 'REGION',
                secret: false,
                reach: 'build',
              }],
            },
          },
        },
      ),
      [{
        name: 'CBN_REGION',
        state: 'stub-unreplaced',
      }],
    );

    return;
  });

  it('treats a non-secret Variable holding a real value as declared', () => {
    deepStrictEqual(
      libEnvStatus.classify(
        [{
          name: 'CBN_REGION',
          secret: false,
          kind: 'workspace',
        }],
        {
          available: true,
          variables: ['CBN_REGION'],
          secrets: [],
          variableValues: { CBN_REGION: 'us-east-1' },
        },
        {
          workspaces: {
            './apps/a': {
              prefix: 'CBN_',
              variables: [{
                key: 'REGION',
                secret: false,
                reach: 'build',
              }],
            },
          },
        },
      ),
      [{
        name: 'CBN_REGION',
        state: 'declared',
      }],
    );

    return;
  });

  it('treats a non-secret Variable as declared when variableValues is unavailable', () => {
    deepStrictEqual(
      libEnvStatus.classify(
        [{
          name: 'CBN_REGION',
          secret: false,
          kind: 'workspace',
        }],
        {
          available: true,
          variables: ['CBN_REGION'],
          secrets: [],
        },
        {
          workspaces: {
            './apps/a': {
              prefix: 'CBN_',
              variables: [{
                key: 'REGION',
                secret: false,
                reach: 'build',
              }],
            },
          },
        },
      ),
      [{
        name: 'CBN_REGION',
        state: 'declared',
      }],
    );

    return;
  });

  it('flags a filled local dotenv line no longer declared as a local-orphan and exempts scaffold defaults', () => {
    deepStrictEqual(
      libEnvStatus.localOrphans(
        {
          workspaces: {
            './apps/a': {
              prefix: 'CBN_',
              variables: [{
                key: 'REGION',
                secret: false,
                reach: 'runtime',
              }],
            },
          },
        },
        {
          './apps/a': [
            'REGION',
            'OLD_TOKEN',
            'NODE_ENV',
          ],
        },
      ),
      [{
        name: 'OLD_TOKEN',
        state: 'local-orphan',
      }],
    );

    return;
  });

  it('treats an optional deploy cred absent from GitHub as optional-absent while a required cred stays missing', () => {
    deepStrictEqual(
      libEnvStatus.classify(
        [
          {
            name: 'G_NPM_TOKEN',
            secret: true,
            kind: 'deploy-cred',
            optional: true,
          },
          {
            name: 'G_CLOUDFLARE_API_TOKEN',
            secret: true,
            kind: 'deploy-cred',
          },
        ],
        {
          available: true,
          variables: [],
          secrets: [],
        },
        {
          project: { prefix: 'G_' },
        },
      ),
      [
        {
          name: 'G_NPM_TOKEN',
          state: 'optional-absent',
        },
        {
          name: 'G_CLOUDFLARE_API_TOKEN',
          state: 'missing',
        },
      ],
    );

    return;
  });

  return;
});
