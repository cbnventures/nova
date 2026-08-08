import { deepStrictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { libEnvManagedSet } from '../../lib/env-managed-set.js';

/**
 * Tests - Lib - Env Managed Set - Lib Env Managed Set.
 *
 * @since 0.21.0
 */
describe('libEnvManagedSet', () => {
  it('derives global and app keys with their prefixes', () => {
    deepStrictEqual(
      libEnvManagedSet.compute({
        environment: {
          project: {
            prefix: 'G_',
            variables: [{
              key: 'SHARED',
              reach: 'managed',
              secret: true,
            }],
          },
          workspaces: {
            './apps/a': {
              prefix: 'A_',
              variables: [
                {
                  key: 'PUBLIC_X',
                  secret: false,
                  reach: 'build',
                },
                {
                  key: 'SECRET_Y',
                  secret: true,
                  reach: 'runtime',
                },
              ],
            },
          },
        },
      }),
      [
        {
          name: 'G_SHARED',
          secret: true,
          kind: 'project',
        },
        {
          name: 'A_PUBLIC_X',
          secret: false,
          kind: 'workspace',
        },
        {
          name: 'A_SECRET_Y',
          secret: true,
          kind: 'workspace',
        },
      ],
    );

    return;
  });

  it('derives workflow config keys and excludes the automatic token', () => {
    deepStrictEqual(
      libEnvManagedSet.compute({
        environment: {
          workflows: {
            sponsor: { prefix: 'SP_' },
          },
        },
        workflows: [{
          template: 'check-sponsor-gated-issues',
          name: 'sponsor',
          triggers: ['schedule'],
        }],
      }),
      [
        {
          name: 'SP_PERSONAL_ACCESS_TOKEN',
          secret: true,
          kind: 'workflow',
        },
        {
          name: 'SP_ISSUE_LABELS',
          secret: false,
          kind: 'workflow',
        },
        {
          name: 'SP_ISSUE_LIMIT_COMMENTER',
          secret: false,
          kind: 'workflow',
        },
        {
          name: 'SP_ISSUE_LOCK_ON_CLOSE',
          secret: false,
          kind: 'workflow',
        },
        {
          name: 'SP_ISSUE_MESSAGE_NOT_SPONSOR',
          secret: false,
          kind: 'workflow',
        },
        {
          name: 'SP_ISSUE_MESSAGE_WELCOME',
          secret: false,
          kind: 'workflow',
        },
        {
          name: 'SP_IS_ORGANIZATION',
          secret: false,
          kind: 'workflow',
        },
        {
          name: 'SP_SPONSOR_ACTIVE_ONLY',
          secret: false,
          kind: 'workflow',
        },
        {
          name: 'SP_SPONSOR_EXEMPT_FILE_LOCATION',
          secret: false,
          kind: 'workflow',
        },
        {
          name: 'SP_SPONSOR_MINIMUM',
          secret: false,
          kind: 'workflow',
        },
      ],
    );

    return;
  });

  it('derives deploy creds by scope and excludes literal template variables', () => {
    deepStrictEqual(
      libEnvManagedSet.compute({
        environment: {
          project: { prefix: 'G_' },
          workspaces: {
            './apps/a': { prefix: 'A_' },
          },
        },
        workflows: [{
          template: 'publish',
          name: 'release',
          triggers: ['push'],
          deploy: [{
            to: 'vercel-nextjs',
            path: './apps/a',
          }],
        }],
      }),
      [
        {
          name: 'G_VERCEL_TOKEN',
          secret: true,
          kind: 'deploy-cred',
        },
        {
          name: 'G_VERCEL_ORG_ID',
          secret: false,
          kind: 'deploy-cred',
        },
        {
          name: 'A_VERCEL_PROJECT_ID',
          secret: false,
          kind: 'deploy-cred',
        },
      ],
    );

    return;
  });

  it('marks the npm publish token as an optional deploy cred', () => {
    deepStrictEqual(
      libEnvManagedSet.compute({
        environment: {
          project: { prefix: 'G_' },
          workspaces: {
            './packages/pkg': { prefix: 'P_' },
          },
        },
        workflows: [{
          template: 'publish',
          name: 'release',
          triggers: ['push'],
          deploy: [{
            to: 'npm',
            path: './packages/pkg',
          }],
        }],
      }),
      [{
        name: 'G_NPM_TOKEN',
        secret: true,
        kind: 'deploy-cred',
        optional: true,
      }],
    );

    return;
  });

  it('excludes reach:"local" app values from the managed set', () => {
    deepStrictEqual(
      libEnvManagedSet.compute({
        environment: {
          workspaces: {
            './packages/act': {
              prefix: 'ACT_',
              variables: [
                {
                  key: 'INPUT_DRY_RUN',
                  reach: 'local',
                  defaultValue: 'false',
                },
                {
                  key: 'API_KEY',
                  reach: 'runtime',
                  secret: true,
                },
              ],
            },
          },
        },
        workflows: [],
      }),
      [{
        name: 'ACT_API_KEY',
        secret: true,
        kind: 'workspace',
      }],
    );

    return;
  });

  return;
});
